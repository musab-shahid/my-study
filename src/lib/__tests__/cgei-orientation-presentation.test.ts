import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..');
const studyScreen = readFileSync(join(root, 'src/screens/StudyScreen.tsx'), 'utf8');

describe('CGEI orientation presentation', () => {
  it('uses softened domain orientation wording (context only, not a study lesson)', () => {
    assert.match(
      studyScreen,
      /Domain orientation[\s\S]*context only[\s\S]*not a study lesson/,
    );
  });

  it('relabels Sections as Legacy topic groups when curriculum units exist', () => {
    assert.match(studyScreen, /Legacy topic groups/);
    assert.match(studyScreen, /curriculumUnits\.length > 0/);
  });

  it('keeps orientation records out of the primary lesson framing', () => {
    assert.match(studyScreen, /Orientation records are loaded separately/);
  });
});
