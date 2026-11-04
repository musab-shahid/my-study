import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('lint warning ratchet', () => {
  it('pins ESLint to the measured baseline warning count', () => {
    const packageJson = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')) as {
      scripts?: Record<string, string>;
    };
    assert.match(packageJson.scripts?.lint ?? '', /eslint src --max-warnings 89$/);
  });
});
