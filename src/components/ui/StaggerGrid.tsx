import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { staggerContainer, viewportOnce } from '../../lib/motion'

interface StaggerGridProps {
  children: ReactNode
  className?: string
}

/** Parent grid that staggers child Reveal/motion items with staggerChild */
export default function StaggerGrid({ children, className = '' }: StaggerGridProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  )
}
