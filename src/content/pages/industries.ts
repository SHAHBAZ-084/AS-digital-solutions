import type { SeoContentPage } from '../types'

export const industryPages: SeoContentPage[] = [
  {
    path: '/industries',
    pageType: 'hub',
    title: 'Industries We Serve | AS Digital Solutions',
    metaDescription:
      'AS Digital Solutions builds software for retail, education, pharmacy, agriculture, and real estate in Punjab. Explore industry-specific websites, POS.',
    h1: 'Industry-focused software and web solutions',
    primaryKeyword: 'industry software solutions Pakistan',
    secondaryKeywords: [
      'retail POS Punjab',
      'school software Pakistan',
      'pharmacy inventory',
      'agriculture trading software',
    ],
    intro:
      'Different industries break software in different ways. AS Digital Solutions maps retail, education, pharmacy, agriculture, and real-estate workflows before recommending websites, POS, or custom systems. Explore the hubs below for context tailored to how your sector actually operates in Punjab.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'Why industry context matters',
        paragraphs: [
          'A garments POS is not a grain commission desk. A school fee office is not a property lead inbox. We keep playbooks separate so demos feel familiar to your staff on day one.',
          'Cross-links to services and city pages help you assemble the right package without reading every article on the site.',
        ],
      },
      {
        type: 'cta',
        heading: 'Tell us your industry in one line',
        body: 'Call 03220726006 or email contactasdigitalsolutions@gmail.com. We will point you to the best service mix and a discovery plan.',
      },
    ],
    faqs: [],
    related: [
      { label: 'Browse all services', href: '/services' },
      { label: 'Chishtian local delivery', href: '/locations/chishtian' },
      { label: 'See real client portfolio', href: '/portfolio' },
      { label: 'Pricing guidance', href: '/pricing' },
    ],
    hubLinks: [
      { label: 'Retail', href: '/industries/retail' },
      { label: 'Education', href: '/industries/education' },
      { label: 'Pharmacy', href: '/industries/pharmacy' },
      { label: 'Agriculture', href: '/industries/agriculture' },
      { label: 'Real estate', href: '/industries/real-estate' },
    ],
  },
  {
    path: '/industries/retail',
    pageType: 'industry',
    title: 'Retail Software & POS | AS Digital Solutions',
    metaDescription:
      'Retail software for Pakistan shops: barcode POS, variants, udhaar, and inventory. Learn how AS Digital Solutions equips garment and general retailers to.',
    h1: 'Retail software for counters that cannot slow down',
    primaryKeyword: 'retail POS software Pakistan',
    secondaryKeywords: [
      'garment shop software',
      'barcode billing Punjab',
      'retail inventory system',
      'udhaar tracking software',
    ],
    intro:
      'Retail margins die in queues, stock surprises, and messy credit books. AS Digital Solutions builds retail-focused POS and inventory systems—proven in projects like Usman Mall—plus websites that keep your brand visible between footfall peaks.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'Retail realities in Punjab towns and cities',
        paragraphs: [
          'Whether you run a garments floor in Chishtian or a variety store in Haroonabad, peak hours punish slow search-and-type billing. Barcode checkout, keyboard shortcuts, and reliable printers are not luxuries; they are how you keep customers from walking next door.',
          'Variants—size, colour, style—multiply SKU counts quickly. Inventory software must respect those dimensions or your shelf counts lie. Returns and exchanges need first-class flows because fashion retail lives on them.',
          'Udhaar remains culturally normal. Systems that only celebrate cash sales force owners back to side notebooks. We track balances and partial payments inside the same operational database as sales.',
        ],
      },
      {
        type: 'list',
        heading: 'Retail capabilities we emphasise',
        items: [
          'POS with scanner support and printable receipts',
          'Variant inventory and low-stock visibility',
          'Customer credit ledgers and history',
          'Purchase and supplier payables when scoped',
          'Optional double-entry posting from each sale',
          'Brochure or catalogue websites for discovery',
          'WhatsApp order assistance beside formal checkout',
        ],
      },
      {
        type: 'cta',
        heading: 'Upgrade the till, not just the décor',
        body: 'Call 03220726006 or email contactasdigitalsolutions@gmail.com with your product count and city. Ask about POS and inventory discovery.',
      },
    ],
    faqs: [
      {
        question: 'Can retail software work fully offline?',
        answer:
          'Yes. Our common shop deployments keep billing on a local database so internet outages do not freeze the counter. Backups can still use drives or optional cloud folders when connectivity returns. We confirm this requirement explicitly during discovery for every retail floor.',
      },
      {
        question: 'Do you support multiple cashiers?',
        answer:
          'Role-based access and, where needed, approval queues help separate clerk and owner powers. True multi-terminal concurrency needs architectural planning. Tell us how many tills run in parallel so we recommend a safe design instead of stretching a single-user assumption.',
      },
      {
        question: 'Should retailers invest in ecommerce too?',
        answer:
          'Sometimes. If your catalogue and delivery radius justify it, ecommerce helps. Many retailers win first with POS discipline plus a simple website and WhatsApp. We advise based on SKU count and staffing, not a one-path sales script.',
      },
    ],
    related: [
      { label: 'POS software service', href: '/services/pos-software' },
      { label: 'Inventory software service', href: '/services/inventory-software' },
      { label: 'Retail projects in Haroonabad', href: '/locations/haroonabad' },
      { label: 'Usman Mall style portfolio work', href: '/portfolio' },
    ],
  },
  {
    path: '/industries/education',
    pageType: 'industry',
    title: 'Education Software & Websites | AS Digital',
    metaDescription:
      'Education software and websites for Pakistan schools, academies, and student organisations. Fee tools, admissions presence, and clear communication from.',
    h1: 'Education technology that offices and parents understand',
    primaryKeyword: 'education software Pakistan',
    secondaryKeywords: [
      'school management system',
      'academy website Punjab',
      'student organisation website',
      'fee management software',
    ],
    intro:
      'Education organisations need clarity: what programmes exist, how to enrol, what fees are due, and where to ask questions. AS Digital Solutions builds school management modules and education websites—work that ranges from campus admin tools to public sites like Serve & Lead Society’s student-focused presence.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'From admissions marketing to back-office calm',
        paragraphs: [
          'Parents judge trust quickly on mobile. Slow sites, outdated prospectuses, and hidden phone numbers lose enrolments before a counsellor speaks. We craft education websites with programme structure, timelines, and WhatsApp paths that match how families actually enquire.',
          'Inside the office, fee disputes and attendance gaps consume staff hours. Phased school management systems tackle the loudest pain first—often challans and outstanding lists—before expanding into academics.',
          'Student societies and non-profits need event and opportunity visibility across cities. Content should stay maintainable by non-technical volunteers after launch.',
        ],
      },
      {
        type: 'list',
        heading: 'Education deliverables',
        items: [
          'Admissions and programme websites',
          'Fee and student record modules',
          'Attendance pilots for selected classes',
          'Notice automation via SMS or WhatsApp where appropriate',
          'Internship or opportunity listings for societies',
          'Analytics to see which pages drive enquiries',
        ],
      },
      {
        type: 'cta',
        heading: 'Modernise campus communication',
        body: 'Email contactasdigitalsolutions@gmail.com with campus size and current tools, or call 03220726006. We will suggest website-only versus management-system phases.',
      },
    ],
    faqs: [
      {
        question: 'Do small academies need full school ERP?',
        answer:
          'Usually not. Batch enrolment, fee follow-ups, and a credible website cover many tuition centres. Full ERP makes sense when multiple classes, concessions, and reporting obligations justify it. We right-size rather than selling shelfware modules you will never open.',
      },
      {
        question: 'Can students apply online?',
        answer:
          'Application forms and document checklists are common website features. Fully paperless admissions depend on your internal review process. We implement what staff will actually process daily, including hybrid print-and-digital steps when required by boards or trusts.',
      },
      {
        question: 'How do you handle student data privacy?',
        answer:
          'Role-based access, least-privilege admin accounts, and backup discipline are baseline. We discuss device sharing realities in campus offices and encourage policies that stop password sticky notes. Sensitivity increases for younger students—human approval stays on communications that could cause harm if mistargeted.',
      },
    ],
    related: [
      { label: 'School management system service', href: '/services/school-management-system' },
      { label: 'WhatsApp automation for notices', href: '/services/whatsapp-automation' },
      { label: 'Education-heavy Bahawalpur market', href: '/locations/bahawalpur' },
      { label: 'Serve & Lead style portfolio', href: '/portfolio' },
    ],
  },
  {
    path: '/industries/pharmacy',
    pageType: 'industry',
    title: 'Pharmacy Software Punjab | AS Digital Solutions',
    metaDescription:
      'Pharmacy software conversations for Punjab medical stores: inventory discipline, billing speed, and careful catalogue structure with AS Digital Solutions.',
    h1: 'Pharmacy billing and inventory software that respects care',
    primaryKeyword: 'pharmacy software Punjab',
    secondaryKeywords: [
      'medical store POS',
      'pharmacy inventory Pakistan',
      'expiry stock tracking',
      'chemist billing software',
    ],
    intro:
      'Pharmacies balance customer urgency with regulatory and expiry realities. AS Digital Solutions helps medical stores plan POS and inventory systems that keep counters fast while making stock truth visible—without promising clinical magic the software cannot ethically provide.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'What pharmacy counters need from software',
        paragraphs: [
          'Search-by-name speed, substitute awareness at a human level, and accurate quantity on hand matter every rush hour. Batch and expiry tracking become critical depending on your product mix; we scope those fields deliberately because they change receiving and sale flows.',
          'Many Punjab pharmacies still juggle wholesaler invoices and partial packs. Unit conversions must be explicit or stock math fails. Training focuses on those edge cases, not only happy-path sales.',
          'Public websites for pharmacies should emphasise timings, location, and contact—not unverified medical claims. We keep marketing copy responsible.',
        ],
      },
      {
        type: 'list',
        heading: 'Pharmacy-oriented features to discuss',
        items: [
          'Fast medicine search at POS',
          'Inventory with optional batch/expiry',
          'Supplier purchases and payables',
          'Low-stock alerts for critical movers',
          'Receipt printing customers recognise',
          'Offline-capable desktop operation',
          'Simple web presence for discovery',
        ],
      },
      {
        type: 'cta',
        heading: 'Review your medical store workflow',
        body: 'WhatsApp 03220726006 with a sample invoice photo (sensitive patient data removed), or email contactasdigitalsolutions@gmail.com. We will outline a safe phase-one scope.',
      },
    ],
    faqs: [
      {
        question: 'Can software replace a pharmacist’s judgement?',
        answer:
          'No. Software supports billing and stock; clinical decisions remain with qualified humans. We avoid features that imply automated prescribing. That boundary protects patients and your licence risk while still improving operational accuracy at the till.',
      },
      {
        question: 'Do you integrate with specific wholesalers?',
        answer:
          'Integrations depend on whether wholesalers offer usable data feeds. Many stores start with manual purchase entry or Excel imports. We assess ROI before promising automated supplier sync that may not exist for your trading partners.',
      },
      {
        question: 'Is offline mode available for pharmacies?',
        answer:
          'Yes, desktop offline-first deployments are common where internet is unstable. Continuity of billing during outages is often more valuable than cloud dashboards that freeze mid-sale when the line drops.',
      },
    ],
    related: [
      { label: 'Inventory software deep dive', href: '/services/inventory-software' },
      { label: 'POS software overview', href: '/services/pos-software' },
      { label: 'Hasilpur local retail & pharmacy', href: '/locations/hasilpur' },
      { label: 'Contact for a store demo plan', href: '/contact' },
    ],
  },
  {
    path: '/industries/agriculture',
    pageType: 'industry',
    title: 'Agriculture Software Pakistan | AS Digital',
    metaDescription:
      'Agriculture and grain-market software for Pakistan traders: specialised invoices, stock ledgers, and offline accounting. Built by AS Digital Solutions.',
    h1: 'Agriculture and mandi software for real trading desks',
    primaryKeyword: 'agriculture trading software Pakistan',
    secondaryKeywords: [
      'grain market software',
      'mandi accounting system',
      'commission agent software',
      'offline agri desktop apps',
    ],
    intro:
      'Agriculture trading is not generic retail. AS Digital Solutions builds desktop systems for grain markets and related traders—work exemplified by Sheraz Traders and Sufi & Co Grain Market—with invoice types, deductions, and ledgers that match mandi vocabulary and offline realities.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'Why agri trade breaks standard POS',
        paragraphs: [
          'Sale on commission, paunch, kachi maal settlements, bardana, dalali, munshiana, and weighted-average costing are not optional checkboxes on a global SaaS form. Encoding them incorrectly destroys trust with farmers and parties faster than having no software at all.',
          'Chishtian’s grain market context keeps us close to how southern Punjab desks operate: peak seasonal pressure, mixed Urdu/English terminology, and PCs that must work when connectivity fails.',
          'Input retailers and agri-service firms may need simpler inventory POS; commission agents need deeper accounting. We distinguish those paths early.',
        ],
      },
      {
        type: 'list',
        heading: 'Agriculture-focused capabilities',
        items: [
          'Trade-specific invoice calculations and deductions',
          'Party categorisation across internal and external accounts',
          'Product-linked inventory ledgers (maal khata patterns)',
          'Double-entry reporting: ledger, trial balance, P&L',
          'Owner approval queues for clerk entries',
          'Offline SQLite-backed desktop operation',
          'Backup routines suited to single-shop risk',
        ],
      },
      {
        type: 'cta',
        heading: 'Bring a sample bahi or invoice',
        body: 'Call 03220726006 or email contactasdigitalsolutions@gmail.com. Share anonymised document photos so we can judge custom desktop fit versus simpler retail POS.',
      },
    ],
    faqs: [
      {
        question: 'Can generic accounting software work for mandi trade?',
        answer:
          'Sometimes for simple purchase and sale, but specialised commission documents usually fight generic voucher screens. Staff invent workarounds, and reports stop matching reality. Purpose-built flows cost more up front and far less in daily friction when your deductions are complex.',
      },
      {
        question: 'Do you train munshi staff on the new system?',
        answer:
          'Yes. Training uses your products and party names. We schedule sessions around market hours and leave a short daily checklist. Adoption succeeds when owners stop accepting parallel paper as the “real” books after the agreed cutover date.',
      },
      {
        question: 'Is cloud mandatory?',
        answer:
          'No. Most agri desks we equip prioritise offline desktop databases. Optional backups to drives or cloud folders are additive. Forcing cloud-only billing onto unreliable lines is a common reason prior tools were abandoned.',
      },
    ],
    related: [
      { label: 'Custom software development', href: '/services/custom-software' },
      { label: 'Desktop app development', href: '/services/desktop-apps' },
      { label: 'Chishtian grain market proximity', href: '/locations/chishtian' },
      { label: 'Sheraz & Sufi portfolio cases', href: '/portfolio' },
    ],
  },
  {
    path: '/industries/real-estate',
    pageType: 'industry',
    title: 'Real Estate Websites & Software | AS Digital',
    metaDescription:
      'Real estate websites and lead tools for Pakistan property marketers and managers. Clear listings, enquiry routing, and credible design from AS Digital.',
    h1: 'Real estate web systems that turn browsers into enquiries',
    primaryKeyword: 'real estate website Pakistan',
    secondaryKeywords: [
      'property management website',
      'real estate lead capture',
      'housing society web design',
      'listings website Punjab',
    ],
    intro:
      'Property decisions are high trust and high consideration. AS Digital Solutions builds real-estate websites and enquiry workflows that showcase inventory or services clearly—experience that includes international property audiences like CityNestServices as well as local marketers who live on WhatsApp follow-ups.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'What property clients need online',
        paragraphs: [
          'Listings must load fast with honest photography, location context, and a frictionless way to request a call. Overbuilt portals collapse when nobody updates them; we right-size CMS habits to your team’s actual capacity.',
          'Service firms—management, maintenance, rental operations—need service breakdown pages more than endless maps. CityNestServices-style clarity helps landlords and investors understand scope before they enquire.',
          'Compliance and claim accuracy matter. We avoid fabricating amenities or legal statuses. Your content owners remain responsible for what is published; we provide structure and guardrails.',
        ],
      },
      {
        type: 'list',
        heading: 'Real-estate digital building blocks',
        items: [
          'Property or service listing templates',
          'Enquiry forms with WhatsApp fallbacks',
          'Map embeds and area explainers',
          'Lead notification to sales inboxes',
          'SEO for city and society-related searches',
          'Optional automation for common FAQs',
          'Analytics on which listings convert',
        ],
      },
      {
        type: 'cta',
        heading: 'Improve your property web presence',
        body: 'Email contactasdigitalsolutions@gmail.com with sample listings, or call 03220726006. We will recommend brochure versus catalogue architecture and a discovery-based estimate.',
      },
    ],
    faqs: [
      {
        question: 'Do you build full property marketplaces?',
        answer:
          'Marketplace platforms are large products with moderation, payments, and multi-seller complexity. Many clients need a strong brokerage or management site first. We will say when a marketplace scope is out of proportion to your team size and suggest a phase that still captures leads.',
      },
      {
        question: 'Can agents update listings themselves?',
        answer:
          'Yes, when a CMS or admin is in scope and someone owns content quality. If agents will not update, a lighter site with manually curated featured inventory often performs better than a stale database that erodes trust.',
      },
      {
        question: 'How do you handle Urdu and English property copy?',
        answer:
          'Bilingual structures are planned early to protect SEO. We help organise copy decks and ensure contact CTAs remain obvious in both languages. Machine-only translation without review is discouraged for high-value property claims.',
      },
    ],
    related: [
      { label: 'Web development services', href: '/services/web-development' },
      { label: 'Digital marketing for listings', href: '/services/digital-marketing' },
      { label: 'Multan property-ready web work', href: '/locations/multan' },
      { label: 'CityNestServices in portfolio', href: '/portfolio' },
    ],
  },
]
