import EditableText from '../ui/EditableText'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { SectionToneContext } from '../../context/SectionToneContext'

const industries = [
  'Retail',
  'Education',
  'Organizations',
  'Startups',
  'Small Businesses',
  'Professional Services',
  'Construction',
  'E-commerce',
  'Institutions',
]

export default function Industries() {
  return (
    <section id="industries" className="section-light relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-[#f6f8fc] via-[50%] to-[#e8eef6] to-100%" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/40" />
      </div>

      <SectionToneContext.Provider value="light">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
          <SectionHeading
            eyebrow="Industries"
            title="Solutions can be customized for industries such as..."
            subtitle="Each business has different workflows, constraints, and priorities. The structure below is ready to map those needs into tailored software or digital products."
            eyebrowKey="industries.eyebrow"
            titleKey="industries.title"
            subtitleKey="industries.subtitle"
          />

          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 xl:grid-cols-4">
            {industries.map((industry, index) => (
              <Reveal key={industry} delayMs={index * 35}>
                <li className="flex items-center gap-3 text-sm font-medium text-navy sm:text-base">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_0_4px_rgba(30,127,232,0.12)]"
                    aria-hidden="true"
                  />
                  <EditableText contentKey={`industries.${index}`}>{industry}</EditableText>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </SectionToneContext.Provider>
    </section>
  )
}
