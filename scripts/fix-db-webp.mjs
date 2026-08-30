import Database from 'better-sqlite3'

const db = new Database('server/data/content.db')
const rows = db.prepare('SELECT id, screenshot_url, case_study FROM products').all()
const upd = db.prepare('UPDATE products SET screenshot_url = ?, case_study = ? WHERE id = ?')

for (const r of rows) {
  const url = String(r.screenshot_url || '')
  const cs = JSON.parse(String(r.case_study || '{}'))
  const nextUrl = url.replace(/\.(png|jpe?g)$/i, '.webp')
  if (Array.isArray(cs.screenshot_urls)) {
    cs.screenshot_urls = cs.screenshot_urls.map((u) =>
      typeof u === 'string' ? u.replace(/\.(png|jpe?g)$/i, '.webp') : u,
    )
  }
  upd.run(nextUrl, JSON.stringify(cs), r.id)
  console.log(r.id, ':', url, '->', nextUrl)
}

console.log('done')
