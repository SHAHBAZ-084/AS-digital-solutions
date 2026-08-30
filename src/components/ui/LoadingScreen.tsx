import { useEffect, useState } from 'react'
import logo from '../../assets/brand/white-logo.png'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const SESSION_KEY = 'as-ds-loaded'

function LoadingScreenAnimated() {
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== '1'
    } catch {
      return true
    }
  })

  useEffect(() => {
    if (!visible) return

    const hide = () => {
      setVisible(false)
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        /* ignore */
      }
    }

    const cap = window.setTimeout(hide, 220)
    const onLoad = () => {
      window.setTimeout(hide, 60)
    }

    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })

    return () => {
      window.clearTimeout(cap)
      window.removeEventListener('load', onLoad)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy">
      <img
        src={logo}
        alt=""
        className="h-16 w-auto max-w-[280px] object-contain animate-[logo-pulse_0.9s_ease-in-out_infinite]"
      />
    </div>
  )
}

export default function LoadingScreen() {
  const reduced = useReducedMotion()

  if (reduced) return null

  return <LoadingScreenAnimated />
}
