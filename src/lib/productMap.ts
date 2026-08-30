import type { Project } from '../data/projects'
import { projects } from '../data/projects'
import { asProjectType, resolveProjectScreenshots } from './projectPlaceholders'
import { emptyCaseStudy, normalizeCaseStudy } from './productCaseStudy'
import type { ProductItem } from '../types/siteContent'

export function projectsToProductItems(source = projects): ProductItem[] {
  return source.map((project) => ({
    id: project.slug,
    slug: project.slug,
    name: project.name,
    industry: project.industry,
    type: project.type,
    description: project.description,
    tech: project.technology,
    screenshot_url: project.screenshots[0] ?? '',
    live_url: project.liveUrl ?? '',
    sort_order: 0,
    case_study: {
      overview: project.overview,
      client: project.client,
      challenge: project.challenge,
      solution: project.solution,
      key_features: project.keyFeatures,
      results: project.results,
      screenshot_urls: project.screenshots,
      sections: [],
      enabled_blocks: ['overview', 'client', 'challenge', 'solution', 'key_features', 'results', 'screenshots'],
    },
  }))
}

export function productToProject(product: ProductItem, fallback?: Project): Project {
  const cs = normalizeCaseStudy(product.case_study)
  const type = asProjectType(product.type)
  // Prefer bundled Vite assets from static project data when present (reliable logos),
  // then API/upload URLs.
  const screenshots = resolveProjectScreenshots(type, [
    ...(fallback?.screenshots ?? []),
    ...cs.screenshot_urls,
    product.screenshot_url,
  ])

  return {
    slug: product.slug,
    name: product.name,
    industry: product.industry,
    type,
    description: product.description,
    overview: cs.overview || fallback?.overview || product.description,
    client: cs.client || fallback?.client || 'Client / Organization',
    challenge: cs.challenge || fallback?.challenge || '',
    solution: cs.solution || fallback?.solution || '',
    keyFeatures:
      cs.key_features.length > 0 ? cs.key_features : (fallback?.keyFeatures ?? []),
    technology: product.tech.length > 0 ? product.tech : (fallback?.technology ?? []),
    screenshots,
    results: cs.results.length > 0 ? cs.results : (fallback?.results ?? []),
    liveUrl: product.live_url,
    sections: cs.sections,
    enabledBlocks: cs.enabled_blocks,
  }
}

export function findProjectFallback(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function productFromApi(raw: ProductItem): ProductItem {
  return {
    ...raw,
    live_url: raw.live_url ?? '',
    sort_order: raw.sort_order ?? 0,
    case_study: normalizeCaseStudy(raw.case_study ?? emptyCaseStudy()),
  }
}
