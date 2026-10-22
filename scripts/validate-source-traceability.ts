import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cgeiCurriculum } from '../src/data/cgei/curriculum';

type Row = Record<string, string>;
const errors: string[] = [];
const lessons = new Map(cgeiCurriculum.lessons.map((lesson) => [lesson.id, lesson]));
const contentBlocks = new Set(cgeiCurriculum.lessons.flatMap((lesson) => lesson.content.map((block) => block.id)));

function parseCsv(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  const text = input.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') { field += '"'; i += 1; }
      else quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(field); field = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(field);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = []; field = '';
    } else field += char;
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function audit(file: string, label: string, expectedPaths: string[]) {
  const input = readFileSync(resolve(process.cwd(), file), 'utf8');
  const rows = parseCsv(input);
  const headers = rows[0] ?? [];
  const records: Row[] = rows.slice(1).map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])) as Row);
  const paths = records.map((record) => record.source_subtopic_path);
  if (new Set(paths).size !== paths.length) errors.push(`${label}: duplicate source subtopic path`);
  for (const path of expectedPaths) if (!paths.includes(path)) errors.push(`${label}: missing source path ${path}`);
  for (const path of paths) if (!expectedPaths.includes(path)) errors.push(`${label}: unexpected source path ${path}`);
  for (const record of records) {
    const path = record.source_subtopic_path;
    const lesson = lessons.get(record.app_lesson_id);
    if (!lesson) errors.push(`${label} ${path}: unknown lesson ${record.app_lesson_id}`);
    const expectedParent = path.split('.').slice(0, 3).join('.');
    if (record.parent_topic_path !== expectedParent) {
      errors.push(`${label} ${path}: wrong parent ${record.parent_topic_path}, expected ${expectedParent}`);
    }
    if (!['Core', 'Support', 'Optional'].includes(record.priority)) errors.push(`${label} ${path}: invalid priority ${record.priority}`);
    const blockIds = record.app_content_block_ids.split(';').filter(Boolean);
    if (['mapped', 'mapped_partial'].includes(record.disposition) && blockIds.length === 0) {
      errors.push(`${label} ${path}: coverage disposition lacks content-block evidence`);
    }
    if (!['mapped', 'mapped_partial', 'gap', 'deferred', 'candidate'].includes(record.disposition)) {
      errors.push(`${label} ${path}: unsupported disposition ${record.disposition}`);
    }
    for (const blockId of blockIds) {
      if (!contentBlocks.has(blockId)) errors.push(`${label} ${path}: unknown content-block ID ${blockId}`);
      else if (lesson && !lesson.content.some((block) => block.id === blockId)) {
        errors.push(`${label} ${path}: block ${blockId} exists but is not in declared lesson ${lesson.id}`);
      }
    }
    if (['gap', 'deferred'].includes(record.disposition) && !record.evidence_note.trim()) {
      errors.push(`${label} ${path}: gap/defer requires an evidence note`);
    }
  }
  console.log(`${label}: audited ${records.length} subtopics (${records.filter((r) => ['mapped', 'mapped_partial'].includes(r.disposition)).length} with content evidence, ${records.filter((r) => r.disposition === 'gap').length} explicit gaps)`);
}

audit('docs/cgei/subject-5-unit-5-4-subtopic-traceability.csv', 'Subject 5.4', [
  '5.4.1.1','5.4.1.2','5.4.1.3','5.4.2.1','5.4.2.2','5.4.2.3','5.4.2.4',
  '5.4.3.1','5.4.3.2','5.4.3.3','5.4.4.1','5.4.4.2','5.4.4.3','5.4.5.1','5.4.5.2','5.4.5.3',
]);
audit('docs/cgei/subject-5-unit-5-5-subtopic-traceability.csv', 'Subject 5.5', [
  '5.5.1.1','5.5.1.2','5.5.1.3','5.5.2.1','5.5.2.2','5.5.2.3','5.5.2.4',
  '5.5.3.1','5.5.3.2','5.5.3.3','5.5.4.1','5.5.4.2','5.5.4.3','5.5.5.1','5.5.5.2','5.5.5.3',
]);
if (errors.length) {
  console.error(`Source traceability validation failed: ${errors.length} error(s)`);
  for (const error of errors) console.error(`  ERROR: ${error}`);
  process.exitCode = 1;
} else console.log('Source traceability validation passed.');
