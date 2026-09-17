import type { SeoContentPage } from '../content/types'
import type { Crumb } from './breadcrumbs'

const HUB_LABELS: Record<string, string> = {
  services: 'Services',
  locations: 'Locations',
  industries: 'Industries',
  blog: 'Blog',
  portfolio: 'Portfolio',
  tools: 'Tools',
}

export function breadcrumbsForPage(page: SeoContentPage): Crumb[] {
  const crumbs: Crumb[] = [{ name: 'Home', path: '/' }]
  const parts = page.path.split('/').filter(Boolean)

  if (parts.length === 0) return crumbs

  if (parts.length === 1) {
    crumbs.push({ name: page.h1 })
    return crumbs
  }

  const hub = parts[0]
  const hubLabel = HUB_LABELS[hub] ?? hub
  crumbs.push({ name: hubLabel, path: `/${hub}` })

  if (parts.length >= 2) {
    crumbs.push({ name: page.h1 })
  }

  return crumbs
}
