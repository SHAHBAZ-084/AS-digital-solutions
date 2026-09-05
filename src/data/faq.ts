export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    id: 'what-we-offer',
    question: 'What services does AS Digital Solutions offer?',
    answer:
      'AS Digital Solutions builds websites, business software, custom applications, and AI-integrated tools for startups and growing companies. We also deliver offline-first and hybrid systems for businesses that cannot rely on constant internet connectivity.',
  },
  {
    id: 'where-based',
    question: 'Where is AS Digital Solutions based?',
    answer:
      'AS Digital Solutions is based in Pakistan and works with local and remote clients. You can reach us by email at contactasdigitalsolutions@gmail.com or by phone at 03220726006.',
  },
  {
    id: 'how-to-get-quote',
    question: 'How can I get a quote for a project?',
    answer:
      'Share your idea, workflow bottleneck, or current challenge through the contact form on this site, or email us directly. We review the requirements and reply with a clear next step, including scope discussion and direction for a working solution.',
  },
  {
    id: 'project-process',
    question: 'What does your delivery process look like?',
    answer:
      'We follow a clear path from idea to working solution: Discover, Plan, Design, Develop, Test, Deploy, and Support. Each step keeps the project aligned with business needs while making delivery easier to track.',
  },
  {
    id: 'offline-capability',
    question: 'Can your software work offline as well as online?',
    answer:
      'Yes, when the use case requires it. We design offline-first or hybrid systems that continue working locally and sync when connectivity is available—built for real-world business conditions.',
  },
  {
    id: 'what-makes-different',
    question: 'What makes AS Digital Solutions different?',
    answer:
      'We focus on practical business value: solutions shaped around real workflows, custom builds instead of one-size-fits-all templates, online and offline capability when needed, scalable architecture, modern technology, and long-term support after launch.',
  },
]
