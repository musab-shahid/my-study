/**
 * Add a draft question to the correct subject bank.
 * IDs follow cgei-<subject>-q-<unit-code>-NNN and insertion is syntax-aware.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as ts from 'typescript';
import { cgeiIndexLessonById, cgeiIndexUnitById } from '../src/data/cgei/curriculum-index';
import { cgeiCurriculum } from '../src/data/cgei/curriculum';
import { topics } from '../src/data/topics';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : undefined;
}
const SUBJECTS: Record<string, { folder: string; abbr: string; section: string }> = {
  'cgei-env-systems': { folder: 'env-systems', abbr: 'es', section: 'CGEI-01' },
  'cgei-climate-science': { folder: 'climate-science', abbr: 'cl', section: 'CGEI-02' },
  'cgei-geospatial': { folder: 'geospatial', abbr: 'geo', section: 'CGEI-03' },
  'cgei-remote-sensing': { folder: 'remote-sensing', abbr: 'rs', section: 'CGEI-04' },
  'cgei-data-science': { folder: 'data-science', abbr: 'ds', section: 'CGEI-051' },
  'cgei-ml-geoai': { folder: 'ml-geoai', abbr: 'ml', section: 'CGEI-06' },
  'cgei-climate-risk': { folder: 'climate-risk', abbr: 'risk', section: 'CGEI-07' },
  'cgei-research-practice': { folder: 'research-practice', abbr: 'rp', section: 'CGEI-08' },
  'cgei-decision-support': { folder: 'decision-support', abbr: 'dspt', section: 'CGEI-09' },
  'cgei-climate-policy': { folder: 'climate-policy', abbr: 'pol', section: 'CGEI-10' },
  'cgei-software-engineering': { folder: 'software-engineering', abbr: 'se', section: 'CGEI-11' },
  'cgei-advanced-ai': { folder: 'advanced-ai', abbr: 'ai', section: 'CGEI-12' },
  'cgei-capstone': { folder: 'capstone', abbr: 'cap', section: 'CGEI-13' },
};
function keyOf(name: ts.PropertyName | undefined): string | undefined {
  return name && (ts.isIdentifier(name) || ts.isStringLiteral(name)) ? name.text : undefined;
}
function stringProp(node: ts.ObjectLiteralExpression, key: string): string | undefined {
  const p = node.properties.find((x): x is ts.PropertyAssignment => ts.isPropertyAssignment(x) && keyOf(x.name) === key);
  return p && ts.isStringLiteralLike(p.initializer) ? p.initializer.text : undefined;
}
function locateQuestionsArray(source: ts.SourceFile): ts.ArrayLiteralExpression {
  let result: ts.ArrayLiteralExpression | undefined;
  const visit = (node: ts.Node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'questions' &&
        node.initializer && ts.isArrayLiteralExpression(node.initializer)) result = node.initializer;
    ts.forEachChild(node, visit);
  };
  visit(source);
  if (!result) throw new Error('Could not locate questions array safely');
  return result;
}
function main(): void {
  const lessonId = arg('lesson');
  if (!lessonId) throw new Error('Usage: npm run new:question -- --lesson <lessonId> [--topic <engineTopicId>]');
  const lesson = cgeiIndexLessonById.get(lessonId);
  if (!lesson) throw new Error(`Unknown lesson ID: ${lessonId}`);
  const unit = cgeiIndexUnitById.get(lesson.unitId);
  const subject = SUBJECTS[lesson.subjectId];
  if (!unit || !subject) throw new Error('Missing unit or subject question-ID convention');
  const path = join(resolve(process.cwd(), 'src/data/cgei'), subject.folder, `questions-${subject.folder}.ts`);
  if (!existsSync(path)) throw new Error(`Missing bank ${path}`);
  const text = readFileSync(path, 'utf8');
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const array = locateQuestionsArray(source);
  const objects = array.elements.filter(ts.isObjectLiteralExpression);
  const prefix = `cgei-${subject.abbr}-q-${unit.code.replace(/\\D/g, '')}-`;
  const ledger = JSON.parse(readFileSync(resolve(process.cwd(), 'docs/cgei/question-id-ledger.json'), 'utf8')) as { questions?: Record<string, unknown> };
  const ids = new Set<string>(Object.keys(ledger.questions ?? {}));
  for (const item of objects) { const id = stringProp(item, 'id'); if (id) ids.add(id); }
  const max = Math.max(0, ...[...ids].filter((id) => id.startsWith(prefix))
    .map((id) => Number(id.slice(prefix.length))).filter((n) => Number.isInteger(n) && n > 0));
  const id = `${prefix}${String(max + 1).padStart(3, '0')}`;
  const sameLesson = objects.find((item) => stringProp(item, 'lessonId') === lessonId);
  const canonicalLesson = cgeiCurriculum.lessons.find((item) => item.id === lessonId);
  const topicId = arg('topic') ?? (sameLesson ? stringProp(sameLesson, 'topicId') : canonicalLesson?.sourceTopicId);
  if (!topicId || !topics.some((topic) => topic.id === topicId)) {
    throw new Error('No valid quiz topic can be inferred. Supply --topic <existingTopicId>; never use a unit/lesson ID.');
  }
  const difficulty = arg('difficulty') ?? 'medium';
  if (!['easy', 'medium', 'hard'].includes(difficulty)) throw new Error('difficulty must be easy|medium|hard');
  const question = {
    id, sectionId: subject.section, topicId, difficulty, type: 'single',
    question: 'TODO: write one clear, assessable question stem.',
    options: ['TODO: correct answer', 'TODO: plausible distractor', 'TODO: plausible distractor', 'TODO: plausible distractor'],
    correctAnswer: 0,
    explanation: 'TODO: explain the reasoning and address the likeliest misconception.',
    sourceCitation: 'TODO: add a specific, traceable source.',
    lessonId, cognitiveLevel: 'understand',
  };
  const close = array.end - 1;
  const prior = text.slice(array.getStart(source), close).trimEnd();
  const separator = prior.endsWith(',') ? '' : ',';
  const rendered = JSON.stringify(question, null, 2).split('\n').map((line) => `  ${line}`).join('\n');
  writeFileSync(path, text.slice(0, close) + separator + '\n' + rendered + '\n' + text.slice(close), 'utf8');
  console.log(`Added draft ${id} to ${path}; lesson=${lessonId}; topic=${topicId}`);
  console.log('Replace every TODO before running npm run cgei:sync.');
}
main();
