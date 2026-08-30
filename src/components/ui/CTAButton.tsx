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
    'bg-accent text-white shadow-[0_10px_30px_-12px_rgba(30,127,232,0.8)] hover:opacity-95',
  secondary:
    'border border-[rgba(10,14,26,0.12)] bg-white text-text hover:border-accent/60 hover:bg-[rgba(30,127,232,0.08)]',
  whatsapp:
    'bg-whatsapp text-white shadow-[0_10px_30px_-12px_rgba(37,211,102,0.45)] hover:opacity-95',
  email:
    'bg-accent text-white shadow-[0_10px_30px_-12px_rgba(30,127,232,0.8)] hover:opacity-95',
} as const

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

  return (
    <a
      href={href}
      className={`btn-shine inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition ${variantClass[variant]}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {leadingIcon}
      {label}
    </a>
  )
}
