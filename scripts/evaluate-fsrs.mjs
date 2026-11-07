#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { evaluateSchedulersChronologically } from '../src/lib/fsrs-evaluation.ts';
import { normalizeReviewEventsInput } from './lib/review-events-input.mjs';

const inputPath = process.argv[2];
if (!inputPath || inputPath.startsWith('--')) {
  process.stderr.write('Usage: npm run evaluate:fsrs -- <review-events.json|review-log-export.json> [--confirm-real-data] [--output <report.json>]\n');
  process.exitCode = 2;
} else {
  try {
    const parsed = JSON.parse(readFileSync(resolve(inputPath), 'utf8'));
    const events = normalizeReviewEventsInput(parsed);
    const sourceKind = process.argv.includes('--confirm-real-data') ? 'real' : 'unverified';
    const report = evaluateSchedulersChronologically(events, { sourceKind });
    const output = `${JSON.stringify(report, null, 2)}\n`;
    const outputIndex = process.argv.indexOf('--output');
    const outputPath = outputIndex >= 0 ? process.argv[outputIndex + 1] : undefined;
    if (outputPath) {
      if (!outputPath || outputPath.startsWith('--')) throw new TypeError('--output requires a file path.');
      writeFileSync(resolve(outputPath), output, { encoding: 'utf8', flag: 'wx' });
      process.stdout.write(`Evaluation report written to ${resolve(outputPath)}\n`);
    } else {
      process.stdout.write(output);
    }
  } catch (error) {
    process.stderr.write(`FSRS evaluation failed: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
