import { useLocation, useOutlet } from 'react-router-dom'

/** Outlet only — route animations removed to cut main-thread work on first paint. */
export default function PageTransition() {
  const location = useLocation()
  const outlet = useOutlet()
  return <div key={location.pathname}>{outlet}</div>
}
