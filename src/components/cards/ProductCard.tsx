import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { getPlaceholderForType } from '../../lib/projectPlaceholders'
import ImageReveal from '../ui/ImageReveal'

interface ProductCardProps {
  project: Project
}

export default function ProductCard({ project }: ProductCardProps) {
  const imageSrc = project.screenshots[0] || getPlaceholderForType(project.type)

  const plateBg: Record<string, string> = {
    'crown-ev-center': 'bg-black',
    'citynest-services': 'bg-[#01153d]',
    'serve-and-lead-society': 'bg-black',
    'sheraz-traders-desktop': 'bg-[#133f2c]',
    'usman-mall-desktop': 'bg-white',
    'sufi-co-grain-market-desktop': 'bg-[#00153d]',
  }
  const plate = plateBg[project.slug]
  const isPlate = Boolean(plate)
  const plateFill = project.slug === 'citynest-services'

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden border border-white/12 bg-ink/40 transition-[border-color] duration-200 hover:border-canal/50`}
    >
      <Link to={`/case-study/${project.slug}`} className="flex min-h-0 flex-1 flex-col">
        <ImageReveal className="overflow-hidden">
          <div
            className={`flex aspect-[16/10] items-center justify-center overflow-hidden ${
              isPlate ? `${plate} ${plateFill ? 'p-0' : 'p-5 sm:p-7'}` : 'bg-[#0a1224] p-5 sm:p-6'
            }`}
          >
            <img
              src={imageSrc}
              alt={`${project.name} screenshot`}
              width={640}
              height={400}
              loading="lazy"
              decoding="async"
              className={
                isPlate
                  ? plateFill
                    ? 'h-full w-full object-cover'
                    : 'max-h-full max-w-full object-contain'
                  : 'max-h-full max-w-full object-contain'
              }
            />
          </div>
        </ImageReveal>

        <div className="flex flex-1 flex-col px-5 pt-5 pb-2 sm:px-6">
          <p className="text-[11px] font-medium text-canal">
            <span>{project.type}</span>
            <span className="mx-1.5 text-cotton/25">·</span>
            <span className="text-cotton/55">{project.industry}</span>
          </p>
          <h3 className="mt-2 text-xl leading-snug font-bold text-cotton transition group-hover:text-canal">
            {project.name}
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-cotton/60">
            {project.description}
          </p>
        </div>
      </Link>

      <div className="mt-auto flex flex-wrap gap-2 border-t border-white/10 px-5 py-4 sm:px-6">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-canal px-4 py-2 text-sm font-semibold text-white transition hover:bg-canal-lo"
            onClick={(event) => event.stopPropagation()}
          >
            Live view
          </a>
        ) : null}
        <Link
          to={`/case-study/${project.slug}`}
          className="inline-flex items-center border border-white/20 px-4 py-2 text-sm font-semibold text-cotton transition hover:border-canal hover:text-canal"
        >
          View case study
        </Link>
      </div>
    </article>
  )
}
