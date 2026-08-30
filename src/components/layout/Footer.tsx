import { Link } from 'react-router-dom'
import logo from '../../assets/brand/white-logo.webp'
import { siteConfig } from '../../config/site'
import { useSiteData } from '../../context/SiteDataContext'

function SocialIcon({ label }: { label: string }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/6 text-xs font-semibold text-white/70 transition hover:border-accent/35 hover:text-accent">
      {label}
    </span>
  )
}

function isWhatsAppLink(id: string, label: string) {
  const haystack = `${id} ${label}`.toLowerCase()
  return haystack.includes('whatsapp')
}

export default function Footer() {
  const { contact, footer } = useSiteData()

  return (
    <footer className="border-t border-navy bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.1fr_repeat(4,minmax(0,1fr))] lg:gap-6">
          <div>
            <Link to="/" aria-label={`${siteConfig.companyName} home`}>
              <img
                src={logo}
                alt={siteConfig.companyName}
                className="h-12 w-auto max-w-[200px] object-contain object-left"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">{footer.blurb}</p>
            <div className="mt-4 flex gap-2">
              <a href={contact.socials.linkedin || '#'} aria-label="LinkedIn">
                <SocialIcon label="in" />
              </a>
              <a href={contact.socials.facebook || '#'} aria-label="Facebook">
                <SocialIcon label="f" />
              </a>
              <a href={contact.socials.instagram || '#'} aria-label="Instagram">
                <SocialIcon label="ig" />
              </a>
            </div>
          </div>

          {footer.columns.map((column) => {
            const links = column.links.filter((link) => !isWhatsAppLink(link.id, link.label))
            if (links.length === 0) return null

            return (
              <div key={column.id}>
                <h3 className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                  {column.title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  {links.map((link) => (
                    <li key={link.id}>
                      {link.href.startsWith('/') ? (
                        <Link to={link.href} className="transition hover:text-accent">
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="transition hover:text-accent"
                          {...(link.href.startsWith('http')
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs leading-5 text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright {new Date().getFullYear()} {siteConfig.companyName}. {footer.copyright}
          </p>
          <div className="flex gap-4">
            <span>{footer.privacy_label}</span>
            <span>{footer.terms_label}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
