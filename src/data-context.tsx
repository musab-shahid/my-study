import { createContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import type { AppData, Question, DifficultyFilter, PracticeMode, SubjectId, TrackMembershipState } from '@/types';
import { emptyTrackMembership, normalizeTrackMembership, setActiveExamProfile as setActiveExamProfilePure, leaveTrack as leaveTrackPure } from '@/lib/track-membership';
import { withEnrollAndFocus, withFocusTrack } from '@/lib/track-focus';
import { isTrackId, type TrackId } from '@/data/tracks';
import { getExamSessionConfigKey, validateExamSessions, type ExamSession } from '@/lib/exam-schedule';
import { loadData, saveData, flushPendingSave, createRecoveryBackup, markTopicStudied, markCurriculumLessonStudied as markCurriculumLessonStudiedPure, recordQuizResult, setLastOpenedTopic, setLastOpenedCurriculumLesson as setLastOpenedCurriculumLessonPure, resetData } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/constants';
import { sections } from '@/data/sections';
import { topics } from '@/data/topics';
import { cgeiLessonIdsForSubjects } from '@/data/cgei/curriculum-index';

export interface DataContextValue {
  data: AppData;
  markStudied: (topicId: string) => void;
  markCurriculumLessonStudied: (lessonId: string) => void;
  recordQuiz: (topicId: string | null, answers: { questionId: string; correct: boolean; confidence?: 1 | 2 | 3; latencyMs?: number; selectedIndices?: number[] }[], questions: Question[], mode: PracticeMode, subjectId?: string, difficultyFilter?: DifficultyFilter) => void;
  setLastTopic: (topicId: string) => void;
  setLastCurriculumLesson: (lessonId: string) => void;
  reset: () => boolean;
  resetSubjects: (subjectIds: SubjectId[]) => boolean;
  /** Explicit track enrollment; sets track active on success */
  enrollInTrack: (trackId: TrackId) => { ok: boolean; reason?: string };
  /** Switch active focus among enrolled tracks only */
  setActiveEnrolledTrack: (trackId: TrackId | null) => { ok: boolean; reason?: string };
  /** Set exam/post profile within an enrolled track (null = general track scope) */
  setExamProfile: (trackId: TrackId, examId: string | null) => { ok: boolean; reason?: string };
  /** Persist validated exam sessions for a track/profile without touching study progress. */
  setExamSessions: (trackId: TrackId, profileId: string | null, sessions: ExamSession[]) => { ok: boolean; reason?: string };
  /** Leave a track (unenroll). Progress is kept. */
  leaveEnrolledTrack: (trackId: TrackId) => { ok: boolean; reason?: string };
  trackMembership: TrackMembershipState;
}

export const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => loadData());
  const dataRef = useRef(data);
  dataRef.current = data;

  const isFirst = useRef(true);

  // Persist outside setState updaters (StrictMode-safe: one effect per committed data)
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    saveData(data);
  }, [data]);

  // Multi-tab: another tab wrote or cleared AppData — converge
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEYS.appData) return;
      try {
        // null newValue = reset/cleared in another tab
        const next = loadData();
        setData(next);
        dataRef.current = next;
        if (e.newValue == null) {
          try {
            window.dispatchEvent(new CustomEvent('examprep-subject-selection-reset'));
          } catch { /* ignore */ }
        }
      } catch {
        /* ignore */
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const markStudied = useCallback((topicId: string) => {
    setData((prev) => markTopicStudied(prev, topicId));
  }, []);

  const markCurriculumLessonStudied = useCallback((lessonId: string) => {
    setData((prev) => markCurriculumLessonStudiedPure(prev, lessonId));
  }, []);

  const recordQuiz = useCallback((topicId: string | null, answers: { questionId: string; correct: boolean; confidence?: 1 | 2 | 3; latencyMs?: number; selectedIndices?: number[] }[], questions: Question[], mode: PracticeMode, subjectId?: string, difficultyFilter?: DifficultyFilter) => {
    setData((prev) => recordQuizResult(prev, topicId, answers, questions, mode, subjectId, difficultyFilter));
  }, []);

  const setLastTopic = useCallback((topicId: string) => {
    setData((prev) => setLastOpenedTopic(prev, topicId));
  }, []);

  const setLastCurriculumLesson = useCallback((lessonId: string) => {
    setData((prev) => setLastOpenedCurriculumLessonPure(prev, lessonId));
  }, []);

  const reset = useCallback(() => {
    if (!resetData()) return false;
    const fresh = loadData();
    setData(fresh);
    dataRef.current = fresh;
    try {
      window.dispatchEvent(new CustomEvent('examprep-subject-selection-reset'));
    } catch { /* ignore */ }
    return true;
  }, []);

  /**
   * Membership mutations: compute pure next state from dataRef, apply, then flush persistence.
   * Success means accepted in memory AND write succeeded (or nothing pending).
   */
  const enrollInTrack = useCallback((trackId: TrackId) => {
    const r = withEnrollAndFocus(dataRef.current, trackId);
    if (!r.ok) return { ok: false as const, reason: r.reason };
    setData(r.data);
    dataRef.current = r.data;
    saveData(r.data);
    if (!flushPendingSave()) return { ok: false as const, reason: 'persist-failed' };
    return { ok: true as const };
  }, []);

  const setActiveEnrolledTrack = useCallback((trackId: TrackId | null) => {
    const r = withFocusTrack(dataRef.current, trackId);
    if (!r.ok) return { ok: false as const, reason: r.reason };
    setData(r.data);
    dataRef.current = r.data;
    saveData(r.data);
    if (!flushPendingSave()) return { ok: false as const, reason: 'persist-failed' };
    return { ok: true as const };
  }, []);

  const leaveEnrolledTrack = useCallback((trackId: TrackId) => {
    const mem = normalizeTrackMembership(dataRef.current.trackMembership ?? emptyTrackMembership());
    const r = leaveTrackPure(mem, trackId);
    if (!r.ok) return { ok: false as const, reason: r.reason };
    const next = { ...dataRef.current, trackMembership: r.state };
    setData(next);
    dataRef.current = next;
    saveData(next);
    if (!flushPendingSave()) return { ok: false as const, reason: 'persist-failed' };
    return { ok: true as const };
  }, []);

  const setExamProfile = useCallback((trackId: TrackId, examId: string | null) => {
    const mem = normalizeTrackMembership(dataRef.current.trackMembership ?? emptyTrackMembership());
    const r = setActiveExamProfilePure(mem, trackId, examId);
    if (!r.ok) return { ok: false as const, reason: r.reason };
    const next = { ...dataRef.current, trackMembership: r.state };
    setData(next);
    dataRef.current = next;
    saveData(next);
    if (!flushPendingSave()) return { ok: false as const, reason: 'persist-failed' };
    return { ok: true as const };
  }, []);

  const setExamSessions = useCallback((trackId: TrackId, profileId: string | null, sessions: ExamSession[]) => {
    const errors = validateExamSessions(sessions);
    if (errors.length > 0) return { ok: false as const, reason: errors.join('; ') };
    const current = dataRef.current;
    const key = getExamSessionConfigKey(trackId, profileId);
    const next: AppData = {
      ...current,
      examSessionsByProfile: {
        ...(current.examSessionsByProfile ?? {}),
        [key]: sessions.map((session) => ({ ...session })),
      },
    };
    saveData(next);
    if (!flushPendingSave()) {
      saveData(current);
      flushPendingSave();
      return { ok: false as const, reason: 'persist-failed' };
    }
    setData(next);
    dataRef.current = next;
    return { ok: true as const };
  }, []);;

  const trackMembership = normalizeTrackMembership(data.trackMembership ?? emptyTrackMembership());


  const resetSubjects = useCallback((subjectIds: SubjectId[]) => {
    const current = dataRef.current;
    // A partial reset is destructive too: do not mutate state unless its recovery
    // snapshot can be written first.
    if (!createRecoveryBackup(current)) return false;

    const subjectIdSet = new Set(subjectIds);
    const subjectSectionIds = new Set(
      sections.filter((s) => subjectIdSet.has(s.subjectId)).map((s) => s.id)
    );
    const subjectTopicIds = new Set(
      topics.filter((t) => subjectSectionIds.has(t.sectionId)).map((t) => t.id)
    );
    // Reset only the lightweight CGEI lesson IDs for selected subjects. The
    // full lesson/question registry must not be loaded for synchronous reset.
    const curriculumLessonIds = cgeiLessonIdsForSubjects(subjectIdSet);

    const next: AppData = {
      studiedTopics: current.studiedTopics.filter((tid) => !subjectTopicIds.has(tid)),
      studiedCurriculumLessons: (current.studiedCurriculumLessons ?? []).filter((id) => !curriculumLessonIds.has(id)),
      lastOpenedCurriculumLesson: curriculumLessonIds.has(current.lastOpenedCurriculumLesson ?? '') ? '' : (current.lastOpenedCurriculumLesson ?? ''),
      topicProgress: Object.fromEntries(
        Object.entries(current.topicProgress).filter(([tid]) => !subjectTopicIds.has(tid))
      ),
      questionResults: Object.fromEntries(
        Object.entries(current.questionResults).filter(([, r]) => {
          if (r.subjectId) return !subjectIdSet.has(r.subjectId as SubjectId);
          return true;
        })
      ),
      quizHistory: current.quizHistory.filter((q) => {
        if (q.subjectId && subjectIdSet.has(q.subjectId as SubjectId)) return false;
        if (q.topicId && subjectTopicIds.has(q.topicId)) return false;
        return true;
      }),
      revisionDates: Object.fromEntries(
        Object.entries(current.revisionDates ?? {}).filter(([tid]) => !subjectTopicIds.has(tid))
      ),
      lastOpenedTopic: subjectTopicIds.has(current.lastOpenedTopic) ? '' : current.lastOpenedTopic,
      trackMembership: current.trackMembership,
      examSessionsByProfile: current.examSessionsByProfile,
    };

    // Persist synchronously before committing the destructive in-memory change.
    saveData(next);
    if (!flushPendingSave()) {
      // Keep the current view unchanged; the recovery snapshot remains available.
      saveData(current);
      flushPendingSave();
      return false;
    }
    setData(next);
    dataRef.current = next;
    return true;
  }, []);

  return (
    <DataContext.Provider value={{ data, markStudied, markCurriculumLessonStudied, recordQuiz, setLastTopic, setLastCurriculumLesson, reset, resetSubjects, enrollInTrack, setActiveEnrolledTrack, setExamProfile, setExamSessions, leaveEnrolledTrack, trackMembership }}>
      {children}
    </DataContext.Provider>
  );
}
