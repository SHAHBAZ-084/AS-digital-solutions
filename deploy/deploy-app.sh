#!/usr/bin/env bash
# AS Digital Solutions — pull, build frontend, restart API
# Safe for existing live DB/uploads: never deletes server/.env, content.db, or uploads/
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/as-digital-solutions}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
NODE_BIN="${NODE_BIN:-/opt/node-v22.18.0-linux-x64/bin}"
PM2_APP="${PM2_APP:-as-content-api}"

export PATH="${NODE_BIN}:${PATH}"

echo "==> AS Digital Solutions deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
cd "${APP_DIR}"

if [[ ! -d .git ]]; then
  echo "ERROR: ${APP_DIR} is not a git repo. Run: bash deploy/setup-cicd.sh"
  exit 1
fi

echo "==> Pull latest (${DEPLOY_BRANCH})"
git fetch origin "${DEPLOY_BRANCH}"
git reset --hard "origin/${DEPLOY_BRANCH}"
chmod +x deploy/deploy-app.sh deploy/poll-deploy.sh deploy/setup-cicd.sh 2>/dev/null || true

if [[ ! -f server/.env ]]; then
  echo "ERROR: server/.env missing. Create it before deploy (PORT, SESSION_SECRET, COOKIE_SECURE)."
  exit 1
fi

if ! grep -qE '^SMTP_PASS=.+' server/.env; then
  echo "WARN: SMTP_PASS missing in server/.env — contact form email will not send until Gmail SMTP is configured."
fi

echo "==> npm ci"
npm ci

echo "==> Build frontend"
rm -rf dist
npm run build
chmod -R a+rX dist
find dist -type d -exec chmod 755 {} + 2>/dev/null || true

echo "==> Sync tracked uploads (logos) without wiping custom uploads"
mkdir -p uploads
if [[ -d uploads ]]; then
  chmod -R a+rX uploads || true
fi

echo "==> PM2 restart (${PM2_APP})"
chmod +x "${APP_DIR}/start-api.sh"
pm2 startOrReload "${APP_DIR}/deploy/ecosystem.config.cjs" --update-env
pm2 save

if command -v nginx >/dev/null 2>&1; then
  nginx -t && systemctl reload nginx || true
fi

echo "==> Health check"
sleep 2
PORT="$(grep -E '^PORT=' server/.env | cut -d= -f2 | tr -d '\"' || true)"
PORT="${PORT:-8788}"
curl -fsS "http://127.0.0.1:${PORT}/api/site" >/dev/null && echo "API OK on :${PORT}"
curl -fsSI "https://asdigitalsolution.online/" | head -n 1 || true
echo "Deploy complete."
