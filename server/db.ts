import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcrypt'
import {
  seedContact, seedProducts, seedServices, seedTeam, seedTechnologies,
} from './seed.ts'

const require = createRequire(import.meta.url)
const Database = require('better-sqlite3') as typeof import('better-sqlite3')

const root = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(root, 'data')
fs.mkdirSync(dataDir, { recursive: true })

const db = new Database(path.join(dataDir, 'content.db'))
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL, icon TEXT NOT NULL DEFAULT '', features TEXT NOT NULL DEFAULT '[]', sort_order INTEGER NOT NULL DEFAULT 0, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL, industry TEXT NOT NULL DEFAULT '', type TEXT NOT NULL DEFAULT '', description TEXT NOT NULL DEFAULT '', tech TEXT NOT NULL DEFAULT '[]', screenshot_url TEXT NOT NULL DEFAULT '', live_url TEXT NOT NULL DEFAULT '', case_study TEXT NOT NULL DEFAULT '{}', sort_order INTEGER NOT NULL DEFAULT 0, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS team_members (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, role TEXT NOT NULL DEFAULT '', bio TEXT NOT NULL DEFAULT '', skills TEXT NOT NULL DEFAULT '[]', links TEXT NOT NULL DEFAULT '{}', photo_url TEXT NOT NULL DEFAULT '', sort_order INTEGER NOT NULL DEFAULT 0, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS technologies (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL DEFAULT '', icon TEXT NOT NULL DEFAULT '', sort_order INTEGER NOT NULL DEFAULT 0, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contact_info (
    id INTEGER PRIMARY KEY CHECK (id = 1), whatsapp_number TEXT NOT NULL DEFAULT '', email TEXT NOT NULL DEFAULT '', phone TEXT NOT NULL DEFAULT '', address TEXT NOT NULL DEFAULT '', socials TEXT NOT NULL DEFAULT '{}'
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY, value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE COLLATE NOCASE, password_hash TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`)

const productColumns = db.prepare('PRAGMA table_info(products)').all() as { name: string }[]
if (!productColumns.some((column) => column.name === 'live_url')) {
  db.exec(`ALTER TABLE products ADD COLUMN live_url TEXT NOT NULL DEFAULT ''`)
}
if (!productColumns.some((column) => column.name === 'case_study')) {
  db.exec(`ALTER TABLE products ADD COLUMN case_study TEXT NOT NULL DEFAULT '{}'`)
}

const teamColumns = db.prepare('PRAGMA table_info(team_members)').all() as { name: string }[]
if (!teamColumns.some((column) => column.name === 'photo_url')) {
  db.exec(`ALTER TABLE team_members ADD COLUMN photo_url TEXT NOT NULL DEFAULT ''`)
}

db.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES ('passphrase', 'CUIVHR')`).run()

db.prepare(
  `UPDATE contact_info
   SET phone = '03220726006'
   WHERE id = 1 AND (phone = '' OR phone = '+92-XXX-XXXXXXX')`,
).run()

{
  const socialsJson = JSON.stringify({
    linkedin: 'https://www.linkedin.com/in/muhammad-shahbaz-171563400',
    facebook: 'https://www.facebook.com/share/1QcWxrrhpV/',
    instagram: 'https://www.instagram.com/digital_solutions_pk',
  })
  db.prepare(
    `UPDATE contact_info
     SET socials = ?
     WHERE id = 1 AND (
       socials IS NULL
       OR socials = ''
       OR socials = '{}'
       OR socials LIKE '%"linkedin":""%'
       OR socials LIKE '%"facebook":""%'
       OR socials LIKE '%"instagram":""%'
     )`,
  ).run(socialsJson)
}

function parseStringArray(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw)
    if (!Array.isArray(value)) return []
    return value
      .filter((item) => typeof item === 'string')
      .map((item) => item.replace(/^[\s•·\-–—*\u2022\u2023\u25E6\u2043\u00B7]+/u, '').trim())
      .filter(Boolean)
  } catch {
    return []
  }
}

function parseLinks(raw: string) {
  try {
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return { linkedin: '', email: '' }
    }
    const record = value as { linkedin?: unknown; email?: unknown }
    return {
      linkedin: typeof record.linkedin === 'string' ? record.linkedin : '', email: typeof record.email === 'string' ? record.email : '', }
  } catch {
    return { linkedin: '', email: '' }
  }
}

function parseCaseStudy(raw: string) {
  const empty = {
    overview: '', client: '', challenge: '', solution: '', key_features: [] as string[], results: [] as string[], screenshot_urls: [] as string[], enabled_blocks: [
      'overview', 'client', 'challenge', 'solution', 'key_features', 'results', 'screenshots', ], sections: [] as { id: string; title: string; body: string; bullets: string[] }[], }
  try {
    const value: unknown = JSON.parse(raw || '{}')
    if (!value || typeof value !== 'object' || Array.isArray(value)) return empty
    const record = value as Record<string, unknown>
    const sections = Array.isArray(record.sections)
      ? record.sections
          .map((item) => {
            if (!item || typeof item !== 'object' || Array.isArray(item)) return null
            const section = item as Record<string, unknown>
            const id = typeof section.id === 'string' ? section.id : `${Date.now()}`
            const title = typeof section.title === 'string' ? section.title : 'Section'
            const body = typeof section.body === 'string' ? section.body : ''
            const bullets = Array.isArray(section.bullets)
              ? section.bullets.filter((b): b is string => typeof b === 'string')
              : []
            return { id, title, body, bullets }
          })
          .filter((item): item is { id: string; title: string; body: string; bullets: string[] } => item !== null)
      : []
    return {
      overview: typeof record.overview === 'string' ? record.overview : empty.overview, client: typeof record.client === 'string' ? record.client : empty.client, challenge: typeof record.challenge === 'string' ? record.challenge : empty.challenge, solution: typeof record.solution === 'string' ? record.solution : empty.solution, key_features: Array.isArray(record.key_features)
        ? record.key_features.filter((item): item is string => typeof item === 'string')
        : empty.key_features, results: Array.isArray(record.results)
        ? record.results.filter((item): item is string => typeof item === 'string')
        : empty.results, screenshot_urls: Array.isArray(record.screenshot_urls)
        ? record.screenshot_urls.filter((item): item is string => typeof item === 'string')
        : empty.screenshot_urls, enabled_blocks: Array.isArray(record.enabled_blocks)
        ? record.enabled_blocks.filter((item): item is string => typeof item === 'string')
        : [
            'overview', 'client', 'challenge', 'solution', 'key_features', 'results', 'screenshots', ], sections, }
  } catch {
    return empty
  }
}

function parseSocials(raw: string) {
  try {
    const value: unknown = JSON.parse(raw)
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return { linkedin: '', facebook: '', instagram: '' }
    }
    const record = value as { linkedin?: unknown; facebook?: unknown; instagram?: unknown }
    return {
      linkedin: typeof record.linkedin === 'string' ? record.linkedin : '', facebook: typeof record.facebook === 'string' ? record.facebook : '', instagram: typeof record.instagram === 'string' ? record.instagram : '', }
  } catch {
    return { linkedin: '', facebook: '', instagram: '' }
  }
}

export interface ServiceRow {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  sort_order: number
}

export interface ProductCaseStudyRow {
  overview: string
  client: string
  challenge: string
  solution: string
  key_features: string[]
  results: string[]
  screenshot_urls: string[]
  enabled_blocks: string[]
  sections: { id: string; title: string; body: string; bullets: string[] }[]
}

export interface ProductRow {
  id: string
  slug: string
  name: string
  industry: string
  type: string
  description: string
  tech: string[]
  screenshot_url: string
  live_url: string
  sort_order: number
  case_study: ProductCaseStudyRow
}

export interface TeamRow {
  id: string
  name: string
  role: string
  bio: string
  skills: string[]
  links: { linkedin: string; email: string }
  photo_url: string
  sort_order: number
}

export interface TechnologyRow {
  id: string
  name: string
  category: string
  icon: string
  sort_order: number
}

export interface ContactRow {
  whatsapp_number: string
  email: string
  phone: string
  address: string
  socials: { linkedin: string; facebook: string; instagram: string }
}

const countServices = db.prepare('SELECT COUNT(*) AS count FROM services')
const countProducts = db.prepare('SELECT COUNT(*) AS count FROM products')
const countTeam = db.prepare('SELECT COUNT(*) AS count FROM team_members')
const countTech = db.prepare('SELECT COUNT(*) AS count FROM technologies')
const countContact = db.prepare('SELECT COUNT(*) AS count FROM contact_info')

const insertService = db.prepare(`
  INSERT INTO services (id, title, description, icon, features, sort_order)
  VALUES (@id, @title, @description, @icon, @features, @sort_order)
`)
const insertProduct = db.prepare(`
  INSERT INTO products (id, slug, name, industry, type, description, tech, screenshot_url, live_url, case_study, sort_order)
  VALUES (@id, @slug, @name, @industry, @type, @description, @tech, @screenshot_url, @live_url, @case_study, @sort_order)
`)
const insertTeam = db.prepare(`
  INSERT INTO team_members (id, name, role, bio, skills, links, photo_url, sort_order)
  VALUES (@id, @name, @role, @bio, @skills, @links, @photo_url, @sort_order)
`)
const insertTech = db.prepare(`
  INSERT INTO technologies (id, name, category, icon, sort_order)
  VALUES (@id, @name, @category, @icon, @sort_order)
`)
const insertContact = db.prepare(`
  INSERT INTO contact_info (id, whatsapp_number, email, phone, address, socials)
  VALUES (1, @whatsapp_number, @email, @phone, @address, @socials)
`)

const seedIfEmpty = db.transaction(() => {
  if ((countServices.get() as { count: number }).count === 0) {
    seedServices.forEach((item, index) =>
      insertService.run({
        ...item, features: JSON.stringify(item.features), sort_order: index, }), )
  }
  if ((countProducts.get() as { count: number }).count === 0) {
    seedProducts.forEach((item, index) =>
      insertProduct.run({
        ...item, tech: JSON.stringify(item.tech), live_url: item.live_url ?? '', case_study: JSON.stringify(item.case_study ?? {}), sort_order: index, }), )
  }
  if ((countTeam.get() as { count: number }).count === 0) {
    seedTeam.forEach((item, index) =>
      insertTeam.run({
        ...item, skills: JSON.stringify(item.skills), links: JSON.stringify(item.links), photo_url: '', sort_order: index, }), )
  }
  if ((countTech.get() as { count: number }).count === 0) {
    seedTechnologies.forEach((item, index) => insertTech.run({ ...item, sort_order: index }))
  }
  if ((countContact.get() as { count: number }).count === 0) {
    insertContact.run({
      ...seedContact, socials: JSON.stringify(seedContact.socials), })
  }
})

seedIfEmpty()

type ServiceRecord = {
  id: string
  title: string
  description: string
  icon: string
  features: string
  sort_order: number
}
type ProductRecord = {
  id: string
  slug: string
  name: string
  industry: string
  type: string
  description: string
  tech: string
  screenshot_url: string
  live_url: string
  case_study: string
  sort_order: number
}
type TeamRecord = {
  id: string
  name: string
  role: string
  bio: string
  skills: string
  links: string
  photo_url: string
  sort_order: number
}
type ContactRecord = {
  whatsapp_number: string
  email: string
  phone: string
  address: string
  socials: string
}

function mapService(row: ServiceRecord): ServiceRow {
  return { ...row, features: parseStringArray(row.features), sort_order: row.sort_order ?? 0 }
}
function mapProduct(row: ProductRecord): ProductRow {
  return {
    ...row, tech: parseStringArray(row.tech), live_url: row.live_url ?? '', sort_order: row.sort_order ?? 0, case_study: parseCaseStudy(row.case_study ?? '{}'), }
}
function mapTeam(row: TeamRecord): TeamRow {
  return {
    ...row, skills: parseStringArray(row.skills), links: parseLinks(row.links), photo_url: row.photo_url ?? '', sort_order: row.sort_order ?? 0, }
}
function mapContact(row: ContactRecord): ContactRow {
  return { ...row, socials: parseSocials(row.socials) }
}

const selectServices = db.prepare(
  'SELECT id, title, description, icon, features, sort_order FROM services ORDER BY sort_order, id',
)
const selectProducts = db.prepare(
  'SELECT id, slug, name, industry, type, description, tech, screenshot_url, live_url, case_study, sort_order FROM products ORDER BY sort_order, id',
)
const selectTeam = db.prepare(
  'SELECT id, name, role, bio, skills, links, photo_url, sort_order FROM team_members ORDER BY sort_order, id',
)
const selectTech = db.prepare(
  'SELECT id, name, category, icon, sort_order FROM technologies ORDER BY sort_order, id',
)
const selectContact = db.prepare(
  'SELECT whatsapp_number, email, phone, address, socials FROM contact_info WHERE id = 1',
)

const getService = db.prepare('SELECT id FROM services WHERE id = ?')
const getProduct = db.prepare('SELECT id FROM products WHERE id = ?')
const getTeam = db.prepare('SELECT id FROM team_members WHERE id = ?')
const getTech = db.prepare('SELECT id FROM technologies WHERE id = ?')

const upsertServiceSql = db.prepare(`
  INSERT INTO services (id, title, description, icon, features, sort_order, updated_at)
  VALUES (@id, @title, @description, @icon, @features, @sort_order, CURRENT_TIMESTAMP)
  ON CONFLICT(id) DO UPDATE SET
    title = excluded.title, description = excluded.description, icon = excluded.icon, features = excluded.features, sort_order = excluded.sort_order, updated_at = CURRENT_TIMESTAMP
`)
const upsertProductSql = db.prepare(`
  INSERT INTO products (id, slug, name, industry, type, description, tech, screenshot_url, live_url, case_study, sort_order, updated_at)
  VALUES (@id, @slug, @name, @industry, @type, @description, @tech, @screenshot_url, @live_url, @case_study, @sort_order, CURRENT_TIMESTAMP)
  ON CONFLICT(id) DO UPDATE SET
    slug = excluded.slug, name = excluded.name, industry = excluded.industry, type = excluded.type, description = excluded.description, tech = excluded.tech, screenshot_url = excluded.screenshot_url, live_url = excluded.live_url, case_study = excluded.case_study, sort_order = excluded.sort_order, updated_at = CURRENT_TIMESTAMP
`)
const upsertTeamSql = db.prepare(`
  INSERT INTO team_members (id, name, role, bio, skills, links, photo_url, sort_order, updated_at)
  VALUES (@id, @name, @role, @bio, @skills, @links, @photo_url, @sort_order, CURRENT_TIMESTAMP)
  ON CONFLICT(id) DO UPDATE SET
    name = excluded.name, role = excluded.role, bio = excluded.bio, skills = excluded.skills, links = excluded.links, photo_url = excluded.photo_url, sort_order = excluded.sort_order, updated_at = CURRENT_TIMESTAMP
`)
const upsertTechSql = db.prepare(`
  INSERT INTO technologies (id, name, category, icon, sort_order, updated_at)
  VALUES (@id, @name, @category, @icon, @sort_order, CURRENT_TIMESTAMP)
  ON CONFLICT(id) DO UPDATE SET
    name = excluded.name, category = excluded.category, icon = excluded.icon, sort_order = excluded.sort_order, updated_at = CURRENT_TIMESTAMP
`)
const updateContactSql = db.prepare(`
  UPDATE contact_info
  SET whatsapp_number = @whatsapp_number, email = @email, phone = @phone, address = @address, socials = @socials
  WHERE id = 1
`)

const deleteServiceSql = db.prepare('DELETE FROM services WHERE id = ?')
const deleteProductSql = db.prepare('DELETE FROM products WHERE id = ?')
const deleteTeamSql = db.prepare('DELETE FROM team_members WHERE id = ?')
const deleteTechSql = db.prepare('DELETE FROM technologies WHERE id = ?')

export function listSite() {
  return {
    services: listServices(), products: listProducts(), team: listTeam(), technologies: listTechnologies(), contact: getContact(), footer: getFooter(), why_us: getWhyUs(), process: getProcess(), }
}

export function listServices(): ServiceRow[] {
  return (selectServices.all() as ServiceRecord[]).map(mapService)
}
export function listProducts(): ProductRow[] {
  return (selectProducts.all() as ProductRecord[]).map(mapProduct)
}
export function listTeam(): TeamRow[] {
  return (selectTeam.all() as TeamRecord[]).map(mapTeam)
}
export function listTechnologies(): TechnologyRow[] {
  return selectTech.all() as TechnologyRow[]
}
export function getContact(): ContactRow {
  const row = selectContact.get() as ContactRecord | undefined
  return row
    ? mapContact(row)
    : {
        whatsapp_number: '', email: '', phone: '', address: '', socials: { linkedin: '', facebook: '', instagram: '' }, }
}

export function serviceExists(id: string) {
  return Boolean(getService.get(id))
}
export function productExists(id: string) {
  return Boolean(getProduct.get(id))
}
export function teamExists(id: string) {
  return Boolean(getTeam.get(id))
}
export function technologyExists(id: string) {
  return Boolean(getTech.get(id))
}

export function upsertService(item: ServiceRow & { sort_order?: number }) {
  upsertServiceSql.run({
    ...item, features: JSON.stringify(item.features), sort_order: item.sort_order ?? 0, })
}
export function upsertProduct(item: ProductRow & { sort_order?: number }) {
  upsertProductSql.run({
    ...item, tech: JSON.stringify(item.tech), live_url: item.live_url ?? '', case_study: JSON.stringify(item.case_study ?? {}), sort_order: item.sort_order ?? 0, })
}
export function upsertTeam(item: TeamRow & { sort_order?: number }) {
  upsertTeamSql.run({
    ...item, skills: JSON.stringify(item.skills), links: JSON.stringify(item.links), photo_url: item.photo_url ?? '', sort_order: item.sort_order ?? 0, })
}
export function upsertTechnology(item: TechnologyRow & { sort_order?: number }) {
  upsertTechSql.run({
    ...item, sort_order: item.sort_order ?? 0, })
}
export function upsertContact(item: ContactRow) {
  updateContactSql.run({
    ...item, socials: JSON.stringify(item.socials), })
}

export function deleteService(id: string) {
  return deleteServiceSql.run(id).changes > 0
}
export function deleteProduct(id: string) {
  return deleteProductSql.run(id).changes > 0
}
export function deleteTeam(id: string) {
  return deleteTeamSql.run(id).changes > 0
}
export function deleteTechnology(id: string) {
  return deleteTechSql.run(id).changes > 0
}

const selectSetting = db.prepare('SELECT value FROM settings WHERE key = ?')
const upsertSetting = db.prepare(`
  INSERT INTO settings (key, value) VALUES (@key, @value)
  ON CONFLICT(key) DO UPDATE SET value = excluded.value
`)

export function getSetting(key: string, fallback = '') {
  const row = selectSetting.get(key) as { value: string } | undefined
  return row?.value ?? fallback
}

export function setSetting(key: string, value: string) {
  upsertSetting.run({ key, value })
}

export interface AdminUser {
  id: number
  username: string
  password_hash: string
}

const selectAdminByUsername = db.prepare(
  `SELECT id, username, password_hash FROM admin_users WHERE username = ? COLLATE NOCASE`,
)
const selectAdminCount = db.prepare(`SELECT COUNT(*) AS c FROM admin_users`)
const insertAdmin = db.prepare(
  `INSERT INTO admin_users (username, password_hash) VALUES (@username, @password_hash)`,
)
const updateAdminPassword = db.prepare(
  `UPDATE admin_users SET password_hash = @password_hash WHERE id = @id`,
)

export function findAdminByUsername(username: string): AdminUser | null {
  const row = selectAdminByUsername.get(username.trim()) as AdminUser | undefined
  return row ?? null
}

export function updateAdminPasswordHash(id: number, password_hash: string) {
  updateAdminPassword.run({ id, password_hash })
}

function seedAdminUser() {
  const count = (selectAdminCount.get() as { c: number }).c
  if (count > 0) return
  const legacy = getSetting('passphrase', 'CUIVHR') || 'CUIVHR'
  insertAdmin.run({
    username: 'admin', password_hash: bcrypt.hashSync(legacy, 12), })
}

seedAdminUser()

export interface FooterPayload {
  blurb: string
  copyright: string
  privacy_label: string
  terms_label: string
  columns: { id: string; title: string; links: { id: string; label: string; href: string }[] }[]
}

const defaultFooter: FooterPayload = {
  blurb: 'Practical digital projects and business software built around real workflows.',
  copyright: 'All rights reserved.',
  privacy_label: 'Privacy Policy',
  terms_label: 'Terms',
  columns: [
    {
      id: 'services', title: 'Services', links: [
        { id: 'web', label: 'Web Development', href: '#services' }, { id: 'business', label: 'Business Software', href: '#business-software' }, { id: 'ai', label: 'AI & ML Solutions', href: '#services' }, { id: 'consultancy', label: 'Consultancy', href: '#contact' }, ], }, {
      id: 'projects', title: 'Projects', links: [
        { id: 'portfolio', label: 'Portfolio', href: '#projects' }, { id: 'case-study', label: 'Case Study', href: '/case-study/crown-ev-center' }, ], }, {
      id: 'company', title: 'Company', links: [
        { id: 'why-us', label: 'Why Us', href: '#why-us' }, { id: 'process', label: 'Process', href: '#process' }, { id: 'team', label: 'Team', href: '#team' }, ], }, {
      id: 'contact', title: 'Contact', links: [
        { id: 'faq', label: 'FAQ', href: '#faq' }, { id: 'form', label: 'Contact Form', href: '#contact' }, ], }, ],
}

db.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES ('footer', ?)`).run(JSON.stringify(defaultFooter))

{
  const OLD_BLURB =
    'AS Digital Solutions builds practical digital projects, business software, and long-term solutions designed around real workflows.'
  try {
    const current = JSON.parse(getSetting('footer', JSON.stringify(defaultFooter))) as FooterPayload
    if (current?.blurb === OLD_BLURB) {
      setSetting('footer', JSON.stringify({ ...current, blurb: defaultFooter.blurb }))
    }
  } catch {
    // keep existing footer if JSON is invalid
  }
}

export function getFooter(): FooterPayload {
  try {
    const value: unknown = JSON.parse(getSetting('footer', JSON.stringify(defaultFooter)))
    if (!value || typeof value !== 'object' || Array.isArray(value)) return defaultFooter
    const record = value as Record<string, unknown>
    const columns = Array.isArray(record.columns)
      ? record.columns
          .map((item) => {
            if (!item || typeof item !== 'object' || Array.isArray(item)) return null
            const column = item as Record<string, unknown>
            const links = Array.isArray(column.links)
              ? column.links
                  .map((link) => {
                    if (!link || typeof link !== 'object' || Array.isArray(link)) return null
                    const row = link as Record<string, unknown>
                    return {
                      id: typeof row.id === 'string' ? row.id : `${Date.now()}`, label: typeof row.label === 'string' ? row.label : '', href: typeof row.href === 'string' ? row.href : '', }
                  })
                  .filter((link): link is { id: string; label: string; href: string } => link !== null)
              : []
            return {
              id: typeof column.id === 'string' ? column.id : `${Date.now()}`, title: typeof column.title === 'string' ? column.title : 'Column', links, }
          })
          .filter((item): item is FooterPayload['columns'][number] => item !== null)
      : defaultFooter.columns
    return {
      blurb: typeof record.blurb === 'string' ? record.blurb : defaultFooter.blurb, copyright: typeof record.copyright === 'string' ? record.copyright : defaultFooter.copyright, privacy_label: typeof record.privacy_label === 'string' ? record.privacy_label : defaultFooter.privacy_label, terms_label: typeof record.terms_label === 'string' ? record.terms_label : defaultFooter.terms_label, columns, }
  } catch {
    return defaultFooter
  }
}

export function setFooter(value: FooterPayload) {
  setSetting('footer', JSON.stringify(value))
}

export interface WhyUsPayload {
  eyebrow: string
  title: string
  subtitle: string
  items: { id: string; title: string; description: string }[]
}

export interface ProcessPayload {
  eyebrow: string
  title: string
  subtitle: string
  steps: { id: string; number: string; title: string; description: string }[]
}

const defaultWhyUs: WhyUsPayload = {
  eyebrow: 'Why Us', title: 'Built for practical business value', subtitle:
    'The approach focuses on reliability, fit, and long-term usefulness instead of one-size-fits-all software.', items: [
    { id: 'business-focused', title: 'Business-Focused Development', description: 'Solutions are shaped around actual workflows, not generic templates.' }, { id: 'custom-solutions', title: 'Custom Solutions', description: 'Every build can be tailored to the way a business operates and grows.' }, { id: 'online-offline', title: 'Online & Offline Capability', description: 'Systems can be planned for connectivity gaps and real operating conditions.' }, { id: 'scalable', title: 'Scalable Architecture', description: 'Clean structure helps the project evolve without starting over later.' }, { id: 'modern-tech', title: 'Modern Technology', description: 'Current frameworks and tools support performance, maintainability, and speed.' }, { id: 'long-term-support', title: 'Long-Term Support', description: 'Ongoing fixes, improvements, and iteration can continue after launch.' }, { id: 'ai-ready', title: 'AI-Ready', description: 'Systems can be planned with room for useful automation and ML features.' }, ],
}

const defaultProcess: ProcessPayload = {
  eyebrow: 'Process', title: 'A clear path from idea to working solution', subtitle: 'Each step keeps the project aligned with business needs while making delivery easier to track.', steps: [
    { id: '01', number: '01', title: 'Discover', description: 'Understand goals, workflows, constraints, and business priorities.' }, { id: '02', number: '02', title: 'Plan', description: 'Define the right scope, architecture, and delivery direction.' }, { id: '03', number: '03', title: 'Design', description: 'Shape screens, flows, and user interactions around real use.' }, { id: '04', number: '04', title: 'Develop', description: 'Build the project using clean, maintainable implementation.' }, { id: '05', number: '05', title: 'Test', description: 'Check reliability, usability, and operational readiness before launch.' }, { id: '06', number: '06', title: 'Deploy', description: 'Prepare the environment and release the working solution.' }, { id: '07', number: '07', title: 'Support', description: 'Continue with updates, fixes, and improvement planning after delivery.' }, ],
}

db.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES ('why_us', ?)`).run(JSON.stringify(defaultWhyUs))
db.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES ('process', ?)`).run(JSON.stringify(defaultProcess))

function parseTextItems(raw: unknown, fallback: WhyUsPayload['items']) {
  if (!Array.isArray(raw)) return fallback
  const items = raw
    .map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) return null
      const row = item as Record<string, unknown>
      return {
        id: typeof row.id === 'string' ? row.id : `${Date.now()}`, title: typeof row.title === 'string' ? row.title : '', description: typeof row.description === 'string' ? row.description : '', }
    })
    .filter((item): item is WhyUsPayload['items'][number] => item !== null)
  return items.length > 0 ? items : fallback
}

export function getWhyUs(): WhyUsPayload {
  try {
    const value: unknown = JSON.parse(getSetting('why_us', JSON.stringify(defaultWhyUs)))
    if (!value || typeof value !== 'object' || Array.isArray(value)) return defaultWhyUs
    const record = value as Record<string, unknown>
    return {
      eyebrow: typeof record.eyebrow === 'string' ? record.eyebrow : defaultWhyUs.eyebrow, title: typeof record.title === 'string' ? record.title : defaultWhyUs.title, subtitle: typeof record.subtitle === 'string' ? record.subtitle : defaultWhyUs.subtitle, items: parseTextItems(record.items, defaultWhyUs.items), }
  } catch {
    return defaultWhyUs
  }
}

export function setWhyUs(value: WhyUsPayload) {
  setSetting('why_us', JSON.stringify(value))
}

export function getProcess(): ProcessPayload {
  try {
    const value: unknown = JSON.parse(getSetting('process', JSON.stringify(defaultProcess)))
    if (!value || typeof value !== 'object' || Array.isArray(value)) return defaultProcess
    const record = value as Record<string, unknown>
    const steps = Array.isArray(record.steps)
      ? record.steps
          .map((item, index) => {
            if (!item || typeof item !== 'object' || Array.isArray(item)) return null
            const row = item as Record<string, unknown>
            const number =
              typeof row.number === 'string' ? row.number : String(index + 1).padStart(2, '0')
            return {
              id: typeof row.id === 'string' ? row.id : number, number, title: typeof row.title === 'string' ? row.title : '', description: typeof row.description === 'string' ? row.description : '', }
          })
          .filter((item): item is ProcessPayload['steps'][number] => item !== null)
      : defaultProcess.steps
    return {
      eyebrow: typeof record.eyebrow === 'string' ? record.eyebrow : defaultProcess.eyebrow, title: typeof record.title === 'string' ? record.title : defaultProcess.title, subtitle: typeof record.subtitle === 'string' ? record.subtitle : defaultProcess.subtitle, steps: steps.length > 0 ? steps : defaultProcess.steps, }
  } catch {
    return defaultProcess
  }
}

export function setProcess(value: ProcessPayload) {
  setSetting('process', JSON.stringify(value))
}
