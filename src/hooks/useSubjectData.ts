import { useMemo, useState, useEffect, useCallback } from 'react';
import { useData } from '@/hooks/useData';
import { subjectsForScope, contentEligibleForScope } from '@/lib/track-scope';
import { isTrackId } from '@/data/tracks';
import { sectionMap, sectionsBySubject, sections } from '@/data/sections';
import { topics, topicsBySubject, getTopic } from '@/data/topics';
import { questionsByTopic } from '@/data/questions';
import { subjectMap, subjectsByTrack } from '@/data/subjects';
import { getFormulasForSubject } from '@/data/formulas';
import { getOverallStats, getWeakestTopics, getTodayRevision } from '@/lib/stats';
import { searchTopics, type SearchResult } from '@/lib/search';
import {
  loadSubjectTopics,
  loadSubjectQuestions,
  getCachedTopics,
  getCachedQuestions,
  getAllCachedTopics,
  getAllCachedQuestions,
  getTopicFromCache,
} from '@/data/lazy-data';
import type { Topic, Question, Section, SubjectId } from '@/types';
import { getEffectiveQuizStats, parseLocalDate } from '@/lib/constants';

export interface SubjectStats {
  subjectId: SubjectId | 'all';
  subjectTitle: string;
  totalTopics: number;
  studiedTopics: number;
  quizTouchedTopics: number;
  totalQuestions: number;
  questionsAnswered: number;
  /** null = no quiz attempts yet (not a measured 0%) */
  accuracy: number | null;
  mastery: number;
  hasContent: boolean;
  sections: Section[];
  topics: Topic[];
  questions: Question[];
  weakestTopics: { topicId: string; accuracy: number }[];
  todayRevision: string[];
}

export interface SubjectDataLayer {
  topicsFor: (id: SubjectId | 'all') => Topic[];
  questionsFor: (id: SubjectId | 'all') => Question[];
  sectionsFor: (id: SubjectId | 'all') => Section[];
  statsFor: (id: SubjectId | 'all') => SubjectStats;

  allSubjectsStats: () => SubjectStats[];
  totalTopics: number;
  totalQuestions: number;
  totalFormulas: number;

  revisionQueueAll: () => Array<{ topicId: string; subjectId: SubjectId; accuracy: number; dateStr: string }>;
  searchAll: (query: string) => Array<{ topic: Topic; subjectId: SubjectId; match: string; type: SearchResult['type'] }>;

  formulasFor: (id: SubjectId | 'all') => ReturnType<typeof getFormulasForSubject>;
  getTopicById: (topicId: string) => Topic | undefined;
  questionsByTopicId: (topicId: string) => Question[];

  // Async loaders for screens that need full content
  ensureTopicsLoaded: (id: SubjectId | 'all') => Promise<void>;
  ensureQuestionsLoaded: (id: SubjectId | 'all') => Promise<void>;
  loadedSubjects: Set<string>;
  isLoaded: (id: SubjectId | 'all') => boolean;
  isQuestionsReady: (id: SubjectId | 'all') => boolean;
}

export function useSubjectData(): SubjectDataLayer {
  const { data, trackMembership } = useData();
  // Canonical learning focus — never subject-selection.activeTrack
  const focusId = trackMembership.activeTrackId;
  const activeTrack = focusId && isTrackId(focusId) ? focusId : null;
  const activeExamId = activeTrack
    ? (trackMembership.enrollments[activeTrack]?.activeExamId ?? null)
    : null;
  const [loadedSubjects, setLoadedSubjects] = useState<Set<string>>(new Set());
  const [loadedQuestionSubjects, setLoadedQuestionSubjects] = useState<Set<string>>(new Set());

  const trackSubjectIds = useMemo(() => {
    if (!activeTrack) return new Set<string>();
    return new Set(subjectsForScope({ trackId: activeTrack, examId: activeExamId }).map((s) => s.id));
  }, [activeTrack, activeExamId]);

  const trackSections = useMemo(() => {
    return sections.filter((s) => trackSubjectIds.has(s.subjectId));
  }, [trackSubjectIds]);

  const trackTopics = useMemo(() => {
    const trackSectionIds = new Set(trackSections.map((s) => s.id));
    if (!activeTrack) return [];
    const scope = { trackId: activeTrack, examId: activeExamId };
    return topics.filter((t) => {
      if (!trackSectionIds.has(t.sectionId)) return false;
      return contentEligibleForScope(t, scope);
    });
  }, [trackSections, activeTrack, activeExamId]);

  const trackSubjectIdList = useMemo(
    () => Array.from(trackSubjectIds) as SubjectId[],
    [trackSubjectIds],
  );

  // Resync loadedSubjects to current track's cache on track switch (never keep other-track ids)
  useEffect(() => {
    const loaded = new Set<string>();
    for (const id of trackSubjectIdList) {
      if (getCachedTopics(id) !== undefined || getCachedQuestions(id) !== undefined) {
        loaded.add(id);
      }
    }
    setLoadedSubjects(loaded);
    const loadedQ = new Set<string>();
    for (const id of trackSubjectIdList) {
      if (getCachedQuestions(id) !== undefined) loadedQ.add(id);
    }
    setLoadedQuestionSubjects(loadedQ);
  }, [trackSubjectIdList]);

  const topicsFor = useCallback((id: SubjectId | 'all'): Topic[] => {
    if (id === 'all') return trackTopics;
    if (!trackSubjectIds.has(id)) return [];
    const scope = activeTrack ? { trackId: activeTrack, examId: activeExamId } : null;
    const list = topicsBySubject(id);
    if (!scope) return list;
    return list.filter((topic) => contentEligibleForScope(topic, scope));
  }, [trackTopics, trackSubjectIds, activeTrack, activeExamId]);

  const questionsFor = useCallback((id: SubjectId | 'all'): Question[] => {
    if (id !== 'all' && !trackSubjectIds.has(id)) return [];
    const scope = activeTrack ? { trackId: activeTrack, examId: activeExamId } : null;
    const filterQ = (q: Question) => {
      if (scope && !contentEligibleForScope(q, scope)) return false;
      return true;
    };
    if (id === 'all') {
      const result: Question[] = [];
      for (const sid of trackSubjectIdList) {
        const cached = getCachedQuestions(sid);
        if (cached) result.push(...cached.filter(filterQ));
      }
      return result;
    }
    const cached = getCachedQuestions(id);
    if (!cached) return [];
    const sSections = sectionsBySubject(id);
    const sSectionIds = new Set(sSections.map((s) => s.id));
    return cached.filter((q) => sSectionIds.has(q.sectionId) && filterQ(q));
  }, [trackSubjectIdList, trackSubjectIds, activeTrack, activeExamId]);

  const questionCountFor = useCallback((id: SubjectId | 'all'): number => {
    if (id !== 'all' && !trackSubjectIds.has(id)) return 0;
    if (id === 'all') return trackSections.reduce((sum, s) => sum + s.questionCount, 0);
    return sectionsBySubject(id).reduce((sum, s) => sum + s.questionCount, 0);
  }, [trackSections, trackSubjectIds]);

  const sectionsFor = useCallback((id: SubjectId | 'all'): Section[] => {
    if (id === 'all') return trackSections;
    if (!trackSubjectIds.has(id)) return [];
    return sectionsBySubject(id);
  }, [trackSections, trackSubjectIds]);

  const statsFor = useCallback((id: SubjectId | 'all'): SubjectStats => {
    const sTopics = topicsFor(id);
    const sQuestions = questionsFor(id);
    const sSections = sectionsFor(id);
    const sTopicIds = new Set(sTopics.map((t) => t.id));
    const stats = getOverallStats(data, sTopics, sQuestions);
    const weakest = getWeakestTopics(data, sTopicIds, 3);
    const revision = getTodayRevision(data, sTopicIds);
    // Prefer authored metadata counts unless the full question bank for this scope is loaded
    const fullyLoaded =
      id === 'all'
        ? trackSubjectIdList.every((s) => getCachedQuestions(s) !== undefined)
        : getCachedQuestions(id) !== undefined;
    // When bank is loaded, trust filtered length (including legitimate zero)
    const qCount = fullyLoaded ? sQuestions.length : questionCountFor(id);

    return {
      subjectId: id,
      subjectTitle: id === 'all' ? 'All Subjects' : (subjectMap[id]?.title ?? 'Subject'),
      totalTopics: sTopics.length,
      studiedTopics: stats.studiedCount,
      quizTouchedTopics: stats.quizTouchedCount,
      totalQuestions: qCount,
      questionsAnswered: stats.questionsAnswered,
      accuracy: stats.accuracy,
      mastery: stats.mastery,
      hasContent: sTopics.length > 0,
      sections: sSections,
      topics: sTopics,
      questions: sQuestions,
      weakestTopics: weakest,
      todayRevision: revision,
    };
  }, [data, topicsFor, questionsFor, sectionsFor, questionCountFor]);

  const allSubjectsStats = useCallback((): SubjectStats[] => {
    // Active track + exam profile subjects only (same set as topicsFor('all'))
    return trackSubjectIdList.map((id) => statsFor(id));
  }, [statsFor, trackSubjectIdList]);

  const totalTopics = useMemo(() => trackTopics.length, [trackTopics]);
  const totalQuestions = useMemo(() => {
    // Only trust live cache counts when every track subject is loaded;
    // otherwise section metadata is the stable source of truth (avoids totals shrinking).
    const allQuestionsLoaded = trackSubjectIdList.every((s) => getCachedQuestions(s) !== undefined);
    if (allQuestionsLoaded) {
      return getAllCachedQuestions().filter((q) => {
        const subjId = sectionMap[q.sectionId]?.subjectId;
        return trackSubjectIds.has(subjId);
      }).length;
    }
    return trackSections.reduce((sum, s) => sum + s.questionCount, 0);
  }, [trackSections, trackSubjectIds, trackSubjectIdList, loadedQuestionSubjects]);
  const totalFormulas = useMemo(() => {
    return trackSubjectIdList.reduce((sum, sid) => sum + getFormulasForSubject(sid).length, 0);
  }, [trackSubjectIdList]);

  const formulasFor = useCallback((id: SubjectId | 'all') => {
    if (id === 'all') {
      return trackSubjectIdList.flatMap((sid) => getFormulasForSubject(sid));
    }
    if (!trackSubjectIds.has(id)) return [];
    return getFormulasForSubject(id);
  }, [trackSubjectIdList, trackSubjectIds]);

  const revisionQueueAll = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const scope = activeTrack ? { trackId: activeTrack, examId: activeExamId } : null;
    return Object.entries(data.topicProgress)
      .filter(([topicId, p]) => {
        if (!p.nextReview) return false;
        if (parseLocalDate(p.nextReview) > today) return false;
        const topic = getTopic(topicId);
        if (!topic) return false;
        const subjId = sectionMap[topic.sectionId]?.subjectId;
        if (!subjId || !trackSubjectIds.has(subjId)) return false;
        if (scope && !contentEligibleForScope(topic, scope)) return false;
        return true;
      })
      .map(([topicId, p]) => {
        const topic = getTopic(topicId);
        const subjectId = topic ? sectionMap[topic.sectionId]?.subjectId : undefined;
        return subjectId ? {
          topicId,
          subjectId,
          accuracy: getEffectiveQuizStats(p).accuracy,
          dateStr: p.nextReview!,
        } : null;
      })
      .filter((item): item is { topicId: string; subjectId: SubjectId; accuracy: number; dateStr: string } => item !== null);
  }, [data, trackSubjectIds, activeTrack, activeExamId]);

  const searchAll = useCallback((query: string) => {
    // Always index metadata so unloaded subjects remain searchable by title;
    // overlay full cached topics when available for deeper matches.
    // Scoped to enrolled track + exam profile (subjects + content tags).
    const scope = activeTrack ? { trackId: activeTrack, examId: activeExamId } : null;
    const byId = new Map<string, (typeof topics)[number]>();
    const allow = (topic: (typeof topics)[number]) => {
      const subjId = sectionMap[topic.sectionId]?.subjectId;
      if (!subjId || !trackSubjectIds.has(subjId)) return false;
      if (scope && !contentEligibleForScope(topic, scope)) return false;
      return true;
    };
    for (const t of topics) {
      if (allow(t)) byId.set(t.id, t);
    }
    for (const t of getAllCachedTopics()) {
      if (allow(t)) byId.set(t.id, t);
    }
    const searchScope = Array.from(byId.values());
    const results = searchTopics(query, searchScope);
    return results.flatMap((r) => {
      const subjectId = sectionMap[r.sectionId]?.subjectId;
      if (!subjectId) return [];
      return [{ topic: r.topic, subjectId, match: r.match, type: r.type }];
    });
  }, [trackSubjectIds, loadedSubjects, activeTrack, activeExamId]);

  const getTopicById = useCallback((topicId: string): Topic | undefined => {
    const cached = getTopicFromCache(topicId);
    const topic = cached ?? getTopic(topicId);
    if (!topic) return undefined;
    const subjId = sectionMap[topic.sectionId]?.subjectId;
    if (!subjId || !trackSubjectIds.has(subjId)) return undefined;
    const scope = activeTrack ? { trackId: activeTrack, examId: activeExamId } : null;
    if (scope && !contentEligibleForScope(topic, scope)) return undefined;
    return topic;
  }, [trackSubjectIds, activeTrack, activeExamId]);

  const questionsByTopicId = useCallback((topicId: string): Question[] => {
    const topic = getTopicById(topicId);
    if (!topic) return [];
    const scope = activeTrack ? { trackId: activeTrack, examId: activeExamId } : null;
    const list = questionsByTopic(topicId);
    if (!scope) return list;
    return list.filter((q) => contentEligibleForScope(q, scope));
  }, [getTopicById, activeTrack, activeExamId]);

  const ensureTopicsLoaded = useCallback(async (id: SubjectId | 'all') => {
    if (id === 'all') {
      await Promise.all(trackSubjectIdList.map((sid) => loadSubjectTopics(sid)));
    } else {
      await loadSubjectTopics(id);
    }
    setLoadedSubjects((prev) => {
      const next = new Set(prev);
      if (id === 'all') {
        trackSubjectIdList.forEach((s) => next.add(s));
      } else {
        next.add(id);
      }
      return next;
    });
  }, [trackSubjectIdList, trackSubjectIds]);

  const ensureQuestionsLoaded = useCallback(async (id: SubjectId | 'all') => {
    if (id !== 'all' && !trackSubjectIds.has(id)) return;
    if (id === 'all') {
      await Promise.all(trackSubjectIdList.map((sid) => loadSubjectQuestions(sid)));
    } else {
      await loadSubjectQuestions(id);
    }
    setLoadedQuestionSubjects((prev) => {
      const next = new Set(prev);
      if (id === 'all') {
        trackSubjectIdList.forEach((s) => next.add(s));
      } else {
        next.add(id);
      }
      return next;
    });
  }, [trackSubjectIdList, trackSubjectIds]);

  const isLoaded = useCallback((id: SubjectId | 'all') => {
    if (id === 'all') {
      return trackSubjectIdList.every((s) => getCachedTopics(s) !== undefined);
    }
    return getCachedTopics(id) !== undefined;
  }, [trackSubjectIdList]);

  const isQuestionsReady = useCallback((id: SubjectId | 'all') => {
    if (id === 'all') return trackSubjectIdList.every((s) => getCachedQuestions(s) !== undefined);
    return getCachedQuestions(id) !== undefined;
  }, [trackSubjectIdList]);

  return useMemo(() => ({
    topicsFor,
    questionsFor,
    sectionsFor,
    statsFor,
    allSubjectsStats,
    totalTopics,
    totalQuestions,
    totalFormulas,
    revisionQueueAll,
    searchAll,
    formulasFor,
    getTopicById,
    questionsByTopicId,
    ensureTopicsLoaded,
    ensureQuestionsLoaded,
    loadedSubjects,
    isLoaded,
    isQuestionsReady,
    /** Active workspace subject set (track + exam profile) */
    trackSubjectIds,
    activeTrack,
    activeExamId,
  }), [
    topicsFor, questionsFor, sectionsFor, statsFor, allSubjectsStats,
    totalTopics, totalQuestions, totalFormulas,
    revisionQueueAll, searchAll, formulasFor, getTopicById,
    questionsByTopicId, ensureTopicsLoaded, ensureQuestionsLoaded,
    loadedSubjects, isLoaded, isQuestionsReady,
    trackSubjectIds, activeTrack, activeExamId,
  ]);
}
