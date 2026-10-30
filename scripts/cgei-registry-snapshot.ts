/**
 * Generate or check docs/cgei/registry-manifest.json against the live registry.
 *
 *   npx tsx --tsconfig tsconfig.app.json scripts/cgei-registry-snapshot.ts
 *   npx tsx --tsconfig tsconfig.app.json scripts/cgei-registry-snapshot.ts --check
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { cgeiCurriculum } from '../src/data/cgei/curriculum';
import {
  buildRegistryManifest,
  diffRegistryManifests,
  type RegistryManifest,
} from './lib/cgei-registry-manifest';

const OUT = resolve(process.cwd(), 'docs/cgei/registry-manifest.json');
const check = process.argv.includes('--check');

const live = buildRegistryManifest(cgeiCurriculum);

if (check) {
  let committed: RegistryManifest;
  try {
    committed = JSON.parse(readFileSync(OUT, 'utf8')) as RegistryManifest;
  } catch {
    console.error(`Missing manifest at ${OUT}. Run without --check to create it.`);
    process.exit(2);
  }
  // Ignore generatedAt when comparing
  const lines = diffRegistryManifests(
    { ...committed, generatedAt: live.generatedAt },
    live,
  );
  if (lines.length) {
    console.error('CGEI registry manifest is stale or drifted:');
    for (const line of lines.slice(0, 50)) console.error(`  ${line}`);
    if (lines.length > 50) console.error(`  … and ${lines.length - 50} more`);
    console.error('Run: npm run snapshot:cgei-registry');
    process.exit(1);
  }
  console.log('CGEI registry manifest OK');
  process.exit(0);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, `${JSON.stringify(live, null, 2)}\n`, 'utf8');
console.log(`Wrote ${OUT}`);
console.log(
  `subjects=${live.counts.subjects} units=${live.counts.units} lessons=${live.counts.lessons} questions=${live.counts.questions}`,
);
