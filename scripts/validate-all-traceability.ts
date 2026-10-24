/**
 * Validate every committed per-subtopic traceability matrix, not only the
 * Subject 5 pilot files hard-coded in validate-source-traceability.ts.
 *
 * Run with: npm run validate:traceability:all
 *
 * This validates structural/evidence integrity. It does not assert that a
 * mapped_partial row is semantically complete or that the source inventory
 * itself is exhaustive.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cgeiCurriculum } from '../src/data/cgei/curriculum';
import { validateTraceabilityRow } from '../src/data/cgei/traceability-validation';

type Row = Record<string, string>;

const errors: string[] = [];
const directory = resolve(process.cwd(), 'docs/cgei');
const files = readdirSync(directory)
  .filter((file) => /^subject-\d+-unit-.+-subtopic-traceability\.csv$/.test(file))
  .sort();

const requiredHeaders = [
  'source_subtopic_path',
  'source_subtopic_title',
  'parent_topic_path',
  'parent_topic_title',
  'priority',
  'app_lesson_id',
  'app_content_block_ids',
  'disposition',
  'evidence_note',
];

function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  const text = input.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
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
  if (quoted) errors.push('CSV parser reached end of file inside a quoted field.');
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((value) => value.length > 0)) rows.push(row);
  }
  return rows;
}

const lessons = new Map(cgeiCurriculum.lessons.map((lesson) => [lesson.id, lesson]));
const globalPaths = new Map<string, string>();
const summary = new Map<string, number>();
let totalRows = 0;

if (files.length === 0) errors.push('No per-subtopic traceability CSV files were found.');

for (const file of files) {
  const label = `docs/cgei/${file}`;
  let rows: string[][];
  try {
    rows = parseCsv(readFileSync(resolve(directory, file), 'utf8'));
  } catch (error) {
    errors.push(`${label}: could not read/parse file: ${String(error)}`);
    continue;
  }

  const headers = rows[0] ?? [];
  for (const header of requiredHeaders) {
    if (!headers.includes(header)) errors.push(`${label}: missing required column "${header}"`);
  }
  if (new Set(headers).size !== headers.length) errors.push(`${label}: duplicate CSV header`);
  const records: Row[] = rows.slice(1).map((values, index) => {
    if (values.length !== headers.length) {
      errors.push(`${label}: row ${index + 2} has ${values.length} columns; expected ${headers.length}`);
    }
    return Object.fromEntries(headers.map((header, column) => [header, values[column] ?? ''])) as Row;
  });

  const localPaths = new Set<string>();
  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    const line = index + 2;
    const path = record.source_subtopic_path?.trim() ?? '';
    const rowLabel = `${label}:${line} [${path || 'missing source path'}]`;
    totalRows += 1;

    for (const field of ['source_subtopic_path', 'source_subtopic_title', 'parent_topic_path', 'parent_topic_title', 'priority', 'disposition', 'evidence_note']) {
      if (!record[field]?.trim()) errors.push(`${rowLabel}: required field "${field}" is empty`);
    }

    if (path) {
      if (localPaths.has(path)) errors.push(`${rowLabel}: duplicate source path in the same matrix`);
      localPaths.add(path);
      const previousFile = globalPaths.get(path);
      if (previousFile && previousFile !== file) {
        errors.push(`${rowLabel}: source path also appears in ${previousFile}; keep one authoritative matrix row per source path`);
      } else {
        globalPaths.set(path, file);
      }
      const expectedParent = path.split('.').slice(0, -1).join('.');
      if (record.parent_topic_path !== expectedParent) {
        errors.push(`${rowLabel}: parent path is "${record.parent_topic_path}", expected "${expectedParent}"`);
      }
    }

    if (!['Core', 'Support', 'Optional'].includes(record.priority)) {
      errors.push(`${rowLabel}: invalid priority "${record.priority}"`);
    }

    for (const issue of validateTraceabilityRow(record, lessons)) {
      errors.push(`${rowLabel}: ${issue.code}: ${issue.message}`);
    }

    const key = `subject ${path.split('.')[0] || '?'} / ${record.disposition || 'missing disposition'}`;
    summary.set(key, (summary.get(key) ?? 0) + 1);
  }
  console.log(`${label}: ${records.length} rows`);
}

console.log(`All-domain traceability scan: ${files.length} matrices, ${totalRows} rows, ${globalPaths.size} unique source paths.`);
for (const [key, count] of [...summary.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  console.log(`  ${key}: ${count}`);
}
console.log('Structural validation does not certify semantic completeness or source-inventory exhaustiveness.');

if (errors.length > 0) {
  console.error(`\nAll-domain traceability validation failed: ${errors.length} issue(s)`);
  for (const error of errors) console.error(`  ERROR: ${error}`);
  process.exitCode = 1;
} else {
  console.log('\nAll-domain traceability validation passed.');
}
