import type { SectionTone } from '../context/SectionToneContext'

/** Light sections: ruled panel. Dark: ink plate. No identical soft SaaS lift. */
export function cardSurfaceClass(tone?: SectionTone) {
  if (tone === 'dark') {
    return 'overflow-hidden border border-white/12 bg-ink/50 transition-[border-color] duration-200 hover:border-canal/45'
  }
  return 'overflow-hidden border border-line bg-cotton transition-[border-color] duration-200 hover:border-canal'
}

export function chipClass(_tone?: SectionTone) {
  void _tone
  return 'bg-ink px-3 py-1 text-xs font-medium text-white'
}

export const navyBadgeClass =
  'inline-flex items-center bg-ink px-3 py-1 text-xs font-semibold tracking-wide text-white'
