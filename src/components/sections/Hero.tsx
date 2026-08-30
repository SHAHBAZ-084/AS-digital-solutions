import { getWhatsAppUrl, siteConfig, toWhatsAppDigits } from '../../config/site'
import { useSiteData } from '../../context/SiteDataContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import CTAButton from '../ui/CTAButton'
import EditableText from '../ui/EditableText'
import HeroParticles from '../ui/HeroParticles'
import TypingText from '../ui/TypingText'
import heroSkyline from '../../assets/brand/hero-skyline.png'

const stagger = ['0ms', '120ms', '260ms', '400ms', '540ms', '660ms']
const accentDefault = 'Digital Solutions'

export default function Hero() {
  const reduced = useReducedMotion()
  const { contact } = useSiteData()

  const itemClass = reduced ? '' : 'animate-hero-item opacity-0'

  return (
    <section
      id="hero"
      className="section-light relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-center overflow-hidden bg-bg-primary"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          src={heroSkyline}
          alt=""
          className="h-full w-full object-cover object-[70%_top]"
        />
        {/* Heavy shade on the text side, clear skyline on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-white/90 via-[36%] to-transparent to-[70%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8fe] from-0% via-[#f4f8fe]/55 via-[26%] to-transparent to-[55%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-white/15" />
      </div>
      <HeroParticles />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,127,232,0.08),transparent_40%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 lg:py-20">
        <EditableText
          contentKey="hero.eyebrow"
          as="p"
          className={`text-section-eyebrow text-xs font-semibold tracking-[0.28em] uppercase ${itemClass}`}
          style={{ animationDelay: stagger[0] }}
        >
          {siteConfig.eyebrow}
        </EditableText>
        <h1
          className={`text-section mt-4 max-w-xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[3.35rem] ${itemClass}`}
          style={{ animationDelay: stagger[1] }}
        >
          <EditableText contentKey="hero.headline.lead">We Build</EditableText>{' '}
          <span className="text-accent">
            <TypingText text={accentDefault} />
          </span>{' '}
          <EditableText contentKey="hero.headline.tail">That Grow Businesses</EditableText>
        </h1>
        <EditableText
          contentKey="hero.subhead"
          as="p"
          className={`text-section-muted mt-5 max-w-lg text-base leading-relaxed sm:text-lg ${itemClass}`}
          style={{ animationDelay: stagger[2] }}
        >
          Empowering startups, businesses, and entrepreneurs with technology that delivers real results — websites, products, and software built to look modern and perform in the market.
        </EditableText>

        <div
          className={`mt-8 flex flex-wrap items-center gap-3 ${itemClass}`}
          style={{ animationDelay: stagger[3] }}
        >
          <CTAButton label="Start Your Project" href="#contact" />
          <CTAButton label="Explore Our Work" href="#projects" variant="secondary" />
          <CTAButton
            label="WhatsApp"
            href={getWhatsAppUrl(undefined, toWhatsAppDigits(contact.whatsapp_number))}
            variant="whatsapp"
            external
          />
        </div>

        <p
          className={`text-section-muted mt-4 text-sm ${itemClass}`}
          style={{ animationDelay: stagger[4] }}
        >
          <EditableText contentKey="hero.whatsappHint">Chat with us on</EditableText>{' '}
          {contact.whatsapp_number}
        </p>
      </div>
    </section>
  )
}
