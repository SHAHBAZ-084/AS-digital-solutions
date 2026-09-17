export type ContentLink = { label: string; href: string }

export type ContentSection =
  | { type: 'paragraphs'; heading: string; paragraphs: string[] }
  | { type: 'list'; heading: string; intro?: string; items: string[] }
  | { type: 'steps'; heading: string; steps: { title: string; body: string }[] }
  | { type: 'pricing'; heading: string; paragraphs: string[]; ranges: { label: string; range: string; note?: string }[] }
  | { type: 'cta'; heading: string; body: string }

export type FaqItem = { question: string; answer: string }

export type SeoContentPage = {
  path: string // e.g. /services/web-development
  pageType: 'about' | 'contact' | 'pricing' | 'tool' | 'hub' | 'service' | 'location' | 'industry' | 'blog' | 'portfolio'
  title: string // <=60 chars
  metaDescription: string // <=155 chars
  h1: string // NOT identical to title
  primaryKeyword: string
  secondaryKeywords: string[]
  intro: string
  sections: ContentSection[]
  faqs: FaqItem[] // 3-5 for service/location/blog; can be empty for hubs
  related: ContentLink[] // 3+ descriptive anchors
  hubLinks?: ContentLink[] // for hub pages
  publishedAt?: string // ISO for blogs
  updatedAt?: string
  authorName?: string // use "AS Digital Solutions" not invented person unless REPLACE_
  serviceName?: string // for Service schema
  priceMin?: string // use "REPLACE_40000" style placeholders for schema only
  priceMax?: string
  cityName?: string // for location pages
}
