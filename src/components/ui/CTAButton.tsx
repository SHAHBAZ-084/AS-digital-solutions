import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import WhatsAppIcon from './WhatsAppIcon'

interface CTAButtonProps {
  label: string
  href?: string
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'email'
  external?: boolean
  icon?: ReactNode
  labelKey?: string
}

const variantClass = {
  primary:
    'bg-accent text-white shadow-[0_10px_30px_-12px_rgba(30,127,232,0.8)] hover:opacity-95', secondary:
    'border border-[rgba(10,14,26,0.12)] bg-white text-text hover:border-accent/60 hover:bg-[rgba(30,127,232,0.08)]', whatsapp:
    'bg-whatsapp text-white shadow-[0_10px_30px_-12px_rgba(37,211,102,0.45)] hover:opacity-95', email:
    'bg-accent text-white shadow-[0_10px_30px_-12px_rgba(30,127,232,0.8)] hover:opacity-95',
} as const

export default function CTAButton({
  label, href = '#contact', variant = 'primary', external = false, icon, labelKey: _labelKey,
}: CTAButtonProps) {
  void _labelKey
  const reduced = useReducedMotion()
  const leadingIcon =
    icon ?? (variant === 'whatsapp' ? <WhatsAppIcon className="h-4 w-4" /> : null)

  const className = `btn-shine inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition ${variantClass[variant]}`
  const externalProps = external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}

  if (reduced) {
    return (
      <a href={href} className={className} {...externalProps}>
        {leadingIcon}
        {label}
      </a>
    )
  }

  return (
    <motion.a
      href={href}
      className={className}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      {...externalProps}
    >
      {leadingIcon}
      {label}
    </motion.a>
  )
}
