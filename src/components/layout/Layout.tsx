import Footer from './Footer'
import Navbar from './Navbar'
import FloatingWhatsApp from '../ui/FloatingWhatsApp'
import PageTransition from '../ui/PageTransition'
import ScrollToTopButton from '../ui/ScrollToTopButton'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-primary text-text">
      <a
        href="#main"
        className="bg-ink text-cotton focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-canal sr-only focus:not-sr-only"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <PageTransition />
      </main>
      <Footer />
      <ScrollToTopButton />
      <FloatingWhatsApp />
    </div>
  )
}
