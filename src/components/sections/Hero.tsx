import { motion } from 'framer-motion'
import { siteConfig } from '../../config/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { heroItem, heroStagger, motionTransition } from '../../lib/motion'
import CTAButton from '../ui/CTAButton'
import EditableText from '../ui/EditableText'
import HeroParallaxBg, { useHeroParallaxBind } from '../ui/HeroParallaxBg'
import HeroParticles from '../ui/HeroParticles'
import TypingText from '../ui/TypingText'
import heroSkyline from '../../assets/brand/hero-skyline.png'

const accentDefault = 'Digital Solutions'

export default function Hero() {
  const reduced = useReducedMotion()
  const { springX, springY, bindSection, reduced: tiltReduced } = useHeroParallaxBind()

  const eyebrow = (
    <EditableText
      contentKey="hero.eyebrow"
      as="p"
      className="text-section-eyebrow text-xs font-semibold tracking-[0.28em] uppercase"
    >
      {siteConfig.eyebrow}
    </EditableText>
  )

  const headline = (
    <>
      <EditableText contentKey="hero.headline.lead">We Build</EditableText>{' '}
      <span className="text-accent">
        <TypingText text={accentDefault} />
      </span>{' '}
      <EditableText contentKey="hero.headline.tail">That Grow Businesses</EditableText>
    </>
  )

  const subhead = (
    <EditableText
      contentKey="hero.subhead"
      as="p"
      className="text-section-muted mt-5 max-w-lg text-base leading-relaxed sm:text-lg"
    >
      Empowering startups, businesses, and entrepreneurs with technology that delivers real results:
      websites, products, and software built to look modern and perform in the market.
    </EditableText>
  )

  const actions = (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <CTAButton label="Start Your Project" href="#contact" />
      <CTAButton label="Explore Our Work" href="#projects" variant="secondary" />
    </div>
  )

  return (
    <section
      id="hero"
      className="section-light relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-center overflow-hidden bg-bg-primary"
      {...bindSection}
    >
      <HeroParallaxBg
        src={heroSkyline}
        springX={springX}
        springY={springY}
        reduced={tiltReduced}
      />
      <HeroParticles />

      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,127,232,0.08),transparent_40%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 lg:py-20">
        {reduced ? (
          <>
            {eyebrow}
            <h1 className="text-section mt-4 max-w-xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[3.35rem]">
              {headline}
            </h1>
            {subhead}
            {actions}
          </>
        ) : (
          <motion.div variants={heroStagger} initial="hidden" animate="show">
            <motion.div variants={heroItem} transition={motionTransition}>
              {eyebrow}
            </motion.div>
            <motion.h1
              className="text-section mt-4 max-w-xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-[3.35rem]"
              variants={heroItem}
              transition={motionTransition}
            >
              {headline}
            </motion.h1>
            <motion.div variants={heroItem} transition={motionTransition}>
              {subhead}
            </motion.div>
            <motion.div variants={heroItem} transition={motionTransition}>
              {actions}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
