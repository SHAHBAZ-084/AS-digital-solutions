import type { SeoContentPage } from '../types'

export const servicePages: SeoContentPage[] = [
  {
    path: '/services',
    pageType: 'hub',
    title: 'Software & Web Services | AS Digital Solutions',
    metaDescription:
      'Explore AS Digital Solutions services: web development, POS, inventory, desktop apps, ecommerce, AI, WhatsApp automation, and digital marketing for.',
    h1: 'Digital services for growing Pakistan businesses',
    primaryKeyword: 'software web services Pakistan',
    secondaryKeywords: [
      'web development Chishtian',
      'POS software Punjab',
      'custom software Pakistan',
      'ecommerce development',
    ],
    intro:
      'AS Digital Solutions offers a focused set of web, software, and growth services for shops, traders, schools, and brands across Punjab and remote Pakistan. Pick a service below to see how we approach delivery, what fits phase one, and how it connects to real projects such as Crown EV Center, Usman Mall, and Sheraz Traders.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'Choose the right starting point',
        paragraphs: [
          'Most clients begin with either a public website that generates enquiries or an internal system that replaces paper and Excel. Some need both. Our service pages explain the difference so you do not buy an ecommerce platform when a brochure site plus WhatsApp would do—or vice versa.',
          'Every engagement still follows discovery first. Soft pricing ranges live on our pricing page; service pages focus on outcomes, process, and fit.',
        ],
      },
      {
        type: 'cta',
        heading: 'Not sure which service you need?',
        body: 'Call 03220726006 or email contactasdigitalsolutions@gmail.com with a one-paragraph description of your business pain. We will point you to the right page and a sensible phase-one scope.',
      },
    ],
    faqs: [],
    related: [
      { label: 'Typical pricing ranges in PKR', href: '/pricing' },
      { label: 'Portfolio of delivered systems', href: '/portfolio' },
      { label: 'Software services in Chishtian', href: '/locations/chishtian' },
      { label: 'Retail industry solutions', href: '/industries/retail' },
    ],
    hubLinks: [
      { label: 'Web development', href: '/services/web-development' },
      { label: 'Custom software', href: '/services/custom-software' },
      { label: 'Desktop apps', href: '/services/desktop-apps' },
      { label: 'POS software', href: '/services/pos-software' },
      { label: 'Inventory software', href: '/services/inventory-software' },
      { label: 'School management system', href: '/services/school-management-system' },
      { label: 'Ecommerce development', href: '/services/ecommerce-development' },
      { label: 'AI solutions', href: '/services/ai-solutions' },
      { label: 'WhatsApp automation', href: '/services/whatsapp-automation' },
      { label: 'Digital marketing', href: '/services/digital-marketing' },
    ],
  },
  {
    path: '/services/web-development',
    pageType: 'service',
    title: 'Web Development Pakistan | AS Digital Solutions',
    metaDescription:
      'Professional web development in Chishtian and across Pakistan: fast, mobile-ready sites with SEO foundations. AS Digital builds brochure, service, and.',
    h1: 'Web development for businesses that need to be found',
    primaryKeyword: 'web development Pakistan',
    secondaryKeywords: [
      'website development Chishtian',
      'responsive web design Punjab',
      'SEO friendly websites Pakistan',
      'business website developer',
    ],
    serviceName: 'Web Development',
    priceMin: 'REPLACE_40000',
    priceMax: 'REPLACE_350000',
    intro:
      'Web development at AS Digital Solutions means more than a pretty homepage. We build fast, mobile-first websites that help customers in Chishtian, Bahawalnagar, Multan, and nationwide understand what you sell, trust your brand, and contact you on WhatsApp or phone without friction. From Crown EV Center’s dealership-style presence to international property and non-profit sites, we focus on clarity, performance, and maintainable code.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'What modern web development includes',
        paragraphs: [
          'A useful business website answers three questions in seconds: what you offer, who it is for, and how to reach you. We structure information architecture around those answers, then layer design, content blocks, and calls to action that work on slow mobile connections common outside major metros.',
          'Under the hood we prefer clean front-end stacks, semantic HTML, and performance budgets that keep Largest Contentful Paint reasonable. SEO foundations—titles, meta descriptions, headings, internal links, and sensible URLs—are part of the build, not a paid afterthought. Analytics and Search Console hooks are configured so you can see which pages attract real enquiries.',
          'For product-led businesses we can extend into catalogs, appointment booking, branch locators, and light ecommerce. When your needs cross into full inventory sync or complex checkout, we connect the conversation to our ecommerce and custom software services so you do not stretch a brochure CMS past its limits.',
        ],
      },
      {
        type: 'list',
        heading: 'Deliverables you can expect',
        intro: 'Exact scope varies, but most web projects include:',
        items: [
          'Responsive layouts tested on common Android and iOS viewport sizes',
          'Contact paths optimized for phone tap and WhatsApp deep links',
          'On-page SEO setup aligned to your primary and secondary keywords',
          'Basic schema where appropriate (Organization, LocalBusiness, FAQ)',
          'Admin or content update path agreed up front—CMS or structured handoff',
          'Launch checklist: redirects, sitemap, forms testing, and backup plan',
        ],
      },
      {
        type: 'steps',
        heading: 'Our web development process',
        steps: [
          {
            title: 'Discovery and sitemap',
            body: 'We interview stakeholders, review competitors, and lock a page list. This prevents endless “one more page” drift mid-build and keeps quotes honest.',
          },
          {
            title: 'Design direction and content',
            body: 'Visual direction follows your brand assets when they exist. We help organise copy so headlines carry keywords without sounding robotic. Imagery should show real products, places, or people whenever possible.',
          },
          {
            title: 'Build, review, launch',
            body: 'You review staging links at milestones. After launch we verify forms, speed basics, and search indexing setup, then hand over a short maintenance guide.',
          },
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Industries and local context',
        paragraphs: [
          'In southern Punjab, many buyers still discover businesses through WhatsApp referrals and Google searches for city + service. Your site must load quickly on mid-range phones and make the next step obvious. EV dealers need model clarity and service booking cues; schools and societies need programme credibility; traders may only need a trust page while their real system is desktop POS.',
          'We have built public sites for Crown EV Center, CityNestServices, and Serve & Lead Society, each with different audiences and geographies. That range keeps us flexible: local Urdu-friendly contact patterns one week, international English property audiences the next.',
          'If you already have a site that looks dated or fails on mobile, redesign is often cheaper than continuous ad spend on a page that does not convert. Bring us your analytics (or even just call logs) and we will prioritise fixes that move enquiries.',
        ],
      },
      {
        type: 'pricing',
        heading: 'Budgeting for a website',
        paragraphs: [
          'Typical market estimates for brochure and growth sites are summarised on our pricing page and calculator. Schema fields may use REPLACE_ placeholders until a signed scope exists.',
        ],
        ranges: [
          {
            label: 'Brochure / service website',
            range: 'Typical market estimate: PKR 40,000–120,000',
            note: 'Final quote after discovery.',
          },
          {
            label: 'Content-rich or light ecommerce',
            range: 'Typical market estimate: PKR 120,000–350,000+',
            note: 'Final quote after discovery.',
          },
        ],
      },
      {
        type: 'cta',
        heading: 'Plan your next website',
        body: 'Call 03220726006 or email contactasdigitalsolutions@gmail.com. Mention your city and whether you need Urdu copy support, online booking, or a catalog. We will recommend phase one and share a discovery-based estimate.',
      },
    ],
    faqs: [
      {
        question: 'How long does a typical business website take?',
        answer:
          'Many brochure sites land in three to six weeks when content arrives on time. Catalog or multi-language builds take longer. Timelines slip most often on photography and copy approval, so we set content deadlines early and keep a shared checklist visible to your team throughout the project.',
      },
      {
        question: 'Will my site work on mobile data in smaller cities?',
        answer:
          'Yes—performance on mid-range Android devices is a design constraint, not a nice-to-have. We compress imagery, avoid heavy unused libraries, and test key pages on throttled connections so customers in Chishtian, Hasilpur, or Haroonabad can still reach your WhatsApp button quickly.',
      },
      {
        question: 'Do you provide SEO after launch?',
        answer:
          'On-page foundations ship with the site. Ongoing SEO—new articles, local landing pages, or link outreach—can be scoped as a retainer or as individual content projects. We also publish educational guides on our blog so you understand what moves rankings versus what is noise.',
      },
      {
        question: 'Can you redesign my existing WordPress or static site?',
        answer:
          'Often yes. We audit what to keep (domain authority, URLs, useful content) versus what to rebuild. Sometimes a fresh stack is healthier than fighting a brittle theme. We explain trade-offs before you commit so redirects and SEO equity are protected during cutover.',
      },
    ],
    related: [
      { label: 'Ecommerce development when you sell online', href: '/services/ecommerce-development' },
      { label: 'Website design cost in Pakistan guide', href: '/blog/website-design-cost-pakistan' },
      { label: 'Web development in Bahawalpur', href: '/locations/bahawalpur' },
      { label: 'Digital marketing to amplify your site', href: '/services/digital-marketing' },
    ],
  },
  {
    path: '/services/custom-software',
    pageType: 'service',
    title: 'Custom Software Development | AS Digital Solutions',
    metaDescription:
      'Custom software development in Punjab for workflows SaaS cannot fit: accounting, approvals, trade invoices, and internal tools. Built by AS Digital.',
    h1: 'Custom software shaped around your real workflow',
    primaryKeyword: 'custom software development',
    secondaryKeywords: [
      'bespoke business software Pakistan',
      'custom apps Chishtian',
      'workflow software Punjab',
      'tailored accounting systems',
    ],
    serviceName: 'Custom Software Development',
    priceMin: 'REPLACE_150000',
    priceMax: 'REPLACE_700000',
    intro:
      'Off-the-shelf tools fail when your business has unique invoice types, approval chains, or offline constraints. AS Digital Solutions builds custom software for Pakistan organisations that need a system mapped to how they already work—then improved carefully—rather than forcing staff into someone else’s template.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'When custom is the right call',
        paragraphs: [
          'Choose custom software when configuration hell on a generic SaaS costs more than a focused build, when internet cannot be assumed at the counter, or when your documents use industry rules that global products ignore. Grain commission invoices with bardana and dalali, garment variants with udhaar, or NGO internship pipelines are classic examples.',
          'Our custom work spans desktop and web. Sheraz Traders and Sufi & Co Grain Market needed offline double-entry systems with trade-specific documents. Usman Mall needed POS tightly bound to accounting. Web clients needed enquiry and content flows that match their brand—not a bloated page builder.',
          'Custom does not mean endless scope. We still ship in phases: core ledger or core booking first, reporting and niceties next. That discipline keeps budgets understandable and lets staff learn the system before it grows.',
        ],
      },
      {
        type: 'list',
        heading: 'Capabilities we frequently implement',
        items: [
          'Role-based access with owner approval queues for clerk entries',
          'Domain-specific documents and automatic calculations',
          'Double-entry accounting hooks from operational events',
          'Offline-first local databases with optional cloud backup',
          'Imports from Excel and controlled data migrations',
          'Print layouts matching letterheads and local receipt printers',
          'Dashboards for owners who want KPIs without spreadsheet gymnastics',
        ],
      },
      {
        type: 'steps',
        heading: 'How a custom project runs',
        steps: [
          {
            title: 'Workflow mapping',
            body: 'We shadow or interview the people who touch paper today. Edge cases—returns, partial payments, seasonal products—are written down before coding starts.',
          },
          {
            title: 'Architecture and prototype',
            body: 'You see screen flows and data entities early. Technical choices (desktop shell, web API, SQLite, and so on) are justified against connectivity and hardware realities.',
          },
          {
            title: 'Iterative delivery and training',
            body: 'Milestones ship to a staging or pilot machine. Training uses your sample data. Go-live includes backup drills so a failed disk does not become a crisis story.',
          },
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Risk management and ownership',
        paragraphs: [
          'You should know who holds source code, how licenses work, and what happens if you pause the project. We discuss repository access, installer packaging, and documentation as part of commercial clarity—not as fine print after launch.',
          'Security basics matter even for single-shop systems: hashed credentials where applicable, restricted clerk permissions, and backups stored away from the till PC. For web-facing custom tools we add authentication, validation, and hosting hardening appropriate to the risk level.',
          'If a reputable SaaS already covers 90% of your need at a fair subscription, we will say so. Custom software earns its keep when the remaining 10% is the profitable heart of your operation.',
        ],
      },
      {
        type: 'cta',
        heading: 'Describe the workflow you want digitised',
        body: 'Send sample invoices or a voice note on WhatsApp 03220726006, or email contactasdigitalsolutions@gmail.com. We will tell you honestly whether custom software, a configured POS package, or a simpler website is the better investment.',
      },
    ],
    faqs: [
      {
        question: 'Is custom software only for large companies?',
        answer:
          'No. Many of our custom builds serve single shops and trading desks that simply do not fit retail SaaS moulds. What matters is whether the workflow is stable enough to encode and whether the owner will use the system daily. Small teams with clear processes often succeed faster than large ones with political requirements.',
      },
      {
        question: 'Do you rewrite everything from scratch?',
        answer:
          'We reuse proven internal patterns for ledgers, auth, and installers when they fit, then customise the domain layer. That keeps quality high without pretending every line is unique. You still get a product tailored to your documents and roles, not a white-label clone of another industry.',
      },
      {
        question: 'Can custom software connect to websites or WhatsApp?',
        answer:
          'Yes. Many roadmaps start offline for reliability, then add sync, SMS, or WhatsApp notifications once the core is trusted. We sequence integrations so a flaky API cannot block daily billing on day one of go-live.',
      },
      {
        question: 'How do you estimate cost?',
        answer:
          'After discovery we propose phases with typical market estimate bands and clear inclusions. Schema may show REPLACE_ min/max placeholders until scope is signed. Change requests are priced against the written assumptions so both sides see what moved.',
      },
    ],
    related: [
      { label: 'Desktop apps for offline shops', href: '/services/desktop-apps' },
      { label: 'POS software for retail counters', href: '/services/pos-software' },
      { label: 'Agriculture industry systems', href: '/industries/agriculture' },
      { label: 'Sheraz Traders case study path', href: '/portfolio' },
    ],
  },
  {
    path: '/services/desktop-apps',
    pageType: 'service',
    title: 'Desktop App Development Pakistan | AS Digital',
    metaDescription:
      'Offline-first desktop app development for Pakistan shops and mandis. AS Digital builds Windows POS and accounting systems that work without constant.',
    h1: 'Desktop app development for offline-first businesses',
    primaryKeyword: 'desktop app development Pakistan',
    secondaryKeywords: [
      'Windows business software',
      'offline desktop POS',
      'Electron apps Pakistan',
      'mandi accounting software',
    ],
    serviceName: 'Desktop Application Development',
    priceMin: 'REPLACE_150000',
    priceMax: 'REPLACE_700000',
    intro:
      'When the counter cannot wait for a loading spinner, desktop apps win. AS Digital Solutions designs Windows desktop applications—often Electron-based with local SQLite—for retailers and grain traders who need speed, printers, barcode scanners, and bookkeeping without relying on shop internet all day.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'Why desktop still matters in 2026',
        paragraphs: [
          'Cloud dashboards are excellent when connectivity is stable and staff are trained for browsers. Many Punjab retail and mandi environments are different: shared PCs, intermittent DSL, and owners who want the books on a machine they control. A packaged desktop installer with a local database keeps sales moving during outages and syncs or backs up when the line returns.',
          'Our desktop portfolio includes Usman Mall for garments POS and accounting, Sheraz Traders for grain-market bookkeeping with farmer settlement logic, and Sufi & Co Grain Market for commission and wholesale invoice types. Each ships as a Windows-friendly installer suitable for everyday shop hardware.',
          'Desktop does not mean isolated forever. We can add Google Drive or folder backups, optional APIs, and later web reporting. The principle is operational continuity first, connectivity features second.',
        ],
      },
      {
        type: 'list',
        heading: 'Typical desktop capabilities',
        items: [
          'Local database with integrity checks and one-click backup',
          'Keyboard-friendly POS flows for fast billing',
          'Hardware hooks for scanners and receipt or label printers',
          'Role separation between clerk and owner',
          'Printable invoices with business letterhead',
          'NSIS or similar installers for straightforward setup',
          'Mixed English/Urdu labels when trade vocabulary demands it',
        ],
      },
      {
        type: 'steps',
        heading: 'Delivery approach',
        steps: [
          {
            title: 'Hardware and workflow audit',
            body: 'We note PC specs, printer models, scanner types, and whether multiple counters need separate tills or a single shared app.',
          },
          {
            title: 'Pilot on real transactions',
            body: 'A pilot week with parallel paper or old process catches calculation mismatches before you retire the bahi-khata.',
          },
          {
            title: 'Harden and support',
            body: 'Backups, update channels, and a simple escalation path (WhatsApp plus remote assistance) keep the system healthy after launch.',
          },
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Fit versus web apps',
        paragraphs: [
          'Choose desktop when latency, offline use, or local peripherals dominate. Choose web when many remote users, frequent content edits, or public traffic matter more. Hybrid is possible: desktop for the till, web for the marketing site—exactly how many of our retail clients operate.',
          'We document restore steps so a replacement PC can be brought online without tribal knowledge. That documentation is part of professional desktop delivery, not an optional extra.',
        ],
      },
      {
        type: 'cta',
        heading: 'Ask about a desktop pilot',
        body: 'Message 03220726006 with your shop type and whether you need barcode, udhaar, or mandi invoice types. Email contactasdigitalsolutions@gmail.com for longer briefs and sample files.',
      },
    ],
    faqs: [
      {
        question: 'Which Windows versions do you support?',
        answer:
          'We target commonly used Windows 10 and Windows 11 PCs found in shops. During discovery we check CPU, RAM, and disk space so the app and database remain responsive during peak hours. Very old hardware may need a modest upgrade before go-live for a smooth experience.',
      },
      {
        question: 'Can more than one user work at once?',
        answer:
          'Single-machine deployments are common. Multi-counter setups need explicit design for concurrency and permissions. Tell us how many terminals you run; we will recommend architecture rather than stretching a single SQLite file past safe limits without a plan.',
      },
      {
        question: 'How are updates delivered?',
        answer:
          'We agree an update path during handover—installer refresh, staged rollout, or guided remote update. Critical bug fixes are prioritised. Feature updates follow a short changelog so owners know what changed before staff see new buttons on a busy morning.',
      },
      {
        question: 'Is my data only stored on the shop PC?',
        answer:
          'Primary operational data usually lives locally for offline speed. Backups can be local, external drive, or optional cloud folders. We help you pick a backup rhythm that matches how painful a disk failure would be for your business.',
      },
    ],
    related: [
      { label: 'POS software features and fit', href: '/services/pos-software' },
      { label: 'Inventory software for stock control', href: '/services/inventory-software' },
      { label: 'Desktop systems for Multan businesses', href: '/locations/multan' },
      { label: 'FBR POS integration overview', href: '/blog/fbr-pos-integration' },
    ],
  },
  {
    path: '/services/pos-software',
    pageType: 'service',
    title: 'POS Software Pakistan | AS Digital Solutions',
    metaDescription:
      'POS software for Pakistan retail and trading counters: barcode billing, udhaar, receipts, and offline options. Built and supported by AS Digital Solutions.',
    h1: 'POS software that keeps your counter moving',
    primaryKeyword: 'POS software Pakistan',
    secondaryKeywords: [
      'point of sale software Punjab',
      'barcode POS Chishtian',
      'retail billing software',
      'offline POS Pakistan',
    ],
    serviceName: 'POS Software',
    priceMin: 'REPLACE_150000',
    priceMax: 'REPLACE_400000',
    intro:
      'Point-of-sale software should shorten queues, capture every SKU correctly, and feed clean numbers into your books. AS Digital Solutions delivers POS systems for Pakistan retailers—including garments shops like Usman Mall—with barcode checkout, credit sales, and optional full accounting behind the till.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'What a serious POS setup covers',
        paragraphs: [
          'Billing is the visible tip. Underneath you need product and variant definitions, stock decrements, tax fields when applicable, cashier permissions, and printable receipts customers recognise. Returns and exchanges must adjust both stock and money without spreadsheet surgery at night.',
          'In local retail, udhaar (customer credit) is not optional. A POS that only does cash ignores how many shops actually sell. We track running balances, partial payments, and clear statements so disputes drop.',
          'For owners who want one system instead of “POS plus separate accounting,” we post sales, purchases, and expenses into double-entry ledgers automatically—patterns proven in our desktop retail builds.',
        ],
      },
      {
        type: 'list',
        heading: 'POS capabilities we implement',
        items: [
          'Scanner-driven checkout with Code128 or similar label workflows',
          'Size/colour or other variant stock for fashion and similar retail',
          'Receipt and invoice printing tuned to your printer and paper',
          'Customer credit, layaway-style partial payments, and history',
          'Shift-friendly reports: daily sales, top items, low stock',
          'Offline-first operation for unreliable shop internet',
          'Roadmap discussion for FBR-related compliance when you are ready',
        ],
      },
      {
        type: 'steps',
        heading: 'From demo to daily use',
        steps: [
          {
            title: 'Catalogue and hardware prep',
            body: 'We help structure products, import spreadsheets where possible, and verify scanner/printer pairs before staff training day.',
          },
          {
            title: 'Staff rehearsal',
            body: 'Cashiers practise common baskets, returns, and credit sales. Owners practise voids and approvals so surprises happen in rehearsal, not at 7pm Saturday.',
          },
          {
            title: 'Go-live support',
            body: 'Early days include quick WhatsApp responses for edge cases. We tune label sizes and receipt layouts once real paper is in the printer.',
          },
        ],
      },
      {
        type: 'paragraphs',
        heading: 'POS versus generic billing apps',
        paragraphs: [
          'Phone-only billing apps can help micro sellers, but growing shops hit walls on variants, permissions, and accounting. Purpose-built POS on a counter PC remains the practical standard for garment stores, general stores graduating from registers, and specialty retailers who print barcodes.',
          'Read our POS software price guide for budgeting context, then contact us for a discovery-based quote. Typical market estimates vary widely once accounting and multi-store enter the picture.',
        ],
      },
      {
        type: 'cta',
        heading: 'Book a POS discovery call',
        body: 'Call 03220726006 or email contactasdigitalsolutions@gmail.com with your product count, whether you use barcodes today, and your city. We will suggest a phase-one POS scope that matches how you sell.',
      },
    ],
    faqs: [
      {
        question: 'Do I need barcodes on day one?',
        answer:
          'Not always. Some shops start with search-and-click billing while labels are printed in batches. Barcodes dramatically speed peak hours, so we usually plan a labelling sprint early. We can generate Code128 labels sized for your roll when that is part of scope.',
      },
      {
        question: 'Can POS handle wholesale and retail prices?',
        answer:
          'Yes, when priced into the design. Price lists, customer-specific rates, or carton versus piece selling need clear rules. Tell us how you quote today and we will model it rather than forcing a single MRP field that fights your margins.',
      },
      {
        question: 'Will this work without internet?',
        answer:
          'Our common retail deployments are offline-first on the till machine. Internet may be used for backups or future sync, but a downed connection should not freeze billing. That requirement is explicit in discovery for every shop floor project we accept.',
      },
      {
        question: 'What about FBR POS integration?',
        answer:
          'Requirements evolve and depend on your taxpayer profile. We discuss FBR-related planning honestly, including what software can and cannot automate. See our FBR POS article for orientation, then confirm current obligations with your tax advisor alongside any technical work.',
      },
    ],
    related: [
      { label: 'POS software price in Pakistan', href: '/blog/pos-software-price-pakistan' },
      { label: 'Inventory software deep dive', href: '/services/inventory-software' },
      { label: 'Retail industry focus', href: '/industries/retail' },
      { label: 'POS and software in Haroonabad', href: '/locations/haroonabad' },
    ],
  },
  {
    path: '/services/inventory-software',
    pageType: 'service',
    title: 'Inventory Software Pakistan | AS Digital Solutions',
    metaDescription:
      'Inventory software for Pakistan shops and traders: variants, transfers, low-stock alerts, and stock ledgers. Offline-capable systems from AS Digital.',
    h1: 'Inventory software for accurate stock and fewer surprises',
    primaryKeyword: 'inventory software Pakistan',
    secondaryKeywords: [
      'stock management software',
      'inventory system Punjab',
      'warehouse stock tracking',
      'product variant inventory',
    ],
    serviceName: 'Inventory Software',
    priceMin: 'REPLACE_120000',
    priceMax: 'REPLACE_450000',
    intro:
      'Inventory software only helps when it matches how you receive, store, and sell goods. AS Digital Solutions builds stock systems for retail variants, multi-store transfers, and trade product ledgers—so owners see real availability instead of guessing from memory or a dusty notebook.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'Stock problems we solve',
        paragraphs: [
          'Selling an item that is already gone, over-ordering slow movers, and losing margin to theft or unrecorded staff sales all trace back to weak inventory control. Spreadsheets break when two people edit at once or when variants explode across sizes and colours.',
          'Our retail systems track variants, receive purchases against suppliers, adjust stock with reasons, and reflect POS sales instantly on the same database. For grain and commodity contexts, product-linked maal khata style ledgers keep quantity and value visible without mixing them into the wrong reports.',
          'Good inventory practice also needs process: who can approve write-offs, how returns re-enter stock, and when physical counts happen. Software encodes those rules so they survive busy seasons.',
        ],
      },
      {
        type: 'list',
        heading: 'Inventory features commonly included',
        items: [
          'Opening balances and controlled stock adjustments',
          'Purchase receiving and supplier-linked costs',
          'Low-stock views for reorder decisions',
          'Transfers between stores or godowns when in scope',
          'Bulk Excel import for initial catalogue load',
          'Integration with POS billing so sales decrement live',
          'Reporting that separates quantity movement from accounting noise',
        ],
      },
      {
        type: 'steps',
        heading: 'Implementation pattern',
        steps: [
          {
            title: 'Catalogue cleanup',
            body: 'Duplicate names and unclear units are fixed before go-live. This step alone often reveals dead stock and naming chaos worth solving.',
          },
          {
            title: 'Count and opening balance',
            body: 'A physical count seeds the system. We schedule it when the shop can pause long enough for accuracy—usually a quieter weekday window.',
          },
          {
            title: 'Operate and reconcile',
            body: 'Weekly exception reports catch negative stock or missing receipts early. Habits form faster when owners glance at exceptions, not only month-end drama.',
          },
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Inventory plus accounting',
        paragraphs: [
          'Some clients only need quantities. Others need weighted-average cost and gross profit per invoice. We clarify that boundary early because valuation logic is where amateur tools quietly lie. Our stronger desktop builds calculate cost properly so profit is not a guess.',
          'If you run agriculture trading, pharmacy, or multi-branch retail, bring samples of how you name products today. The data model must respect your language—bori, strip, SKU, or batch—rather than forcing a generic unit that staff ignore.',
        ],
      },
      {
        type: 'cta',
        heading: 'Get stock under control',
        body: 'WhatsApp 03220726006 with a photo of your current stock sheet, or email contactasdigitalsolutions@gmail.com. We will outline whether POS-integrated inventory or a standalone stock module fits better.',
      },
    ],
    faqs: [
      {
        question: 'Can you import my Excel product list?',
        answer:
          'Usually yes, after we map columns and clean duplicates. Imports fail when the sheet mixes units or variants in one cell. We provide a simple template when needed so your team can prepare data without guessing our database fields.',
      },
      {
        question: 'Do you support batch or expiry tracking?',
        answer:
          'Batch and expiry matter most for pharmacy and some food trades. If that is required, we scope it explicitly—it changes receiving and sale flows. For fashion retail, size/colour variants are typically enough and keep screens faster for cashiers.',
      },
      {
        question: 'How do stock transfers work between locations?',
        answer:
          'Transfers are modelled as outbound and inbound movements with optional in-transit states when multi-store is in scope. Single-shop deployments skip that complexity. Be honest about whether a second godown is real today or only aspirational next year.',
      },
      {
        question: 'Will inventory work offline?',
        answer:
          'In our desktop deployments, yes—the stock ledger lives with the local database. Pure cloud inventory needs reliable internet; we will not recommend it for counters that already lose connectivity during storms or peak evening loads.',
      },
    ],
    related: [
      { label: 'POS software that updates stock live', href: '/services/pos-software' },
      { label: 'Pharmacy industry inventory needs', href: '/industries/pharmacy' },
      { label: 'Agriculture trading systems', href: '/industries/agriculture' },
      { label: 'Inventory-aware software in Hasilpur', href: '/locations/hasilpur' },
    ],
  },
  {
    path: '/services/school-management-system',
    pageType: 'service',
    title: 'School Management System | AS Digital Solutions',
    metaDescription:
      'School management system development for Pakistan campuses: admissions, fees, attendance, and parent communication. Practical modules from AS Digital.',
    h1: 'School management system modules that staff will actually use',
    primaryKeyword: 'school management system',
    secondaryKeywords: [
      'SMS school software Pakistan',
      'fee management system',
      'student information system Punjab',
      'school ERP Chishtian',
    ],
    serviceName: 'School Management System',
    priceMin: 'REPLACE_200000',
    priceMax: 'REPLACE_600000',
    intro:
      'A school management system should reduce office queues, clarify fee status, and give principals trustworthy numbers—not add another login nobody opens. AS Digital Solutions designs phased school software for Pakistan institutions that need admissions, student records, fee collection, attendance, and parent updates without enterprise bloat.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'Start with the office pain, not a 40-module brochure',
        paragraphs: [
          'Most schools already have some mix of registers, Excel fee sheets, and WhatsApp groups. Digitization fails when vendors dump every module at once. We prioritise the bottleneck: usually fee tracking or admissions paperwork, then expand to attendance and academic records.',
          'Serve & Lead Society shows how education-adjacent organisations also need clear web communication for programmes and opportunities. Campus admin systems go deeper into secure student data, role separation between accounts and academic staff, and year-rollover processes that must not erase history.',
          'Connectivity varies by campus. Some offices can run cloud tools; others need local servers or hybrid approaches. We recommend architecture based on IT reality, not a sales slide.',
        ],
      },
      {
        type: 'list',
        heading: 'Modules commonly phased in',
        items: [
          'Student profiles, classes, and academic year structure',
          'Fee challans, concessions, and payment recording',
          'Attendance capture with teacher-friendly UI',
          'Staff roles and permission boundaries',
          'SMS or WhatsApp notification hooks where approved',
          'Basic report cards or result sheets when in scope',
          'Exportable reports for board or trust requirements',
        ],
      },
      {
        type: 'steps',
        heading: 'Rollout without disrupting term time',
        steps: [
          {
            title: 'Process workshops with office staff',
            body: 'We document how challans are issued today, including exceptions for siblings and staff children. Edge cases become test cases.',
          },
          {
            title: 'Pilot one class or one fee cycle',
            body: 'A controlled pilot proves the system before whole-campus cutover. Parallel runs catch rounding and concession mistakes early.',
          },
          {
            title: 'Train, then expand modules',
            body: 'Attendance or academics unlock after fees feel stable. Change fatigue drops when wins are visible in the accounts office first.',
          },
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Privacy and trust',
        paragraphs: [
          'Student data deserves careful access control. We avoid shared passwords on sticky notes by designing sensible roles and encouraging campus policy around device access. Backups and year-end archives are planned before exam season chaos.',
          'If you only need a public website for admissions marketing, start with web development and add management modules later. Not every school needs a full ERP in year one.',
        ],
      },
      {
        type: 'cta',
        heading: 'Map your campus modules',
        body: 'Email contactasdigitalsolutions@gmail.com with campus size and current fee process, or call 03220726006. We will propose a phase-one school management scope with a typical market estimate band.',
      },
    ],
    faqs: [
      {
        question: 'Can parents pay fees online?',
        answer:
          'Online fee collection is possible when payment gateways and reconciliation processes are ready. Many schools still collect cash or bank challans and only digitise ledgers first. We sequence online payments as a deliberate phase so accounts staff are not reconciling three channels on week one of term.',
      },
      {
        question: 'Do you replace our existing WhatsApp parent groups?',
        answer:
          'Not necessarily. Some campuses keep WhatsApp for community chatter and use the system for official fee and attendance notices. Automated messages need approved templates and clear ownership so parents are not spammed from multiple unofficial numbers.',
      },
      {
        question: 'Is this suitable for academies and tuition centres?',
        answer:
          'Yes, with a lighter module set: enrolments, batches, and fee follow-ups often matter more than full timetable ERPs. Tell us your academic model and we will strip unused complexity instead of selling a university-sized suite.',
      },
      {
        question: 'How long before staff stop using paper?',
        answer:
          'Expect a transition period measured in weeks, not a single weekend. Success depends on principal sponsorship and removing duplicate paper incentives. We help design a cutover date for specific processes so “temporary” registers do not become permanent shadows.',
      },
    ],
    related: [
      { label: 'Education industry solutions', href: '/industries/education' },
      { label: 'WhatsApp automation for notices', href: '/services/whatsapp-automation' },
      { label: 'Websites for school visibility', href: '/services/web-development' },
      { label: 'Software services in Bahawalnagar', href: '/locations/bahawalnagar' },
    ],
  },
  {
    path: '/services/ecommerce-development',
    pageType: 'service',
    title: 'Ecommerce Development Pakistan | AS Digital',
    metaDescription:
      'Ecommerce development in Pakistan: catalog sites, checkout, and payment-ready storefronts. AS Digital Solutions builds shops that convert on mobile.',
    h1: 'Ecommerce development for catalogs that actually sell',
    primaryKeyword: 'ecommerce development Pakistan',
    secondaryKeywords: [
      'online store development',
      'ecommerce website Punjab',
      'payment ready storefront',
      'product catalog website',
    ],
    serviceName: 'Ecommerce Development',
    priceMin: 'REPLACE_120000',
    priceMax: 'REPLACE_350000',
    intro:
      'Ecommerce development is more than adding a cart button. AS Digital Solutions builds Pakistan-friendly storefronts—product discovery, clear shipping expectations, mobile checkout paths, and payment options buyers trust—whether you are an EV parts dealer like Crown EV Center or a brand ready to take orders online.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'Storefronts matched to how Pakistanis buy',
        paragraphs: [
          'Many customers still complete purchases via WhatsApp after browsing. A smart ecommerce build can support formal checkout and assisted sales: click-to-chat on product pages, clear stock messaging, and admin tools that do not confuse non-technical staff.',
          'We plan catalogue structure, filters, and product detail content so Google and humans both understand what is for sale. Photos, specs, and shipping notes reduce repetitive questions that eat owner time.',
          'Payment gateway choices—including JazzCash and other local options—should follow your bank readiness and order volume. See our payment and JazzCash guides for orientation before you promise checkout dates publicly.',
        ],
      },
      {
        type: 'list',
        heading: 'Ecommerce building blocks',
        items: [
          'Product categories, variants, and searchable catalogues',
          'Cart and checkout flows tested on mobile',
          'Order status views for store admins',
          'Coupons or simple promotions when needed',
          'Integration planning for payments and notifications',
          'SEO-friendly product URLs and metadata',
          'Optional booking or service add-ons beside physical goods',
        ],
      },
      {
        type: 'steps',
        heading: 'Launch path',
        steps: [
          {
            title: 'Catalogue and policy decisions',
            body: 'Returns, delivery areas, and cash-on-delivery rules are written before coding payment UI. Ambiguous policies create chargebacks and angry chats.',
          },
          {
            title: 'Build and sandbox payments',
            body: 'Test orders prove that stock, emails/WhatsApp alerts, and payment states behave. We never treat the first live customer as the first test.',
          },
          {
            title: 'Operate and iterate',
            body: 'Post-launch we refine filters, speed, and merchandising based on what people search and abandon. Ecommerce is a living system, not a one-day unveil.',
          },
        ],
      },
      {
        type: 'paragraphs',
        heading: 'When not to force full ecommerce',
        paragraphs: [
          'If you have twenty products and sell only inside one city via riders, a strong brochure site plus WhatsApp ordering may outperform a fragile cart. We will say so. Full ecommerce earns its keep with larger catalogues, wider delivery geography, or brand positioning that needs self-serve checkout.',
          'Inventory sync with offline POS is a specialised integration—plan it deliberately if your warehouse and website must stay aligned.',
        ],
      },
      {
        type: 'cta',
        heading: 'Plan your online store',
        body: 'Call 03220726006 or email contactasdigitalsolutions@gmail.com with approximate SKU count and delivery cities. We will recommend ecommerce versus catalogue-plus-WhatsApp and share a discovery-based estimate.',
      },
    ],
    faqs: [
      {
        question: 'Which payment methods can you integrate?',
        answer:
          'We plan integrations based on gateways your business can actually activate with banks or providers. JazzCash and other local methods are common discussion points. Legal and merchant account setup remains your responsibility; we handle the technical connection and testing once credentials exist.',
      },
      {
        question: 'Can I manage products myself after launch?',
        answer:
          'Yes—admin UX is part of scope. We train your team on adding products, updating prices, and marking items unavailable. If nobody on staff will own merchandising, we should shrink catalogue ambition or budget for content assistance.',
      },
      {
        question: 'Do you build on Shopify, WooCommerce, or custom?',
        answer:
          'Platform choice follows catalogue size, budget, and customisation needs. We discuss trade-offs openly: speed to launch versus long-term flexibility. The right answer is the one your team can operate, not the trendiest stack on social media.',
      },
      {
        question: 'How do shipping charges work?',
        answer:
          'We can implement flat rates, city-based rates, or manual quotes depending on your courier reality. Over-automating fragile shipping rules causes checkout errors. Many Pakistan stores start simple and refine after seeing real destination patterns.',
      },
    ],
    related: [
      { label: 'Online payment gateway guide', href: '/blog/online-payment-gateway-pakistan' },
      { label: 'JazzCash integration overview', href: '/blog/jazzcash-integration-guide' },
      { label: 'Web development foundations', href: '/services/web-development' },
      { label: 'Ecommerce-ready sites in Multan', href: '/locations/multan' },
    ],
  },
  {
    path: '/services/ai-solutions',
    pageType: 'service',
    title: 'AI Solutions for Business | AS Digital Solutions',
    metaDescription:
      'Practical AI solutions for Pakistan businesses: assistants, document help, and workflow automation without hype. AS Digital Solutions focuses on.',
    h1: 'AI solutions that support real decisions and workflows',
    primaryKeyword: 'AI solutions for business',
    secondaryKeywords: [
      'practical AI Pakistan',
      'business automation AI',
      'ML integration Punjab',
      'AI tools for SMEs',
    ],
    serviceName: 'AI Solutions',
    priceMin: 'REPLACE_50000',
    priceMax: 'REPLACE_300000',
    intro:
      'AI is useful when it removes repetitive work or surfaces insights humans miss—not when it is a buzzword on a proposal. AS Digital Solutions delivers practical AI solutions for Pakistan SMEs: grounded use-case discovery, careful integration into existing websites or internal tools, and monitoring so quality does not silently decay.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'Where AI helps small and mid-size teams',
        paragraphs: [
          'Strong candidates include drafting first-pass replies to common customer questions, classifying incoming leads, summarising long internal notes, and assisting staff with document search across policies. Weak candidates include unsupervised decisions over money, inventory write-offs, or academic grading without human review.',
          'We start with a narrow workflow: one inbox, one FAQ set, one report type. That keeps costs predictable and makes success measurable—time saved per day, deflection rate, or faster first response—rather than vague “innovation” goals.',
          'Data privacy matters. We discuss what leaves your premises, what stays local, and how customer information is handled before any model is wired into production chat.',
        ],
      },
      {
        type: 'list',
        heading: 'Engagement patterns',
        items: [
          'Use-case workshops with clear success metrics',
          'Prototype on a limited dataset or scripted dialogues',
          'Integration into web apps, admin tools, or WhatsApp flows',
          'Guardrails: human approval for sensitive actions',
          'Logging and review samples to catch drift',
          'Staff training so AI remains an assistant, not a mystery box',
        ],
      },
      {
        type: 'steps',
        heading: 'Responsible delivery steps',
        steps: [
          {
            title: 'Problem framing',
            body: 'We write the user story and the failure modes. If a wrong answer could harm a patient, student, or financial ledger, we redesign for human confirmation.',
          },
          {
            title: 'Pilot with measurement',
            body: 'A two-to-four-week pilot compares baseline handling time against assisted handling. Kill criteria are agreed in advance so sunk-cost bias does not prolong weak experiments.',
          },
          {
            title: 'Production hardening',
            body: 'Rate limits, fallbacks when the model is down, and escalation to humans are implemented before wide staff rollout.',
          },
        ],
      },
      {
        type: 'paragraphs',
        heading: 'AI beside traditional software',
        paragraphs: [
          'Most businesses still need solid POS, inventory, or websites first. AI sits on top of clean data. We will not recommend an ambitious model project while your stock counts are fiction. Sequencing protects budget.',
          'When AI is not the right tool, we say so and point you to automation via deterministic rules or WhatsApp workflows that are cheaper and more reliable.',
        ],
      },
      {
        type: 'cta',
        heading: 'Propose one painful repetitive task',
        body: 'Message 03220726006 with the task, volume per week, and tools you already use. Email contactasdigitalsolutions@gmail.com for longer contexts. We will assess AI fit versus simpler automation.',
      },
    ],
    faqs: [
      {
        question: 'Do we need a data science team to benefit?',
        answer:
          'No. Many SME wins come from carefully integrated hosted models with retrieval over your own FAQs or documents. You still need someone internally who owns content quality—outdated price lists will produce outdated answers regardless of model brand.',
      },
      {
        question: 'Will AI replace our support staff?',
        answer:
          'Our designs aim to remove repetitive load so staff handle exceptions and high-value conversations. Full replacement is rarely realistic or desirable for local businesses where relationships matter. Think augmentation with clear escalation paths.',
      },
      {
        question: 'How do you price AI work?',
        answer:
          'Typical market estimates depend on prototype depth, integrations, and ongoing model usage fees from providers. We separate build cost from variable usage cost so finance teams see both. Schema may use REPLACE_ placeholders until scope is signed.',
      },
      {
        question: 'Can AI connect to our WhatsApp business number?',
        answer:
          'Often yes, through approved business APIs and automation patterns. Compliance with platform policies is mandatory. We combine WhatsApp automation services with AI only when intent detection or drafting clearly improves response quality.',
      },
    ],
    related: [
      { label: 'WhatsApp automation services', href: '/services/whatsapp-automation' },
      { label: 'Custom software foundations', href: '/services/custom-software' },
      { label: 'Digital marketing and analytics', href: '/services/digital-marketing' },
      { label: 'About how we approach projects', href: '/about' },
    ],
  },
  {
    path: '/services/whatsapp-automation',
    pageType: 'service',
    title: 'WhatsApp Automation Pakistan | AS Digital',
    metaDescription:
      'WhatsApp automation for Pakistan businesses: enquiry routing, catalogues, and orderly alerts. AS Digital Solutions designs flows staff can supervise.',
    h1: 'WhatsApp automation that respects how customers already chat',
    primaryKeyword: 'WhatsApp automation Pakistan',
    secondaryKeywords: [
      'WhatsApp Business automation',
      'chatbot WhatsApp Punjab',
      'order alerts WhatsApp',
      'WhatsApp CRM flows',
    ],
    serviceName: 'WhatsApp Automation',
    priceMin: 'REPLACE_50000',
    priceMax: 'REPLACE_200000',
    intro:
      'In Pakistan, WhatsApp is often the real front desk. AS Digital Solutions designs WhatsApp automation that greets customers, captures intent, shares catalogues or fee instructions, and routes hot leads to humans—without trapping people in endless bot loops.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'Automation with a human exit',
        paragraphs: [
          'Good WhatsApp automation answers the repetitive 60%—timings, location pins, price lists, document checklists—so your team focuses on negotiation and exceptions. Bad automation blocks the “talk to someone” path and damages trust faster than having no bot at all.',
          'We map message types: new lead, existing customer, after-hours, and complaint. Each path gets a tone and escalation rule. Official WhatsApp Business platform constraints (templates, opt-in, quality rating) are part of planning, not ignored until an account is restricted.',
          'Automation can notify staff when a website form arrives, remind parents about fees, or confirm appointments. It can also sit beside ecommerce for order status notes when policies allow.',
        ],
      },
      {
        type: 'list',
        heading: 'Common automation building blocks',
        items: [
          'Greeting and menu flows in English and Urdu as needed',
          'Lead capture fields that sync to a sheet or CRM',
          'Catalogue or PDF sharing for products and prospectuses',
          'After-hours auto-replies with clear reopen times',
          'Handover to a named sales or support inbox',
          'Internal alerts for high-intent keywords',
          'Optional AI drafting with mandatory human send for sensitive topics',
        ],
      },
      {
        type: 'steps',
        heading: 'How we implement',
        steps: [
          {
            title: 'Channel and compliance review',
            body: 'We confirm number type, existing label quality, and whether official APIs or lighter Business App workflows fit your volume and risk tolerance.',
          },
          {
            title: 'Flow design and scripting',
            body: 'Scripts are written in plain language your customers use. You approve tone before anything goes live on the customer-facing number.',
          },
          {
            title: 'Monitor and tune',
            body: 'Early weeks reveal unanswered intents. We adjust menus and training so the bot shrinks frustration instead of creating it.',
          },
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Fit for local industries',
        paragraphs: [
          'Retailers share size charts and booking slots; educators share admission steps; real-estate teams qualify suburb and budget before a call; clinics share timing and document lists carefully. Each industry needs different safeguards.',
          'If your volume is low, a well-pinned message and disciplined human replies may beat a bot. We recommend automation when repetition is measurable.',
        ],
      },
      {
        type: 'cta',
        heading: 'Audit your WhatsApp inbox',
        body: 'Forward three anonymised example chats to us on 03220726006 or summarise patterns by email at contactasdigitalsolutions@gmail.com. We will propose an automation level that matches your staffing.',
      },
    ],
    faqs: [
      {
        question: 'Do I need the WhatsApp Business API?',
        answer:
          'Not always. Smaller volumes can improve with Business App discipline and simple tools. Higher volume, template messages, or multi-agent inboxes often justify official API setups. We recommend based on message count and compliance needs rather than upselling the heaviest option first.',
      },
      {
        question: 'Can automation send promotional broadcasts?',
        answer:
          'Promotional messaging must follow WhatsApp rules and user opt-in expectations. We design for service and utility messages first. Broadcast strategy, when appropriate, is planned carefully to protect your number’s quality rating and brand reputation.',
      },
      {
        question: 'Will customers know they are talking to a bot?',
        answer:
          'We favour honest labelling and quick human handover. Pretending to be human collapses trust when the bot inevitably misunderstands. Clear menus and a visible “talk to agent” choice perform better in local markets.',
      },
      {
        question: 'How soon can a basic flow go live?',
        answer:
          'Simple greeting and routing flows can be ready within days once access and copy are approved. Rich catalogue or payment-linked flows take longer. Timeline risk usually sits in account verification and internal decision-making, not raw coding hours.',
      },
    ],
    related: [
      { label: 'AI solutions for smarter replies', href: '/services/ai-solutions' },
      { label: 'Digital marketing that fills the inbox', href: '/services/digital-marketing' },
      { label: 'Contact our team on WhatsApp topics', href: '/contact' },
      { label: 'Small business website plus chat', href: '/blog/website-for-small-business-pakistan' },
    ],
  },
  {
    path: '/services/digital-marketing',
    pageType: 'service',
    title: 'Digital Marketing Punjab | AS Digital Solutions',
    metaDescription:
      'Digital marketing for Punjab businesses: SEO foundations, local visibility, and campaign support tied to real websites. Practical growth help from AS.',
    h1: 'Digital marketing grounded in your website and offers',
    primaryKeyword: 'digital marketing Punjab',
    secondaryKeywords: [
      'SEO services Chishtian',
      'local Google visibility',
      'small business marketing Pakistan',
      'performance content marketing',
    ],
    serviceName: 'Digital Marketing',
    priceMin: 'REPLACE_30000',
    priceMax: 'REPLACE_200000',
    intro:
      'Digital marketing only pays off when the landing experience is trustworthy and the offer is clear. AS Digital Solutions helps Punjab businesses improve SEO foundations, local discovery, and campaign readiness—always tied to websites and WhatsApp conversion paths we can measure.',
    sections: [
      {
        type: 'paragraphs',
        heading: 'Marketing without vanity metrics',
        paragraphs: [
          'We care about calls, WhatsApp chats, form fills, and store visits—not raw impressions alone. That means fixing title tags, speed, and confusing navigation before pouring budget into ads. A slow or unclear site taxes every rupee you spend.',
          'Local SEO matters for Chishtian, Bahawalnagar, Bahawalpur, and nearby cities: consistent name/address/phone data, relevant location pages that are genuinely unique, and content that answers real search questions. Doorway-style duplicate pages are avoided because they fail users and search engines alike.',
          'Content work includes service explainers and guides like those on our blog—costs, payments, domains, FBR orientation—so your brand shows expertise before the sales call.',
        ],
      },
      {
        type: 'list',
        heading: 'Services we commonly provide',
        items: [
          'Technical and on-page SEO audits with prioritised fixes',
          'Keyword mapping to pages you can actually support',
          'Google Business Profile guidance for local firms',
          'Landing page improvements for ad traffic',
          'Basic analytics and conversion event setup',
          'Content outlines and publishing support',
          'Coordination with web builds so marketing is not an afterthought',
        ],
      },
      {
        type: 'steps',
        heading: 'Engagement flow',
        steps: [
          {
            title: 'Baseline and goals',
            body: 'We capture current rankings, analytics access, and the two or three offers that deserve attention this quarter.',
          },
          {
            title: 'Fix and publish',
            body: 'High-impact site fixes ship first. New pages or posts follow a calendar realistic for your reviewers.',
          },
          {
            title: 'Review monthly',
            body: 'Reports emphasise enquiries and learnings. Budgets shift toward what produces conversations, not what looks busy.',
          },
        ],
      },
      {
        type: 'paragraphs',
        heading: 'Ads and organic together',
        paragraphs: [
          'Paid campaigns can fill the top of the funnel while SEO compounds. We help ensure tracking and landing pages are ready before spend scales. If you already run ads with another partner, we can still harden the site they send traffic to.',
          'Industries we often support include retail, education, real estate, pharmacy visibility, and agriculture-related services—each with different seasonality and compliance sensitivity.',
        ],
      },
      {
        type: 'cta',
        heading: 'Align marketing with a site that converts',
        body: 'Call 03220726006 or email contactasdigitalsolutions@gmail.com with your city and current website URL. We will suggest a practical SEO or campaign-readiness plan with typical market estimate guidance.',
      },
    ],
    faqs: [
      {
        question: 'Do you guarantee first-page rankings?',
        answer:
          'No ethical provider can guarantee rankings. We commit to sound technical work, relevant content, and transparent reporting. Search competition, history, and off-site factors vary. Guarantees are a red flag—steady improvement and better conversion are the honest goals.',
      },
      {
        question: 'How fast can SEO show results?',
        answer:
          'Some technical fixes help crawl and usability quickly. Competitive keywords can take months. Local queries in smaller cities sometimes move faster than national head terms. We set expectations by keyword difficulty during onboarding rather than promising overnight miracles.',
      },
      {
        question: 'Can you manage Facebook or Google ads?',
        answer:
          'We can support landing pages, conversion tracking, and campaign structure guidance. Hands-on media buying can be scoped when it fits. If you already have an ads specialist, collaboration often beats replacing them mid-funnel.',
      },
      {
        question: 'Is digital marketing useful without a website?',
        answer:
          'You can generate chats from social profiles alone, but a credible site improves trust and SEO capture. Many engagements begin with a lean website plus marketing foundations. We will not push a giant content program onto a one-page placeholder that cannot convert.',
      },
    ],
    related: [
      { label: 'Web development for better landings', href: '/services/web-development' },
      { label: 'Register a .pk domain guide', href: '/blog/register-pk-domain' },
      { label: 'Marketing-friendly presence in Bahawalpur', href: '/locations/bahawalpur' },
      { label: 'Real estate industry visibility', href: '/industries/real-estate' },
    ],
  },
]
