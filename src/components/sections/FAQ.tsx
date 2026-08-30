import { useState } from 'react'
import { faqItems } from '../../data/faq'
import EditableText from '../ui/EditableText'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SectionShell from '../ui/SectionShell'

export default function FAQ() {
  const items = faqItems.slice(0, 5)
  const [openId, setOpenId] = useState<string>(items[0]?.id ?? '')

  return (
    <SectionShell id="faq" showEdge={false}>
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions before a project starts"
          subtitle="Answers below are written for real use and can be refined further once the exact service scope is finalized."
          align="center"
          eyebrowKey="faq.eyebrow"
          titleKey="faq.title"
          subtitleKey="faq.subtitle"
        />

        <div className="divide-y divide-[rgba(10,14,26,0.1)] border-y border-[rgba(10,14,26,0.1)] text-left">
          {items.map((item, index) => {
            const isOpen = item.id === openId

            return (
              <Reveal key={item.id} delayMs={index * 40}>
                <div>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left transition-colors hover:text-accent"
                    onClick={() => setOpenId(isOpen ? '' : item.id)}
                  >
                    <EditableText
                      contentKey={`faq.${item.id}.question`}
                      className="text-section text-base font-semibold"
                    >
                      {item.question}
                    </EditableText>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg leading-none transition ${
                        isOpen ? 'bg-accent text-white' : 'bg-accent/10 text-accent'
                      }`}
                    >
                      {isOpen ? '-' : '+'}
                    </span>
                  </button>
                  {isOpen ? (
                    <EditableText
                      contentKey={`faq.${item.id}.answer`}
                      as="p"
                      className="text-section-muted pb-5 pl-1 text-sm leading-relaxed"
                    >
                      {item.answer}
                    </EditableText>
                  ) : null}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
