/**
 * Phase D — CGEI question quality lints with grow-only baselines.
 *
 *   npm run lint:cgei-questions
 *   npm run snapshot:cgei-question-lints
 *
 * Does not replace validate-question-bank (schema / section / topic).
 * Focuses on instructional quality signals from the Final Plan §7.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.cwd(), 'src/data/cgei');
const BASELINE_PATH = resolve(process.cwd(), 'docs/cgei/question-lint-baseline.json');
const snapshot = process.argv.includes('--snapshot');

type Baseline = {
  version: number;
  description: string;
  maxLongestIsCorrectShare: number;
  minExplanationChars: number;
  maxCorrectAnswerIndexShare: number;
  minQuestionsPerLessonWithAny: number;
};

type Q = {
  id: string;
  options: string[];
  correctAnswer: number | number[];
  explanation: string;
  lessonId?: string;
  type?: string;
};

function loadBaseline(): Baseline {
  if (!existsSync(BASELINE_PATH)) {
    throw new Error(`Missing ${BASELINE_PATH}`);
  }
  return JSON.parse(readFileSync(BASELINE_PATH, 'utf8')) as Baseline;
}

function extractQuestions(fileText: string): Q[] {
  // Lightweight scan: find objects with id + options + correctAnswer + explanation
  const out: Q[] = [];
  const re =
    /\{\s*(?:"id"|id):\s*['"]([^'"]+)['"][\s\S]*?(?:"options"|options):\s*\[([\s\S]*?)\][\s\S]*?(?:"correctAnswer"|correctAnswer):\s*(\d+|\[ [\s\S]*?\])[\s\S]*?(?:"explanation"|explanation):\s*['"]([\s\S]*?)['"]/g;
  // Simpler line-oriented fallback via JSON-ish blocks for migrated items
  const blockRe = /\{\s*"id":\s*"([^"]+)"[\s\S]*?"options":\s*(\[[\s\S]*?\])[\s\S]*?"correctAnswer":\s*(\d+)[\s\S]*?"explanation":\s*"((?:\\.|[^"\\])*)"[\s\S]*?\}/g;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(fileText))) {
    try {
      const options = JSON.parse(m[2].replace(/,\s*]/g, ']')) as string[];
      out.push({
        id: m[1],
        options,
        correctAnswer: Number(m[3]),
        explanation: m[4].replace(/\\n/g, '\n'),
        lessonId: (fileText.slice(m.index, m.index + m[0].length).match(/"lessonId":\s*"([^"]+)"/) || [])[1],
        type: 'single',
      });
    } catch {
      /* skip unparseable */
    }
  }
  // Legacy unquoted style
  const legacy =
    /\{\s*id:\s*'([^']+)'[\s\S]*?options:\s*\[([\s\S]*?)\][\s\S]*?correctAnswer:\s*(\d+)[\s\S]*?explanation:\s*((?:'[^']*'|"[^"]*"|`[\s\S]*?`|[^,])+)[\s\S]*?\}/g;
  while ((m = legacy.exec(fileText))) {
    if (out.some((q) => q.id === m![1])) continue;
    const optBody = m[2];
    const options = [...optBody.matchAll(/'([^']*)'|"([^"]*)"/g)].map((x) => x[1] || x[2] || '');
    if (options.length < 2) continue;
    let explanation = m[4].trim();
    if ((explanation.startsWith("'") && explanation.endsWith("'")) || (explanation.startsWith('"') && explanation.endsWith('"'))) {
      explanation = explanation.slice(1, -1);
    }
    out.push({
      id: m[1],
      options,
      correctAnswer: Number(m[3]),
      explanation,
      type: 'single',
    });
  }
  return out;
}

function collectAll(): Q[] {
  const all: Q[] = [];
  for (const ent of readdirSync(ROOT, { withFileTypes: true })) {
    if (!ent.isDirectory() || ent.name === 'lib' || ent.name === 'legacy') continue;
    const file = join(ROOT, ent.name, `questions-${ent.name}.ts`);
    if (!existsSync(file)) continue;
    all.push(...extractQuestions(readFileSync(file, 'utf8')));
  }
  return all;
}

function metrics(questions: Q[]) {
  const single = questions.filter((q) => typeof q.correctAnswer === 'number' && q.options.length >= 2);
  let longestIsCorrect = 0;
  const indexCounts = new Map<number, number>();
  let shortExpl = 0;
  for (const q of single) {
    const ans = q.correctAnswer as number;
    indexCounts.set(ans, (indexCounts.get(ans) ?? 0) + 1);
    const lengths = q.options.map((o) => o.length);
    const maxLen = Math.max(...lengths);
    if (q.options[ans]?.length === maxLen && lengths.filter((l) => l === maxLen).length === 1) {
      longestIsCorrect += 1;
    }
    if ((q.explanation || '').trim().length < 60) shortExpl += 1;
  }
  const longestShare = single.length ? longestIsCorrect / single.length : 0;
  const dominantIndexShare = single.length
    ? Math.max(0, ...[...indexCounts.values()]) / single.length
    : 0;

  const byLesson = new Map<string, number>();
  for (const q of questions) {
    if (!q.lessonId) continue;
    byLesson.set(q.lessonId, (byLesson.get(q.lessonId) ?? 0) + 1);
  }
  let thinLessons = 0;
  for (const n of byLesson.values()) {
    if (n > 0 && n < 3) thinLessons += 1;
  }

  return {
    total: questions.length,
    single: single.length,
    longestIsCorrectShare: longestShare,
    dominantCorrectIndexShare: dominantIndexShare,
    shortExplanationCount: shortExpl,
    lessonsWithQuestions: byLesson.size,
    thinLessons,
  };
}

function main(): void {
  const baseline = loadBaseline();
  const questions = collectAll();
  const m = metrics(questions);
  console.log('CGEI question lint metrics:', JSON.stringify(m, null, 2));

  if (snapshot) {
    const next: Baseline = {
      ...baseline,
      maxLongestIsCorrectShare: Number(m.longestIsCorrectShare.toFixed(4)),
      maxCorrectAnswerIndexShare: Number(m.dominantCorrectIndexShare.toFixed(4)),
      minExplanationChars: baseline.minExplanationChars,
      minQuestionsPerLessonWithAny: baseline.minQuestionsPerLessonWithAny,
    };
    writeFileSync(BASELINE_PATH, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
    console.log(`Wrote ${BASELINE_PATH}`);
    return;
  }

  const errors: string[] = [];
  if (m.longestIsCorrectShare > baseline.maxLongestIsCorrectShare + 1e-9) {
    errors.push(
      `longest-is-correct share ${m.longestIsCorrectShare.toFixed(3)} exceeds baseline ${baseline.maxLongestIsCorrectShare} (may only improve)`,
    );
  }
  if (m.dominantCorrectIndexShare > baseline.maxCorrectAnswerIndexShare + 1e-9) {
    errors.push(
      `dominant correct-answer index share ${m.dominantCorrectIndexShare.toFixed(3)} exceeds baseline ${baseline.maxCorrectAnswerIndexShare}`,
    );
  }
  // Absolute quality gates for *new* items are enforced when IDs are allocated by scaffold;
  // here we only ratchet aggregate position bias.

  if (errors.length) {
    console.error('CGEI question lint failed:');
    for (const e of errors) console.error(' ', e);
    process.exit(1);
  }
  console.log('CGEI question lint OK (baselines held).');
}

main();
