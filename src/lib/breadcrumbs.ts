import { SITE_URL } from '../config/seo'

export type Crumb = { name: string; path?: string }

export function crumbsToSchema(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      ...(crumb.path
        ? { item: `${SITE_URL}${crumb.path.startsWith('/') ? crumb.path : `/${crumb.path}`}` }
        : {}),
    })),
  }
}
