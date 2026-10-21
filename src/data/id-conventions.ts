/**
 * ExamPrep Hub — ID conventions (canonical targets)
 *
 * SUBJECT IDs: kebab-case; HAT uses hat- prefix; track is on Subject object.
 * SECTION IDs: unified `{CODE}-{NN}` (METEO-01, EARTH-01, PHY-01, …). See section-id-aliases for migration.
 * TOPIC IDs: target `{subjectPrefix}-{slug}`; meteo bare letters migrated to meteo-{slug}.
 * QUESTION IDs: unified `{sectionId}-Q{nnn}` (e.g. METEO-01-Q003). See question-id-aliases.
 * CROSS-REFS: relatedTopics / buildsOn / leadsTo / usedIn must exist (CI validated).
 */
export const SUBJECT_CODE: Record<string, string> = {
  'meteo-climatology': 'METEO',
  'earth-science': 'EARTH',
  physics: 'PHY',
  maths: 'MATH',
  english: 'ENG',
  'env-studies': 'ENV',
  'research-analysis': 'RA',
  'hat-verbal': 'HATV',
  'hat-analytical': 'HATA',
  'hat-quantitative': 'HATQ',
};
