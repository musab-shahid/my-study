import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const studyScreen = readFileSync(join(root, 'src/screens/StudyScreen.tsx'), 'utf8');

describe('CGEI orientation presentation', () => {
  it('keeps domain orientation brief and collapsed by default', () => {
    assert.match(
      studyScreen,
      /<details>[\s\S]*?<summary[\s\S]*?Domain orientation[\s\S]*?Brief context for \{subjectTitle\} · not a lesson[\s\S]*?<\/summary>/,
    );
  });

  it('keeps course orientation brief and collapsed by default', () => {
    assert.match(
      studyScreen,
      /<details>[\s\S]*?<summary[\s\S]*?Course orientation[\s\S]*?Brief introduction · not a lesson[\s\S]*?<\/summary>/,
    );
  });

  it('renders curriculum units outside the collapsible course orientation', () => {
    const courseStart = studyScreen.indexOf('Course orientation');
    const courseEnd = studyScreen.indexOf('</details>', courseStart);
    const unitsHeading = studyScreen.indexOf('Curriculum units', courseStart);
    assert.ok(courseStart >= 0, 'course orientation should be present');
    assert.ok(courseEnd > courseStart, 'course orientation details should close');
    assert.ok(unitsHeading > courseEnd, 'curriculum units must be outside orientation details');
  });

  it('relabels legacy Sections as Legacy topic groups when curriculum units exist', () => {
    assert.match(studyScreen, /Legacy topic groups/);
    assert.match(studyScreen, /curriculumUnits\.length > 0/);
  });

  it('keeps orientation records out of the primary lesson framing', () => {
    assert.match(studyScreen, /Orientation records are loaded separately/);
  });
});
