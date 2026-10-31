export type CsvRecord = Record<string, string>;

export function parseCsv(text: string): CsvRecord[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]!;
    if (char === '"') {
      if (quoted && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(field);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  if (rows.length < 2) return [];
  const headers = rows[0]!.map((value) => value.trim());
  return rows.slice(1).map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])),
  );
}

export interface QuestionCoverageInput {
  cognitiveLevel?: string;
  difficulty?: string;
  type?: string;
  sourceCitation?: string;
}

export function summarizeQuestionCoverage(questions: readonly QuestionCoverageInput[]) {
  const count = (key: 'cognitiveLevel' | 'difficulty' | 'type') => {
    const result: Record<string, number> = {};
    for (const question of questions) {
      const value = question[key] || 'unspecified';
      result[value] = (result[value] ?? 0) + 1;
    }
    return result;
  };
  const levels = count('cognitiveLevel');
  const applyOrHigher = questions.filter((question) =>
    ['apply', 'analyze', 'evaluate', 'create'].includes(question.cognitiveLevel ?? ''),
  ).length;
  return {
    total: questions.length,
    cognitiveLevels: levels,
    difficulty: count('difficulty'),
    types: count('type'),
    applyOrHigher,
    missingCitations: questions.filter((question) => {
      const citation = question.sourceCitation?.trim() ?? '';
      return !citation || /^CGEI curriculum \(migrated\)/i.test(citation) || /^Master Study TOC(?:\s|·)/i.test(citation);
    }).length,
    meetsReviewMinimum: questions.length >= 3 && Object.keys(levels).filter((level) => level !== 'unspecified').length >= 2 && applyOrHigher >= 1,
  };
}
