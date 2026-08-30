import EditableText from '../ui/EditableText'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { SectionToneContext } from '../../context/SectionToneContext'
import industriesPresent from '../../assets/brand/industries-present.webp'

const industries = [
  'Retail', 'Education', 'Organizations', 'Startups', 'Small Businesses', 'Professional Services', 'Construction', 'E-commerce', 'Institutions',
]

export default function Industries() {
  return (
    <section id="industries" className="section-light relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-[#f6f8fc] via-[50%] to-[#e8eef6] to-100%" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/40" />
      </div>

      <SectionToneContext.Provider value="light">
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-10 pb-0 sm:pt-12">
          <div className="grid items-end gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            <div className="pb-8 sm:pb-10 lg:pb-12">
              <SectionHeading
                eyebrow="Industries"
                title="Industries We Serve"
                subtitle="Each business has different workflows, constraints, and priorities. The structure below is ready to map those needs into tailored software or digital products."
                eyebrowKey="industries.eyebrow"
                titleKey="industries.title"
                subtitleKey="industries.subtitle"
              />

              <ul className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
                {industries.map((industry, index) => (
                  <Reveal key={industry} delayMs={index * 30}>
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

            <Reveal delayMs={80} className="relative mx-auto w-full max-w-md self-end lg:max-w-none">
              <img
                src={industriesPresent}
                alt="Professional presenting industries we serve"
                loading="lazy"
                decoding="async"
                className="mx-auto block h-auto w-full max-h-[30rem] object-contain object-bottom lg:max-h-[34rem]"
              />
            </Reveal>
          </div>
        </div>
      </SectionToneContext.Provider>
    </section>
  )
}
