import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '../../..');
const validatorPath = resolve(repoRoot, 'scripts/validate-question-bank.ts');
const cgeiRoot = resolve(repoRoot, 'src/data/cgei');
const validatorSource = readFileSync(validatorPath, 'utf8');

function resolvesToSource(specifier: string): boolean {
  const base = resolve(dirname(validatorPath), specifier);
  return ['.ts', '.tsx', '/index.ts'].some((suffix) => existsSync(base + suffix));
}

describe('question-bank validator loader tables', () => {
  it('imports only modules that exist', () => {
    const specifiers = [...validatorSource.matchAll(/import\('(\.\.\/src\/[^']+)'\)/g)].map((m) => m[1]);
    assert.ok(specifiers.length > 0, 'expected loader tables to contain dynamic imports');
    const missing = specifiers.filter((specifier) => !resolvesToSource(specifier));
    assert.deepEqual(missing, [], 'validator imports modules that no longer exist');
  });

  it('covers every CGEI subject that has a questions file', () => {
    const onDisk = readdirSync(cgeiRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && existsSync(resolve(cgeiRoot, entry.name, `questions-${entry.name}.ts`)))
      .map((entry) => `cgei-${entry.name}`)
      .sort();
    const inValidator = [...new Set([...validatorSource.matchAll(/'(cgei-[a-z-]+)': \(\) => import\(/g)].map((m) => m[1]))].sort();
    assert.deepEqual(inValidator, onDisk);
  });

  it('treats a topic module that fails to load as a critical finding', () => {
    assert.match(validatorSource, /add\('critical', subjectId, '—', 'TOPIC_LOAD_FAILED'/);
    assert.doesNotMatch(validatorSource, /add\('warning', subjectId, '—', 'TOPIC_LOAD_FAILED'/);
  });

  it('derives CGEI topic loaders from the same question modules (quiz topics live there)', () => {
    assert.match(validatorSource, /topicLoaders\[subjectId\] = questionLoaders\[subjectId\]/);
    assert.doesNotMatch(validatorSource, /quiz-topics-|roadmap-topics/);
  });
});
