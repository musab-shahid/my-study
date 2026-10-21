import type { Topic, TopicProgress } from '@/types';

interface Input {
  subjectTopics: Topic[];
  lastOpenedTopicId: string | null | undefined;
  studiedTopicIds: string[];
  topicProgress: Record<string, TopicProgress>;
  resolveTopic: (id: string) => Topic | undefined;
}

export function selectContinueLearningTopic(input: Input): Topic | null {
  const { subjectTopics, lastOpenedTopicId, studiedTopicIds, topicProgress, resolveTopic } = input;

  if (subjectTopics.length === 0) return null;

  if (lastOpenedTopicId) {
    const lastTopic = resolveTopic(lastOpenedTopicId);
    if (lastTopic && subjectTopics.some((t) => t.id === lastOpenedTopicId)) {
      return lastTopic;
    }
  }

  const studiedInSubject = subjectTopics
    .filter((t) => studiedTopicIds.includes(t.id) && t.content)
    .map((t) => ({ topic: t, progress: topicProgress[t.id] }))
    .filter((x) => x.progress?.lastStudied)
    .sort((a, b) => (b.progress!.lastStudied! > a.progress!.lastStudied! ? 1 : -1));
  if (studiedInSubject.length > 0) return studiedInSubject[0].topic;

  const firstUnstudied = subjectTopics.find((t) => !studiedTopicIds.includes(t.id) && t.content);
  if (firstUnstudied) return firstUnstudied;

  const firstWithContent = subjectTopics.find((t) => t.content);
  return firstWithContent ?? null;
}
