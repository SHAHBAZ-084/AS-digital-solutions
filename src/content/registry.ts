import { servicePages } from './pages/services'
import { locationPages } from './pages/locations'
import { industryPages } from './pages/industries'
import { blogPages } from './pages/blog'
import { portfolioPages } from './pages/portfolio'
import { standalonePages } from './pages/standalone'
import type { SeoContentPage } from './types'

export const allContentPages: SeoContentPage[] = [
  ...standalonePages,
  ...servicePages,
  ...locationPages,
  ...industryPages,
  ...blogPages,
  ...portfolioPages,
]

export function getPageByPath(path: string) {
  const normalized = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path
  return allContentPages.find((p) => p.path === normalized)
}

export function getPagesByType(pageType: SeoContentPage['pageType']) {
  return allContentPages.filter((p) => p.pageType === pageType)
}

export { servicePages, locationPages, industryPages, blogPages, portfolioPages, standalonePages }
