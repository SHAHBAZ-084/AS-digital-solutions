import { siteConfig } from '../../config/site'
import CTAButton from '../ui/CTAButton'
import EditableText from '../ui/EditableText'
import HeroParallaxBg from '../ui/HeroParallaxBg'

/** Public URL: preloaded in index.html for LCP (stable path, not hashed). */
const heroSkyline = '/hero-lcp.webp'

/**
 * Phase 2: remove AI tells (uppercase eyebrow, colored phrase accent, particles).
 * Phase 3 will rebuild layout + LedgerStack3D + Part 4 copy.
 */
export default function Hero() {
  const kicker = (
    <EditableText
      contentKey="hero.eyebrow"
      as="p"
      className="text-section-eyebrow animate-hero-item text-sm font-medium"
      style={{ animationDelay: '40ms' }}
    >
      {siteConfig.eyebrow}
    </EditableText>
  )

  const headline = (
    <>
      <EditableText contentKey="hero.headline.lead">We Build</EditableText>{' '}
      <EditableText contentKey="hero.headline.mid">Digital Solutions</EditableText>{' '}
      <EditableText contentKey="hero.headline.tail">That Grow Businesses</EditableText>
    </>
  )

  const subhead = (
    <EditableText
      contentKey="hero.subhead"
      as="p"
      className="text-section-muted animate-hero-item prose-measure mt-5 text-base leading-relaxed sm:text-lg"
      style={{ animationDelay: '160ms' }}
    >
      Empowering startups, businesses, and entrepreneurs from Chishtian and across Pakistan with
      technology that delivers real results: websites, products, and software built to look modern
      and perform in the market.
    </EditableText>
  )

  const actions = (
    <div
      className="animate-hero-item mt-8 flex flex-wrap items-center gap-3"
      style={{ animationDelay: '220ms' }}
    >
      <CTAButton label="See our work" href="#projects" labelKey="hero.cta.primary" />
      <CTAButton
        label="Message us on WhatsApp"
        href="#contact"
        variant="secondary"
        labelKey="hero.cta.secondary"
      />
    </div>
  )

  return (
    <section
      id="hero"
      className="section-light relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-center overflow-hidden bg-bg-primary"
    >
      <HeroParallaxBg src={heroSkyline} width={1280} height={536} />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--canal)_10%,transparent),transparent_42%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 lg:py-20">
        {kicker}
        <h1
          className="font-display text-section animate-hero-item mt-4 max-w-2xl text-4xl sm:text-5xl lg:text-[3.35rem]"
          style={{ animationDelay: '100ms' }}
        >
          {headline}
        </h1>
        {subhead}
        {actions}
      </div>
    </section>
  )
}
