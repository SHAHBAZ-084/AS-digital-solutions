#!/usr/bin/env bash
# One-time VPS setup for auto-deploy on git push (poll cron + optional GitHub SSH key).
# Usage (as root on VPS):
#   bash /var/www/as-digital-solutions/deploy/setup-cicd.sh
#   bash /var/www/as-digital-solutions/deploy/setup-cicd.sh 'ssh-ed25519 AAAA... github-actions-crownev'
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/as-digital-solutions}"
REPO_URL="${REPO_URL:-https://github.com/SHAHBAZ-084/AS-digital-solutions.git}"
GITHUB_ACTIONS_PUBKEY="${1:-ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDLUUi1cuvfkPZ0kmCxZIfwu1CgVbOa8/A1yMx9+kZkg github-actions-crownev}"

echo "==> AS Digital Solutions CI/CD setup"

mkdir -p "${APP_DIR}"
cd "${APP_DIR}"

# Preserve live secrets/data if we need to re-clone
preserve_live() {
  mkdir -p /tmp/as-digital-preserve
  [[ -f server/.env ]] && cp -a server/.env /tmp/as-digital-preserve/.env || true
  [[ -f server/data/content.db ]] && cp -a server/data/content.db /tmp/as-digital-preserve/content.db || true
  [[ -d uploads ]] && cp -a uploads /tmp/as-digital-preserve/uploads || true
}

restore_live() {
  mkdir -p server/data uploads
  [[ -f /tmp/as-digital-preserve/.env ]] && cp -a /tmp/as-digital-preserve/.env server/.env || true
  [[ -f /tmp/as-digital-preserve/content.db ]] && cp -a /tmp/as-digital-preserve/content.db server/data/content.db || true
  if [[ -d /tmp/as-digital-preserve/uploads ]]; then
    cp -a /tmp/as-digital-preserve/uploads/. uploads/ || true
  fi
}

if [[ ! -d .git ]]; then
  echo "==> Converting folder to git checkout (keeping .env / DB / uploads)"
  preserve_live
  PARENT="$(dirname "${APP_DIR}")"
  BASE="$(basename "${APP_DIR}")"
  cd "${PARENT}"
  mv "${BASE}" "${BASE}.pre-cicd-$(date +%Y%m%d%H%M%S)"
  git clone --branch main "${REPO_URL}" "${APP_DIR}"
  cd "${APP_DIR}"
  restore_live
else
  git remote set-url origin "${REPO_URL}"
  git fetch origin main
  git checkout -B main "origin/main"
fi

git config --global --add safe.directory "${APP_DIR}" 2>/dev/null || true
chmod +x deploy/deploy-app.sh deploy/poll-deploy.sh deploy/setup-cicd.sh

# Optional: same GitHub Actions key used by Crown EV (for manual SSH workflow)
mkdir -p /root/.ssh
chmod 700 /root/.ssh
AUTH=/root/.ssh/authorized_keys
touch "${AUTH}"
if ! grep -qF "${GITHUB_ACTIONS_PUBKEY}" "${AUTH}" 2>/dev/null; then
  echo "${GITHUB_ACTIONS_PUBKEY}" >> "${AUTH}"
  echo "Added GitHub Actions key to authorized_keys"
else
  echo "GitHub Actions key already present"
fi
chmod 600 "${AUTH}"

# Cron every minute (same pattern as crownev)
CRON_LINE="* * * * * bash ${APP_DIR}/deploy/poll-deploy.sh >> /var/log/as-digital-poll-deploy.log 2>&1"
touch /var/log/as-digital-poll-deploy.log
chmod 644 /var/log/as-digital-poll-deploy.log
(crontab -l 2>/dev/null | grep -v 'as-digital-solutions/deploy/poll-deploy.sh' || true; echo "${CRON_LINE}") | crontab -
echo "Installed cron: ${CRON_LINE}"

echo ""
echo "==> First deploy now"
bash "${APP_DIR}/deploy/deploy-app.sh"

echo ""
echo "Done. After this, every push to main on GitHub deploys within ~1 minute."
echo "Optional GitHub secret (manual SSH workflow): copy VPS_SSH_KEY from CROWNEV repo."
echo "  Repo: https://github.com/SHAHBAZ-084/AS-digital-solutions/settings/secrets/actions"
