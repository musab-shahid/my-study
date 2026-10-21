import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { selectContinueLearningTopic } from '../continue-learning.ts';
import type { Topic } from '../../types.ts';

function topic(id: string, order = 1): Topic {
  return {
    id,
    sectionId: 'SEC',
    order,
    title: id,
    content: true,
  } as Topic;
}

describe('selectContinueLearningTopic', () => {
  const topics = [topic('t1', 1), topic('t2', 2), topic('t3', 3)];
  const resolve = (id: string) => topics.find((t) => t.id === id);

  it('returns null for empty subject', () => {
    assert.equal(
      selectContinueLearningTopic({
        subjectTopics: [],
        lastOpenedTopicId: null,
        studiedTopicIds: [],
        topicProgress: {},
        resolveTopic: resolve,
      }),
      null,
    );
  });

  it('prefers last opened when not studied', () => {
    const picked = selectContinueLearningTopic({
      subjectTopics: topics,
      lastOpenedTopicId: 't2',
      studiedTopicIds: [],
      topicProgress: {},
      resolveTopic: resolve,
    });
    assert.equal(picked?.id, 't2');
  });

  it('skips last opened when already studied and continues in-progress', () => {
    const picked = selectContinueLearningTopic({
      subjectTopics: topics,
      lastOpenedTopicId: 't1',
      studiedTopicIds: ['t1'],
      topicProgress: {},
      resolveTopic: resolve,
    });
    assert.equal(picked?.id, 't1');
  });

  it('prefers in-progress (studied status) by most recent lastStudied', () => {
    const picked = selectContinueLearningTopic({
      subjectTopics: topics,
      lastOpenedTopicId: null,
      studiedTopicIds: ['t1', 't2'],
      topicProgress: {
        t1: { lastStudied: '2020-01-01T00:00:00.000Z' } as never,
        t2: { lastStudied: '2024-06-01T00:00:00.000Z' } as never,
      },
      resolveTopic: resolve,
    });
    assert.equal(picked?.id, 't2');
  });

  it('falls through to first not-started when nothing is in progress', () => {
    const picked = selectContinueLearningTopic({
      subjectTopics: topics,
      lastOpenedTopicId: null,
      studiedTopicIds: [],
      topicProgress: {},
      resolveTopic: resolve,
    });
    assert.equal(picked?.id, 't1');
  });
});
