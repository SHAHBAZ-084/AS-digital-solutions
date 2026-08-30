import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import SectionShell from '../ui/SectionShell'
import { useSiteData } from '../../context/SiteDataContext'

export default function Team() {
  const { team } = useSiteData()

  return (
    <SectionShell id="team">
      <SectionHeading
        eyebrow="Team"
        title="The section is ready for the people behind the work"
        subtitle="Profiles below are clearly marked placeholders so real team details can be dropped in later without rebuilding the layout."
        eyebrowKey="team.eyebrow"
        titleKey="team.title"
        subtitleKey="team.subtitle"
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-12">
        {team.map((member, index) => (
          <Reveal key={member.id} delayMs={index * 70}>
            <article className="flex flex-col items-start">
              {member.photo_url ? (
                <img
                  src={member.photo_url}
                  alt={member.name}
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-accent/15"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent ring-4 ring-accent/10">
                  TM
                </div>
              )}
              <h3 className="text-section mt-4 text-xl font-bold">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
              <p className="text-section-muted mt-3 text-sm leading-relaxed">{member.bio}</p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium tracking-wide text-secondary uppercase">
                {member.skills.filter(Boolean).map((skill, skillIndex) => (
                  <span key={`${member.id}-${skill}`}>
                    {skillIndex > 0 ? <span className="mr-3 text-accent/40">·</span> : null}
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-4 text-sm">
                <a
                  href={member.links.linkedin || 'https://www.linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  LinkedIn
                </a>
                <a href={`mailto:${member.links.email}`} className="text-accent hover:underline">
                  Email
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
