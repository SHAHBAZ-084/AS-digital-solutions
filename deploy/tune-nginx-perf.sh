#!/usr/bin/env bash
# Safe nginx performance: gzip + long cache for hashed /assets/ only (no SPA-breaking regex).
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

# Dedicated hashed Vite assets — safe (does not catch SPA routes).
assets_marker = "AS_PERF_ASSETS_CACHE"
if assets_marker not in conf and "location /assets/" not in conf:
    snippet = f"""
    # {assets_marker}
    location /assets/ {{
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files $uri =404;
        access_log off;
    }}
"""
    if "location / {" in conf:
        conf = conf.replace("location / {", snippet + "\n    location / {", 1)
        changed = True
        print("added /assets/ long-cache location")
    else:
        print("could not find location / {{ to insert /assets/ block")
elif "location /assets/" in conf:
    print("/assets/ location already present")

# Hero LCP + favicons — short immutable-ish cache
hero_marker = "AS_PERF_HERO_CACHE"
if hero_marker not in conf:
    snippet = f"""
    # {hero_marker}
    location = /hero-lcp.webp {{
        expires 7d;
        add_header Cache-Control "public, max-age=604800";
        access_log off;
    }}
"""
    if "location / {" in conf:
        conf = conf.replace("location / {", snippet + "\n    location / {", 1)
        changed = True
        print("added hero-lcp cache location")

# gzip in this server block if missing (http-level gzip is better; this is a safe fallback)
if "gzip on;" not in conf:
    gzip_snip = """
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 5;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml image/svg+xml font/woff2;
"""
    # Insert after first server { 
    conf2, n = re.subn(r"(server\s*\{)", r"\1" + gzip_snip, conf, count=1)
    if n:
        conf = conf2
        changed = True
        print("enabled gzip in server block")

# Optional brotli if module present — comment-only hint; do not fail if missing
brotli_marker = "AS_PERF_BROTLI"
if brotli_marker not in conf:
    # Only add if nginx was built with brotli (test later); use optional include pattern
    pass

if changed:
    p.write_text(conf)
    print("wrote", p)
else:
    print("no nginx changes needed")
PY

# Enable gzip at http level if not already (idempotent snippet)
HTTP_CONF=/etc/nginx/nginx.conf
if [[ -f "$HTTP_CONF" ]] && ! grep -q "gzip on;" "$HTTP_CONF"; then
  echo "Note: enable gzip in $HTTP_CONF http{} if not already set"
fi

# Try enable brotli package snippet if module exists
if nginx -V 2>&1 | grep -qi brotli; then
  if ! grep -q "brotli on;" "$CONF"; then
    echo "brotli module detected — ensure brotli on; in http or server"
  fi
fi

nginx -t && systemctl reload nginx
echo "nginx OK"
