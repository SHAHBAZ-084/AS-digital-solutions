import Footer from './Footer'
import Navbar from './Navbar'
import FloatingWhatsApp from '../ui/FloatingWhatsApp'
import LoadingScreen from '../ui/LoadingScreen'
import PageTransition from '../ui/PageTransition'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-primary text-text">
      <LoadingScreen />
      <Navbar />
      <main className="flex-1">
        <PageTransition />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
