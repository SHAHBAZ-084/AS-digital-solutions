import { createContext, useContext } from 'react'

export type SectionTone = 'light' | 'dark'

export const SectionToneContext = createContext<SectionTone>('light')

export function useSectionTone() {
  return useContext(SectionToneContext)
}
