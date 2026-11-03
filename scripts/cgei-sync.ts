/**
 * One-command CGEI metadata sync after a completed subject-bank edit.
 * Scans subject question files directly; no hand-maintained import list.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import * as ts from 'typescript';

const ROOT = resolve(process.cwd(), 'src/data/cgei');
const reasonArg = process.argv.find((value) => value.startsWith('--reason='));
const reason = reasonArg?.slice('--reason='.length).trim();
if (!reason) throw new Error('Provide --reason="why these question IDs are being added or moved"');

function run(args: string[]): void {
  const result = spawnSync('npm', args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
function propertyName(name: ts.PropertyName | undefined): string | undefined {
  return name && (ts.isIdentifier(name) || ts.isStringLiteral(name)) ? name.text : undefined;
}
function valueOf(object: ts.ObjectLiteralExpression, key: string): ts.Expression | undefined {
  const item = object.properties.find((candidate) =>
    ts.isPropertyAssignment(candidate) && propertyName(candidate.name) === key);
  return item && ts.isPropertyAssignment(item) ? item.initializer : undefined;
}
function stringOf(object: ts.ObjectLiteralExpression, key: string): string | undefined {
  const value = valueOf(object, key);
  return value && ts.isStringLiteralLike(value) ? value.text : undefined;
}
function numberOf(object: ts.ObjectLiteralExpression, key: string): number | undefined {
  const value = valueOf(object, key);
  return value && ts.isNumericLiteral(value) ? Number(value.text) : undefined;
}
function exportedArray(source: ts.SourceFile, name: string): ts.ArrayLiteralExpression {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === name &&
          declaration.initializer && ts.isArrayLiteralExpression(declaration.initializer)) return declaration.initializer;
    }
  }
  throw new Error('Could not locate ' + name + ' array.');
}
function render(value: unknown): string {
  return JSON.stringify(value, null, 2).split('\n').map((line) => '  ' + line).join('\n');
}
function appendArray(text: string, source: ts.SourceFile, array: ts.ArrayLiteralExpression, values: unknown[]): string {
  if (!values.length) return text;
  const close = array.end - 1;
  let start = close;
  const arrayStart = array.getStart(source);
  while (start > arrayStart + 1 && /\s/.test(text[start - 1])) start -= 1;
  const before = text.slice(arrayStart, start).trimEnd();
  const comma = array.elements.length > 0 && !before.endsWith(',') ? ',' : '';
  return text.slice(0, start) + comma + '\n' + values.map(render).join(',\n') + '\n' + text.slice(close);
}

run(['run', 'lint:cgei-questions']);

const questionCounts = new Map<string, number>();
const candidateTopics = new Map<string, { id: string; sectionId: string; order: number; title: string; content: boolean }>();
for (const folder of readdirSync(ROOT, { withFileTypes: true })) {
  if (!folder.isDirectory() || folder.name === 'lib' || folder.name === 'legacy') continue;
  const file = join(ROOT, folder.name, 'questions-' + folder.name + '.ts');
  try {
    const text = readFileSync(file, 'utf8');
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const questions = exportedArray(source, 'questions');
    const topics = exportedArray(source, 'topics');
    for (const item of questions.elements) {
      if (!ts.isObjectLiteralExpression(item)) continue;
      const sectionId = stringOf(item, 'sectionId');
      if (sectionId) questionCounts.set(sectionId, (questionCounts.get(sectionId) ?? 0) + 1);
    }
    for (const item of topics.elements) {
      if (!ts.isObjectLiteralExpression(item)) continue;
      const id = stringOf(item, 'id');
      const sectionId = stringOf(item, 'sectionId');
      const title = stringOf(item, 'title');
      if (!id?.startsWith('cgei-') || !sectionId || !title) continue;
      const record = { id, sectionId, order: numberOf(item, 'order') ?? 0, title, content: true };
      const previous = candidateTopics.get(id);
      if (previous && previous.sectionId !== sectionId) throw new Error('Quiz topic ' + id + ' is assigned to multiple sections.');
      if (!previous) candidateTopics.set(id, record);
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') continue;
    throw error;
  }
}

const metadataPath = resolve(process.cwd(), 'src/data/topic-metadata.ts');
const metadataText = readFileSync(metadataPath, 'utf8');
const metadataSource = ts.createSourceFile(metadataPath, metadataText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const metadataArray = exportedArray(metadataSource, 'topicMetadata');
const existingIds = new Set<string>();
const topicCounts = new Map<string, number>();
for (const item of metadataArray.elements) {
  if (!ts.isObjectLiteralExpression(item)) continue;
  const id = stringOf(item, 'id');
  const sectionId = stringOf(item, 'sectionId');
  if (id) existingIds.add(id);
  if (sectionId) topicCounts.set(sectionId, (topicCounts.get(sectionId) ?? 0) + 1);
}
const additions = [...candidateTopics.values()].filter((topic) => !existingIds.has(topic.id));
for (const topic of additions) {
  existingIds.add(topic.id);
  topicCounts.set(topic.sectionId, (topicCounts.get(topic.sectionId) ?? 0) + 1);
}
if (additions.length) {
  writeFileSync(metadataPath, appendArray(metadataText, metadataSource, metadataArray, additions), 'utf8');
}

const sectionsPath = resolve(process.cwd(), 'src/data/sections.ts');
const sectionsText = readFileSync(sectionsPath, 'utf8');
const sectionsSource = ts.createSourceFile(sectionsPath, sectionsText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const replacements: Array<{ start: number; end: number; value: string }> = [];
const found = new Set<string>();
function visit(node: ts.Node): void {
  if (ts.isObjectLiteralExpression(node)) {
    const id = stringOf(node, 'id');
    if (id?.startsWith('CGEI-')) {
      const questionCount = valueOf(node, 'questionCount');
      const topicCount = valueOf(node, 'topicCount');
      if (!questionCount || !ts.isNumericLiteral(questionCount) || !topicCount || !ts.isNumericLiteral(topicCount)) {
        throw new Error('Invalid section counts for ' + id);
      }
      replacements.push({ start: questionCount.getStart(sectionsSource), end: questionCount.end, value: String(questionCounts.get(id) ?? 0) });
      replacements.push({ start: topicCount.getStart(sectionsSource), end: topicCount.end, value: String(topicCounts.get(id) ?? 0) });
      found.add(id);
    }
  }
  ts.forEachChild(node, visit);
}
visit(sectionsSource);
for (const id of questionCounts.keys()) if (id.startsWith('CGEI-') && !found.has(id)) throw new Error('No section record for question bank section ' + id);
for (const id of topicCounts.keys()) if (id.startsWith('CGEI-') && !found.has(id)) throw new Error('No section record for quiz topic section ' + id);
let updatedSections = sectionsText;
for (const item of replacements.sort((a, b) => b.start - a.start)) {
  updatedSections = updatedSections.slice(0, item.start) + item.value + updatedSections.slice(item.end);
}
writeFileSync(sectionsPath, updatedSections, 'utf8');

run(['run', 'generate:cgei-index']);
run(['run', 'snapshot:cgei-registry']);
run(['run', 'snapshot:cgei-question-ids', '--', '--record-new-ids', '--reason=' + reason]);
console.log('CGEI sync complete: question quality, quiz-topic metadata, section counts, navigation index, permanent ID ledger.');
