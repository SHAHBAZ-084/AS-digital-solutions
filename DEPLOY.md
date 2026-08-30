# Deployment (Hostinger VPS)

Self-hosted stack: Vite static frontend + Express content API + SQLite.

## Local development

From the project root, with `server/.env` and `.env` already filled in:

```bash
npm run dev:all
```

This starts:

- Frontend: `http://localhost:5173/`
- API: `http://127.0.0.1:8787/` (`/api` is proxied by Vite in dev)

Or two terminals:

```bash
npm run dev
npm run server
```

## Production layout

1. Build the frontend: `npm run build` → output in `dist/`
2. Run the Express API as a long-lived process (PM2 recommended)
3. Serve `dist/` as static files with nginx
4. Reverse-proxy `/api` to the Express port (default `8787`)

Do not expose the SQLite file or `SESSION_SECRET` publicly.

## Environment

Copy examples, then set real values on the VPS:

- `server/.env`: `PORT`, `SESSION_SECRET` (long random string), `COOKIE_SECURE=true` behind HTTPS
- `.env` used at **build time** for Vite: `VITE_API_BASE_URL` (leave empty so the browser calls same-origin `/api`)

Admin auth uses httpOnly session cookies (no write-secret in the frontend). Default login after migrate: username `admin`, password = previous passphrase (or `CUIVHR` on a fresh DB). Change it in Admin → Settings after first login.

Rebuild the frontend after changing any `VITE_*` variable.

## PM2

Install once if it is not already on the VPS:

```bash
npm install -g pm2
```

From the project root (after `npm install`):

```bash
pm2 start npm --name as-content-api -- run server
pm2 save
pm2 startup
```

Useful checks:

```bash
pm2 status
pm2 logs as-content-api
```

SQLite lives at `server/data/content.db`. Keep that path writable by the PM2 user. Back it up with the rest of the site.

## nginx (what to configure)

Not applied here: set this up on the VPS (or ask for a follow-up):

- `root` pointing at the project `dist/` folder
- `try_files` for the SPA (`/index.html` fallback)
- `location /api/` proxied to `http://127.0.0.1:8787` (or whatever `PORT` is in `server/.env`)
- TLS as usual (Let’s Encrypt / Hostinger)

Example intent (not a full config):

```
location /api/ {
  proxy_pass http://127.0.0.1:8787;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

## Notes

- `GET /api/content` is public so saved copy is live for every visitor without a rebuild.
- `POST /api/content` requires the `x-write-secret` header and is rate-limited.
- If the API is down, the site still renders hardcoded defaults.
