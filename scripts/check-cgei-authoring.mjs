#!/usr/bin/env node
/**
 * Isolated smoke test for the CGEI authoring commands.
 * Uses temporary copies so the real curriculum files are never modified.
 */
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import * as ts from 'typescript';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const temp = mkdtempSync(join(tmpdir(), 'my-study-cgei-authoring-'));
const tsxCli = resolve(root, 'node_modules/tsx/dist/cli.mjs');
const tsconfig = resolve(root, 'tsconfig.app.json');
const unitId = 'cgei-ds-unit-99-91';
const lessonId = 'cgei-ds-lesson-99-91-1';

function unwrap(expression) {
  let current = expression;
  while (ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isParenthesizedExpression(current) || ts.isTypeAssertionExpression(current)) current = current.expression;
  return current;
}
function exportedArray(file, name) {
  const text = readFileSync(file, 'utf8');
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === name && declaration.initializer) {
        const initializer = unwrap(declaration.initializer);
        if (ts.isArrayLiteralExpression(initializer)) return initializer;
      }
    }
  }
  throw new Error('Missing array ' + name + ' in ' + file);
}
function objectString(object, key) {
  const item = object.properties.find((property) =>
    ts.isPropertyAssignment(property) &&
    (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) &&
    property.name.text === key);
  return item && ts.isPropertyAssignment(item) && ts.isStringLiteralLike(item.initializer)
    ? item.initializer.text
    : undefined;
}
function run(script, args) {
  const result = spawnSync(process.execPath, [tsxCli, '--tsconfig', tsconfig, resolve(root, 'scripts', script), ...args], {
    cwd: temp,
    encoding: 'utf8',
  });
  if (result.status !== 0) throw new Error(script + ' failed:\n' + (result.stdout ?? '') + '\n' + (result.stderr ?? ''));
}
try {
  assert.ok(existsSync(tsxCli), 'tsx CLI must be installed');
  mkdirSync(join(temp, 'src/data'), { recursive: true });
  cpSync(resolve(root, 'src/data/cgei'), join(temp, 'src/data/cgei'), { recursive: true });
  mkdirSync(join(temp, 'docs/cgei'), { recursive: true });
  cpSync(resolve(root, 'docs/cgei/question-id-ledger.json'), join(temp, 'docs/cgei/question-id-ledger.json'));
  writeFileSync(join(temp, 'package.json'), JSON.stringify({
    private: true,
    scripts: { 'generate:cgei-index': 'node -e "process.exit(0)"' },
  }), 'utf8');

  run('cgei-new-unit.ts', ['--subject', 'cgei-data-science', '--code', '99.91', '--title', 'Authoring smoke unit']);
  run('cgei-new-lesson.ts', ['--unit', unitId, '--title', 'Authoring smoke lesson']);
  run('cgei-new-question.ts', ['--lesson', lessonId]);

  const topicsPath = join(temp, 'src/data/cgei/data-science/topics-data-science.ts');
  const questionsPath = join(temp, 'src/data/cgei/data-science/questions-data-science.ts');
  const topicsText = readFileSync(topicsPath, 'utf8');
  const topicsSource = ts.createSourceFile(topicsPath, topicsText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const subjectDecl = topicsSource.statements.flatMap((statement) =>
    ts.isVariableStatement(statement) ? [...statement.declarationList.declarations] : [])
    .find((declaration) => ts.isIdentifier(declaration.name) && declaration.name.text === 'subject');
  const subjectObject = subjectDecl?.initializer ? unwrap(subjectDecl.initializer) : undefined;
  assert.ok(subjectObject && ts.isObjectLiteralExpression(subjectObject));
  const unitArray = exportedArray(topicsPath, 'units');
  const lessonArray = exportedArray(topicsPath, 'lessons');
  const newUnit = unitArray.elements.find((item) => ts.isObjectLiteralExpression(item) && objectString(item, 'id') === unitId);
  assert.ok(newUnit && ts.isObjectLiteralExpression(newUnit), 'unit record is written to the topics file');
  assert.ok(subjectObject.properties.some((property) =>
    ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === 'unitIds' &&
    ts.isArrayLiteralExpression(property.initializer) &&
    property.initializer.elements.some((item) => ts.isStringLiteralLike(item) && item.text === unitId)),
    'subject.unitIds is updated');
  assert.ok(lessonArray.elements.some((item) => ts.isObjectLiteralExpression(item) && objectString(item, 'id') === lessonId),
    'lesson record is written to the same topics file');
  assert.ok(newUnit.properties.some((property) =>
    ts.isPropertyAssignment(property) && ts.isIdentifier(property.name) && property.name.text === 'lessonIds' &&
    ts.isArrayLiteralExpression(property.initializer) &&
    property.initializer.elements.some((item) => ts.isStringLiteralLike(item) && item.text === lessonId)),
    'parent unit.lessonIds is updated');

  const questions = exportedArray(questionsPath, 'questions');
  const question = questions.elements.find((item) => ts.isObjectLiteralExpression(item) && objectString(item, 'lessonId') === lessonId);
  assert.ok(question && ts.isObjectLiteralExpression(question), 'question is written to the questions file');
  assert.equal(objectString(question, 'topicId'), lessonId, 'canonical lesson ID is used as the quiz topic');
  const quizTopics = exportedArray(questionsPath, 'topics');
  assert.ok(quizTopics.elements.some((item) => ts.isObjectLiteralExpression(item) && objectString(item, 'id') === lessonId),
    'quiz-topic metadata is written to the same questions file');

  assert.deepEqual(readdirSync(join(temp, 'src/data/cgei/data-science')).sort(),
    ['questions-data-science.ts', 'topics-data-science.ts'], 'subject folder remains exactly two data files');
  assert.deepEqual(readdirSync(join(temp, 'docs/cgei')).sort(), ['question-id-ledger.json'],
    'authoring does not create traceability CSVs or other per-unit side files');
  console.log('CGEI authoring smoke OK: unit, lesson, parent link, question, quiz-topic metadata, and two-file boundary.');
} finally {
  rmSync(temp, { recursive: true, force: true });
}
