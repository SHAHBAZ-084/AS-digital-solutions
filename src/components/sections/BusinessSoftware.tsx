import EditableText from '../ui/EditableText'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { SectionToneContext } from '../../context/SectionToneContext'

const modules = [
  'POS',
  'Billing',
  'Inventory',
  'Barcode',
  'Sales',
  'Purchases',
  'Customers',
  'Suppliers',
  'Expenses',
  'Income',
  'Accounting',
  'Profit Reports',
  'Business Analytics',
]

export default function BusinessSoftware() {
  return (
    <section id="business-software" className="section-light relative overflow-hidden">
      {/* White/gray shading — heavier on the text side, softer gray on the right */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-[#f5f7fb] via-[48%] to-[#d9e0ea] to-100%" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 from-0% via-white/40 via-[42%] to-transparent to-[75%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#e8edf5]/50 via-transparent to-white/30" />
      </div>

      <SectionToneContext.Provider value="light">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Business Software"
                title="Software Built Around Your Business"
                subtitle="From daily operations to reporting and oversight, business software can be structured around the way your team actually works."
                eyebrowKey="business-software.eyebrow"
                titleKey="business-software.title"
                subtitleKey="business-software.subtitle"
              />

              <ul className="flex flex-wrap gap-x-5 gap-y-3">
                {modules.map((module, index) => (
                  <Reveal key={module} delayMs={index * 25}>
                    <li className="inline-flex items-center gap-2 text-sm font-medium text-navy">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      <EditableText contentKey={`business-software.modules.${index}`}>{module}</EditableText>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            <Reveal delayMs={100}>
              <aside className="border-l-2 border-accent/40 pl-6">
                <EditableText
                  contentKey="business-software.aside.eyebrow"
                  as="p"
                  className="text-xs font-semibold tracking-[0.24em] text-accent uppercase"
                >
                  Offline-first and Online-capable solutions
                </EditableText>
                <EditableText
                  contentKey="business-software.aside.body"
                  as="p"
                  className="text-section-muted mt-4 text-base leading-relaxed"
                >
                  For businesses that cannot rely on uninterrupted internet, software can be designed to continue
                  working locally and sync data when connectivity is available.
                </EditableText>
              </aside>
            </Reveal>
          </div>
        </div>
      </SectionToneContext.Provider>
    </section>
  )
}
