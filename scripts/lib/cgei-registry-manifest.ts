/**
 * Build a compact CGEI registry manifest: ordered IDs + per-entity content hashes.
 * Used by scripts/cgei-registry-snapshot.ts and the golden registry test.
 */
import { createHash } from 'node:crypto';
import type { CurriculumRegistry } from '../../src/types/curriculum';

export type RegistryManifest = {
  version: 1;
  generatedAt: string;
  counts: {
    subjects: number;
    units: number;
    lessons: number;
    activities: number;
    assessments: number;
    questions: number;
    resources: number;
    deliverables: number;
  };
  /** Display / assembly order of each registry array */
  arrays: {
    subjectIds: string[];
    unitIds: string[];
    lessonIds: string[];
    activityIds: string[];
    assessmentIds: string[];
    questionIds: string[];
    resourceIds: string[];
    deliverableIds: string[];
  };
  /** sha256 of stable JSON for each entity id (detects silent content drift) */
  entityHashes: Record<string, string>;
};

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(',')}]`;
  }
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record).sort();
  return `{${keys.map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(',')}}`;
}

function hashEntity(entity: unknown): string {
  return createHash('sha256').update(stableStringify(entity)).digest('hex');
}

function idsOf<T extends { id: string }>(items: readonly T[] | undefined): string[] {
  return (items ?? []).map((item) => item.id);
}

export function buildRegistryManifest(
  registry: CurriculumRegistry,
  generatedAt = new Date().toISOString(),
): RegistryManifest {
  const subjects = registry.subjects ?? [];
  const units = registry.units ?? [];
  const lessons = registry.lessons ?? [];
  const activities = registry.activities ?? [];
  const assessments = registry.assessments ?? [];
  const questions = registry.questions ?? [];
  const resources = registry.resources ?? [];
  const deliverables = registry.deliverables ?? [];

  const entityHashes: Record<string, string> = {};
  for (const item of [
    ...subjects,
    ...units,
    ...lessons,
    ...activities,
    ...assessments,
    ...questions,
    ...resources,
    ...deliverables,
  ] as { id: string }[]) {
    entityHashes[item.id] = hashEntity(item);
  }

  return {
    version: 1,
    generatedAt,
    counts: {
      subjects: subjects.length,
      units: units.length,
      lessons: lessons.length,
      activities: activities.length,
      assessments: assessments.length,
      questions: questions.length,
      resources: resources.length,
      deliverables: deliverables.length,
    },
    arrays: {
      subjectIds: idsOf(subjects),
      unitIds: idsOf(units),
      lessonIds: idsOf(lessons),
      activityIds: idsOf(activities),
      assessmentIds: idsOf(assessments),
      questionIds: idsOf(questions),
      resourceIds: idsOf(resources),
      deliverableIds: idsOf(deliverables),
    },
    entityHashes,
  };
}

/** Compare two manifests; return human-readable mismatch lines (empty if equal). */
export function diffRegistryManifests(
  expected: RegistryManifest,
  actual: RegistryManifest,
): string[] {
  const lines: string[] = [];
  for (const key of Object.keys(expected.counts) as (keyof RegistryManifest['counts'])[]) {
    if (expected.counts[key] !== actual.counts[key]) {
      lines.push(`count.${key}: expected ${expected.counts[key]}, actual ${actual.counts[key]}`);
    }
  }
  for (const key of Object.keys(expected.arrays) as (keyof RegistryManifest['arrays'])[]) {
    const exp = expected.arrays[key];
    const act = actual.arrays[key];
    if (exp.length !== act.length) {
      lines.push(`arrays.${key}: length ${act.length} !== ${exp.length}`);
    }
    const expSet = new Set(exp);
    const actSet = new Set(act);
    for (const id of exp) {
      if (!actSet.has(id)) lines.push(`arrays.${key}: missing ${id}`);
    }
    for (const id of act) {
      if (!expSet.has(id)) lines.push(`arrays.${key}: added ${id}`);
    }
    const n = Math.min(exp.length, act.length);
    for (let i = 0; i < n; i += 1) {
      if (exp[i] !== act[i]) {
        lines.push(`arrays.${key}: order differs at ${i}: expected ${exp[i]}, actual ${act[i]}`);
        break;
      }
    }
  }
  const expKeys = new Set(Object.keys(expected.entityHashes));
  const actKeys = new Set(Object.keys(actual.entityHashes));
  for (const id of expKeys) {
    if (!actKeys.has(id)) lines.push(`entityHashes: missing ${id}`);
    else if (expected.entityHashes[id] !== actual.entityHashes[id]) {
      lines.push(`entityHashes: content changed for ${id}`);
    }
  }
  for (const id of actKeys) {
    if (!expKeys.has(id)) lines.push(`entityHashes: added ${id}`);
  }
  return lines;
}
