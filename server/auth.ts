import { createHmac, timingSafeEqual } from 'node:crypto'
import type { CookieOptions, Request, Response } from 'express'

export const SESSION_COOKIE = 'as_admin_session'
/** Idle / sliding session lifetime */
export const SESSION_TTL_MS = 15 * 60 * 1000

export interface SessionPayload {
  username: string
  exp: number
}

function b64url(input: string | Buffer) {
  return Buffer.from(input).toString('base64url')
}

function sign(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export function createSessionToken(username: string, secret: string) {
  const body = b64url(JSON.stringify({ u: username, exp: Date.now() + SESSION_TTL_MS }))
  return `${body}.${sign(body, secret)}`
}

export function verifySessionToken(token: string, secret: string): SessionPayload | null {
  const [body, sig] = token.split('.')
  if (!body || !sig) return null
  const expected = sign(body, secret)
  const left = Buffer.from(sig)
  const right = Buffer.from(expected)
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null
  try {
    const parsed = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as {
      u?: unknown
      exp?: unknown
    }
    if (typeof parsed.u !== 'string' || typeof parsed.exp !== 'number') return null
    if (parsed.exp < Date.now()) return null
    return { username: parsed.u, exp: parsed.exp }
  } catch {
    return null
  }
}

export function sessionCookieOptions(secure: boolean): CookieOptions {
  return {
    httpOnly: true, secure, sameSite: 'lax', path: '/', maxAge: SESSION_TTL_MS, }
}

export function clearSessionCookie(res: Response, secure: boolean) {
  res.clearCookie(SESSION_COOKIE, {
    httpOnly: true, secure, sameSite: 'lax', path: '/', })
}

/** Extend the session cookie (sliding expiry on activity). */
export function touchSession(res: Response, username: string, secret: string, secure: boolean) {
  const token = createSessionToken(username, secret)
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions(secure))
}

export function readSession(req: Request, secret: string): SessionPayload | null {
  const raw = req.cookies?.[SESSION_COOKIE]
  if (typeof raw !== 'string' || !raw) return null
  return verifySessionToken(raw, secret)
}

/** Failed-login lockout: 5 fails → 15 minutes per IP */
const FAIL_LIMIT = 5
const LOCKOUT_MS = 15 * 60 * 1000
const failState = new Map<string, { fails: number; lockedUntil: number }>()

export function isLoginLocked(ip: string) {
  const state = failState.get(ip)
  if (!state) return false
  if (state.lockedUntil > Date.now()) return true
  if (state.lockedUntil > 0 && state.lockedUntil <= Date.now()) {
    failState.delete(ip)
    return false
  }
  return false
}

export function recordLoginFailure(ip: string) {
  const state = failState.get(ip) ?? { fails: 0, lockedUntil: 0 }
  if (state.lockedUntil > Date.now()) return
  state.fails += 1
  if (state.fails >= FAIL_LIMIT) {
    state.lockedUntil = Date.now() + LOCKOUT_MS
    state.fails = 0
  }
  failState.set(ip, state)
}

export function clearLoginFailures(ip: string) {
  failState.delete(ip)
}

export function lockoutRemainingMs(ip: string) {
  const state = failState.get(ip)
  if (!state || state.lockedUntil <= Date.now()) return 0
  return state.lockedUntil - Date.now()
}
