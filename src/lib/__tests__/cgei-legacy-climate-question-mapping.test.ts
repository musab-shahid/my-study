import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { questions as climateQuestions } from '../../data/cgei/climate-science/questions-climate-science.ts';
import { cgeiCurriculum } from '../../data/cgei/curriculum.ts';

const expected = [["CGEI-02-Q001","2-6-1","cgei-cl-o-26-threshold"],["CGEI-02-Q002","2-6-2","cgei-cl-o-26-trend"],["CGEI-02-Q003","2-6-2","cgei-cl-o-26-trend"],["CGEI-02-Q004","2-6-1","cgei-cl-o-26-threshold"],["CGEI-02-Q005","2-5-1","cgei-cl-o-25-time"],["CGEI-02-Q006","2-6-1","cgei-cl-o-26-threshold"],["CGEI-02-Q007","2-4-3","cgei-cl-o-24-select"],["CGEI-02-Q008","2-8-2","cgei-cl-o-28-multan"],["CGEI-02-Q009","2-5-1","cgei-cl-o-25-time"],["CGEI-02-Q010","2-6-1","cgei-cl-o-26-threshold"],["CGEI-02-Q011","2-6-2","cgei-cl-o-26-trend"],["CGEI-02-Q012","2-5-1","cgei-cl-o-25-time"],["CGEI-02-Q013","2-6-1","cgei-cl-o-26-threshold"],["CGEI-02-Q014","2-5-1","cgei-cl-o-25-time"],["CGEI-02-Q015","2-6-2","cgei-cl-o-26-trend"],["CGEI-024-Q001","2-4-3","cgei-cl-o-24-select"],["CGEI-024-Q002","2-4-2","cgei-cl-o-24-products"],["CGEI-024-Q003","2-4-3","cgei-cl-o-24-select"],["CGEI-024-Q004","2-4-3","cgei-cl-o-24-select"],["CGEI-024-Q005","2-9-2","cgei-cl-o-29-scenarios"],["CGEI-024-Q006","2-5-1","cgei-cl-o-25-time"],["CGEI-024-Q007","2-4-3","cgei-cl-o-24-select"],["CGEI-024-Q008","2-4-3","cgei-cl-o-24-select"],["CGEI-024-Q009","2-4-3","cgei-cl-o-24-select"],["CGEI-024-Q010","2-5-1","cgei-cl-o-25-time"],["CGEI-024-Q011","2-4-3","cgei-cl-o-24-select"],["CGEI-024-Q012","2-6-3","cgei-cl-o-26-inference"],["CGEI-025-Q001","2-5-1","cgei-cl-o-25-time"],["CGEI-025-Q002","2-5-1","cgei-cl-o-25-time"],["CGEI-025-Q003","2-5-1","cgei-cl-o-25-time"],["CGEI-025-Q004","2-5-1","cgei-cl-o-25-time"],["CGEI-025-Q005","2-6-1","cgei-cl-o-26-threshold"],["CGEI-025-Q006","2-5-1","cgei-cl-o-25-time"],["CGEI-025-Q007","2-5-1","cgei-cl-o-25-time"],["CGEI-025-Q008","2-8-1","cgei-cl-o-28-seasons"],["CGEI-025-Q009","2-5-2","cgei-cl-o-25-aggregate"],["CGEI-025-Q010","2-5-1","cgei-cl-o-25-time"]] as const;

describe('legacy Climate question lesson mapping', () => {
  it('maps all 37 retained IDs to the reviewed canonical lesson and objective', () => {
    const byId = new Map(climateQuestions.map((question) => [question.id, question]));
    assert.equal(expected.length, 37);
    for (const [id, lessonSuffix, objectiveId] of expected) {
      const question = byId.get(id);
      assert.ok(question, `missing retained question ${id}`);
      const lessonId = `cgei-cl-lesson-${lessonSuffix}`;
      assert.equal(question.lessonId, lessonId, `${id} lesson mapping drifted`);
      assert.deepEqual(question.objectiveIds, [objectiveId], `${id} objective mapping drifted`);
      assert.ok(question.cognitiveLevel, `${id} is missing cognitiveLevel`);
      const lesson = cgeiCurriculum.lessons.find((item) => item.id === lessonId);
      assert.ok(lesson, `${id} points to a missing lesson`);
      assert.ok(lesson.objectives.some((objective) => objective.id === objectiveId), `${id} points to an objective not owned by its lesson`);
    }
  });

  it('preserves the original 37 legacy IDs and spreads them across ten existing lessons', () => {
    const legacy = climateQuestions
      .map((question) => question.id)
      .filter((id) => /^(CGEI-02-Q|CGEI-024-Q|CGEI-025-Q)/.test(id))
      .sort();
    assert.deepEqual(legacy, expected.map(([id]) => id).sort());
    assert.equal(new Set(expected.map(([, lesson]) => lesson)).size, 10);
  });
});
