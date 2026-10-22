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

const authoritativeSourceMetadata: Record<string, { title: string; parentTitle: string }> = {
  '5.4.1.1': { title: 'Random variables; common distributions', parentTitle: 'Probability and distributions' },
  '5.4.1.2': { title: 'Expectation, variance, covariance', parentTitle: 'Probability and distributions' },
  '5.4.1.3': { title: 'Distribution fitting for environmental variables (normal, log-normal, gamma, Weibull); goodness-of-fit and transformations', parentTitle: 'Probability and distributions' },
  '5.4.2.1': { title: 'Sampling distributions; standard error', parentTitle: 'Sampling' },
  '5.4.2.2': { title: 'Sampling bias and representativeness', parentTitle: 'Sampling' },
  '5.4.2.3': { title: 'Sampling designs and their estimators at overview level', parentTitle: 'Sampling' },
  '5.4.3.1': { title: 'Confidence intervals', parentTitle: 'Confidence intervals and hypothesis tests' },
  '5.4.3.2': { title: 'Hypothesis tests; p-values and their limits', parentTitle: 'Confidence intervals and hypothesis tests' },
  '5.4.3.3': { title: 'Effect sizes', parentTitle: 'Confidence intervals and hypothesis tests' },
  '5.4.3.4': { title: 'Type I / II errors; power (conceptual)', parentTitle: 'Confidence intervals and hypothesis tests' },
  '5.4.3.5': { title: 'Multiple testing problem', parentTitle: 'Confidence intervals and hypothesis tests' },
  '5.4.4.1': { title: 'Non-parametric tests (Wilcoxon, Kruskal–Wallis, Kolmogorov–Smirnov); QQ plots; robust statistics', parentTitle: 'Non-parametric and categorical methods' },
  '5.4.4.2': { title: 'ANOVA and chi-square tests; contingency tables (hits, misses, false alarms) — link to verification in Subject 7', parentTitle: 'Non-parametric and categorical methods' },
  '5.4.4.3': { title: 'Power and sample-size calculations; effective sample size under autocorrelation', parentTitle: 'Non-parametric and categorical methods' },
  '5.4.5.1': { title: 'Pearson/Spearman correlation; partial correlation idea', parentTitle: 'Correlation and simple regression' },
  '5.4.5.2': { title: 'Simple linear regression; assumptions', parentTitle: 'Correlation and simple regression' },
  '5.4.5.3': { title: 'Residuals and basic diagnostics', parentTitle: 'Correlation and simple regression' },
  '5.4.5.4': { title: 'Correlation ≠ causation', parentTitle: 'Correlation and simple regression' },
  '5.5.1.1': { title: 'Question and variable catalogue first', parentTitle: 'End-to-end workflow' },
  '5.5.1.2': { title: 'Discovery, access, ingestion, quality assessment', parentTitle: 'End-to-end workflow' },
  '5.5.1.3': { title: 'Transformation, analysis, visualisation, reporting', parentTitle: 'End-to-end workflow' },
  '5.5.1.4': { title: 'Data lineage and reproducibility', parentTitle: 'End-to-end workflow' },
  '5.5.2.1': { title: 'Data management plans, FAIR principles, and metadata (DataCite, ISO 19115) for released datasets', parentTitle: 'Data management and licensing' },
  '5.5.2.2': { title: 'Data licences: CC-BY, ODbL, non-commercial clauses; recording the licence in the manifest', parentTitle: 'Data management and licensing' },
  '5.5.2.3': { title: 'Licence compliance for USGS, Copernicus, CDS, demographic data', parentTitle: 'Data management and licensing' },
  '5.5.3.1': { title: 'Large-data tools: Arrow/Parquet, Polars, DuckDB, Dask; chunk-size tuning; memory profiling', parentTitle: 'Large-data tools' },
  '5.5.3.2': { title: 'Sizing and profiling: when data fit in memory and when they do not', parentTitle: 'Large-data tools' },
  '5.5.3.3': { title: 'Columnar and chunked formats for repeated analysis', parentTitle: 'Large-data tools' },
  '5.5.4.1': { title: 'SELECT, WHERE, JOIN, GROUP BY, aggregates', parentTitle: 'SQL and structured data' },
  '5.5.4.2': { title: 'CTEs, subqueries, window functions', parentTitle: 'SQL and structured data' },
  '5.5.4.3': { title: 'NULL handling and date functions', parentTitle: 'SQL and structured data' },
  '5.5.4.4': { title: 'Keys, normalisation, indexes — conceptual schema design', parentTitle: 'SQL and structured data' },
  '5.5.5.1': { title: 'HTTP, JSON, pagination, status codes', parentTitle: 'APIs and acquisition' },
  '5.5.5.2': { title: 'Authentication patterns; rate limits; retries', parentTitle: 'APIs and acquisition' },
  '5.5.5.3': { title: 'Download manifests: URL, version, extent, date, licence, checksum', parentTitle: 'APIs and acquisition' },
  '5.5.5.4': { title: 'When no API exists (e.g. data published as web pages or PDFs): manual extraction protocol, double entry, and checks; robots.txt and terms of use', parentTitle: 'APIs and acquisition' },
  '5.5.5.5': { title: 'Credential management; environment variables; never in notebooks or repositories', parentTitle: 'APIs and acquisition' },
};

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
    const authoritative = authoritativeSourceMetadata[path];
    if (authoritative && record.source_subtopic_title !== authoritative.title) {
      errors.push(`${label} ${path}: source title differs from authoritative TOC; expected "${authoritative.title}"`);
    }
    if (authoritative && record.parent_topic_title !== authoritative.parentTitle) {
      errors.push(`${label} ${path}: parent title differs from authoritative TOC; expected "${authoritative.parentTitle}"`);
    }
    for (const field of ['source_subtopic_path', 'source_subtopic_title', 'parent_topic_path', 'parent_topic_title', 'priority', 'disposition']) {
      if (!record[field]?.trim()) errors.push(`${label} row ${path || '(missing path)'}: required field ${field} is empty`);
    }
    const previousParentTitle = parentTitles.get(record.parent_topic_path);
    if (previousParentTitle && previousParentTitle !== record.parent_topic_title) errors.push(`${label} ${path}: inconsistent parent title for ${record.parent_topic_path}`);
    else parentTitles.set(record.parent_topic_path, record.parent_topic_title);
    const expectedParent = path.split('.').slice(0, 3).join('.');
    const expectedUnitPrefix = `cgei-ds-lesson-${path.split('.').slice(0, 2).join('-')}-`;
    if (record.app_lesson_id && !record.app_lesson_id.startsWith(expectedUnitPrefix)) {
      errors.push(`${label} ${path}: lesson ${record.app_lesson_id} belongs outside source unit ${path.split('.').slice(0, 2).join('.')}`);
    }
    if (!record.app_lesson_id && ['mapped', 'mapped_partial'].includes(record.disposition)) {
      errors.push(`${label} ${path}: mapped rows must identify app_lesson_id`);
    }
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

audit('docs/cgei/subject-5-unit-5-2-subtopic-traceability.csv', 'Subject 5.2', [
  '5.2.1.1', '5.2.1.2', '5.2.1.3', '5.2.1.4',
  '5.2.2.1', '5.2.2.2', '5.2.2.3', '5.2.2.4', '5.2.2.5',
  '5.2.3.1', '5.2.3.2', '5.2.3.3', '5.2.3.4', '5.2.3.5', '5.2.3.6', '5.2.3.7',
  '5.2.4.1', '5.2.4.2', '5.2.4.3', '5.2.4.4',
  '5.2.5.1', '5.2.5.2', '5.2.5.3',
]);
audit('docs/cgei/subject-5-unit-5-3-subtopic-traceability.csv', 'Subject 5.3', [
  '5.3.1.1', '5.3.1.2', '5.3.1.3', '5.3.1.4',
  '5.3.2.1', '5.3.2.2', '5.3.2.3',
  '5.3.3.1', '5.3.3.2', '5.3.3.3', '5.3.3.4',
  '5.3.4.1', '5.3.4.2', '5.3.4.3',
  '5.3.5.1', '5.3.5.2', '5.3.5.3',
]);
audit('docs/cgei/subject-5-unit-5-4-subtopic-traceability.csv', 'Subject 5.4', [
  '5.4.1.1','5.4.1.2','5.4.1.3','5.4.2.1','5.4.2.2','5.4.2.3',
  '5.4.3.1','5.4.3.2','5.4.3.3','5.4.3.4','5.4.3.5',
  '5.4.4.1','5.4.4.2','5.4.4.3','5.4.5.1','5.4.5.2','5.4.5.3','5.4.5.4',
]);
audit('docs/cgei/subject-5-unit-5-5-subtopic-traceability.csv', 'Subject 5.5', [
  '5.5.1.1','5.5.1.2','5.5.1.3','5.5.1.4',
  '5.5.2.1','5.5.2.2','5.5.2.3',
  '5.5.3.1','5.5.3.2','5.5.3.3',
  '5.5.4.1','5.5.4.2','5.5.4.3','5.5.4.4',
  '5.5.5.1','5.5.5.2','5.5.5.3','5.5.5.4','5.5.5.5',
]);


const expectedSubtopicPaths = (topics: Array<[string, number]>): string[] =>
  topics.flatMap(([topic, count]) => Array.from({ length: count }, (_, index) => `${topic}.${index + 1}`));

audit('docs/cgei/subject-5-unit-5.1-subtopic-traceability.csv', 'Subject 5.1', expectedSubtopicPaths([
  ['5.1.1', 3], ['5.1.2', 3], ['5.1.3', 3], ['5.1.4', 3],
]));
audit('docs/cgei/subject-5-unit-5.6-subtopic-traceability.csv', 'Subject 5.6', expectedSubtopicPaths([
  ['5.6.1', 4], ['5.6.2', 3], ['5.6.3', 4], ['5.6.4', 5],
]));
audit('docs/cgei/subject-5-unit-5.7-subtopic-traceability.csv', 'Subject 5.7', expectedSubtopicPaths([
  ['5.7.1', 3], ['5.7.2', 3], ['5.7.3', 3],
]));
audit('docs/cgei/subject-5-unit-5.8-subtopic-traceability.csv', 'Subject 5.8', expectedSubtopicPaths([
  ['5.8.1', 3], ['5.8.2', 3], ['5.8.3', 3],
]));
audit('docs/cgei/subject-5-unit-5.9-subtopic-traceability.csv', 'Subject 5.9', expectedSubtopicPaths([
  ['5.9.1', 3], ['5.9.2', 3], ['5.9.3', 3],
]));
audit('docs/cgei/subject-5-unit-5.10-subtopic-traceability.csv', 'Subject 5.10', expectedSubtopicPaths([
  ['5.10.1', 3], ['5.10.2', 3], ['5.10.3', 3],
]));
audit('docs/cgei/subject-5-unit-5.11-subtopic-traceability.csv', 'Subject 5.11', expectedSubtopicPaths([
  ['5.11.1', 4], ['5.11.2', 3], ['5.11.3', 4], ['5.11.4', 4], ['5.11.5', 3], ['5.11.6', 6],
]));
audit('docs/cgei/subject-5-unit-5.12-subtopic-traceability.csv', 'Subject 5.12', expectedSubtopicPaths([
  ['5.12.1', 4], ['5.12.2', 4], ['5.12.3', 3], ['5.12.4', 3], ['5.12.5', 5],
]));

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
    '5.6.1','5.6.2','5.6.3','5.6.4',
    '5.7.1','5.7.2','5.7.3',
    '5.8.1','5.8.2','5.8.3',
    '5.9.1','5.9.2','5.9.3',
    '5.10.1','5.10.2','5.10.3',
    '5.11.1','5.11.2','5.11.3','5.11.4','5.11.5','5.11.6',
    '5.12.1','5.12.2','5.12.3','5.12.4','5.12.5',
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
