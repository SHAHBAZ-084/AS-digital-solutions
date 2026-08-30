import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { fetchAdminMe, loginAdmin } from '../lib/siteApi'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(true)
  const [alreadyIn, setAlreadyIn] = useState(false)

  useEffect(() => {
    let active = true
    fetchAdminMe().then((me) => {
      if (!active) return
      setAlreadyIn(Boolean(me))
      setChecking(false)
    })
    return () => {
      active = false
    }
  }, [])

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F7FB] text-sm text-slate-500">
        Loading…
      </div>
    )
  }

  if (alreadyIn) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const username = (form.elements.namedItem('username') as HTMLInputElement).value.trim()
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    setBusy(true)
    setError('')
    try {
      await loginAdmin(username, password)
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(
        err instanceof Error && err.message === 'invalid'
          ? 'Incorrect username or password.'
          : err instanceof Error && err.message === 'locked'
            ? 'Too many failed attempts. Try again in 15 minutes.'
            : 'Could not reach the server. Make sure the API is running.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F7FB] px-4">
      <form
        onSubmit={(event) => {
          void onSubmit(event)
        }}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <p className="text-[11px] font-semibold tracking-[0.22em] text-slate-400 uppercase">AS Digital</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-navy">Admin login</h1>
        <p className="mt-2 text-sm text-slate-500">Sign in to manage site content.</p>

        <label className="mt-6 block">
          <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Username
          </span>
          <input
            name="username"
            type="text"
            autoComplete="username"
            required
            disabled={busy}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Password
          </span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={busy}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {busy ? 'Signing in…' : 'Sign in'}
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          <Link to="/" className="text-accent hover:underline">
            Back to website
          </Link>
        </p>
      </form>
    </div>
  )
}
