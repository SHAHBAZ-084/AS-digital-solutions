import { useEffect } from 'react'
import {
  DEFAULT_DESC,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  SITE_URL,
  localSeo,
} from '../../config/seo'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

function setJsonLd(id: string, data: Record<string, unknown> | null) {
  const existing = document.getElementById(id)
  if (!data) {
    existing?.remove()
    return
  }
  let script = existing as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

export interface SeoProps {
  title?: string
  description?: string
  path?: string
  noindex?: boolean
  image?: string
  keywords?: string
  jsonLd?: Record<string, unknown> | null
}

/** Updates document head for SPA routes (title, robots, canonical, OG, JSON-LD). */
export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  path = '/',
  noindex = false,
  image = `${SITE_URL}/og-image.png`,
  keywords = DEFAULT_KEYWORDS,
  jsonLd = null,
}: SeoProps) {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const canonical = path.startsWith('http')
      ? path
      : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'keywords', keywords)
    setMeta('name', 'geo.region', 'PK-PB')
    setMeta('name', 'geo.placename', localSeo.city)
    setMeta('name', 'geo.position', `${localSeo.geo.latitude};${localSeo.geo.longitude}`)
    setMeta('name', 'ICBM', `${localSeo.geo.latitude}, ${localSeo.geo.longitude}`)
    setMeta(
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1',
    )
    setCanonical(canonical)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:locale', 'en_PK')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)
    setJsonLd('seo-jsonld-page', jsonLdKey ? (JSON.parse(jsonLdKey) as Record<string, unknown>) : null)
  }, [title, description, path, noindex, image, keywords, jsonLdKey])

  return null
}

export { SITE_URL as SITE, DEFAULT_TITLE, DEFAULT_DESC }
