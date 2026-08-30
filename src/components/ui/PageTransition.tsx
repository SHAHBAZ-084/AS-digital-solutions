import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { pageVariants, shortTransition } from '../../lib/motion'

export default function PageTransition() {
  const location = useLocation()
  const outlet = useOutlet()
  const reduced = useReducedMotion()

  if (reduced) {
    return <div key={location.pathname}>{outlet}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={shortTransition}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  )
}
