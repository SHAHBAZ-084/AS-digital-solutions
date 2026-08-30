import BusinessSoftware from '../components/sections/BusinessSoftware'
import Contact from '../components/sections/Contact'
import FAQ from '../components/sections/FAQ'
import Hero from '../components/sections/Hero'
import Industries from '../components/sections/Industries'
import Process from '../components/sections/Process'
import Products from '../components/sections/Products'
import Services from '../components/sections/Services'
import Team from '../components/sections/Team'
import TrustStrip from '../components/sections/TrustStrip'
import Technology from '../components/sections/Technology'
import WhyUs from '../components/sections/WhyUs'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <BusinessSoftware />
      <Products />
      <Industries />
      <WhyUs />
      <Technology />
      <Process />
      <Team />
      <FAQ />
      <Contact />
    </>
  )
}
