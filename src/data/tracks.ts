/**
 * Central track registry — single source of track IDs, status, capabilities,
 * and exam-profile slots. Subject ownership remains on subject records in
 * subjects.ts (validated against this registry).
 *
 * Exam profiles use post/paper identity (id + title). BS-16/BS-17 is metadata
 * (scale), not the sole scope key.
 */

/** Canonical track ids — derive ExamTrack / ExamTrackId from this. */
export const TRACK_IDS = ['fpsc', 'hat', 'cgei'] as const;

export type TrackId = (typeof TRACK_IDS)[number];

export type TrackStatus = 'available' | 'coming-soon' | 'archived';

export type TrackCapabilities = {
  study: boolean;
  practice: boolean;
  mockExam: boolean;
  revision: boolean;
  formulas: boolean;
};

export type ExamScale = 'bs16' | 'bs17';

export type ExamProfileDefinition = {
  id: string;
  trackId: TrackId;
  /** Human-readable post or paper name */
  title: string;
  status: 'available' | 'coming-soon';
  /** Official level label when relevant — not a substitute for profile id */
  scale?: ExamScale;
  shortLabel?: string;
  description?: string;
  requiredSubjectIds: readonly string[];
  optionalSubjectIds?: readonly string[];
  /**
   * Content filters layered on subject policy.
   * scales: when set, hide content tagged exclusively for other scales.
   */
  contentScope?: {
    scales?: ExamScale[];
  };
};

export type TrackDefinition = {
  id: TrackId;
  title: string;
  shortTitle: string;
  description: string;
  status: TrackStatus;
  iconKey: 'FileText' | 'GraduationCap';
  /** UI accent family — subject-colors maps unknown accents via getTrackStyle */
  accent: 'sky' | 'indigo' | 'teal';
  capabilities: TrackCapabilities;
  landingVariant?: 'fpsc' | 'hat' | 'default';
  examProfiles: readonly ExamProfileDefinition[];
};

const DEFAULT_CAPS: TrackCapabilities = {
  study: true,
  practice: true,
  mockExam: true,
  revision: true,
  formulas: true,
};

/** All current FPSC subject ids in registry order */
const FPSC_SUBJECT_IDS = [
  'meteo-climatology',
  'earth-science',
  'physics',
  'maths',
  'env-studies',
  'research-analysis',
  'english',
] as const;

/**
 * Verified profiles only.
 * - FPSC Meteorologist (BS-17 oriented): full subject set in this app; Research & Analysis
 *   content is authored as postRestriction bs17 — profile scale tags that emphasis.
 * - HAT: no separate paper profiles (whole track = one exam).
 */
export const TRACK_DEFINITIONS: readonly TrackDefinition[] = [
  {
    id: 'fpsc',
    title: 'FPSC Exam',
    shortTitle: 'FPSC',
    description:
      'Subject-based Federal Public Service Commission preparation. Choose a paper profile to focus subjects and content tags.',
    status: 'available',
    iconKey: 'FileText',
    accent: 'sky',
    capabilities: { ...DEFAULT_CAPS },
    landingVariant: 'fpsc',
    examProfiles: [
      {
        id: 'fpsc-met-bs17',
        trackId: 'fpsc',
        title: 'Meteorologist (BS-17 oriented)',
        shortLabel: 'Met BS-17',
        description:
          'Full FPSC subject set used in this hub, with BS-17-oriented content (e.g. Research & Analysis) preferred when topics are tagged.',
        status: 'available',
        scale: 'bs17',
        requiredSubjectIds: FPSC_SUBJECT_IDS,
        contentScope: { scales: ['bs17'] },
      },
    ],
  },
  {
    id: 'hat',
    title: 'HAT Preparation',
    shortTitle: 'HAT',
    description:
      'Higher Education Aptitude Test preparation: Verbal, Analytical, and Quantitative reasoning.',
    status: 'available',
    iconKey: 'GraduationCap',
    accent: 'indigo',
    capabilities: { ...DEFAULT_CAPS, formulas: false },
    landingVariant: 'hat',
    examProfiles: [],
  },
  {
    id: 'cgei',
    title: 'Climate, Geospatial & Environmental Intelligence',
    shortTitle: 'CGEI',
    description:
      'Master Study TOC path: climate risk, geospatial AI, EO, and decision support. Priority Core subjects are listed first; full quizzes expand unit-by-unit (sample live: Climate science — Unit 2.6 extremes & trends). L3 mastery = public artefact, not certificates alone.',
    status: 'available',
    iconKey: 'FileText',
    accent: 'teal',
    capabilities: {
      study: true,
      practice: true,
      mockExam: false,
      revision: true,
      formulas: false,
    },
    landingVariant: 'default',
    examProfiles: [],
  },
] as const;

const TRACK_BY_ID: Record<TrackId, TrackDefinition> = Object.fromEntries(
  TRACK_DEFINITIONS.map((t) => [t.id, t]),
) as Record<TrackId, TrackDefinition>;

export function isTrackId(value: unknown): value is TrackId {
  return typeof value === 'string' && (TRACK_IDS as readonly string[]).includes(value);
}

export function getTrackDefinition(id: TrackId): TrackDefinition {
  return TRACK_BY_ID[id];
}

export function listTrackDefinitions(): readonly TrackDefinition[] {
  return TRACK_DEFINITIONS;
}

export function listExamProfiles(trackId: TrackId): readonly ExamProfileDefinition[] {
  return TRACK_BY_ID[trackId]?.examProfiles ?? [];
}

export function getExamProfile(
  trackId: TrackId,
  profileId: string | null | undefined,
): ExamProfileDefinition | null {
  if (!profileId) return null;
  return listExamProfiles(trackId).find((p) => p.id === profileId) ?? null;
}

export function isTrackEnrollable(id: TrackId): boolean {
  return TRACK_BY_ID[id]?.status === 'available';
}
