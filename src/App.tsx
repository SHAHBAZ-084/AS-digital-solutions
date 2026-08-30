import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/ui/ScrollToTop'
import { SiteDataProvider } from './context/SiteDataContext'
import AdminPage from './pages/Admin'
import AdminLoginPage from './pages/AdminLogin'
import CaseStudy from './pages/CaseStudy'
import Home from './pages/Home'

export default function App() {
  return (
    <SiteDataProvider>
      <ScrollToTop />
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
    </SiteDataProvider>
  )
}
