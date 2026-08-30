import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Project } from '../../data/projects'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getPlaceholderForType } from '../../lib/projectPlaceholders'
import ImageReveal from '../ui/ImageReveal'

interface ProductCardProps {
  project: Project
}

export default function ProductCard({ project }: ProductCardProps) {
  const reduced = useReducedMotion()
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

  const card = (
    <>
      <Link to={`/case-study/${project.slug}`} className="flex min-h-0 flex-1 flex-col">
        <ImageReveal className="overflow-hidden">
          <div
            className={`flex aspect-[16/10] items-center justify-center overflow-hidden ${
              isPlate ? `${plate} ${plateFill ? 'p-0' : 'p-5 sm:p-7'}` : 'bg-[#f3f6fb] p-5 sm:p-6'
            }`}
          >
            <img
              src={imageSrc}
              alt={project.name}
              loading="lazy"
              decoding="async"
              className={
                isPlate
                  ? plateFill
                    ? 'h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]'
                    : 'max-h-full max-w-full object-contain transition duration-300 group-hover:scale-[1.02]'
                  : 'max-h-full max-w-full object-contain transition duration-300 group-hover:scale-[1.02]'
              }
            />
          </div>
        </ImageReveal>

        <div className="flex flex-1 flex-col px-5 pt-5 pb-2 sm:px-6">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
            <span>{project.type}</span>
            <span className="mx-1.5 text-accent/35">·</span>
            <span>{project.industry}</span>
          </p>
          <h3 className="text-section mt-2 text-xl leading-snug font-bold transition group-hover:text-accent">
            {project.name}
          </h3>
          <p className="text-section-muted mt-2 line-clamp-3 flex-1 text-sm leading-relaxed">
            {project.description}
          </p>
        </div>
      </Link>

      <div className="mt-auto flex flex-wrap gap-2 border-t border-[rgba(10,14,26,0.06)] px-5 py-4 sm:px-6">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95"
            onClick={(event) => event.stopPropagation()}
          >
            Live View
          </a>
        ) : null}
        <Link
          to={`/case-study/${project.slug}`}
          className="btn-shine inline-flex items-center rounded-full border border-accent/40 px-4 py-2 text-sm font-semibold text-section transition hover:bg-accent hover:text-white"
        >
          View Case Study
        </Link>
      </div>
    </>
  )

  const surface =
    'group flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(10,14,26,0.08)] bg-white/92 shadow-[0_10px_30px_rgba(10,14,26,0.08)] backdrop-blur-sm transition duration-300 hover:border-accent/25 hover:shadow-[0_16px_36px_rgba(30,127,232,0.14)]'

  if (reduced) {
    return <article className={`${surface} hover:-translate-y-1`}>{card}</article>
  }

  return (
    <motion.article
      className={surface}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
    >
      {card}
    </motion.article>
  )
}
