import type { Topic, Question, SubjectId } from '@/types';
import { sectionMap } from './sections';

type TopicModule = { topics: Topic[] };
type QuestionModule = { questions: Question[] };

const topicLoaders: Record<string, () => Promise<TopicModule>> = {
  'meteo-climatology': () => import('./fpsc/meteorology/topics-meteorology'),
  'earth-science': () => import('./fpsc/earth-sciences/topics-earth-sciences'),
  'physics': () => import('./fpsc/physics/topics-physics'),
  'maths': () => import('./fpsc/maths/topics-maths'),
  'english': () => import('./fpsc/english/topics-english'),
  'env-studies': () => import('./fpsc/env-studies/topics-env-studies'),
  'research-analysis': () => import('./fpsc/research-analysis/topics-research-analysis'),
  'hat-verbal': () => import('./hat/verbal/topics-verbal'),
  'hat-analytical': () => import('./hat/analytical/topics-analytical'),
  'hat-quantitative': () => import('./hat/quantitative/topics-quantitative'),
  'cgei-climate-science': () => import('./cgei/climate-science/topics-climate-science'),
  'cgei-env-systems': () => import('./cgei/env-systems/topics-env-systems'),
  'cgei-geospatial': () => import('./cgei/geospatial/topics-geospatial'),
  'cgei-remote-sensing': () => import('./cgei/remote-sensing/topics-remote-sensing'),
  'cgei-data-science': () => import('./cgei/data-science/topics-data-science'),
  'cgei-ml-geoai': () => import('./cgei/ml-geoai/topics-ml-geoai'),
  'cgei-climate-risk': () => import('./cgei/climate-risk/topics-climate-risk'),
  'cgei-research-practice': () => import('./cgei/research-practice/topics-research-practice'),
};


const questionLoaders: Record<string, () => Promise<QuestionModule>> = {
  'meteo-climatology': () => import('./fpsc/meteorology/questions-meteorology'),
  'earth-science': () => import('./fpsc/earth-sciences/questions-earth-sciences'),
  'physics': () => import('./fpsc/physics/questions-physics'),
  'maths': () => import('./fpsc/maths/questions-maths'),
  'english': () => import('./fpsc/english/questions-english'),
  'env-studies': () => import('./fpsc/env-studies/questions-env-studies'),
  'research-analysis': () => import('./fpsc/research-analysis/questions-research-analysis'),
  'hat-verbal': () => import('./hat/verbal/questions-verbal'),
  'hat-analytical': () => import('./hat/analytical/questions-analytical'),
  'hat-quantitative': () => import('./hat/quantitative/questions-quantitative'),
  'cgei-climate-science': () => import('./cgei/climate-science/questions-climate-science'),
  'cgei-env-systems': () => import('./cgei/env-systems/questions-env-systems'),
  'cgei-geospatial': () => import('./cgei/geospatial/questions-geospatial'),
  'cgei-remote-sensing': () => import('./cgei/remote-sensing/questions-remote-sensing'),
  'cgei-data-science': () => import('./cgei/data-science/questions-data-science'),
  'cgei-ml-geoai': () => import('./cgei/ml-geoai/questions-ml-geoai'),
  'cgei-climate-risk': () => import('./cgei/climate-risk/questions-climate-risk'),
  'cgei-research-practice': () => import('./cgei/research-practice/questions-research-practice'),
};


/** Subjects that have lazy loaders — derived so it cannot drift from the loader map. */
const LOADER_SUBJECT_IDS = Object.keys(topicLoaders) as SubjectId[];

/** Active content subjects = intersection of catalog subjects and those with loaders. */
export const activeSubjects: SubjectId[] = LOADER_SUBJECT_IDS;

const topicCache = new Map<string, Topic[]>();
const questionCache = new Map<string, Question[]>();
const inflightTopics = new Map<string, Promise<Topic[]>>();
const inflightQuestions = new Map<string, Promise<Question[]>>();

export function subjectsForSection(sectionId: string): SubjectId | undefined {
  return sectionMap[sectionId]?.subjectId;
}

export async function loadSubjectTopics(subjectId: SubjectId): Promise<Topic[]> {
  const cached = topicCache.get(subjectId);
  if (cached) return cached;

  const existing = inflightTopics.get(subjectId);
  if (existing) return existing;

  const loader = topicLoaders[subjectId];
  if (!loader) return [];

  const promise = loader()
    .then((mod) => {
      const topics = mod.topics;
      topicCache.set(subjectId, topics);
      inflightTopics.delete(subjectId);
      return topics;
    })
    .catch((err) => {
      // Allow retry — do not permanently cache a rejected promise
      inflightTopics.delete(subjectId);
      throw err;
    });
  inflightTopics.set(subjectId, promise);
  return promise;
}

export async function loadSubjectQuestions(subjectId: SubjectId): Promise<Question[]> {
  const cached = questionCache.get(subjectId);
  if (cached) return cached;

  const existing = inflightQuestions.get(subjectId);
  if (existing) return existing;

  const loader = questionLoaders[subjectId];
  if (!loader) return [];

  const promise = loader()
    .then((mod) => {
      const questions = mod.questions;
      questionCache.set(subjectId, questions);
      inflightQuestions.delete(subjectId);
      return questions;
    })
    .catch((err) => {
      // Allow retry — do not permanently cache a rejected promise
      inflightQuestions.delete(subjectId);
      throw err;
    });
  inflightQuestions.set(subjectId, promise);
  return promise;
}

export function getCachedTopics(subjectId: SubjectId): Topic[] | undefined {
  return topicCache.get(subjectId);
}

export function getCachedQuestions(subjectId: SubjectId): Question[] | undefined {
  return questionCache.get(subjectId);
}

export function isSubjectLoaded(subjectId: SubjectId): boolean {
  return topicCache.has(subjectId);
}

export function isQuestionsLoaded(subjectId: SubjectId): boolean {
  return questionCache.has(subjectId);
}

/** True if a subject is currently loading (in-flight). */
export function isSubjectLoadInFlight(subjectId: SubjectId): boolean {
  return inflightTopics.has(subjectId) || inflightQuestions.has(subjectId);
}

export function getAllCachedTopics(): Topic[] {
  const result: Topic[] = [];
  for (const id of activeSubjects) {
    const cached = topicCache.get(id);
    if (cached) result.push(...cached);
  }
  return result;
}

export function getAllCachedQuestions(): Question[] {
  const result: Question[] = [];
  for (const id of activeSubjects) {
    const cached = questionCache.get(id);
    if (cached) result.push(...cached);
  }
  return result;
}

export async function loadAllTopics(): Promise<Topic[]> {
  await Promise.all(activeSubjects.map((id) => loadSubjectTopics(id)));
  return getAllCachedTopics();
}

export async function loadAllQuestions(): Promise<Question[]> {
  await Promise.all(activeSubjects.map((id) => loadSubjectQuestions(id)));
  return getAllCachedQuestions();
}

export async function ensureTopicsLoaded(subjectId: SubjectId | 'all'): Promise<Topic[]> {
  if (subjectId === 'all') return loadAllTopics();
  return loadSubjectTopics(subjectId);
}

export async function ensureQuestionsLoaded(subjectId: SubjectId | 'all'): Promise<Question[]> {
  if (subjectId === 'all') return loadAllQuestions();
  return loadSubjectQuestions(subjectId);
}

export function getTopicFromCache(topicId: string): Topic | undefined {
  for (const id of activeSubjects) {
    const cached = topicCache.get(id);
    if (cached) {
      const topic = cached.find((t) => t.id === topicId);
      if (topic) return topic;
    }
  }
  return undefined;
}

export function getQuestionsForTopicFromCache(topicId: string): Question[] {
  for (const id of activeSubjects) {
    const cached = questionCache.get(id);
    if (cached) {
      const qs = cached.filter((q) => q.topicId === topicId);
      if (qs.length > 0) return qs;
    }
  }
  return [];
}

export async function loadTopicById(topicId: string): Promise<Topic | undefined> {
  const cached = getTopicFromCache(topicId);
  if (cached) return cached;

  for (const subjectId of activeSubjects) {
    if (topicCache.has(subjectId)) continue;
    const topics = await loadSubjectTopics(subjectId);
    const topic = topics.find((t) => t.id === topicId);
    if (topic) return topic;
  }
  return undefined;
}

export async function loadQuestionsForTopic(topicId: string): Promise<Question[]> {
  const cached = getQuestionsForTopicFromCache(topicId);
  if (cached.length > 0) return cached;

  for (const subjectId of activeSubjects) {
    if (questionCache.has(subjectId)) continue;
    const questions = await loadSubjectQuestions(subjectId);
    const qs = questions.filter((q) => q.topicId === topicId);
    if (qs.length > 0) return qs;
  }
  return [];
}
