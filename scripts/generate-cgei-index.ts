/**
 * Generate the lightweight CGEI navigation index from the canonical curriculum.
 *
 * Normal use: npm run generate:cgei-index
 * Check without writing: npm run check:cgei-index
 *
 * Do not edit curriculum-index.ts by hand. curriculum.ts is the source for
 * canonical unit/lesson metadata; this file is a generated lightweight mirror.
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cgeiCurriculum } from '../src/data/cgei/curriculum';
import { cgeiIndexLessons, cgeiIndexUnits } from '../src/data/cgei/curriculum-index';

const outputPath = resolve(process.cwd(), 'src/data/cgei/curriculum-index.ts');
const checkOnly = process.argv.includes('--check');

function requireOne<T>(values: T[], description: string): T {
  if (values.length !== 1) {
    throw new Error(`${description}: expected exactly one parent, found ${values.length}`);
  }
  return values[0];
}

const units = cgeiCurriculum.units.map((unit) => {
  const subject = requireOne(
    cgeiCurriculum.subjects.filter((candidate) => candidate.unitIds.includes(unit.id)),
    `Unit ${unit.id} subject`,
  );
  return {
    id: unit.id,
    code: unit.code,
    title: unit.title,
    subjectId: subject.subjectId,
    subjectTitle: subject.title,
    lessonIds: [...unit.lessonIds],
  };
}).sort((a, b) => a.id.localeCompare(b.id));

const lessons = cgeiCurriculum.lessons.map((lesson) => {
  const unit = requireOne(
    cgeiCurriculum.units.filter((candidate) => candidate.lessonIds.includes(lesson.id)),
    `Lesson ${lesson.id} unit`,
  );
  const subject = requireOne(
    cgeiCurriculum.subjects.filter((candidate) => candidate.unitIds.includes(unit.id)),
    `Unit ${unit.id} subject`,
  );
  return {
    id: lesson.id,
    title: lesson.title,
    unitId: unit.id,
    unitTitle: unit.title,
    subjectId: subject.subjectId,
    subjectTitle: subject.title,
  };
}).sort((a, b) => a.id.localeCompare(b.id));

const generated = `/**\n * GENERATED FILE — do not edit by hand.\n * Source: src/data/cgei/curriculum.ts\n * Regenerate with: npm run generate:cgei-index\n * Check with: npm run check:cgei-index\n *\n * This lightweight mirror keeps navigation/reset code from importing the full\n * instructional registry into the initial bundle.\n */\nexport interface CgeiIndexUnit { id: string; code: string; title: string; subjectId: string; subjectTitle: string; lessonIds: readonly string[] }\nexport interface CgeiIndexLesson { id: string; title: string; unitId: string; unitTitle: string; subjectId: string; subjectTitle: string }\nexport const cgeiIndexUnits: readonly CgeiIndexUnit[] = ${JSON.stringify(units, null, 2)};\nexport const cgeiIndexLessons: readonly CgeiIndexLesson[] = ${JSON.stringify(lessons, null, 2)};\nexport const cgeiIndexUnitById = new Map(cgeiIndexUnits.map((unit) => [unit.id, unit] as const));\nexport const cgeiIndexLessonById = new Map(cgeiIndexLessons.map((lesson) => [lesson.id, lesson] as const));\n`;

if (checkOnly) {
  // Compare the exported metadata rather than formatting: generated source may
  // be reformatted without becoming stale, but missing/changed IDs and links fail.
  const sameUnits = JSON.stringify(cgeiIndexUnits) === JSON.stringify(units);
  const sameLessons = JSON.stringify(cgeiIndexLessons) === JSON.stringify(lessons);
  if (!sameUnits || !sameLessons) {
    console.error('CGEI curriculum index is stale. Run npm run generate:cgei-index and commit the result.');
    process.exitCode = 1;
  } else {
    console.log(`CGEI curriculum index is current (${units.length} units, ${lessons.length} lessons).`);
  }
} else {
  writeFileSync(outputPath, generated, 'utf8');
  console.log(`Generated CGEI curriculum index (${units.length} units, ${lessons.length} lessons).`);
}
