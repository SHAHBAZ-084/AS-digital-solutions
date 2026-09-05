import { lazy, Suspense, useEffect, useState } from 'react'
import Hero from '../components/sections/Hero'
import TrustStrip from '../components/sections/TrustStrip'
import Services from '../components/sections/Services'

const BusinessSoftware = lazy(() => import('../components/sections/BusinessSoftware'))
const Products = lazy(() => import('../components/sections/Products'))
const Industries = lazy(() => import('../components/sections/Industries'))
const WhyUs = lazy(() => import('../components/sections/WhyUs'))
const Technology = lazy(() => import('../components/sections/Technology'))
const Process = lazy(() => import('../components/sections/Process'))
const Team = lazy(() => import('../components/sections/Team'))
const FAQ = lazy(() => import('../components/sections/FAQ'))
const Contact = lazy(() => import('../components/sections/Contact'))

function DeferredSections({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const enable = () => setReady(true)
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(enable, { timeout: 1200 })
      return () => w.cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(enable, 200)
    return () => window.clearTimeout(t)
  }, [])

  if (!ready) return <div className="min-h-[50vh]" aria-hidden="true" />
  return <Suspense fallback={<div className="min-h-[50vh]" aria-hidden="true" />}>{children}</Suspense>
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <DeferredSections>
        <BusinessSoftware />
        <Products />
        <Industries />
        <WhyUs />
        <Technology />
        <Process />
        <FAQ />
        <Team />
        <Contact />
      </DeferredSections>
    </>
  )
}
