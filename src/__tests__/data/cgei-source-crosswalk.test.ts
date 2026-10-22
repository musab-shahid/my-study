import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { cgeiCurriculum } from '../../data/cgei/curriculum.ts';
import {
  getCrosswalkCoverage,
  subject5SourceCrosswalk,
  validateSourceCrosswalk,
} from '../../data/cgei/source-crosswalk.ts';

describe('CGEI Subject 5 source crosswalk', () => {
  it('has unique source IDs and only resolvable canonical unit references', () => {
    const issues = validateSourceCrosswalk(subject5SourceCrosswalk, cgeiCurriculum);
    assert.deepEqual(issues, []);
  });

  it('keeps the subject overview out of lesson/progress coverage', () => {
    const overview = subject5SourceCrosswalk.find((row) => row.sourceId === '5.orientation');
    assert.ok(overview);
    assert.equal(overview.disposition, 'not-a-lesson');
    assert.equal(overview.appLessonId, undefined);
  });

  it('does not count partial or unresolved source rows as covered', () => {
    const counts = getCrosswalkCoverage(subject5SourceCrosswalk);
    assert.equal(counts.covered, 1);
    assert.equal(counts.partial, 4);
    assert.equal(counts.notLessons, 1);
    assert.ok(counts.unresolved >= 8);
  });

  it('keeps later units explicitly unresolved until source-level mapping is reviewed', () => {
    for (const sourceId of ['5.6', '5.7', '5.8', '5.9', '5.10', '5.11', '5.12']) {
      const row = subject5SourceCrosswalk.find((entry) => entry.sourceId === sourceId);
      assert.ok(row, `missing explicit disposition for ${sourceId}`);
      assert.ok(['source-only', 'deferred-by-priority'].includes(row.disposition));
    }
  });
});
