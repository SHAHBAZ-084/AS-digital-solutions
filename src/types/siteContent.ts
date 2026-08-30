import type { Service } from '../data/services'
import type { TeamMember } from '../data/team'
import type { Technology } from '../data/technologies'

export type { Service, TeamMember, Technology }

export interface CaseStudySection {
  id: string
  title: string
  body: string
  bullets: string[]
}

export type CaseStudyBlockId =
  | 'overview'
  | 'client'
  | 'challenge'
  | 'solution'
  | 'key_features'
  | 'results'
  | 'screenshots'
  | 'technology'

export interface ProductCaseStudy {
  overview: string
  client: string
  challenge: string
  solution: string
  key_features: string[]
  results: string[]
  screenshot_urls: string[]
  sections: CaseStudySection[]
  enabled_blocks: CaseStudyBlockId[]
}

export interface ProductItem {
  id: string
  slug: string
  name: string
  industry: string
  type: string
  description: string
  tech: string[]
  screenshot_url: string
  live_url: string
  sort_order: number
  case_study: ProductCaseStudy
}

export interface FooterLink {
  id: string
  label: string
  href: string
}

export interface FooterColumn {
  id: string
  title: string
  links: FooterLink[]
}

export interface FooterContent {
  blurb: string
  copyright: string
  privacy_label: string
  terms_label: string
  columns: FooterColumn[]
}

export interface ContactInfo {
  whatsapp_number: string
  email: string
  phone: string
  address: string
  socials: {
    linkedin: string
    facebook: string
    instagram: string
  }
}

export interface WhyUsItem {
  id: string
  title: string
  description: string
}

export interface WhyUsContent {
  eyebrow: string
  title: string
  subtitle: string
  items: WhyUsItem[]
}

export interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
}

export interface ProcessContent {
  eyebrow: string
  title: string
  subtitle: string
  steps: ProcessStep[]
}

export interface SiteContent {
  services: Service[]
  products: ProductItem[]
  team: TeamMember[]
  technologies: Technology[]
  contact: ContactInfo
  footer: FooterContent
  why_us: WhyUsContent
  process: ProcessContent
}
