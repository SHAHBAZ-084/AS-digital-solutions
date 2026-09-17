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

export const standalonePages: SeoContentPage[] = [
  {
    path: '/about',
    pageType: 'about',
    title: 'About AS Digital Solutions',
    metaDescription:
      'About AS Digital Solutions in Chishtian, Punjab: a practical software team building websites, desktop systems, and AI tools for Pakistani businesses.',
    h1: 'About AS Digital Solutions Chishtian',
    primaryKeyword: 'AS Digital Solutions Chishtian',
    secondaryKeywords: ['software house Chishtian', 'team', 'E-E-A-T'],
    intro:
      'AS Digital Solutions is a Chishtian-based team focused on practical delivery—websites that convert, desktop tools that survive offline hours, and software that matches real Pakistani workflows.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'What we believe',
        paragraphs: [
          'Owners deserve clear PKR scoping, milestones they can check, and systems staff will actually use. We prefer smaller honest scopes over bloated proposals.',
          'Founding year, SECP registration details, and street-level office address will be published as REPLACE_YYYY / REPLACE_Street, Area until you confirm them for schema and GBP.',
        ],
      },
      {
        type: 'list',
        heading: 'How we work',
        items: [
          'Discovery before code',
          'Staging previews for feedback',
          'Training at handoff',
          'Optional maintenance retainers',
        ],
      },
      {
        type: 'cta',
        heading: 'Meet us on a call',
        body: 'Email contactasdigitalsolutions@gmail.com or call 03220726006. LinkedIn: Muhammad Shahbaz profile linked in the site footer.',
      },
    ],
    faqs: [
      {
        question: 'Where are you located?',
        answer:
          'We operate from Chishtian, Punjab, Pakistan, and serve nearby districts plus remote clients nationwide. Exact street address for maps and GBP is REPLACE_Street, Area until published.',
      },
      {
        question: 'Who is the founder?',
        answer:
          'Public founder naming for schema is REPLACE_Founder Name until you approve the exact legal name to display. Team profiles on the homepage can be updated in the admin CMS.',
      },
    ],
    related: [
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    path: '/contact',
    pageType: 'contact',
    title: 'Contact AS Digital Solutions',
    metaDescription:
      'Contact AS Digital Solutions in Chishtian: email contactasdigitalsolutions@gmail.com, phone 03220726006, or send a project brief online.',
    h1: 'Contact AS Digital Solutions in Chishtian',
    primaryKeyword: 'IT company near me Chishtian',
    secondaryKeywords: ['contact software company', 'WhatsApp project brief'],
    intro:
      'Tell us what you sell, what hurts today, and your timeline. We reply with clarifying questions and a proposed next step—not a spam PDF.',
    sections: [
      {
        type: 'list',
        heading: 'Reach us',
        items: [
          'Email: contactasdigitalsolutions@gmail.com',
          'Phone / WhatsApp: 03220726006',
          'City: Chishtian, Punjab, Pakistan',
          'Street map pin: REPLACE_Street, Area (update when GBP is live)',
          'Homepage contact form: /#contact',
        ],
      },
      {
        type: 'paragraphs',
        heading: 'What to include in a brief',
        paragraphs: [
          'Industry, must-have features, online vs offline needs, and any samples (Excel, photos of registers, competitor sites). The more concrete, the faster we quote.',
        ],
      },
      {
        type: 'cta',
        heading: 'Prefer WhatsApp?',
        body: 'Message 03220726006 with your city and project type. For a longer brief, use the homepage form so attachments and structured fields arrive in email.',
      },
    ],
    faqs: [
      {
        question: 'Do you sign contracts?',
        answer:
          'Yes. Scoped proposals include deliverables, timeline, payment schedule, and acceptance criteria before major build work starts. We can work under an NDA when your supplier lists or financial data are sensitive.',
      },
      {
        question: 'What are your hours?',
        answer:
          'Typical response window is business hours Pakistan time, Monday to Saturday, with Friday rhythms flexible for prayers. Exact openingHours for schema remain aligned to REPLACE until you lock a public schedule.',
      },
    ],
    related: [
      { label: 'Services overview', href: '/services' },
      { label: 'Pricing overview', href: '/pricing' },
      { label: 'Chishtian location page', href: '/locations/chishtian' },
    ],
  },
  {
    path: '/pricing',
    pageType: 'pricing',
    title: 'Pricing PKR | AS Digital Solutions',
    metaDescription:
      'Indicative PKR pricing for websites, POS, and custom software from AS Digital Solutions. Final quotes follow discovery—no fake package bait.',
    h1: 'Transparent PKR pricing guidance',
    primaryKeyword: 'website design price in Pakistan',
    secondaryKeywords: ['software cost Pakistan', 'POS price'],
    intro:
      'Pakistan market rates vary by scope. Below are indicative bands to help budgeting. REPLACE markers show where you should publish locked packages after internal approval.',
    sections: [
      {
        type: 'pricing',
        heading: 'Indicative ranges',
        paragraphs: [
          'These are planning figures, not cart prices. Taxes, third-party wallets, SMS, and stock photography are extra when used.',
        ],
        ranges: [
          { label: 'Brochure website', range: 'REPLACE_35000 – REPLACE_90000' },
          { label: 'Business site + CMS', range: 'REPLACE_90000 – REPLACE_180000' },
          { label: 'Ecommerce storefront', range: 'REPLACE_120000 – REPLACE_500000' },
          { label: 'POS / desktop system', range: 'REPLACE_180000 – REPLACE_700000' },
          { label: 'Custom multi-module software', range: 'REPLACE_350000 – REPLACE_800000+' },
        ],
      },
      {
        type: 'paragraphs',
        heading: 'How quotes work',
        paragraphs: [
          'We convert ranges into fixed-phase proposals after discovery. You always know what “done” means before major invoices.',
        ],
      },
      {
        type: 'cta',
        heading: 'Get a tailored quote',
        body: 'Use the cost calculator for a rough web estimate, then contact us for a real proposal.',
      },
    ],
    faqs: [
      {
        question: 'Do you take milestone payments?',
        answer:
          'Yes. Typical structures split kickoff, mid-build, and launch so cashflow stays fair for both sides. Exact percentages depend on project risk, procurement needs, and whether hardware or third-party fees are involved.',
      },
      {
        question: 'Are prices inclusive of hosting?',
        answer:
          'Hosting and domain renewals are usually separate, billed by the provider you choose. We can manage VPS setup as a line item when requested, and we document who owns DNS so renewals never surprise you.',
      },
    ],
    related: [
      { label: 'Website cost calculator', href: '/tools/website-cost-calculator' },
      { label: 'Website cost blog guide', href: '/blog/website-design-cost-pakistan' },
      { label: 'Contact for a quote', href: '/contact' },
    ],
  },
  {
    path: '/tools/website-cost-calculator',
    pageType: 'tool',
    title: 'Website Cost Calculator Pakistan',
    metaDescription:
      'Estimate website cost in PKR for Pakistani business sites. Indicative only—AS Digital Solutions provides real quotes after discovery.',
    h1: 'Website cost calculator (PKR estimate)',
    primaryKeyword: 'how much does a website cost in Pakistan',
    secondaryKeywords: ['website price calculator', 'PKR web estimate'],
    intro:
      'Adjust type, pages, and add-ons for a rough PKR band. This tool does not store your data or create a binding offer.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'How to read the estimate',
        paragraphs: [
          'Custom design, bilingual content, and payment gateways move you up the band. Desktop POS work is quoted separately from marketing websites.',
          'For a human quote, send the estimate screenshot to WhatsApp 03220726006 or use the contact form.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is the calculator accurate?',
        answer:
          'It is a planning aid based on common Pakistan market bands. Unique workflows, migrations, and integrations require a discovery call before we commit to a fixed fee.',
      },
    ],
    related: [
      { label: 'Pricing page', href: '/pricing' },
      { label: 'Web development service', href: '/services/web-development' },
      { label: 'Cost guide article', href: '/blog/website-design-cost-pakistan' },
    ],
  },
]
