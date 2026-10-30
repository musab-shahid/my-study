/**
 * CGEI question ID ledger — generate or check docs/cgei/question-id-ledger.json
 *
 *   npm run snapshot:cgei-question-ids
 *   npm run check:cgei-question-ids
 *
 * Fails if any previously recorded ID disappears or changes subject folder.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.cwd(), 'src/data/cgei');
const OUT = resolve(process.cwd(), 'docs/cgei/question-id-ledger.json');
const check = process.argv.includes('--check');

type Ledger = {
  version: 1;
  description: string;
  questions: Record<string, { subject: string; source?: string }>;
};

function collect(): Ledger {
  const questions: Ledger['questions'] = {};
  for (const folder of readdirSync(ROOT, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue;
    if (folder.name === 'lib' || folder.name === 'legacy') continue;
    const file = join(ROOT, folder.name, `questions-${folder.name}.ts`);
    if (!existsSync(file)) continue;
    const text = readFileSync(file, 'utf8');
    const ids = new Set<string>();
    for (const m of text.matchAll(/(?:^|\s)id:\s*['"]([^'"]+)['"]/g)) {
      if (m[1].startsWith('CGEI-') || m[1].startsWith('cgei-')) ids.add(m[1]);
    }
    for (const m of text.matchAll(/"id"\s*:\s*"([^"]+)"/g)) {
      if (m[1].startsWith('CGEI-') || m[1].startsWith('cgei-')) ids.add(m[1]);
    }
    const subject = `cgei-${folder.name}`;
    for (const id of ids) {
      questions[id] = { subject };
    }
  }
  // Flat curriculum projection during Phase C migration
  const flat = join(ROOT, 'curriculum-questions.ts');
  if (existsSync(flat)) {
    const text = readFileSync(flat, 'utf8');
    for (const m of text.matchAll(/"id"\s*:\s*"([^"]+)"/g)) {
      const id = m[1];
      if (!(id.startsWith('CGEI-') || id.startsWith('cgei-'))) continue;
      if (!questions[id]) {
        questions[id] = { subject: 'cgei-unassigned', source: 'curriculum-questions' };
      }
    }
  }
  return {
    version: 1,
    description:
      'CGEI question ID ledger. IDs are permanent; CI fails if an ID disappears or changes subject.',
    questions,
  };
}

const live = collect();

if (check) {
  if (!existsSync(OUT)) {
    console.error(`Missing ${OUT}. Run npm run snapshot:cgei-question-ids`);
    process.exit(2);
  }
  const committed = JSON.parse(readFileSync(OUT, 'utf8')) as Ledger;
  const errors: string[] = [];
  for (const [id, meta] of Object.entries(committed.questions)) {
    if (!live.questions[id]) {
      errors.push(`missing ID ${id} (was subject ${meta.subject})`);
    } else if (live.questions[id].subject !== meta.subject && meta.subject !== 'cgei-unassigned') {
      // allow migration from unassigned into a subject
      if (live.questions[id].subject !== meta.subject) {
        errors.push(`ID ${id} moved ${meta.subject} → ${live.questions[id].subject}`);
      }
    }
  }
  if (errors.length) {
    console.error('CGEI question ID ledger check failed:');
    for (const e of errors.slice(0, 40)) console.error(' ', e);
    if (errors.length > 40) console.error(`  … +${errors.length - 40} more`);
    process.exit(1);
  }
  console.log(`CGEI question ID ledger OK (${Object.keys(committed.questions).length} IDs)`);
  process.exit(0);
}

writeFileSync(OUT, `${JSON.stringify(live, null, 2)}\n`, 'utf8');
console.log(`Wrote ${OUT} (${Object.keys(live.questions).length} IDs)`);
