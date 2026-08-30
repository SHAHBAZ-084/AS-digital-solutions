import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSiteData } from '../context/SiteDataContext'
import { findProjectFallback, productToProject } from '../lib/productMap'
import { getPlaceholderForType } from '../lib/projectPlaceholders'
import CTAButton from '../components/ui/CTAButton'
import EditableText from '../components/ui/EditableText'
import ImageReveal from '../components/ui/ImageReveal'

function SectionLabel({
  title, titleKey,
}: {
  title: string
  titleKey: string
}) {
  return (
    <div className="mb-4">
      <EditableText
        contentKey={titleKey}
        as="h2"
        className="text-section text-lg font-bold tracking-tight sm:text-xl"
      >
        {title}
      </EditableText>
      <div className="mt-2 h-1 w-10 bg-navy" />
    </div>
  )
}

function OpenSection({
  title, titleKey, children, className = '',
}: {
  title: string
  titleKey: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={className}>
      <SectionLabel title={title} titleKey={titleKey} />
      <div className="text-sm leading-relaxed text-text-muted sm:text-[0.95rem]">{children}</div>
    </section>
  )
}

function isPlaceholderCopy(value: string) {
  const normalized = value.trim().toLowerCase()
  return (
    !normalized ||
    normalized.startsWith('placeholder') ||
    normalized.includes('feature placeholder') ||
    normalized.includes('value placeholder')
  )
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const { products } = useSiteData()
  const cms = products.find((entry) => entry.slug === slug)
  const fallback = findProjectFallback(slug ?? '')
  const project = cms ? productToProject(cms, fallback) : fallback

  if (!project) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <EditableText
          contentKey="caseStudy.missing.eyebrow"
          as="p"
          className="text-xs font-semibold uppercase tracking-[0.28em] text-accent"
        >
          Case Study
        </EditableText>
        <EditableText
          contentKey="caseStudy.missing.title"
          as="h1"
          className="mt-4 text-3xl font-extrabold text-text"
        >
          Project not found
        </EditableText>
        <EditableText
          contentKey="caseStudy.missing.body"
          as="p"
          className="mt-3 text-text-muted"
        >
          The requested case study does not match a project entry yet.
        </EditableText>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full border border-accent/40 px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-accent hover:text-white"
        >
          <EditableText contentKey="caseStudy.backHome">Back to Home</EditableText>
        </Link>
      </section>
    )
  }

  const base = `projects.${project.slug}`
  const show = (id: string) => !project.enabledBlocks || project.enabledBlocks.includes(id)
  const heroImage = project.screenshots[0] || getPlaceholderForType(project.type)
  const plateBg: Record<string, string> = {
    'citynest-services': 'bg-[#01153d]',
    'sheraz-traders-desktop': 'bg-[#133f2c]',
    'usman-mall-desktop': 'bg-white',
    'sufi-co-grain-market-desktop': 'bg-[#00153d]',
  }
  const plate = plateBg[project.slug]
  const isPlate = Boolean(plate)

  const gallery = [...new Set(project.screenshots.filter(Boolean))].filter(
    (src) => src !== heroImage, )
  const showGallery = show('screenshots') && gallery.length > 0

  const challenge =
    show('challenge') && !isPlaceholderCopy(project.challenge) ? project.challenge : ''
  const solution =
    show('solution') && !isPlaceholderCopy(project.solution) ? project.solution : ''
  const features =
    show('key_features')
      ? project.keyFeatures.filter((item) => !isPlaceholderCopy(item))
      : []
  const results =
    show('results') ? project.results.filter((item) => !isPlaceholderCopy(item)) : []
  const tech =
    show('technology') && project.technology.length > 0 ? project.technology : []

  return (
    <article className="bg-bg-primary">
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-10 sm:pt-16 sm:pb-14">
        <Link
          to="/#projects"
          className="text-xs font-semibold tracking-[0.16em] text-accent uppercase transition hover:opacity-80"
        >
          ← Back to projects
        </Link>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <EditableText
              contentKey="caseStudy.eyebrow"
              as="p"
              className="text-xs font-semibold tracking-[0.28em] text-accent uppercase"
            >
              Case Study
            </EditableText>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] tracking-[0.16em] text-secondary uppercase">
              <EditableText contentKey={`${base}.type`}>{project.type}</EditableText>
              <span className="text-accent/30">·</span>
              <EditableText contentKey={`${base}.industry`}>{project.industry}</EditableText>
            </div>
            <EditableText
              contentKey={`${base}.name`}
              as="h1"
              className="text-section mt-4 max-w-xl text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem]"
            >
              {project.name}
            </EditableText>
            {show('overview') ? (
              <EditableText
                contentKey={`${base}.overview`}
                as="p"
                className="text-section-muted mt-5 max-w-xl text-base leading-relaxed"
              >
                {project.overview}
              </EditableText>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              {show('client') ? (
                <p className="text-section">
                  <span className="font-semibold text-accent">Client</span>
                  <span className="mx-2 text-accent/30">·</span>
                  <EditableText contentKey={`${base}.client`}>{project.client}</EditableText>
                </p>
              ) : null}
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
                >
                  Live View
                </a>
              ) : null}
            </div>
          </div>

          <ImageReveal className={`overflow-hidden ${isPlate ? plate : 'bg-transparent'}`}>
            <div
              className={`flex aspect-[16/10] items-center justify-center ${
                isPlate ? 'p-0' : 'p-4 sm:p-6'
              }`}
            >
              <img
                src={heroImage}
                alt={project.name}
                className={
                  isPlate ? 'h-full w-full object-cover' : 'max-h-full max-w-full object-contain'
                }
              />
            </div>
          </ImageReveal>
        </div>
      </section>

      <section className="border-y border-[rgba(10,14,26,0.06)] bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            {show('overview') ? (
              <OpenSection title="Project Overview" titleKey="caseStudy.overviewTitle">
                <EditableText contentKey={`${base}.description`} as="p">
                  {project.description}
                </EditableText>
              </OpenSection>
            ) : null}

            {features.length > 0 ? (
              <OpenSection title="Key Features" titleKey="caseStudy.featuresTitle">
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={`${feature}-${index}`} className="flex items-start gap-3">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <EditableText contentKey={`${base}.features.${index}`}>
                        {feature}
                      </EditableText>
                    </li>
                  ))}
                </ul>
              </OpenSection>
            ) : null}
          </div>

          {(challenge || solution) && (
            <div className="mt-12 grid gap-10 border-t border-[rgba(10,14,26,0.06)] pt-12 lg:grid-cols-2 lg:gap-16">
              {challenge ? (
                <OpenSection title="Challenge" titleKey="caseStudy.challengeTitle">
                  <EditableText contentKey={`${base}.challenge`} as="p">
                    {challenge}
                  </EditableText>
                </OpenSection>
              ) : null}
              {solution ? (
                <OpenSection title="Solution" titleKey="caseStudy.solutionTitle">
                  <EditableText contentKey={`${base}.solution`} as="p">
                    {solution}
                  </EditableText>
                </OpenSection>
              ) : null}
            </div>
          )}

          {(results.length > 0 || tech.length > 0) && (
            <div className="mt-12 grid gap-10 border-t border-[rgba(10,14,26,0.06)] pt-12 lg:grid-cols-2 lg:gap-16">
              {results.length > 0 ? (
                <OpenSection title="Results / Value" titleKey="caseStudy.resultsTitle">
                  <ul className="space-y-3">
                    {results.map((item, index) => (
                      <li key={`${item}-${index}`} className="flex items-start gap-3">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        <EditableText contentKey={`${base}.results.${index}`}>{item}</EditableText>
                      </li>
                    ))}
                  </ul>
                </OpenSection>
              ) : null}
              {tech.length > 0 ? (
                <OpenSection title="Tools used" titleKey="caseStudy.technologyTitle">
                  <div className="flex flex-wrap gap-2">
                    {tech.map((item) => (
                      <span
                        key={item}
                        className="text-section rounded-full border border-[rgba(10,14,26,0.1)] bg-white px-3 py-1 text-xs font-semibold tracking-wide"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </OpenSection>
              ) : null}
            </div>
          )}

          {project.sections && project.sections.length > 0 ? (
            <div className="mt-12 space-y-10 border-t border-[rgba(10,14,26,0.06)] pt-12">
              {project.sections.map((section) => (
                <OpenSection
                  key={section.id}
                  title={section.title}
                  titleKey={`${base}.section.${section.id}.title`}
                >
                  {section.body ? <p>{section.body}</p> : null}
                  {section.bullets.length > 0 ? (
                    <ul className="mt-3 space-y-3">
                      {section.bullets.map((bullet, index) => (
                        <li key={`${section.id}-${index}`} className="flex items-start gap-3">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </OpenSection>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {showGallery ? (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <SectionLabel title="Project photos" titleKey="caseStudy.screenshotsTitle" />
          <div className="grid gap-5 sm:grid-cols-2">
            {gallery.map((screenshot, index) => (
              <div
                key={`${screenshot}-${index}`}
                className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#f3f6fb]"
              >
                <img
                  src={screenshot}
                  alt={`${project.name} photo ${index + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-t border-[rgba(10,14,26,0.06)]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <EditableText
            contentKey="caseStudy.cta.title"
            as="h2"
            className="text-section max-w-2xl text-2xl font-extrabold tracking-tight sm:text-3xl"
          >
            Need a similar solution? Let&apos;s discuss your project.
          </EditableText>
          <EditableText
            contentKey="caseStudy.cta.body"
            as="p"
            className="text-section-muted mt-3 max-w-2xl text-sm leading-relaxed sm:text-base"
          >
            If you need a website, business tool, or custom software built around your workflow, the contact section is ready for your project brief.
          </EditableText>
          <div className="mt-6 flex flex-wrap gap-3">
            <CTAButton label="Start Your Project" href="/#contact" labelKey="hero.cta.primary" />
            <Link
              to="/#projects"
              className="inline-flex items-center rounded-full border border-[rgba(10,14,26,0.12)] bg-white px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/40 hover:bg-[rgba(30,127,232,0.08)]"
            >
              <EditableText contentKey="caseStudy.backProjects">More projects</EditableText>
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
