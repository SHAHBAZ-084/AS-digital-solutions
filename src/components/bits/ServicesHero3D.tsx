import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Services-only 3D visual — canal teal, CSS 3D + Framer Motion.
 * Phase 4 will lazy-load this; Phase 2 rethemes to workshop palette.
 */
export default function ServicesHero3D() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 120, damping: 18 })
  const springY = useSpring(my, { stiffness: 120, damping: 18 })
  const tiltX = useTransform(springY, [-0.5, 0.5], [10, -10])
  const tiltY = useTransform(springX, [-0.5, 0.5], [-12, 12])

  const onMove = (e: MouseEvent) => {
    if (!ref.current || reduced) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  if (reduced) {
    return (
      <div
        className="relative mx-auto flex h-[260px] w-full max-w-[320px] items-center justify-center"
        aria-hidden="true"
      >
        <div className="h-44 w-44 rounded-full bg-[radial-gradient(circle_at_32%_28%,#3aa8b0_0%,#0e7c86_40%,#12203a_78%)] shadow-[0_40px_80px_-30px_color-mix(in_srgb,var(--canal)_50%,transparent)]" />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="relative mx-auto flex h-[320px] w-full max-w-[400px] cursor-default items-center justify-center [perspective:1400px] sm:h-[380px] lg:h-[420px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-8 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--canal)_18%,transparent)_0%,transparent_68%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-10 w-40 -translate-x-1/2 rounded-full bg-ink/10 blur-2xl" />

      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="absolute h-[88%] w-[88%] rounded-full border border-canal/30"
          style={{ transformStyle: 'preserve-3d', rotateX: 72 }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-canal shadow-[0_0_18px_color-mix(in_srgb,var(--canal)_80%,transparent)]" />
        </motion.div>

        <motion.div
          className="absolute h-[70%] w-[70%] rounded-full border border-ink/15"
          style={{ transformStyle: 'preserve-3d', rotateY: 78, rotateX: 18 }}
          animate={{ rotateZ: -360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute top-1/2 right-0 h-2 w-2 translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/50" />
        </motion.div>

        <motion.div
          className="absolute h-[54%] w-[54%] rounded-full border border-dashed border-canal/35"
          style={{ transformStyle: 'preserve-3d', rotateX: -40, rotateY: -25 }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="relative z-10 h-40 w-40 sm:h-48 sm:w-48"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div
              className="absolute inset-0 rounded-full shadow-[inset_-18px_-24px_40px_rgba(18,32,58,0.45),inset_12px_14px_28px_rgba(255,255,255,0.18),0_30px_60px_-20px_color-mix(in_srgb,var(--canal)_45%,transparent)]"
              style={{
                background:
                  'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.5) 0%, rgba(62,168,176,0.55) 18%, rgba(14,124,134,0.9) 42%, rgba(18,32,58,0.95) 78%)',
              }}
            />
            <div className="absolute top-[14%] left-[18%] h-[28%] w-[34%] rounded-full bg-white/35 blur-[2px]" />
            <div className="absolute inset-[18%] rounded-full border border-white/20" />
            <div className="absolute inset-[32%] rounded-full border border-canal/30" />
            <div className="absolute inset-[38%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.3)_0%,color-mix(in_srgb,var(--canal)_25%,transparent)_45%,transparent_70%)]" />
          </motion.div>
          <div
            className="absolute inset-[22%] rounded-full border border-white/25 bg-white/5 backdrop-blur-[1px]"
            style={{ transform: 'translateZ(28px)' }}
          />
        </motion.div>

        <motion.div
          className="absolute top-[18%] right-[12%] h-9 w-14 border border-white/40 bg-cotton/70 shadow-[0_12px_30px_-12px_rgba(18,32,58,0.35)] backdrop-blur-md"
          style={{ transform: 'translateZ(60px) rotateY(-18deg)' }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="m-2 h-1.5 w-8 rounded-full bg-canal/50" />
          <div className="mx-2 h-1 w-5 rounded-full bg-ink/15" />
        </motion.div>
      </motion.div>
    </div>
  )
}
