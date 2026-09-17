import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface TiltedSurfaceProps {
  children: ReactNode
  className?: string
  rotateAmplitude?: number
  scaleOnHover?: number
}

const spring = { damping: 28, stiffness: 160, mass: 0.9 }

/**
 * React Bits–inspired 3D tilt (framer-motion springs).
 * Keeps existing card chrome; only adds perspective motion.
 */
export default function TiltedSurface({
  children,
  className = '',
  rotateAmplitude = 12,
  scaleOnHover = 1.03,
}: TiltedSurfaceProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(0, spring)
  const rotateY = useSpring(0, spring)
  const scale = useSpring(1, spring)

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  const onMove = (e: MouseEvent) => {
    if (!ref.current || window.matchMedia('(pointer: coarse)').matches) return
    const rect = ref.current.getBoundingClientRect()
    const ox = e.clientX - rect.left - rect.width / 2
    const oy = e.clientY - rect.top - rect.height / 2
    rotateX.set((oy / (rect.height / 2)) * -rotateAmplitude)
    rotateY.set((ox / (rect.width / 2)) * rotateAmplitude)
  }

  return (
    <div
      ref={ref}
      className={`[perspective:1000px] ${className}`}
      onMouseMove={onMove}
      onMouseEnter={() => scale.set(scaleOnHover)}
      onMouseLeave={() => {
        scale.set(1)
        rotateX.set(0)
        rotateY.set(0)
      }}
    >
      <motion.div
        className="h-full [transform-style:preserve-3d] will-change-transform"
        style={{ rotateX, rotateY, scale }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function usePointerSpring() {
  return {
    x: useMotionValue(0),
    y: useMotionValue(0),
  }
}
