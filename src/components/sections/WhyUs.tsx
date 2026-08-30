import AnimatedIcon from '../ui/AnimatedIcon'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SectionShell from '../ui/SectionShell'
import { useSiteData } from '../../context/SiteDataContext'

function ShieldIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path d="M12 3 5 6v5c0 4.5 2.7 7.9 7 10 4.3-2.1 7-5.5 7-10V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m9.5 12 1.7 1.7 3.3-3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function WhyUs() {
  const { why_us } = useSiteData()

  return (
    <SectionShell id="why-us" showEdge={false}>
      <SectionHeading
        eyebrow={why_us.eyebrow}
        title={why_us.title}
        subtitle={why_us.subtitle}
        eyebrowKey="why-us.eyebrow"
        titleKey="why-us.title"
        subtitleKey="why-us.subtitle"
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
        {why_us.items.map((reason, index) => (
          <Reveal key={reason.id} delayMs={index * 60}>
            <article className="flex flex-col items-start">
              <AnimatedIcon className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/20">
                <ShieldIcon />
              </AnimatedIcon>
              <h3 className="text-section mt-5 text-lg font-bold">{reason.title}</h3>
              <p className="text-section-muted mt-2 text-sm leading-relaxed">{reason.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
