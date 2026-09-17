import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easeOutExpo } from '../../lib/motion'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'p' | 'span'
}

/**
 * React Bits–style blur-in text, adapted to site typography.
 */
export default function BlurText({
  text,
  className = '',
  delay = 0,
  as: Tag = 'span',
}: BlurTextProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  if (reduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.28em] inline-block"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: delay + i * 0.04,
            ease: easeOutExpo,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}

export function MotionSection({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  )
}
