import { useParams } from 'react-router-dom'
import { getPageByPath } from '../content/registry'
import ContentPageView from './ContentPage'
import ServicesHub from './ServicesHub'
import Seo from '../components/seo/Seo'

function MissingPage({ path }: { path: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <Seo title="Page Not Found | AS Digital" description="This page is not available." path={path} noindex />
      <h1 className="text-2xl font-bold text-navy">Page not found</h1>
      <p className="mt-3 text-text-muted">The requested URL does not match a published content page.</p>
    </section>
  )
}

export function StaticContentRoute({ path }: { path: string }) {
  const page = getPageByPath(path)
  if (!page) return <MissingPage path={path} />
  if (path === '/services') return <ServicesHub page={page} />
  return <ContentPageView page={page} />
}

export function NestedContentRoute({ base }: { base: string }) {
  const { slug } = useParams<{ slug: string }>()
  const path = `/${base}/${slug ?? ''}`
  const page = getPageByPath(path)
  if (!page) return <MissingPage path={path} />
  return <ContentPageView page={page} />
}
