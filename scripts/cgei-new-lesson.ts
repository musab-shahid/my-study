import { writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { arrayProperty, arrayStrings, appendArrayEdit, applyEdits, exportedArray, findUnit, renderObject } from './lib/cgei-authoring';

function arg(name: string): string | undefined {
  const index = process.argv.indexOf('--' + name);
  return index >= 0 && process.argv[index + 1] && !process.argv[index + 1].startsWith('--') ? process.argv[index + 1] : undefined;
}
const unitId = arg('unit');
if (!unitId) {
  console.error('Usage: npm run new:lesson -- --unit <canonical-unit-id> --title "Lesson title"');
  process.exit(2);
}
const module = findUnit(unitId);
const lessonIds = arrayProperty(module.unit, 'lessonIds');
const existingIds = arrayStrings(lessonIds);
const nextOrder = existingIds.length + 1;
const lessonId = unitId.replace(/-unit-/, '-lesson-') + '-' + nextOrder;
if (existingIds.includes(lessonId)) throw new Error('Lesson already exists: ' + lessonId);
const lessons = exportedArray(module.source, 'lessons');
const lessonRecord = {
  id: lessonId, kind: 'lesson', title: arg('title') ?? 'TODO: lesson title',
  order: nextOrder, readiness: 'draft', level: 'L3',
  estimatedMinutes: Number(arg('minutes') ?? 45),
  objectives: [{
    id: lessonId + '-o1', statement: 'TODO: add one measurable learning objective.',
    action: 'TODO: observable action', level: 'L3', competencyIds: [],
  }],
  content: [
    { id: lessonId + '-b1', kind: 'prose', body: 'TODO: teach the concept, assumptions and units.' },
    { id: lessonId + '-b2', kind: 'worked-example', body: 'TODO: add a complete worked example with checked reasoning.' },
  ],
  activityIds: [], assessmentIds: [], resourceIds: [],
};
if (!Number.isFinite(lessonRecord.estimatedMinutes) || lessonRecord.estimatedMinutes < 1) throw new Error('--minutes must be a positive number.');
const updated = applyEdits(module.text, [
  appendArrayEdit(module.text, module.source, lessons, renderObject(lessonRecord)),
  appendArrayEdit(module.text, module.source, lessonIds, JSON.stringify(lessonId)),
]);
writeFileSync(module.topicsPath, updated, 'utf8');
console.log('Added ' + lessonId + ' to ' + module.topicsPath);
const generated = spawnSync('npm', ['run', 'generate:cgei-index'], { stdio: 'inherit', shell: process.platform === 'win32' });
if (generated.status !== 0) {
  console.error('Lesson and unit.lessonIds were written, but the generated index did not refresh. Run npm run generate:cgei-index.');
  process.exit(generated.status ?? 1);
}
console.log('unit.lessonIds and the generated navigation index were updated automatically.');
