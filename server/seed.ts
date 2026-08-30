export const seedServices = [
  {
    id: 'web-development', title: 'Web Development', description: 'Fast, modern websites that convert and scale with your business.', icon: 'web', features: [
      'Responsive, performance-first UI', 'SEO-friendly foundations', 'Integrations-ready builds', 'Maintainable code for future growth', ], }, {
    id: 'business-software', title: 'Business Software', description: 'Custom platforms to streamline workflows and improve visibility.', icon: 'business', features: [
      'Role-based access and permissions', 'Workflow automation and dashboards', 'Secure data handling', 'Designed for day-to-day operations', ], }, {
    id: 'ai-ml-solutions', title: 'AI & ML Solutions', description: 'Practical AI that supports decisions, not hype.', icon: 'ai', features: [
      'Use-case discovery and validation', 'Model integration into real products', 'Monitoring and iterative improvement', 'Clear outcomes aligned with business goals', ], }, {
    id: 'custom-software', title: 'Custom Software', description: 'Tailored applications built around your processes and users.', icon: 'custom', features: [
      'Requirement mapping and solution design', 'UX-focused screens and user flows', 'Clean architecture for extensibility', 'Testing and reliable deployments', ], }, {
    id: 'software-consultancy', title: 'Software Consultancy', description: 'Expert guidance to plan, build, and strengthen your software strategy.', icon: 'consultancy', features: [
      'Architecture and technical planning', 'Roadmap support and delivery review', 'Code quality and best-practice alignment', 'Ongoing advisory for long-term results', ], }, {
    id: 'offline-online-solutions', title: 'Offline & Online Solutions', description:
      "Works with or without reliable internet: hybrid architecture for businesses that can't depend on constant connectivity.", icon: 'offline', features: [
      'Offline-first data handling', 'Auto-sync when online', 'No dependency on constant internet', 'Built for real-world business conditions', ], },
]

const caseStudy = (
  overview: string, client: string, challenge: string, solution: string, key_features: string[], results: string[],
) => ({
  overview, client, challenge, solution, key_features, results, screenshot_urls: [] as string[], sections: [] as { id: string; title: string; body: string; bullets: string[] }[],
})

export const seedProducts = [
  {
    id: 'project-name-retail-web', slug: 'project-name-retail-web', name: 'Project Name', industry: 'Industry', type: 'Web', description: 'Placeholder project summary for a website or digital platform.', tech: ['React', 'Tailwind', 'Node.js'], screenshot_url: '', live_url: '', case_study: caseStudy(
      'Placeholder overview describing the project scope, objectives, and digital direction.', 'Client / Organization', 'Placeholder challenge describing the business need this solution was built to solve.', 'Placeholder solution summary showing how the system, website, or product addressed the need.', ['Feature placeholder', 'Feature placeholder', 'Feature placeholder'], ['Value placeholder', 'Process improvement placeholder', 'Support-ready placeholder'], ), }, {
    id: 'project-name-desktop-suite', slug: 'project-name-desktop-suite', name: 'Project Name', industry: 'Industry', type: 'Desktop', description: 'Placeholder project summary for a desktop-based operational tool.', tech: ['Electron', 'React', 'MySQL'], screenshot_url: '', live_url: '', case_study: caseStudy(
      'Placeholder overview for a desktop or hybrid application built for internal workflows.', 'Client / Organization', 'Placeholder challenge describing manual processes, disconnected tools, or visibility issues.', 'Placeholder solution summary focused on usability, workflows, and reliability.', ['Feature placeholder', 'Feature placeholder', 'Feature placeholder'], ['Value placeholder', 'Operational clarity placeholder', 'Maintainability placeholder'], ), }, {
    id: 'project-name-business-software', slug: 'project-name-business-software', name: 'Project Name', industry: 'Industry', type: 'Business Software', description: 'Placeholder project summary for a custom business management system.', tech: ['Laravel', 'PHP', 'MySQL'], screenshot_url: '', live_url: '', case_study: caseStudy(
      'Placeholder overview for software tailored around sales, inventory, or administrative flows.', 'Client / Organization', 'Placeholder challenge describing the need for a structured, business-focused platform.', 'Placeholder solution summary covering modules, workflows, and reporting.', ['Feature placeholder', 'Feature placeholder', 'Feature placeholder'], ['Value placeholder', 'Decision support placeholder', 'Long-term roadmap placeholder'], ), }, {
    id: 'project-name-ai-ml', slug: 'project-name-ai-ml', name: 'Project Name', industry: 'Industry', type: 'AI-ML', description: 'Placeholder project summary for an AI-assisted workflow or predictive feature.', tech: ['Python', 'TensorFlow', 'Scikit-learn'], screenshot_url: '', live_url: '', case_study: caseStudy(
      'Placeholder overview showing how AI or ML supports decisions inside a real product.', 'Client / Organization', 'Placeholder challenge describing repetitive analysis or pattern-based decision-making.', 'Placeholder solution summary for integrating AI into a practical business flow.', ['Feature placeholder', 'Feature placeholder', 'Feature placeholder'], ['Value placeholder', 'Workflow acceleration placeholder', 'Future-ready foundation placeholder'], ), },
]

export const seedTeam = [
  {
    id: 'team-1', name: 'Team Member Name', role: 'Role', bio: 'Placeholder bio describing what this team member contributes to delivery, communication, or product development.', skills: ['Skill placeholder A', 'Skill placeholder B', 'Skill placeholder C'], links: { linkedin: '', email: '' }, }, {
    id: 'team-2', name: 'Team Member Name', role: 'Role', bio: 'Placeholder bio describing the focus area, domain experience, or technical support this person provides.', skills: ['Skill placeholder D', 'Skill placeholder E', 'Skill placeholder F'], links: { linkedin: '', email: '' }, }, {
    id: 'team-3', name: 'Team Member Name', role: 'Role', bio: 'Placeholder bio for a future team profile, ready for real name, role, links, and background.', skills: ['Skill placeholder G', 'Skill placeholder H', 'Skill placeholder I'], links: { linkedin: '', email: '' }, },
]

export const seedTechnologies = [
  { id: 'react', name: 'React', category: 'Frontend', icon: 'frontend' }, { id: 'javascript', name: 'JavaScript', category: 'Frontend', icon: 'frontend' }, { id: 'html', name: 'HTML', category: 'Frontend', icon: 'frontend' }, { id: 'css', name: 'CSS', category: 'Frontend', icon: 'frontend' }, { id: 'tailwind', name: 'Tailwind', category: 'Frontend', icon: 'frontend' }, { id: 'nodejs', name: 'Node.js', category: 'Backend', icon: 'backend' }, { id: 'express', name: 'Express', category: 'Backend', icon: 'backend' }, { id: 'php', name: 'PHP', category: 'Backend', icon: 'backend' }, { id: 'laravel', name: 'Laravel', category: 'Backend', icon: 'backend' }, { id: 'mysql', name: 'MySQL', category: 'Database', icon: 'database' }, { id: 'mongodb', name: 'MongoDB', category: 'Database', icon: 'database' }, { id: 'electron', name: 'Electron', category: 'Desktop', icon: 'desktop' }, { id: 'python', name: 'Python', category: 'AI/ML', icon: 'ai' }, { id: 'tensorflow', name: 'TensorFlow', category: 'AI/ML', icon: 'ai' }, { id: 'scikit-learn', name: 'Scikit-learn', category: 'AI/ML', icon: 'ai' },
]

export const seedContact = {
  whatsapp_number: '+92-XXX-XXXXXXX',
  email: 'contactasdigitalsolutions@gmail.com',
  phone: '+92-XXX-XXXXXXX',
  address: 'Placeholder address',
  socials: { linkedin: '', facebook: '', instagram: '' },
}
