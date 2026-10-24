import type { AppData, TrackEnrollmentRecord, TrackMembershipState } from '../types';

export const CLOUD_RESTORE_RECOVERY_SUFFIX = '-pre-restore';

export interface CloudRestorePlan {
  recoveryKey: string;
  recoveryValue: string | null;
  appDataKey: string;
  appDataValue: string;
}

type RecordValue = Record<string, unknown>;

function isRecord(value: unknown): value is RecordValue {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isOptionalString(value: RecordValue, key: string): boolean {
  return value[key] === undefined || typeof value[key] === 'string';
}

function isNullableString(value: RecordValue, key: string): boolean {
  return value[key] === undefined || value[key] === null || typeof value[key] === 'string';
}

function isOptionalFiniteNumber(value: RecordValue, key: string): boolean {
  return value[key] === undefined || isFiniteNumber(value[key]);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isTopicProgress(value: unknown): boolean {
  if (!isRecord(value)) return false;
  if (!isNullableString(value, 'lastStudied') || !isNullableString(value, 'nextReview') ||
      !isNullableString(value, 'lastQuizDate')) return false;
  for (const key of ['quizCorrect', 'quizTotal', 'reviewStage', 'abilityElo', 'easeFactor', 'intervalDays',
    'accuracy', 'attempts', 'quizAccuracy', 'quizAttempts']) {
    if (!isOptionalFiniteNumber(value, key)) return false;
  }
  if (!isNullableString(value, 'quizNextReview') || !isOptionalString(value, 'status')) return false;
  if (value.recentSessions !== undefined) {
    if (!Array.isArray(value.recentSessions)) return false;
    if (!value.recentSessions.every((session) =>
      isRecord(session) && isFiniteNumber(session.correct) && isFiniteNumber(session.total) && isFiniteNumber(session.at),
    )) return false;
  }
  return true;
}

function isQuestionResult(value: unknown): boolean {
  if (!isRecord(value) || typeof value.correct !== 'boolean' || !isFiniteNumber(value.timestamp)) return false;
  if (!isOptionalString(value, 'subjectId')) return false;
  for (const key of ['attempts', 'correctCount', 'strength']) {
    if (!isOptionalFiniteNumber(value, key)) return false;
  }
  return true;
}

const QUIZ_MODES = new Set(['topic', 'quick', 'mock', 'review', 'challenge']);
const DIFFICULTIES = new Set(['any', 'easy', 'medium', 'hard']);

function isQuizHistoryEntry(value: unknown): boolean {
  if (!isRecord(value) || !isFiniteNumber(value.date) || !QUIZ_MODES.has(String(value.mode))) return false;
  if (!isFiniteNumber(value.score) || !isFiniteNumber(value.total)) return false;
  if (!isOptionalString(value, 'topicId') || !isOptionalString(value, 'subjectId')) return false;
  return value.difficultyFilter === undefined || DIFFICULTIES.has(String(value.difficultyFilter));
}

function isTrackEnrollmentRecord(value: unknown): value is TrackEnrollmentRecord {
  return isRecord(value)
    && (value.enrolledAt === null || typeof value.enrolledAt === 'string')
    && (value.source === 'explicit' || value.source === 'legacy-progress')
    && (value.lastOpenedAt === null || typeof value.lastOpenedAt === 'string')
    && (value.activeExamId === null || typeof value.activeExamId === 'string');
}

function isTrackMembership(value: unknown): value is TrackMembershipState {
  if (!isRecord(value) || value.schemaVersion !== 1 || !isRecord(value.enrollments)) return false;
  if (!(value.activeTrackId === null || typeof value.activeTrackId === 'string')) return false;
  return Object.values(value.enrollments).every((record) => isTrackEnrollmentRecord(record));
}

/**
 * Cloud restore is destructive, so it accepts only a coherent AppData payload.
 * Older optional fields may be absent and will be migrated by loadData; required
 * collections and every supplied nested record must still have a valid shape.
 */
export function validateCloudRestoreData(value: unknown): value is AppData {
  if (!isRecord(value)) return false;
  if (!isStringArray(value.studiedTopics)) return false;
  if (!isRecord(value.topicProgress) ||
      !Object.values(value.topicProgress).every(isTopicProgress)) return false;
  if (!isRecord(value.questionResults) ||
      !Object.values(value.questionResults).every(isQuestionResult)) return false;
  if (!Array.isArray(value.quizHistory) ||
      !value.quizHistory.every(isQuizHistoryEntry)) return false;
  if (typeof value.lastOpenedTopic !== 'string') return false;
  if (value.studiedCurriculumLessons !== undefined && !isStringArray(value.studiedCurriculumLessons)) return false;
  if (!isOptionalString(value, 'lastOpenedCurriculumLesson')) return false;
  if (value.revisionDates !== undefined) {
    if (!isRecord(value.revisionDates) || !Object.values(value.revisionDates).every((date) => typeof date === 'string')) return false;
  }
  if (value.trackMembership !== undefined && !isTrackMembership(value.trackMembership)) return false;
  return true;
}

export function planCloudRestoreWrite(
  appDataKey: string,
  existingRaw: string | null,
  cloudData: AppData,
): CloudRestorePlan {
  if (!validateCloudRestoreData(cloudData)) {
    throw new Error('Cloud backup data is invalid or incompatible; local progress was not changed.');
  }
  const recoveryKey = `${appDataKey}${CLOUD_RESTORE_RECOVERY_SUFFIX}`;
  return {
    recoveryKey,
    recoveryValue: existingRaw,
    appDataKey,
    appDataValue: JSON.stringify(cloudData),
  };
}

