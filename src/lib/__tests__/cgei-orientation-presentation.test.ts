import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const studyScreen = readFileSync(join(root, 'src/screens/StudyScreen.tsx'), 'utf8');
const genericStudyScreen = readFileSync(join(root, 'src/screens/study/GenericStudyScreen.tsx'), 'utf8');

describe('CGEI Learn path coherence', () => {
  it('keeps CGEI route precedence in the route-level StudyScreen', () => {
    assert.match(studyScreen, /CGEILearningScreen/);
    assert.match(studyScreen, /return <GenericStudyScreen \/>/);
  });

  it('uses a single collapsible orientation with an informative summary', () => {
    assert.match(genericStudyScreen, /Before you begin/);
    assert.match(genericStudyScreen, /expand for goals and how to study/);
    assert.match(genericStudyScreen, /What you will be able to do/);
    assert.match(genericStudyScreen, /How the subject is organised/);
    assert.match(studyScreen, /curriculumSubject\.overview/);
    assert.match(studyScreen, /curriculumSubject\.purpose/);
  });

  it('keeps the learning path (units) outside orientation details', () => {
    const orientStart = genericStudyScreen.indexOf('Before you begin');
    const orientEnd = genericStudyScreen.indexOf('</details>', orientStart);
    const pathHeading = genericStudyScreen.indexOf('Learning path', orientStart);
    assert.ok(orientStart >= 0);
    assert.ok(orientEnd > orientStart);
    assert.ok(pathHeading > orientEnd, 'Learning path must be outside orientation details');
  });

  it('hides legacy topic groups when canonical units exist', () => {
    assert.match(
      genericStudyScreen,
      /subjectSections\.length > 0 && !\(curriculumSubject && curriculumUnits\.length > 0\)/,
    );
    assert.doesNotMatch(studyScreen, /Legacy topic groups/);
  });

  it('restores domain orientation content inside the expanded orientation', () => {
    assert.match(studyScreen, /roadmapTopic\.explanationSections/);
    assert.match(studyScreen, /roadmapTopic\.keyFacts/);
    assert.match(studyScreen, /roadmapTopic\.examPoints/);
  });

  it('keeps orientation records out of the primary lesson framing', () => {
    assert.match(genericStudyScreen, /Orientation records are loaded separately/);
  });
});
