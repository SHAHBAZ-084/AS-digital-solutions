import { Link } from 'react-router-dom'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SectionShell from '../ui/SectionShell'
import CTAButton from '../ui/CTAButton'

/** Indicative PKR bands from /pricing content — REPLACE_ until locked packages. */
const RANGES = [
  { label: 'Brochure website', range: 'REPLACE_35000 – REPLACE_90000' },
  { label: 'POS / desktop system', range: 'REPLACE_180000 – REPLACE_700000' },
  { label: 'Ecommerce storefront', range: 'REPLACE_120000 – REPLACE_500000' },
] as const

/**
 * Home pricing band (dark section rhythm). PKR visible; brass only on amounts.
 */
export default function PricingStrip() {
  return (
    <SectionShell id="pricing" tone="dark" showEdge={false}>
      <SectionHeading
        eyebrow="Pricing"
        title="Clear PKR planning bands"
        subtitle="Indicative ranges for budgeting—not cart prices. Locked packages replace REPLACE_ markers after discovery."
        eyebrowKey="pricing.eyebrow"
        titleKey="pricing.title"
        subtitleKey="pricing.subtitle"
      />

      <ul className="divide-y divide-white/10 border-y border-white/10">
        {RANGES.map((row, i) => (
          <Reveal key={row.label} delayMs={i * 50}>
            <li className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <span className="text-sm font-medium text-cotton/85 sm:text-base">{row.label}</span>
              <span
                className={`num text-base font-semibold sm:text-lg ${
                  i === 0 ? 'text-brass' : 'text-cotton/80'
                }`}
              >
                {row.range}
              </span>
            </li>
          </Reveal>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <CTAButton label="Full pricing page" href="/pricing" />
        <Link
          to="/tools/website-cost-calculator"
          className="inline-flex items-center justify-center border border-white/20 px-5 py-2.5 text-sm font-semibold text-cotton transition hover:border-canal hover:text-canal"
        >
          Website cost calculator
        </Link>
      </div>
    </SectionShell>
  )
}
