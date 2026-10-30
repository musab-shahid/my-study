/**
 * Phase E — CGEI progress aliases (legacy topic id → canonical lesson id).
 *
 * Data Science Unit 5.1 topics are fully materialized as lessons with
 * `sourceTopicId`. Climate Science legacy quiz topics map to the closest
 * Subject 2 lessons (Phase E2). Learners who studied those topic ids gain
 * the matching lesson progress after load / mark-studied.
 *
 * Roadmap overview topic ids are orientation only; they never map to lessons.
 */
import type { AppData } from '@/types';

/** Legacy / bridge topic id → canonical lesson id. */
export const CGEI_TOPIC_TO_LESSON: Readonly<Record<string, string>> = {
  // --- Data Science Unit 5.1 (E1) ---
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

  // --- Climate Science legacy quiz topics (E2) ---
  // Unit 2.4 Observations, reanalysis, and gridded products
  'cgei-climate-data-products': 'cgei-cl-lesson-2-4-2',
  'cgei-2-4-classes': 'cgei-cl-lesson-2-4-3',
  'cgei-2-4-era5': 'cgei-cl-lesson-2-4-2',
  // Unit 2.5 Climate data handling
  'cgei-time-units-daily': 'cgei-cl-lesson-2-5-1',
  'cgei-2-5-units': 'cgei-cl-lesson-2-5-1',
  'cgei-2-5-clocks': 'cgei-cl-lesson-2-5-2',
  // Unit 2.6 Extremes and trend analysis
  'cgei-extremes-and-trend-analysis': 'cgei-cl-lesson-2-6-1',
  'cgei-2-6-spi-spei': 'cgei-cl-lesson-2-6-1',
  'cgei-2-6-trends': 'cgei-cl-lesson-2-6-2',
};

/** Primary climate topic ids kept as quiz-section anchors (sections.ts). */
export const CGEI_CLIMATE_PRIMARY_TOPIC_IDS = [
  'cgei-climate-data-products',
  'cgei-time-units-daily',
  'cgei-extremes-and-trend-analysis',
] as const;

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
