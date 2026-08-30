import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ImageRevealProps {
  children: ReactNode
  className?: string
}

export default function ImageReveal({ children, className = '' }: ImageRevealProps) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={`overflow-hidden will-change-transform ${className} ${
        inView ? 'scale-100 opacity-100' : 'scale-100 opacity-90'
      } transition-opacity duration-200 ease-out`}
    >
      {children}
    </div>
  )
}
