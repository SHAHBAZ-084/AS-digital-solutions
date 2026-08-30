#!/usr/bin/env bash
# Production API starter (Node 22 + local tsx). Used by PM2.
cd /var/www/as-digital-solutions
exec /opt/node-v22.18.0-linux-x64/bin/node ./node_modules/tsx/dist/cli.mjs server/index.ts
