import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { SeoContentPage } from '../content/types'
import { buildPageJsonLd } from '../content/schema'
import { breadcrumbsForPage } from '../lib/contentBreadcrumbs'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import Seo from '../components/seo/Seo'
import CTAButton from '../components/ui/CTAButton'
import { getWhatsAppUrl, siteConfig, toWhatsAppDigits } from '../config/site'
import { useSiteData } from '../context/SiteDataContext'

function SectionBlock({
  heading,
  children,
}: {
  heading: string
  children: ReactNode
}) {
  return (
    <section className="mt-12">
      <h2 className="text-section text-xl font-bold tracking-tight sm:text-2xl">{heading}</h2>
      <div className="mt-2 h-1 w-10 bg-navy" />
      <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-text-muted">{children}</div>
    </section>
  )
}

export default function ContentPageView({ page }: { page: SeoContentPage }) {
  const { contact } = useSiteData()
  const crumbs = breadcrumbsForPage(page)
  const jsonLd = buildPageJsonLd(page, crumbs)
  const wa = getWhatsAppUrl(undefined, toWhatsAppDigits(contact.whatsapp_number))

  return (
    <article className="relative overflow-hidden bg-bg-primary">
      <Seo
        title={page.title}
        description={page.metaDescription}
        path={page.path}
        jsonLd={jsonLd}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(30,127,232,0.1),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <Breadcrumbs items={crumbs} />
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {page.primaryKeyword}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
          {page.h1}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">{page.intro}</p>

        {page.hubLinks && page.hubLinks.length > 0 ? (
          <nav className="mt-10" aria-label="Page links">
            <ul className="grid gap-3 sm:grid-cols-2">
              {page.hubLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="block border border-border bg-bg-secondary/60 px-4 py-3 text-sm font-semibold text-navy transition hover:border-accent hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {page.sections.map((section) => {
          if (section.type === 'paragraphs') {
            return (
              <SectionBlock key={section.heading} heading={section.heading}>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </SectionBlock>
            )
          }
          if (section.type === 'list') {
            return (
              <SectionBlock key={section.heading} heading={section.heading}>
                {section.intro ? <p>{section.intro}</p> : null}
                <ul className="list-disc space-y-2 pl-5">
                  {section.items.map((item) => (
                    <li key={item.slice(0, 48)}>{item}</li>
                  ))}
                </ul>
              </SectionBlock>
            )
          }
          if (section.type === 'steps') {
            return (
              <SectionBlock key={section.heading} heading={section.heading}>
                <ol className="space-y-4">
                  {section.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-navy text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-navy">{step.title}</p>
                        <p className="mt-1">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </SectionBlock>
            )
          }
          if (section.type === 'pricing') {
            return (
              <SectionBlock key={section.heading} heading={section.heading}>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                <ul className="mt-2 space-y-3">
                  {section.ranges.map((range) => (
                    <li
                      key={range.label}
                      className="border border-border bg-bg-secondary/50 px-4 py-3"
                    >
                      <p className="font-semibold text-navy">{range.label}</p>
                      <p className="mt-1 text-accent">{range.range}</p>
                      {range.note ? <p className="mt-1 text-sm">{range.note}</p> : null}
                    </li>
                  ))}
                </ul>
              </SectionBlock>
            )
          }
          return (
            <SectionBlock key={section.heading} heading={section.heading}>
              <p>{section.body}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <CTAButton href={wa} variant="whatsapp" label="WhatsApp" external />
                <CTAButton
                  href={`tel:+92${siteConfig.phone.replace(/\D/g, '').replace(/^0/, '')}`}
                  label={`Call ${siteConfig.phone}`}
                />
                <CTAButton href="/contact" variant="secondary" label="Project brief" />
              </div>
            </SectionBlock>
          )
        })}

        {page.faqs.length > 0 ? (
          <section className="mt-12" id="faq">
            <h2 className="text-section text-xl font-bold tracking-tight sm:text-2xl">FAQs</h2>
            <div className="mt-2 h-1 w-10 bg-navy" />
            <div className="mt-6 space-y-5">
              {page.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-base font-semibold text-navy">{faq.question}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {page.related.length > 0 ? (
          <aside className="mt-14 border-t border-border pt-8">
            <h2 className="text-lg font-bold text-navy">Keep exploring</h2>
            <ul className="mt-4 space-y-2">
              {page.related.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-accent hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </article>
  )
}
