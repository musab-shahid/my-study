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
const midToneFill = /(?:\btext-white\b.*\b(?:bg|from|to|via)-(?:brand|success|warning|danger|sky|teal|emerald|amber|rose|indigo|cyan|violet|lime|orange|red|green|blue|purple|fuchsia|yellow)-500\b|\b(?:bg|from|to|via)-(?:brand|success|warning|danger|sky|teal|emerald|amber|rose|indigo|cyan|violet|lime|orange|red|green|blue|purple|fuchsia|yellow)-500\b.*\btext-white\b)/;
const nonCanonicalFocusRing = /\bfocus(?:-visible)?:ring-(?:brand|sky|teal|emerald|amber|rose|indigo|cyan|violet|lime|orange|red|green|blue|purple|fuchsia|yellow)-500\b/;

let file = '';
let added = [];
let removed = [];

function flushHunk() {
  if (!file || (!added.length && !removed.length)) {
    added = [];
    removed = [];
    return;
  }
  // Narrow, intentional exceptions only:
  // - primitives.tsx must compose native buttons for Dialog/Tabs; its visual and
  //   keyboard behavior is covered by accessibility tests.
  // - subject/track registries are the single source of truth for palette mapping.
  // Do not exempt the entire shared-UI directory: regressions there affect every screen.
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

console.log('Design-system guard passed: no net-new raw buttons, arbitrary font sizes, raw track/subject palette colors, white text on mid-tone fills, non-canonical focus rings, or arbitrary hex colors outside the color registry.');
