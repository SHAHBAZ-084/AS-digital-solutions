import { defaultContact, siteConfig } from '../config/site'
import type { SiteContent } from '../types/siteContent'

function apiUrl(path: string) {
  const base = siteConfig.apiBaseUrl.replace(/\/$/, '')
  return `${base}${path}`
}

function fetchFast(path: string, init?: RequestInit, ms = 2000) {
  return fetch(apiUrl(path), {
    ...init,
    credentials: 'include',
    signal: AbortSignal.timeout(ms),
  })
}

async function readJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetchFast(path)
    if (!response.ok) return null
    return (await response.json()) as T
  } catch {
    return null
  }
}

export async function fetchSiteContent(): Promise<Partial<SiteContent>> {
  const data = await readJson<Partial<SiteContent>>('/api/site')
  return data ?? {}
}

export async function loginAdmin(username: string, password: string) {
  let response: Response
  try {
    response = await fetchFast(
      '/api/admin/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      },
      4000,
    )
  } catch {
    throw new Error('unavailable')
  }

  if (response.status === 429) {
    throw new Error('locked')
  }
  if (response.status === 401) {
    throw new Error('invalid')
  }
  if (!response.ok) {
    throw new Error('unavailable')
  }
  return (await response.json()) as { username: string }
}

export async function logoutAdmin() {
  try {
    await fetchFast('/api/admin/logout', { method: 'POST' }, 3000)
  } catch {
    // ignore network errors on logout
  }
}

export async function fetchAdminMe() {
  try {
    const response = await fetchFast('/api/admin/me', undefined, 3000)
    if (!response.ok) return null
    return (await response.json()) as { username: string }
  } catch {
    return null
  }
}

async function sendWrite(path: string, method: string, body?: unknown) {
  const response = await fetchFast(
    path,
    {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    },
    4000,
  )
  if (response.status === 401) throw new Error('unauthorized')
  if (!response.ok) throw new Error('save-failed')
  return response.json() as Promise<unknown>
}

export async function fetchSettings() {
  const response = await fetchFast('/api/admin/settings')
  if (!response.ok) throw new Error('settings-failed')
  const data = (await response.json()) as { username?: string }
  return { username: data.username ?? '' }
}

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  const response = await fetchFast(
    '/api/admin/password',
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    },
    4000,
  )
  if (response.status === 401) throw new Error('invalid')
  if (response.status === 400) throw new Error('invalid')
  if (!response.ok) throw new Error('save-failed')
}

export async function uploadImage(file: File) {
  const body = new FormData()
  body.append('file', file)
  const response = await fetchFast(
    '/api/upload',
    {
      method: 'POST',
      body,
    },
    8000,
  )
  if (response.status === 401) throw new Error('unauthorized')
  if (!response.ok) {
    throw new Error(response.status === 413 ? 'too-large' : 'upload-failed')
  }
  const data = (await response.json()) as { url?: string }
  if (!data.url) throw new Error('upload-failed')
  return data.url
}

export const siteApi = {
  create: (resource: string, body: unknown) => sendWrite(`/api/${resource}`, 'POST', body),
  update: (resource: string, id: string, body: unknown) =>
    sendWrite(`/api/${resource}/${encodeURIComponent(id)}`, 'PUT', body),
  remove: (resource: string, id: string) =>
    sendWrite(`/api/${resource}/${encodeURIComponent(id)}`, 'DELETE'),
  updateContact: (body: unknown) => sendWrite('/api/contact', 'PUT', body),
  updateFooter: (body: unknown) => sendWrite('/api/footer', 'PUT', body),
  updateWhyUs: (body: unknown) => sendWrite('/api/why-us', 'PUT', body),
  updateProcess: (body: unknown) => sendWrite('/api/process', 'PUT', body),
}

export { defaultContact }
