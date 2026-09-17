import type { Technology } from '../../data/technologies'
import TechLogo from '../ui/TechLogo'

interface TechnologyCardProps {
  technology: Technology
}

export default function TechnologyCard({ technology }: TechnologyCardProps) {
  return (
    <div
      className="flex min-w-[9.5rem] items-center gap-3 border border-line bg-cotton px-3.5 py-2.5 transition-[border-color] duration-200 hover:border-canal"
      data-interactive="true"
    >
      <TechLogo id={technology.id} />
      <span className="text-sm font-semibold text-navy">{technology.name}</span>
    </div>
  )
}
