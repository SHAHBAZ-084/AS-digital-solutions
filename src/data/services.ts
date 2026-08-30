export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  icon: string
  sort_order?: number
}

export const services: Service[] = [
  {
    id: 'web-development', title: 'Web Development', description: 'Fast, modern websites that convert and scale with your business.', features: [
      'Responsive, performance-first UI', 'SEO-friendly foundations', 'Integrations-ready builds', 'Maintainable code for future growth', ], icon: 'web', }, {
    id: 'business-software', title: 'Business Software', description: 'Custom platforms to streamline workflows and improve visibility.', features: [
      'Role-based access and permissions', 'Workflow automation and dashboards', 'Secure data handling', 'Designed for day-to-day operations', ], icon: 'business', }, {
    id: 'ai-ml-solutions', title: 'AI & ML Solutions', description: 'Practical AI that supports decisions, not hype.', features: [
      'Use-case discovery and validation', 'Model integration into real products', 'Monitoring and iterative improvement', 'Clear outcomes aligned with business goals', ], icon: 'ai', }, {
    id: 'custom-software', title: 'Custom Software', description: 'Tailored applications built around your processes and users.', features: [
      'Requirement mapping and solution design', 'UX-focused screens and user flows', 'Clean architecture for extensibility', 'Testing and reliable deployments', ], icon: 'custom', }, {
    id: 'software-consultancy', title: 'Software Consultancy', description: 'Expert guidance to plan, build, and strengthen your software strategy.', features: [
      'Architecture and technical planning', 'Roadmap support and delivery review', 'Code quality and best-practice alignment', 'Ongoing advisory for long-term results', ], icon: 'consultancy', }, {
    id: 'offline-online-solutions', title: 'Offline & Online Solutions', description:
      "Works with or without reliable internet: hybrid architecture for businesses that can't depend on constant connectivity.", features: [
      'Offline-first data handling', 'Auto-sync when online', 'No dependency on constant internet', 'Built for real-world business conditions', ], icon: 'offline', },
]

