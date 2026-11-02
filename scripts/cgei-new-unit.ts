import { writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import * as ts from 'typescript';
import { arrayProperty, arrayStrings, appendArrayEdit, applyEdits, exportedArray, findSubjectModule, numberProperty, objectById, renderObject } from './lib/cgei-authoring';

function arg(name: string): string | undefined {
  const index = process.argv.indexOf('--' + name);
  return index >= 0 && process.argv[index + 1] && !process.argv[index + 1].startsWith('--') ? process.argv[index + 1] : undefined;
}
const subjectId = arg('subject');
const code = arg('code');
if (!subjectId || !code) {
  console.error('Usage: npm run new:unit -- --subject cgei-data-science --code 5.13 --title "Unit title"');
  process.exit(2);
}
const folder = subjectId.replace(/^cgei-/, '');
const prefixes: Record<string, string> = {
  'env-systems': 'es', 'climate-science': 'cl', 'geospatial': 'geo', 'remote-sensing': 'rs',
  'data-science': 'ds', 'ml-geoai': 'ml', 'climate-risk': 'risk', 'research-practice': 'rp',
  'decision-support': 'dspt', 'climate-policy': 'pol', 'software-engineering': 'se',
  'advanced-ai': 'ai', 'capstone': 'cap',
};
const prefix = prefixes[folder];
if (!prefix) throw new Error('Subject is not in the canonical CGEI registry: ' + subjectId);
const module = findSubjectModule(subjectId);
const units = exportedArray(module.source, 'units');
const unitIds = arrayProperty(module.subject, 'unitIds');
const slug = code.trim().replace(/\./g, '-');
const unitId = 'cgei-' + prefix + '-unit-' + slug;
if (objectById(units, unitId) || arrayStrings(unitIds).includes(unitId)) throw new Error('Unit already exists: ' + unitId);
const orders = units.elements.filter(ts.isObjectLiteralExpression).map((element) => numberProperty(element, 'order') ?? 0);
const unitRecord = {
  id: unitId, code: code.trim(), title: arg('title') ?? 'TODO: unit title',
  order: Math.max(0, ...orders) + 1, kind: 'unit', readiness: 'planned',
  summary: arg('summary') ?? 'TODO: describe the unit scope and learning purpose.',
  prerequisites: [], outcomes: [], lessonIds: [], activityIds: [], assessmentIds: [], resourceIds: [], deliverableIds: [],
};
const updated = applyEdits(module.text, [
  appendArrayEdit(module.text, module.source, units, renderObject(unitRecord)),
  appendArrayEdit(module.text, module.source, unitIds, JSON.stringify(unitId)),
]);
writeFileSync(module.topicsPath, updated, 'utf8');
console.log('Added ' + unitId + ' directly to ' + module.topicsPath);
const generated = spawnSync('npm', ['run', 'generate:cgei-index'], { stdio: 'inherit', shell: process.platform === 'win32' });
if (generated.status !== 0) {
  console.error('Unit was written, but the generated navigation index did not refresh. Run npm run generate:cgei-index.');
  process.exit(generated.status ?? 1);
}
console.log('subject.unitIds and the generated navigation index were updated automatically.');
