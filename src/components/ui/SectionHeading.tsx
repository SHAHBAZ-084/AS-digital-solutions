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

export default function SectionHeading({
  eyebrow, title, subtitle, align = 'left', eyebrowKey, titleKey, subtitleKey, subtitleClassName,
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
            className="text-section-eyebrow text-xs font-semibold uppercase tracking-[0.28em]"
          >
            {eyebrow}
          </EditableText>
        ) : (
          <p className="text-section-eyebrow text-xs font-semibold uppercase tracking-[0.28em]">
            {eyebrow}
          </p>
        )
      ) : null}
      {titleKey ? (
        <EditableText
          contentKey={titleKey}
          as="h2"
          className="text-section mt-4 text-3xl leading-tight font-extrabold sm:text-4xl"
        >
          {title}
        </EditableText>
      ) : (
        <h2 className="text-section mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">
          {title}
        </h2>
      )}
      <div className={`mt-4 h-1.5 w-16 bg-navy ${isCenter ? 'mx-auto' : ''}`} />
      {subtitle ? (
        subtitleKey ? (
          <EditableText
            contentKey={subtitleKey}
            as="p"
            className={`text-section-muted mt-4 ${subtitleWidth}`}
          >
            {subtitle}
          </EditableText>
        ) : (
          <p className={`text-section-muted mt-4 ${subtitleWidth}`}>
            {subtitle}
          </p>
        )
      ) : null}
    </div>
  )
}
