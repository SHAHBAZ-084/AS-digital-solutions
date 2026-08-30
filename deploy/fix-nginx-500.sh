#!/usr/bin/env bash
# Emergency: remove the static-asset regex location that can 500 the SPA, keep http2.
set -euo pipefail

CONF="/etc/nginx/sites-available/asdigitalsolution"
if [[ ! -f "$CONF" ]]; then
  echo "missing $CONF"
  exit 1
fi

python3 <<'PY'
from pathlib import Path
import re
p = Path("/etc/nginx/sites-available/asdigitalsolution")
conf = p.read_text()
# Remove the cache location block we inserted (any whitespace variant)
new, n = re.subn(
    r"\n\s*location\s+~\*\s+\\\.\(\?:js\|css\|webp\|png\|jpg\|jpeg\|gif\|svg\|ico\|woff2\?\)\$\s*\{[^{}]*\}\s*",
    "\n",
    conf,
    count=2,
)
if n == 0:
    # fallback: looser multiline
    new, n = re.subn(
        r"location\s+~\*\s+\\.\(?:js\|css\|webp[^\{]*\{.*?try_files\s+\$uri\s+=404;\s*\}",
        "",
        conf,
        count=2,
        flags=re.S,
    )
print("removed blocks:", n)
p.write_text(new)
PY

nginx -t && systemctl reload nginx
echo "nginx restored"

# Ensure frontend exists + API up
cd /var/www/as-digital-solutions
export PATH=/opt/node-v22.18.0-linux-x64/bin:$PATH
git fetch origin main
git reset --hard origin/main
npm ci
npm run build
chmod +x start-api.sh
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save
sleep 2
curl -I https://asdigitalsolution.online/ | head -n 5
curl -I http://127.0.0.1:8788/api/site | head -n 5
ls -la dist/index.html
