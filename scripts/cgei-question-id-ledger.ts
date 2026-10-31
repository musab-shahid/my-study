/**
 * CGEI question ID ledger — generate or check docs/cgei/question-id-ledger.json.
 *
 * Snapshot changes are explicit:
 *   npm run snapshot:cgei-question-ids -- --record-moves --reason="..."
 *   npm run snapshot:cgei-question-ids -- --record-new-ids --reason="..."
 * Check: npm run check:cgei-question-ids
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as ts from 'typescript';

const ROOT = resolve(process.cwd(), 'src/data/cgei');
const OUT = resolve(process.cwd(), 'docs/cgei/question-id-ledger.json');
const check = process.argv.includes('--check');
const recordMoves = process.argv.includes('--record-moves');
const recordNewIds = process.argv.includes('--record-new-ids');
const reasonArg = process.argv.find((arg) => arg.startsWith('--reason='));
const reason = reasonArg ? reasonArg.slice('--reason='.length).trim() : '';

type Move = { id: string; from: string; to: string; reason: string };
type Ledger = {
  version: 2;
  description: string;
  questions: Record<string, { subject: string }>;
  moves: Move[];
};

function collect(): Record<string, { subject: string }> {
  const questions: Record<string, { subject: string }> = {};
  const owners: Record<string, string> = {};
  for (const folder of readdirSync(ROOT, { withFileTypes: true })) {
    if (!folder.isDirectory() || folder.name === 'lib' || folder.name === 'legacy') continue;
    const file = join(ROOT, folder.name, 'questions-' + folder.name + '.ts');
    if (!existsSync(file)) continue;
    const source = readFileSync(file, 'utf8');
    const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const ids = new Set<string>();

    // Only direct IDs on records inside the exported questions array belong in
    // the permanent question ledger. Quiz topic metadata may share this file,
    // but its topic/subtopic IDs are not question IDs.
    for (const statement of sourceFile.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const declaration of statement.declarationList.declarations) {
        if (
          !ts.isIdentifier(declaration.name) ||
          declaration.name.text !== 'questions' ||
          !declaration.initializer ||
          !ts.isArrayLiteralExpression(declaration.initializer)
        ) continue;

        for (const element of declaration.initializer.elements) {
          if (!ts.isObjectLiteralExpression(element)) continue;
          for (const property of element.properties) {
            if (!ts.isPropertyAssignment(property)) continue;
            const name = property.name;
            const key = ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : '';
            const value = property.initializer;
            if (
              key === 'id' &&
              (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) &&
              /^(CGEI-|cgei-)/i.test(value.text)
            ) {
              ids.add(value.text);
            }
          }
        }
      }
    }
    for (const id of ids) {
      if (owners[id]) {
        throw new Error('Duplicate CGEI question ID ' + id + ' in ' + owners[id] + ' and cgei-' + folder.name);
      }
      owners[id] = 'cgei-' + folder.name;
      questions[id] = { subject: owners[id] };
    }
  }
  return Object.fromEntries(Object.entries(questions).sort(([a], [b]) => a.localeCompare(b)));
}

function readLedger(): Ledger | null {
  if (!existsSync(OUT)) return null;
  const parsed = JSON.parse(readFileSync(OUT, 'utf8')) as Partial<Ledger> & {
    questions?: Record<string, { subject: string; source?: string }>;
  };
  if (!parsed.questions || typeof parsed.questions !== 'object') {
    throw new Error('Question ID ledger has no questions object.');
  }
  return {
    version: 2,
    description: 'CGEI question ID ledger.',
    questions: Object.fromEntries(
      Object.entries(parsed.questions).map(([id, meta]) => [id, { subject: meta.subject }]),
    ),
    moves: Array.isArray(parsed.moves) ? parsed.moves : [],
  };
}

function checkLedger(live: Record<string, { subject: string }>, ledger: Ledger): string[] {
  const errors: string[] = [];
  for (const [id, meta] of Object.entries(ledger.questions)) {
    if (!live[id]) errors.push('missing ID ' + id + ' (was subject ' + meta.subject + ')');
    else if (live[id].subject !== meta.subject) {
      errors.push('ID ' + id + ' moved ' + meta.subject + ' -> ' + live[id].subject + ' without a ledger update');
    }
  }
  for (const id of Object.keys(live)) {
    if (!ledger.questions[id]) errors.push('new ID ' + id + ' in ' + live[id].subject + ' is not in the committed ledger');
  }

  const movesById = new Map<string, Move[]>();
  for (const move of ledger.moves) {
    if (!move.id || !move.from || !move.to || !move.reason?.trim()) {
      errors.push('invalid move record: ' + JSON.stringify(move));
      continue;
    }
    if (move.from === move.to) errors.push('move record for ' + move.id + ' has identical from/to subjects');
    if (!ledger.questions[move.id]) errors.push('move record references unknown ID ' + move.id);
    if (!live[move.id]) errors.push('move record references missing live ID ' + move.id);
    const records = movesById.get(move.id) ?? [];
    records.push(move);
    movesById.set(move.id, records);
  }
  for (const [id, records] of movesById) {
    for (let index = 1; index < records.length; index += 1) {
      if (records[index].from !== records[index - 1].to) {
        errors.push('move history for ' + id + ' is discontinuous: ' + records[index - 1].to + ' -> ' + records[index].from);
      }
    }
    if (ledger.questions[id] && records[records.length - 1].to !== ledger.questions[id].subject) {
      errors.push('move history for ' + id + ' ends at ' + records[records.length - 1].to + ', ledger says ' + ledger.questions[id].subject);
    }
  }
  return errors;
}

const live = collect();

if (check) {
  const ledger = readLedger();
  if (!ledger) {
    console.error('Missing ' + OUT + '. Run npm run snapshot:cgei-question-ids');
    process.exit(2);
  }
  const errors = checkLedger(live, ledger);
  if (errors.length) {
    console.error('CGEI question ID ledger check failed:');
    for (const error of errors.slice(0, 60)) console.error(' ', error);
    if (errors.length > 60) console.error('  ... +' + (errors.length - 60) + ' more');
    process.exit(1);
  }
  console.log('CGEI question ID ledger OK (' + Object.keys(live).length + ' IDs; ' + ledger.moves.length + ' recorded moves)');
} else {
  const previous = readLedger();
  const previousQuestions = previous?.questions ?? {};
  const missing = Object.keys(previousQuestions).filter((id) => !live[id]);
  const added = Object.keys(live).filter((id) => !previousQuestions[id]);
  const moved = Object.keys(previousQuestions)
    .filter((id) => live[id] && previousQuestions[id].subject !== live[id].subject)
    .map((id) => ({ id, from: previousQuestions[id].subject, to: live[id].subject }));

  if (missing.length) {
    console.error('Refusing to remove ' + missing.length + ' permanent question ID(s): ' + missing.slice(0, 20).join(', '));
    process.exit(1);
  }
  if (added.length && !recordNewIds) {
    console.error('Refusing to add ' + added.length + ' question ID(s) without --record-new-ids: ' + added.slice(0, 20).join(', '));
    process.exit(1);
  }
  if (moved.length && !recordMoves) {
    console.error('Refusing to move ' + moved.length + ' question ID(s) without --record-moves: ' + moved.slice(0, 20).map((item) => item.id).join(', '));
    process.exit(1);
  }
  if ((added.length || moved.length) && !reason) {
    console.error('A non-empty --reason="..." is required when recording new IDs or subject moves.');
    process.exit(1);
  }

  const moves: Move[] = [...(previous?.moves ?? [])];
  for (const item of moved.sort((a, b) => a.id.localeCompare(b.id))) {
    moves.push({ ...item, reason });
  }
  const ledger: Ledger = {
    version: 2,
    description: 'CGEI question ID ledger. IDs are permanent; CI fails if an ID disappears, is added without a reviewed snapshot, or changes subject without an explicit move record.',
    questions: live,
    moves,
  };
  writeFileSync(OUT, JSON.stringify(ledger, null, 2) + '\n', 'utf8');
  console.log('Wrote ' + OUT + ' (' + Object.keys(live).length + ' IDs; ' + moved.length + ' moves; ' + added.length + ' additions)');
}
