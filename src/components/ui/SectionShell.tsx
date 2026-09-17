import type { ReactNode } from 'react'
import { SectionToneContext } from '../../context/SectionToneContext'

interface SectionShellProps {
  id?: string
  className?: string
  innerClassName?: string
  children: ReactNode
  texture?: string
  textureOpacity?: number
  showEdge?: boolean
  /** cotton (light) or ink (dark) — sets section rhythm */
  tone?: 'light' | 'dark'
}

export default function SectionShell({
  id,
  className = '',
  innerClassName = '',
  children,
  texture,
  textureOpacity = 0.62,
  showEdge = true,
  tone = 'light',
}: SectionShellProps) {
  const isDark = tone === 'dark'
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${isDark ? 'section-dark' : 'section-light bg-bg-primary'} ${className}`}
    >
      {texture ? (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <img
            src={texture}
            alt=""
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
            style={{ opacity: isDark ? textureOpacity * 0.35 : textureOpacity }}
          />
          <div className={`absolute inset-0 ${isDark ? 'bg-ink/80' : 'bg-cotton/32'}`} />
        </div>
      ) : null}
      <SectionToneContext.Provider value={isDark ? 'dark' : 'light'}>
        <div className={`relative z-10 mx-auto max-w-6xl px-4 py-16 ${innerClassName}`}>
          {children}
        </div>
      </SectionToneContext.Provider>
      {showEdge && !isDark ? <div className="section-edge" aria-hidden="true" /> : null}
    </section>
  )
}
