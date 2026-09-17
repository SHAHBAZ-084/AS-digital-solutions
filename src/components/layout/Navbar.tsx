import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/brand/white-logo.webp'
import { siteConfig } from '../../config/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import EditableText from '../ui/EditableText'

const navLinks: { id: string; label: string; href: string; kind: 'hash' | 'path' }[] = [
  { id: 'home', label: 'Home', href: '#hero', kind: 'hash' },
  { id: 'services', label: 'Services', href: '/services', kind: 'path' },
  { id: 'projects', label: 'Projects', href: '/portfolio', kind: 'path' },
  { id: 'blog', label: 'Blog', href: '/blog', kind: 'path' },
  { id: 'contact', label: 'Contact', href: '/contact', kind: 'path' },
]


const MENU_EXIT_MS = 220

function navOffsetPx() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-height').trim()
  const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  if (raw.endsWith('rem')) return parseFloat(raw) * root
  if (raw.endsWith('px')) return parseFloat(raw)
  return 4.25 * root
}

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '')
  const el = document.getElementById(id)
  if (!el) return false
  const top = el.getBoundingClientRect().top + window.scrollY - navOffsetPx()
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  history.replaceState(null, '', `#${id}`)
  return true
}

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const reduced = useReducedMotion()
  const pendingHash = useRef<string | null>(null)
  const exitTimer = useRef<number | null>(null)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    return () => {
      if (exitTimer.current !== null) window.clearTimeout(exitTimer.current)
    }
  }, [])

  const resolveHref = (link: (typeof navLinks)[number]) => {
    if (link.kind === 'path') return link.href
    return pathname === '/' ? link.href : `/${link.href}`
  }

  const runPendingScroll = () => {
    const hash = pendingHash.current
    if (!hash) return
    pendingHash.current = null
    window.requestAnimationFrame(() => {
      if (!scrollToHash(hash)) {
        window.setTimeout(() => scrollToHash(hash), 120)
      }
    })
  }

  const handleMobileNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    link: (typeof navLinks)[number],
  ) => {
    if (link.kind === 'path') {
      closeMenu()
      return
    }

    event.preventDefault()
    pendingHash.current = link.href

    if (exitTimer.current !== null) {
      window.clearTimeout(exitTimer.current)
      exitTimer.current = null
    }

    setMenuOpen(false)

    if (pathname !== '/') {
      navigate(`/${link.href}`)
      exitTimer.current = window.setTimeout(runPendingScroll, reduced ? 50 : MENU_EXIT_MS)
      return
    }

    exitTimer.current = window.setTimeout(runPendingScroll, reduced ? 50 : MENU_EXIT_MS)
  }

  const closeMenu = () => setMenuOpen(false)

  const mobileMenu = (
    <div className="border-t border-white/10 bg-navy lg:hidden">
      <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
        {navLinks.map((link) => (
          <li key={link.href}>
            {link.kind === 'path' ? (
              <Link
                to={link.href}
                className="block rounded-lg px-3 py-3 text-sm uppercase tracking-[0.14em] text-white/85 transition hover:bg-white/5 hover:text-accent"
                onClick={closeMenu}
              >
                <EditableText contentKey={`nav.${link.id}`}>{link.label}</EditableText>
              </Link>
            ) : (
              <a
                href={resolveHref(link)}
                className="block rounded-lg px-3 py-3 text-sm uppercase tracking-[0.14em] text-white/85 transition hover:bg-white/5 hover:text-accent"
                onClick={(event) => handleMobileNavClick(event, link)}
              >
                <EditableText contentKey={`nav.${link.id}`}>{link.label}</EditableText>
              </a>
            )}
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
            width={220}
            height={68}
            decoding="async"
            className="h-16 w-auto max-h-16 object-contain sm:h-[4.25rem] sm:max-h-[4.25rem]"
          />
        </Link>

        <ul className="hidden items-center gap-7 text-[13px] font-medium tracking-wide text-white lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.kind === 'path' ? (
                <Link
                  to={link.href}
                  className="inline-block uppercase tracking-[0.14em] transition-colors hover:text-accent hover:-translate-y-px"
                >
                  <EditableText contentKey={`nav.${link.id}`}>{link.label}</EditableText>
                </Link>
              ) : (
                <a
                  href={resolveHref(link)}
                  className="inline-block uppercase tracking-[0.14em] transition-colors hover:text-accent hover:-translate-y-px"
                >
                  <EditableText contentKey={`nav.${link.id}`}>{link.label}</EditableText>
                </a>
              )}
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

      <div
        className={`overflow-hidden lg:hidden transition-[max-height,opacity] duration-200 ease-out ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        {mobileMenu}
      </div>
    </header>
  )
}
