import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface RevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
}

export default function Reveal({ children, className = '', delayMs: _delayMs = 0 }: RevealProps) {
  void _delayMs
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-200 ease-out ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'
      } ${className}`}
    >
      {children}
    </div>
  )
}
