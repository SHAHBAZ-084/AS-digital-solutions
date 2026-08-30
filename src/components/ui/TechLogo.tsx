import type { CSSProperties, ReactNode } from 'react'

interface TechLogoProps {
  id: string
  className?: string
}

const base = 'h-7 w-7 shrink-0'

function Svg({
  children, viewBox = '0 0 24 24', className = base, style,
}: {
  children: ReactNode
  viewBox?: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <svg viewBox={viewBox} className={className} style={style} aria-hidden="true" fill="currentColor">
      {children}
    </svg>
  )
}

/** Brand-colored logos keyed by technology id from the CMS/seed data. */
export default function TechLogo({ id, className = base }: TechLogoProps) {
  switch (id) {
    case 'react':
      return (
        <Svg className={className} style={{ color: '#61DAFB' }}>
          <circle cx="12" cy="12" r="2.2" />
          <g fill="none" stroke="currentColor" strokeWidth="1.4">
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          </g>
        </Svg>
      )
    case 'javascript':
      return (
        <Svg className={className} style={{ color: '#F7DF1E' }}>
          <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" />
          <path
            fill="#111"
            d="M11.2 17.6c0 1.5-.9 2.3-2.3 2.3-1.2 0-1.9-.6-2.3-1.4l1.3-.8c.2.4.4.7.9.7.5 0 .8-.2.8-.9v-4.9h1.6v4.9Zm4.1 2.3c-1.4 0-2.3-.7-2.7-1.6l1.3-.8c.2.5.6.8 1.2.8.5 0 .8-.3.8-.6 0-.4-.3-.6-1.1-.9l-.4-.2c-1.1-.5-1.8-1.1-1.8-2.3 0-1.2.9-2 2.3-2 1 0 1.7.3 2.2 1.2l-1.2.8c-.3-.4-.5-.6-.9-.6-.4 0-.7.3-.7.6 0 .4.3.6 1 .9l.4.2c1.3.6 2 1.1 2 2.4 0 1.4-1.1 2.1-2.6 2.1Z"
          />
        </Svg>
      )
    case 'html':
      return (
        <Svg className={className} style={{ color: '#E34F26' }}>
          <path d="M4 2.5h16l-1.4 16.2L12 21.5l-6.6-2.8L4 2.5Z" fill="currentColor" />
          <path
            fill="#fff"
            fillOpacity="0.9"
            d="M12 19.1 17.2 17.7 18.4 4.8H12V19.1ZM7.4 8.2l.2 2.2h4.4V8.2H7.4Zm.4 4.3.1 1.6L12 15.2v-2.1H8.1l-.3-.6Z"
          />
        </Svg>
      )
    case 'css':
      return (
        <Svg className={className} style={{ color: '#1572B6' }}>
          <path d="M4 2.5h16l-1.4 16.2L12 21.5l-6.6-2.8L4 2.5Z" fill="currentColor" />
          <path
            fill="#fff"
            fillOpacity="0.9"
            d="M12 19.1 17.2 17.7 18.4 4.8H12V19.1ZM7.5 8.1h9l-.2 2.1H9.7l.2 1.9h6.2l-.4 4-3.7 1.1-3.7-1.1-.2-2.1h1.9l.1 1 1.9.5 1.9-.5.2-1.9H7.7l-.2-3Z"
          />
        </Svg>
      )
    case 'tailwind':
      return (
        <Svg className={className} style={{ color: '#06B6D4' }}>
          <path d="M12 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.1-1.8 3.4-1.4.8.2 1.3.8 1.9 1.5C13.3 11.4 14.5 13 17 13c2.7 0 4.4-1.3 5-4-1 1.3-2.1 1.8-3.4 1.4-.8-.2-1.3-.8-1.9-1.5C14.7 7.6 13.5 6 12 6ZM7 13c-2.7 0-4.4 1.3-5 4 1-1.3 2.1-1.8 3.4-1.4.8.2 1.3.8 1.9 1.5.9 1.3 2.1 2.9 4.6 2.9 2.7 0 4.4-1.3 5-4-1 1.3-2.1 1.8-3.4 1.4-.8-.2-1.3-.8-1.9-1.5C10.7 14.6 9.5 13 7 13Z" />
        </Svg>
      )
    case 'nodejs':
      return (
        <Svg className={className} style={{ color: '#339933' }}>
          <path d="M12 2.2 3.8 6.8v10.4L12 21.8l8.2-4.6V6.8L12 2.2Zm0 1.8 6.4 3.6v7.8L12 19l-6.4-3.6V7.6L12 4Zm-.9 4.2v7.1h1.7V9.8c1.3 0 2.1.5 2.1 1.7 0 1.2-.8 1.8-2.1 1.8h-.5v1.6h.5c2.3 0 3.8-1.2 3.8-3.4 0-2.1-1.5-3.3-3.7-3.3H11.1Z" />
        </Svg>
      )
    case 'express':
      return (
        <Svg className={className} style={{ color: '#0a0e1a' }}>
          <path d="M3.5 8.5h2.1c1.6 0 2.6.8 2.6 2.1 0 1.4-1 2.2-2.6 2.2H5.2v2.7H3.5V8.5Zm1.7 3h.3c.7 0 1.1-.3 1.1-.9s-.4-.9-1.1-.9h-.3v1.8Zm5.2-3h1.6l1.5 4.2 1.5-4.2h1.6l-2.5 6.9H12l-1.6-4.5-1.6 4.5H7.3L4.8 8.5h1.7l1.5 4.2 1.4-4.2Zm7.2 0H22v1.4h-2.7v1.3H21v1.4h-1.7v1.4H22v1.4h-4.4V8.5Z" />
        </Svg>
      )
    case 'php':
      return (
        <Svg className={className} style={{ color: '#777BB4' }}>
          <ellipse cx="12" cy="12" rx="10" ry="6.5" fill="currentColor" />
          <path
            fill="#fff"
            d="M6.8 9.6h1.5c1.2 0 1.9.5 1.9 1.5 0 .9-.6 1.5-1.5 1.6l1.1 2.1H8.4l-.9-1.9H7.3v1.9H6V9.6Zm1.3 2.1h.3c.4 0 .7-.2.7-.6s-.2-.5-.7-.5h-.3v1.1Zm4-2.1h1.5c1.5 0 2.4.8 2.4 2.3S15.1 14.2 13.6 14.2h-1.5V9.6Zm1.3 3.5h.3c.7 0 1.1-.4 1.1-1.2s-.4-1.2-1.1-1.2h-.3v2.4Zm3.6-3.5h1.5c1.2 0 1.9.5 1.9 1.5 0 .9-.6 1.5-1.5 1.6l1.1 2.1h-1.4l-.9-1.9h-.7v1.9h-1.3V9.6Zm1.3 2.1h.3c.4 0 .7-.2.7-.6s-.2-.5-.7-.5h-.3v1.1Z"
          />
        </Svg>
      )
    case 'laravel':
      return (
        <Svg className={className} style={{ color: '#FF2D20' }}>
          <path d="m3.2 8.4 4.4-2.5 4.4 2.5v5l-4.4 2.5-4.4-2.5v-5Zm5.2 9.3 4.4-2.5 4.4 2.5v-5l-4.4-2.5-4.4 2.5v5Zm5.2-9.3 4.4-2.5 2.8 1.6v3.3l-2.8 1.6-4.4-2.5V8.4Z" />
        </Svg>
      )
    case 'mysql':
      return (
        <Svg className={className} style={{ color: '#4479A1' }}>
          <path d="M16.8 4.5c-1.2 0-2.2.3-3 1-.2.2-.3.3-.2.4l.7 1c.1.1.2.1.4 0 .5-.3 1.1-.5 1.8-.5 1.3 0 2.1.7 2.1 1.7v.1c-1.7.1-3.9.4-5.2 1.2-1.5.9-2.4 2.3-2.4 4.1 0 2.6 1.6 4.1 3.9 4.1 1.2 0 2.2-.3 3.1-1l.2 1c0 .2.2.3.4.3h1.7c.2 0 .3-.1.3-.3V9c0-2.8-1.9-4.5-4.8-4.5Zm.8 10c-.5.5-1.2.8-2 .8-1.3 0-2.1-.8-2.1-2.1 0-1.8 1.5-2.7 4.1-2.9v4.2Zm-9.3.8c-.7 0-1.3-.2-1.7-.5-.1-.1-.3 0-.3.1l-.5 1.1c-.1.1 0 .3.1.4.7.4 1.5.6 2.5.6 2.1 0 3.4-1.1 3.4-2.9 0-1.4-.7-2.2-2.4-2.7l-.8-.3c-.8-.3-1.1-.5-1.1-1 0-.5.5-.9 1.2-.9.6 0 1.1.2 1.5.4.1.1.3 0 .3-.1l.5-1.1c.1-.1 0-.3-.1-.4-.7-.4-1.5-.6-2.4-.6-2 0-3.3 1.2-3.3 2.8 0 1.4.8 2.3 2.5 2.8l.8.3c.8.3 1.1.6 1.1 1.1-.1.6-.6 1-1.5 1Z" />
        </Svg>
      )
    case 'mongodb':
      return (
        <Svg className={className} style={{ color: '#47A248' }}>
          <path d="M12.2 2.2s.3 1.7-.5 3.2c-.7 1.4-2 2.2-2 2.2s1.1.5 1.8 1.9c.8 1.6.6 3.4.6 3.4s1.3-1.2 1.9-3.3c.7-2.3-.8-5.2-1.8-7.4Z" />
          <path d="M12.1 21.8s3.8-2.1 4.5-8.3c.5-4.4-2.1-6.6-2.1-6.6s-.2 2.7-1.5 4.5c-1.5 2.1-2.1 3.4-2.1 5.6 0 1.4.2 3.4 1.2 4.8Z" />
          <path d="M11.8 21.8S8 19.7 7.3 13.5c-.5-4.4 2.1-6.6 2.1-6.6s.2 2.7 1.5 4.5c1.5 2.1 2.1 3.4 2.1 5.6 0 1.4-.2 3.4-1.2 4.8Z" />
          <path fill="#3F3E42" d="M12 21.5v-7.2s-.2 1.4-.3 2.3c-.1.8.1 3.5.3 4.9Z" />
        </Svg>
      )
    case 'electron':
      return (
        <Svg className={className} style={{ color: '#47848F' }}>
          <circle cx="12" cy="12" r="1.8" />
          <g fill="none" stroke="currentColor" strokeWidth="1.3">
            <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(-30 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(90 12 12)" />
          </g>
        </Svg>
      )
    case 'python':
      return (
        <Svg className={className}>
          <path
            fill="#3776AB"
            d="M12.1 2.2c-4.4 0-4.1 1.9-4.1 1.9v2h4.2v.6H5.5S2.3 6.4 2.3 11.1s2.9 4.5 2.9 4.5h1.7v-2.2s-.1-2.6 2.6-2.6h4.5s2.5.1 2.5-2.5V4.3S16.8 2.2 12.1 2.2Zm-2.2 1.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z"
          />
          <path
            fill="#FFD43B"
            d="M11.9 21.8c4.4 0 4.1-1.9 4.1-1.9v-2h-4.2v-.6h6.7s3.2.3 3.2-4.4-2.9-4.5-2.9-4.5h-1.7v2.2s.1 2.6-2.6 2.6H9.9s-2.5-.1-2.5 2.5v4.2s.2 1.9 4.5 1.9Zm2.2-1.4a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Z"
          />
        </Svg>
      )
    case 'tensorflow':
      return (
        <Svg className={className} style={{ color: '#FF6F00' }}>
          <path d="M12 2.2 3.5 7v2.2l7 3.8v8.8h2.2v-8.8l7-3.8V7L12 2.2Zm0 2.5 5.3 2.9-5.3 2.9-5.3-2.9L12 4.7Zm-5.8 9.5 2.2 1.2v2.8l-2.2-1.3v-2.7Z" />
        </Svg>
      )
    case 'scikit-learn':
      return (
        <Svg className={className} style={{ color: '#F7931E' }}>
          <circle cx="8.5" cy="9" r="3.2" fill="#F7931E" />
          <circle cx="15.5" cy="9" r="3.2" fill="#3294C7" />
          <circle cx="12" cy="15.5" r="3.2" fill="#9B59B6" />
        </Svg>
      )
    default:
      return (
        <span
          className={`${className} inline-flex items-center justify-center rounded-md bg-accent/10 text-[10px] font-bold text-accent`}
          aria-hidden="true"
        >
          {(id || '?').slice(0, 2).toUpperCase()}
        </span>
      )
  }
}
