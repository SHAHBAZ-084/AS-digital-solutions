#!/usr/bin/env bash
# SEO: www → apex 301 + X-Robots-Tag noindex for /admin
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
  echo "nginx site file not found"
  ls -la /etc/nginx/sites-enabled /etc/nginx/conf.d 2>/dev/null || true
  exit 1
fi

echo "Patching $CONF for SEO"
export NGINX_CONF_PATH="$CONF"

python3 <<'PY'
from pathlib import Path
import os
import re

p = Path(os.environ["NGINX_CONF_PATH"])
conf = p.read_text()
changed = False

www_marker = "AS_SEO_WWW_REDIRECT"
if www_marker not in conf:
    # Safe inside existing SSL server (keeps certbot certs intact)
    snippet = f"""
    # {www_marker}
    if ($host = www.asdigitalsolution.online) {{
        return 301 https://asdigitalsolution.online$request_uri;
    }}
"""
    # Insert after first server_name line that mentions the domain
    m = re.search(r"server_name\s+[^;]*asdigitalsolution\.online[^;]*;", conf)
    if m:
        insert_at = m.end()
        conf = conf[:insert_at] + "\n" + snippet + conf[insert_at:]
        changed = True
        print("added www → apex 301")
    else:
        print("could not find server_name for domain")
else:
    print("www redirect already present")

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
        print("could not find location / to insert admin block")
else:
    print("admin noindex already present")

if changed:
    p.write_text(conf)
    print("wrote", p)
else:
    print("no changes")
PY

nginx -t && systemctl reload nginx
echo "SEO nginx OK"
