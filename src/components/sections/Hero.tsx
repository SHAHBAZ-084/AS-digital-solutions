import { siteConfig, getWhatsAppUrl } from '../../config/site'
import { projects } from '../../data/projects'
import BlurText from '../bits/BlurText'
import CTAButton from '../ui/CTAButton'
import EditableText from '../ui/EditableText'
import HeroParallaxBg from '../ui/HeroParallaxBg'

/** Public URL: preloaded in index.html for LCP (stable path, not hashed). */
const heroBuilding = '/hero-lcp.webp'

/**
 * Home hero — building PNG full-bleed + Part 4 copy.
 * LedgerStack3D removed per brand preference.
 */
export default function Hero() {
  const projectCount = projects.length
  const whatsappHref = getWhatsAppUrl()

  return (
    <section
      id="hero"
      className="section-light relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-center overflow-hidden bg-bg-primary"
    >
      <HeroParallaxBg src={heroBuilding} width={1280} height={536} />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,127,232,0.08),transparent_40%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 lg:py-20">
        <EditableText
          contentKey="hero.brand"
          as="p"
          className="font-display text-section animate-hero-item text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ animationDelay: '40ms' }}
        >
          {siteConfig.companyName}
        </EditableText>

        <h1
          className="font-display text-section animate-hero-item mt-5 max-w-xl text-[2.05rem] leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.05rem]"
          style={{ animationDelay: '100ms' }}
        >
          <BlurText
            text="Software for businesses that still run on paper."
            className="font-display"
            delay={0.08}
          />
        </h1>
        <span className="sr-only">
          <EditableText contentKey="hero.headline">
            Software for businesses that still run on paper.
          </EditableText>
        </span>

        <EditableText
          contentKey="hero.subhead"
          as="p"
          className="text-section-muted animate-hero-item prose-measure mt-5 text-base leading-relaxed sm:text-lg"
          style={{ animationDelay: '160ms' }}
        >
          We build websites, billing systems and POS software in Chishtian — for shops, schools,
          mills and distributors across Pakistan.
        </EditableText>

        <div
          className="animate-hero-item mt-8 flex flex-wrap items-center gap-3"
          style={{ animationDelay: '220ms' }}
        >
          <CTAButton label="See our work" href="#projects" labelKey="hero.cta.primary" />
          <CTAButton
            label="Message us on WhatsApp"
            href={whatsappHref}
            variant="whatsapp"
            external
            labelKey="hero.cta.secondary"
          />
        </div>

        <p
          className="animate-hero-item mt-6 text-sm text-slate"
          style={{ animationDelay: '280ms' }}
        >
          <EditableText contentKey="hero.proof">
            {`${projectCount} projects delivered · Chishtian, Punjab`}
          </EditableText>
        </p>
      </div>
    </section>
  )
}
