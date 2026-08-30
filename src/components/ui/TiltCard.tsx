import {
  useEffect, useRef, type MouseEvent, type ReactNode,
} from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface TiltCardProps {
  children: ReactNode
  className?: string
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || !ref.current) return
    ref.current.dataset.interactive = 'true'
  }, [reduced])

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    const rotateY = x * 8
    const rotateX = -y * 6
    ref.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-interactive="true"
    >
      {children}
    </div>
  )
}
