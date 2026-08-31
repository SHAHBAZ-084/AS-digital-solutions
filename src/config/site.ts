import type { ContactInfo } from '../types/siteContent'

export const siteConfig = {
  companyName: 'AS Digital Solutions',
  tagline: 'Innovating Today, Empowering Tomorrow',
  eyebrow: 'Smart code. Modern design. Real results.',
  /** Empty in dev (Vite proxies /api) and production (nginx reverse-proxies /api). */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  /** Display format; replace with the live number when ready */
  whatsappNumber: '+92-XXX-XXXXXXX',
  /** Digits only for wa.me links; keep in sync with whatsappNumber */
  whatsappDigits: '92XXXXXXXXXX',
  email: 'contactasdigitalsolutions@gmail.com',
  phone: '03220726006',
  address: 'Placeholder address',
  social: {
    linkedin: '',
    facebook: '',
    instagram: '',
  },
} as const

export const defaultContact: ContactInfo = {
  whatsapp_number: siteConfig.whatsappNumber,
  email: siteConfig.email,
  phone: siteConfig.phone,
  address: siteConfig.address,
  socials: {
    linkedin: siteConfig.social.linkedin,
    facebook: siteConfig.social.facebook,
    instagram: siteConfig.social.instagram,
  },
}

export function toWhatsAppDigits(display?: string) {
  const digits = (display ?? siteConfig.whatsappNumber).replace(/\D/g, '')
  return digits || siteConfig.whatsappDigits
}

export function getWhatsAppUrl(
  text = 'Hi AS Digital Solutions, I would like to start a project.',
  digits?: string,
) {
  const resolved = digits ?? siteConfig.whatsappDigits
  return `https://wa.me/${resolved}?text=${encodeURIComponent(text)}`
}
