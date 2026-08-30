import { Fragment, type ReactNode } from 'react'
import AnimatedIcon from '../ui/AnimatedIcon'
import EditableText from '../ui/EditableText'
import SectionShell from '../ui/SectionShell'

function CircleIcon({ children }: { children: ReactNode }) {
  return (
    <AnimatedIcon className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_24px_rgba(30,127,232,0.28)] ring-4 ring-accent/15 transition-transform duration-300 group-hover:scale-105 sm:h-[4.5rem] sm:w-[4.5rem]">
      {children}
    </AnimatedIcon>
  )
}

function ProjectIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M7 7h10M7 12h10M7 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.5 3.5h11A2 2 0 0 1 19.5 5.5v13A2 2 0 0 1 17.5 20.5h-11A2 2 0 0 1 4.5 18.5v-13A2 2 0 0 1 6.5 3.5Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function SoftwareIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M8 9l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5v14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.5 16.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function SignalIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 12a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 12a2 2 0 0 1 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 16v4M9 21h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
      <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 9.5h4M12 12v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

const items = [
  { id: 'real-projects', label: 'Real Projects', Icon: ProjectIcon },
  { id: 'custom-software', label: 'Custom-Built Software', Icon: SoftwareIcon },
  { id: 'offline-online', label: 'Offline & Online Capable', Icon: SignalIcon },
  { id: 'long-term-support', label: 'Long-Term Support', Icon: SupportIcon },
] as const

export default function TrustStrip() {
  return (
    <SectionShell innerClassName="py-12 sm:py-14" showEdge={false}>
      <EditableText
        contentKey="trust.headline"
        as="p"
        className="text-section text-center text-sm font-semibold tracking-wide sm:text-base"
      >
        Real Projects. Practical Solutions. Long-Term Support.
      </EditableText>

      <div className="mt-10 flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
        {items.map(({ id, label, Icon: ItemIcon }, index) => (
          <Fragment key={id}>
            <div className="group flex w-full max-w-[10.5rem] flex-col items-center text-center sm:flex-1">
              <CircleIcon>
                <ItemIcon />
              </CircleIcon>
              <EditableText
                contentKey={`trust.${id}`}
                as="p"
                className="text-section mt-4 text-[11px] leading-snug font-semibold tracking-[0.12em] uppercase sm:text-xs"
              >
                {label}
              </EditableText>
            </div>

            {index < items.length - 1 ? (
              <div
                className="flex items-center justify-center py-3 sm:w-10 sm:shrink-0 sm:self-start sm:pt-8 md:w-14"
                aria-hidden="true"
              >
                <div className="h-7 w-px bg-gradient-to-b from-accent/55 via-accent/30 to-accent/55 sm:h-px sm:w-full sm:bg-gradient-to-r" />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
    </SectionShell>
  )
}
