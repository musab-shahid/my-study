#!/usr/bin/env node
/**
 * My Study — branding guard with storage-compatibility freeze.
 *
 *   node scripts/check-branding.mjs            # CI: fail on legacy brand text or storage-identifier drift
 *   node scripts/check-branding.mjs --update   # regenerate scripts/legacy-storage-identifiers.json (review the diff!)
 *
 * Two rules:
 *  1. User-facing / product text must not use the old names (ExamPrep Hub, "Exam Prep", FPSC & HAT Study Hub).
 *  2. Persistent identifiers (localStorage keys, event names, cache prefixes) that start with `examprep`
 *     are FROZEN: renaming one orphans saved user data. The set is snapshotted; adding, removing or
 *     renaming one fails CI until you consciously run --update (and ship a migration).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOTS = ['src', 'public', 'supabase', 'e2e', 'index.html', 'README.md', 'package.json', 'vite-sw-plugin.js', 'docs'];
const SKIP = /(__tests__|node_modules|\.test\.|\.spec\.|src\/data\/(cgei|fpsc|hat)\/)/;
const SNAPSHOT = 'scripts/legacy-storage-identifiers.json';

// Quoted/templated string that starts with examprep- or examprep: => persistent identifier.
const IDENT = /(['"`])(examprep[-:][A-Za-z0-9:_.\-${}]*)\1|(['"`])(examprep[-:])(?=\$\{)/g;
const LEGACY_TEXT = [
  [/ExamPrep\s*Hub/gi, 'ExamPrep Hub'],
  [/['"`]Exam Prep['"`]/g, '"Exam Prep" label'],
  [/FPSC\s*&(amp;)?\s*HAT\s+Study\s+Hub/gi, 'FPSC & HAT Study Hub'],
  [/X-Title['"`]?\s*:\s*['"`]ExamPrep/g, 'ExamPrep in HTTP headers'],
];

function* walk(p) {
  if (!existsSync(p) || SKIP.test(p)) return;
  if (statSync(p).isFile()) { if (/\.(ts|tsx|js|mjs|json|html|md|css)$/.test(p)) yield p; return; }
  for (const f of readdirSync(p)) yield* walk(join(p, f));
}

export function scan() {
  const idents = new Set();
  const legacyHits = [];
  for (const root of ROOTS) for (const file of walk(root)) {
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(IDENT)) idents.add(m[2] ?? m[4]);
    text.split('\n').forEach((line, i) => {
      for (const [re, label] of LEGACY_TEXT) { re.lastIndex = 0; if (re.test(line)) legacyHits.push(`${relative('.', file)}:${i + 1}  ${label}`); }
    });
  }
  return { idents: [...idents].sort(), legacyHits };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const { idents, legacyHits } = scan();
  if (process.argv[2] === '--update') {
    writeFileSync(SNAPSHOT, JSON.stringify({ note: 'FROZEN persistent identifiers. Changing these requires a data migration.', identifiers: idents }, null, 2) + '\n');
    console.log(`Wrote ${SNAPSHOT} (${idents.length} identifiers)`); process.exit(0);
  }
  const errors = [];
  if (legacyHits.length) errors.push('Legacy brand text found (use "My Study"):\n   ' + legacyHits.join('\n   '));
  const frozen = existsSync(SNAPSHOT) ? JSON.parse(readFileSync(SNAPSHOT, 'utf8')).identifiers : null;
  if (!frozen) errors.push(`${SNAPSHOT} missing — run with --update once and commit it`);
  else {
    const added = idents.filter((x) => !frozen.includes(x)), removed = frozen.filter((x) => !idents.includes(x));
    if (added.length) errors.push('New examprep* persistent identifier(s) — new keys should use the my-study-* prefix with a migration from the old key:\n   ' + added.join('\n   '));
    if (removed.length) errors.push('Frozen identifier(s) disappeared — renaming orphans saved user data:\n   ' + removed.join('\n   '));
  }
  if (errors.length) { console.error('Branding guard FAILED\n' + errors.join('\n')); process.exit(1); }
  console.log(`Branding guard passed (${idents.length} frozen storage identifiers, no legacy brand text).`);
}
