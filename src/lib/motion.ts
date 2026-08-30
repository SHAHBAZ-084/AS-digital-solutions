import type { Transition, Variants } from 'framer-motion'

/** Shared easing, snappy ease-out across the site */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const motionTransition: Transition = {
  duration: 0.45, ease: easeOutExpo,
}

export const shortTransition: Transition = {
  duration: 0.35, ease: easeOutExpo,
}

export const viewportOnce = { once: true, amount: 0.2 } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 },
}

export const staggerContainer: Variants = {
  hidden: {}, show: {
    transition: {
      staggerChildren: 0.08, delayChildren: 0.04, }, },
}

export const heroStagger: Variants = {
  hidden: {}, show: {
    transition: {
      staggerChildren: 0.12, delayChildren: 0.05, }, },
}

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 18 }, show: {
    opacity: 1, y: 0, transition: motionTransition, },
}

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 },
}
