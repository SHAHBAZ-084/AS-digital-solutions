/** Strip list markers users often paste into “one per line” admin fields. */
export function cleanListItem(value: string): string {
  return value.replace(/^[\s•·\-–—*\u2022\u2023\u25E6\u2043\u00B7]+/u, '').trim()
}

export function linesToList(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map(cleanListItem)
    .filter(Boolean)
}

export function normalizeStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is string => typeof item === 'string')
    .map(cleanListItem)
    .filter(Boolean)
}
