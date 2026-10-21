/**
 * Read-only catalog metadata for a specific track + exam profile,
 * independent of the active workspace. Used by track landing pages
 * to show accurate content counts even when previewing a non-active track.
 */
import { subjectsForScope, contentEligibleForScope, type ScopeInput } from './track-scope.ts';
import { sectionsBySubject, sectionMap } from '../data/sections.ts';
import { topics } from '../data/topics.ts';
import { topicMap } from '../data/topics.ts';
import type { SubjectId, Topic, Question } from '../types.ts';
import type { SubjectWithMeta } from '../data/subjects.ts';

function scopedSubjectIds(input: ScopeInput): Set<string> {
  return new Set(subjectsForScope(input).map((s) => s.id));
}

/** How trustworthy a displayed question count is. */
export type CountPrecision = 'exact' | 'estimated' | 'unavailable';

export interface TrackCatalogSubject {
  subject: SubjectWithMeta;
  topicCount: number;
  questionCount: number;
  /** exact when bank loaded for this subject; estimated from section metadata; unavailable if out of scope */
  questionCountPrecision: CountPrecision;
  sectionCount: number;
  topics: Topic[];
}

export interface TrackCatalog {
  subjects: TrackCatalogSubject[];
  totalTopics: number;
  totalQuestions: number;
  /**
   * Aggregate precision for totalQuestions:
   * - exact: every in-scope subject had a loaded bank
   * - estimated: at least one subject used section metadata
   * - unavailable: empty/invalid scope
   */
  questionCountPrecision: CountPrecision;
  /** Scope resolution was empty/invalid — no subjects to show. */
  empty: boolean;
}

/** Label helper for UI (short). */
export function formatQuestionCountLabel(
  count: number,
  precision: CountPrecision,
): string {
  if (precision === 'unavailable') return '—';
  if (precision === 'estimated') return `~${count}`;
  return String(count);
}

/**
 * Whether a question is eligible under the given scope.
 * A question is eligible when:
 *  - its subject is in scope, AND
 *  - its own content tags pass contentEligibleForScope, AND
 *  - (when the question has no tags) its topic's tags pass, if any.
 *
 * Untagged questions inherit eligibility from their topic so that
 * topic-level restrictions cascade to their questions.
 */
export function questionEligibleForScope(
  question: Question,
  input: ScopeInput,
  inScopeSubject: boolean,
): boolean {
  if (!inScopeSubject) return false;
  if (!contentEligibleForScope(question, input)) return false;
  // Question is directly eligible. If it has its own tags we are done.
  if (question.examScope || question.postRestriction) return true;
  // Untagged question: inherit from its topic's restriction policy.
  const topic = topicMap[question.topicId];
  if (topic && !contentEligibleForScope(topic, input)) return false;
  return true;
}

/**
 * Compute catalog metadata (topic/question/section counts) for a track + profile,
 * applying item-level content eligibility restrictions. Does not depend on the
 * active workspace or any cache state.
 *
 * Question counts are derived from the authored question bank filtered by the
 * scope. Question data must be loaded (via the lazy loaders) before calling
 * if exact counts are required; when the bank is not yet loaded, questionCount
 * falls back to the section-authored total and `questionCountExact` is false.
 */
export function getTrackCatalog(
  input: ScopeInput,
  loadedQuestionsBySubject?: ReadonlyMap<string, Question[]>,
): TrackCatalog {
  const scoped = subjectsForScope(input);
  if (scoped.length === 0) {
    return { subjects: [], totalTopics: 0, totalQuestions: 0, questionCountPrecision: 'unavailable', empty: true };
  }

  const subjects: TrackCatalogSubject[] = scoped.map((subject) => {
    const sid = subject.id as SubjectId;
    const sSections = sectionsBySubject(sid);
    const sSectionIds = new Set(sSections.map((s) => s.id));
    const sTopics = topics.filter((t) => {
      if (!sSectionIds.has(t.sectionId)) return false;
      return contentEligibleForScope(t, input);
    });
    const loaded = loadedQuestionsBySubject?.get(sid);
    let questionCount: number;
    let questionCountPrecision: CountPrecision;
    if (loaded) {
      questionCount = loaded.reduce(
        (sum, q) => (sSectionIds.has(q.sectionId) && questionEligibleForScope(q, input, true) ? sum + 1 : sum),
        0,
      );
      questionCountPrecision = 'exact';
    } else {
      // No loaded bank: section-authored totals are an upper-bound estimate.
      questionCount = sSections.reduce((sum, s) => sum + s.questionCount, 0);
      questionCountPrecision = 'estimated';
    }
    return {
      subject,
      topicCount: sTopics.length,
      questionCount,
      questionCountPrecision,
      sectionCount: sSections.length,
      topics: sTopics,
    };
  });

  const totalTopics = subjects.reduce((sum, s) => sum + s.topicCount, 0);
  const totalQuestions = subjects.reduce((sum, s) => sum + s.questionCount, 0);
  const allExact = subjects.every((s) => s.questionCountPrecision === 'exact');
  const questionCountPrecision: CountPrecision = allExact ? 'exact' : 'estimated';

  return { subjects, totalTopics, totalQuestions, questionCountPrecision, empty: false };
}

/**
 * Topics for a single subject under a track+profile scope (independent of active workspace).
 * Rejects subjects that are not in the supplied track/profile scope.
 */
export function topicsForSubjectInScope(subjectId: SubjectId, input: ScopeInput): Topic[] {
  if (!subjectInScope(subjectId, input)) return [];
  const sSections = sectionsBySubject(subjectId);
  const sSectionIds = new Set(sSections.map((s) => s.id));
  return topics.filter((t) => {
    if (!sSectionIds.has(t.sectionId)) return false;
    return contentEligibleForScope(t, input);
  });
}

/**
 * Question count for a single subject under a track+profile scope.
 * Rejects subjects that are not in the supplied track/profile scope.
 * When loadedQuestions is provided, counts only profile-eligible questions;
 * otherwise returns the section-authored total as an upper bound.
 */
export function questionCountDetailForSubjectInScope(
  subjectId: SubjectId,
  input: ScopeInput,
  loadedQuestions?: Question[],
): { count: number; precision: CountPrecision } {
  if (!subjectInScope(subjectId, input)) {
    return { count: 0, precision: 'unavailable' };
  }
  const sSections = sectionsBySubject(subjectId);
  const sSectionIds = new Set(sSections.map((s) => s.id));
  if (loadedQuestions) {
    const count = loadedQuestions.reduce(
      (sum, q) => (sSectionIds.has(q.sectionId) && questionEligibleForScope(q, input, true) ? sum + 1 : sum),
      0,
    );
    return { count, precision: 'exact' };
  }
  return {
    count: sSections.reduce((sum, s) => sum + s.questionCount, 0),
    precision: 'estimated',
  };
}

export function questionCountForSubjectInScope(
  subjectId: SubjectId,
  input: ScopeInput,
  loadedQuestions?: Question[],
): number {
  if (!subjectInScope(subjectId, input)) return 0;
  const sSections = sectionsBySubject(subjectId);
  const sSectionIds = new Set(sSections.map((s) => s.id));
  if (loadedQuestions) {
    return loadedQuestions.reduce(
      (sum, q) => (sSectionIds.has(q.sectionId) && questionEligibleForScope(q, input, true) ? sum + 1 : sum),
      0,
    );
  }
  return sSections.reduce((sum, s) => sum + s.questionCount, 0);
}

/** Section count for a single subject. */
export function sectionCountForSubject(subjectId: SubjectId): number {
  return sectionsBySubject(subjectId).length;
}

/** Whether a subject id is within the supplied track/profile scope. */
export function subjectInScope(subjectId: string, input: ScopeInput): boolean {
  return scopedSubjectIds(input).has(subjectId);
}

/** Resolve a topic's subject id via its section. */
export function subjectIdForTopic(topicId: string): SubjectId | undefined {
  const topic = topics.find((t) => t.id === topicId);
  if (!topic) return undefined;
  return sectionMap[topic.sectionId]?.subjectId as SubjectId | undefined;
}
