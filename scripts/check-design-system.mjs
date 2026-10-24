import { execFileSync } from 'node:child_process';

let diff;
try {
  diff = execFileSync('git', ['diff', '--unified=0', 'HEAD^1', 'HEAD', '--', 'src'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
} catch (error) {
  console.error('Design-system guard could not read the change diff. Ensure Git history is available in CI.');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(2);
}

const violations = [];
const rawButton = /<button\b/;
const arbitraryFontSize = /\btext-\[(?:\d+(?:\.\d+)?(?:px|rem)?)\]/;
const rawPalette = /\b(?:bg|text|border(?:-[lrtbxy])?|ring(?:-offset)?|from|to|via)-(?:sky|teal|emerald|amber|rose|indigo|cyan|violet|lime|orange|red|green|blue|purple|fuchsia|yellow)-\d{2,3}\b/;

let file = '';
let added = [];
let removed = [];

function flushHunk() {
  if (!file || (!added.length && !removed.length)) {
    added = [];
    removed = [];
    return;
  }
  const inSharedUi = file.startsWith('src/components/ui/');
  const inIdentityRegistry = ['src/data/subject-colors.ts', 'src/data/tracks.ts'].includes(file);

  const checkNetNew = (rule, pattern, exempt = false) => {
    if (exempt) return;
    const removedCount = removed.filter((line) => pattern.test(line)).length;
    const addedLines = added.filter((line) => pattern.test(line));
    for (const line of addedLines.slice(removedCount)) {
      violations.push({ file, rule, line: line.trim() });
    }
  };

  checkNetNew('raw-button', rawButton, inSharedUi);
  checkNetNew('arbitrary-font-size', arbitraryFontSize, inSharedUi);
  checkNetNew('raw-palette-color', rawPalette, inSharedUi || inIdentityRegistry);

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
  console.error('\nUse shared UI components, semantic color/subject-track mappings, and typography tokens. If a raw control is truly necessary, document why and add a narrow, reviewed exception.');
  process.exit(1);
}

console.log('Design-system guard passed: no net-new raw buttons, arbitrary font sizes, or raw track/subject palette colors outside approved shared layers.');
