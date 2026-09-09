import type { MouseEvent } from 'react'

/** No-op tilt bind: keeps Hero API stable without framer-motion on critical path. */
export function useHeroParallaxBind() {
  return {
    reduced: true,
    springX: null,
    springY: null,
    bindSection: {
      onMouseMove: (_event: MouseEvent<HTMLElement>) => {},
      onMouseLeave: () => {},
    },
  }
}

interface HeroParallaxBgProps {
  src: string
  width?: number
  height?: number
  springX?: unknown
  springY?: unknown
  reduced?: boolean
}

/**
 * Static LCP skyline (no framer-motion). Width/height reserve space for CLS.
 */
export default function HeroParallaxBg({
  src,
  width = 1280,
  height = 536,
}: HeroParallaxBgProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-cover object-[70%_top]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-white/90 via-[36%] to-transparent to-[70%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8fe] from-0% via-[#f4f8fe]/55 via-[26%] to-transparent to-[55%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-white/15" />
    </div>
  )
}
