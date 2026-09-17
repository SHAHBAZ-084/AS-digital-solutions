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
import BlurText, { MotionSection } from '../components/bits/BlurText'
import SpotlightCard from '../components/bits/SpotlightCard'
import TiltedSurface from '../components/bits/TiltedSurface'
import { getWhatsAppUrl, siteConfig, toWhatsAppDigits } from '../config/site'
import { useSiteData } from '../context/SiteDataContext'
import { easeOutExpo } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

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
      <h2 className="text-section text-xl font-bold tracking-tight sm:text-2xl">{heading}</h2>
      <motion.div
        className="mt-2 h-1 w-10 origin-left bg-navy"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: easeOutExpo, delay: delay + 0.05 }}
      />
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
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(30,127,232,0.1),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <Reveal>
          <Breadcrumbs items={crumbs} />
        </Reveal>
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.22em] text-accent"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOutExpo }}
        >
          {page.primaryKeyword}
        </motion.p>
        <BlurText
          as="h1"
          text={page.h1}
          className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl"
          delay={0.06}
        />
        <MotionSection delay={0.12}>
          <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">{page.intro}</p>
        </MotionSection>

        {page.hubLinks && page.hubLinks.length > 0 ? (
          <nav className="mt-10" aria-label="Page links">
            <ul className="grid gap-3 sm:grid-cols-2">
              {page.hubLinks.map((link, i) => (
                <Reveal key={link.href} delayMs={i * 45}>
                  <TiltedSurface rotateAmplitude={8} scaleOnHover={1.02}>
                    <SpotlightCard className="border border-border bg-bg-secondary/60">
                      <Link
                        to={link.href}
                        className="block px-4 py-3 text-sm font-semibold text-navy transition hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </SpotlightCard>
                  </TiltedSurface>
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
                  {section.items.map((item, i) => (
                    <motion.li
                      key={item.slice(0, 48)}
                      initial={reduced ? false : { opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.35, ease: easeOutExpo }}
                    >
                      {item}
                    </motion.li>
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
                    <motion.li
                      key={step.title}
                      className="flex gap-3"
                      initial={reduced ? false : { opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.4, ease: easeOutExpo }}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-navy text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-navy">{step.title}</p>
                        <p className="mt-1">{step.body}</p>
                      </div>
                    </motion.li>
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
                  {section.ranges.map((range, i) => (
                    <Reveal key={range.label} delayMs={i * 50}>
                      <TiltedSurface rotateAmplitude={5} scaleOnHover={1.015}>
                        <SpotlightCard className="border border-border bg-bg-secondary/50 px-4 py-3">
                          <p className="font-semibold text-navy">{range.label}</p>
                          <p className="mt-1 text-accent">{range.range}</p>
                          {range.note ? <p className="mt-1 text-sm">{range.note}</p> : null}
                        </SpotlightCard>
                      </TiltedSurface>
                    </Reveal>
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
              <h2 className="text-section text-xl font-bold tracking-tight sm:text-2xl">FAQs</h2>
              <div className="mt-2 h-1 w-10 bg-navy" />
              <div className="mt-6 space-y-5">
                {page.faqs.map((faq, i) => (
                  <Reveal key={faq.question} delayMs={i * 40}>
                    <div>
                      <h3 className="text-base font-semibold text-navy">{faq.question}</h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-text-muted">{faq.answer}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          </MotionSection>
        ) : null}

        {page.related.length > 0 ? (
          <MotionSection className="mt-14 border-t border-border pt-8">
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
          </MotionSection>
        ) : null}
      </div>
    </article>
  )
}
