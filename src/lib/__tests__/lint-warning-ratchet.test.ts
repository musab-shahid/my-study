import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
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
  it('keeps QuizScreen and DashboardScreen free of unused-variable warnings', () => {
    const output = execFileSync(
      process.execPath,
      [
        'node_modules/eslint/bin/eslint.js',
        'src/screens/QuizScreen.tsx',
        'src/screens/DashboardScreen.tsx',
        '--format',
        'json',
      ],
      { cwd: process.cwd(), encoding: 'utf8' },
    );
    const results = JSON.parse(output) as Array<{
      filePath: string;
      messages: Array<{ ruleId: string | null; severity: number; message: string }>;
    }>;
    const unused = results.flatMap((result) => result.messages
      .filter((message) => message.ruleId === '@typescript-eslint/no-unused-vars')
      .map((message) => `${result.filePath}: ${message.message}`));

    assert.deepEqual(unused, [], 'target screens must have no unused-variable warnings');
  });
});
