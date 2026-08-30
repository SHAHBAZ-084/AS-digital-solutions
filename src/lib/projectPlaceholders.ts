import placeholderWeb from '../assets/projects/placeholder-web.jpg'
import placeholderDesktop from '../assets/projects/placeholder-desktop.jpg'
import placeholderBusiness from '../assets/projects/placeholder-business.jpg'
import placeholderAi from '../assets/projects/placeholder-ai.jpg'

export type ProjectType = 'Web' | 'Desktop' | 'Business Software' | 'AI-ML'

const placeholders: Record<ProjectType, string> = {
  Web: placeholderWeb, Desktop: placeholderDesktop, 'Business Software': placeholderBusiness, 'AI-ML': placeholderAi,
}

const projectTypes: ProjectType[] = ['Web', 'Desktop', 'Business Software', 'AI-ML']

export function asProjectType(value: string | undefined | null): ProjectType {
  return projectTypes.includes(value as ProjectType) ? (value as ProjectType) : 'Web'
}

/** Type-based fallback image when a project has no uploaded screenshots. */
export function getPlaceholderForType(type: string | undefined | null): string {
  return placeholders[asProjectType(type)]
}

/** Prefer real screenshots; otherwise fall back to the type placeholder. */
export function resolveProjectScreenshots(
  type: string | undefined | null, urls: Array<string | undefined | null> | undefined,
): string[] {
  const cleaned = (urls ?? []).map((url) => (typeof url === 'string' ? url.trim() : '')).filter(Boolean)
  return cleaned.length > 0 ? cleaned : [getPlaceholderForType(type)]
}
