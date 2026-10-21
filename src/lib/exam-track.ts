/**
 * Thin ExamTrack abstraction — shared screens treat all tracks the same.
 *
 * Track IDs and ordered list come from `@/data/tracks` (TRACK_IDS / listTrackDefinitions).
 * Landing screens stay brand-specific via landingVariant on the registry.
 *
 * Unknown track/subject IDs never silently become FPSC.
 */

import {
  subjects,
  subjectsByTrack as dataSubjectsByTrack,
} from '../data/subjects.ts';
import {
  TRACK_IDS,
  isTrackId,
  listTrackDefinitions,
  getTrackDefinition,
  type TrackId,
} from '../data/tracks.ts';
import type { SubjectId } from '../types.ts';

export type ExamTrackId = TrackId;

export type TrackChromeMeta = {
  id: ExamTrackId;
  label: string;
  productName: string;
  /** Brand landing route when present; generic tracks use /track/:id */
  landingScreen: 'fpsc' | 'hat' | 'track';
  accent: 'sky' | 'indigo' | 'teal';
};

export type TrackSubjectRef = {
  subjectId: SubjectId;
  track: ExamTrackId;
  title: string;
};

function chromeFromRegistry(id: TrackId): TrackChromeMeta {
  const d = getTrackDefinition(id);
  const landing: TrackChromeMeta['landingScreen'] =
    d.landingVariant === 'fpsc' || d.landingVariant === 'hat'
      ? d.landingVariant
      : 'track';
  return {
    id,
    label: d.shortTitle,
    productName: d.title,
    landingScreen: landing,
    accent: d.accent === 'indigo' ? 'indigo' : d.accent === 'teal' ? 'teal' : 'sky',
  };
}

/** Ordered list of tracks from the central registry. */
export function getExamTracks(): TrackChromeMeta[] {
  return listTrackDefinitions().map((d) => chromeFromRegistry(d.id));
}

export function getTrackMeta(track: ExamTrackId): TrackChromeMeta {
  return chromeFromRegistry(track);
}

/**
 * Resolve subject → track. Unknown subjects return null (never default FPSC).
 */
export function getTrackForSubject(subjectId: SubjectId | string): ExamTrackId | null {
  const sub = subjects.find((s) => s.id === subjectId);
  if (sub && isTrackId(sub.track)) return sub.track;
  if (typeof subjectId === 'string' && subjectId.startsWith('hat-')) return 'hat';
  return null;
}

export function getSubjectsForTrack(track: ExamTrackId): TrackSubjectRef[] {
  const list = dataSubjectsByTrack(track);
  return list.map((s) => ({
    subjectId: s.id as SubjectId,
    track,
    title: s.title,
  }));
}

export function getSubjectIdsForTrack(track: ExamTrackId): Set<SubjectId> {
  return new Set(getSubjectsForTrack(track).map((s) => s.subjectId));
}

export function isSingleSubjectTrack(track: ExamTrackId): boolean {
  return getSubjectsForTrack(track).length === 1;
}

export function getTrackForSelection(
  selection: SubjectId | 'all' | string,
): ExamTrackId | null {
  if (selection === 'all') return null;
  return getTrackForSubject(selection);
}

export function getLandingScreenForTrack(track: ExamTrackId): 'fpsc' | 'hat' | 'track' {
  return getTrackMeta(track).landingScreen;
}

/** Group items by subject→track; unknown subjects are omitted (not forced into FPSC). */
export function groupByTrack<T extends { subjectId: string }>(
  items: T[],
): Record<ExamTrackId, T[]> {
  const out = Object.fromEntries(TRACK_IDS.map((id) => [id, [] as T[]])) as Record<
    ExamTrackId,
    T[]
  >;
  for (const item of items) {
    const track = getTrackForSubject(item.subjectId);
    if (track) out[track].push(item);
  }
  return out;
}

export { TRACK_IDS, isTrackId };
