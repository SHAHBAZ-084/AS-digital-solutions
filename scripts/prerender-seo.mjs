/**
 * After Vite build: emit crawlable HTML for case-study routes.
 * nginx try_files $uri $uri/ /index.html will serve these before SPA fallback.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const distIndex = path.join(root, 'dist', 'index.html')

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
const h1Count = (homeHtml.match(/<h1[\s>]/gi) || []).length
if (h1Count < 1) {
  console.error('prerender-seo: homepage has no <h1> in dist/index.html')
  process.exit(1)
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

for (const study of caseStudies) {
  const url = `https://asdigitalsolution.online/case-study/${study.slug}`
  const title = `${study.name} Case Study | AS Digital`
  const pageH1 = `${study.name} — Case Study | AS Digital Solutions`
  let html = homeHtml
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(title)}</title>`)
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="description" content="${escapeHtml(study.description)}" />`,
  )
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${url}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:url" content="${url}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  )
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:description" content="${escapeHtml(study.description)}" />`,
  )
  html = html.replace(
    /<h1>[^<]*<\/h1>/i,
    `<h1>${escapeHtml(pageH1)}</h1>`,
  )

  const outDir = path.join(root, 'dist', 'case-study', study.slug)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8')
  console.log(`prerender-seo: wrote case-study/${study.slug}/index.html`)
}

console.log(`prerender-seo: homepage h1 count = ${h1Count}`)
console.log('prerender-seo: done')
