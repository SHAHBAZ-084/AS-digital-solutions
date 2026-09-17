import SectionHeading from '../ui/SectionHeading'
import { SectionToneContext } from '../../context/SectionToneContext'
import { useSiteData } from '../../context/SiteDataContext'
import processLightbulb from '../../assets/brand/process-lightbulb.webp'

export default function Process() {
  const { process } = useSiteData()
  const steps = process.steps
  const count = Math.max(steps.length, 1)

  return (
    <section id="process" className="section-light relative overflow-hidden bg-bg-primary">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-[#f4f8fe] to-[#e8eef6]" />
      </div>

      <SectionToneContext.Provider value="light">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
          <SectionHeading
            eyebrow={process.eyebrow}
            title={process.title}
            subtitle={process.subtitle}
            eyebrowKey="process.eyebrow"
            titleKey="process.title"
            subtitleKey="process.subtitle"
          />

          <div className="mt-4 grid items-center gap-10 lg:grid-cols-2 lg:gap-10">
            {/* Left: entire process arranged on a perfect circle */}
            <div className="relative mx-auto aspect-square w-full max-w-[32rem]">
              <div
                className="pointer-events-none absolute inset-[12%] rounded-full border-2 border-accent/25"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-[22%] rounded-full border border-dashed border-accent/20"
                aria-hidden="true"
              />
              <div className="absolute inset-[32%] flex items-center justify-center rounded-full bg-accent/10 text-center ring-1 ring-accent/20">
                <div>
                  <p className="text-sm font-medium text-accent">Process</p>
                  <p className="num text-section mt-1 text-sm font-bold sm:text-base">{count} steps</p>
                </div>
              </div>

              <ol className="absolute inset-0">
                {steps.map((step, index) => {
                  const angle = (index / count) * Math.PI * 2 - Math.PI / 2
                  const radius = 38
                  const x = 50 + radius * Math.cos(angle)
                  const y = 50 + radius * Math.sin(angle)

                  return (
                    <li
                      key={step.id}
                      className="absolute"
                      style={{
                        left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', }}
                    >
                      <div className="border border-line bg-cotton px-3 py-2 text-center shadow-[0_8px_22px_rgba(18,32,58,0.08)] sm:px-3.5">
                        <p className="num text-[10px] font-semibold text-canal sm:text-[11px]">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <p className="text-section mt-0.5 text-xs font-semibold whitespace-nowrap sm:text-sm">
                          {step.title}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* Right: vertical rectangle, bottom empty space cropped */}
            <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-[24rem]">
              <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-[#06122a] shadow-[0_20px_50px_rgba(10,14,26,0.18)] ring-1 ring-[rgba(10,14,26,0.08)]">
                <img
                  src={processLightbulb}
                  alt="Creative process lightbulb illustration"
                  width={480}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[center_12%]"
                />
              </div>
            </div>
          </div>
        </div>
      </SectionToneContext.Provider>
    </section>
  )
}
