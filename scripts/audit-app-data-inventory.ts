/**
 * Reproducible first-pass inventory of the app's data registries and persistence schemas.
 *
 * This reports counts, source hashes, and structural findings; it does not certify
 * semantic correctness or silently turn existing defects into release approval.
 * Run with: npm run audit:data-inventory
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';

import { sections } from '../src/data/sections';
import { subjects } from '../src/data/subjects';
import { topicMetadata } from '../src/data/topic-metadata';
import { TRACK_IDS, listTrackDefinitions } from '../src/data/tracks';
import { activeSubjects, loadAllQuestions, loadAllTopics } from '../src/data/lazy-data';
import { cgeiCurriculum } from '../src/data/cgei/curriculum';

type IdRecord = { id?: unknown };
type Finding = { family: string; code: string; count: number; examples: string[] };

const findings: Finding[] = [];
const addFinding = (family: string, code: string, values: string[]) => {
  if (values.length) findings.push({ family, code, count: values.length, examples: values.slice(0, 12) });
};
const duplicateIds = (family: string, records: IdRecord[]) => {
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const record of records) {
    if (typeof record.id !== 'string' || !record.id.trim()) continue;
    if (seen.has(record.id)) duplicates.push(record.id);
    seen.add(record.id);
  }
  addFinding(family, 'duplicate-id', duplicates);
  return { records: records.length, uniqueIds: seen.size };
};

function collectFiles(path: string): string[] {
  const absolute = resolve(path);
  if (!existsSync(absolute)) return [];
  const stat = statSync(absolute);
  if (stat.isFile()) return [absolute];
  if (!stat.isDirectory()) return [];
  return readdirSync(absolute, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => {
      const child = resolve(absolute, entry.name);
      if (entry.isDirectory()) return collectFiles(child);
      return entry.isFile() ? [child] : [];
    });
}

function fileManifest(): Array<{ path: string; bytes: number; sha256: string }> {
  const roots = [
    'src/data',
    'src/types.ts',
    'src/types',
    'src/lib/storage.ts',
    'src/lib/progress-sync.ts',
    'src/lib/cloud-restore.ts',
    'supabase/migrations',
    'supabase/functions',
  ];
  const files = [...new Set(roots.flatMap(collectFiles))].sort();
  return files.map((file) => {
    const bytes = readFileSync(file);
    return {
      path: relative(process.cwd(), file).split(sep).join('/'),
      bytes: bytes.byteLength,
      sha256: createHash('sha256').update(bytes).digest('hex'),
    };
  });
}

async function main() {
  const [topics, questions] = await Promise.all([loadAllTopics(), loadAllQuestions()]);
  const subjectIds = new Set(subjects.map((subject) => subject.id));
  const sectionById = new Map(sections.map((section) => [section.id, section]));
  const topicById = new Map(topics.map((topic) => [topic.id, topic]));
  const topicMetaIds = new Set(topicMetadata.map((topic) => topic.id));
  const topicIds = new Set(topics.map((topic) => topic.id));
  const questionIds = duplicateIds('questions', questions);
  const subjectSummary = duplicateIds('subjects', subjects);
  const sectionSummary = duplicateIds('sections', sections);
  const topicSummary = duplicateIds('loaded-topics', topics);
  const metadataSummary = duplicateIds('topic-metadata', topicMetadata);

  addFinding('sections', 'unknown-subject-reference',
    sections.filter((section) => !subjectIds.has(section.subjectId)).map((section) => `${section.id} -> ${section.subjectId}`));
  addFinding('topics', 'unknown-section-reference',
    topics.filter((topic) => !sectionById.has(topic.sectionId)).map((topic) => `${topic.id} -> ${topic.sectionId}`));
  addFinding('questions', 'unknown-section-reference',
    questions.filter((question) => !sectionById.has(question.sectionId)).map((question) => `${question.id} -> ${question.sectionId}`));
  addFinding('questions', 'unknown-topic-reference',
    questions.filter((question) => !topicById.has(question.topicId)).map((question) => `${question.id} -> ${question.topicId}`));
  addFinding('questions', 'section-topic-disagreement',
    questions.filter((question) => topicById.has(question.topicId)
      && topicById.get(question.topicId)?.sectionId !== question.sectionId)
      .map((question) => `${question.id}: section=${question.sectionId}, topic=${question.topicId}`));
  addFinding('topic-metadata', 'missing-from-full-topic-loader',
    topicMetadata.filter((topic) => !topicIds.has(topic.id)).map((topic) => topic.id));
  addFinding('full-topic-loader', 'missing-from-topic-metadata',
    topics.filter((topic) => !topicMetaIds.has(topic.id)).map((topic) => topic.id));
  addFinding('subjects', 'missing-topic-loader',
    subjects.filter((subject) => !activeSubjects.includes(subject.id)).map((subject) => subject.id));
  addFinding('topic-loaders', 'missing-subject-catalog-entry',
    activeSubjects.filter((subjectId) => !subjectIds.has(subjectId)).map((subjectId) => subjectId));

  const actualTopicsBySection = new Map<string, number>();
  const actualQuestionsBySection = new Map<string, number>();
  for (const topic of topics) actualTopicsBySection.set(topic.sectionId, (actualTopicsBySection.get(topic.sectionId) ?? 0) + 1);
  for (const question of questions) actualQuestionsBySection.set(question.sectionId, (actualQuestionsBySection.get(question.sectionId) ?? 0) + 1);
  const countDrift = sections.flatMap((section) => {
    const actualTopics = actualTopicsBySection.get(section.id) ?? 0;
    const actualQuestions = actualQuestionsBySection.get(section.id) ?? 0;
    const mismatches: string[] = [];
    if (section.topicCount !== actualTopics) mismatches.push(`${section.id} topics declared=${section.topicCount} actual=${actualTopics}`);
    if (section.questionCount !== actualQuestions) mismatches.push(`${section.id} questions declared=${section.questionCount} actual=${actualQuestions}`);
    return mismatches;
  });
  addFinding('section-catalog', 'declared-count-drift', countDrift);

  const trackDefinitions = listTrackDefinitions();
  const examProfileIds = trackDefinitions.flatMap((track) =>
    track.examProfiles.map((profile) => `${track.id}/${profile.id}`));
  const cgeiArrayCounts = Object.fromEntries(
    Object.entries(cgeiCurriculum)
      .filter(([, value]) => Array.isArray(value))
      .map(([key, value]) => [key, (value as unknown[]).length]),
  );
  const report = {
    schemaVersion: 1,
    purpose: 'Initial structural inventory; semantic review and completeness are separate work.',
    counts: {
      tracks: TRACK_IDS.length,
      trackDefinitions: trackDefinitions.length,
      examProfiles: examProfileIds.length,
      subjects: subjectSummary.records,
      sections: sectionSummary.records,
      topicMetadata: metadataSummary.records,
      loadedTopics: topicSummary.records,
      loadedQuestions: questionIds.records,
      topicsWithContentFlag: topics.filter((topic) => topic.content).length,
      activeSubjectLoaders: activeSubjects.length,
      cgeiRegistryArrays: cgeiArrayCounts,
    },
    idUniqueness: {
      subjects: subjectSummary,
      sections: sectionSummary,
      topicMetadata: metadataSummary,
      loadedTopics: topicSummary,
      questions: questionIds,
    },
    findings,
    findingSummary: findings.reduce<Record<string, number>>((summary, finding) => {
      summary[finding.code] = (summary[finding.code] ?? 0) + finding.count;
      return summary;
    }, {}),
    sourceFiles: fileManifest(),
  };
  console.log(`APP_DATA_INVENTORY_JSON=${JSON.stringify(report)}`);
}

main().catch((error: unknown) => {
  console.error('App data inventory could not be generated:', error);
  process.exitCode = 1;
});
