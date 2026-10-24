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
let file = '';
const rawButton = /<button\b/;
const arbitraryFontSize = /\btext-\[(?:\d+(?:\.\d+)?(?:px|rem)?)\]/;
const rawPalette = /\b(?:bg|text|border(?:-[lrtbxy])?|ring(?:-offset)?|from|to|via)-(?:sky|teal|emerald|amber|rose|indigo|cyan|violet|lime|orange|red|green|blue|purple|fuchsia|yellow)-\d{2,3}\b/;

for (const line of diff.split('\n')) {
  if (line.startsWith('+++ b/')) {
    file = line.slice('+++ b/'.length);
    continue;
  }
  if (!line.startsWith('+') || line.startsWith('+++')) continue;
  if (!file.startsWith('src/') || file.startsWith('src/components/ui/')) continue;

  const added = line.slice(1);
  if (rawButton.test(added)) {
    violations.push({ file, rule: 'raw-button', line: added.trim() });
  }
  if (arbitraryFontSize.test(added)) {
    violations.push({ file, rule: 'arbitrary-font-size', line: added.trim() });
  }
  if (rawPalette.test(added)) {
    violations.push({ file, rule: 'raw-palette-color', line: added.trim() });
  }
}

if (violations.length) {
  console.error('Design-system guard found new UI consistency violations:');
  for (const violation of violations) {
    console.error('- [' + violation.rule + '] ' + violation.file + ': ' + violation.line);
  }
  console.error('\nUse shared UI components, semantic color/subject-track mappings, and typography tokens. If a raw control is truly necessary, document why and add a narrow, reviewed exception.');
  process.exit(1);
}

console.log('Design-system guard passed: no new raw buttons, arbitrary font sizes, or raw track/subject palette colors outside the shared UI layer.');
