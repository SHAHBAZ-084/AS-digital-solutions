import EditableText from '../ui/EditableText'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { SectionToneContext } from '../../context/SectionToneContext'

const modules = [
  'POS', 'Billing', 'Inventory', 'Barcode', 'Sales', 'Purchases', 'Customers', 'Suppliers', 'Expenses', 'Income', 'Accounting', 'Profit Reports', 'Business Analytics',
]

export default function BusinessSoftware() {
  return (
    <section id="business-software" className="section-light relative overflow-hidden">
      {/* White/gray shading: heavier on the text side, softer gray on the right */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-[#f5f7fb] via-[48%] to-[#d9e0ea] to-100%" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 from-0% via-white/40 via-[42%] to-transparent to-[75%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#e8edf5]/50 via-transparent to-white/30" />
      </div>

      <SectionToneContext.Provider value="light">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
          <SectionHeading
            eyebrow="Business Software"
            title="Software Built Around Your Business"
            subtitle="From daily operations to reporting and oversight, business software can be structured around the way your team actually works."
            eyebrowKey="business-software.eyebrow"
            titleKey="business-software.title"
            subtitleKey="business-software.subtitle"
            subtitleClassName="max-w-4xl text-base leading-relaxed sm:text-lg"
          />

          <ul className="flex max-w-5xl flex-wrap gap-x-6 gap-y-3.5">
            {modules.map((module, index) => (
              <Reveal key={module} delayMs={index * 25}>
                <li className="inline-flex items-center gap-2 text-sm font-medium text-navy sm:text-[0.95rem]">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <EditableText contentKey={`business-software.modules.${index}`}>{module}</EditableText>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </SectionToneContext.Provider>
    </section>
  )
}
