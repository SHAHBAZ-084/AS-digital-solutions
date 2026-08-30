import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSiteData } from '../context/SiteDataContext'
import { findProjectFallback, productToProject } from '../lib/productMap'
import { getPlaceholderForType } from '../lib/projectPlaceholders'
import CTAButton from '../components/ui/CTAButton'
import EditableText from '../components/ui/EditableText'
import ImageReveal from '../components/ui/ImageReveal'
import { chipClass } from '../lib/cardStyles'

function DetailBlock({
  title,
  titleKey,
  children,
}: {
  title: string
  titleKey: string
  children: ReactNode
}) {
  return (
    <section className="rounded-2xl border-2 border-navy bg-white p-6 shadow-sm">
      <EditableText contentKey={titleKey} as="h2" className="text-xl font-bold text-text">
        {title}
      </EditableText>
      <div className="mt-3 text-sm leading-relaxed text-text-muted">{children}</div>
    </section>
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
      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="rounded-3xl border border-[rgba(10,14,26,0.12)] bg-white p-8 text-center shadow-sm">
          <EditableText
            contentKey="caseStudy.missing.eyebrow"
            as="p"
            className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-light"
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
        </div>
      </section>
    )
  }

  const base = `projects.${project.slug}`
  const show = (id: string) => !project.enabledBlocks || project.enabledBlocks.includes(id)
  const heroImage = project.screenshots[0] || getPlaceholderForType(project.type)

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div>
          <EditableText
            contentKey="caseStudy.eyebrow"
            as="p"
            className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-light"
          >
            Case Study
          </EditableText>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-secondary">
            <EditableText contentKey={`${base}.type`}>{project.type}</EditableText>
            <span className="text-[rgba(10,14,26,0.2)]">/</span>
            <EditableText contentKey={`${base}.industry`}>{project.industry}</EditableText>
          </div>
          <EditableText
            contentKey={`${base}.name`}
            as="h1"
            className="mt-4 text-4xl leading-tight font-extrabold text-text"
          >
            {project.name}
          </EditableText>
          {show('overview') ? (
            <EditableText
              contentKey={`${base}.overview`}
              as="p"
              className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted"
            >
              {project.overview}
            </EditableText>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center rounded-full bg-[#1E4FD8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#163db0]"
            >
              Live View
            </a>
          ) : null}
        </div>

        <ImageReveal className="overflow-hidden rounded-3xl border border-[rgba(10,14,26,0.12)] bg-slate-100 shadow-sm">
          <img
            src={heroImage}
            alt={project.name}
            className="aspect-[16/10] h-full w-full object-cover object-center"
          />
        </ImageReveal>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {show('overview') ? (
          <DetailBlock title="Project Overview" titleKey="caseStudy.overviewTitle">
            <EditableText contentKey={`${base}.description`} as="p">
              {project.description}
            </EditableText>
          </DetailBlock>
        ) : null}
        {show('client') ? (
          <DetailBlock title="Client / Industry" titleKey="caseStudy.clientTitle">
            <EditableText contentKey={`${base}.client`} as="p">
              {project.client}
            </EditableText>
            <p className="mt-2">
              <EditableText contentKey="caseStudy.industryLabel">Industry:</EditableText>{' '}
              <EditableText contentKey={`${base}.industry`}>{project.industry}</EditableText>
            </p>
          </DetailBlock>
        ) : null}
        {show('technology') && project.technology.length > 0 ? (
          <DetailBlock title="Tools used" titleKey="caseStudy.technologyTitle">
            <div className="flex flex-wrap gap-2">
              {project.technology.map((item) => (
                <span key={item} className={chipClass()}>
                  {item}
                </span>
              ))}
            </div>
          </DetailBlock>
        ) : null}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {show('challenge') ? (
          <DetailBlock title="Challenge" titleKey="caseStudy.challengeTitle">
            <EditableText contentKey={`${base}.challenge`} as="p">
              {project.challenge}
            </EditableText>
          </DetailBlock>
        ) : null}
        {show('solution') ? (
          <DetailBlock title="Solution" titleKey="caseStudy.solutionTitle">
            <EditableText contentKey={`${base}.solution`} as="p">
              {project.solution}
            </EditableText>
          </DetailBlock>
        ) : null}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {show('key_features') ? (
          <DetailBlock title="Key Features" titleKey="caseStudy.featuresTitle">
            <ul className="space-y-2">
              {project.keyFeatures.map((feature, index) => (
                <li key={`${feature}-${index}`}>
                  -{' '}
                  <EditableText contentKey={`${base}.features.${index}`}>{feature}</EditableText>
                </li>
              ))}
            </ul>
          </DetailBlock>
        ) : null}
        {show('results') ? (
          <DetailBlock title="Results / Value" titleKey="caseStudy.resultsTitle">
            <ul className="space-y-2">
              {project.results.map((item, index) => (
                <li key={`${item}-${index}`}>
                  - <EditableText contentKey={`${base}.results.${index}`}>{item}</EditableText>
                </li>
              ))}
            </ul>
          </DetailBlock>
        ) : null}
      </div>

      {project.sections && project.sections.length > 0 ? (
        <div className="mt-5 space-y-5">
          {project.sections.map((section) => (
            <DetailBlock
              key={section.id}
              title={section.title}
              titleKey={`${base}.section.${section.id}.title`}
            >
              {section.body ? <p>{section.body}</p> : null}
              {section.bullets.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {section.bullets.map((bullet, index) => (
                    <li key={`${section.id}-${index}`}>- {bullet}</li>
                  ))}
                </ul>
              ) : null}
            </DetailBlock>
          ))}
        </div>
      ) : null}

      {show('screenshots') && project.screenshots.length > 0 ? (
        <div className="mt-5">
          <DetailBlock title="Project photos" titleKey="caseStudy.screenshotsTitle">
            <div className="grid gap-4 md:grid-cols-2">
              {project.screenshots.map((screenshot, index) => (
                <div
                  key={`${screenshot}-${index}`}
                  className="overflow-hidden rounded-2xl border border-[rgba(10,14,26,0.12)] bg-slate-100 shadow-sm"
                >
                  <img
                    src={screenshot}
                    alt={`${project.name} photo ${index + 1}`}
                    className="aspect-[16/10] h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </DetailBlock>
        </div>
      ) : null}

      <div className="mt-8 rounded-3xl border border-accent/25 bg-accent/10 p-6 sm:p-8">
        <EditableText
          contentKey="caseStudy.cta.title"
          as="h2"
          className="text-2xl font-bold text-text"
        >
          Need a similar solution? Let's discuss your project.
        </EditableText>
        <EditableText
          contentKey="caseStudy.cta.body"
          as="p"
          className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted"
        >
          If you need a website, business tool, or custom software built around your workflow, the contact section is ready for your project brief.
        </EditableText>
        <div className="mt-5 flex flex-wrap gap-3">
          <CTAButton label="Start Your Project" href="/#contact" labelKey="hero.cta.primary" />
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-[rgba(10,14,26,0.12)] bg-white px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent/40 hover:bg-[rgba(30,127,232,0.08)]"
          >
            <EditableText contentKey="caseStudy.backHome">Back to Home</EditableText>
          </Link>
        </div>
      </div>
    </section>
  )
}
