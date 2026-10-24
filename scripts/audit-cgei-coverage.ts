/**
 * Produce a current, evidence-based CGEI coverage snapshot from the app's
 * actual lazy-loaded modules and canonical curriculum registry.
 *
 * Run with: npm run audit:cgei
 * The report classifies implementation depth; it does not claim TOC coverage.
 */
import { subjectsByTrack } from '../src/data/subjects';
import { sectionsBySubject } from '../src/data/sections';
import { topicMetadata } from '../src/data/topic-metadata';
import { loadSubjectTopics, loadSubjectQuestions } from '../src/data/lazy-data';
import { cgeiCurriculum } from '../src/data/cgei/curriculum';
import { cgeiOverviewTopicIdForSubject } from '../src/data/cgei/overview';
import { hasSubstantiveLessonContent } from '../src/data/cgei/readiness';
import type { ReadinessStatus } from '../src/types/curriculum';
import type { SubjectId } from '../src/types';

const errors: string[] = [];
const statuses: ReadinessStatus[] = ['review', 'validated', 'released'];

function readinessRank(status: ReadinessStatus): number {
  return ({ planned: 0, outlined: 1, draft: 2, review: 3, validated: 4, released: 5 })[status];
}

function classify(
  subjectReadiness: ReadinessStatus | undefined,
  units: Array<{ readiness: ReadinessStatus }>,
  lessons: Array<{ readiness: ReadinessStatus; content: Parameters<typeof hasSubstantiveLessonContent>[0]['content'] }>,
  legacyTopics: number,
  legacyQuestions: number,
): string {
  const substantive = lessons.length > 0 && lessons.every(hasSubstantiveLessonContent);
  const released = Boolean(
    subjectReadiness === 'released'
    && units.length > 0
    && units.every((unit) => unit.readiness === 'released')
    && lessons.length > 0
    && lessons.every((lesson) => lesson.readiness === 'released')
    && substantive,
  );
  if (released) return 'released';
  const reviewReady = Boolean(
    subjectReadiness && statuses.includes(subjectReadiness)
    && units.length > 0
    && units.every((unit) => readinessRank(unit.readiness) >= readinessRank('review'))
    && lessons.length > 0
    && lessons.every((lesson) =>
      statuses.includes(lesson.readiness) && hasSubstantiveLessonContent(lesson),
    ),
  );
  if (reviewReady) return 'review-ready';
  if (lessons.length > 0 || legacyTopics > 1 || legacyQuestions > 0) return 'partially authored';
  return 'orientation-only';
}

async function main() {
  const subjects = subjectsByTrack('cgei');
  if (subjects.length !== 14) errors.push(`Expected 14 CGEI domains; found ${subjects.length}`);
  const seen = new Set<string>();
  const rows: Array<{
    subject: string;
    topics: number;
    questions: number;
    units: number;
    lessons: number;
    substantive: number;
    curriculumQuestions: number;
    readiness: string;
  }> = [];

  for (const subject of subjects) {
    const id = subject.id as SubjectId;
    if (seen.has(id)) errors.push(`Duplicate CGEI subject registration: ${id}`);
    seen.add(id);

    const [topics, questions] = await Promise.all([
      loadSubjectTopics(id),
      loadSubjectQuestions(id),
    ]);
    const sections = sectionsBySubject(id);
    const sectionIds = new Set(sections.map((section) => section.id));
    const metadata = topicMetadata.filter((topic) => sectionIds.has(topic.sectionId));

    if (topics.length === 0) errors.push(`${id} has no discoverable topic/orientation record`);
    if (topics.length !== metadata.length) {
      errors.push(`${id} lazy topic module has ${topics.length} records but metadata has ${metadata.length}`);
    }
    for (const topic of topics) {
      const meta = topicMetadata.find((item) => item.id === topic.id);
      if (!meta) errors.push(`${id} topic ${topic.id} is missing topic metadata`);
      else if (meta.sectionId !== topic.sectionId) errors.push(`${id} topic ${topic.id} has a section mismatch`);
    }
    for (const section of sections) {
      const sectionTopics = topics.filter((topic) => topic.sectionId === section.id).length;
      const sectionQuestions = questions.filter((question) => question.sectionId === section.id).length;
      if (section.topicCount !== sectionTopics) errors.push(`${section.id} topicCount is stale (${section.topicCount} vs ${sectionTopics})`);
      if (section.questionCount !== sectionQuestions) errors.push(`${section.id} questionCount is stale (${section.questionCount} vs ${sectionQuestions})`);
    }

    const canonicalSubject = cgeiCurriculum.subjects.find((item) => item.subjectId === id);
    const unitIds = new Set(canonicalSubject?.unitIds ?? []);
    const units = cgeiCurriculum.units.filter((unit) => unitIds.has(unit.id));
    for (const unitId of unitIds) {
      if (!units.some((unit) => unit.id === unitId)) errors.push(`Canonical subject ${id} references missing unit ${unitId}`);
    }
    const lessonIds = new Set(units.flatMap((unit) => unit.lessonIds));
    const lessons = cgeiCurriculum.lessons.filter((lesson) => lessonIds.has(lesson.id));
    for (const lessonId of lessonIds) {
      if (!lessons.some((lesson) => lesson.id === lessonId)) errors.push(`Canonical unit for ${id} references missing lesson ${lessonId}`);
    }
    const curriculumQuestions = cgeiCurriculum.questions.filter((question) => lessonIds.has(question.lessonId));
    const substantive = lessons.filter(hasSubstantiveLessonContent).length;
    const readiness = classify(
      canonicalSubject?.readiness,
      units,
      lessons,
      topics.length,
      questions.length,
    );

    // Orientation mapping is explicit metadata, not inferred from a title.
    const orientationId = cgeiOverviewTopicIdForSubject(id);
    if (orientationId && !topics.some((topic) => topic.id === orientationId)) {
      errors.push(`${id} declares orientation topic ${orientationId}, but it is absent from its lazy topic module`);
    }

    rows.push({
      subject: subject.title,
      topics: topics.length,
      questions: questions.length,
      units: units.length,
      lessons: lessons.length,
      substantive,
      curriculumQuestions: curriculumQuestions.length,
      readiness,
    });
  }

  console.log('# CGEI coverage snapshot');
  console.log('');
  console.log('Generated from the current registry and lazy-loaded modules. This is an implementation-depth snapshot, not a source-TOC completeness claim.');
  console.log('');
  console.log('| Domain | Legacy topics | Legacy questions | Canonical units | Canonical lessons | Substantive lessons | Curriculum questions | Status |');
  console.log('|---|---:|---:|---:|---:|---:|---:|---|');
  for (const row of rows) {
    console.log(`| ${row.subject.replace(/\|/g, '\\|')} | ${row.topics} | ${row.questions} | ${row.units} | ${row.lessons} | ${row.substantive}/${row.lessons} | ${row.curriculumQuestions} | ${row.readiness} |`);
  }
  console.log('');
  console.log(`Domains: ${rows.length}; legacy topics: ${rows.reduce((sum, row) => sum + row.topics, 0)}; legacy questions: ${rows.reduce((sum, row) => sum + row.questions, 0)}; canonical lessons: ${rows.reduce((sum, row) => sum + row.lessons, 0)}; substantive canonical lessons: ${rows.reduce((sum, row) => sum + row.substantive, 0)}; canonical curriculum questions: ${rows.reduce((sum, row) => sum + row.curriculumQuestions, 0)}.`);
  console.log('Source-topic and subtopic coverage still requires verified source-path-to-content evidence; these counts do not prove it.');

  if (errors.length) {
    console.error(`\nCGEI coverage audit failed: ${errors.length} structural issue(s)`);
    for (const error of errors) console.error(`  ERROR: ${error}`);
    process.exitCode = 1;
  } else {
    console.log('\nCGEI coverage audit passed: module/metadata counts and canonical references are internally consistent.');
  }
}

main().catch((error: unknown) => {
  console.error('CGEI coverage audit could not complete.', error);
  process.exitCode = 1;
});
