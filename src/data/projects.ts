import { getPlaceholderForType, type ProjectType } from '../lib/projectPlaceholders'
import citynestServicesImg from '../assets/projects/citynest-services.webp'
import crownEvImg from '../assets/projects/crown-ev.webp'
import serveAndLeadImg from '../assets/projects/serve-and-lead.webp'
import sherazTradersImg from '../assets/projects/sheraz-traders.webp'
import usmanMallImg from '../assets/projects/usman-mall.webp'
import sufiCoImg from '../assets/projects/sufi-co.webp'

export type { ProjectType }

export interface Project {
  slug: string
  name: string
  industry: string
  type: ProjectType
  description: string
  overview: string
  client: string
  challenge: string
  solution: string
  keyFeatures: string[]
  technology: string[]
  screenshots: string[]
  results: string[]
  liveUrl?: string
  sections?: { id: string; title: string; body: string; bullets: string[] }[]
  enabledBlocks?: string[]
}

export { getPlaceholderForType }

export const projects: Project[] = [
  {
    slug: 'crown-ev-center', name: 'Crown EV Center', industry: 'Automotive / E-Mobility', type: 'Web', description:
      "E-commerce and dealership platform for Pakistan's trusted Crown electric bike dealer.", overview:
      'A digital storefront and service hub for Crown EV Center, allowing customers to browse electric bikes and genuine parts online, book service appointments at their nearest branch, and find showroom locations in Chishtian and Bahawalnagar.', client: 'Crown EV Center', challenge:
      'Placeholder: describe the business problem before this went live (e.g. no online presence, manual service bookings, limited reach beyond physical showrooms).', solution:
      'Placeholder: describe what was actually built (e.g. product catalog, online parts ordering, service booking flow, showroom locator).', keyFeatures: [
      'Online catalog for EV bikes and genuine parts', 'E-commerce shop with online ordering and order tracking', 'Service appointment booking by branch', 'Showroom locator (Chishtian & Bahawalnagar)', ], technology: [], screenshots: [crownEvImg], results: [], liveUrl: 'https://crownevcenter.com', }, {
    slug: 'citynest-services', name: 'CityNestServices', industry: 'Real Estate / Property Management', type: 'Web', description:
      'Property rental and management platform serving landlords and investors across Brisbane and the Gold Coast.', overview:
      'A property management website connecting landlords and investors with rental, management, and maintenance services across Brisbane and the Gold Coast, Australia.', client: 'CityNestServices', challenge:
      'Placeholder: describe the business problem (e.g. needed a professional web presence to attract landlord/investor clients, streamline property listings or inquiries).', solution:
      'Placeholder: describe what was built (e.g. property listings, inquiry/contact flow, service breakdown pages for rentals/management/maintenance).', keyFeatures: [
      'Property management services showcase', 'Rental listings for landlords and investors', 'Maintenance request/service information', ], technology: [], screenshots: [citynestServicesImg], results: [], liveUrl: 'https://citynestservices.com.au', }, {
    slug: 'serve-and-lead-society', name: 'Serve & Lead Society (SLS)', industry: 'Non-Profit / Education', type: 'Web', description:
      'A community platform for a student-led non-profit building leaders through service, career counseling, and internships.', overview:
      'A website for Serve & Lead Society (SLS), a non-profit organization serving students from all colleges and universities across Punjab, Pakistan, focused on student welfare, career counseling, and internship opportunities.', client: 'Serve & Lead Society', challenge:
      'Placeholder: describe the need (e.g. no central platform for students to find programs, apply for internships, or learn about SLS initiatives).', solution:
      'Placeholder: describe what was built (e.g. program/initiative pages, internship listings, event or membership info, contact/application flow).', keyFeatures: [
      'Career counseling and student welfare information', 'Internship opportunities for students', 'Serving students across Punjab, Pakistan', ], technology: [], screenshots: [serveAndLeadImg], results: [], liveUrl: 'https://serveandlead.org', }, {
    slug: 'sheraz-traders-desktop', name: 'Sheraz Traders', industry: 'Agriculture & Commodity Trading (Grain Market / Mandi)', type: 'Desktop', description:
      'A desktop accounting and inventory system built for a grain market trading business, handling double-entry bookkeeping, invoicing, and stock tracking fully offline.', overview:
      'Sheraz Traders is a Windows desktop application built for a grain market (mandi) trading business in Chishtian, Pakistan. It replaces manual ledger books with a full double-entry accounting system tailored to how grain traders actually work, including a specialized settlement workflow for buying raw grain from farmers (market fee, brokery, and commission deductions calculated automatically). Both the shop owner and clerk staff use it daily to record sales, purchases, and payments.', client: 'Sheraz Traders (Grain Market, Chishtian)', challenge:
      "The business ran on manual ledger books with no digital records, no reliable way to calculate actual profit per sale (cost basis was tracked by memory/estimate, not a real average), no offline-safe backup of financial records, and no way to separate what a staff clerk could post to the books versus what needed the owner's approval.", solution:
      'A fully offline-first Electron desktop app with its own local database, built around real double-entry bookkeeping: Ledger, Trial Balance, and Profit & Loss reports, plus a purpose-built "Kachi Maal" invoice type for the farmer-settlement workflow (auto-calculating market fee, brokery, and commission), automatic weighted-average cost tracking so profit per sale is calculated correctly rather than estimated, and a pending-approval queue so clerk-entered transactions require owner sign-off before posting to the books.', keyFeatures: [
      'Fully offline desktop app with a local SQLite database: no internet required for daily use', 'Real double-entry accounting: Ledger, Trial Balance, Profit & Loss, Account Balance reports', 'Automatic weighted-average cost calculation for accurate per-invoice profit', 'Specialized grain-market settlement invoice (market fee, brokery, commission auto-calculated)', 'Role-based access with an owner-approval workflow for clerk-submitted vouchers and invoices', 'Automated daily cloud backup to Google Drive, plus local database integrity checks', 'Multi-store stock tracking with transfers and stock adjustments', "Printable invoices/bills with the business's own letterhead", ], technology: [
      'Electron', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma ORM', 'SQLite (WAL mode)', 'Google Drive API', 'NSIS (Windows installer)', ], screenshots: [sherazTradersImg], results: [
      'In daily use by the shop owner and clerk staff for live business operations', 'Replaced manual ledger books with a fully digital, offline-first bookkeeping workflow', ], }, {
    slug: 'usman-mall-desktop', name: 'Usman Mall', industry: 'Retail (Garments / Clothing Shop)', type: 'Desktop', description:
      'A desktop POS and accounting system built for a garments retail shop, handling barcode-based billing, product/variant inventory, and double-entry bookkeeping fully offline.', overview:
      'Usman Mall is a Windows desktop application built for a single garment shop, replacing manual registers with a proper point-of-sale and accounting system. It handles day-to-day billing with barcode scanning, tracks stock down to size/colour variants, manages customer credit (udhaar), and posts every sale, purchase, return, and expense straight into a real double-entry ledger, all running fully offline on one machine.', client: 'Usman Mall (Garments Retail Shop)', challenge:
      "The shop had no barcode-based checkout, no reliable per-variant stock tracking (sizes/colours), no way to track customer credit (udhaar) separately from cash sales, and no integration between day-to-day billing and the shop's books: sales and accounting were disconnected.", solution:
      "A fully offline-first Electron desktop app with its own local SQLite database, combining POS billing with real double-entry accounting under the hood. Every sale, purchase, return, exchange, or expense automatically posts a balanced accounting voucher and ledger entry: no manual bookkeeping step required. Built-in Code128 barcode label generation and printing (custom label size and printable-area tuning for the shop's specific label roll) drives fast checkout via barcode scanner.", keyFeatures: [
      'Fully offline desktop app with a local SQLite database: no internet required for daily use', 'Barcode system: Code128 label generation/printing plus scanner-driven POS checkout', 'Product & variant inventory (size/colour) with stock tracking and bulk Excel import', 'POS and billing with printable invoices/receipts', 'Returns and exchanges (good/damaged returns, item exchanges with balance adjustment)', 'Customers and udhaar (credit sales, partial payments, running balances)', 'Purchases and supplier management with payables tracking', 'Real double-entry accounting: chart of accounts, ledger, trial balance, vouchers, auto-posted from every sale/purchase/return/expense', 'Local backup with disk-space checks (no cloud dependency)', 'Dashboard with shop KPIs (sales, stock, udhaar)', ], technology: [
      'Electron', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma ORM', 'SQLite', 'XLSX (bulk import)', 'NSIS (Windows installer)', ], screenshots: [usmanMallImg], results: [
      'In daily use for live shop operations', 'Replaced manual billing and register-keeping with barcode-driven POS and automatic bookkeeping', ], }, {
    slug: 'sufi-co-grain-market-desktop', name: 'Sufi & Co Grain Market', industry: 'Agriculture / Grain Trading (Commission & Wholesale)', type: 'Desktop', description:
      'A desktop POS and accounting system built for a grain commission and wholesale trading business, handling multi-type invoicing (sale on commission, sale on paunch, purchase, kachi maal) with full double-entry bookkeeping fully offline.', overview:
      "Sufi & Co Grain Market is a Windows desktop application built for a grain trading and commission business, replacing manual bahi-khata registers with a structured POS and accounting system. It handles multiple grain-trade-specific invoice types (sale on commission, sale on paunch, purchase to maal, kachi maal), tracks per-product inventory ledgers (maal khata) with opening balances, manages party accounts across internal/external/sale-party categories, and posts every voucher and invoice straight into a real double-entry ledger, all running fully offline on one machine, with labels in the trade's native mixed English/Urdu terminology.", client: 'Sufi & Co (Grain Market Commission Agents)', challenge:
      'The business ran on manual registers with no structured way to record grain-trade-specific transactions like sale on commission (paunch/bardana deductions, dami, dalali, munshiana) versus straight purchase or sale, no per-product inventory ledger, no consistent party categorization (internal staff, external parties, sale parties), and no reliable way to track opening balances or produce a trial balance without manual reconciliation.', solution:
      "A fully offline-first Electron desktop app with its own local SQLite database, purpose-built around real grain-market invoice types rather than generic retail billing. Every invoice (sale on commission, sale on paunch, purchase to maal, or kachi maal) automatically calculates trade-specific deductions (bardana, kanta, dharan, kaat, bhartii, bilty kiraya) and posts a balanced accounting voucher and ledger entry behind the scenes. Products auto-generate their own maal khata (inventory ledger) on creation, with an optional opening balance that seeds the ledger without polluting vouchers, invoices, or other reports, visible only where it belongs, in the trial balance and that product's own ledger. Field labels mix English and native Urdu script for the terms staff actually use day to day.", keyFeatures: [
      'Fully offline desktop app with a local SQLite database: no internet required for daily use',
      'Four grain-trade invoice types: Sale on Commission, Sale on Paunch, Purchase to Maal, and Kachi Maal, each with its own calculation logic',
      'Trade-specific deductions and charges built into invoices: bardana, kanta, dharan, kaat, bhartii, munshiana, dami, dalali, mazduri, market fee, bilty kiraya',
      'Card-based navigation: flat sidebar (Dashboard, Vouchers, Invoices, Accounts, Products, Reports, System) with clickable card grids for sub-actions instead of nested menus',
      'Vouchers: Payment, Journal, and Receipt vouchers with a unified voucher view',
      "Product-linked maal khata: every product auto-creates its own inventory ledger, with an optional opening balance (debit/credit) that only appears in that product's ledger and the trial balance, never in vouchers, invoices, or other reports",
      'Unified party/account selection across Internal, External, and Sale Party categories on all invoices, with product-locked account selection where appropriate',
      'Full ledger and trial balance reporting with colour-coded balances: green for credit, red for debit, including the closing balance row',
      'One-click database backup: user picks a destination folder and triggers a timestamped backup copy of the live database',
      'Mixed-language UI: trade jargon (jins, tafseel, bori/thela, dharan, kanta, bardana, dalali, munshiana) shown in native Urdu script, while core fields (date, invoice #, party, amounts) stay in English',
      'Dashboard with business KPIs',
    ], technology: [
      'Electron', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma ORM', 'SQLite', 'NSIS (Windows installer)',
    ], screenshots: [sufiCoImg], results: [
      'In active development for live grain-market business operations',
      'Replaced manual bahi-khata registers with structured, trade-specific invoicing and automatic double-entry bookkeeping',
    ], },
]
