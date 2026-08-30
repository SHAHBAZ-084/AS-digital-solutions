import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { defaultContact } from '../config/site'
import { defaultFooter } from '../config/footer'
import { defaultProcess, defaultWhyUs } from '../config/pages'
import { services as fallbackServices } from '../data/services'
import { teamMembers as fallbackTeam } from '../data/team'
import { technologies as fallbackTechnologies } from '../data/technologies'
import { fetchSiteContent } from '../lib/siteApi'
import { productFromApi, projectsToProductItems } from '../lib/productMap'
import type {
  ContactInfo,
  ProductItem,
  Service,
  SiteContent,
  TeamMember,
  Technology,
} from '../types/siteContent'

const fallbackProducts = projectsToProductItems()

interface SiteDataValue extends SiteContent {
  refresh: () => Promise<void>
}

const SiteDataContext = createContext<SiteDataValue | null>(null)

function pickList<T>(value: T[] | undefined, fallback: T[]) {
  return value && value.length > 0 ? value : fallback
}

function normalizeProducts(value: ProductItem[] | undefined) {
  if (!value || value.length === 0) return fallbackProducts
  return value.map((item) => productFromApi(item))
}

function applyPayload(next: Partial<SiteContent>): SiteContent {
  return {
    services: pickList(next.services, fallbackServices),
    products: normalizeProducts(next.products),
    team: pickList(next.team, fallbackTeam),
    technologies: pickList(next.technologies, fallbackTechnologies),
    contact: next.contact ?? defaultContact,
    footer: next.footer ?? defaultFooter,
    why_us: next.why_us ?? defaultWhyUs,
    process: next.process ?? defaultProcess,
  }
}

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteContent>({
    services: fallbackServices,
    products: fallbackProducts,
    team: fallbackTeam,
    technologies: fallbackTechnologies,
    contact: defaultContact,
    footer: defaultFooter,
    why_us: defaultWhyUs,
    process: defaultProcess,
  })

  const refresh = useCallback(async () => {
    const next = await fetchSiteContent()
    setData(applyPayload(next))
  }, [])

  useEffect(() => {
    let active = true
    const load = () => {
      void fetchSiteContent().then((next) => {
        if (!active) return
        setData(applyPayload(next))
      })
    }
    load()
    window.addEventListener('focus', load)
    return () => {
      active = false
      window.removeEventListener('focus', load)
    }
  }, [])

  const value = useMemo(
    () => ({
      ...data,
      refresh,
    }),
    [data, refresh],
  )

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

export function useSiteData() {
  const value = useContext(SiteDataContext)
  if (!value) {
    throw new Error('useSiteData must be used within SiteDataProvider')
  }
  return value
}

export type { ContactInfo, ProductItem, Service, TeamMember, Technology }
