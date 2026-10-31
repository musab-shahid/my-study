import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parseCsv, summarizeQuestionCoverage } from '../../../scripts/lib/cgei-unit-report-core.ts';

describe('CGEI unit report helpers', () => {
  it('parses quoted commas, escaped quotes, and multiline CSV cells', () => {
    const rows = parseCsv('id,title,note\n1,"Heat, humidity","said ""check""\ncarefully"\n');
    assert.equal(rows.length, 1);
    assert.equal(rows[0]?.title, 'Heat, humidity');
    assert.equal(rows[0]?.note, 'said "check"\ncarefully');
  });

  it('reports the lesson question minimum and cognitive-level coverage', () => {
    const pass = summarizeQuestionCoverage([
      { cognitiveLevel: 'understand', difficulty: 'easy', type: 'single', sourceCitation: 'source A' },
      { cognitiveLevel: 'apply', difficulty: 'medium', type: 'single', sourceCitation: 'source B' },
      { cognitiveLevel: 'analyze', difficulty: 'hard', type: 'true_false', sourceCitation: 'source C' },
    ]);
    assert.equal(pass.meetsReviewMinimum, true);
    assert.equal(pass.applyOrHigher, 2);
    assert.equal(pass.missingCitations, 0);

    const fail = summarizeQuestionCoverage([
      { cognitiveLevel: 'remember' },
      { cognitiveLevel: 'remember' },
    ]);
    assert.equal(fail.meetsReviewMinimum, false);
    assert.equal(fail.missingCitations, 2);
  });
});
