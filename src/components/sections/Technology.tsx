import TechnologyCard from '../cards/TechnologyCard'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { SectionToneContext } from '../../context/SectionToneContext'
import { useSiteData } from '../../context/SiteDataContext'
import type { Technology } from '../../data/technologies'

const categories: Technology['category'][] = ['Frontend', 'Backend', 'Database', 'Desktop', 'AI/ML']

export default function Technology() {
  const { technologies } = useSiteData()

  return (
    <section id="technology" className="section-light relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-[#f7f9fc] via-[45%] to-[#e9eef6] to-100%" />
      </div>

      <SectionToneContext.Provider value="light">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
          <SectionHeading
            eyebrow="Technology"
            title="Modern tools, selected for the right job"
            subtitle="The stack can vary by project, but these are core technologies commonly used across web, software, and AI-focused solutions."
            eyebrowKey="technology.eyebrow"
            titleKey="technology.title"
            subtitleKey="technology.subtitle"
          />

          <div className="space-y-9">
            {categories.map((category) => {
              const items = technologies.filter((technology) => technology.category === category)
              if (items.length === 0) return null

              return (
                <div key={category}>
                  <h3 className="text-section mb-4 text-xl font-bold sm:text-2xl">{category}</h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                    {items.map((technology, index) => (
                      <Reveal key={technology.id} delayMs={index * 35}>
                        <TechnologyCard technology={technology} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </SectionToneContext.Provider>
    </section>
  )
}
