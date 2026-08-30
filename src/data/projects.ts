import { getPlaceholderForType, type ProjectType } from '../lib/projectPlaceholders'

export type { ProjectType }

export interface Project {
  slug: string
  name: string
  industry: string
  type: ProjectType
  description: string
  overview: string
  client: string
  challenge: string
  solution: string
  keyFeatures: string[]
  technology: string[]
  screenshots: string[]
  results: string[]
  liveUrl?: string
  sections?: { id: string; title: string; body: string; bullets: string[] }[]
  enabledBlocks?: string[]
}

export { getPlaceholderForType }

export const projects: Project[] = [
  {
    slug: 'project-name-retail-web',
    name: 'Project Name',
    industry: 'Industry',
    type: 'Web',
    description: 'Placeholder project summary for a website or digital platform.',
    overview: 'Placeholder overview describing the project scope, objectives, and digital direction.',
    client: 'Client / Organization',
    challenge: 'Placeholder challenge describing the business need this solution was built to solve.',
    solution: 'Placeholder solution summary showing how the system, website, or product addressed the need.',
    keyFeatures: ['Feature placeholder', 'Feature placeholder', 'Feature placeholder'],
    technology: ['React', 'Tailwind', 'Node.js'],
    screenshots: [getPlaceholderForType('Web')],
    results: ['Value placeholder', 'Process improvement placeholder', 'Support-ready placeholder'],
  },
  {
    slug: 'project-name-desktop-suite',
    name: 'Project Name',
    industry: 'Industry',
    type: 'Desktop',
    description: 'Placeholder project summary for a desktop-based operational tool.',
    overview: 'Placeholder overview for a desktop or hybrid application built for internal workflows.',
    client: 'Client / Organization',
    challenge: 'Placeholder challenge describing manual processes, disconnected tools, or visibility issues.',
    solution: 'Placeholder solution summary focused on usability, workflows, and reliability.',
    keyFeatures: ['Feature placeholder', 'Feature placeholder', 'Feature placeholder'],
    technology: ['Electron', 'React', 'MySQL'],
    screenshots: [getPlaceholderForType('Desktop')],
    results: ['Value placeholder', 'Operational clarity placeholder', 'Maintainability placeholder'],
  },
  {
    slug: 'project-name-business-software',
    name: 'Project Name',
    industry: 'Industry',
    type: 'Business Software',
    description: 'Placeholder project summary for a custom business management system.',
    overview: 'Placeholder overview for software tailored around sales, inventory, or administrative flows.',
    client: 'Client / Organization',
    challenge: 'Placeholder challenge describing the need for a structured, business-focused platform.',
    solution: 'Placeholder solution summary covering modules, workflows, and reporting.',
    keyFeatures: ['Feature placeholder', 'Feature placeholder', 'Feature placeholder'],
    technology: ['Laravel', 'PHP', 'MySQL'],
    screenshots: [getPlaceholderForType('Business Software')],
    results: ['Value placeholder', 'Decision support placeholder', 'Long-term roadmap placeholder'],
  },
  {
    slug: 'project-name-ai-ml',
    name: 'Project Name',
    industry: 'Industry',
    type: 'AI-ML',
    description: 'Placeholder project summary for an AI-assisted workflow or predictive feature.',
    overview: 'Placeholder overview showing how AI or ML supports decisions inside a real product.',
    client: 'Client / Organization',
    challenge: 'Placeholder challenge describing repetitive analysis or pattern-based decision-making.',
    solution: 'Placeholder solution summary for integrating AI into a practical business flow.',
    keyFeatures: ['Feature placeholder', 'Feature placeholder', 'Feature placeholder'],
    technology: ['Python', 'TensorFlow', 'Scikit-learn'],
    screenshots: [getPlaceholderForType('AI-ML')],
    results: ['Value placeholder', 'Workflow acceleration placeholder', 'Future-ready foundation placeholder'],
  },
]
