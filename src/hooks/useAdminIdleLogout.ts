import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutAdmin } from '../lib/siteApi'

/** Match server sliding session TTL in server/auth.ts */
export const ADMIN_IDLE_MS = 15 * 60 * 1000

/**
 * Logs the admin out after 15 minutes with no mouse/keyboard/touch activity.
 */
export function useAdminIdleLogout(enabled = true) {
  const navigate = useNavigate()
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) return

    let cancelled = false

    const logout = () => {
      void logoutAdmin().finally(() => {
        if (cancelled) return
        navigate('/admin/login', { replace: true, state: { reason: 'idle' } })
      })
    }

    const reset = () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(logout, ADMIN_IDLE_MS)
    }

    let lastBump = 0
    const onActivity = () => {
      const now = Date.now()
      if (now - lastBump < 1000) return
      lastBump = now
      reset()
    }

    const events: Array<keyof WindowEventMap> = [
      'mousemove',
      'mousedown',
      'keydown',
      'touchstart',
      'scroll',
      'click',
      'wheel',
    ]
    for (const event of events) {
      window.addEventListener(event, onActivity, { passive: true })
    }
    reset()

    return () => {
      cancelled = true
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      for (const event of events) {
        window.removeEventListener(event, onActivity)
      }
    }
  }, [enabled, navigate])
}
