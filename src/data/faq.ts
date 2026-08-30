export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    id: 'types-of-sites', question: 'What types of websites can you build?', answer:
      'We can build business websites, landing pages, portfolio sites, internal web apps, and product-focused platforms based on your goals and workflow needs.', }, {
    id: 'custom-business-software', question: 'Do you build custom business software?', answer:
      'Yes. We build software around real business processes such as billing, inventory, sales, reporting, and other custom operational requirements.', }, {
    id: 'offline-capability', question: 'Can the software work offline as well as online?', answer:
      'Yes, when the use case requires it. We can design offline-first or hybrid systems that continue working locally and sync when connectivity is available.', }, {
    id: 'maintenance-support', question: 'Do you provide maintenance and long-term support?', answer:
      'Yes. Ongoing support, updates, fixes, and improvement planning can be part of the delivery depending on what your project needs.', }, {
    id: 'how-to-start', question: 'How do we start a project with you?', answer:
      'Start by sharing your idea, workflow, or current challenge. From there, we can discuss requirements, priorities, and the best path toward a working solution.', },
]
