import type { CSSProperties } from 'react'

type EditableTag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'label' | 'li' | 'div'

interface EditableTextProps {
  contentKey?: string
  as?: EditableTag
  className?: string
  style?: CSSProperties
  children: string
}

export default function EditableText({
  as: Tag = 'span',
  className = '',
  style,
  children,
}: EditableTextProps) {
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  )
}
