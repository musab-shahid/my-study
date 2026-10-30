/**
 * Phase E — CGEI progress aliases (legacy topic id → canonical lesson id).
 *
 * Data Science Unit 5.1 topics are fully materialized as lessons with
 * `sourceTopicId`. Learners who studied the legacy topic id must appear as
 * having studied the matching lesson after load / mark-studied.
 *
 * Climate Science legacy topics (reanalysis, time units, extremes) remain
 * quiz-engine topics until an explicit lesson mapping is approved — they are
 * intentionally absent from this map.
 *
 * Roadmap overview topic ids are orientation only; they never map to lessons.
 */
import type { AppData } from '@/types';

/** Legacy / bridge topic id → canonical lesson id (Unit 5.1). */
export const CGEI_TOPIC_TO_LESSON: Readonly<Record<string, string>> = {
  'cgei-ds-units-dimensions': 'cgei-ds-lesson-5-1-1',
  'cgei-ds-rates-finite-diff': 'cgei-ds-lesson-5-1-2',
  'cgei-ds-matrices-least-squares': 'cgei-ds-lesson-5-1-3',
  'cgei-ds-eigen-svd-pca': 'cgei-ds-lesson-5-1-4',
  'cgei-ds-ode-numerical': 'cgei-ds-lesson-5-1-5',
  'cgei-ds-water-mass-balance': 'cgei-ds-lesson-5-1-6',
  'cgei-ds-energy-balance': 'cgei-ds-lesson-5-1-7',
  'cgei-ds-probability-dependence': 'cgei-ds-lesson-5-1-8',
  'cgei-ds-div-curl-fields': 'cgei-ds-lesson-5-1-9',
  'cgei-ds-taylor-error-propagation': 'cgei-ds-lesson-5-1-10',
  'cgei-ds-numerical-stability-floats': 'cgei-ds-lesson-5-1-11',
  'cgei-ds-optimisation-methods': 'cgei-ds-lesson-5-1-12',
  'cgei-ds-continuity-diffusion-advection': 'cgei-ds-lesson-5-1-13',
  'cgei-ds-buckingham-pi-nondim': 'cgei-ds-lesson-5-1-14',
  'cgei-ds-waves-conduction-convection': 'cgei-ds-lesson-5-1-15',
  'cgei-ds-clt-lln-distributions': 'cgei-ds-lesson-5-1-16',
};

export function lessonIdForCgeiTopic(topicId: string): string | undefined {
  return CGEI_TOPIC_TO_LESSON[topicId];
}

/**
 * Expand studiedTopics into studiedCurriculumLessons using CGEI aliases.
 * Pure; returns the same object reference when nothing changes.
 */
export function applyCgeiProgressAliases(data: AppData): AppData {
  const studiedTopics = data.studiedTopics ?? [];
  const existing = new Set(data.studiedCurriculumLessons ?? []);
  let changed = false;
  for (const topicId of studiedTopics) {
    const lessonId = CGEI_TOPIC_TO_LESSON[topicId];
    if (lessonId && !existing.has(lessonId)) {
      existing.add(lessonId);
      changed = true;
    }
  }
  if (!changed) return data;
  return {
    ...data,
    studiedCurriculumLessons: [...existing],
  };
}
