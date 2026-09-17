import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { SeoContentPage } from '../content/types'
import { buildPageJsonLd } from '../content/schema'
import { breadcrumbsForPage } from '../lib/contentBreadcrumbs'
import Breadcrumbs from '../components/seo/Breadcrumbs'
import Seo from '../components/seo/Seo'
import CTAButton from '../components/ui/CTAButton'
import BlurText, { MotionSection } from '../components/bits/BlurText'
import FloatingOrbs from '../components/bits/FloatingOrbs'
import ServicesHero3D from '../components/bits/ServicesHero3D'
import SpotlightCard from '../components/bits/SpotlightCard'
import TiltedSurface from '../components/bits/TiltedSurface'
import StaggerGrid from '../components/ui/StaggerGrid'
import Reveal from '../components/ui/Reveal'
import { getWhatsAppUrl, siteConfig, toWhatsAppDigits } from '../config/site'
import { useSiteData } from '../context/SiteDataContext'
import { fadeUp, staggerContainer, easeOutExpo } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const SERVICE_BLURBS: Record<string, string> = {
  '/services/web-development': 'Fast sites that convert on Pakistani mobile networks.',
  '/services/custom-software': 'Workflows built around how your team already works.',
  '/services/desktop-apps': 'Offline-first Windows tools for shops and mandis.',
  '/services/pos-software': 'Barcode billing, udhaar, and balanced books.',
  '/services/inventory-software': 'Stock truth with alerts—not spreadsheet guesswork.',
  '/services/school-management-system': 'Fees, classes, and parent-ready communication.',
  '/services/ecommerce-development': 'Catalogue stores ready for wallets and COD.',
  '/services/ai-solutions': 'Assistants that cut repetitive questions.',
  '/services/whatsapp-automation': 'Structured chat that does not lose leads.',
  '/services/digital-marketing': 'Landing pages and tracking that make ads work.',
}

function ServiceGlyph({ index }: { index: number }) {
  const paths = [
    'M4 7h16M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z',
    'M4 20V9l8-5 8 5v11M9 20v-6h6v6',
    'M4 12a8 8 0 0 1 16 0M12 16v4M9 21h6',
    'M4 7h16v10H4zM8 17v3M16 17v3M9 11h6',
    'M4 6h16M4 12h16M4 18h10',
    'M4 19V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12M8 10h8M8 14h5',
    'M6 6h12v12H6zM9 9h6v6H9z',
    'M12 4v3M12 17v3M4 12h3M17 12h3M9 9h6v6H9z',
    'M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z',
    'M4 12h16M12 4v16',
  ]
  const d = paths[index % paths.length]
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ServicesHub({ page }: { page: SeoContentPage }) {
  const { contact } = useSiteData()
  const reduced = useReducedMotion()
  const crumbs = breadcrumbsForPage(page)
  const jsonLd = buildPageJsonLd(page, crumbs)
  const wa = getWhatsAppUrl(undefined, toWhatsAppDigits(contact.whatsapp_number))
  const links = page.hubLinks ?? []

  return (
    <article className="relative overflow-hidden bg-bg-primary">
      <Seo
        title={page.title}
        description={page.metaDescription}
        path={page.path}
        jsonLd={jsonLd}
      />
      <FloatingOrbs />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <MotionSection>
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Services' },
            ]}
          />
        </MotionSection>

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:gap-8">
          <div className="max-w-2xl">
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
              className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
              delay={0.08}
            />
            <MotionSection delay={0.15}>
              <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">{page.intro}</p>
            </MotionSection>
          </div>

          <motion.div
            className="relative"
            initial={reduced ? false : { opacity: 0, scale: 0.92, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
          >
            <ServicesHero3D />
          </motion.div>
        </div>

        <StaggerGrid className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {links.map((link, index) => (
            <Reveal key={link.href} staggerChild className="h-full">
              <TiltedSurface className="h-full" rotateAmplitude={10} scaleOnHover={1.025}>
                <SpotlightCard className="h-full border border-border bg-bg-secondary/70 transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_20px_50px_-28px_rgba(10,14,26,0.35)]">
                  <Link
                    to={link.href}
                    className="group flex h-full flex-col p-5 sm:p-6"
                    style={{ transform: 'translateZ(24px)' }}
                  >
                    <span className="flex h-11 w-11 items-center justify-center bg-navy text-white transition group-hover:bg-accent">
                      <ServiceGlyph index={index} />
                    </span>
                    <span className="mt-4 text-base font-bold tracking-tight text-navy group-hover:text-accent">
                      {link.label}
                    </span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                      {SERVICE_BLURBS[link.href] ?? 'Explore deliverables, process, and fit.'}
                    </span>
                    <span className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                      View service →
                    </span>
                  </Link>
                </SpotlightCard>
              </TiltedSurface>
            </Reveal>
          ))}
        </StaggerGrid>

        {page.sections.map((section, sIdx) => {
          if (section.type === 'paragraphs') {
            return (
              <MotionSection key={section.heading} delay={0.05 * sIdx} className="mt-16 max-w-3xl">
                <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">{section.heading}</h2>
                <div className="mt-2 h-1 w-10 bg-navy" />
                <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-text-muted">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </MotionSection>
            )
          }
          if (section.type === 'cta') {
            return (
              <MotionSection key={section.heading} className="mt-16">
                <TiltedSurface rotateAmplitude={6} scaleOnHover={1.01}>
                  <SpotlightCard
                    className="border border-border bg-navy px-6 py-8 text-white sm:px-10"
                    spotlightColor="rgba(30, 127, 232, 0.35)"
                  >
                    <h2 className="text-xl font-bold sm:text-2xl">{section.heading}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                      {section.body}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <CTAButton href={wa} variant="whatsapp" label="WhatsApp" external />
                      <CTAButton
                        href={`tel:+92${siteConfig.phone.replace(/\D/g, '').replace(/^0/, '')}`}
                        label={`Call ${siteConfig.phone}`}
                      />
                      <CTAButton href="/contact" variant="secondary" label="Project brief" />
                    </div>
                  </SpotlightCard>
                </TiltedSurface>
              </MotionSection>
            )
          }
          return null
        })}

        {page.related.length > 0 ? (
          <MotionSection className="mt-16 border-t border-border pt-10">
            <h2 className="text-lg font-bold text-navy">Keep exploring</h2>
            <motion.ul
              className="mt-4 grid gap-2 sm:grid-cols-2"
              variants={reduced ? undefined : staggerContainer}
              initial={reduced ? undefined : 'hidden'}
              whileInView={reduced ? undefined : 'show'}
              viewport={{ once: true }}
            >
              {page.related.map((link) => (
                <motion.li key={link.href} variants={reduced ? undefined : fadeUp}>
                  <Link to={link.href} className="text-accent transition hover:underline">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </MotionSection>
        ) : null}
      </div>
    </article>
  )
}
