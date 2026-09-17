import type { SeoContentPage } from '../types'

export const portfolioPages: SeoContentPage[] = [
  {
    path: '/portfolio',
    pageType: 'portfolio',
    title: 'Portfolio & Case Studies | AS Digital',
    metaDescription:
      'AS Digital Solutions portfolio: Crown EV Center, CityNestServices, Serve & Lead Society, Sheraz Traders, Usman Mall, and Sufi & Co desktop systems.',
    h1: 'Selected projects and case studies',
    primaryKeyword: 'AS Digital Solutions portfolio',
    secondaryKeywords: ['case studies', 'software projects Pakistan'],
    intro:
      'These shipped projects show how we work across ecommerce, community sites, and offline desktop systems for Pakistani businesses.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'What to look for',
        paragraphs: [
          'Each case study page covers context and capabilities. Some older marketing blocks still use placeholders where clients have not approved public metrics—we never invent review counts or revenue figures.',
        ],
      },
    ],
    faqs: [],
    related: [
      { label: 'Services', href: '/services' },
      { label: 'About', href: '/about' },
      { label: 'Start a project', href: '/contact' },
    ],
    hubLinks: [
      { label: 'Crown EV Center', href: '/case-study/crown-ev-center' },
      { label: 'CityNestServices', href: '/case-study/citynest-services' },
      { label: 'Serve & Lead Society', href: '/case-study/serve-and-lead-society' },
      { label: 'Sheraz Traders (Desktop)', href: '/case-study/sheraz-traders-desktop' },
      { label: 'Usman Mall (Desktop)', href: '/case-study/usman-mall-desktop' },
      { label: 'Sufi & Co Grain Market (Desktop)', href: '/case-study/sufi-co-grain-market-desktop' },
    ],
  },
]
