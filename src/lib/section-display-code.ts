/**
 * Human-facing labels for section badges.
 *
 * Section IDs are stable internal keys; some legacy CGEI keys encode unit
 * numbers with padding (for example CGEI-024) and must not be displayed raw.
 */
const SECTION_DISPLAY_CODES: Record<string, string> = {
  'CGEI-01': '1',
  'CGEI-024': '2.4',
  'CGEI-025': '2.5',
  'CGEI-02': '2.6',
  'CGEI-03': '3',
  'CGEI-04': '4',
  'CGEI-051': '5.1',
  'CGEI-06': '6',
  'CGEI-07': '7',
  'CGEI-08': '8',
  'CGEI-09': '9',
  'CGEI-10': '10',
  'CGEI-11': '11',
  'CGEI-12': '12',
  'CGEI-13': '13',
  'CGEI-14': '14',
};

export function getSectionDisplayCode(sectionId: string): string {
  const knownCode = SECTION_DISPLAY_CODES[sectionId];
  if (knownCode) return knownCode;
  const separator = sectionId.lastIndexOf('-');
  return separator >= 0 ? sectionId.slice(separator + 1) : sectionId;
}
