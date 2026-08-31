import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import multer from 'multer'
import bcrypt from 'bcrypt'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  clearLoginFailures, clearSessionCookie, createSessionToken, isLoginLocked, lockoutRemainingMs, readSession, recordLoginFailure, SESSION_COOKIE, sessionCookieOptions, touchSession,
} from './auth.ts'
import {
  deleteProduct, deleteService, deleteTeam, deleteTechnology, findAdminByUsername, getContact, getFooter, getProcess, getWhyUs, listProducts, listServices, listSite, listTeam, listTechnologies, productExists, serviceExists, setFooter, setProcess, setWhyUs, teamExists, technologyExists, updateAdminPasswordHash, upsertContact, upsertProduct, upsertService, upsertTeam, upsertTechnology,
} from './db.ts'
import { loadEnv } from './env.ts'

const { PORT, SESSION_SECRET, COOKIE_SECURE } = loadEnv()
const app = express()
const root = path.dirname(fileURLToPath(import.meta.url))
/** Project-root uploads/ (same folder tracked in git + used by deploy). */
const uploadsDir = path.join(root, '..', 'uploads')
fs.mkdirSync(uploadsDir, { recursive: true })

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir), filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase()
      cb(null, `${randomUUID()}${ALLOWED_EXT.has(ext) ? ext : '.png'}`)
    }, }), limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (!ALLOWED_TYPES.has(file.mimetype) || !ALLOWED_EXT.has(ext)) {
      cb(new Error('invalid-type'))
      return
    }
    cb(null, true)
  },
})

const postHits = new Map<string, number[]>()
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 40

app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use('/uploads', express.static(uploadsDir))

function clientIp(req: express.Request) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0]?.trim() || req.ip || 'unknown'
  }
  return req.ip || 'unknown'
}

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (postHits.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS)
  if (recent.length >= RATE_MAX) {
    postHits.set(ip, recent)
    return true
  }
  recent.push(now)
  postHits.set(ip, recent)
  return false
}

function requireWrite(req: express.Request, res: express.Response, next: express.NextFunction) {
  const session = readSession(req, SESSION_SECRET)
  if (!session) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }
  if (rateLimited(clientIp(req))) {
    res.status(429).json({ error: 'too many requests' })
    return
  }
  touchSession(res, session.username, SESSION_SECRET, COOKIE_SECURE)
  ;(req as express.Request & { adminUsername?: string }).adminUsername = session.username
  next()
}

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback
}

function asStringArray(value: unknown) {
  const clean = (item: string) =>
    item.replace(/^[\s•·\-–—*\u2022\u2023\u25E6\u2043\u00B7]+/u, '').trim()
  if (Array.isArray(value)) {
    return value
      .filter((item) => typeof item === 'string')
      .map((item) => clean(item))
      .filter(Boolean)
  }
  if (typeof value === 'string') {
    return value
      .split(/\r?\n|,/)
      .map((item) => clean(item))
      .filter(Boolean)
  }
  return []
}

function asInt(value: unknown, fallback = 0) {
  const n = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(n) ? Math.trunc(n) : fallback
}

function asCaseStudy(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {
      overview: '', client: '', challenge: '', solution: '', key_features: [] as string[], results: [] as string[], screenshot_urls: [] as string[], enabled_blocks: [
        'overview', 'client', 'challenge', 'solution', 'key_features', 'results', 'screenshots', ], sections: [] as { id: string; title: string; body: string; bullets: string[] }[], }
  }
  const record = value as Record<string, unknown>
  const sections = Array.isArray(record.sections)
    ? record.sections
        .map((item) => {
          if (!item || typeof item !== 'object' || Array.isArray(item)) return null
          const section = item as Record<string, unknown>
          return {
            id: typeof section.id === 'string' ? section.id : randomUUID(), title: typeof section.title === 'string' ? section.title : 'Section', body: typeof section.body === 'string' ? section.body : '', bullets: Array.isArray(section.bullets)
              ? section.bullets.filter((b): b is string => typeof b === 'string')
              : [], }
        })
        .filter((item): item is { id: string; title: string; body: string; bullets: string[] } => item !== null)
    : []
  return {
    overview: asString(record.overview), client: asString(record.client), challenge: asString(record.challenge), solution: asString(record.solution), key_features: asStringArray(record.key_features), results: asStringArray(record.results), screenshot_urls: asStringArray(record.screenshot_urls), enabled_blocks: asStringArray(record.enabled_blocks).length
      ? asStringArray(record.enabled_blocks)
      : [
          'overview', 'client', 'challenge', 'solution', 'key_features', 'results', 'screenshots', ], sections, }
}

function productPayload(body: unknown, id: string) {
  const record = body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : {}
  const caseStudy = asCaseStudy(record.case_study)
  const screenshotUrls =
    caseStudy.screenshot_urls.length > 0
      ? caseStudy.screenshot_urls
      : asString(record.screenshot_url)
        ? [asString(record.screenshot_url)]
        : []
  const screenshot_url = screenshotUrls[0] ?? asString(record.screenshot_url)
  return {
    id, slug: asString(record.slug) || id, name: asString(record.name), industry: asString(record.industry), type: asString(record.type), description: asString(record.description), tech: asStringArray(record.tech), screenshot_url, live_url: asString(record.live_url), sort_order: asInt(record.sort_order, 0), case_study: { ...caseStudy, screenshot_urls: screenshotUrls }, }
}

function asId(value: unknown) {
  const id = asString(value)
  return id || randomUUID()
}

app.get('/api/site', (_req, res) => {
  res.json(listSite())
})

app.get('/api/services', (_req, res) => {
  res.json(listServices())
})
app.post('/api/services', requireWrite, (req, res) => {
  const id = asId(req.body?.id)
  if (serviceExists(id)) {
    res.status(409).json({ error: 'exists' })
    return
  }
  upsertService({
    id, title: asString(req.body?.title), description: asString(req.body?.description), icon: asString(req.body?.icon), features: asStringArray(req.body?.features), sort_order: asInt(req.body?.sort_order, 0), })
  res.json({ ok: true, id })
})
app.put('/api/services/:id', requireWrite, (req, res) => {
  const id = req.params.id
  upsertService({
    id, title: asString(req.body?.title), description: asString(req.body?.description), icon: asString(req.body?.icon), features: asStringArray(req.body?.features), sort_order: asInt(req.body?.sort_order, 0), })
  res.json({ ok: true, id })
})
app.delete('/api/services/:id', requireWrite, (req, res) => {
  if (!deleteService(req.params.id)) {
    res.status(404).json({ error: 'missing' })
    return
  }
  res.json({ ok: true })
})

app.get('/api/products', (_req, res) => {
  res.json(listProducts())
})
app.post('/api/products', requireWrite, (req, res) => {
  const id = asId(req.body?.id)
  if (productExists(id)) {
    res.status(409).json({ error: 'exists' })
    return
  }
  upsertProduct(productPayload(req.body, id))
  res.json({ ok: true, id })
})
app.put('/api/products/:id', requireWrite, (req, res) => {
  const id = req.params.id
  upsertProduct(productPayload(req.body, id))
  res.json({ ok: true, id })
})
app.delete('/api/products/:id', requireWrite, (req, res) => {
  if (!deleteProduct(req.params.id)) {
    res.status(404).json({ error: 'missing' })
    return
  }
  res.json({ ok: true })
})

app.get('/api/team', (_req, res) => {
  res.json(listTeam())
})
app.post('/api/team', requireWrite, (req, res) => {
  const id = asId(req.body?.id)
  if (teamExists(id)) {
    res.status(409).json({ error: 'exists' })
    return
  }
  upsertTeam({
    id, name: asString(req.body?.name), role: asString(req.body?.role), bio: asString(req.body?.bio), skills: asStringArray(req.body?.skills), photo_url: asString(req.body?.photo_url), links: {
      linkedin: asString(req.body?.links?.linkedin ?? req.body?.linkedin), email: asString(req.body?.links?.email ?? req.body?.email), }, sort_order: asInt(req.body?.sort_order, 0), })
  res.json({ ok: true, id })
})
app.put('/api/team/:id', requireWrite, (req, res) => {
  const id = req.params.id
  upsertTeam({
    id, name: asString(req.body?.name), role: asString(req.body?.role), bio: asString(req.body?.bio), skills: asStringArray(req.body?.skills), photo_url: asString(req.body?.photo_url), links: {
      linkedin: asString(req.body?.links?.linkedin ?? req.body?.linkedin), email: asString(req.body?.links?.email ?? req.body?.email), }, sort_order: asInt(req.body?.sort_order, 0), })
  res.json({ ok: true, id })
})
app.delete('/api/team/:id', requireWrite, (req, res) => {
  if (!deleteTeam(req.params.id)) {
    res.status(404).json({ error: 'missing' })
    return
  }
  res.json({ ok: true })
})

app.get('/api/technologies', (_req, res) => {
  res.json(listTechnologies())
})
app.post('/api/technologies', requireWrite, (req, res) => {
  const id = asId(req.body?.id)
  if (technologyExists(id)) {
    res.status(409).json({ error: 'exists' })
    return
  }
  upsertTechnology({
    id, name: asString(req.body?.name), category: asString(req.body?.category), icon: asString(req.body?.icon), sort_order: asInt(req.body?.sort_order, 0), })
  res.json({ ok: true, id })
})
app.put('/api/technologies/:id', requireWrite, (req, res) => {
  const id = req.params.id
  upsertTechnology({
    id, name: asString(req.body?.name), category: asString(req.body?.category), icon: asString(req.body?.icon), sort_order: asInt(req.body?.sort_order, 0), })
  res.json({ ok: true, id })
})
app.delete('/api/technologies/:id', requireWrite, (req, res) => {
  if (!deleteTechnology(req.params.id)) {
    res.status(404).json({ error: 'missing' })
    return
  }
  res.json({ ok: true })
})

app.get('/api/contact', (_req, res) => {
  res.json(getContact())
})
app.put('/api/contact', requireWrite, (req, res) => {
  upsertContact({
    whatsapp_number: asString(req.body?.whatsapp_number), email: asString(req.body?.email), phone: asString(req.body?.phone), address: asString(req.body?.address), socials: {
      linkedin: asString(req.body?.socials?.linkedin ?? req.body?.linkedin), facebook: asString(req.body?.socials?.facebook ?? req.body?.facebook), instagram: asString(req.body?.socials?.instagram ?? req.body?.instagram), }, })
  res.json({ ok: true })
})

app.put('/api/footer', requireWrite, (req, res) => {
  const current = getFooter()
  const body = req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? (req.body as Record<string, unknown>) : {}
  const columns = Array.isArray(body.columns)
    ? body.columns
        .map((item) => {
          if (!item || typeof item !== 'object' || Array.isArray(item)) return null
          const column = item as Record<string, unknown>
          const links = Array.isArray(column.links)
            ? column.links
                .map((link) => {
                  if (!link || typeof link !== 'object' || Array.isArray(link)) return null
                  const row = link as Record<string, unknown>
                  return {
                    id: asString(row.id) || randomUUID(), label: asString(row.label), href: asString(row.href), }
                })
                .filter((link): link is { id: string; label: string; href: string } => link !== null)
            : []
          return {
            id: asString(column.id) || randomUUID(), title: asString(column.title) || 'Column', links, }
        })
        .filter((item): item is { id: string; title: string; links: { id: string; label: string; href: string }[] } => item !== null)
    : current.columns
  setFooter({
    blurb: asString(body.blurb, current.blurb), copyright: asString(body.copyright, current.copyright), privacy_label: asString(body.privacy_label, current.privacy_label), terms_label: asString(body.terms_label, current.terms_label), columns, })
  res.json({ ok: true })
})

app.put('/api/why-us', requireWrite, (req, res) => {
  const current = getWhyUs()
  const body = req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? (req.body as Record<string, unknown>) : {}
  const items = Array.isArray(body.items)
    ? body.items
        .map((item) => {
          if (!item || typeof item !== 'object' || Array.isArray(item)) return null
          const row = item as Record<string, unknown>
          return {
            id: asString(row.id) || randomUUID(), title: asString(row.title), description: asString(row.description), }
        })
        .filter((item): item is { id: string; title: string; description: string } => item !== null)
    : current.items
  setWhyUs({
    eyebrow: asString(body.eyebrow, current.eyebrow), title: asString(body.title, current.title), subtitle: asString(body.subtitle, current.subtitle), items, })
  res.json({ ok: true })
})

app.put('/api/process', requireWrite, (req, res) => {
  const current = getProcess()
  const body = req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? (req.body as Record<string, unknown>) : {}
  const steps = Array.isArray(body.steps)
    ? body.steps
        .map((item, index) => {
          if (!item || typeof item !== 'object' || Array.isArray(item)) return null
          const row = item as Record<string, unknown>
          const number = asString(row.number) || String(index + 1).padStart(2, '0')
          return {
            id: asString(row.id) || number, number, title: asString(row.title), description: asString(row.description), }
        })
        .filter((item): item is { id: string; number: string; title: string; description: string } => item !== null)
    : current.steps
  setProcess({
    eyebrow: asString(body.eyebrow, current.eyebrow), title: asString(body.title, current.title), subtitle: asString(body.subtitle, current.subtitle), steps, })
  res.json({ ok: true })
})

app.post('/api/upload', requireWrite, (req, res, next) => {
  upload.single('file')(req, res, (error: unknown) => {
    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      res.status(413).json({ error: 'too-large' })
      return
    }
    if (error) {
      res.status(400).json({ error: 'invalid' })
      return
    }
    next()
  })
}, (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'missing' })
    return
  }
  res.json({ url: `/uploads/${req.file.filename}` })
})

app.post('/api/admin/login', async (req, res) => {
  const ip = clientIp(req)
  if (isLoginLocked(ip)) {
    res.status(429).json({
      error: 'locked', retryAfterMs: lockoutRemainingMs(ip), })
    return
  }
  if (rateLimited(ip)) {
    res.status(429).json({ error: 'too many requests' })
    return
  }

  const username = asString(req.body?.username)
  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  if (!username || !password) {
    res.status(400).json({ error: 'invalid' })
    return
  }

  const user = findAdminByUsername(username)
  const ok = user ? await bcrypt.compare(password, user.password_hash) : false
  if (!user || !ok) {
    recordLoginFailure(ip)
    if (isLoginLocked(ip)) {
      res.status(429).json({
        error: 'locked', retryAfterMs: lockoutRemainingMs(ip), })
      return
    }
    res.status(401).json({ error: 'unauthorized' })
    return
  }

  clearLoginFailures(ip)
  const token = createSessionToken(user.username, SESSION_SECRET)
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions(COOKIE_SECURE))
  res.json({ ok: true, username: user.username })
})

app.post('/api/admin/logout', (_req, res) => {
  clearSessionCookie(res, COOKIE_SECURE)
  res.json({ ok: true })
})

app.get('/api/admin/me', (req, res) => {
  const session = readSession(req, SESSION_SECRET)
  if (!session) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }
  touchSession(res, session.username, SESSION_SECRET, COOKIE_SECURE)
  res.json({ username: session.username })
})

app.get('/api/admin/settings', requireWrite, (req, res) => {
  const username =
    (req as express.Request & { adminUsername?: string }).adminUsername ??
    readSession(req, SESSION_SECRET)?.username ??
    ''
  res.json({ username })
})

app.put('/api/admin/password', requireWrite, async (req, res) => {
  const username =
    (req as express.Request & { adminUsername?: string }).adminUsername ??
    readSession(req, SESSION_SECRET)?.username
  if (!username) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }

  const currentPassword = typeof req.body?.currentPassword === 'string' ? req.body.currentPassword : ''
  const newPassword = typeof req.body?.newPassword === 'string' ? req.body.newPassword : ''
  if (!currentPassword || newPassword.length < 8) {
    res.status(400).json({ error: 'invalid' })
    return
  }

  const user = findAdminByUsername(username)
  if (!user || !(await bcrypt.compare(currentPassword, user.password_hash))) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }

  const password_hash = await bcrypt.hash(newPassword, 12)
  updateAdminPasswordHash(user.id, password_hash)
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`API listening on http://127.0.0.1:${PORT}`)
})
