import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const packageJson = JSON.parse(await readFile(new URL('../../package.json', import.meta.url), 'utf8'));
const lockfile = JSON.parse(await readFile(new URL('../../package-lock.json', import.meta.url), 'utf8'));

test('ts-fsrs is declared as a production dependency', () => {
  assert.equal(
    packageJson.dependencies?.['ts-fsrs'],
    '5.4.2',
    'ts-fsrs is imported by production learning-engine code and must be in dependencies',
  );
  assert.equal(
    packageJson.devDependencies?.['ts-fsrs'],
    undefined,
    'ts-fsrs must not remain in devDependencies',
  );
});

test('lockfile records ts-fsrs as a production dependency', () => {
  assert.equal(lockfile.packages[''].dependencies?.['ts-fsrs'], '5.4.2');
  assert.equal(lockfile.packages[''].devDependencies?.['ts-fsrs'], undefined);
  assert.equal(
    lockfile.packages['node_modules/ts-fsrs']?.dev,
    undefined,
    'installed ts-fsrs package must not be marked development-only',
  );
});
