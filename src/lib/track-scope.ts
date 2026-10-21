/**
 * Single pipeline for subjects/content under track + optional exam profile.
 *
 * Distinguishes:
 * - general preparation (examId null)
 * - valid profile with subject policy
 * - invalid track / invalid profile / empty policy (never broadens to whole track)
 */
import { subjectsByTrack } from '../data/subjects.ts';
import { isTrackId, getExamProfile, type TrackId, type ExamScale } from '../data/tracks.ts';
import type { SubjectId } from '../types.ts';
import type { Subject } from '../types.ts';

export type ScopeInput = {
  trackId: TrackId;
  /** null = general track preparation (all subjects on the track) */
  examId?: string | null;
};

/** Explicit scope resolution — callers must not treat invalid as general. */
export type ScopeResolution =
  | { kind: 'general'; trackId: TrackId; subjects: Subject[] }
  | { kind: 'profile'; trackId: TrackId; examId: string; subjects: Subject[] }
  | { kind: 'invalid-track' }
  | { kind: 'invalid-profile'; trackId: TrackId; examId: string }
  | { kind: 'empty-policy'; trackId: TrackId; examId: string };


/** Apply a profile subject policy to a track subject list (testable without registry mutation). */
export function applyProfileSubjectPolicy(
  all: Subject[],
  profile: { requiredSubjectIds: readonly string[]; optionalSubjectIds?: readonly string[] },
  trackId: TrackId,
  examId: string,
): ScopeResolution {
  const required = profile.requiredSubjectIds ?? [];
  const optional = profile.optionalSubjectIds ?? [];
  const allowed = new Set<string>([...required, ...optional]);
  if (allowed.size === 0) {
    return { kind: 'empty-policy', trackId, examId };
  }
  const subjects = all.filter((s) => allowed.has(s.id));
  return { kind: 'profile', trackId, examId, subjects };
}

export function resolveSubjectsForScope(input: ScopeInput): ScopeResolution {
  const { trackId, examId = null } = input;
  if (!isTrackId(trackId)) return { kind: 'invalid-track' };

  const all = subjectsByTrack(trackId);

  // Only null is general preparation. Empty string is invalid (not a silent broaden).
  if (examId == null) {
    return { kind: 'general', trackId, subjects: all };
  }
  if (examId === '') {
    return { kind: 'invalid-profile', trackId, examId: '' };
  }

  const profile = getExamProfile(trackId, examId);
  if (!profile) {
    return { kind: 'invalid-profile', trackId, examId };
  }

  return applyProfileSubjectPolicy(all, profile, trackId, examId);
}

/** Subject list for a scope. Empty for invalid track/profile or empty policy. */
export function subjectsForScope(input: ScopeInput): Subject[] {
  const r = resolveSubjectsForScope(input);
  if (r.kind === 'general' || r.kind === 'profile') return r.subjects;
  return [];
}

export function subjectIdsForScope(input: ScopeInput): Set<SubjectId> {
  return new Set(subjectsForScope(input).map((s) => s.id as SubjectId));
}

export function subjectInScope(subjectId: string, input: ScopeInput): boolean {
  return subjectIdsForScope(input).has(subjectId as SubjectId);
}

export type ContentTag = {
  examScope?: ('bs17' | 'bs16')[] | null;
  postRestriction?: 'bs17' | 'bs16' | 'all' | string | null;
};

/**
 * Whether a topic/question is eligible under the active profile contentScope.
 * Untagged content stays visible. Scale filters only exclude content tagged
 * exclusively for a different scale.
 * Invalid track or invalid profile → not eligible.
 */
export function contentEligibleForScope(
  tags: ContentTag | null | undefined,
  input: ScopeInput,
): boolean {
  if (!isTrackId(input.trackId)) return false;

  if (input.examId === '') return false;
  if (input.examId != null) {
    const profile = getExamProfile(input.trackId, input.examId);
    if (!profile) return false;

    const scales = profile.contentScope?.scales;
    if (!scales || scales.length === 0) return true;
    if (!tags) return true;

    const scaleSet = new Set(scales as ExamScale[]);

    if (tags.examScope && tags.examScope.length > 0) {
      const tagged = tags.examScope as ExamScale[];
      if (tagged.every((s) => !scaleSet.has(s))) return false;
    }

    if (tags.postRestriction && tags.postRestriction !== 'all') {
      const pr = tags.postRestriction as string;
      if (pr === 'bs16' || pr === 'bs17') {
        if (!scaleSet.has(pr as ExamScale)) return false;
      } else {
        // Unknown non-empty restriction is fail-closed (not unrestricted)
        return false;
      }
    }

    return true;
  }

  // General preparation — no scale filter
  return true;
}
