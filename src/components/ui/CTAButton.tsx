import type { ReactNode } from 'react'
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
    'bg-accent text-white shadow-[0_10px_30px_-12px_color-mix(in_srgb,var(--canal)_55%,transparent)] hover:bg-canal-lo',
  secondary:
    'border border-line bg-cotton text-text hover:border-canal hover:bg-[color-mix(in_srgb,var(--canal)_8%,transparent)]',
  whatsapp:
    'bg-whatsapp text-white shadow-[0_10px_30px_-12px_rgba(37,211,102,0.45)] hover:opacity-95',
  email:
    'bg-accent text-white shadow-[0_10px_30px_-12px_color-mix(in_srgb,var(--canal)_55%,transparent)] hover:bg-canal-lo',
} as const

/** CSS-only CTA (no framer-motion on critical path). */
export default function CTAButton({
  label,
  href = '#contact',
  variant = 'primary',
  external = false,
  icon,
  labelKey: _labelKey,
}: CTAButtonProps) {
  void _labelKey
  const leadingIcon =
    icon ?? (variant === 'whatsapp' ? <WhatsAppIcon className="h-4 w-4" /> : null)

  const className = `btn-shine inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold tracking-wide transition ${variantClass[variant]}`
  const externalProps = external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}

  return (
    <a href={href} className={className} {...externalProps}>
      {leadingIcon}
      {label}
    </a>
  )
}
