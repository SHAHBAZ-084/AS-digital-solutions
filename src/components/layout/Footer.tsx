import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import logo from '../../assets/brand/white-logo.webp'
import { siteConfig } from '../../config/site'
import { useSiteData } from '../../context/SiteDataContext'

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  const url = href?.trim()
  return (
    <a
      href={url || undefined}
      aria-label={label}
      aria-disabled={!url}
      {...(url
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : { onClick: (event) => event.preventDefault(), role: 'link' })}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/75 transition hover:border-accent/40 hover:bg-accent/15 hover:text-accent"
    >
      {children}
    </a>
  )
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.68 0H1.32A1.32 1.32 0 0 0 0 1.32v21.36A1.32 1.32 0 0 0 1.32 24h11.5v-9.29H9.69v-3.63h3.13V8.41c0-3.1 1.89-4.79 4.66-4.79 1.32 0 2.46.1 2.79.14v3.24h-1.91c-1.5 0-1.79.71-1.79 1.76v2.31h3.58l-.47 3.63h-3.11V24h6.1A1.32 1.32 0 0 0 24 22.68V1.32A1.32 1.32 0 0 0 22.68 0Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z" />
    </svg>
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
                className="h-20 w-auto max-w-[280px] object-contain object-left sm:h-24"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">{footer.blurb}</p>
            <div className="mt-4 flex gap-2.5">
              <SocialLink href={contact.socials.linkedin} label="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
              <SocialLink href={contact.socials.facebook} label="Facebook">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href={contact.socials.instagram} label="Instagram">
                <InstagramIcon />
              </SocialLink>
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
