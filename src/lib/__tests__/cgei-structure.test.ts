import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { subjectsByTrack } from '../../data/subjects.ts';
import { sectionsBySubject } from '../../data/sections.ts';
import { topicMetadata } from '../../data/topic-metadata.ts';
import { loadSubjectTopics, loadSubjectQuestions } from '../../data/lazy-data.ts';
import type { SubjectId } from '../../types.ts';
import { cgeiCurriculum } from '../../data/cgei/curriculum.ts';

describe('CGEI curriculum structure', () => {
  const cgeiSubjects = subjectsByTrack('cgei');

  it('registers all 14 domains from the Master Study TOC', () => {
    assert.equal(cgeiSubjects.length, 14);
    assert.deepEqual(
      cgeiSubjects.slice(0, 8).map((subject) => subject.id),
      [
        'cgei-env-systems',
        'cgei-climate-science',
        'cgei-geospatial',
        'cgei-remote-sensing',
        'cgei-data-science',
        'cgei-ml-geoai',
        'cgei-climate-risk',
        'cgei-research-practice',
      ],
    );
    assert.deepEqual(
      cgeiSubjects.slice(8).map((subject) => subject.id),
      [
        'cgei-decision-support',
        'cgei-climate-policy',
        'cgei-software-engineering',
        'cgei-advanced-ai',
        'cgei-capstone',
        'cgei-advanced-branches',
      ],
    );
  });

  it('keeps course orientation out of Topic progress and registers canonical lesson units', () => {
    assert.equal(topicMetadata.some((topic) => topic.id === 'cgei-data-science-roadmap'), false);
    for (const code of ['5.1', '5.2', '5.3']) {
      const unit = cgeiCurriculum.units.find((item) => item.code === code);
      assert.ok(unit, `Unit ${code} should be registered`);
      assert.equal(unit.lessonIds.length,  code === '5.1' ? 8 : 5);
      assert.ok(unit.lessonIds.every((id) => cgeiCurriculum.lessons.some((lesson) => lesson.id === id)));
    }
    assert.equal(cgeiCurriculum.lessons.length, 23);
    assert.equal(cgeiCurriculum.questions.length, 26);
    assert.ok(cgeiCurriculum.lessons.filter((lesson) => !lesson.sourceTopicId).every((lesson) => lesson.content.length > 0));
  });

  it('loads a topic module and question bank for every registered domain', async () => {
    for (const subject of cgeiSubjects) {
      const id = subject.id as SubjectId;
      const loadedTopics = await loadSubjectTopics(id);
      const loadedQuestions = await loadSubjectQuestions(id);
      const metadata = topicMetadata.filter((topic) =>
        sectionsBySubject(id).some((section) => section.id === topic.sectionId),
      );

      assert.ok(loadedTopics.length > 0, `${id} should have a roadmap/topic entry`);
      assert.equal(
        loadedTopics.length,
        metadata.length,
        `${id} lazy topic module and lightweight topic metadata should stay aligned`,
      );
      assert.ok(Array.isArray(loadedQuestions), `${id} should load a question bank, even when it is empty`);

      for (const topic of loadedTopics) {
        const meta = topicMetadata.find((item) => item.id === topic.id);
        assert.ok(meta, `${id}: topic ${topic.id} must exist in topic metadata`);
        assert.equal(meta.sectionId, topic.sectionId, `${topic.id} section metadata must match`);
      }

      for (const section of sectionsBySubject(id)) {
        assert.equal(
          section.topicCount,
          loadedTopics.filter((topic) => topic.sectionId === section.id).length,
          `${section.id} topicCount must match its topic module`,
        );
        assert.equal(
          section.questionCount,
          loadedQuestions.filter((question) => question.sectionId === section.id).length,
          `${section.id} questionCount must match its question bank`,
        );
      }
    }
  });
});
