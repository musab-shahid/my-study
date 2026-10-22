import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateTraceabilityRow } from '../../data/cgei/traceability-validation.ts';

const lessons = new Map([
  ['lesson-a', { id: 'lesson-a', content: [{ id: 'block-a' }] }],
  ['lesson-b', { id: 'lesson-b', content: [{ id: 'block-b' }] }],
]);

const row = (overrides: Partial<{
  source_subtopic_path: string;
  app_lesson_id: string;
  app_content_block_ids: string;
  disposition: string;
  evidence_note: string;
}> = {}) => ({
  source_subtopic_path: '5.4.1.1',
  app_lesson_id: 'lesson-a',
  app_content_block_ids: 'block-a',
  disposition: 'mapped_partial',
  evidence_note: 'Partial coverage is documented.',
  ...overrides,
});

describe('source traceability row validation', () => {
  it('rejects an unknown content block', () => {
    const issues = validateTraceabilityRow(row({ app_content_block_ids: 'forged-block' }), lessons);
    assert.ok(issues.some((issue) => issue.code === 'UNKNOWN_BLOCK'));
  });

  it('rejects a valid block assigned to the wrong lesson', () => {
    const issues = validateTraceabilityRow(row({ app_content_block_ids: 'block-b' }), lessons);
    assert.ok(issues.some((issue) => issue.code === 'BLOCK_WRONG_LESSON'));
  });

  it('rejects mapped_partial rows with no content-block evidence', () => {
    const issues = validateTraceabilityRow(row({ app_content_block_ids: '' }), lessons);
    assert.ok(issues.some((issue) => issue.code === 'MAPPED_WITHOUT_BLOCKS'));
  });

  it('allows an explicitly unassigned candidate row in a source inventory', () => {
    const issues = validateTraceabilityRow(row({
      app_lesson_id: '',
      app_content_block_ids: '',
      disposition: 'candidate',
      evidence_note: 'Source item transcribed; semantic mapping pending.',
    }), lessons);
    assert.deepEqual(issues, []);
  });

  it('rejects an unassigned row that claims mapped coverage', () => {
    const issues = validateTraceabilityRow(row({
      app_lesson_id: '',
      app_content_block_ids: '',
      disposition: 'mapped',
    }), lessons);
    assert.ok(issues.some((issue) => issue.code === 'UNKNOWN_LESSON'));
    assert.ok(issues.some((issue) => issue.code === 'MAPPED_WITHOUT_BLOCKS'));
  });
});
