import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { fadeUp, motionTransition, viewportOnce } from '../../lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
  /** When true, only animate via parent stagger variants (no own whileInView) */
  staggerChild?: boolean
}

export default function Reveal({
  children, className = '', delayMs = 0, staggerChild = false,
}: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  if (staggerChild) {
    return (
      <motion.div className={className} variants={fadeUp} transition={motionTransition}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ ...motionTransition, delay: delayMs / 1000 }}
    >
      {children}
    </motion.div>
  )
}
