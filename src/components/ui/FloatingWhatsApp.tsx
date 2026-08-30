import { motion } from 'framer-motion'
import { getWhatsAppUrl, toWhatsAppDigits } from '../../config/site'
import { useSiteData } from '../../context/SiteDataContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import WhatsAppIcon from './WhatsAppIcon'

export default function FloatingWhatsApp() {
  const { contact } = useSiteData()
  const reduced = useReducedMotion()
  const href = getWhatsAppUrl(undefined, toWhatsAppDigits(contact.whatsapp_number))

  const className =
    'fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp sm:right-6 sm:bottom-6'

  if (reduced) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    )
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  )
}
