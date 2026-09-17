import type { SectionTone } from '../context/SectionToneContext'

export function cardSurfaceClass(_tone?: SectionTone) {
  void _tone
  return 'overflow-hidden rounded-2xl border-2 border-navy bg-white shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(30,127,232,0.18)]'
}

export function chipClass(_tone?: SectionTone) {
  void _tone
  return 'rounded-full bg-navy px-3 py-1 text-xs font-medium text-white'
}

export const navyBadgeClass =
  'inline-flex items-center rounded-full bg-navy px-3 py-1 text-xs font-semibold tracking-wide text-white'
