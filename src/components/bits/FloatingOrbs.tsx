import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Lightweight faux-3D floating orbs (no Three.js) for atmosphere.
 * Respects prefers-reduced-motion.
 */
export default function FloatingOrbs({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <div className="absolute -top-16 right-8 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-navy/5 blur-3xl" />
      </div>
    )
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden [perspective:800px] ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute -top-10 right-[8%] h-52 w-52 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(30,127,232,0.35),rgba(30,127,232,0.05)_60%,transparent)] blur-2xl"
        animate={{ y: [0, 28, 0], x: [0, -12, 0], rotateZ: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      />
      <motion.div
        className="absolute top-[40%] -left-8 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(10,14,26,0.12),transparent_70%)] blur-2xl"
        animate={{ y: [0, -22, 0], x: [0, 16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
      <motion.div
        className="absolute bottom-8 right-[22%] h-28 w-28 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-[2px]"
        animate={{
          y: [0, -18, 0],
          rotateX: [0, 25, 0],
          rotateY: [0, -20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        style={{ transformStyle: 'preserve-3d' }}
      />
      <motion.div
        className="absolute top-24 left-[18%] h-3 w-3 rounded-full bg-accent/70 shadow-[0_0_20px_rgba(30,127,232,0.45)]"
        animate={{ y: [0, 40, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-48 right-[30%] h-2 w-2 rounded-full bg-navy/40"
        animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  )
}
