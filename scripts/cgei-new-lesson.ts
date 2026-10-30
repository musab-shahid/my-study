/**
 * Phase D — scaffold a draft lesson under a unit in topics-<subject>.ts.
 *
 *   npm run new:lesson -- --unit cgei-ds-unit-5-1
 *
 * Allocates the next lesson ordinal for the unit and appends a draft record.
 * Does not auto-edit unit.lessonIds (printed for the author to confirm).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { cgeiIndexUnitById, cgeiIndexLessons } from '../src/data/cgei/curriculum-index';

const ROOT = resolve(process.cwd(), 'src/data/cgei');

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  if (i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')) {
    return process.argv[i + 1];
  }
  return undefined;
}

const SUBJECT_FOLDER: Record<string, string> = {
  'cgei-env-systems': 'env-systems',
  'cgei-climate-science': 'climate-science',
  'cgei-geospatial': 'geospatial',
  'cgei-remote-sensing': 'remote-sensing',
  'cgei-data-science': 'data-science',
  'cgei-ml-geoai': 'ml-geoai',
  'cgei-climate-risk': 'climate-risk',
  'cgei-research-practice': 'research-practice',
  'cgei-decision-support': 'decision-support',
  'cgei-climate-policy': 'climate-policy',
  'cgei-software-engineering': 'software-engineering',
  'cgei-advanced-ai': 'advanced-ai',
  'cgei-capstone': 'capstone',
  'cgei-advanced-branches': 'advanced-branches',
};

function main(): void {
  const unitId = arg('unit');
  if (!unitId) {
    console.error('Usage: npm run new:lesson -- --unit <unitId>');
    process.exit(2);
  }
  const unit = cgeiIndexUnitById.get(unitId);
  if (!unit) {
    console.error(`Unknown unit id: ${unitId}`);
    process.exit(1);
  }
  const folder = SUBJECT_FOLDER[unit.subjectId];
  if (!folder) {
    console.error(`No folder for ${unit.subjectId}`);
    process.exit(1);
  }
  const topicsPath = join(ROOT, folder, `topics-${folder}.ts`);
  if (!existsSync(topicsPath)) {
    console.error(`Missing ${topicsPath}`);
    process.exit(1);
  }

  const existing = cgeiIndexLessons.filter((l) => l.unitId === unitId);
  const nextOrder = existing.length + 1;
  // Derive code-like suffix from unit id: cgei-ds-unit-5-1 → 5-1
  const codeMatch = unitId.match(/(\d+-\d+)$/) || unit.code.match(/(\d+\.?\d*)$/);
  const codePart = (codeMatch?.[1] || unit.code).replace('.', '-');
  const lessonId = `cgei-${folder === 'data-science' ? 'ds' : folder.slice(0, 3)}-lesson-${codePart}-${nextOrder}`.replace(
    /cgei-cli-/,
    'cgei-cl-',
  );
  // Safer: use unit id stem
  const stem = unitId.replace(/-unit-/, '-lesson-');
  const safeId = `${stem}-${nextOrder}`;

  const template = `
  {
    "id": "${safeId}",
    "kind": "lesson",
    "title": "TODO: lesson title",
    "order": ${nextOrder},
    "readiness": "draft",
    "level": "L3",
    "estimatedMinutes": 45,
    "objectives": [
      {
        "id": "${safeId}-o1",
        "statement": "TODO: one measurable objective",
        "level": "L3"
      }
    ],
    "content": [
      {
        "id": "${safeId}-b1",
        "type": "prose",
        "body": "TODO: teach the idea with units and assumptions."
      },
      {
        "id": "${safeId}-b2",
        "type": "worked_example",
        "body": "TODO: worked example with real numbers (fixture-backed when quantitative)."
      }
    ],
    "activityIds": [],
    "assessmentIds": [],
    "resourceIds": []
  },
`;

  let text = readFileSync(topicsPath, 'utf8');
  // Prefer insertion before export const activities
  const marker = 'export const activities';
  const idx = text.indexOf(marker);
  if (idx < 0) {
    console.error('Could not find export const activities in topics module');
    process.exit(1);
  }
  // Find end of lessons array — search backwards from activities for ];
  const before = text.slice(0, idx);
  const close = before.lastIndexOf('];');
  if (close < 0) {
    console.error('Could not find lessons array end');
    process.exit(1);
  }
  text = `${text.slice(0, close).replace(/\s*$/, '')}\n${template}\n];\n\n${text.slice(idx)}`;
  writeFileSync(topicsPath, text, 'utf8');

  console.log(`Appended draft lesson ${safeId}`);
  console.log(`  topics: ${topicsPath}`);
  console.log(`  unit: ${unitId} (${unit.title})`);
  console.log(`IMPORTANT: add "${safeId}" to unit.lessonIds for ${unitId}`);
  console.log('Then: npm run generate:cgei-index && npm run check:cgei');
}

main();
