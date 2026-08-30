import type { ReactNode } from 'react'

interface AnimatedIconProps {
  children: ReactNode
  className?: string
}

export default function AnimatedIcon({ children, className = '' }: AnimatedIconProps) {
  return (
    <span
      className={`icon-animate inline-flex text-accent transition-[transform,color] duration-300 group-hover:scale-110 group-hover:text-accent ${className}`}
    >
      {children}
    </span>
  )
}
