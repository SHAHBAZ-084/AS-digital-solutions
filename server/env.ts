import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomBytes } from 'node:crypto'

function parseEnv(raw: string) {
  const result: Record<string, string> = {}
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    result[key] = value
  }
  return result
}

export function loadEnv() {
  const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '.env')
  if (fs.existsSync(envPath)) {
    const parsed = parseEnv(fs.readFileSync(envPath, 'utf8'))
    for (const [key, value] of Object.entries(parsed)) {
      if (process.env[key] === undefined) process.env[key] = value
    }
  }

  let sessionSecret = process.env.SESSION_SECRET ?? ''
  if (!sessionSecret) {
    sessionSecret = randomBytes(32).toString('hex')
    console.warn(
      '[auth] SESSION_SECRET is not set; using an ephemeral secret. Sessions will reset on restart. Set SESSION_SECRET in server/.env for production.',
)
  }

  const cookieSecure =
    process.env.COOKIE_SECURE === 'true' ||
    process.env.NODE_ENV === 'production'

  return {
    PORT: Number(process.env.PORT || 8787),
    SESSION_SECRET: sessionSecret,
    COOKIE_SECURE: cookieSecure,
    SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    SMTP_PORT: Number(process.env.SMTP_PORT || 465),
    SMTP_SECURE: process.env.SMTP_SECURE !== 'false',
    SMTP_USER: process.env.SMTP_USER || '',
    SMTP_PASS: (process.env.SMTP_PASS || '').replace(/\s+/g, ''),
    CONTACT_TO: process.env.CONTACT_TO || process.env.SMTP_USER || '',
    CONTACT_FROM: process.env.CONTACT_FROM || process.env.SMTP_USER || '',
  }
}
