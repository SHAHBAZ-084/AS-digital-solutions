#!/usr/bin/env bash
# One-time / safe-to-rerun: long cache for hashed assets + ensure http2 on HTTPS.
set -euo pipefail

CONF=""
for candidate in \
  /etc/nginx/sites-available/asdigitalsolution \
  /etc/nginx/sites-enabled/asdigitalsolution \
  /etc/nginx/sites-available/asdigitalsolution.online \
  /etc/nginx/sites-enabled/asdigitalsolution.online \
  /etc/nginx/conf.d/asdigitalsolution.online.conf
do
  if [[ -f "$candidate" ]]; then CONF="$candidate"; break; fi
done

if [[ -z "$CONF" ]]; then
  echo "nginx site file not found; listing:"
  ls -la /etc/nginx/sites-enabled /etc/nginx/conf.d 2>/dev/null || true
  exit 1
fi

echo "Patching $CONF"
export NGINX_CONF_PATH="$CONF"

python3 <<'PY'
from pathlib import Path
import os
import re

p = Path(os.environ["NGINX_CONF_PATH"])
conf = p.read_text()
changed = False

def add_http2(m):
    line = m.group(0)
    if "http2" in line:
        return line
    if "ssl;" in line:
        return line.replace("ssl;", "ssl http2;")
    return line.replace("ssl", "ssl http2")

new = re.sub(r"listen\s+443[^;]*;", add_http2, conf)
if new != conf:
    conf = new
    changed = True
    print("enabled http2 on :443")

marker = "CACHE_CONTROL_STATIC_ASSETS"
# Do not inject a regex location with try_files — it can 500 the SPA / uploads.
# Keep http2 only.
if False and marker not in conf:
    snippet = """
    # CACHE_CONTROL_STATIC_ASSETS
    location ~* \\.(?:js|css|webp|png|jpg|jpeg|gif|svg|ico|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
        try_files $uri =404;
    }
"""
    if "location / {" in conf:
        conf = conf.replace("location / {", snippet + "\n    location / {", 1)
        changed = True
        print("added static asset cache")
    else:
        print("could not find location / { to insert cache block")
else:
    print("skipping static cache location (use expires in location /assets/ instead)")

if changed:
    p.write_text(conf)
    print("wrote", p)
else:
    print("no nginx changes needed")
PY

nginx -t && systemctl reload nginx
echo "nginx OK"
