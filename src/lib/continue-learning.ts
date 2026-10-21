import type { Topic, TopicProgress } from '../types.ts';
import { getTopicStatusFromProgress } from './constants.ts';

export type ContinueLearningInput = {
  subjectTopics: Topic[];
  lastOpenedTopicId: string | null | undefined;
  studiedTopicIds: string[];
  topicProgress: Record<string, TopicProgress | undefined>;
  /** Resolve a topic by id; return undefined if missing or out of subject. */
  resolveTopic: (id: string) => Topic | undefined;
};

/**
 * Pick the best "Continue Learning" topic for a subject list.
 * Priority: last opened (not yet studied) → most recently studied in-progress → first not started.
 */
export function selectContinueLearningTopic(input: ContinueLearningInput): Topic | null {
  const { subjectTopics, lastOpenedTopicId, studiedTopicIds, topicProgress, resolveTopic } = input;
  if (subjectTopics.length === 0) return null;

  if (lastOpenedTopicId) {
    const t = resolveTopic(lastOpenedTopicId);
    if (t && subjectTopics.some((st) => st.id === t.id) && !studiedTopicIds.includes(t.id)) {
      return t;
    }
  }

  const inProgress = subjectTopics
    .filter((t) => {
      const p = topicProgress[t.id];
      const studied = studiedTopicIds.includes(t.id);
      return getTopicStatusFromProgress(studied, p) === 'studied';
    })
    .sort((a, b) => {
      const aTime = topicProgress[a.id]?.lastStudied
        ? new Date(topicProgress[a.id]!.lastStudied!).getTime()
        : 0;
      const bTime = topicProgress[b.id]?.lastStudied
        ? new Date(topicProgress[b.id]!.lastStudied!).getTime()
        : 0;
      return bTime - aTime;
    });
  if (inProgress.length > 0) return inProgress[0];

  const notStarted = subjectTopics.find((t) => !studiedTopicIds.includes(t.id));
  return notStarted ?? null;
}
