#!/usr/bin/env bash
# Pull-based deploy — runs on the VPS via cron when GitHub Actions SSH is blocked.
# Cron: * * * * * bash /var/www/as-digital-solutions/deploy/poll-deploy.sh >> /var/log/as-digital-poll-deploy.log 2>&1
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/as-digital-solutions}"
LOCK="/tmp/as-digital-poll-deploy.lock"
LOG_TAG="[poll-deploy $(date -Is)]"
NODE_BIN="${NODE_BIN:-/opt/node-v22.18.0-linux-x64/bin}"

export PATH="${NODE_BIN}:${PATH}"

exec 9>"${LOCK}"
if ! flock -n 9; then
  echo "${LOG_TAG} skip: another deploy running"
  exit 0
fi

cd "${APP_DIR}"

if [[ ! -d .git ]]; then
  echo "${LOG_TAG} skip: not a git repo"
  exit 0
fi

git fetch origin main --quiet

LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse origin/main)"

if [[ "${LOCAL}" == "${REMOTE}" ]]; then
  exit 0
fi

echo "${LOG_TAG} ${LOCAL:0:7} -> ${REMOTE:0:7}: deploying"
bash "${APP_DIR}/deploy/deploy-app.sh"
echo "${LOG_TAG} done"
