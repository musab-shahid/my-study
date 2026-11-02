import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import * as ts from 'typescript';
import { sections } from '../src/data/sections';
import { appendArrayEdit, applyEdits, exportedArray, findLesson, numberProperty, objectById, renderObject, stringProperty } from './lib/cgei-authoring';

function arg(name: string): string | undefined {
  const index = process.argv.indexOf('--' + name);
  return index >= 0 && process.argv[index + 1] && !process.argv[index + 1].startsWith('--') ? process.argv[index + 1] : undefined;
}
const lessonId = arg('lesson');
if (!lessonId) {
  console.error('Usage: npm run new:question -- --lesson <canonical-lesson-id> [--difficulty easy|medium|hard]');
  process.exit(2);
}
const located = findLesson(lessonId);
const subjectId = stringProperty(located.subject, 'subjectId');
if (!subjectId) throw new Error('Canonical subject module has no subjectId.');
const section = sections.find((item) => item.subjectId === subjectId);
if (!section) throw new Error('No quiz section is registered for ' + subjectId);
const questionPath = join(resolve(process.cwd(), 'src/data/cgei'), located.folder, 'questions-' + located.folder + '.ts');
if (!existsSync(questionPath)) throw new Error('Missing question bank: ' + questionPath);
const questionText = readFileSync(questionPath, 'utf8');
const source = ts.createSourceFile(questionPath, questionText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const questions = exportedArray(source, 'questions');
const topics = exportedArray(source, 'topics');
const lessonTitle = stringProperty(located.lesson, 'title') ?? lessonId;
const existingLessonQuestion = questions.elements.find((element) =>
  ts.isObjectLiteralExpression(element) && stringProperty(element, 'lessonId') === lessonId);
const existingLessonTopicId = existingLessonQuestion && ts.isObjectLiteralExpression(existingLessonQuestion)
  ? stringProperty(existingLessonQuestion, 'topicId')
  : undefined;
const sourceTopicId = stringProperty(located.lesson, 'sourceTopicId');
const topicId = existingLessonTopicId ?? (sourceTopicId && objectById(topics, sourceTopicId) ? sourceTopicId : lessonId);
const existingTopic = objectById(topics, topicId);
const unitCode = stringProperty(located.unit, 'code');
if (!unitCode) throw new Error('Parent unit has no code.');
const abbreviations: Record<string, string> = {
  'env-systems': 'es', 'climate-science': 'cl', 'geospatial': 'geo', 'remote-sensing': 'rs',
  'data-science': 'ds', 'ml-geoai': 'ml', 'climate-risk': 'risk', 'research-practice': 'rp',
  'decision-support': 'dspt', 'climate-policy': 'pol', 'software-engineering': 'se',
  'advanced-ai': 'ai', 'capstone': 'cap',
};
const abbr = abbreviations[located.folder];
if (!abbr) throw new Error('Unknown canonical subject folder: ' + located.folder);
const prefix = 'cgei-' + abbr + '-q-' + unitCode.toLowerCase().replace(/[^a-z0-9]/g, '') + '-';
const ledgerPath = resolve(process.cwd(), 'docs/cgei/question-id-ledger.json');
const ledger = JSON.parse(readFileSync(ledgerPath, 'utf8')) as { questions?: Record<string, unknown> };
const ids = new Set(Object.keys(ledger.questions ?? {}));
for (const element of questions.elements) {
  if (!ts.isObjectLiteralExpression(element)) continue;
  const id = stringProperty(element, 'id');
  if (id) ids.add(id);
}
const sequence = Math.max(0, ...[...ids].filter((id) => id.startsWith(prefix))
  .map((id) => Number(id.slice(prefix.length))).filter((value) => Number.isInteger(value) && value > 0)) + 1;
const id = prefix + String(sequence).padStart(3, '0');
const difficulty = arg('difficulty') ?? 'medium';
if (!['easy', 'medium', 'hard'].includes(difficulty)) throw new Error('--difficulty must be easy|medium|hard');
const questionRecord = {
  id, lessonId, sectionId: section.id, topicId, difficulty, type: 'single',
  question: 'TODO: write one clear, assessable question stem.',
  options: ['TODO: correct answer', 'TODO: plausible distractor', 'TODO: plausible distractor', 'TODO: plausible distractor'],
  correctAnswer: 0,
  explanation: 'TODO: explain the reasoning and address the likeliest misconception.',
  sourceCitation: 'TODO: add a specific, traceable source.',
  cognitiveLevel: 'understand',
};
const edits = [appendArrayEdit(questionText, source, questions, renderObject(questionRecord))];
if (!existingTopic) {
  const topicOrders = topics.elements.filter(ts.isObjectLiteralExpression).map((element) => numberProperty(element, 'order') ?? 0);
  const topicRecord = {
    id: topicId, sectionId: section.id, order: Math.max(0, ...topicOrders) + 1, title: lessonTitle,
    definition: 'Quiz topic for the canonical lesson: ' + lessonTitle,
    keyFacts: [], explanationSections: [], examPoints: [], commonMistakes: [],
    content: true, relatedTopics: [], buildsOn: [], leadsTo: [], usedIn: [],
  };
  edits.push(appendArrayEdit(questionText, source, topics, renderObject(topicRecord)));
}
writeFileSync(questionPath, applyEdits(questionText, edits), 'utf8');
console.log('Added draft ' + id + ' and its quiz-topic metadata to ' + questionPath);
console.log('Reuses a subject-local quiz topic when available; otherwise the canonical lesson ID is used. No legacy global topic lookup is required.');
console.log('Complete the TODO fields, then run npm run cgei:sync -- --reason="add ' + id + '".');
