import type { FooterContent } from '../types/siteContent'

export const defaultFooter: FooterContent = {
  blurb:
    'AS Digital Solutions in Chishtian builds practical websites and business software around real workflows for clients across Punjab and Pakistan.',
  copyright: 'All rights reserved.',
  privacy_label: 'Privacy Policy',
  terms_label: 'Terms',
  columns: [
    {
      id: 'services',
      title: 'Services',
      links: [
        { id: 'web', label: 'Web Development', href: '/services/web-development' },
        { id: 'pos', label: 'POS Software Development', href: '/services/pos-software' },
        { id: 'custom', label: 'Custom Business Software', href: '/services/custom-software' },
        { id: 'desktop', label: 'Desktop Apps', href: '/services/desktop-apps' },
        { id: 'all', label: 'All Services', href: '/services' },
      ],
    },
    {
      id: 'locations',
      title: 'Locations',
      links: [
        { id: 'chi', label: 'Web Development Chishtian', href: '/locations/chishtian' },
        { id: 'bwn', label: 'Software Company Bahawalnagar', href: '/locations/bahawalnagar' },
        { id: 'bwp', label: 'Web Development Bahawalpur', href: '/locations/bahawalpur' },
        { id: 'mux', label: 'Web Development Multan', href: '/locations/multan' },
        { id: 'all-loc', label: 'All Locations', href: '/locations' },
      ],
    },
    {
      id: 'company',
      title: 'Company',
      links: [
        { id: 'about', label: 'About', href: '/about' },
        { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
        { id: 'blog', label: 'Blog', href: '/blog' },
        { id: 'pricing', label: 'Pricing', href: '/pricing' },
        { id: 'case', label: 'Crown EV Case Study', href: '/case-study/crown-ev-center' },
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      links: [
        { id: 'contact-page', label: 'Contact Page', href: '/contact' },
        { id: 'form', label: 'Project Brief Form', href: '/#contact' },
        { id: 'calc', label: 'Website Cost Calculator', href: '/tools/website-cost-calculator' },
        { id: 'faq', label: 'Homepage FAQ', href: '/#faq' },
      ],
    },
  ],
}
