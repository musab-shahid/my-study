import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('study screen module boundary', () => {
  it('keeps the legacy TopicScreen export pointed at the extracted screen', async () => {
    const [legacyModule, topicModule] = await Promise.all([
      import('@/screens/StudyScreen'),
      import('@/screens/study/TopicScreen'),
    ]);

    assert.equal(legacyModule.TopicScreen, topicModule.TopicScreen);
    assert.equal(typeof legacyModule.StudyScreen, 'function');
    assert.equal(typeof legacyModule.SectionScreen, 'function');
  });
});
