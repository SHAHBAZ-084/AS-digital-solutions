import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/brand/white-logo.webp'
import { siteConfig } from '../../config/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easeOutExpo } from '../../lib/motion'
import EditableText from '../ui/EditableText'

const navLinks = [
  { id: 'home', label: 'Home', href: '#hero' }, { id: 'services', label: 'Services', href: '#services' }, { id: 'projects', label: 'Projects', href: '#projects' }, { id: 'process', label: 'Process', href: '#process' }, { id: 'contact', label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const resolveHref = (hash: string) => (pathname === '/' ? hash : `/${hash}`)
  const closeMenu = () => setMenuOpen(false)

  const mobileMenu = (
    <div className="border-t border-white/10 bg-navy lg:hidden">
      <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={resolveHref(link.href)}
              className="block rounded-lg px-3 py-3 text-sm uppercase tracking-[0.14em] text-white/85 transition hover:bg-white/5 hover:text-accent"
              onClick={closeMenu}
            >
              <EditableText contentKey={`nav.${link.id}`}>{link.label}</EditableText>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <header className="sticky top-0 z-50 bg-navy">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
        <Link
          to="/"
          className="flex shrink-0 items-center"
          onClick={closeMenu}
          aria-label={`${siteConfig.companyName} home`}
        >
          <img
            src={logo}
            alt={siteConfig.companyName}
            className="h-16 w-auto max-h-16 object-contain sm:h-[4.25rem] sm:max-h-[4.25rem]"
          />
        </Link>

        <ul className="hidden items-center gap-7 text-[13px] font-medium tracking-wide text-white lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <motion.a
                href={resolveHref(link.href)}
                className="inline-block uppercase tracking-[0.14em] transition-colors hover:text-accent"
                whileHover={reduced ? undefined : { y: -1 }}
                transition={{ duration: 0.2, ease: easeOutExpo }}
              >
                <EditableText contentKey={`nav.${link.id}`}>{link.label}</EditableText>
              </motion.a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <span className="text-xl leading-none">&times;</span>
          ) : (
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
            </span>
          )}
        </button>
      </nav>

      {reduced ? (
        menuOpen ? mobileMenu : null
      ) : (
        <AnimatePresence initial={false}>
          {menuOpen ? (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: easeOutExpo }}
              className="overflow-hidden lg:hidden"
            >
              {mobileMenu}
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
    </header>
  )
}
