/**
 * Conservative content-quality checks shared by all subject question banks.
 * These detect obvious drafting residue, not factual correctness or pedagogy.
 */
export function hasSubstantiveQuestionText(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const text = value.trim();
  if (!text) return false;
  return !/^(?:[#/*-]\s*)?(?:TODO|TBD|FIXME|PLACEHOLDER)\b/i.test(text);
}

export function normalizeAnswerOption(value: unknown): string {
  return String(value ?? '')
    .normalize('NFKC')
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('en-US');
}
