interface TypingTextProps {
  text: string
  speedMs?: number
  className?: string
}

/** Static accent text (typing removed to protect LCP / TBT). */
export default function TypingText({ text, className = '' }: TypingTextProps) {
  return <span className={className}>{text}</span>
}
