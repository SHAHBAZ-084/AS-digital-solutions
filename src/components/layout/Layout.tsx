import type { ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import LoadingScreen from '../ui/LoadingScreen'
import PageTransition from '../ui/PageTransition'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-primary text-text">
      <LoadingScreen />
      <Navbar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  )
}
