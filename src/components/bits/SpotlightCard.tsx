import { useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  /** Accent spotlight — matches site blue */
  spotlightColor?: string
}

/**
 * React Bits SpotlightCard — mouse-follow glow over existing surfaces.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(30, 127, 232, 0.18)',
}: SpotlightCardProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  if (reduced) {
    return <div className={`relative overflow-hidden ${className}`}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={(e) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 55%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
