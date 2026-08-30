import ServiceCard from '../cards/ServiceCard'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SectionShell from '../ui/SectionShell'
import { useSiteData } from '../../context/SiteDataContext'
import servicesOffice from '../../assets/brand/services-office.png'

export default function Services() {
  const { services } = useSiteData()

  return (
    <SectionShell id="services" texture={servicesOffice} textureOpacity={0.78} showEdge={false}>
      <SectionHeading
        eyebrow="Services"
        title="End-to-end solutions, built to last"
        subtitle="Choose a category to see how we deliver practical engineering with long-term support."
        eyebrowKey="services.eyebrow"
        titleKey="services.title"
        subtitleKey="services.subtitle"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => (
          <Reveal key={service.id} delayMs={index * 80} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
