import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/ui/ScrollToTop'
import { SiteDataProvider } from './context/SiteDataContext'
import Home from './pages/Home'

const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const AdminPage = lazy(() => import('./pages/Admin'))
const AdminLoginPage = lazy(() => import('./pages/AdminLogin'))

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
