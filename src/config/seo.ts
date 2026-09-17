/** Central SEO copy — keep index.html meta/JSON-LD in sync when changing these. */
export const SITE_URL = 'https://asdigitalsolution.online'

export const localSeo = {
  city: 'Chishtian',
  region: 'Punjab',
  country: 'Pakistan',
  countryCode: 'PK',
  /** Approximate city center for LocalBusiness geo (public map data). */
  geo: { latitude: 29.8009, longitude: 72.8577 },
  addressLine: 'Chishtian, Punjab, Pakistan',
  areaServed: ['Chishtian', 'Bahawalnagar', 'Bahawalpur', 'Punjab', 'Pakistan'],
} as const

export const DEFAULT_TITLE = 'Web Development Chishtian | AS Digital Solutions'

export const DEFAULT_DESC =
  'AS Digital Solutions in Chishtian, Punjab builds modern websites, custom business software, desktop apps, and AI tools for local and remote clients across Pakistan.'

/** @deprecated keywords meta is not emitted; kept only for any legacy imports */
export const DEFAULT_KEYWORDS = ''


export const ORGANIZATION_ALT_NAMES = [
  'AS Digital Solutions Chishtian',
  'AS Digital Solution Chishtian',
  'AS Digital Solutions Pakistan',
] as const
