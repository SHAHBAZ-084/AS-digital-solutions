import { siteConfig } from '../../config/site'
import CTAButton from '../ui/CTAButton'
import EditableText from '../ui/EditableText'
import HeroParallaxBg from '../ui/HeroParallaxBg'
import HeroParticles from '../ui/HeroParticles'

const accentDefault = 'Digital Solutions'
/** Public URL: preloaded in index.html for LCP (stable path, not hashed). */
const heroSkyline = '/hero-lcp.webp'

export default function Hero() {
  const eyebrow = (
    <EditableText
      contentKey="hero.eyebrow"
      as="p"
      className="text-section-eyebrow animate-hero-item text-xs font-semibold tracking-[0.28em] uppercase"
      style={{ animationDelay: '40ms' }}
    >
      {siteConfig.eyebrow}
    </EditableText>
  )

  const headline = (
    <>
      <EditableText contentKey="hero.headline.lead">We Build</EditableText>{' '}
      <span className="text-accent">{accentDefault}</span>{' '}
      <EditableText contentKey="hero.headline.tail">That Grow Businesses</EditableText>
    </>
  )

  const subhead = (
    <EditableText
      contentKey="hero.subhead"
      as="p"
      className="text-section-muted animate-hero-item mt-5 max-w-lg text-base leading-relaxed sm:text-lg"
      style={{ animationDelay: '160ms' }}
    >
      Empowering startups, businesses, and entrepreneurs with technology that delivers real results:
      websites, products, and software built to look modern and perform in the market.
    </EditableText>
  )

  const actions = (
    <div className="animate-hero-item mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '220ms' }}>
      <CTAButton label="Start Your Project" href="#contact" />
      <CTAButton label="Explore Our Work" href="#projects" variant="secondary" />
    </div>
  )

  return (
    <section
      id="hero"
      className="section-light relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-center overflow-hidden bg-bg-primary"
    >
      <HeroParallaxBg src={heroSkyline} width={1280} height={536} />
      <HeroParticles />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,127,232,0.08),transparent_40%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 lg:py-20">
        {eyebrow}
        <h1
          className="text-section animate-hero-item mt-4 max-w-xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[3.35rem]"
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
