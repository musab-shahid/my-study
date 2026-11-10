import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { QUESTION_ID_ALIASES, resolveQuestionId } from '../question-id-aliases.ts';

describe('legacy question ID compatibility', () => {
  it('preserves every mapping from the original 2,522-entry migration table', () => {
    const entries = Object.entries(QUESTION_ID_ALIASES).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
    assert.equal(entries.length, 2522);
    // Fingerprint of the original explicit mapping, before range compaction.
    assert.equal(createHash('sha256').update(JSON.stringify(entries)).digest('hex'),
      '056a556a10f49342b54110120911e66955597fdeee5e08effde181c89da410a1');
  });
  it('leaves removed and unknown IDs unchanged', () => {
    for (const id of ['HATV1-Q09', 'HATV1-Q21', 'HATV1-Q22', 'unknown-question']) {
      assert.equal(resolveQuestionId(id), id);
    }
  });
});
