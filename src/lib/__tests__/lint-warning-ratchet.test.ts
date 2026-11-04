import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('lint warning ratchet', () => {
  it('keeps the ESLint warning budget at or below the measured baseline', () => {
    const packageJson = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')) as {
      scripts: Record<string, string>;
    };
    const lintScript = packageJson.scripts.lint ?? '';
    const match = lintScript.match(/(?:^|\s)--max-warnings\s+(\d+)(?:\s|$)/);

    assert.match(lintScript, /(?:^|\s)eslint\s+src(?:\s|$)/, 'lint script must run ESLint on src');
    assert.ok(match, 'lint script must declare an integer --max-warnings limit');
    const warningLimit = Number(match[1]);
    assert.ok(Number.isInteger(warningLimit), 'warning limit must be an integer');
    assert.ok(
      warningLimit <= 89,
      `ESLint warning limit must not exceed the measured baseline of 89 (received ${warningLimit})`,
    );
  });
});
