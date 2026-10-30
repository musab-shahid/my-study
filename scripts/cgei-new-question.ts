/**
 * Phase D — scaffold a new CGEI question into the subject bank.
 *
 *   npm run new:question -- --lesson cgei-ds-lesson-5-1-1
 *   npm run new:question -- --lesson cgei-ds-lesson-5-1-1 --difficulty hard
 *
 * Allocates the next free ID for the subject, appends a draft template,
 * and records the ID in the ledger when --ledger is passed (default on).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { cgeiIndexLessonById } from '../src/data/cgei/curriculum-index';

const ROOT = resolve(process.cwd(), 'src/data/cgei');

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  if (i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')) {
    return process.argv[i + 1];
  }
  return undefined;
}

const SUBJECT_FOLDER: Record<string, string> = {
  'cgei-env-systems': 'env-systems',
  'cgei-climate-science': 'climate-science',
  'cgei-geospatial': 'geospatial',
  'cgei-remote-sensing': 'remote-sensing',
  'cgei-data-science': 'data-science',
  'cgei-ml-geoai': 'ml-geoai',
  'cgei-climate-risk': 'climate-risk',
  'cgei-research-practice': 'research-practice',
  'cgei-decision-support': 'decision-support',
  'cgei-climate-policy': 'climate-policy',
  'cgei-software-engineering': 'software-engineering',
  'cgei-advanced-ai': 'advanced-ai',
  'cgei-capstone': 'capstone',
  'cgei-advanced-branches': 'advanced-branches',
};

const SUBJECT_SECTION: Record<string, string> = {
  'cgei-env-systems': 'CGEI-01',
  'cgei-climate-science': 'CGEI-02',
  'cgei-geospatial': 'CGEI-03',
  'cgei-remote-sensing': 'CGEI-04',
  'cgei-data-science': 'CGEI-051',
  'cgei-ml-geoai': 'CGEI-06',
  'cgei-climate-risk': 'CGEI-07',
  'cgei-research-practice': 'CGEI-08',
  'cgei-decision-support': 'CGEI-09',
  'cgei-climate-policy': 'CGEI-10',
  'cgei-software-engineering': 'CGEI-11',
  'cgei-advanced-ai': 'CGEI-12',
  'cgei-capstone': 'CGEI-13',
  'cgei-advanced-branches': 'CGEI-14',
};

function nextId(folder: string, subjectId: string, bankText: string): string {
  // Prefer cgei-<abbr>-q-draft-NNN for new scaffold items
  const abbr = folder.split('-').map((p) => p[0]).join('');
  const prefix = `cgei-${folder}-q-`;
  const nums = [...bankText.matchAll(new RegExp(`id:\\s*['"]${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\d+)['"]`, 'g'))].map((m) => Number(m[1]));
  const nums2 = [...bankText.matchAll(new RegExp(`"id":\\s*"${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\d+)"`, 'g'))].map((m) => Number(m[1]));
  const max = Math.max(0, ...nums, ...nums2);
  return `${prefix}${String(max + 1).padStart(3, '0')}`;
}

function main(): void {
  const lessonId = arg('lesson');
  if (!lessonId) {
    console.error('Usage: npm run new:question -- --lesson <lessonId> [--difficulty easy|medium|hard]');
    process.exit(2);
  }
  const lesson = cgeiIndexLessonById.get(lessonId);
  if (!lesson) {
    console.error(`Unknown lesson id: ${lessonId} (not in curriculum-index)`);
    process.exit(1);
  }
  const folder = SUBJECT_FOLDER[lesson.subjectId];
  if (!folder) {
    console.error(`No folder mapping for subject ${lesson.subjectId}`);
    process.exit(1);
  }
  const bankPath = join(ROOT, folder, `questions-${folder}.ts`);
  if (!existsSync(bankPath)) {
    console.error(`Missing bank ${bankPath}`);
    process.exit(1);
  }
  const difficulty = arg('difficulty') ?? 'medium';
  if (!['easy', 'medium', 'hard'].includes(difficulty)) {
    console.error('difficulty must be easy|medium|hard');
    process.exit(2);
  }

  let text = readFileSync(bankPath, 'utf8');
  const id = nextId(folder, lesson.subjectId, text);
  const sectionId = SUBJECT_SECTION[lesson.subjectId] ?? 'CGEI-01';
  const topicId = lesson.unitId;

  const template = `
  {
    id: '${id}',
    sectionId: '${sectionId}',
    topicId: '${topicId}',
    difficulty: '${difficulty}',
    type: 'single',
    question: 'TODO: write a clear stem with one unambiguous correct option.',
    options: [
      'TODO correct option',
      'TODO plausible distractor',
      'TODO plausible distractor',
      'TODO plausible distractor',
    ],
    correctAnswer: 0,
    explanation:
      'TODO: explain why the correct option is right and why the likeliest wrong answer fails (≥ 60 characters).',
    sourceCitation: 'TODO: manuscript / TOC / fixture reference',
    lessonId: '${lessonId}',
    cognitiveLevel: 'understand',
  },
`;

  // Insert before final ]; of questions array
  const close = text.lastIndexOf('];');
  if (close < 0) {
    console.error('Could not find questions array terminator ];');
    process.exit(1);
  }
  text = `${text.slice(0, close).replace(/\s*$/, '')}\n${template}\n];\n`;
  writeFileSync(bankPath, text, 'utf8');
  console.log(`Appended draft question ${id}`);
  console.log(`  bank: ${bankPath}`);
  console.log(`  lesson: ${lessonId} (${lesson.title})`);
  console.log('Next: edit the TODOs, run npm run validate:data and npm run lint:cgei-questions');
  console.log('Then: npm run snapshot:cgei-question-ids if you keep the new ID');
}

main();
