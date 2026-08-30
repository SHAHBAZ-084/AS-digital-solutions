import type { CaseStudyBlockId, CaseStudySection, ProductCaseStudy, ProductItem } from '../types/siteContent'

export const DEFAULT_BLOCKS: CaseStudyBlockId[] = [
  'overview', 'client', 'challenge', 'solution', 'key_features', 'results', 'screenshots',
]

export const BLOCK_LABELS: Record<CaseStudyBlockId, string> = {
  overview: 'Overview', client: 'Client', challenge: 'Challenge', solution: 'Solution', key_features: 'Key features', results: 'Results', screenshots: 'Project images', technology: 'Tools used',
}

export function emptyCaseStudy(): ProductCaseStudy {
  return {
    overview: '', client: '', challenge: '', solution: '', key_features: [], results: [], screenshot_urls: [], sections: [], enabled_blocks: [...DEFAULT_BLOCKS], }
}

export function emptyProduct(): ProductItem {
  return {
    id: '', slug: '', name: '', industry: '', type: 'Web', description: '', tech: [], screenshot_url: '', live_url: '', sort_order: 0, case_study: emptyCaseStudy(), }
}

export function newSection(title = 'New section'): CaseStudySection {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, title, body: '', bullets: [], }
}

const BLOCK_IDS: CaseStudyBlockId[] = [
  'overview', 'client', 'challenge', 'solution', 'key_features', 'results', 'screenshots', 'technology',
]

export function normalizeCaseStudy(raw: unknown): ProductCaseStudy {
  const base = emptyCaseStudy()
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return base
  const record = raw as Record<string, unknown>

  const sections = Array.isArray(record.sections)
    ? record.sections
        .map((item) => {
          if (!item || typeof item !== 'object' || Array.isArray(item)) return null
          const section = item as Record<string, unknown>
          const id = typeof section.id === 'string' ? section.id : newSection().id
          const title = typeof section.title === 'string' ? section.title : 'Section'
          const body = typeof section.body === 'string' ? section.body : ''
          const bullets = Array.isArray(section.bullets)
            ? section.bullets.filter((b): b is string => typeof b === 'string')
            : []
          return { id, title, body, bullets }
        })
        .filter((item): item is CaseStudySection => item !== null)
    : []

  const enabled_blocks = Array.isArray(record.enabled_blocks)
    ? record.enabled_blocks.filter((item): item is CaseStudyBlockId =>
        typeof item === 'string' && BLOCK_IDS.includes(item as CaseStudyBlockId), )
    : [...DEFAULT_BLOCKS]

  return {
    overview: typeof record.overview === 'string' ? record.overview : base.overview, client: typeof record.client === 'string' ? record.client : base.client, challenge: typeof record.challenge === 'string' ? record.challenge : base.challenge, solution: typeof record.solution === 'string' ? record.solution : base.solution, key_features: Array.isArray(record.key_features)
      ? record.key_features.filter((item): item is string => typeof item === 'string')
      : base.key_features, results: Array.isArray(record.results)
      ? record.results.filter((item): item is string => typeof item === 'string')
      : base.results, screenshot_urls: Array.isArray(record.screenshot_urls)
      ? record.screenshot_urls.filter((item): item is string => typeof item === 'string')
      : base.screenshot_urls, sections, enabled_blocks, }
}

export function syncProductImages(product: ProductItem): ProductItem {
  const urls =
    product.case_study.screenshot_urls.length > 0
      ? product.case_study.screenshot_urls
      : product.screenshot_url
        ? [product.screenshot_url]
        : []
  const screenshot_url = urls[0] ?? ''
  return {
    ...product, screenshot_url, case_study: { ...product.case_study, screenshot_urls: urls }, }
}
