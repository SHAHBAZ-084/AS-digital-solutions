import { getWhatsAppUrl, toWhatsAppDigits } from '../../config/site'
import { useSiteData } from '../../context/SiteDataContext'
import WhatsAppIcon from './WhatsAppIcon'

export default function FloatingWhatsApp() {
  const { contact } = useSiteData()
  const href = getWhatsAppUrl(undefined, toWhatsAppDigits(contact.whatsapp_number))

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-whatsapp sm:right-6 sm:bottom-6"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
