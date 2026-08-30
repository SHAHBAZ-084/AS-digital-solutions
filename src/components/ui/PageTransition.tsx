import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const reduced = useReducedMotion()

  return (
    <div
      key={location.pathname}
      className={reduced ? '' : 'animate-page-enter'}
    >
      {children}
    </div>
  )
}
