import type { Project } from '../../data/projects'
import { getPlaceholderForType } from '../../lib/projectPlaceholders'

interface CaseStudyCardProps {
  project: Project
}

/** Lightweight case-study teaser; uses the same type-based image fallback as ProductCard. */
export default function CaseStudyCard({ project }: CaseStudyCardProps) {
  const imageSrc = project.screenshots[0] || getPlaceholderForType(project.type)

  return (
    <article className="overflow-hidden rounded-xl">
      <img src={imageSrc} alt={project.name} className="aspect-[16/10] w-full object-cover" />
      <div className="pt-4">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">{project.type}</p>
        <h3 className="mt-1 text-lg font-bold text-navy">{project.name}</h3>
      </div>
    </article>
  )
}
