import EditableText from './EditableText'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  eyebrowKey?: string
  titleKey?: string
  subtitleKey?: string
  subtitleClassName?: string
}

/** Sentence-case kicker + display title. No all-caps tracked eyebrows. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  eyebrowKey,
  titleKey,
  subtitleKey,
  subtitleClassName,
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  const subtitleWidth = subtitleClassName ?? (isCenter ? 'mx-auto max-w-3xl' : 'max-w-3xl')

  return (
    <div className={`mb-10 ${isCenter ? 'text-center' : ''}`}>
      {eyebrow ? (
        eyebrowKey ? (
          <EditableText
            contentKey={eyebrowKey}
            as="p"
            className="text-section-eyebrow text-sm font-medium"
          >
            {eyebrow}
          </EditableText>
        ) : (
          <p className="text-section-eyebrow text-sm font-medium">{eyebrow}</p>
        )
      ) : null}
      {titleKey ? (
        <EditableText
          contentKey={titleKey}
          as="h2"
          className="font-display text-section mt-3 text-3xl sm:text-4xl"
        >
          {title}
        </EditableText>
      ) : (
        <h2 className="font-display text-section mt-3 text-3xl sm:text-4xl">{title}</h2>
      )}
      <div className={`mt-4 h-px w-12 bg-line ${isCenter ? 'mx-auto' : ''}`} />
      {subtitle ? (
        subtitleKey ? (
          <EditableText
            contentKey={subtitleKey}
            as="p"
            className={`text-section-muted prose-measure mt-4 ${subtitleWidth}`}
          >
            {subtitle}
          </EditableText>
        ) : (
          <p className={`text-section-muted prose-measure mt-4 ${subtitleWidth}`}>{subtitle}</p>
        )
      ) : null}
    </div>
  )
}
