import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { subjectsByTrack } from '../../data/subjects.ts';
import { sectionsBySubject } from '../../data/sections.ts';
import { topicMetadata } from '../../data/topic-metadata.ts';
import { loadSubjectTopics, loadSubjectQuestions } from '../../data/lazy-data.ts';
import type { SubjectId } from '../../types.ts';
import { cgeiCurriculum } from '../../data/cgei/curriculum.ts';
import { questions as legacyUnit51Questions } from '../../data/cgei/data-science/questions-data-science.ts';

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
    assert.equal(cgeiCurriculum.lessons.length, 58);
    assert.equal(cgeiCurriculum.questions.length, 136);
    assert.deepEqual(cgeiCurriculum.units.map((unit) => unit.order).sort((a, b) => a - b), Array.from({ length: 12 }, (_, index) => index + 1));
    assert.equal(cgeiCurriculum.questions.filter((question) => question.id.startsWith('CGEI-05-Q')).length, 35);
    assert.ok(cgeiCurriculum.lessons.filter((lesson) => !lesson.sourceTopicId).every((lesson) => lesson.content.length > 0));
    const unit51 = cgeiCurriculum.units.find((unit) => unit.code === '5.1');
    const unit55 = cgeiCurriculum.units.find((unit) => unit.code === '5.5');
    assert.ok(unit51);
    assert.ok(unit55);
    assert.equal(unit55.lessonIds.length, 5);
    assert.equal(cgeiCurriculum.questions.filter((question) => unit55.lessonIds.includes(question.lessonId)).length, 10);
    const unit56 = cgeiCurriculum.units.find((unit) => unit.code === '5.6');
    assert.ok(unit56);
    assert.equal(unit56.lessonIds.length, 5);
    assert.equal(cgeiCurriculum.questions.filter((question) => unit56.lessonIds.includes(question.lessonId)).length, 10);
    assert.equal(unit56.readiness, 'draft');
    const unit57 = cgeiCurriculum.units.find((item) => item.code === '5.7');
    assert.ok(unit57);
    assert.equal(unit57.lessonIds.length, 5);
    assert.equal(cgeiCurriculum.questions.filter((question) => unit57.lessonIds.includes(question.lessonId)).length, 10);
    assert.equal(unit57.readiness, 'draft');
    const unit58 = cgeiCurriculum.units.find((item) => item.code === '5.8');
    assert.ok(unit58);
    assert.equal(unit58.lessonIds.length, 5);
    assert.equal(cgeiCurriculum.questions.filter((question) => unit58.lessonIds.includes(question.lessonId)).length, 10);
    assert.equal(unit58.readiness, 'draft');
    const unit59 = cgeiCurriculum.units.find((item) => item.code === '5.9');
    assert.ok(unit59);
    assert.equal(unit59.lessonIds.length, 5);
    assert.equal(cgeiCurriculum.questions.filter((question) => unit59.lessonIds.includes(question.lessonId)).length, 10);
    assert.equal(unit59.readiness, 'draft');
    assert.ok(unit59.lessonIds.every((id) => (cgeiCurriculum.lessons.find((lesson) => lesson.id === id)?.content.length ?? 0) >= 4));
    const unit510 = cgeiCurriculum.units.find((item) => item.code === '5.10');
    assert.ok(unit510);
    assert.equal(unit510.lessonIds.length, 5);
    assert.equal(cgeiCurriculum.questions.filter((question) => unit510.lessonIds.includes(question.lessonId)).length, 10);
    assert.equal(unit510.readiness, 'draft');
    assert.ok(unit510.lessonIds.every((id) => (cgeiCurriculum.lessons.find((lesson) => lesson.id === id)?.content.length ?? 0) >= 4));
    const unit511 = cgeiCurriculum.units.find((item) => item.code === '5.11');
    assert.ok(unit511);
    assert.equal(unit511.lessonIds.length, 5);
    assert.equal(cgeiCurriculum.questions.filter((question) => unit511.lessonIds.includes(question.lessonId)).length, 10);
    assert.equal(unit511.readiness, 'draft');
    assert.ok(unit511.lessonIds.every((id) => (cgeiCurriculum.lessons.find((lesson) => lesson.id === id)?.content.length ?? 0) >= 4));
    assert.ok(unit51.lessonIds.every((id) => (cgeiCurriculum.lessons.find((lesson) => lesson.id === id)?.content.length ?? 0) >= 5));
    const canonicalQuestionIds = new Set(cgeiCurriculum.questions.map((question) => question.id));
    assert.ok(cgeiCurriculum.assessments.every((assessment) => (assessment.questionIds ?? []).every((id) => canonicalQuestionIds.has(id))));
  });

  it('preserves every Unit 5.1 question ID, lesson mapping, and source citation', () => {
    for (const legacyQuestion of legacyUnit51Questions) {
      const migrated = cgeiCurriculum.questions.find((question) => question.id === legacyQuestion.id);
      assert.ok(migrated, `Missing canonical question for ${legacyQuestion.id}`);
      const expectedLesson = cgeiCurriculum.lessons.find((lesson) => lesson.sourceTopicId === legacyQuestion.topicId);
      assert.ok(expectedLesson, `Missing lesson mapping for legacy topic ${legacyQuestion.topicId}`);
      assert.equal(migrated.lessonId, expectedLesson.id);
      assert.equal(migrated.sourceCitation, legacyQuestion.sourceCitation);
    }
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
