import type { AppData, TopicProgress, Question, DifficultyFilter, PracticeMode } from '@/types';
import { ensureTrackMembership, normalizeTrackMembership, emptyTrackMembership, TRACK_MEMBERSHIP_SCHEMA_VERSION } from '@/lib/track-membership';
import { STORAGE_KEYS, getEffectiveQuizStats, parseLocalDate, RECENT_QUIZ_SESSION_WINDOW } from '@/lib/constants';
import { updateTopicAbility, getTopicAbility, updateQuestionStrength } from '@/lib/adaptive-select';
import { resolveReviewStage, reviewDateForStage, scheduleAfterReview } from '@/lib/spaced-repetition';
import { dualWriteQuizAttemptsFireAndForget } from '@/lib/dual-write';
import { applyExamAwareInterval, daysUntilIsoDate } from '@/lib/exam-aware-schedule';
import { getNextSession, FPSC_OCT_2026_SESSIONS } from '@/lib/exam-schedule';
import { CLOUD_RESTORE_RECOVERY_SUFFIX } from './cloud-restore';
import { sectionMap } from '@/data/sections';
import { resolveTopicId } from '@/lib/topic-id-aliases';
import { resolveQuestionId } from '@/lib/question-id-aliases';

/** Current AppData document version (trackMembership remains separately versioned). */
export const APP_DATA_SCHEMA_VERSION = 1;

const LOCAL_MUTATION_KEY = 'my-study-local-mutation-at';

export function touchLocalMutation(ts: string = new Date().toISOString()): void {
  try {
    localStorage.setItem(LOCAL_MUTATION_KEY, ts);
  } catch { /* ignore */ }
}

export function getLocalMutationAt(): string | null {
  try {
    return localStorage.getItem(LOCAL_MUTATION_KEY);
  } catch {
    return null;
  }
}

const STORAGE_KEY = STORAGE_KEYS.appData;
const LEGACY_KEY = STORAGE_KEYS.legacyAppData;
const BACKUP_KEY = 'examprep-data-backup';

/** One-shot message for the UI after a corrupt-load recovery */
let lastStorageWarning: string | null = null;

export function consumeStorageWarning(): string | null {
  const msg = lastStorageWarning;
  lastStorageWarning = null;
  return msg;
}

/** Raw backup JSON if present (for user export) */
export function getBackupRaw(): string | null {
  try {
    return localStorage.getItem(BACKUP_KEY);
  } catch {
    return null;
  }
}

/** Save a known-good snapshot before a destructive partial reset. */
export function createRecoveryBackup(data: AppData): boolean {
  try {
    localStorage.setItem(BACKUP_KEY, JSON.stringify(sanitizeForSave(data)));
    return true;
  } catch {
    lastStorageWarning = 'Could not create a recovery backup before reset (storage full). Reset cancelled so your data is not lost.';
    return false;
  }
}

export function downloadBackupFile(data?: AppData): boolean {
  // Settings exports the live in-memory state; recovery actions may still export
  // the last known-good raw backup when no state is supplied.
  const raw = data ? JSON.stringify(sanitizeForSave(data)) : getBackupRaw();
  if (!raw) return false;
  let url: string | null = null;
  try {
    const blob = new Blob([raw], { type: 'application/json' });
    url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `examprep-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    // Give the browser time to begin consuming the blob before releasing it.
    window.setTimeout(() => {
      if (url) URL.revokeObjectURL(url);
    }, 1000);
    return true;
  } catch {
    if (url) URL.revokeObjectURL(url);
    return false;
  }
}

const emptyData: AppData = {
  schemaVersion: APP_DATA_SCHEMA_VERSION,
  studiedTopics: [],
  studiedCurriculumLessons: [],
  lastOpenedCurriculumLesson: '',
  topicProgress: {},
  questionResults: {},
  quizHistory: [],
  revisionDates: {},
  lastOpenedTopic: '',
  trackMembership: emptyTrackMembership(),
};

/** Debounced write so rapid markStudied/recordQuiz bursts don't thrash localStorage */
let saveTimer: ReturnType<typeof setTimeout> | null = null;
let pendingData: AppData | null = null;
const SAVE_DEBOUNCE_MS = 120;


/** Drop deprecated TopicProgress fields so new saves stay clean. */
function sanitizeTopicProgress(p: TopicProgress): TopicProgress {
  const clean: TopicProgress = {
    lastStudied: p.lastStudied,
    nextReview: p.nextReview,
    lastQuizDate: p.lastQuizDate,
    quizCorrect: p.quizCorrect,
    quizTotal: p.quizTotal,
  };
  if (typeof p.reviewStage === 'number') {
    clean.reviewStage = p.reviewStage;
  }
  if (p.recentSessions && p.recentSessions.length > 0) {
    clean.recentSessions = p.recentSessions.slice(-RECENT_QUIZ_SESSION_WINDOW);
  }
  if (typeof p.abilityElo === 'number' && Number.isFinite(p.abilityElo)) {
    clean.abilityElo = p.abilityElo;
  }
  if (typeof p.easeFactor === 'number' && Number.isFinite(p.easeFactor)) {
    clean.easeFactor = p.easeFactor;
  }
  if (typeof p.intervalDays === 'number' && Number.isFinite(p.intervalDays) && p.intervalDays > 0) {
    clean.intervalDays = p.intervalDays;
  }
  return clean;
}

function sanitizeForSave(data: AppData): AppData {
  const topicProgress: Record<string, TopicProgress> = {};
  for (const [id, prog] of Object.entries(data.topicProgress ?? {})) {
    topicProgress[id] = sanitizeTopicProgress(prog);
  }
  // Never silently downgrade an unsupported future membership schema
  const rawMem = data.trackMembership;
  const trackMembership =
    rawMem &&
    typeof rawMem === 'object' &&
    typeof (rawMem as { schemaVersion?: unknown }).schemaVersion === 'number' &&
    (rawMem as { schemaVersion: number }).schemaVersion > TRACK_MEMBERSHIP_SCHEMA_VERSION
      ? rawMem
      : normalizeTrackMembership(rawMem ?? emptyTrackMembership());
  // revisionDates is legacy read-only; never persist a live mirror
  return { ...data, topicProgress, revisionDates: {}, trackMembership };
}

/** @returns false if write failed (storage full/denied) */
let saveRetryCount = 0;
const MAX_SAVE_RETRIES = 3;

function flushSave(): boolean {
  if (pendingData === null) return true;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeForSave(pendingData)));
    pendingData = null;
    saveTimer = null;
    saveRetryCount = 0;
    return true;
  } catch {
    lastStorageWarning =
      'Could not save progress (browser storage may be full). Free space or export a backup — your latest changes may be lost on reload.';
    saveTimer = null;
    if (typeof window !== 'undefined' && saveRetryCount < MAX_SAVE_RETRIES) {
      saveRetryCount += 1;
      saveTimer = window.setTimeout(() => {
        flushSave();
      }, 2000 * saveRetryCount);
    }
    return false;
  }
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function validateTopicProgress(p: unknown): p is TopicProgress {
  if (!isObject(p)) return false;
  if (p.lastStudied !== undefined && p.lastStudied !== null && typeof p.lastStudied !== 'string') return false;
  if (p.nextReview !== undefined && p.nextReview !== null && typeof p.nextReview !== 'string') return false;
  if (p.lastQuizDate !== undefined && p.lastQuizDate !== null && typeof p.lastQuizDate !== 'string') return false;
  if (p.quizCorrect !== undefined && typeof p.quizCorrect !== 'number') return false;
  if (p.quizTotal !== undefined && typeof p.quizTotal !== 'number') return false;
  return true;
}


function migrateAppDataDocument(data: Record<string, unknown>): Record<string, unknown> {
  const v = typeof data.schemaVersion === 'number' ? data.schemaVersion : 0;
  if (v > APP_DATA_SCHEMA_VERSION) {
    return data; // reject later in validate if we choose
  }
  if (v < 1) {
    return { ...data, schemaVersion: 1 };
  }
  return data;
}

function validateAppData(data: unknown): data is AppData {
  if (!isObject(data)) {
    console.warn('[storage] Invalid data: not an object');
    return false;
  }
  const version = typeof (data as { schemaVersion?: unknown }).schemaVersion === 'number'
    ? (data as { schemaVersion: number }).schemaVersion
    : 0;
  if (version > APP_DATA_SCHEMA_VERSION) {
    console.warn('[storage] Invalid data: schemaVersion from the future', version);
    return false;
  }
  if (version < 1) {
    (data as { schemaVersion: number }).schemaVersion = 1;
  }
  if (data.quizHistory !== undefined && !Array.isArray(data.quizHistory)) {
    console.warn('[storage] Invalid data: quizHistory is not an array');
    return false;
  }
  if (data.topicProgress !== undefined) {
    if (!isObject(data.topicProgress)) {
      console.warn('[storage] Invalid data: topicProgress is not an object');
      return false;
    }
    // Quarantine bad entries on a copy so we do not mutate the caller's object in place.
    const tp: Record<string, unknown> = { ...(data.topicProgress as Record<string, unknown>) };
    let stripped = false;
    for (const [k, v] of Object.entries(tp)) {
      if (!validateTopicProgress(v)) {
        console.warn(`[storage] Invalid topicProgress entry quarantined: ${k}`);
        delete tp[k];
        stripped = true;
      }
    }
    if (stripped) {
      (data as { topicProgress: Record<string, unknown> }).topicProgress = tp;
    }
  }
  if (data.questionResults !== undefined && !isObject(data.questionResults)) {
    console.warn('[storage] Invalid data: questionResults is not an object');
    return false;
  }
  if (data.studiedCurriculumLessons !== undefined && !Array.isArray(data.studiedCurriculumLessons)) {
    console.warn('[storage] Invalid data: studiedCurriculumLessons is not an array');
    return false;
  }
  if (data.lastOpenedCurriculumLesson !== undefined && typeof data.lastOpenedCurriculumLesson !== 'string') {
    console.warn('[storage] Invalid data: lastOpenedCurriculumLesson is not a string');
    return false;
  }
  if (data.studiedTopics !== undefined && !Array.isArray(data.studiedTopics)) {
    console.warn('[storage] Invalid data: studiedTopics is not an array');
    return false;
  }
  if (data.revisionDates !== undefined && !isObject(data.revisionDates)) {
    console.warn('[storage] Invalid data: revisionDates is not an object');
    return false;
  }
  if (data.lastOpenedTopic !== undefined && typeof data.lastOpenedTopic !== 'string') {
    console.warn('[storage] Invalid data: lastOpenedTopic is not a string');
    return false;
  }
  return true;
}

/** Migrate legacy TopicProgress (quizAccuracy/quizAttempts → quizCorrect/quizTotal) */
function migrateProgress(p: Record<string, unknown>): TopicProgress {
  const quizAttempts = typeof p.quizAttempts === 'number' ? p.quizAttempts : (typeof p.attempts === 'number' ? p.attempts : 0);
  const quizAccuracyPct = typeof p.quizAccuracy === 'number' ? p.quizAccuracy : (typeof p.accuracy === 'number' ? p.accuracy : 0);
  const quizCorrect = Math.round((quizAccuracyPct / 100) * quizAttempts);
  const reviewStage = typeof p.reviewStage === 'number' ? p.reviewStage : undefined;
  return {
    lastStudied: (p.lastStudied as string | null) ?? null,
    nextReview: (p.nextReview as string | null) ?? (p.quizNextReview as string | null) ?? null,
    reviewStage,
    lastQuizDate: (p.lastQuizDate as string | null) ?? null,
    quizCorrect,
    quizTotal: quizAttempts,
  };
}



function migrateQuestionResults(data: AppData): { data: AppData; changed: boolean } {
  let changed = false;
  const questionResults: AppData['questionResults'] = {};
  for (const [qid, result] of Object.entries(data.questionResults ?? {})) {
    const nid = resolveQuestionId(qid);
    if (nid !== qid) changed = true;
    // Prefer existing entry under new id if both exist
    questionResults[nid] = questionResults[nid] ?? result;
  }
  return { data: { ...data, questionResults }, changed };
}

/** Remap topic IDs after renames so saved progress follows. */
function migrateTopicIdKeys(data: AppData): { data: AppData; changed: boolean } {
  let changed = false;
  const remap = (id: string): string => {
    const next = resolveTopicId(id);
    if (next !== id) changed = true;
    return next;
  };

  const topicProgress: Record<string, TopicProgress> = {};
  for (const [tid, prog] of Object.entries(data.topicProgress ?? {})) {
    const nid = remap(tid);
    topicProgress[nid] = topicProgress[nid] ?? prog;
  }

  const studiedTopics = [...new Set((data.studiedTopics ?? []).map(remap))];
  const revisionDates: Record<string, string> = {};
  for (const [tid, dateStr] of Object.entries(data.revisionDates ?? {})) {
    revisionDates[remap(tid)] = dateStr;
  }

  const quizHistory = (data.quizHistory ?? []).map((q) =>
    q.topicId ? { ...q, topicId: remap(q.topicId) } : q,
  );

  const lastOpenedTopic = data.lastOpenedTopic ? remap(data.lastOpenedTopic) : data.lastOpenedTopic;

  return {
    data: {
      ...data,
      topicProgress,
      studiedTopics,
      revisionDates,
      quizHistory,
      lastOpenedTopic,
    },
    changed,
  };
}

function normalizeLoaded(parsed: AppData): AppData {
  let merged = { ...emptyData, ...parsed };
  let migrated = false;
  for (const [k, v] of Object.entries(merged.topicProgress)) {
    if (v.quizCorrect === undefined && (v.quizAccuracy !== undefined || v.quizAttempts !== undefined || v.attempts !== undefined)) {
      merged.topicProgress[k] = migrateProgress(v as unknown as Record<string, unknown>);
      migrated = true;
    }
  }
  // Legacy revisionDates → nextReview (one-way). Do not mirror back.
  for (const [tid, dateStr] of Object.entries(merged.revisionDates ?? {})) {
    if (!dateStr) continue;
    const prog = merged.topicProgress[tid];
    if (prog && !prog.nextReview) {
      merged.topicProgress[tid] = { ...prog, nextReview: dateStr };
      migrated = true;
    } else if (!prog) {
      merged.topicProgress[tid] = {
        lastStudied: null,
        nextReview: dateStr,
        lastQuizDate: null,
        quizCorrect: 0,
        quizTotal: 0,
      };
      migrated = true;
    }
  }
  // Drop dead mirror field from runtime model (migration already applied)
  merged.revisionDates = {};
  const idMig = migrateTopicIdKeys(merged);
  merged = idMig.data;
  if (idMig.changed) migrated = true;
  const qMig = migrateQuestionResults(merged);
  merged = qMig.data;
  if (qMig.changed) migrated = true;

  // Track membership: normalize existing or migrate from evidence (never default-enroll FPSC)
  let legacyActive: string | null = null;
  try {
    const rawSel = localStorage.getItem('examprep-subject-selection');
    if (rawSel) {
      const parsed = JSON.parse(rawSel) as { activeTrack?: string };
      if (parsed?.activeTrack === 'fpsc' || parsed?.activeTrack === 'hat') {
        legacyActive = parsed.activeTrack;
      }
    }
  } catch { /* ignore */ }
  const mem = ensureTrackMembership(merged, { legacyActiveTrack: legacyActive });
  merged = mem.data;
  if (mem.changed) migrated = true;

  if (migrated) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeForSave(merged))); } catch { /* ignore */ }
  }
  return merged;
}

function isValidBackupRaw(raw: string | null): boolean {
  if (!raw) return false;
  try {
    return validateAppData(JSON.parse(raw));
  } catch {
    return false;
  }
}

/** Never replace a known-good recovery snapshot with the corrupt primary save. */
function preserveCorruptPrimaryIfNoValidBackup(raw: string): void {
  try {
    const existingBackup = localStorage.getItem(BACKUP_KEY);
    if (!isValidBackupRaw(existingBackup)) {
      // With no usable backup, preserve the original bytes for manual export.
      localStorage.setItem(BACKUP_KEY, raw);
    }
  } catch {
    /* storage may be unavailable or full */
  }
}

function recoverCorruptPrimary(raw: string): AppData {
  const fromBackup = tryRestoreBackup();
  if (fromBackup) {
    lastStorageWarning =
      'Primary save was invalid; restored progress from the last valid backup.';
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeForSave(fromBackup)));
      localStorage.removeItem(`${STORAGE_KEY}${CLOUD_RESTORE_RECOVERY_SUFFIX}`);
    } catch { /* keep the in-memory recovery and recovery key available */ }
    return fromBackup;
  }

  preserveCorruptPrimaryIfNoValidBackup(raw);
  lastStorageWarning =
    'Your saved progress was corrupt and no valid backup could be restored. A copy of the original data may be available to export.';
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeForSave(emptyData)));
  } catch { /* if storage is unavailable, defaults remain in memory */ }
  return { ...emptyData };
}

export function loadData(): AppData {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        localStorage.setItem(STORAGE_KEY, legacy);
        localStorage.removeItem(LEGACY_KEY);
        raw = legacy;
      }
    }
    if (!raw) {
      const fromRecovery = tryRestoreBackup(true);
      if (!fromRecovery) return { ...emptyData };
      lastStorageWarning = 'Restored the pre-cloud-restore recovery snapshot because the primary save was missing.';
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizeForSave(fromRecovery)));
        localStorage.removeItem(`${STORAGE_KEY}${CLOUD_RESTORE_RECOVERY_SUFFIX}`);
      } catch { /* retain the recovery snapshot if persistence fails */ }
      return fromRecovery;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.warn('[storage] JSON parse failed; attempting recovery before preserving corrupt data');
      return recoverCorruptPrimary(raw);
    }

    if (!validateAppData(parsed)) {
      console.warn('[storage] Stored data failed validation; attempting recovery before preserving corrupt data');
      return recoverCorruptPrimary(raw);
    }

    const normalized = normalizeLoaded(parsed as AppData);
    // A valid primary save means any pre-restore snapshot is no longer needed.
    try { localStorage.removeItem(`${STORAGE_KEY}${CLOUD_RESTORE_RECOVERY_SUFFIX}`); } catch { /* ignore */ }
    return normalized;
  } catch {
    lastStorageWarning =
      'Could not read saved progress. Starting fresh. If you had data, try downloading the backup.';
    return tryRestoreBackup() ?? { ...emptyData };
  }
}

function tryRestoreBackup(recoveryOnly = false): AppData | null {
  const cloudRecoveryKey = `${STORAGE_KEY}${CLOUD_RESTORE_RECOVERY_SUFFIX}`;
  const recoveryKeys = recoveryOnly ? [cloudRecoveryKey] : [cloudRecoveryKey, BACKUP_KEY];
  for (const key of recoveryKeys) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (!validateAppData(parsed)) continue;
      // Do not write during restore read — caller (loadData) owns persistence.
      return normalizeLoaded(parsed as AppData);
    } catch {
      // Try the next recovery source; one corrupt backup must not block another.
    }
  }
  return null;
}

export function saveData(data: AppData): void {
  const withVersion: AppData = {
    ...data,
    schemaVersion: data.schemaVersion ?? APP_DATA_SCHEMA_VERSION,
  };
  pendingData = withVersion;
  touchLocalMutation();
  if (saveTimer !== null) clearTimeout(saveTimer);
  saveTimer = setTimeout(flushSave, SAVE_DEBOUNCE_MS);
}

/** Force any pending debounced write immediately (e.g. before unload). */
/** Force any pending debounced write immediately. @returns false if storage write failed. */
export function flushPendingSave(): boolean {
  if (saveTimer !== null) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  return flushSave();
}

export function resetData(): boolean {
  // Keep the latest in-memory state available for recovery even if the primary
  // write failed because storage is full.
  if (saveTimer !== null) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }

  try {
    const raw = pendingData !== null
      ? JSON.stringify(sanitizeForSave(pendingData))
      : localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        localStorage.setItem(BACKUP_KEY, raw);
      } catch {
        lastStorageWarning =
          'Could not create a backup before reset (storage full). Reset cancelled so your data is not lost.';
        return false;
      }
    }

    pendingData = null;
    saveRetryCount = 0;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_KEY);
    localStorage.removeItem(STORAGE_KEYS.subjectSelection);
    localStorage.removeItem(STORAGE_KEYS.practicePrefs);
    localStorage.removeItem(STORAGE_KEYS.quizProgress);
    localStorage.removeItem(STORAGE_KEYS.sidebarExpanded);
    return true;
  } catch {
    lastStorageWarning = 'Reset failed. Check your saved data and backup before trying again.';
    return false;
  }
}

function defaultProgress(): TopicProgress {
  return {
    lastStudied: null,
    nextReview: null,
    lastQuizDate: null,
    quizCorrect: 0,
    quizTotal: 0,
  };
}

/** Read-only lookup — does not mutate `data`. */
export function getOrCreateProgress(data: AppData, topicId: string): TopicProgress {
  return data.topicProgress[topicId] ?? defaultProgress();
}

export function markCurriculumLessonStudied(data: AppData, lessonId: string): AppData {
  return {
    ...data,
    studiedCurriculumLessons: [...new Set([...(data.studiedCurriculumLessons ?? []), lessonId])],
    lastOpenedCurriculumLesson: lessonId,
  };
}

export function setLastOpenedCurriculumLesson(data: AppData, lessonId: string): AppData {
  return { ...data, lastOpenedCurriculumLesson: lessonId };
}

export function markTopicStudied(data: AppData, topicId: string): AppData {
  const prog = { ...getOrCreateProgress(data, topicId) };
  prog.lastStudied = new Date().toISOString();
  // Passive study must not advance SR stages (that requires a quiz).
  // Only seed an initial nextReview if the topic has never been scheduled.
  if (!prog.nextReview) {
    prog.reviewStage = 0;
    prog.nextReview = reviewDateForStage(0);
  }
  return {
    ...data,
    studiedTopics: [...new Set([...data.studiedTopics, topicId])],
    topicProgress: { ...data.topicProgress, [topicId]: prog },
    lastOpenedTopic: topicId,
  };
}

export function recordQuizResult(
  data: AppData,
  topicId: string | null,
  answers: { questionId: string; correct: boolean }[],
  questions: Question[],
  mode: PracticeMode,
  subjectId?: string,
  difficultyFilter?: DifficultyFilter,
): AppData {
  const correctCount = answers.filter((a) => a.correct).length;
  const totalCount = answers.length;
  const now = Date.now();

  const questionResults = { ...data.questionResults };
  const qSectionMap = new Map(questions.map((q) => [q.id, q.sectionId]));
  for (const a of answers) {
    const secId = qSectionMap.get(a.questionId);
    const qSubjectId = secId ? sectionMap[secId]?.subjectId : undefined;
    const prev = questionResults[a.questionId];
    questionResults[a.questionId] = updateQuestionStrength(
      prev,
      a.correct,
      now,
      qSubjectId ?? subjectId,
    );
  }

  const quizHistory = [
    ...data.quizHistory,
    {
      date: now,
      mode,
      score: correctCount,
      total: totalCount,
      topicId: topicId ?? undefined,
      subjectId,
      difficultyFilter,
    },
  ];

  const questionTopicMap = new Map(questions.map((q) => [q.id, q.topicId]));
  const topicAnswers: Record<string, { correct: number; total: number }> = {};
  for (const a of answers) {
    const tid = questionTopicMap.get(a.questionId);
    if (!tid) continue;
    if (!topicAnswers[tid]) topicAnswers[tid] = { correct: 0, total: 0 };
    topicAnswers[tid].total++;
    if (a.correct) topicAnswers[tid].correct++;
  }

  const questionById = new Map(questions.map((q) => [q.id, q]));

  let topicProgress = data.topicProgress;
  for (const [tid, { correct, total }] of Object.entries(topicAnswers)) {
    const prog = { ...getOrCreateProgress({ ...data, topicProgress }, tid) };
    prog.quizCorrect += correct; // lifetime volume
    prog.quizTotal += total;
    prog.lastQuizDate = new Date(now).toISOString();
    const prev = prog.recentSessions ?? [];
    prog.recentSessions = [...prev, { correct, total, at: now }].slice(-RECENT_QUIZ_SESSION_WINDOW);
    const accuracy = getEffectiveQuizStats(prog).accuracy;
    const quizStage = resolveReviewStage(prog.reviewStage, prog.nextReview);
    const scheduled = scheduleAfterReview({
      intervalDays: prog.intervalDays,
      easeFactor: prog.easeFactor,
      reviewStage: quizStage,
      accuracy,
    });
    prog.reviewStage = scheduled.reviewStage;
    prog.nextReview = scheduled.nextReview;
    prog.intervalDays = scheduled.intervalDays;
    // Exam-aware compression when a future session date is known (display schedule).
    try {
      const next = getNextSession(FPSC_OCT_2026_SESSIONS, new Date(now));
      const examIso = next?.startsAtIso;
      if (examIso) {
        const days = daysUntilIsoDate(examIso, now);
        if (Number.isFinite(days)) {
          const aware = applyExamAwareInterval({
            intervalDays: prog.intervalDays ?? scheduled.intervalDays,
            daysUntilExam: days,
          });
          prog.intervalDays = aware.intervalDays;
          if (aware.intervalDays !== scheduled.intervalDays && prog.nextReview) {
            const base = new Date(now);
            base.setUTCDate(base.getUTCDate() + aware.intervalDays);
            prog.nextReview = base.toISOString().slice(0, 10);
          }
        }
      }
    } catch {
      /* schedule helpers must never break saves */
    }
    prog.easeFactor = scheduled.easeFactor;

    // Phase 2: update topic ability θ from each answer on this topic
    let θ = getTopicAbility(prog);
    for (const a of answers) {
      if (questionTopicMap.get(a.questionId) !== tid) continue;
      const qq = questionById.get(a.questionId);
      θ = updateTopicAbility(θ, qq?.difficulty, a.correct);
    }
    prog.abilityElo = θ;

    topicProgress = { ...topicProgress, [tid]: prog };
  }

  // Phase 0: append-only review events (best-effort; aggregates remain authoritative)
  dualWriteQuizAttemptsFireAndForget({
    answers: answers.map((a) => ({
      questionId: a.questionId,
      correct: a.correct,
      skillId: questionTopicMap.get(a.questionId) ?? a.questionId,
    })),
    mode,
    sessionId: `quiz_${now}`,
    ts: now,
  });

  return {
    ...data,
    questionResults,
    quizHistory,
    topicProgress,
    // revisionDates: legacy read-only; not updated on new activity
  };
}

export function setLastOpenedTopic(data: AppData, topicId: string): AppData {
  return { ...data, lastOpenedTopic: topicId };
}

export function getDueTopics(data: AppData): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due: string[] = [];
  for (const [topicId, prog] of Object.entries(data.topicProgress)) {
    if (prog.nextReview && parseLocalDate(prog.nextReview) <= today) due.push(topicId);
  }
  return due;
}
