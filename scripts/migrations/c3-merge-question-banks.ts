/**
 * Phase C3 — merge curriculum-questions.ts into per-subject questions-<subject>.ts banks.
 *
 * Usage (content freeze recommended):
 *   npx tsx --tsconfig tsconfig.app.json scripts/migrations/c3-merge-question-banks.ts
 *   npx tsx --tsconfig tsconfig.app.json scripts/migrations/c3-merge-question-banks.ts --check
 *
 * Rules (Final Plan §6.C3):
 * - Convert CurriculumQuestion → engine Question schema (prompt→question, single-choice→single)
 * - sectionId/topicId: unit-level topic ids (C1 decision); section from unit.legacySectionId or synthetic
 * - On duplicate ID, legacy bank record wins
 * - lessonId / cognitiveLevel / sourceCitation preserved
 * - Does not delete curriculum-questions.ts until --write-assembler is used in a follow-up
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { cgeiCurriculum } from '../../src/data/cgei/curriculum';
import type { Question } from '../../src/types';
import type { CurriculumQuestion } from '../../src/types/curriculum';

const ROOT = resolve(process.cwd(), 'src/data/cgei');
const checkOnly = process.argv.includes('--check');

const SUBJECT_FOLDER: Record<string, string> = {
  'cgei-env-systems': 'env-systems',
  'cgei-climate-science': 'climate-science',
  'cgei-geospatial': 'geospatial',
  'cgei-remote-sensing': 'remote-sensing',
  'cgei-data-science': 'data-science',
  'cgei-ml-geoai': 'ml-geoai',
  'cgei-climate-risk': 'climate-risk',
  'cgei-research-practice': 'research-practice',
  'cgei-decision-support': 'decision-support',
  'cgei-climate-policy': 'climate-policy',
  'cgei-software-engineering': 'software-engineering',
  'cgei-advanced-ai': 'advanced-ai',
  'cgei-capstone': 'capstone',
  'cgei-advanced-branches': 'advanced-branches',
};

function unitForLesson(lessonId: string) {
  return cgeiCurriculum.units.find((u) => u.lessonIds.includes(lessonId));
}

function subjectForLesson(lessonId: string) {
  const unit = unitForLesson(lessonId);
  if (!unit) return undefined;
  return cgeiCurriculum.subjects.find((s) => s.unitIds.includes(unit.id));
}

const SUBJECT_SECTION: Record<string, string> = {
  'cgei-env-systems': 'CGEI-01',
  'cgei-climate-science': 'CGEI-02',
  'cgei-geospatial': 'CGEI-03',
  'cgei-remote-sensing': 'CGEI-04',
  'cgei-data-science': 'CGEI-051',
  'cgei-ml-geoai': 'CGEI-06',
  'cgei-climate-risk': 'CGEI-07',
  'cgei-research-practice': 'CGEI-08',
  'cgei-decision-support': 'CGEI-09',
  'cgei-climate-policy': 'CGEI-10',
  'cgei-software-engineering': 'CGEI-11',
  'cgei-advanced-ai': 'CGEI-12',
  'cgei-capstone': 'CGEI-13',
  'cgei-advanced-branches': 'CGEI-14',
};

function toEngineQuestion(q: CurriculumQuestion): Question {
  const unit = unitForLesson(q.lessonId);
  const subject = subjectForLesson(q.lessonId);
  const sectionId = (unit?.legacySectionId
    ?? (subject ? SUBJECT_SECTION[subject.subjectId] : undefined)
    ?? 'CGEI-01') as Question['sectionId'];
  const topicId = unit?.id ?? q.lessonId;
  return {
    id: q.id,
    sectionId,
    topicId,
    difficulty: q.difficulty,
    type: 'single',
    question: q.prompt,
    options: [...q.options],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    sourceCitation: q.sourceCitation ?? 'CGEI curriculum (migrated)',
    lessonId: q.lessonId,
    cognitiveLevel: q.cognitiveLevel,
  };
}

function extractLegacyIds(fileText: string): Set<string> {
  const ids = new Set<string>();
  for (const m of fileText.matchAll(/(?:^|\s)id:\s*['"]([^'"]+)['"]/g)) {
    if (m[1].startsWith('CGEI-') || m[1].startsWith('cgei-')) ids.add(m[1]);
  }
  for (const m of fileText.matchAll(/"id"\s*:\s*"([^"]+)"/g)) {
    if (m[1].startsWith('CGEI-') || m[1].startsWith('cgei-')) ids.add(m[1]);
  }
  return ids;
}

function main(): void {
  const bySubject = new Map<string, Question[]>();
  let converted = 0;
  let skippedDup = 0;

  for (const cq of cgeiCurriculum.questions as CurriculumQuestion[]) {
    const subject = subjectForLesson(cq.lessonId);
    if (!subject) {
      console.warn('no subject for', cq.id, cq.lessonId);
      continue;
    }
    const folder = SUBJECT_FOLDER[subject.subjectId];
    if (!folder) continue;
    const bankPath = join(ROOT, folder, `questions-${folder}.ts`);
    let legacyIds = new Set<string>();
    if (existsSync(bankPath)) {
      legacyIds = extractLegacyIds(readFileSync(bankPath, 'utf8'));
    }
    if (legacyIds.has(cq.id)) {
      skippedDup += 1;
      continue;
    }
    const list = bySubject.get(folder) ?? [];
    list.push(toEngineQuestion(cq));
    bySubject.set(folder, list);
    converted += 1;
  }

  console.log(`Converted ${converted} curriculum questions; skipped ${skippedDup} duplicate IDs (legacy wins)`);

  if (checkOnly) {
    for (const [folder, list] of [...bySubject.entries()].sort()) {
      console.log(`  ${folder}: +${list.length}`);
    }
    return;
  }

  // Write sidecar files for review (does not overwrite existing banks yet)
  const outDir = join(ROOT, '_c3_merged');
  mkdirSync(outDir, { recursive: true });
  for (const [folder, list] of bySubject) {
    const body = `import type { Question } from '@/types';\n\n/** C3 migration candidates for ${folder} (legacy bank still wins on ID conflicts). */\nexport const migratedQuestions: Question[] = ${JSON.stringify(list, null, 2)};\n`;
    writeFileSync(join(outDir, `migrated-questions-${folder}.ts`), body, 'utf8');
    console.log('wrote', folder, list.length);
  }
  console.log(`Sidecars written under ${outDir}. Review, then merge into questions-*.ts in a follow-up commit.`);
}

main();
