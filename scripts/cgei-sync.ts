/**
 * One-command CGEI metadata sync after subject-bank edits.
 * Regenerates the index, derives section counts, and records new IDs.
 * Deletions and subject moves remain explicit, reviewed operations.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import * as ts from 'typescript';
import { questions as es } from '../src/data/cgei/env-systems/questions-env-systems';
import { questions as cl } from '../src/data/cgei/climate-science/questions-climate-science';
import { questions as geo } from '../src/data/cgei/geospatial/questions-geospatial';
import { questions as rs } from '../src/data/cgei/remote-sensing/questions-remote-sensing';
import { questions as ds } from '../src/data/cgei/data-science/questions-data-science';
import { questions as ml } from '../src/data/cgei/ml-geoai/questions-ml-geoai';
import { questions as risk } from '../src/data/cgei/climate-risk/questions-climate-risk';
import { questions as rp } from '../src/data/cgei/research-practice/questions-research-practice';
import { questions as dspt } from '../src/data/cgei/decision-support/questions-decision-support';
import { questions as pol } from '../src/data/cgei/climate-policy/questions-climate-policy';
import { questions as se } from '../src/data/cgei/software-engineering/questions-software-engineering';
import { questions as ai } from '../src/data/cgei/advanced-ai/questions-advanced-ai';
import { questions as cap } from '../src/data/cgei/capstone/questions-capstone';

const banks = [es, cl, geo, rs, ds, ml, risk, rp, dspt, pol, se, ai, cap];
const reasonArg = process.argv.find((value) => value.startsWith('--reason='));
const reason = reasonArg?.slice('--reason='.length).trim();
if (!reason) throw new Error('Provide --reason="why these IDs are being added"');

function run(args: string[]): void {
  const result = spawnSync('npm', args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
function propName(name: ts.PropertyName | undefined): string | undefined {
  return name && (ts.isIdentifier(name) || ts.isStringLiteral(name)) ? name.text : undefined;
}
function stringValue(node: ts.Expression | undefined): string | undefined {
  return node && ts.isStringLiteralLike(node) ? node.text : undefined;
}

run(['run', 'lint:cgei-questions']);
const counts = new Map<string, number>();
for (const bank of banks) for (const q of bank) counts.set(q.sectionId, (counts.get(q.sectionId) ?? 0) + 1);
const path = resolve(process.cwd(), 'src/data/sections.ts');
const text = readFileSync(path, 'utf8');
const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
const replacements: Array<{ start: number; end: number; value: string }> = [];
const found = new Set<string>();
function visit(node: ts.Node): void {
  if (ts.isObjectLiteralExpression(node)) {
    const props = new Map<string, ts.PropertyAssignment>();
    for (const p of node.properties) if (ts.isPropertyAssignment(p)) {
      const key = propName(p.name);
      if (key) props.set(key, p);
    }
    const id = stringValue(props.get('id')?.initializer);
    if (id?.startsWith('CGEI-')) {
      const count = props.get('questionCount');
      if (!count || !ts.isNumericLiteral(count.initializer)) throw new Error(`Invalid questionCount for ${id}`);
      replacements.push({ start: count.initializer.getStart(source), end: count.initializer.end,
        value: String(counts.get(id) ?? 0) });
      found.add(id);
    }
  }
  ts.forEachChild(node, visit);
}
visit(source);
for (const id of counts.keys()) if (id.startsWith('CGEI-') && !found.has(id)) {
  throw new Error(`No section record for question-bank section ${id}`);
}
let updated = text;
for (const item of replacements.sort((a,b) => b.start-a.start)) {
  updated = updated.slice(0,item.start) + item.value + updated.slice(item.end);
}
writeFileSync(path, updated, 'utf8');
run(['run', 'generate:cgei-index']);
run(['run', 'snapshot:cgei-question-ids', '--', '--record-new-ids', `--reason=${reason}`]);
console.log('CGEI sync complete: generated index, derived section counts, and permanent ID ledger.');
