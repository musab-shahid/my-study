import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cgeiCurriculum } from '../src/data/cgei/curriculum';
import { validateTraceabilityRow } from '../src/data/cgei/traceability-validation';

type Row = Record<string, string>;
const errors: string[] = [];
const lessons = new Map(cgeiCurriculum.lessons.map((lesson) => [lesson.id, lesson]));
const lessonRecords = new Map(cgeiCurriculum.lessons.map((lesson) => [lesson.id, lesson]));
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
  const requiredHeaders = ['source_subtopic_path', 'source_subtopic_title', 'parent_topic_path', 'parent_topic_title', 'priority', 'app_lesson_id', 'app_content_block_ids', 'disposition', 'evidence_note'];
  for (const header of requiredHeaders) if (!headers.includes(header)) errors.push(`${label}: missing required CSV column ${header}`);
  const records: Row[] = rows.slice(1).map((values, index) => {
    if (values.length !== headers.length) errors.push(`${label}: row ${index + 2} has ${values.length} columns; expected ${headers.length}`);
    return Object.fromEntries(headers.map((header, column) => [header, values[column] ?? ''])) as Row;
  });
  const paths = records.map((record) => record.source_subtopic_path);
  if (new Set(paths).size !== paths.length) errors.push(`${label}: duplicate source subtopic path`);
  for (const path of expectedPaths) if (!paths.includes(path)) errors.push(`${label}: missing source path ${path}`);
  for (const path of paths) if (!expectedPaths.includes(path)) errors.push(`${label}: unexpected source path ${path}`);
  const parentTitles = new Map<string, string>();
  for (const record of records) {
    const path = record.source_subtopic_path;
    for (const field of ['source_subtopic_path', 'source_subtopic_title', 'parent_topic_path', 'parent_topic_title', 'priority', 'disposition']) {
      if (!record[field]?.trim()) errors.push(`${label} row ${path || '(missing path)'}: required field ${field} is empty`);
    }
    const previousParentTitle = parentTitles.get(record.parent_topic_path);
    if (previousParentTitle && previousParentTitle !== record.parent_topic_title) errors.push(`${label} ${path}: inconsistent parent title for ${record.parent_topic_path}`);
    else parentTitles.set(record.parent_topic_path, record.parent_topic_title);
    const lesson = lessons.get(record.app_lesson_id);
    const expectedParent = path.split('.').slice(0, 3).join('.');
    const expectedLessonId = `cgei-ds-lesson-${expectedParent.replaceAll('.', '-')}`;
    if (record.app_lesson_id !== expectedLessonId) errors.push(`${label} ${path}: lesson ${record.app_lesson_id} does not match source parent ${expectedParent}; expected ${expectedLessonId}`);
    if (record.parent_topic_path !== expectedParent) {
      errors.push(`${label} ${path}: wrong parent ${record.parent_topic_path}, expected ${expectedParent}`);
    }
    if (!['Core', 'Support', 'Optional'].includes(record.priority)) errors.push(`${label} ${path}: invalid priority ${record.priority}`);
    if (!['mapped', 'mapped_partial', 'gap', 'deferred', 'candidate'].includes(record.disposition)) errors.push(`${label} ${path}: unsupported disposition ${record.disposition}`);
    for (const issue of validateTraceabilityRow(record, lessonRecords)) {
      errors.push(`${label} ${path}: ${issue.message}`);
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

function auditTopicCrosswalk() {
  const file = 'docs/cgei/subject-5-topic-crosswalk.csv';
  const rows = parseCsv(readFileSync(resolve(process.cwd(), file), 'utf8'));
  const headers = rows[0] ?? [];
  const requiredHeaders = ['source_topic_path', 'source_topic_title', 'priority', 'mapping_status', 'app_lesson_ids', 'subtopic_coverage_status', 'notes'];
  for (const header of requiredHeaders) if (!headers.includes(header)) errors.push(`Subject 5 topic crosswalk: missing required CSV column ${header}`);
  const records: Row[] = rows.slice(1).map((values, index) => {
    if (values.length !== headers.length) errors.push(`Subject 5 topic crosswalk: row ${index + 2} has ${values.length} columns; expected ${headers.length}`);
    return Object.fromEntries(headers.map((header, column) => [header, values[column] ?? ''])) as Row;
  });
  const paths = records.map((record) => record.source_topic_path);
  const expectedPaths = [
    '5.1.1','5.1.2','5.1.3','5.1.4',
    '5.2.1','5.2.2','5.2.3','5.2.4','5.2.5',
    '5.3.1','5.3.2','5.3.3','5.3.4','5.3.5',
    '5.4.1','5.4.2','5.4.3','5.4.4','5.4.5',
    '5.5.1','5.5.2','5.5.3','5.5.4','5.5.5',
  ];
  if (new Set(paths).size !== paths.length) errors.push('Subject 5 topic crosswalk: duplicate source topic path');
  for (const path of expectedPaths) if (!paths.includes(path)) errors.push(`Subject 5 topic crosswalk: missing source path ${path}`);
  for (const path of paths) if (!expectedPaths.includes(path)) errors.push(`Subject 5 topic crosswalk: unexpected source path ${path}`);
  for (const record of records) {
    const path = record.source_topic_path;
    for (const field of ['source_topic_path', 'source_topic_title', 'priority', 'mapping_status', 'subtopic_coverage_status', 'notes']) {
      if (!record[field]?.trim()) errors.push(`Subject 5 topic crosswalk row ${path || '(missing path)'}: required field ${field} is empty`);
    }
    const status = record.mapping_status;
    if (!['Core', 'Support', 'Optional'].includes(record.priority)) errors.push(`Subject 5 topic crosswalk ${path}: invalid priority ${record.priority}`);
    const lessonIds = record.app_lesson_ids.split(';').filter(Boolean);
    if (!['candidate', 'unresolved', 'gap', 'partial', 'split_partial', 'gap_or_partial'].includes(status)) {
      errors.push(`Subject 5 topic crosswalk ${path}: unsupported mapping_status ${status}`);
    }
    if (record.subtopic_coverage_status === 'not_audited' && !['candidate', 'unresolved', 'gap'].includes(status)) {
      errors.push(`Subject 5 topic crosswalk ${path}: unaudited subtopics cannot be represented as ${status}; use candidate, unresolved, or gap`);
    }
    if (['candidate', 'partial', 'split_partial', 'gap_or_partial'].includes(status) && lessonIds.length === 0) {
      errors.push(`Subject 5 topic crosswalk ${path}: ${status} mapping must identify candidate lesson IDs or be marked unresolved/gap`);
    }
    for (const lessonId of lessonIds) {
      if (!lessons.has(lessonId)) errors.push(`Subject 5 topic crosswalk ${path}: unknown lesson ID ${lessonId}`);
      const expectedUnitPrefix = `cgei-ds-lesson-${path.split('.').slice(0, 2).join('-')}-`;
      if (!lessonId.startsWith(expectedUnitPrefix)) errors.push(`Subject 5 topic crosswalk ${path}: lesson ${lessonId} belongs outside source unit ${path.split('.').slice(0, 2).join('.')}`);
    }
  }
  console.log(`Subject 5 topic crosswalk: audited ${records.length} topics; ${records.filter((record) => record.mapping_status === 'candidate').length} candidates, ${records.filter((record) => record.mapping_status === 'gap').length} explicit gaps`);
}

try {
  auditTopicCrosswalk();
} catch (error) {
  errors.push(`Could not validate Subject 5 topic crosswalk: ${String(error)}`);
}

if (errors.length) {
  console.error(`Source traceability validation failed: ${errors.length} error(s)`);
  for (const error of errors) console.error(`  ERROR: ${error}`);
  process.exitCode = 1;
} else console.log('Source traceability validation passed.');
