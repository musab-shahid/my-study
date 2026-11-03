import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('study screen module boundary', () => {
  it('keeps the legacy TopicScreen export pointed at the extracted screen', () => {
    const legacy = readFileSync(resolve(process.cwd(), 'src/screens/StudyScreen.tsx'), 'utf8');
    const extracted = readFileSync(resolve(process.cwd(), 'src/screens/study/TopicScreen.tsx'), 'utf8');

    assert.match(legacy, /export\s+\{\s*TopicScreen\s*\}\s+from\s+['"]\.\/study\/TopicScreen['"]/);
    assert.match(extracted, /export function TopicScreen\(/);
    assert.match(legacy, /export function StudyScreen\(/);
    assert.match(legacy, /export function SectionScreen\(/);
    assert.doesNotMatch(legacy, /export function TopicScreen\(/);
  });
});
