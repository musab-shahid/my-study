import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { questions as climateQuestions } from '../../data/cgei/climate-science/questions-climate-science.ts';
import { cgeiCurriculum } from '../../data/cgei/curriculum.ts';

const expected = [
  ["CGEI-02-Q002", "2-6-2", "cgei-cl-o-26-trend", "analyze"],
  ["CGEI-02-Q004", "2-6-1", "cgei-cl-o-26-threshold", "analyze"],
  ["CGEI-02-Q005", "2-5-1", "cgei-cl-o-25-time", "apply"],
  ["CGEI-02-Q006", "2-6-1", "cgei-cl-o-26-threshold", "understand"],
  ["CGEI-02-Q007", "2-4-3", "cgei-cl-o-24-select", "analyze"],
  ["CGEI-02-Q008", "2-8-2", "cgei-cl-o-28-multan", "evaluate"],
  ["CGEI-02-Q009", "2-5-1", "cgei-cl-o-25-time", "analyze"],
  ["CGEI-02-Q010", "2-6-1", "cgei-cl-o-26-threshold", "remember"],
  ["CGEI-02-Q011", "2-6-2", "cgei-cl-o-26-trend", "understand"],
  ["CGEI-02-Q012", "2-5-1", "cgei-cl-o-25-time", "remember"],
  ["CGEI-02-Q013", "2-6-1", "cgei-cl-o-26-threshold", "apply"],
  ["CGEI-02-Q014", "2-5-1", "cgei-cl-o-25-time", "apply"],
  ["CGEI-02-Q015", "2-6-2", "cgei-cl-o-26-trend", "apply"],
  ["CGEI-024-Q001", "2-4-2", "cgei-cl-o-24-products", "understand"],
  ["CGEI-024-Q002", "2-4-2", "cgei-cl-o-24-products", "understand"],
  ["CGEI-024-Q003", "2-4-3", "cgei-cl-o-24-select", "remember"],
  ["CGEI-024-Q004", "2-4-3", "cgei-cl-o-24-select", "analyze"],
  ["CGEI-024-Q005", "2-9-2", "cgei-cl-o-29-scenarios", "understand"],
  ["CGEI-024-Q006", "2-5-1", "cgei-cl-o-25-time", "apply"],
  ["CGEI-024-Q007", "2-4-3", "cgei-cl-o-24-select", "evaluate"],
  ["CGEI-024-Q008", "2-4-3", "cgei-cl-o-24-select", "analyze"],
  ["CGEI-024-Q009", "2-4-2", "cgei-cl-o-24-products", "apply"],
  ["CGEI-024-Q010", "2-5-1", "cgei-cl-o-25-time", "apply"],
  ["CGEI-024-Q011", "2-4-3", "cgei-cl-o-24-select", "evaluate"],
  ["CGEI-024-Q012", "2-6-3", "cgei-cl-o-26-inference", "evaluate"],
  ["CGEI-025-Q001", "2-5-1", "cgei-cl-o-25-time", "apply"],
  ["CGEI-025-Q002", "2-5-1", "cgei-cl-o-25-time", "remember"],
  ["CGEI-025-Q003", "2-5-1", "cgei-cl-o-25-time", "understand"],
  ["CGEI-025-Q004", "2-5-1", "cgei-cl-o-25-time", "apply"],
  ["CGEI-025-Q005", "2-6-1", "cgei-cl-o-26-threshold", "understand"],
  ["CGEI-025-Q006", "2-5-1", "cgei-cl-o-25-time", "apply"],
  ["CGEI-025-Q007", "2-5-1", "cgei-cl-o-25-time", "analyze"],
  ["CGEI-025-Q008", "2-8-1", "cgei-cl-o-28-seasons", "understand"],
  ["CGEI-025-Q009", "2-5-2", "cgei-cl-o-25-aggregate", "analyze"],
  ["CGEI-025-Q010", "2-5-1", "cgei-cl-o-25-time", "apply"]
] as const;

describe('legacy Climate question lesson mapping', () => {
  it('maps all 35 lesson-supported legacy IDs to the reviewed canonical lesson and objective', () => {
    const byId = new Map(climateQuestions.map((question) => [question.id, question]));
    assert.equal(expected.length, 35);
    for (const [id, lessonSuffix, objectiveId, cognitiveLevel] of expected) {
      const question = byId.get(id);
      assert.ok(question, `missing retained question ${id}`);
      const lessonId = `cgei-cl-lesson-${lessonSuffix}`;
      assert.equal(question.lessonId, lessonId, `${id} lesson mapping drifted`);
      assert.deepEqual(question.objectiveIds, [objectiveId], `${id} objective mapping drifted`);
      assert.equal(question.cognitiveLevel, cognitiveLevel, `${id} cognitive level drifted`);
      const lesson = cgeiCurriculum.lessons.find((item) => item.id === lessonId);
      assert.ok(lesson, `${id} points to a missing lesson`);
      assert.ok(lesson.objectives.some((objective) => objective.id === objectiveId), `${id} points to an objective not owned by its lesson`);
    }
  });

  it('preserves all 37 legacy IDs and links only the 35 supported by current lesson content', () => {
    const legacy = climateQuestions
      .map((question) => question.id)
      .filter((id) => /^(CGEI-02-Q|CGEI-024-Q|CGEI-025-Q)/.test(id))
      .sort();
    const engineOnly = [['CGEI-02-Q001', 'understand'], ['CGEI-02-Q003', 'analyze']] as const;
    const engineOnlyIds = engineOnly.map(([id]) => id);
    assert.equal(legacy.length, 37);
    assert.deepEqual(legacy, [...expected.map(([id]) => id), ...engineOnlyIds].sort());
    const byId = new Map(climateQuestions.map((question) => [question.id, question]));
    for (const [id, cognitiveLevel] of engineOnly) {
      const question = byId.get(id);
      assert.ok(question, `missing retained engine-only question ${id}`);
      assert.equal(question.lessonId, undefined, `${id} must not be forced into an unrelated lesson`);
      assert.equal(question.objectiveIds, undefined, `${id} must not claim an unsupported objective`);
      assert.equal(question.cognitiveLevel, cognitiveLevel, `${id} cognitive level drifted`);
    }
    assert.equal(new Set(expected.map(([, lesson]) => lesson)).size, 10);
  });
});
