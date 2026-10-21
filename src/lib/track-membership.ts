/**
 * Pure track membership lifecycle — enrollments, active focus, migration.
 * Screens must not write AppData.trackMembership ad hoc; use these helpers.
 */

import { TRACK_IDS, isTrackId, getExamProfile, isTrackEnrollable, type TrackId } from '../data/tracks.ts';
import { sections } from '../data/sections.ts';
import { topicMetadata } from '../data/topic-metadata.ts';
import { subjects } from '../data/subjects.ts';
import type {
  AppData,
  TrackEnrollmentRecord,
  TrackMembershipState,
  TrackEnrollmentSource,
} from '../types.ts';

function resolveTrackForSubject(subjectId: string): TrackId | null {
  const sub = subjects.find((s) => s.id === subjectId);
  if (sub && (sub.track === 'hat' || sub.track === 'fpsc')) return sub.track;
  if (subjectId === 'hat' || subjectId.startsWith('hat-')) return 'hat';
  if (subjects.some((s) => s.id === subjectId)) return 'fpsc';
  return null;
}

export const TRACK_MEMBERSHIP_SCHEMA_VERSION = 1 as const;

export function emptyTrackMembership(): TrackMembershipState {
  return {
    schemaVersion: TRACK_MEMBERSHIP_SCHEMA_VERSION,
    enrollments: {},
    activeTrackId: null,
  };
}

export function isEnrolled(state: TrackMembershipState, trackId: string): boolean {
  return Boolean(state.enrollments[trackId]);
}

export function getEnrollment(
  state: TrackMembershipState,
  trackId: string,
): TrackEnrollmentRecord | null {
  return state.enrollments[trackId] ?? null;
}

/** Drop invalid track/profile refs; fix activeTrackId invariant. */
export function normalizeTrackMembership(
  raw: unknown,
  options?: { nowIso?: string },
): TrackMembershipState {
  void options;
  if (!raw || typeof raw !== 'object') return emptyTrackMembership();
  const obj = raw as Record<string, unknown>;
  const enrollments: TrackMembershipState['enrollments'] = {};
  const rawEnrollments = obj.enrollments;
  if (rawEnrollments && typeof rawEnrollments === 'object' && !Array.isArray(rawEnrollments)) {
    for (const [key, value] of Object.entries(rawEnrollments as Record<string, unknown>)) {
      if (!isTrackId(key)) continue;
      if (!value || typeof value !== 'object') continue;
      const rec = value as Record<string, unknown>;
      const source: TrackEnrollmentSource =
        rec.source === 'legacy-progress' ? 'legacy-progress' : 'explicit';
      let activeExamId: string | null = null;
      if (typeof rec.activeExamId === 'string' && rec.activeExamId.length > 0) {
        activeExamId = getExamProfile(key, rec.activeExamId) ? rec.activeExamId : null;
      }
      enrollments[key] = {
        enrolledAt: typeof rec.enrolledAt === 'string' ? rec.enrolledAt : null,
        source,
        lastOpenedAt: typeof rec.lastOpenedAt === 'string' ? rec.lastOpenedAt : null,
        activeExamId,
      };
    }
  }

  let activeTrackId: string | null = null;
  if (typeof obj.activeTrackId === 'string' && isTrackId(obj.activeTrackId) && enrollments[obj.activeTrackId]) {
    activeTrackId = obj.activeTrackId;
  }

  return {
    schemaVersion: TRACK_MEMBERSHIP_SCHEMA_VERSION,
    enrollments,
    activeTrackId,
  };
}

export type EnrollTrackResult =
  | { ok: true; state: TrackMembershipState; created: boolean }
  | { ok: false; reason: 'unknown-track' | 'not-enrollable'; state: TrackMembershipState };

/** Explicit enrollment. Idempotent if already enrolled. */
export function enrollTrack(
  state: TrackMembershipState,
  trackId: string,
  options?: { at?: string; setActive?: boolean },
): EnrollTrackResult {
  if (!isTrackId(trackId)) {
    return { ok: false, reason: 'unknown-track', state };
  }
  if (!isTrackEnrollable(trackId) && !state.enrollments[trackId]) {
    return { ok: false, reason: 'not-enrollable', state };
  }
  const at = options?.at ?? new Date().toISOString();
  const setActive = options?.setActive !== false;
  const existing = state.enrollments[trackId];
  if (existing) {
    const next: TrackMembershipState = {
      ...state,
      enrollments: {
        ...state.enrollments,
        [trackId]: {
          ...existing,
          lastOpenedAt: setActive ? at : existing.lastOpenedAt,
        },
      },
      activeTrackId: setActive ? trackId : state.activeTrackId,
    };
    return { ok: true, state: next, created: false };
  }
  const record: TrackEnrollmentRecord = {
    enrolledAt: at,
    source: 'explicit',
    lastOpenedAt: setActive ? at : null,
    activeExamId: null,
  };
  return {
    ok: true,
    created: true,
    state: {
      ...state,
      enrollments: { ...state.enrollments, [trackId]: record },
      activeTrackId: setActive ? trackId : state.activeTrackId,
    },
  };
}

export type SetActiveTrackResult =
  | { ok: true; state: TrackMembershipState }
  | { ok: false; reason: 'not-enrolled' | 'unknown-track'; state: TrackMembershipState };

export function setActiveTrack(
  state: TrackMembershipState,
  trackId: string | null,
  options?: { at?: string },
): SetActiveTrackResult {
  if (trackId === null) {
    return { ok: true, state: { ...state, activeTrackId: null } };
  }
  if (!isTrackId(trackId)) {
    return { ok: false, reason: 'unknown-track', state };
  }
  if (!state.enrollments[trackId]) {
    return { ok: false, reason: 'not-enrolled', state };
  }
  const at = options?.at ?? new Date().toISOString();
  const prev = state.enrollments[trackId]!;
  return {
    ok: true,
    state: {
      ...state,
      enrollments: {
        ...state.enrollments,
        [trackId]: { ...prev, lastOpenedAt: at },
      },
      activeTrackId: trackId,
    },
  };
}


/**
 * Remove enrollment for a track. Does not delete topic/quiz progress.
 * If the left track was active, focus moves to another enrollment or null.
 */
export function leaveTrack(
  state: TrackMembershipState,
  trackId: string,
): { ok: true; state: TrackMembershipState } | { ok: false; reason: 'not-enrolled' | 'unknown-track'; state: TrackMembershipState } {
  if (!isTrackId(trackId)) {
    return { ok: false, reason: 'unknown-track', state };
  }
  if (!state.enrollments[trackId]) {
    return { ok: false, reason: 'not-enrolled', state };
  }
  const enrollments = { ...state.enrollments };
  delete enrollments[trackId];
  let activeTrackId = state.activeTrackId;
  if (activeTrackId === trackId) {
    const remaining = (Object.keys(enrollments) as TrackId[]).filter((id) => isTrackId(id));
    activeTrackId = remaining[0] ?? null;
  }
  return {
    ok: true,
    state: {
      schemaVersion: state.schemaVersion,
      enrollments,
      activeTrackId,
    },
  };
}

export type SetExamProfileResult =
  | { ok: true; state: TrackMembershipState; examId: string | null }
  | { ok: false; reason: 'unknown-track' | 'not-enrolled' | 'invalid-profile'; state: TrackMembershipState };

export function setActiveExamProfile(
  state: TrackMembershipState,
  trackId: string,
  examId: string | null,
): SetExamProfileResult {
  if (!isTrackId(trackId)) {
    return { ok: false, reason: 'unknown-track', state };
  }
  if (!state.enrollments[trackId]) {
    return { ok: false, reason: 'not-enrolled', state };
  }
  if (examId !== null && !getExamProfile(trackId, examId)) {
    return { ok: false, reason: 'invalid-profile', state };
  }
  const resolved = examId;
  return {
    ok: true,
    examId: resolved,
    state: {
      ...state,
      enrollments: {
        ...state.enrollments,
        [trackId]: {
          ...state.enrollments[trackId]!,
          activeExamId: resolved,
        },
      },
    },
  };
}

// ── Evidence-based migration ──

const sectionSubject = new Map(sections.map((s) => [s.id, s.subjectId]));
const topicSubject = new Map(
  topicMetadata.map((t) => [t.id, sectionSubject.get(t.sectionId) ?? null]),
);

function trackForTopicId(topicId: string): TrackId | null {
  const subjectId = topicSubject.get(topicId);
  if (!subjectId) {
    // Heuristic for ids not in metadata yet
    if (topicId.startsWith('hat-') || topicId.startsWith('hat')) {
      return 'hat';
    }
    return null;
  }
  const track = resolveTrackForSubject(subjectId);
  return isTrackId(track) ? track : null;
}

function trackForSubjectId(subjectId: string | undefined): TrackId | null {
  if (!subjectId) return null;
  const track = resolveTrackForSubject(subjectId);
  return isTrackId(track) ? track : null;
}

export type MigrationEvidence = {
  tracks: Partial<Record<TrackId, { lastActivityAt: number | null }>>;
};

/** Collect attributable track activity from AppData (no enrollment mutation). */
export function collectTrackEvidence(data: AppData): MigrationEvidence {
  const tracks: MigrationEvidence['tracks'] = {};

  const touch = (track: TrackId | null, at: number | null) => {
    if (!track) return;
    const prev = tracks[track]?.lastActivityAt ?? null;
    const next =
      at != null && (prev == null || at > prev) ? at : prev;
    tracks[track] = { lastActivityAt: next };
  };

  for (const tid of data.studiedTopics ?? []) {
    touch(trackForTopicId(tid), null);
  }
  for (const tid of Object.keys(data.topicProgress ?? {})) {
    const prog = data.topicProgress[tid];
    let at: number | null = null;
    if (prog?.lastQuizDate) {
      const t = Date.parse(prog.lastQuizDate);
      if (!Number.isNaN(t)) at = t;
    } else if (prog?.lastStudied) {
      const t = Date.parse(prog.lastStudied);
      if (!Number.isNaN(t)) at = t;
    }
    touch(trackForTopicId(tid), at);
  }
  for (const tid of Object.keys(data.revisionDates ?? {})) {
    touch(trackForTopicId(tid), null);
  }
  for (const entry of data.quizHistory ?? []) {
    touch(trackForSubjectId(entry.subjectId), typeof entry.date === 'number' ? entry.date : null);
  }
  for (const [, result] of Object.entries(data.questionResults ?? {})) {
    touch(trackForSubjectId(result?.subjectId), typeof result?.timestamp === 'number' ? result.timestamp : null);
  }

  return { tracks };
}

export type MigrateMembershipOptions = {
  /** Old subject-selection activeTrack — used only if that track has evidence */
  legacyActiveTrack?: string | null;
  /** Existing membership if any (idempotent merge) */
  existing?: TrackMembershipState | null;
};

/**
 * Evidence-based membership migration.
 * - Never enrolls from default FPSC alone
 * - Idempotent when membership already present
 * - activeExamId always null on migration
 */
export function migrateTrackMembership(
  data: AppData,
  options?: MigrateMembershipOptions,
): TrackMembershipState {
  // Valid current schema (v1), including intentionally empty enrollments — never re-infer.
  if (
    options?.existing &&
    typeof options.existing.schemaVersion === 'number' &&
    options.existing.schemaVersion === TRACK_MEMBERSHIP_SCHEMA_VERSION
  ) {
    return normalizeTrackMembership(options.existing);
  }

  const evidence = collectTrackEvidence(data);
  const enrollments: TrackMembershipState['enrollments'] = {};

  for (const id of TRACK_IDS) {
    if (evidence.tracks[id]) {
      enrollments[id] = {
        enrolledAt: null,
        source: 'legacy-progress',
        lastOpenedAt: null,
        activeExamId: null,
      };
    }
  }

  let activeTrackId: string | null = null;
  const legacy = options?.legacyActiveTrack;
  if (legacy && isTrackId(legacy) && enrollments[legacy]) {
    activeTrackId = legacy;
  } else {
    let best: TrackId | null = null;
    let bestAt = -1;
    for (const id of TRACK_IDS) {
      if (!enrollments[id]) continue;
      const at = evidence.tracks[id]?.lastActivityAt ?? null;
      if (at != null && at > bestAt) {
        bestAt = at;
        best = id;
      }
    }
    if (best) activeTrackId = best;
    else {
      // Evidence without timestamps: pick first enrolled in registry order
      for (const id of TRACK_IDS) {
        if (enrollments[id]) {
          activeTrackId = id;
          break;
        }
      }
    }
  }

  return {
    schemaVersion: TRACK_MEMBERSHIP_SCHEMA_VERSION,
    enrollments,
    activeTrackId,
  };
}

/**
 * Ensure AppData has normalized membership. Migrates when missing/empty.
 */
export function ensureTrackMembership(
  data: AppData,
  options?: MigrateMembershipOptions,
): { data: AppData; changed: boolean } {
  const raw = data.trackMembership;

  // Unsupported future schema: do not downgrade or overwrite — preserve blob as-is.
  if (
    raw &&
    typeof raw === 'object' &&
    typeof (raw as { schemaVersion?: unknown }).schemaVersion === 'number' &&
    ((raw as { schemaVersion: number }).schemaVersion > TRACK_MEMBERSHIP_SCHEMA_VERSION)
  ) {
    return { data, changed: false };
  }

  // Valid current schema (including empty enrollments) — normalize only, never re-migrate.
  if (
    raw &&
    typeof raw === 'object' &&
    (raw as { schemaVersion?: unknown }).schemaVersion === TRACK_MEMBERSHIP_SCHEMA_VERSION
  ) {
    const existing = normalizeTrackMembership(raw);
    const same = JSON.stringify(raw) === JSON.stringify(existing);
    if (same) return { data, changed: false };
    return { data: { ...data, trackMembership: existing }, changed: true };
  }

  // Absent / legacy / unknown shape → evidence migration once
  const migrated = migrateTrackMembership(data, {
    ...options,
    existing: null,
  });
  return { data: { ...data, trackMembership: migrated }, changed: true };
}
