import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { SeoContentPage } from '../content/types'
import { buildPageJsonLd } from '../content/schema'
import { breadcrumbsForPage } from '../lib/contentBreadcrumbs'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import Seo from '../components/seo/Seo'
import CTAButton from '../components/ui/CTAButton'
import Reveal from '../components/ui/Reveal'
import { MotionSection } from '../components/bits/BlurText'
import { getWhatsAppUrl, siteConfig, toWhatsAppDigits } from '../config/site'
import { useSiteData } from '../context/SiteDataContext'
import { easeOutExpo } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const cardHover =
  'border border-line bg-bg-secondary/60 transition-[border-color,transform] duration-150 hover:border-canal hover:-translate-y-px'

function SectionBlock({
  heading,
  children,
  delay = 0,
}: {
  heading: string
  children: ReactNode
  delay?: number
}) {
  return (
    <MotionSection delay={delay} className="mt-12">
      <h2 className="font-display text-section text-xl sm:text-2xl">{heading}</h2>
      <div className="mt-2 h-px w-12 bg-line" />
      <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-text-muted">{children}</div>
    </MotionSection>
  )
}

export default function ContentPageView({ page }: { page: SeoContentPage }) {
  const { contact } = useSiteData()
  const reduced = useReducedMotion()
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
      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <Reveal>
          <Breadcrumbs items={crumbs} />
        </Reveal>
        <motion.p
          className="text-sm font-medium text-accent"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
        >
          {page.primaryKeyword}
        </motion.p>
        <h1 className="font-display mt-3 text-3xl text-navy sm:text-4xl">{page.h1}</h1>
        <MotionSection delay={0.08}>
          <p className="prose-measure mt-5 text-base leading-relaxed text-text-muted sm:text-lg">
            {page.intro}
          </p>
        </MotionSection>

        {page.hubLinks && page.hubLinks.length > 0 ? (
          <nav className="mt-10" aria-label="Page links">
            <ul className="grid gap-3 sm:grid-cols-2">
              {page.hubLinks.map((link, i) => (
                <Reveal key={link.href} delayMs={i * 40}>
                  <Link
                    to={link.href}
                    className={`block px-4 py-3 text-sm font-semibold text-navy ${cardHover}`}
                  >
                    {link.label}
                  </Link>
                </Reveal>
              ))}
            </ul>
          </nav>
        ) : null}

        {page.sections.map((section, idx) => {
          const delay = Math.min(idx * 0.04, 0.2)
          if (section.type === 'paragraphs') {
            return (
              <SectionBlock key={section.heading} heading={section.heading} delay={delay}>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </SectionBlock>
            )
          }
          if (section.type === 'list') {
            return (
              <SectionBlock key={section.heading} heading={section.heading} delay={delay}>
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
              <SectionBlock key={section.heading} heading={section.heading} delay={delay}>
                <ol className="space-y-4">
                  {section.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="num flex h-7 w-7 shrink-0 items-center justify-center bg-navy text-xs font-bold text-white">
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
              <SectionBlock key={section.heading} heading={section.heading} delay={delay}>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                <ul className="mt-2 space-y-3">
                  {section.ranges.map((range) => (
                    <li key={range.label} className={`px-4 py-3 ${cardHover}`}>
                      <p className="font-semibold text-navy">{range.label}</p>
                      <p className="num mt-1 text-brass">{range.range}</p>
                      {range.note ? <p className="mt-1 text-sm">{range.note}</p> : null}
                    </li>
                  ))}
                </ul>
              </SectionBlock>
            )
          }
          return (
            <SectionBlock key={section.heading} heading={section.heading} delay={delay}>
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
          <MotionSection className="mt-12" delay={0.05}>
            <section id="faq">
              <h2 className="font-display text-section text-xl sm:text-2xl">FAQs</h2>
              <div className="mt-2 h-px w-12 bg-line" />
              <div className="mt-6 space-y-5">
                {page.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-base font-semibold text-navy">{faq.question}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-text-muted">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </MotionSection>
        ) : null}

        {page.related.length > 0 ? (
          <MotionSection className="mt-14 border-t border-line pt-8">
            <h2 className="text-lg font-semibold text-navy">Keep exploring</h2>
            <ul className="mt-4 space-y-2">
              {page.related.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-accent hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </MotionSection>
        ) : null}
      </div>
    </article>
  )
}
