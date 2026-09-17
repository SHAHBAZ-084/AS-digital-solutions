/**
 * Post-Vite: prerender crawlable HTML for all content + case-study routes,
 * and write sitemap.xml into dist/.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { allContentPages } from '../src/content/registry.ts'
import { SITE_URL } from '../src/config/seo.ts'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const distIndex = path.join(root, 'dist', 'index.html')
const SITE = SITE_URL.replace(/\/$/, '')

const caseStudies = [
  {
    slug: 'crown-ev-center',
    name: 'Crown EV Center',
    description:
      'Case study: e-commerce and dealership platform for Crown EV Center, built by AS Digital Solutions Chishtian.',
  },
  {
    slug: 'citynest-services',
    name: 'CityNestServices',
    description:
      'Case study: property rental and management platform for CityNestServices, by AS Digital Solutions.',
  },
  {
    slug: 'serve-and-lead-society',
    name: 'Serve & Lead Society',
    description:
      'Case study: community platform for Serve & Lead Society (SLS), built by AS Digital Solutions.',
  },
  {
    slug: 'sheraz-traders-desktop',
    name: 'Sheraz Traders',
    description:
      'Case study: offline desktop accounting and inventory system for Sheraz Traders grain market.',
  },
  {
    slug: 'usman-mall-desktop',
    name: 'Usman Mall',
    description:
      'Case study: offline POS and accounting desktop app for Usman Mall garments retail.',
  },
  {
    slug: 'sufi-co-grain-market-desktop',
    name: 'Sufi & Co Grain Market',
    description:
      'Case study: offline POS and accounting system for Sufi & Co grain commission trading.',
  },
]

if (!fs.existsSync(distIndex)) {
  console.error('prerender-seo: dist/index.html missing — run vite build first')
  process.exit(1)
}

const homeHtml = fs.readFileSync(distIndex, 'utf8')
const homeH1 = (homeHtml.match(/<h1[\s>]/gi) || []).length
if (homeH1 < 1) {
  console.error('prerender-seo: homepage has no <h1> in dist/index.html')
  process.exit(1)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function writePageHtml(opts: {
  outPath: string
  title: string
  description: string
  canonical: string
  h1: string
  bodyHtml: string
}) {
  let html = homeHtml
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(opts.title)}</title>`)
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="description" content="${escapeHtml(opts.description)}" />`,
  )
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${opts.canonical}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:url" content="${opts.canonical}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:title" content="${escapeHtml(opts.title)}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:description" content="${escapeHtml(opts.description)}" />`,
  )

  const snapshot = `<div id="root">
      <header><p>AS Digital Solutions — Chishtian, Punjab, Pakistan</p>
        <nav>
          <a href="/services">Services</a>
          <a href="/locations">Locations</a>
          <a href="/blog">Blog</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
      <main>
        <h1>${escapeHtml(opts.h1)}</h1>
        ${opts.bodyHtml}
      </main>
    </div>`

  const start = html.indexOf('<div id="root">')
  if (start === -1) {
    throw new Error(`prerender-seo: cannot locate #root for ${opts.canonical}`)
  }
  let depth = 0
  let i = start
  let end = -1
  while (i < html.length) {
    const nextOpen = html.indexOf('<div', i)
    const nextClose = html.indexOf('</div>', i)
    if (nextClose === -1) break
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1
      i = nextOpen + 4
      continue
    }
    depth -= 1
    i = nextClose + 6
    if (depth === 0) {
      end = i
      break
    }
  }
  if (end === -1) {
    throw new Error(`prerender-seo: cannot close #root for ${opts.canonical}`)
  }
  html = `${html.slice(0, start)}${snapshot}${html.slice(end)}`

  fs.mkdirSync(path.dirname(opts.outPath), { recursive: true })
  fs.writeFileSync(opts.outPath, html, 'utf8')
}

function sectionToHtml(page: (typeof allContentPages)[number]) {
  const parts: string[] = [`<p>${escapeHtml(page.intro)}</p>`]
  for (const section of page.sections) {
    parts.push(`<h2>${escapeHtml(section.heading)}</h2>`)
    if (section.type === 'paragraphs') {
      for (const p of section.paragraphs) parts.push(`<p>${escapeHtml(p)}</p>`)
    } else if (section.type === 'list') {
      if (section.intro) parts.push(`<p>${escapeHtml(section.intro)}</p>`)
      parts.push('<ul>')
      for (const item of section.items) parts.push(`<li>${escapeHtml(item)}</li>`)
      parts.push('</ul>')
    } else if (section.type === 'steps') {
      parts.push('<ol>')
      for (const step of section.steps) {
        parts.push(`<li><strong>${escapeHtml(step.title)}</strong> — ${escapeHtml(step.body)}</li>`)
      }
      parts.push('</ol>')
    } else if (section.type === 'pricing') {
      for (const p of section.paragraphs) parts.push(`<p>${escapeHtml(p)}</p>`)
      parts.push('<ul>')
      for (const range of section.ranges) {
        parts.push(
          `<li><strong>${escapeHtml(range.label)}</strong>: ${escapeHtml(range.range)}${range.note ? ` — ${escapeHtml(range.note)}` : ''}</li>`,
        )
      }
      parts.push('</ul>')
    } else {
      parts.push(`<p>${escapeHtml(section.body)}</p>`)
    }
  }
  if (page.faqs.length) {
    parts.push('<h2>FAQs</h2>')
    for (const faq of page.faqs) {
      parts.push(`<h3>${escapeHtml(faq.question)}</h3>`)
      parts.push(`<p>${escapeHtml(faq.answer)}</p>`)
    }
  }
  if (page.hubLinks?.length) {
    parts.push('<h2>Pages</h2><ul>')
    for (const link of page.hubLinks) {
      parts.push(`<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`)
    }
    parts.push('</ul>')
  }
  if (page.related.length) {
    parts.push('<h2>Related</h2><ul>')
    for (const link of page.related) {
      parts.push(`<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`)
    }
    parts.push('</ul>')
  }
  return parts.join('\n')
}

for (const page of allContentPages) {
  const rel = page.path === '/' ? 'index.html' : path.join(...page.path.split('/').filter(Boolean), 'index.html')
  const outPath = path.join(root, 'dist', rel)
  writePageHtml({
    outPath,
    title: page.title,
    description: page.metaDescription,
    canonical: `${SITE}${page.path}`,
    h1: page.h1,
    bodyHtml: sectionToHtml(page),
  })
  console.log(`prerender-seo: wrote ${page.path}`)
}

for (const study of caseStudies) {
  const url = `${SITE}/case-study/${study.slug}`
  const title = `${study.name} Case Study | AS Digital`
  const pageH1 = `${study.name} — Case Study | AS Digital Solutions`
  writePageHtml({
    outPath: path.join(root, 'dist', 'case-study', study.slug, 'index.html'),
    title,
    description: study.description,
    canonical: url,
    h1: pageH1,
    bodyHtml: `<p>${escapeHtml(study.description)}</p><p><a href="/portfolio">Back to portfolio</a></p>`,
  })
  console.log(`prerender-seo: wrote /case-study/${study.slug}`)
}

const today = new Date().toISOString().slice(0, 10)
const urls = [
  { loc: `${SITE}/`, priority: '1.0', changefreq: 'weekly' },
  ...allContentPages.map((p) => ({
    loc: `${SITE}${p.path}`,
    priority: p.pageType === 'hub' ? '0.9' : p.pageType === 'blog' ? '0.7' : '0.8',
    changefreq: p.pageType === 'blog' ? 'monthly' : 'weekly',
  })),
  ...caseStudies.map((s) => ({
    loc: `${SITE}/case-study/${s.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
]

const unique = new Map(urls.map((u) => [u.loc, u]))
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...unique.values()]
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

fs.writeFileSync(path.join(root, 'dist', 'sitemap.xml'), sitemap, 'utf8')
fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap, 'utf8')

const robots = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${SITE}/sitemap.xml
`
fs.writeFileSync(path.join(root, 'dist', 'robots.txt'), robots, 'utf8')

console.log(`prerender-seo: homepage h1 count = ${homeH1}`)
console.log(`prerender-seo: sitemap urls = ${unique.size}`)
console.log('prerender-seo: done')
