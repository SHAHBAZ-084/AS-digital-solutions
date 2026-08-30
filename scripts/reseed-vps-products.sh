#!/usr/bin/env bash
# Re-seed the 6 real portfolio projects into the live SQLite DB.
set -euo pipefail
cd /var/www/as-digital-solutions
export PATH=/opt/node-v22.18.0-linux-x64/bin:$PATH

# Prefer logos from backup uploads if current folder is missing UUID files
BACKUP=$(ls -d /var/www/as-digital-solutions.pre-cicd-* 2>/dev/null | tail -1 || true)
if [[ -n "${BACKUP}" && -d "${BACKUP}/uploads" ]]; then
  cp -an "${BACKUP}/uploads/." uploads/ || true
fi

node <<'NODE'
const Database = require('better-sqlite3')
const fs = require('fs')
const path = require('path')

const db = new Database('server/data/content.db')
const uploads = path.join(process.cwd(), 'uploads')

function pick(...names) {
  for (const n of names) {
    if (n && fs.existsSync(path.join(uploads, n))) return '/uploads/' + n
  }
  return ''
}

const cs = (overview, client, challenge, solution, key_features, results, screenshot_urls) =>
  JSON.stringify({
    overview, client, challenge, solution, key_features, results,
    screenshot_urls, sections: [],
    enabled_blocks: ['overview','client','challenge','solution','key_features','results','screenshots'],
  })

const products = [
  {
    id: 'crown-ev-center', slug: 'crown-ev-center', name: 'Crown EV Center',
    industry: 'Automotive / E-Mobility', type: 'Web',
    description: "E-commerce and dealership platform for Pakistan's trusted Crown electric bike dealer.",
    tech: JSON.stringify([]), live_url: 'https://crownevcenter.com',
    screenshot: pick('crown-ev.webp','6b9ede95-5c88-402d-8e5c-749d3dcb444f.webp','6b9ede95-5c88-402d-8e5c-749d3dcb444f.png'),
    case_study: null,
  },
  {
    id: 'citynest-services', slug: 'citynest-services', name: 'CityNestServices',
    industry: 'Real Estate / Property Management', type: 'Web',
    description: 'Property rental and management platform serving landlords and investors across Brisbane and the Gold Coast.',
    tech: JSON.stringify([]), live_url: 'https://citynestservices.com.au',
    screenshot: pick('citynest-services.webp','citynest-services.png'),
    case_study: null,
  },
  {
    id: 'serve-and-lead-society', slug: 'serve-and-lead-society', name: 'Serve & Lead Society (SLS)',
    industry: 'Non-Profit / Education', type: 'Web',
    description: 'A community platform for a student-led non-profit building leaders through service, career counseling, and internships.',
    tech: JSON.stringify([]), live_url: 'https://serveandlead.org',
    screenshot: pick('serve-and-lead.webp','085e3c1a-24b7-416d-be00-e41d6eaf21e1.webp','085e3c1a-24b7-416d-be00-e41d6eaf21e1.png'),
    case_study: null,
  },
  {
    id: 'sheraz-traders-desktop', slug: 'sheraz-traders-desktop', name: 'Sheraz Traders',
    industry: 'Agriculture & Commodity Trading (Grain Market / Mandi)', type: 'Desktop',
    description: 'A desktop accounting and inventory system built for a grain market trading business, handling double-entry bookkeeping, invoicing, and stock tracking fully offline.',
    tech: JSON.stringify(['Electron','React','TypeScript','SQLite']), live_url: '',
    screenshot: pick('sheraz-traders.webp','sheraz-traders.png'),
    case_study: null,
  },
  {
    id: 'usman-mall-desktop', slug: 'usman-mall-desktop', name: 'Usman Mall',
    industry: 'Retail (Garments / Clothing Shop)', type: 'Desktop',
    description: 'A desktop POS and accounting system built for a garments retail shop, handling barcode-based billing, product/variant inventory, and double-entry bookkeeping fully offline.',
    tech: JSON.stringify(['Electron','React','TypeScript','SQLite']), live_url: '',
    screenshot: pick('usman-mall.webp','usman-mall.png'),
    case_study: null,
  },
  {
    id: 'sufi-co-grain-market-desktop', slug: 'sufi-co-grain-market-desktop', name: 'Sufi & Co Grain Market',
    industry: 'Agriculture / Grain Trading (Commission & Wholesale)', type: 'Desktop',
    description: 'A desktop POS and accounting system built for a grain commission and wholesale trading business, handling multi-type invoicing with full double-entry bookkeeping fully offline.',
    tech: JSON.stringify(['Electron','React','TypeScript','SQLite']), live_url: '',
    screenshot: pick('sufi-co.webp','sufi-co.png','0998af91-26c1-4cd1-abb5-9c1b80854b72.webp','0998af91-26c1-4cd1-abb5-9c1b80854b72.png'),
    case_study: null,
  },
]

for (const p of products) {
  p.case_study = cs(
    p.description, p.name, 'Placeholder: challenge', 'Placeholder: solution',
    [], [], p.screenshot ? [p.screenshot] : [],
  )
}

db.exec('DELETE FROM products')
const ins = db.prepare(`INSERT INTO products
  (id, slug, name, industry, type, description, tech, screenshot_url, live_url, case_study, sort_order)
  VALUES (@id, @slug, @name, @industry, @type, @description, @tech, @screenshot, @live_url, @case_study, @sort_order)`)

let i = 0
for (const p of products) {
  ins.run({ ...p, sort_order: i++ })
  console.log('ok', p.name, p.screenshot || '(no image)')
}

try {
  db.prepare(`UPDATE contact_info SET email = ? WHERE id = 1`).run('contactasdigitalsolutions@gmail.com')
} catch (_) {}

console.log('products:', db.prepare('SELECT name FROM products ORDER BY sort_order').all().map(r => r.name).join(' | '))
NODE

pm2 restart as-content-api --update-env
sleep 2
curl -s https://asdigitalsolution.online/api/site | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>console.log(JSON.parse(d).products.map(p=>p.name).join('\\n')))"
