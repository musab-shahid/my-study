/**
 * Substantive-evidence gate: verifies that every Core (and mapped_partial)
 * leaf marked `mapped` in the structural coverage report is backed by a
 * lesson with non-placeholder content AND at least one resolvable assessment
 * question. The structural gate proves lesson IDs exist as strings; this gate
 * proves those lessons genuinely teach with assessment evidence.
 *
 * Run with: npm run audit:core-leaf-evidence
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { cgeiCurriculum } from '../src/data/cgei/curriculum';
import { hasSubstantiveLessonContent } from '../src/data/cgei/readiness';

const COVERAGE_CSV = 'docs/cgei/source-toc/core-leaf-coverage-report.csv';
// Write reports outside tracked paths (override with CGEI_EVIDENCE_REPORT).
const REPORT_CSV =
  process.env.CGEI_EVIDENCE_REPORT ??
  `${tmpdir().replace(/\\/g, '/')}/my-study-core-leaf-evidence-report.csv`;

interface CoverageRow {
  sourceId: string;
  title: string;
  unit: string;
  priority: string;
  disposition: string;
  appLessonIds: string;
  traceabilityFile: string;
  notes: string;
}

interface EvidenceRow extends CoverageRow {
  lessonId: string;
  lessonFound: boolean;
  hasSubstantiveContent: boolean;
  assessmentCount: number;
  resolvableQuestionCount: number;
  evidenceVerdict: 'pass' | 'fail-no-lesson' | 'fail-no-content' | 'fail-no-assessment' | 'fail-no-question' | 'skip';
}

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

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function main() {
  const input = readFileSync(resolve(process.cwd(), COVERAGE_CSV), 'utf8');
  const rows = parseCsv(input);
  const headers = rows[0] ?? [];
  const required = ['source_id', 'title', 'unit', 'priority', 'disposition', 'app_lesson_ids', 'traceability_file', 'notes'];
  const missing = required.filter((h) => !headers.includes(h));
  if (missing.length) {
    console.error(`coverage report missing columns: ${missing.join(', ')}`);
    process.exitCode = 2;
    return;
  }
  const idx = Object.fromEntries(required.map((h) => [h, headers.indexOf(h)]));
  const coverage: CoverageRow[] = rows.slice(1).map((values) => ({
    sourceId: values[idx.source_id] ?? '',
    title: values[idx.title] ?? '',
    unit: values[idx.unit] ?? '',
    priority: values[idx.priority] ?? '',
    disposition: values[idx.disposition] ?? '',
    appLessonIds: values[idx.app_lesson_ids] ?? '',
    traceabilityFile: values[idx.traceability_file] ?? '',
    notes: values[idx.notes] ?? '',
  }));

  const lessonMap = new Map(cgeiCurriculum.lessons.map((l) => [l.id, l]));
  const assessmentMap = new Map(cgeiCurriculum.assessments.map((a) => [a.id, a]));
  const questionMap = new Map(cgeiCurriculum.questions.map((q) => [q.id, q]));

  const evidenceRows: EvidenceRow[] = [];
  const failures: string[] = [];
  let checked = 0;
  let passed = 0;

  for (const row of coverage) {
    if (!['mapped', 'mapped_partial'].includes(row.disposition)) {
      evidenceRows.push({ ...row, lessonId: '', lessonFound: false, hasSubstantiveContent: false, assessmentCount: 0, resolvableQuestionCount: 0, evidenceVerdict: 'skip' });
      continue;
    }
    const lessonIds = row.appLessonIds.split(';').filter(Boolean);
    if (lessonIds.length === 0) {
      evidenceRows.push({ ...row, lessonId: '', lessonFound: false, hasSubstantiveContent: false, assessmentCount: 0, resolvableQuestionCount: 0, evidenceVerdict: 'fail-no-lesson' });
      failures.push(`${row.sourceId} (${row.title}): marked ${row.disposition} but has no app_lesson_ids`);
      continue;
    }
    for (const lessonId of lessonIds) {
      checked += 1;
      const lesson = lessonMap.get(lessonId);
      if (!lesson) {
        evidenceRows.push({ ...row, lessonId, lessonFound: false, hasSubstantiveContent: false, assessmentCount: 0, resolvableQuestionCount: 0, evidenceVerdict: 'fail-no-lesson' });
        failures.push(`${row.sourceId} (${row.title}): lesson ${lessonId} not found in registry`);
        continue;
      }
      const hasContent = hasSubstantiveLessonContent(lesson);
      const assessments = (lesson.assessmentIds ?? []).map((id) => assessmentMap.get(id)).filter(Boolean);
      const resolvableQuestions = assessments.flatMap((a) => (a?.questionIds ?? []).map((qId) => questionMap.get(qId)).filter(Boolean));
      const verdict: EvidenceRow['evidenceVerdict'] =
        !hasContent ? 'fail-no-content'
        : assessments.length === 0 ? 'fail-no-assessment'
        : resolvableQuestions.length === 0 ? 'fail-no-question'
        : 'pass';
      evidenceRows.push({
        ...row,
        lessonId,
        lessonFound: true,
        hasSubstantiveContent: hasContent,
        assessmentCount: assessments.length,
        resolvableQuestionCount: resolvableQuestions.length,
        evidenceVerdict: verdict,
      });
      if (verdict === 'pass') passed += 1;
      else {
        const reason = verdict === 'fail-no-content' ? 'no substantive content'
          : verdict === 'fail-no-assessment' ? 'no resolvable assessment'
          : 'assessment has no resolvable questions';
        failures.push(`${row.sourceId} (${row.title}) → ${lessonId}: ${reason}`);
      }
    }
  }

  const outHeaders = ['source_id', 'title', 'unit', 'priority', 'disposition', 'app_lesson_ids', 'traceability_file', 'notes', 'lesson_id', 'lesson_found', 'has_substantive_content', 'assessment_count', 'resolvable_question_count', 'evidence_verdict'];
  const lines = [outHeaders.join(',')];
  for (const r of evidenceRows) {
    lines.push([
      csvEscape(r.sourceId), csvEscape(r.title), csvEscape(r.unit), csvEscape(r.priority),
      csvEscape(r.disposition), csvEscape(r.appLessonIds), csvEscape(r.traceabilityFile), csvEscape(r.notes),
      csvEscape(r.lessonId), String(r.lessonFound), String(r.hasSubstantiveContent),
      String(r.assessmentCount), String(r.resolvableQuestionCount), r.evidenceVerdict,
    ].join(','));
  }
  const reportPath = REPORT_CSV.startsWith('/') || /^[A-Za-z]:/.test(REPORT_CSV)
    ? REPORT_CSV
    : resolve(process.cwd(), REPORT_CSV);
  writeFileSync(reportPath, lines.join('\n') + '\n', 'utf8');

  console.log(`# Core-leaf substantive-evidence gate`);
  console.log(`Checked ${checked} mapped lesson(s); ${passed} passed; ${checked - passed} failed.`);
  console.log(`Report written to ${reportPath}`);
  if (failures.length) {
    console.error(`\nSubstantive-evidence gate failed: ${failures.length} gap(s)`);
    for (const f of failures) console.error(`  FAIL: ${f}`);
    process.exitCode = 1;
  } else {
    console.log('\nSubstantive-evidence gate passed: every mapped Core leaf has content + assessment evidence.');
  }
}

main();
