import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Continuous-rotating 3D sculpture for the services hero (Framer Motion).
 * No Three.js — lightweight CSS 3D + springs that still reads as a product visual.
 */
export default function ServicesHero3D() {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div
        className="relative mx-auto flex h-[280px] w-full max-w-[340px] items-center justify-center lg:h-[360px]"
        aria-hidden="true"
      >
        <div className="h-40 w-40 rounded-full bg-[radial-gradient(circle_at_30%_30%,#1e7fe8,#0a0e1a)] opacity-90 shadow-[0_30px_80px_-20px_rgba(30,127,232,0.55)]" />
      </div>
    )
  }

  return (
    <div
      className="relative mx-auto flex h-[300px] w-full max-w-[380px] items-center justify-center [perspective:1200px] sm:h-[340px] lg:h-[400px]"
      aria-hidden="true"
    >
      {/* Soft ground glow */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 h-16 w-48 -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />

      {/* Outer orbital ring */}
      <motion.div
        className="absolute h-[78%] w-[78%] rounded-full border border-accent/30"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: 68, rotateZ: 360 }}
        transition={{ rotateZ: { duration: 18, repeat: Infinity, ease: 'linear' }, rotateX: { duration: 0 } }}
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_16px_rgba(30,127,232,0.9)]" />
      </motion.div>

      {/* Mid ring — opposite direction */}
      <motion.div
        className="absolute h-[58%] w-[58%] rounded-full border border-navy/20"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: 360, rotateX: -55 }}
        transition={{ rotateY: { duration: 12, repeat: Infinity, ease: 'linear' }, rotateX: { duration: 0 } }}
      >
        <span className="absolute top-1/2 -right-1 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-navy/70" />
      </motion.div>

      {/* Core cube cluster */}
      <motion.div
        className="relative h-36 w-36 sm:h-40 sm:w-40"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: 360, rotateX: [12, 18, 12] }}
        transition={{
          rotateY: { duration: 14, repeat: Infinity, ease: 'linear' },
          rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {/* Cube faces */}
        <div
          className="absolute inset-4 rounded-2xl bg-gradient-to-br from-navy via-[#121826] to-accent shadow-[0_25px_60px_-15px_rgba(10,14,26,0.55)]"
          style={{ transform: 'translateZ(42px)' }}
        />
        <div
          className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-accent/90 to-navy/90"
          style={{ transform: 'rotateY(90deg) translateZ(42px)' }}
        />
        <div
          className="absolute inset-4 rounded-2xl bg-gradient-to-bl from-[#1a2236] to-accent/70"
          style={{ transform: 'rotateY(-90deg) translateZ(42px)' }}
        />
        <div
          className="absolute inset-4 rounded-2xl bg-gradient-to-b from-white/20 to-navy"
          style={{ transform: 'rotateX(90deg) translateZ(42px)' }}
        />
        <div
          className="absolute inset-4 flex items-center justify-center rounded-2xl border border-white/15 bg-[radial-gradient(circle_at_30%_25%,rgba(30,127,232,0.55),#0a0e1a_70%)]"
          style={{ transform: 'translateZ(42px)' }}
        >
          <span className="text-[11px] font-bold tracking-[0.2em] text-white/90 uppercase">AS</span>
        </div>

        {/* Floating mini panels */}
        <motion.div
          className="absolute -top-2 -right-3 h-10 w-14 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm"
          style={{ transform: 'translateZ(70px) rotateY(-18deg)' }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-1 -left-4 h-8 w-12 rounded-lg border border-accent/40 bg-accent/20 backdrop-blur-sm"
          style={{ transform: 'translateZ(64px) rotateY(22deg)' }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
      </motion.div>

      {/* Inner spinning disc */}
      <motion.div
        className="pointer-events-none absolute h-24 w-24 rounded-full border border-dashed border-accent/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
