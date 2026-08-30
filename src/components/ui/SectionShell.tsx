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
}

export default function SectionShell({
  id, className = '', innerClassName = '', children, texture, textureOpacity = 0.62, showEdge = true,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`section-light relative overflow-hidden bg-bg-primary ${className}`}
    >
      {texture ? (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <img
            src={texture}
            alt=""
            className="h-full w-full object-cover object-center"
            style={{ opacity: textureOpacity }}
          />
          <div className="absolute inset-0 bg-white/32" />
        </div>
      ) : null}
      <SectionToneContext.Provider value="light">
        <div className={`relative z-10 mx-auto max-w-6xl px-4 py-16 ${innerClassName}`}>
          {children}
        </div>
      </SectionToneContext.Provider>
      {showEdge ? <div className="section-edge" aria-hidden="true" /> : null}
    </section>
  )
}
