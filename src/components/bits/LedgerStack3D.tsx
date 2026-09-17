import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Home-hero spectacle: paper khata → digital ledger stack.
 * CSS 3D + Framer Motion only. aria-hidden; reduced-motion = static.
 */
export default function LedgerStack3D() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 100, damping: 20 })
  const springY = useSpring(my, { stiffness: 100, damping: 20 })
  const tiltX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const tiltY = useTransform(springX, [-0.5, 0.5], [-10, 10])

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

  const stack = (
    <div className="relative h-[280px] w-[220px] sm:h-[320px] sm:w-[250px]" style={{ transformStyle: 'preserve-3d' }}>
      {/* Back — paper khata */}
      <div
        className="absolute inset-0 border border-line bg-[#e8e4d4] shadow-[0_18px_40px_-24px_rgba(18,32,58,0.45)]"
        style={{ transform: 'translateZ(-48px) rotateY(-14deg) translateX(-18px) translateY(10px)' }}
      >
        <div className="absolute top-0 bottom-0 left-5 w-px bg-[#c9b896]/70" />
        <div className="space-y-3 p-5 pt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-px w-full bg-[#c9b896]/55" />
          ))}
        </div>
        <p className="absolute bottom-4 left-5 font-[inherit] text-[10px] tracking-wide text-ink/35">
          bahi khata
        </p>
      </div>

      {/* Mid — typed invoice */}
      <div
        className="absolute inset-0 border border-line bg-cotton shadow-[0_22px_48px_-22px_rgba(18,32,58,0.4)]"
        style={{ transform: 'translateZ(-16px) rotateY(-6deg) translateX(-6px) translateY(4px)' }}
      >
        <div className="border-b border-line px-4 py-3">
          <div className="h-2 w-16 bg-ink/20" />
          <div className="mt-2 h-1.5 w-24 bg-ink/10" />
        </div>
        <div className="space-y-2.5 px-4 py-4">
          <div className="flex justify-between gap-3">
            <div className="h-1.5 w-20 bg-ink/15" />
            <div className="h-1.5 w-10 bg-ink/10" />
          </div>
          <div className="flex justify-between gap-3">
            <div className="h-1.5 w-24 bg-ink/15" />
            <div className="h-1.5 w-8 bg-ink/10" />
          </div>
          <div className="flex justify-between gap-3">
            <div className="h-1.5 w-16 bg-ink/15" />
            <div className="h-1.5 w-12 bg-ink/10" />
          </div>
          <div className="mt-3 border-t border-dashed border-line pt-3">
            <div className="flex justify-between">
              <div className="h-1.5 w-12 bg-ink/20" />
              <div className="h-1.5 w-14 bg-ink/25" />
            </div>
          </div>
        </div>
      </div>

      {/* Front — digital ledger / POS */}
      <div
        className="absolute inset-0 overflow-hidden border border-canal/25 bg-ink text-cotton shadow-[0_28px_60px_-20px_color-mix(in_srgb,var(--canal)_40%,transparent)]"
        style={{ transform: 'translateZ(28px) rotateY(4deg)' }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="text-[10px] font-medium tracking-wide text-cotton/70">Ledger</span>
          <span className="h-1.5 w-1.5 rounded-full bg-canal" />
        </div>
        <div className="space-y-3 px-4 py-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-cotton/45">Today</p>
              <p className="num mt-1 text-lg font-semibold text-brass">Rs 48,200</p>
            </div>
            <div className="h-8 w-14 bg-canal/25" />
          </div>
          <div className="space-y-2 border-t border-white/10 pt-3">
            {[
              ['Sale #1042', '+12,500'],
              ['Purchase', '−4,800'],
              ['Udhaar', '+2,100'],
            ].map(([label, amt]) => (
              <div key={label} className="flex items-center justify-between text-[11px]">
                <span className="text-cotton/55">{label}</span>
                <span className="num text-cotton/85">{amt}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            <div className="h-8 border border-white/10 bg-white/5" />
            <div className="h-8 border border-canal/40 bg-canal/20" />
            <div className="h-8 border border-white/10 bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  )

  if (reduced) {
    return (
      <div
        className="relative mx-auto flex h-[300px] w-full max-w-[280px] items-center justify-center sm:h-[340px]"
        aria-hidden="true"
      >
        <div className="relative scale-[0.92] [transform:rotateY(-8deg)]">{stack}</div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="relative mx-auto flex h-[320px] w-full max-w-[320px] cursor-default items-center justify-center [perspective:1200px] sm:h-[380px] lg:h-[420px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-10 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--canal)_14%,transparent)_0%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute bottom-8 left-1/2 h-8 w-40 -translate-x-1/2 rounded-full bg-ink/15 blur-2xl" />

      <motion.div
        className="relative flex items-center justify-center"
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {stack}
      </motion.div>
    </div>
  )
}
