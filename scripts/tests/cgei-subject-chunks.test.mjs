import test from 'node:test';
import assert from 'node:assert/strict';
import { getCgeiSubjectChunkName } from '../lib/cgei-subject-chunks.mjs';

test('keeps each CGEI subject topics and questions in one subject-specific chunk', () => {
  const topics = getCgeiSubjectChunkName('/repo/src/data/cgei/climate-science/topics-climate-science.ts');
  const questions = getCgeiSubjectChunkName('/repo/src/data/cgei/climate-science/questions-climate-science.ts');
  assert.equal(topics, 'cgei-climate-science');
  assert.equal(questions, topics);
});

test('does not absorb the curriculum assembler, registry wiring, or non-CGEI data', () => {
  assert.equal(getCgeiSubjectChunkName('/repo/src/data/cgei/curriculum.ts'), null);
  assert.equal(getCgeiSubjectChunkName('/repo/src/data/cgei/registry-shared.ts'), null);
  assert.equal(getCgeiSubjectChunkName('/repo/src/data/fpsc/questions.ts'), null);
});
