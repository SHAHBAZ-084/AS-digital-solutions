import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

/** Lightweight hero particles: start after idle so they do not compete with LCP. */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const start = () => setActive(true)
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(start, { timeout: 2500 })
      return () => w.cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(start, 1500)
    return () => window.clearTimeout(t)
  }, [reduced])

  useEffect(() => {
    if (!active || reduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const count = 16
    let animationId = 0
    let particles: Particle[] = []
    let running = true

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 2 + Math.random() * 3,
        speed: 0.12 + Math.random() * 0.28,
        opacity: 0.08 + Math.random() * 0.14,
      }))
    }

    const draw = () => {
      if (!running) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      for (const particle of particles) {
        particle.y -= particle.speed
        if (particle.y < -8) {
          particle.y = h + 8
          particle.x = Math.random() * w
        }
        ctx.fillStyle = `rgba(30, 127, 232, ${particle.opacity})`
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
      }
      animationId = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      running = false
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [active, reduced])

  if (reduced || !active) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden="true"
    />
  )
}
