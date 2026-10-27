import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const BASELINE_PATH = join(ROOT, 'scripts', 'design-system-baseline.json');
const mode = process.argv.includes('--baseline') ? 'baseline' : process.argv.includes('--ratchet') ? 'ratchet' : 'diff';

const rawButton = /<button\b/;
const arbitraryFontSize = /\btext-\[(?:\d+(?:\.\d+)?(?:px|rem)?)\]/;
const rawPalette = /\b(?:bg|text|border(?:-[lrtbxy])?|ring(?:-offset)?|from|to|via)-(?:sky|teal|emerald|amber|rose|indigo|cyan|violet|lime|orange|red|green|blue|purple|fuchsia|pink|yellow)-\d{2,3}\b/;
const arbitraryColor = /\b(?:bg|text|border(?:-[lrtbxy])?|ring(?:-offset)?|from|to|via)-\[\s*#(?:[0-9a-fA-F]{3,8})\s*\]/;
const midToneFill = /(?:\btext-white\b.*\b(?:bg|from|to|via)-(?:brand|success|warning|danger|sky|teal|emerald|amber|rose|indigo|cyan|violet|lime|orange|red|green|blue|purple|fuchsia|yellow)-500\b|\b(?:bg|from|to|via)-(?:brand|success|warning|danger|sky|teal|emerald|amber|rose|indigo|cyan|violet|lime|orange|red|green|blue|purple|fuchsia|yellow)-500\b.*\btext-white\b)/;
const nonCanonicalFocusRing = /\bfocus(?:-visible)?:ring-(?:brand|sky|teal|emerald|amber|rose|indigo|cyan|violet|lime|orange|red|green|blue|purple|fuchsia|yellow)-500\b/;
const rawNeutral = /\b(?:bg|text|border(?:-[lrtbxy])?)-(?:slate|gray|zinc|neutral|stone)-\d{2,3}\b/;
const inlineStyle = /style=\{\{/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?)$/.test(name)) out.push(p);
  }
  return out;
}

function countInFile(file, patterns) {
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  const allowsNativeButton = rel === 'src/components/ui/primitives.tsx';
  const isColorRegistry = ['src/data/subject-colors.ts', 'src/data/tracks.ts'].includes(rel);
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    return null;
  }
  const counts = {};
  for (const [key, pattern, exempt] of patterns) {
    if (exempt) {
      counts[key] = 0;
      continue;
    }
    const matches = text.match(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')) || [];
    counts[key] = matches.length;
  }
  return { file: rel, counts };
}

const treePatterns = [
  ['raw-button', rawButton, false],
  ['arbitrary-font-size', arbitraryFontSize, false],
  ['raw-palette-color', rawPalette, false],
  ['arbitrary-hex-color', arbitraryColor, false],
  ['white-on-mid-tone-fill', midToneFill, false],
  ['non-canonical-focus-ring', nonCanonicalFocusRing, false],
  ['raw-neutral-class', rawNeutral, false],
  ['inline-style', inlineStyle, false],
];

function scanTree() {
  const files = walk(SRC);
  const totals = Object.fromEntries(treePatterns.map(([k]) => [k, 0]));
  const byFile = [];
  for (const file of files) {
    const rel = relative(ROOT, file).replace(/\\/g, '/');
    const allowsNativeButton = rel === 'src/components/ui/primitives.tsx';
    const isColorRegistry = ['src/data/subject-colors.ts', 'src/data/tracks.ts'].includes(rel);
    const patterns = treePatterns.map(([key, pattern]) => {
      let exempt = false;
      if (key === 'raw-button' && allowsNativeButton) exempt = true;
      if ((key === 'raw-palette-color' || key === 'arbitrary-hex-color') && isColorRegistry) exempt = true;
      return [key, pattern, exempt];
    });
    const row = countInFile(file, patterns);
    if (!row) continue;
    byFile.push(row);
    for (const [k, v] of Object.entries(row.counts)) totals[k] += v;
  }
  return { totals, byFile };
}

if (mode === 'baseline') {
  const { totals } = scanTree();
  const payload = {
    generatedAt: new Date().toISOString(),
    totals,
    note: 'Commit this file and run with --ratchet so CI fails when any count increases.',
  };
  writeFileSync(BASELINE_PATH, JSON.stringify(payload, null, 2) + '\n');
  console.log('Wrote design-system baseline to', relative(ROOT, BASELINE_PATH));
  console.log(JSON.stringify(totals, null, 2));
  process.exit(0);
}

if (mode === 'ratchet') {
  if (!existsSync(BASELINE_PATH)) {
    console.error('No baseline at', relative(ROOT, BASELINE_PATH), '— run: node scripts/check-design-system.mjs --baseline');
    process.exit(2);
  }
  const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
  const { totals } = scanTree();
  const regressions = [];
  for (const key of Object.keys(baseline.totals || {})) {
    const before = baseline.totals[key] ?? 0;
    const after = totals[key] ?? 0;
    if (after > before) {
      regressions.push(`${key}: ${before} → ${after} (+${after - before})`);
    }
  }
  if (regressions.length) {
    console.error('Design-system ratchet failed — counts rose above baseline:');
    for (const r of regressions) console.error('-', r);
    console.error('\nMigrate off-system styling or regenerate baseline intentionally after review.');
    process.exit(1);
  }
  console.log('Design-system ratchet passed: no metric increased above baseline.');
  console.log(JSON.stringify(totals, null, 2));
  process.exit(0);
}

// Default: net-new guard over a single commit or an explicit SHA range.
// Pull_request CI checks out a merge commit; HEAD^1 is then the base branch and
// the diff becomes the whole PR (false positives on existing debt). Callers
// should set DESIGN_SYSTEM_DIFF_BASE + DESIGN_SYSTEM_DIFF_HEAD to the PR head
// commit and its parent for net-new, and rely on --ratchet for whole-tree debt.
let diff;
try {
  const base = process.env.DESIGN_SYSTEM_DIFF_BASE?.trim();
  const head = process.env.DESIGN_SYSTEM_DIFF_HEAD?.trim() || 'HEAD';
  const rangeArgs = base
    ? ['diff', '--unified=0', `${base}...${head}`, '--', 'src']
    : ['diff', '--unified=0', 'HEAD^1', 'HEAD', '--', 'src'];
  console.log('Design-system net-new range:', base ? `${base}...${head}` : 'HEAD^1..HEAD');
  diff = execFileSync('git', rangeArgs, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
} catch (error) {
  console.error('Design-system guard could not read the change diff. Ensure Git history is available in CI.');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(2);
}

const violations = [];
let file = '';
let added = [];
let removed = [];

function flushHunk() {
  if (!file || (!added.length && !removed.length)) {
    added = [];
    removed = [];
    return;
  }
  const allowsNativeButton = file === 'src/components/ui/primitives.tsx';
  const isColorRegistry = ['src/data/subject-colors.ts', 'src/data/tracks.ts'].includes(file);

  const checkNetNew = (rule, pattern, exempt = false) => {
    if (exempt) return;
    const removedCount = removed.filter((line) => pattern.test(line)).length;
    const addedLines = added.filter((line) => pattern.test(line));
    for (const line of addedLines.slice(removedCount)) {
      violations.push({ file, rule, line: line.trim() });
    }
  };

  checkNetNew('raw-button', rawButton, allowsNativeButton);
  checkNetNew('arbitrary-font-size', arbitraryFontSize);
  checkNetNew('raw-palette-color', rawPalette, isColorRegistry);
  checkNetNew('arbitrary-hex-color', arbitraryColor, isColorRegistry);
  checkNetNew('white-on-mid-tone-fill', midToneFill);
  checkNetNew('non-canonical-focus-ring', nonCanonicalFocusRing);
  checkNetNew('raw-neutral-class', rawNeutral);
  checkNetNew('inline-style', inlineStyle);

  added = [];
  removed = [];
}

for (const line of diff.split('\n')) {
  if (line.startsWith('diff --git ')) {
    flushHunk();
    file = '';
    continue;
  }
  if (line.startsWith('+++ b/')) {
    file = line.slice('+++ b/'.length);
    continue;
  }
  if (line.startsWith('@@')) {
    flushHunk();
    continue;
  }
  if (line.startsWith('+') && !line.startsWith('+++')) {
    added.push(line.slice(1));
  } else if (line.startsWith('-') && !line.startsWith('---')) {
    removed.push(line.slice(1));
  }
}
flushHunk();

if (violations.length) {
  console.error('Design-system guard found newly introduced UI consistency violations:');
  for (const violation of violations) {
    console.error('- [' + violation.rule + '] ' + violation.file + ': ' + violation.line);
  }
  console.error('\nUse shared UI components, semantic color/subject-track mappings, readable text/fill pairs, the canonical focus ring, and typography tokens. If a raw control is truly necessary, document why and add a narrow, reviewed exception.');
  process.exit(1);
}

console.log('Design-system guard passed: no net-new raw buttons, arbitrary font sizes, raw track/subject palette colors, white text on mid-tone fills, non-canonical focus rings, raw neutral classes, or arbitrary hex colors outside the color registry.');
