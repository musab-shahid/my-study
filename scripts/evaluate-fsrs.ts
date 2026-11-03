import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { evaluateSchedulersChronologically } from '../src/lib/fsrs-evaluation.ts';

function main(): void {
  const inputPath = process.argv[2];
  if (!inputPath || inputPath.startsWith('--')) {
    process.stderr.write(
      'Usage: npm run evaluate:fsrs -- <review-events.json> [--confirm-real-data] [--output <report.json>]\n',
    );
    process.exitCode = 2;
    return;
  }

  try {
    const parsed: unknown = JSON.parse(readFileSync(resolve(inputPath), 'utf8'));
    if (!Array.isArray(parsed)) {
      throw new TypeError('Input must be a JSON array of ReviewEvent records.');
    }

    const sourceKind = process.argv.includes('--confirm-real-data') ? 'real' : 'unverified';
    const report = evaluateSchedulersChronologically(parsed, { sourceKind });
    const output = `${JSON.stringify(report, null, 2)}\n`;
    const outputIndex = process.argv.indexOf('--output');
    const outputPath = outputIndex >= 0 ? process.argv[outputIndex + 1] : undefined;
    if (outputIndex >= 0 && !outputPath) {
      throw new Error('--output requires a destination path');
    }

    if (outputPath) {
      // Refuse to overwrite an existing report accidentally.
      writeFileSync(resolve(outputPath), output, { encoding: 'utf8', flag: 'wx' });
      process.stdout.write(`Evaluation report written to ${resolve(outputPath)}\n`);
    } else {
      process.stdout.write(output);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`FSRS evaluation failed: ${message}\n`);
    process.exitCode = 1;
  }
}

main();
