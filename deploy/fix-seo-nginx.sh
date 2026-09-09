#!/usr/bin/env bash
# SEO: www → apex 301 + X-Robots-Tag noindex for /admin
# Idempotent. Prefer snippet include so nginx -t failures are easy to revert.
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
  # Fall back: first enabled site mentioning the domain
  CONF="$(grep -Rl "asdigitalsolution.online" /etc/nginx/sites-enabled /etc/nginx/conf.d 2>/dev/null | head -n1 || true)"
fi

if [[ -z "${CONF:-}" || ! -f "$CONF" ]]; then
  echo "nginx site file not found"
  ls -la /etc/nginx/sites-enabled /etc/nginx/conf.d 2>/dev/null || true
  exit 1
fi

echo "Patching $CONF for SEO"
export NGINX_CONF_PATH="$CONF"
SNIPPET=/etc/nginx/snippets/as-digital-seo.conf
mkdir -p /etc/nginx/snippets

cat > "$SNIPPET" <<'EOF'
# Managed by deploy/fix-seo-nginx.sh — www → apex + admin noindex
if ($host = www.asdigitalsolution.online) {
    return 301 https://asdigitalsolution.online$request_uri;
}
EOF

python3 <<'PY'
from pathlib import Path
import os
import re

p = Path(os.environ["NGINX_CONF_PATH"])
conf = p.read_text()
changed = False

include_line = "include /etc/nginx/snippets/as-digital-seo.conf;"
if include_line not in conf:
    m = re.search(r"server_name\s+[^;]*asdigitalsolution\.online[^;]*;", conf)
    if m:
        conf = conf[: m.end()] + "\n    " + include_line + conf[m.end() :]
        changed = True
        print("added SEO snippet include")
    else:
        # Insert after first server {
        conf2, n = re.subn(r"(server\s*\{)", r"\1\n    " + include_line, conf, count=1)
        if n:
            conf = conf2
            changed = True
            print("added SEO snippet include after server {")
        else:
            raise SystemExit("could not find insertion point for SEO include")
else:
    print("SEO snippet include already present")

admin_marker = "AS_SEO_ADMIN_NOINDEX"
if admin_marker not in conf:
    snippet = f"""
    # {admin_marker}
    location ^~ /admin {{
        add_header X-Robots-Tag "noindex, nofollow" always;
        try_files $uri $uri/ /index.html;
    }}
"""
    if "location / {" in conf:
        conf = conf.replace("location / {", snippet + "\n    location / {", 1)
        changed = True
        print("added /admin X-Robots-Tag noindex")
    else:
        print("WARN: could not find location / to insert admin block")
else:
    print("admin noindex already present")

# Ensure www is listed in server_name so the host if can match (certbot often adds it)
if "www.asdigitalsolution.online" not in conf and re.search(r"server_name\s+[^;]*asdigitalsolution\.online", conf):
    conf2, n = re.subn(
        r"(server_name\s+)([^;]*asdigitalsolution\.online[^;]*);",
        r"\1\2 www.asdigitalsolution.online;",
        conf,
        count=1,
    )
    if n:
        conf = conf2
        changed = True
        print("added www to server_name (required for redirect match)")

if changed:
    p.write_text(conf)
    print("wrote", p)
else:
    print("no conf text changes (snippet file refreshed)")
PY

nginx -t
systemctl reload nginx
echo "SEO nginx OK — verify: curl -I https://www.asdigitalsolution.online/"
