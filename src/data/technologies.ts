export type TechnologyCategory = 'Frontend' | 'Backend' | 'Database' | 'Desktop' | 'AI/ML'

export interface Technology {
  id: string
  name: string
  category: TechnologyCategory
  icon: string
  sort_order?: number
}

export const technologies: Technology[] = [
  { id: 'react', name: 'React', category: 'Frontend', icon: 'frontend' }, { id: 'javascript', name: 'JavaScript', category: 'Frontend', icon: 'frontend' }, { id: 'html', name: 'HTML', category: 'Frontend', icon: 'frontend' }, { id: 'css', name: 'CSS', category: 'Frontend', icon: 'frontend' }, { id: 'tailwind', name: 'Tailwind', category: 'Frontend', icon: 'frontend' }, { id: 'nodejs', name: 'Node.js', category: 'Backend', icon: 'backend' }, { id: 'express', name: 'Express', category: 'Backend', icon: 'backend' }, { id: 'php', name: 'PHP', category: 'Backend', icon: 'backend' }, { id: 'laravel', name: 'Laravel', category: 'Backend', icon: 'backend' }, { id: 'mysql', name: 'MySQL', category: 'Database', icon: 'database' }, { id: 'mongodb', name: 'MongoDB', category: 'Database', icon: 'database' }, { id: 'electron', name: 'Electron', category: 'Desktop', icon: 'desktop' }, { id: 'python', name: 'Python', category: 'AI/ML', icon: 'ai' }, { id: 'tensorflow', name: 'TensorFlow', category: 'AI/ML', icon: 'ai' }, { id: 'scikit-learn', name: 'Scikit-learn', category: 'AI/ML', icon: 'ai' },
]

