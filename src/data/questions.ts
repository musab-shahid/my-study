// questions.ts — LAZY AGGREGATOR
// Questions are loaded on demand per subject via lazy-data.ts.
// Synchronous access returns empty if not yet loaded; use async functions
// for guaranteed data.

import type { Question, SubjectId } from '@/types';
import { sectionMap } from './sections';
import {
  getCachedQuestions,
  loadSubjectQuestions,
  loadAllQuestions,
  getQuestionsForTopicFromCache,
  loadQuestionsForTopic,
  activeSubjects,
} from './lazy-data';

// Returns all currently-cached questions. May be empty if nothing loaded yet.
export function allQuestions(): Question[] {
  const result: Question[] = [];
  for (const id of activeSubjects) {
    const cached = getCachedQuestions(id);
    if (cached) result.push(...cached);
  }
  return result;
}

export async function allQuestionsAsync(): Promise<Question[]> {
  return loadAllQuestions();
}

export function questionsByTopic(topicId: string): Question[] {
  return getQuestionsForTopicFromCache(topicId);
}

export async function questionsByTopicAsync(topicId: string): Promise<Question[]> {
  return loadQuestionsForTopic(topicId);
}

export function questionsBySection(sectionId: string): Question[] {
  const subjectId = sectionMap[sectionId]?.subjectId;
  if (!subjectId) return [];
  const cached = getCachedQuestions(subjectId);
  if (!cached) return [];
  return cached.filter((q) => q.sectionId === sectionId);
}

export async function questionsBySectionAsync(sectionId: string): Promise<Question[]> {
  const subjectId = sectionMap[sectionId]?.subjectId;
  if (!subjectId) return [];
  await loadSubjectQuestions(subjectId);
  const cached = getCachedQuestions(subjectId);
  if (!cached) return [];
  return cached.filter((q) => q.sectionId === sectionId);
}

export async function questionsBySubjectAsync(subjectId: SubjectId): Promise<Question[]> {
  await loadSubjectQuestions(subjectId);
  return getCachedQuestions(subjectId) ?? [];
}
