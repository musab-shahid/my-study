import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  inferMaterialKind,
  shouldInterleave,
  interleaveByMaterial,
} from '../material-interleave.ts';

describe('material interleave', () => {
  it('classifies quant vs fact', () => {
    assert.equal(inferMaterialKind({ id: 'q1', subjectId: 'hat-quantitative' }), 'quantitative');
    assert.equal(inferMaterialKind({ id: 'c1', topicId: 'vocab-list' }), 'fact_vocab');
    assert.equal(inferMaterialKind({ id: 'g1', subjectId: 'cgei-geospatial' }), 'spatial_geo');
  });

  it('does not interleave fact_vocab with quantitative by default', () => {
    assert.equal(
      shouldInterleave(
        { id: '1', subjectId: 'hat-quantitative' },
        { id: '2', topicId: 'vocab-basics' },
      ),
      false,
    );
    assert.equal(
      shouldInterleave(
        { id: '1', subjectId: 'hat-quantitative' },
        { id: '2', subjectId: 'hat-analytical' },
      ),
      true,
    );
  });

  it('breaks long runs of the same kind when alternatives exist', () => {
    const items = [
      { id: 'q1', subjectId: 'quant-1' },
      { id: 'q2', subjectId: 'quant-2' },
      { id: 'q3', subjectId: 'quant-3' },
      { id: 'a1', subjectId: 'analytical-1' },
      { id: 'a2', subjectId: 'analytical-2' },
    ];
    const out = interleaveByMaterial(items, 2);
    assert.equal(out.length, 5);
    // Not three quant in a row at the start when analytical available
    const kinds = out.map((x) => inferMaterialKind(x));
    let maxRun = 1;
    let run = 1;
    for (let i = 1; i < kinds.length; i++) {
      if (kinds[i] === kinds[i - 1]) run += 1;
      else run = 1;
      maxRun = Math.max(maxRun, run);
    }
    assert.ok(maxRun <= 2, `expected max run ≤2, got ${maxRun} in ${kinds.join(',')}`);
  });
});
