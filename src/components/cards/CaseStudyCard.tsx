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
      <div className="flex aspect-[16/10] items-center justify-center bg-[#f3f6fb] p-5">
        <img
          src={imageSrc}
          alt={project.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="pt-4">
        <p className="text-xs font-semibold tracking-wide text-accent uppercase">{project.type}</p>
        <h3 className="mt-1 text-lg font-bold text-navy">{project.name}</h3>
      </div>
    </article>
  )
}
