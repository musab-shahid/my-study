import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildTutorPerformanceContext } from '../ai-tutor-performance.ts';

describe('AI tutor performance context privacy', () => {
  it('uses coarse bands and omits exact performance and internal metrics', () => {
    const lines = buildTutorPerformanceContext(
      { accuracy: 70, total: 10 },
      [
        { title: 'Current topic', accuracy: 70, total: 10 },
        { title: 'Weak topic', accuracy: 40, total: 5 },
        { title: 'Insufficient evidence', accuracy: 50, total: 2 },
      ],
    );
    const context = lines.join('\n');

    assert.deepEqual(lines, [
      'Performance band: developing',
      'Weak topics overall: Weak topic (needs practice), Current topic (developing)',
    ]);
    assert.doesNotMatch(context, /70%|7\/10|40%|2\/5|1245\.67|\\bElo\\b|review stage|next review/i);
    assert.doesNotMatch(context, /Insufficient evidence/);
  });

  it('does not assign a performance band before the minimum evidence threshold', () => {
    assert.deepEqual(
      buildTutorPerformanceContext({ accuracy: 50, total: 2 }, []),
      ['Early practice; not enough evidence for a performance band.'],
    );
  });

  it('reports no attempts without exposing a zero score', () => {
    assert.deepEqual(
      buildTutorPerformanceContext({ accuracy: 0, total: 0 }, []),
      ['No quiz attempts on this topic yet.'],
    );
  });
});
