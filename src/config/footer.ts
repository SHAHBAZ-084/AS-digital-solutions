import type { FooterContent } from '../types/siteContent'

export const defaultFooter: FooterContent = {
  blurb:
    'AS Digital Solutions builds practical digital projects, business software, and long-term solutions designed around real workflows.', copyright: 'All rights reserved.', privacy_label: 'Privacy Policy', terms_label: 'Terms', columns: [
    {
      id: 'services', title: 'Services', links: [
        { id: 'web', label: 'Web Development', href: '#services' }, { id: 'business', label: 'Business Software', href: '#business-software' }, { id: 'ai', label: 'AI & ML Solutions', href: '#services' }, { id: 'consultancy', label: 'Consultancy', href: '#contact' }, ], }, {
      id: 'projects', title: 'Projects', links: [
        { id: 'portfolio', label: 'Portfolio', href: '#projects' }, { id: 'case-study', label: 'Case Study', href: '/case-study/crown-ev-center' }, ], }, {
      id: 'company', title: 'Company', links: [
        { id: 'why-us', label: 'Why Us', href: '#why-us' }, { id: 'process', label: 'Process', href: '#process' }, { id: 'team', label: 'Team', href: '#team' }, ], }, {
      id: 'contact', title: 'Contact', links: [
        { id: 'faq', label: 'FAQ', href: '#faq' }, { id: 'form', label: 'Contact Form', href: '#contact' }, ], }, ],
}
