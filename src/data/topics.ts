// topics.ts — LAZY AGGREGATOR
// Synchronous access uses topic-metadata (lightweight). Full topic content
// is loaded on demand via lazy-data.ts. Components that need full content
// (StudyScreen, SearchScreen) must use the async loaders.

import type { Topic, SubjectId } from '@/types';
import { topicMetadata } from './topic-metadata';
import { sectionMap } from './sections';
import { getTopicFromCache, loadTopicById, loadSubjectTopics, activeSubjects, getCachedTopics } from './lazy-data';

// Synchronous metadata-based "topics" for screens that only need id/title/sectionId.
// These are lightweight Topic objects with content=false and no heavy fields.
export const topics: Topic[] = topicMetadata.map((m) => ({
  id: m.id,
  sectionId: m.sectionId,
  order: m.order,
  title: m.title,
  content: m.content,
  postRestriction: m.postRestriction,
  examScope: m.examScope,
}));

export const topicMap: Record<string, Topic> = Object.fromEntries(
  topics.map((t) => [t.id, t])
);

export function topicsBySection(sectionId: string): Topic[] {
  return topics
    .filter((t) => t.sectionId === sectionId)
    .sort((a, b) => a.order - b.order);
}

// Synchronous — returns metadata-only topic (no content fields).
// For full content, use getTopicAsync().
export function getTopic(id: string): Topic | undefined {
  return topicMap[id];
}

export function topicsBySubject(subjectId: SubjectId): Topic[] {
  return topics.filter((t) => sectionMap[t.sectionId]?.subjectId === subjectId);
}

// Async — loads full topic content on demand.
export async function getTopicAsync(topicId: string): Promise<Topic | undefined> {
  const cached = getTopicFromCache(topicId);
  if (cached) return cached;
  return loadTopicById(topicId);
}

export async function topicsBySectionAsync(sectionId: string): Promise<Topic[]> {
  const subjectId = sectionMap[sectionId]?.subjectId;
  if (!subjectId) return [];
  await loadSubjectTopics(subjectId);
  const cached = getCachedTopics(subjectId);
  if (cached) {
    return cached
      .filter((t) => t.sectionId === sectionId)
      .sort((a, b) => a.order - b.order);
  }
  return topicsBySection(sectionId);
}

export { activeSubjects };
