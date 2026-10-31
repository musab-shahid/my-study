import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cgeiCurriculum } from '../../data/cgei/curriculum.ts';
import { loadSubjectQuestions, loadSubjectTopics } from '../../data/lazy-data.ts';

const cgeiDataRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../data/cgei');

describe('CGEI two-file subject data architecture', () => {
  it('keeps each registered subject in exactly one topics file and one questions file', () => {
    for (const subject of cgeiCurriculum.subjects) {
      const folder = subject.subjectId.replace(/^cgei-/, '');
      const files = readdirSync(resolve(cgeiDataRoot, folder))
        .filter((name) => name.endsWith('.ts'))
        .sort();

      assert.deepEqual(
        files,
        [`questions-${folder}.ts`, `topics-${folder}.ts`].sort(),
        `${subject.subjectId} must contain only its questions and curriculum topics files`,
      );
    }
  });

  it('loads quiz topic metadata from every registered subject question file', async () => {
    const [climateTopics, climateQuestions, dataScienceTopics, dataScienceQuestions] = await Promise.all([
      loadSubjectTopics('cgei-climate-science'),
      loadSubjectQuestions('cgei-climate-science'),
      loadSubjectTopics('cgei-data-science'),
      loadSubjectQuestions('cgei-data-science'),
    ]);

    assert.ok(climateTopics.some((topic) => topic.id === 'cgei-climate-data-products'));
    assert.ok(dataScienceTopics.some((topic) => topic.id === 'cgei-ds-units-dimensions'));
    assert.ok(climateQuestions.length > 0);
    assert.ok(dataScienceQuestions.length > 0);

    const allSubjectTopics = await Promise.all(
      cgeiCurriculum.subjects.map((subject) => loadSubjectTopics(subject.subjectId)),
    );
    for (const [index, topics] of allSubjectTopics.entries()) {
      assert.ok(
        topics.length > 0,
        `${cgeiCurriculum.subjects[index].subjectId} must load quiz metadata from its question file`,
      );
    }
  });
});
