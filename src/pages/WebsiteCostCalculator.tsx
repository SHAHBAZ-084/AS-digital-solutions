import { useMemo, useState } from 'react'
import Seo from '../components/seo/Seo'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import CTAButton from '../components/ui/CTAButton'
import { getWhatsAppUrl, siteConfig, toWhatsAppDigits } from '../config/site'
import { useSiteData } from '../context/SiteDataContext'
import { buildPageJsonLd } from '../content/schema'
import { getPageByPath } from '../content/registry'

const PAGE_PATH = '/tools/website-cost-calculator'

export default function WebsiteCostCalculator() {
  const page = getPageByPath(PAGE_PATH)
  const { contact } = useSiteData()
  const [pages, setPages] = useState(5)
  const [kind, setKind] = useState<'brochure' | 'business' | 'ecommerce' | 'custom'>('business')
  const [cms, setCms] = useState(false)
  const [payments, setPayments] = useState(false)

  const estimate = useMemo(() => {
    const base = { brochure: 35000, business: 75000, ecommerce: 150000, custom: 220000 }[kind]
    const pageCost = Math.max(0, pages - 5) * 8000
    const extras = (cms ? 25000 : 0) + (payments ? 40000 : 0)
    const low = base + pageCost + extras
    const high = Math.round(low * 1.55)
    return { low, high }
  }, [pages, kind, cms, payments])

  const jsonLd = page
    ? buildPageJsonLd(page, [
        { name: 'Home', path: '/' },
        { name: 'Tools', path: '/tools/website-cost-calculator' },
        { name: page.h1 },
      ])
    : null

  const wa = getWhatsAppUrl(
    `Hi AS Digital Solutions, my calculator estimate is PKR ${estimate.low.toLocaleString()}–${estimate.high.toLocaleString()}. I'd like a real quote.`,
    toWhatsAppDigits(contact.whatsapp_number),
  )

  if (!page) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20">
        <Seo title="Calculator | AS Digital" path={PAGE_PATH} noindex />
        <h1>Calculator unavailable</h1>
      </section>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <Seo
        title={page.title}
        description={page.metaDescription}
        path={page.path}
        jsonLd={jsonLd}
      />
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Tools' },
          { name: 'Website cost calculator' },
        ]}
      />
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{page.h1}</h1>
      <p className="mt-5 text-base leading-relaxed text-text-muted">{page.intro}</p>

      <form
        className="mt-10 space-y-6 border border-border bg-bg-secondary/40 p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block text-sm font-semibold text-navy">
          Website type
          <select
            className="mt-2 w-full border border-border bg-white px-3 py-2 text-sm font-normal"
            value={kind}
            onChange={(e) => setKind(e.target.value as typeof kind)}
          >
            <option value="brochure">Brochure / portfolio</option>
            <option value="business">Business site</option>
            <option value="ecommerce">Ecommerce store</option>
            <option value="custom">Custom web app</option>
          </select>
        </label>

        <label className="block text-sm font-semibold text-navy">
          Approximate page count: {pages}
          <input
            type="range"
            min={1}
            max={30}
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            className="mt-2 w-full"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-navy">
          <input type="checkbox" checked={cms} onChange={(e) => setCms(e.target.checked)} />
          Editable content / CMS
        </label>
        <label className="flex items-center gap-2 text-sm text-navy">
          <input
            type="checkbox"
            checked={payments}
            onChange={(e) => setPayments(e.target.checked)}
          />
          Online payments (JazzCash / card gateway)
        </label>

        <div className="border border-accent/30 bg-white px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Rough estimate (PKR)
          </p>
          <p className="mt-2 text-2xl font-extrabold text-navy">
            {estimate.low.toLocaleString()} – {estimate.high.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-text-muted">
            Indicative only — not a fixed package. Final pricing follows discovery. Street-level
            address and formal packages: REPLACE_ after you confirm.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <CTAButton href={wa} variant="whatsapp" label="Send estimate on WhatsApp" external />
          <CTAButton href="/contact" variant="secondary" label="Request a real quote" />
          <CTAButton
            href={`tel:+92${siteConfig.phone.replace(/\D/g, '').replace(/^0/, '')}`}
            label={`Call ${siteConfig.phone}`}
          />
        </div>
      </form>

      {page.sections.map((section) => {
        if (section.type !== 'paragraphs') return null
        return (
          <section key={section.heading} className="mt-12">
            <h2 className="text-xl font-bold text-navy">{section.heading}</h2>
            <div className="mt-4 space-y-3 text-text-muted">
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </section>
        )
      })}
    </article>
  )
}
