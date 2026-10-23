import type { SubjectId } from '@/types';

/**
 * Legacy roadmap cards retained for stable deep links during the curriculum
 * migration. They are orientation records, not lessons and not mastery items.
 */
export const CGEI_OVERVIEW_TOPIC_BY_SUBJECT: Partial<Record<SubjectId, string>> = {
  'cgei-env-systems': 'cgei-env-systems-roadmap',
  'cgei-geospatial': 'cgei-geospatial-roadmap',
  'cgei-remote-sensing': 'cgei-remote-sensing-roadmap',
  'cgei-ml-geoai': 'cgei-ml-geoai-roadmap',
  'cgei-climate-risk': 'cgei-climate-risk-roadmap',
  'cgei-research-practice': 'cgei-research-practice-roadmap',
  'cgei-decision-support': 'cgei-decision-support-roadmap',
  'cgei-climate-policy': 'cgei-climate-policy-roadmap',
  'cgei-software-engineering': 'cgei-software-engineering-roadmap',
  'cgei-advanced-ai': 'cgei-advanced-ai-roadmap',
  'cgei-capstone': 'cgei-capstone-roadmap',
  'cgei-advanced-branches': 'cgei-advanced-branches-roadmap',
};

const CGEI_OVERVIEW_TOPIC_IDS = new Set(Object.values(CGEI_OVERVIEW_TOPIC_BY_SUBJECT));

export function isCgeiOverviewTopic(topicId: string): boolean {
  return CGEI_OVERVIEW_TOPIC_IDS.has(topicId);
}

export function cgeiOverviewTopicIdForSubject(subjectId: SubjectId): string | undefined {
  return CGEI_OVERVIEW_TOPIC_BY_SUBJECT[subjectId];
}

export function cgeiSubjectIdForOverviewTopic(topicId: string): SubjectId | undefined {
  return (Object.entries(CGEI_OVERVIEW_TOPIC_BY_SUBJECT).find(([, id]) => id === topicId)?.[0] as SubjectId | undefined);
}
