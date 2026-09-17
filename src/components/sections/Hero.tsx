import { siteConfig, getWhatsAppUrl } from '../../config/site'
import { projects } from '../../data/projects'
import BlurText from '../bits/BlurText'
import LedgerStack3D from '../bits/LedgerStack3D'
import CTAButton from '../ui/CTAButton'
import EditableText from '../ui/EditableText'

/**
 * Phase 3: Part 4 copy + LedgerStack3D spectacle. No skyline / particles.
 * BlurText on home h1 only. EditableText keys preserved.
 */
export default function Hero() {
  const projectCount = projects.length
  const whatsappHref = getWhatsAppUrl()

  return (
    <section
      id="hero"
      className="section-light relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-center overflow-hidden bg-bg-primary"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,color-mix(in_srgb,var(--canal)_12%,transparent),transparent_46%),linear-gradient(165deg,var(--cotton)_0%,#e8eae3_55%,var(--cotton)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_70%_40%,color-mix(in_srgb,var(--ink)_6%,transparent),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-6 xl:col-span-7">
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
          {/* CMS key for the h1 string (BlurText owns the visible nodes). */}
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

        <div
          className="animate-hero-item lg:col-span-6 xl:col-span-5"
          style={{ animationDelay: '180ms' }}
        >
          <LedgerStack3D />
        </div>
      </div>
    </section>
  )
}
