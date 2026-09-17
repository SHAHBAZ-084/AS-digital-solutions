import { SITE_URL } from '../config/seo'
import type { Crumb } from '../lib/breadcrumbs'
import { crumbsToSchema } from '../lib/breadcrumbs'
import type { FaqItem, SeoContentPage } from './types'

const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const LOCAL_ID = `${SITE_URL}/#localbusiness`

const KNOWN = {
  email: 'contactasdigitalsolutions@gmail.com',
  telephone: '+923220726006',
  sameAs: [
    'https://www.facebook.com/share/1QcWxrrhpV/',
    'https://www.instagram.com/digital_solutions_pk',
    'https://www.linkedin.com/in/muhammad-shahbaz-171563400',
  ],
} as const


export function orgAndWebsiteGraph() {
  return [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': ORG_ID,
      name: 'AS Digital Solutions',
      alternateName: 'AS Digital Solutions Chishtian',
      url: `${SITE_URL}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon-192x192.png`,
        width: 192,
        height: 192,
      },
      image: `${SITE_URL}/og-image.png`,
      description:
        'AS Digital Solutions in Chishtian, Punjab builds modern websites, custom business software, desktop apps, and AI tools for clients across Pakistan.',
      email: KNOWN.email,
      telephone: KNOWN.telephone,
      foundingDate: 'REPLACE_YYYY',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'REPLACE_Street, Area',
        addressLocality: 'Chishtian',
        addressRegion: 'Punjab',
        postalCode: '62350',
        addressCountry: 'PK',
      },
      sameAs: [...KNOWN.sameAs],
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: 'AS Digital Solutions',
      inLanguage: 'en-PK',
      publisher: { '@id': ORG_ID },
    },
  ]
}

export function localBusinessNode(pageUrl = `${SITE_URL}/`) {
  return {
    '@type': 'ProfessionalService',
    '@id': LOCAL_ID,
    name: 'AS Digital Solutions',
    image: `${SITE_URL}/og-image.png`,
    url: pageUrl,
    telephone: '+923220726006',
    priceRange: 'PKR REPLACE_25000 - PKR REPLACE_500000',
    currenciesAccepted: 'PKR',
    paymentAccepted: 'Cash, Bank Transfer, JazzCash, Easypaisa',
    parentOrganization: { '@id': ORG_ID },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'REPLACE_Street, Area',
      addressLocality: 'Chishtian',
      addressRegion: 'Punjab',
      postalCode: '62350',
      addressCountry: 'PK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 29.8009,
      longitude: 72.8577,
    },
    hasMap: 'REPLACE_https://maps.google.com/?cid=YOUR_GBP_CID',
    areaServed: [
      { '@type': 'City', name: 'Chishtian' },
      { '@type': 'City', name: 'Bahawalnagar' },
      { '@type': 'City', name: 'Bahawalpur' },
      { '@type': 'City', name: 'Hasilpur' },
      { '@type': 'City', name: 'Haroonabad' },
      { '@type': 'City', name: 'Multan' },
      { '@type': 'Country', name: 'Pakistan' },
    ],
  }
}

export function faqJsonLd(faqs: FaqItem[]) {
  if (!faqs.length) return null
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function serviceJsonLd(page: SeoContentPage) {
  const absolute = `${SITE_URL}${page.path}`
  return {
    '@type': 'Service',
    '@id': `${absolute}#service`,
    name: page.serviceName ?? page.h1,
    serviceType: page.serviceName ?? page.primaryKeyword,
    description: page.metaDescription,
    url: absolute,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Pakistan' },
    audience: {
      '@type': 'BusinessAudience',
      name: 'Small and medium businesses in Pakistan',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PKR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: page.priceMin ?? 'REPLACE_40000',
        maxPrice: page.priceMax ?? 'REPLACE_250000',
        priceCurrency: 'PKR',
      },
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/contact`,
    },
  }
}

export function blogJsonLd(page: SeoContentPage) {
  const absolute = `${SITE_URL}${page.path}`
  return {
    '@type': 'BlogPosting',
    '@id': `${absolute}#post`,
    headline: page.title,
    description: page.metaDescription,
    image: `${SITE_URL}/og-image.png`,
    datePublished: page.publishedAt ?? '2026-09-17T09:00:00+05:00',
    dateModified: page.updatedAt ?? page.publishedAt ?? '2026-09-17T09:00:00+05:00',
    inLanguage: 'en-PK',
    author: {
      '@type': 'Organization',
      name: page.authorName ?? 'AS Digital Solutions',
      url: `${SITE_URL}/about`,
    },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: absolute,
  }
}

export function buildPageJsonLd(page: SeoContentPage, crumbs: Crumb[]) {
  const graph: Record<string, unknown>[] = [...orgAndWebsiteGraph(), crumbsToSchema(crumbs)]

  if (page.pageType === 'contact' || page.pageType === 'location' || page.path === '/') {
    graph.push(localBusinessNode(`${SITE_URL}${page.path}`))
  }

  if (page.pageType === 'service' || page.pageType === 'industry') {
    graph.push(serviceJsonLd(page))
  }

  if (page.pageType === 'blog') {
    graph.push(blogJsonLd(page))
  }

  const faq = faqJsonLd(page.faqs)
  if (faq) graph.push(faq)

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
