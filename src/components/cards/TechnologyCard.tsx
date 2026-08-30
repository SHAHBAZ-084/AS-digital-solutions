import type { Technology } from '../../data/technologies'
import TechLogo from '../ui/TechLogo'

interface TechnologyCardProps {
  technology: Technology
}

export default function TechnologyCard({ technology }: TechnologyCardProps) {
  return (
    <div
      className="flex min-w-[9.5rem] items-center gap-3 rounded-xl border border-[rgba(10,14,26,0.06)] bg-white/80 px-3.5 py-2.5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-[0_8px_20px_rgba(30,127,232,0.12)]"
      data-interactive="true"
    >
      <TechLogo id={technology.id} />
      <span className="text-sm font-semibold text-navy">{technology.name}</span>
    </div>
  )
}
