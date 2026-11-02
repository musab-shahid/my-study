#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cgeiRoot = join(root, 'src/data/cgei');
const assembler = readFileSync(join(cgeiRoot, 'curriculum.ts'), 'utf8');
const topicImports = [...assembler.matchAll(/from\s+["']\.\/([^/"']+)\/topics-\1["']/g)].map((match) => match[1]);
const questionImports = [...assembler.matchAll(/from\s+["']\.\/([^/"']+)\/questions-\1["']/g)].map((match) => match[1]);
const errors = [];
const unique = (values) => [...new Set(values)];
if (topicImports.length !== unique(topicImports).length) errors.push('curriculum.ts imports a subject topics module more than once.');
if (questionImports.length !== unique(questionImports).length) errors.push('curriculum.ts imports a subject questions module more than once.');
const topicSet = new Set(topicImports);
const questionSet = new Set(questionImports);
for (const folder of unique([...topicImports, ...questionImports])) {
  if (!topicSet.has(folder)) errors.push('Missing topics module import for subject folder: ' + folder);
  if (!questionSet.has(folder)) errors.push('Missing questions module import for subject folder: ' + folder);
  const dir = join(cgeiRoot, folder);
  const expected = ['topics-' + folder + '.ts', 'questions-' + folder + '.ts'].sort();
  if (!existsSync(dir)) {
    errors.push('Missing subject folder: ' + folder);
    continue;
  }
  const actual = readdirSync(dir, { withFileTypes: true }).map((entry) => entry.name).sort();
  if (actual.length !== 2 || actual.some((name, index) => name !== expected[index])) {
    errors.push(folder + ' must contain exactly two subject data files: ' + expected.join(' and ') +
      '; found: ' + (actual.join(', ') || '(empty)'));
  }
}
const registered = new Set(unique([...topicImports, ...questionImports]));
for (const entry of readdirSync(cgeiRoot, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === 'lib') continue;
  const files = readdirSync(join(cgeiRoot, entry.name), { withFileTypes: true });
  const hasSubjectData = files.some((file) => file.isFile() &&
    (/^(topics|questions)-.+\.ts$/.test(file.name) || /^quiz-topics-.+\.ts$/.test(file.name)));
  if (hasSubjectData && !registered.has(entry.name)) errors.push('Unregistered subject data folder: ' + entry.name);
}
if (topicImports.length !== questionImports.length) errors.push('curriculum.ts must import the same number of topics and questions modules.');
if (registered.has('advanced-branches') || existsSync(join(cgeiRoot, 'advanced-branches'))) {
  errors.push('Advanced Branches is an optional extension, not a canonical subject folder.');
}
for (const script of ['cgei-new-unit.ts', 'cgei-new-lesson.ts', 'cgei-new-question.ts']) {
  const content = readFileSync(join(root, 'scripts', script), 'utf8');
  if (/curriculum-index|src\/data\/topics/.test(content)) errors.push(script + ' must not depend on the generated index or the legacy global topic registry.');
}
if (errors.length) {
  console.error('CGEI subject data boundary FAILED:');
  for (const error of errors) console.error(' - ' + error);
  process.exit(1);
}
console.log('CGEI subject data boundary OK: ' + topicImports.length +
  ' canonical subjects × exactly two subject data files = ' + topicImports.length * 2 + ' files.');
