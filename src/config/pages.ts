import type { ProcessContent, WhyUsContent } from '../types/siteContent'

export const defaultWhyUs: WhyUsContent = {
  eyebrow: 'Why Us', title: 'Built for practical business value', subtitle:
    'The approach focuses on reliability, fit, and long-term usefulness instead of one-size-fits-all software.', items: [
    {
      id: 'business-focused', title: 'Business-Focused Development', description: 'Solutions are shaped around actual workflows, not generic templates.', }, {
      id: 'custom-solutions', title: 'Custom Solutions', description: 'Every build can be tailored to the way a business operates and grows.', }, {
      id: 'online-offline', title: 'Online & Offline Capability', description: 'Systems can be planned for connectivity gaps and real operating conditions.', }, {
      id: 'scalable', title: 'Scalable Architecture', description: 'Clean structure helps the project evolve without starting over later.', }, {
      id: 'modern-tech', title: 'Modern Technology', description: 'Current frameworks and tools support performance, maintainability, and speed.', }, {
      id: 'long-term-support', title: 'Long-Term Support', description: 'Ongoing fixes, improvements, and iteration can continue after launch.', }, {
      id: 'ai-ready', title: 'AI-Ready', description: 'Systems can be planned with room for useful automation and ML features.', }, ],
}

export const defaultProcess: ProcessContent = {
  eyebrow: 'Process', title: 'A clear path from idea to working solution', subtitle: 'Each step keeps the project aligned with business needs while making delivery easier to track.', steps: [
    { id: '01', number: '01', title: 'Discover', description: 'Understand goals, workflows, constraints, and business priorities.' }, { id: '02', number: '02', title: 'Plan', description: 'Define the right scope, architecture, and delivery direction.' }, { id: '03', number: '03', title: 'Design', description: 'Shape screens, flows, and user interactions around real use.' }, { id: '04', number: '04', title: 'Develop', description: 'Build the project using clean, maintainable implementation.' }, { id: '05', number: '05', title: 'Test', description: 'Check reliability, usability, and operational readiness before launch.' }, { id: '06', number: '06', title: 'Deploy', description: 'Prepare the environment and release the working solution.' }, { id: '07', number: '07', title: 'Support', description: 'Continue with updates, fixes, and improvement planning after delivery.' }, ],
}
