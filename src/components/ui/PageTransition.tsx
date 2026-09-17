import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { easeOutExpo } from '../../lib/motion'

/** Subtle route enter/exit — skipped when reduced motion is preferred. */
export default function PageTransition() {
  const location = useLocation()
  const outlet = useOutlet()
  const reduced = useReducedMotion()

  if (reduced) {
    return <div key={location.pathname}>{outlet}</div>
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.32, ease: easeOutExpo }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  )
}
