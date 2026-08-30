import {
  motion, useMotionTemplate, useMotionValue, useSpring, useTransform, type MotionValue,
} from 'framer-motion'
import type { MouseEvent } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Bind mouse tracking to the hero <section> so tilt works over text + skyline. */
export function useHeroParallaxBind() {
  const reduced = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.4 })
  const springY = useSpring(my, { stiffness: 120, damping: 22, mass: 0.4 })

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set((event.clientX - rect.left) / rect.width - 0.5)
    my.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const onMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return { reduced, springX, springY, bindSection: { onMouseMove, onMouseLeave } }
}

interface HeroParallaxBgProps {
  src: string
  springX: MotionValue<number>
  springY: MotionValue<number>
  reduced: boolean
}

/**
 * Light 3D touch: cursor-driven perspective tilt on the hero skyline.
 * Chosen over Three.js to avoid bundling three/@react-three/fiber.
 */
export default function HeroParallaxBg({
  src, springX, springY, reduced,
}: HeroParallaxBgProps) {
  const rotateX = useTransform(springY, [-0.5, 0.5], [3.5, -3.5])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4.5, 4.5])
  const translateX = useTransform(springX, [-0.5, 0.5], [-12, 12])
  const translateY = useTransform(springY, [-0.5, 0.5], [-8, 8])
  const transform = useMotionTemplate`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0) scale(1.06)`

  if (reduced) {
    return (
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          src={src}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[70%_top]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-white/90 via-[36%] to-transparent to-[70%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8fe] from-0% via-[#f4f8fe]/55 via-[26%] to-transparent to-[55%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-white/15" />
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div className="absolute inset-[-3%] will-change-transform" style={{ transform }}>
        <img
          src={src}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[70%_top]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-white/90 via-[36%] to-transparent to-[70%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8fe] from-0% via-[#f4f8fe]/55 via-[26%] to-transparent to-[55%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-white/15" />
    </div>
  )
}
