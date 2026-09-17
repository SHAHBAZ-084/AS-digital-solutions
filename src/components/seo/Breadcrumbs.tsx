import { Link } from 'react-router-dom'
import { type Crumb } from '../../lib/breadcrumbs'

export type { Crumb }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length < 2) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {isLast || !item.path ? (
                <span className="font-medium text-navy" aria-current={isLast ? 'page' : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="text-accent transition hover:underline">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
