import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const studyScreen = readFileSync(join(root, 'src/screens/StudyScreen.tsx'), 'utf8');

describe('CGEI Learn path coherence', () => {
  it('uses a single collapsible orientation with an informative summary', () => {
    assert.match(studyScreen, /Before you begin/);
    assert.match(studyScreen, /expand for goals and how to study/);
    assert.match(studyScreen, /What you will be able to do/);
    assert.match(studyScreen, /How the subject is organised/);
    assert.match(studyScreen, /curriculumSubject\.overview/);
    assert.match(studyScreen, /curriculumSubject\.purpose/);
  });

  it('keeps the learning path (units) outside orientation details', () => {
    const orientStart = studyScreen.indexOf('Before you begin');
    const orientEnd = studyScreen.indexOf('</details>', orientStart);
    const pathHeading = studyScreen.indexOf('Learning path', orientStart);
    assert.ok(orientStart >= 0);
    assert.ok(orientEnd > orientStart);
    assert.ok(pathHeading > orientEnd, 'Learning path must be outside orientation details');
  });

  it('hides legacy topic groups when canonical units exist', () => {
    assert.match(
      studyScreen,
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
    assert.match(studyScreen, /Orientation records are loaded separately/);
  });
});
