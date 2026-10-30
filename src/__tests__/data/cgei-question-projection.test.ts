import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { cgeiCurriculum } from '../../data/cgei/curriculum';
import { cgeiQuestionProjectionOrder } from '../../data/cgei/question-projection-order';
import { questions as envSystemsQuestions } from '../../data/cgei/env-systems/questions-env-systems';
import { questions as climateQuestions } from '../../data/cgei/climate-science/questions-climate-science';
import { questions as geospatialQuestions } from '../../data/cgei/geospatial/questions-geospatial';
import { questions as remoteSensingQuestions } from '../../data/cgei/remote-sensing/questions-remote-sensing';
import { questions as dataScienceQuestions } from '../../data/cgei/data-science/questions-data-science';
import { questions as mlGeoaiQuestions } from '../../data/cgei/ml-geoai/questions-ml-geoai';
import { questions as climateRiskQuestions } from '../../data/cgei/climate-risk/questions-climate-risk';
import { questions as researchPracticeQuestions } from '../../data/cgei/research-practice/questions-research-practice';
import { questions as decisionSupportQuestions } from '../../data/cgei/decision-support/questions-decision-support';
import { questions as climatePolicyQuestions } from '../../data/cgei/climate-policy/questions-climate-policy';
import { questions as softwareEngineeringQuestions } from '../../data/cgei/software-engineering/questions-software-engineering';
import { questions as advancedAiQuestions } from '../../data/cgei/advanced-ai/questions-advanced-ai';
import { questions as capstoneQuestions } from '../../data/cgei/capstone/questions-capstone';

const bankQuestions = [
  ...envSystemsQuestions,
  ...climateQuestions,
  ...geospatialQuestions,
  ...remoteSensingQuestions,
  ...dataScienceQuestions,
  ...mlGeoaiQuestions,
  ...climateRiskQuestions,
  ...researchPracticeQuestions,
  ...decisionSupportQuestions,
  ...climatePolicyQuestions,
  ...softwareEngineeringQuestions,
  ...advancedAiQuestions,
  ...capstoneQuestions,
];

describe('CGEI question-bank projection', () => {
  it('preserves the former flat projection IDs and their exact order', () => {
    assert.equal(cgeiQuestionProjectionOrder.length, 568);
    assert.deepEqual(
      cgeiCurriculum.questions.map((question) => question.id),
      cgeiQuestionProjectionOrder,
    );
  });

  it('projects every lesson-linked single-choice bank question without changing its content', () => {
    const eligible = bankQuestions.filter(
      (question) => question.lessonId && question.type === 'single' && typeof question.correctAnswer === 'number',
    );
    assert.equal(eligible.length, 568);
    assert.equal(cgeiCurriculum.questions.length, eligible.length);

    const byId = new Map(bankQuestions.map((question) => [question.id, question]));
    for (const projected of cgeiCurriculum.questions) {
      const source = byId.get(projected.id);
      assert.ok(source, 'missing bank source for ' + projected.id);
      assert.equal(projected.lessonId, source.lessonId);
      assert.equal(projected.prompt, source.question);
      assert.deepEqual(projected.options, source.options);
      assert.equal(projected.correctAnswer, source.correctAnswer);
      assert.equal(projected.explanation, source.explanation);
      assert.equal(projected.difficulty, source.difficulty);
      assert.equal(projected.cognitiveLevel, source.cognitiveLevel);
    }
  });

  it('keeps the 37 unapproved Climate legacy questions engine-only', () => {
    const unlinked = climateQuestions.filter((question) => !question.lessonId);
    assert.equal(unlinked.length, 37);
    const projectedIds = new Set(cgeiCurriculum.questions.map((question) => question.id));
    for (const question of unlinked) assert.equal(projectedIds.has(question.id), false);
  });
});
