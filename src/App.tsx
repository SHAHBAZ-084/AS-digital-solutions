import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/ui/ScrollToTop'
import { SiteDataProvider } from './context/SiteDataContext'
import Home from './pages/Home'
import { NestedContentRoute, StaticContentRoute } from './pages/ContentRoutes'

const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const AdminPage = lazy(() => import('./pages/Admin'))
const AdminLoginPage = lazy(() => import('./pages/AdminLogin'))
const WebsiteCostCalculator = lazy(() => import('./pages/WebsiteCostCalculator'))

function RouteFallback() {
  return <div className="min-h-[40vh] bg-bg-primary" aria-hidden="true" />
}

export default function App() {
  return (
    <SiteDataProvider>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<StaticContentRoute path="/about" />} />
            <Route path="contact" element={<StaticContentRoute path="/contact" />} />
            <Route path="pricing" element={<StaticContentRoute path="/pricing" />} />
            <Route path="portfolio" element={<StaticContentRoute path="/portfolio" />} />
            <Route path="services" element={<StaticContentRoute path="/services" />} />
            <Route path="services/:slug" element={<NestedContentRoute base="services" />} />
            <Route path="locations" element={<StaticContentRoute path="/locations" />} />
            <Route path="locations/:slug" element={<NestedContentRoute base="locations" />} />
            <Route path="industries" element={<StaticContentRoute path="/industries" />} />
            <Route path="industries/:slug" element={<NestedContentRoute base="industries" />} />
            <Route path="blog" element={<StaticContentRoute path="/blog" />} />
            <Route path="blog/:slug" element={<NestedContentRoute base="blog" />} />
            <Route path="tools/website-cost-calculator" element={<WebsiteCostCalculator />} />
            <Route path="case-study/:slug" element={<CaseStudy />} />
          </Route>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </SiteDataProvider>
  )
}
