import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Service } from '../../data/services'
import { useSectionTone } from '../../context/SectionToneContext'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cardSurfaceClass } from '../../lib/cardStyles'
import AnimatedIcon from '../ui/AnimatedIcon'
import EditableText from '../ui/EditableText'
import TiltCard from '../ui/TiltCard'

function CardIcon({ children }: { children: ReactNode }) {
  return (
    <AnimatedIcon className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white shadow-sm ring-1 ring-white/25">
      {children}
    </AnimatedIcon>
  )
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ServiceSvg({ icon }: { icon: Service['icon'] }) {
  const common = {
    viewBox: '0 0 24 24', fill: 'none', className: 'h-5 w-5', }

  switch (icon) {
    case 'web':
      return (
        <svg {...common}>
          <path d="M4 7h16M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M8 11h.01M12 11h.01M16 11h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    case 'business':
      return (
        <svg {...common}>
          <path d="M4 20V9l8-5 8 5v11" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      )
    case 'ai':
      return (
        <svg {...common}>
          <path d="M9 9h6v6H9V9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M4 12h3M17 12h3M12 4v3M12 17v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7.5 7.5l2 2M15.5 15.5l2 2M16.5 7.5l-2 2M8.5 15.5l-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'custom':
      return (
        <svg {...common}>
          <path d="M20 12v4a2 2 0 0 1-2 2h-4M4 12V8a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M12 12v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'consultancy':
      return (
        <svg {...common}>
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M7.5 9.5h9M7.5 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'offline':
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 0 1 16 0M7 12a5 5 0 0 1 10 0M10 12a2 2 0 0 1 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 16v4M9 21h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M4 7h16M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      )
  }
}

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const tone = useSectionTone()
  const reduced = useReducedMotion()

  const body = (
    <>
      <div className="flex items-center gap-3 bg-accent px-6 py-5">
        <CardIcon>
          <ServiceSvg icon={service.icon} />
        </CardIcon>
        <EditableText
          contentKey={`services.${service.id}.title`}
          as="h3"
          className="text-lg leading-snug font-bold text-white"
        >
          {service.title}
        </EditableText>
      </div>
      <div className="p-6">
        <EditableText
          contentKey={`services.${service.id}.description`}
          as="p"
          className="text-section-muted text-sm leading-relaxed"
        >
          {service.description}
        </EditableText>
        <ul className="mt-4 space-y-2.5">
          {service.features.filter(Boolean).map((feature, index) => (
            <li key={`${service.id}-${index}`} className="flex items-start gap-2.5">
              <CheckIcon />
              <EditableText
                contentKey={`services.${service.id}.features.${index}`}
                className="text-section-muted text-sm"
              >
                {feature}
              </EditableText>
            </li>
          ))}
        </ul>
      </div>
    </>
  )

  if (reduced) {
    return (
      <TiltCard className="h-full">
        <article className={`h-full ${cardSurfaceClass(tone)}`} data-interactive="true">
          {body}
        </article>
      </TiltCard>
    )
  }

  return (
    <TiltCard className="h-full">
      <motion.article
        className={`h-full ${cardSurfaceClass(tone)}`}
        data-interactive="true"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
      >
        {body}
      </motion.article>
    </TiltCard>
  )
}
