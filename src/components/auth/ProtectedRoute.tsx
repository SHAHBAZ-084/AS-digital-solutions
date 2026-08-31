import { useEffect, useState, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAdminIdleLogout } from '../../hooks/useAdminIdleLogout'
import { fetchAdminMe } from '../../lib/siteApi'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [state, setState] = useState<'loading' | 'ok' | 'denied'>('loading')

  useEffect(() => {
    let active = true
    fetchAdminMe().then((me) => {
      if (!active) return
      setState(me ? 'ok' : 'denied')
    })
    return () => {
      active = false
    }
  }, [location.pathname])

  useAdminIdleLogout(state === 'ok')

  if (state === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7FB] text-sm text-slate-500">
        Checking session…
      </div>
    )
  }

  if (state === 'denied') {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return children
}
