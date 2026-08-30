export interface TeamLinks {
  linkedin: string
  email: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  skills: string[]
  links: TeamLinks
  photo_url: string
  sort_order?: number
}

export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Team Member Name',
    role: 'Role',
    bio: 'Placeholder bio describing what this team member contributes to delivery, communication, or product development.',
    skills: ['Skill placeholder A', 'Skill placeholder B', 'Skill placeholder C'],
    links: { linkedin: '', email: '' },
    photo_url: '',
  },
  {
    id: 'team-2',
    name: 'Team Member Name',
    role: 'Role',
    bio: 'Placeholder bio describing the focus area, domain experience, or technical support this person provides.',
    skills: ['Skill placeholder D', 'Skill placeholder E', 'Skill placeholder F'],
    links: { linkedin: '', email: '' },
    photo_url: '',
  },
  {
    id: 'team-3',
    name: 'Team Member Name',
    role: 'Role',
    bio: 'Placeholder bio for a future team profile, ready for real name, role, links, and background.',
    skills: ['Skill placeholder G', 'Skill placeholder H', 'Skill placeholder I'],
    links: { linkedin: '', email: '' },
    photo_url: '',
  },
]
