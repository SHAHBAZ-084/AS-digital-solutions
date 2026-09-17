/**
 * Build-time SEO guard: titles, descriptions, H1 rules, internal links, basic JSON-LD.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { allContentPages } from '../src/content/registry.ts'
import { buildPageJsonLd } from '../src/content/schema.ts'
import { breadcrumbsForPage } from '../src/lib/contentBreadcrumbs.ts'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = path.join(root, 'dist')
const errors: string[] = []
const warnings: string[] = []

function fail(msg: string) {
  errors.push(msg)
}

function warn(msg: string) {
  warnings.push(msg)
}

const titles = new Map<string, string>()
const descriptions = new Map<string, string>()
const knownPaths = new Set([
  '/',
  ...allContentPages.map((p) => p.path),
  ...[
    'crown-ev-center',
    'citynest-services',
    'serve-and-lead-society',
    'sheraz-traders-desktop',
    'usman-mall-desktop',
    'sufi-co-grain-market-desktop',
  ].map((s) => `/case-study/${s}`),
])

for (const page of allContentPages) {
  if (!page.title?.trim()) fail(`${page.path}: missing title`)
  if (page.title.length > 60) fail(`${page.path}: title ${page.title.length} > 60 chars`)
  if (!page.metaDescription?.trim()) fail(`${page.path}: missing meta description`)
  if (page.metaDescription.length > 155) {
    fail(`${page.path}: meta description ${page.metaDescription.length} > 155`)
  }
  if (page.metaDescription.length < 110) {
    warn(`${page.path}: meta description short (${page.metaDescription.length})`)
  }
  if (!page.h1?.trim()) fail(`${page.path}: missing h1`)
  if (page.h1 === page.title) fail(`${page.path}: h1 identical to title`)

  const prevTitle = titles.get(page.title)
  if (prevTitle) fail(`duplicate title "${page.title}" on ${prevTitle} and ${page.path}`)
  titles.set(page.title, page.path)

  const prevDesc = descriptions.get(page.metaDescription)
  if (prevDesc) fail(`duplicate description on ${prevDesc} and ${page.path}`)
  descriptions.set(page.metaDescription, page.path)

  for (const link of [...page.related, ...(page.hubLinks ?? [])]) {
    if (link.href.startsWith('http') || link.href.includes('#')) continue
    if (!knownPaths.has(link.href)) fail(`${page.path}: broken internal link ${link.href}`)
  }

  try {
    const jsonLd = buildPageJsonLd(page, breadcrumbsForPage(page))
    JSON.stringify(jsonLd)
    if (!jsonLd['@graph']) fail(`${page.path}: JSON-LD missing @graph`)
  } catch (err) {
    fail(`${page.path}: invalid JSON-LD (${err instanceof Error ? err.message : err})`)
  }

  if (page.faqs.length) {
    for (const faq of page.faqs) {
      if (!faq.question || !faq.answer) fail(`${page.path}: empty FAQ`)
      if (faq.answer.split(/\s+/).length < 20) {
        warn(`${page.path}: short FAQ answer for "${faq.question.slice(0, 40)}"`)
      }
    }
  }
}

if (fs.existsSync(distRoot)) {
  for (const page of allContentPages) {
    const file =
      page.path === '/'
        ? path.join(distRoot, 'index.html')
        : path.join(distRoot, ...page.path.split('/').filter(Boolean), 'index.html')
    if (!fs.existsSync(file)) {
      fail(`missing prerender file for ${page.path} → ${file}`)
      continue
    }
    const html = fs.readFileSync(file, 'utf8')
    const h1s = html.match(/<h1[\s>]/gi) || []
    if (h1s.length !== 1) fail(`${page.path}: expected 1 h1 in prerender, found ${h1s.length}`)
    if (!html.includes(page.h1)) fail(`${page.path}: prerender HTML missing h1 text`)
    if (/name=["']keywords["']/i.test(html)) fail(`${page.path}: keywords meta still present`)
    if (!html.includes(`rel="canonical"`)) fail(`${page.path}: missing canonical`)
  }

  const sitemap = path.join(distRoot, 'sitemap.xml')
  if (!fs.existsSync(sitemap)) fail('dist/sitemap.xml missing')
  else {
    const xml = fs.readFileSync(sitemap, 'utf8')
    for (const page of allContentPages) {
      if (!xml.includes(`https://asdigitalsolution.online${page.path}`)) {
        fail(`sitemap missing ${page.path}`)
      }
    }
  }
} else {
  warn('dist/ missing — skipped prerender file checks (run after build)')
}

for (const w of warnings) console.warn(`seo-check warn: ${w}`)
if (errors.length) {
  for (const e of errors) console.error(`seo-check error: ${e}`)
  console.error(`seo-check: ${errors.length} error(s)`)
  process.exit(1)
}

console.log(`seo-check: ok (${allContentPages.length} content pages)`)
