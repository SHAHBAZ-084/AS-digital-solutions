import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface TypingTextProps {
  text: string
  speedMs?: number
  className?: string
}

function TypingTextAnimated({ text, speedMs, className }: TypingTextProps) {
  const [value, setValue] = useState('')

  useEffect(() => {
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setValue(text.slice(0, index))
      if (index >= text.length) window.clearInterval(timer)
    }, speedMs)

    return () => window.clearInterval(timer)
  }, [text, speedMs])

  return (
    <span className={className}>
      {value}
      {value.length < text.length ? (
        <span className="ml-0.5 inline-block w-[2px] animate-pulse text-accent">|</span>
      ) : null}
    </span>
  )
}

export default function TypingText({
  text, speedMs = 70, className = '',
}: TypingTextProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <span className={className}>{text}</span>
  }

  return (
    <TypingTextAnimated key={text} text={text} speedMs={speedMs} className={className} />
  )
}
