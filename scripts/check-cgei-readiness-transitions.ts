/**
 * Enforce unit completeness only when a unit or lesson readiness status moves
 * upward into review/validated/released. New draft content is never gated.
 *
 * GitHub Actions provides GITHUB_BASE_REF; local runs without it are no-ops.
 */
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import * as ts from 'typescript';

type Readiness = 'planned' | 'outlined' | 'draft' | 'review' | 'validated' | 'released';
interface RecordInfo { id: string; readiness: Readiness; lessonIds?: string[]; }
const rank: Record<Readiness, number> = {
  planned: 0, outlined: 1, draft: 2, review: 3, validated: 4, released: 5,
};

function git(args: string[]): string {
  const result = spawnSync('git', args, { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(result.stderr || `git ${args.join(' ')} failed`);
  return result.stdout.trim();
}
function readAt(ref: string, path: string): string {
  const result = spawnSync('git', ['show', `${ref}:${path}`], { encoding: 'utf8' });
  return result.status === 0 ? result.stdout : '';
}
function property(node: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  const item = node.properties.find((candidate): candidate is ts.PropertyAssignment =>
    ts.isPropertyAssignment(candidate) &&
    ((ts.isIdentifier(candidate.name) && candidate.name.text === name) ||
      (ts.isStringLiteral(candidate.name) && candidate.name.text === name)),
  );
  return item?.initializer;
}
function stringValue(node: ts.Expression | undefined): string | undefined {
  return node && ts.isStringLiteralLike(node) ? node.text : undefined;
}
function parseRecords(text: string, file: string, variable: 'units' | 'lessons'): RecordInfo[] {
  if (!text) return [];
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let array: ts.ArrayLiteralExpression | undefined;
  const visit = (node: ts.Node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === variable &&
        node.initializer && ts.isArrayLiteralExpression(node.initializer)) array = node.initializer;
    ts.forEachChild(node, visit);
  };
  visit(source);
  if (!array) return [];
  return array.elements.filter(ts.isObjectLiteralExpression).flatMap((item) => {
    const id = stringValue(property(item, 'id'));
    const readiness = stringValue(property(item, 'readiness')) ?? 'planned';
    if (!id || !(readiness in rank)) return [];
    const lessonIdsNode = property(item, 'lessonIds');
    const lessonIds = lessonIdsNode && ts.isArrayLiteralExpression(lessonIdsNode)
      ? lessonIdsNode.elements.map(stringValue).filter((value): value is string => Boolean(value))
      : undefined;
    return [{ id, readiness: readiness as Readiness, lessonIds }];
  });
}
function promotionTarget(previous: Readiness | undefined, next: Readiness): 'review' | 'validated' | undefined {
  const previousRank = previous ? rank[previous] : -1;
  if (rank[next] <= previousRank || rank[next] < rank.review) return undefined;
  return rank[next] >= rank.validated ? 'validated' : 'review';
}

const baseRef = process.env.GITHUB_BASE_REF;
if (!baseRef) {
  console.log('No PR base ref; readiness-transition gate is skipped outside pull requests.');
} else {
  const base = `origin/${baseRef}`;
  const changed = git(['diff', '--name-only', `${base}...HEAD`, '--', 'src/data/cgei'])
    .split('\n')
    .filter((path) => /^src\/data\/cgei\/[^/]+\/topics-[^/]+\.ts$/.test(path));
  const promotions = new Map<string, 'review' | 'validated'>();

  for (const path of changed) {
    const beforeText = readAt(base, path);
    const afterText = readFileSync(path, 'utf8');
    const beforeUnits = parseRecords(beforeText, path, 'units');
    const afterUnits = parseRecords(afterText, path, 'units');
    const beforeLessons = parseRecords(beforeText, path, 'lessons');
    const afterLessons = parseRecords(afterText, path, 'lessons');
    const oldUnits = new Map(beforeUnits.map((item) => [item.id, item] as const));
    const newUnits = new Map(afterUnits.map((item) => [item.id, item] as const));
    const oldLessons = new Map(beforeLessons.map((item) => [item.id, item] as const));

    for (const unit of afterUnits) {
      const target = promotionTarget(oldUnits.get(unit.id)?.readiness, unit.readiness);
      if (target) promotions.set(unit.id, target);
    }
    for (const lesson of afterLessons) {
      const target = promotionTarget(oldLessons.get(lesson.id)?.readiness, lesson.readiness);
      if (!target) continue;
      const parent = afterUnits.find((unit) => unit.lessonIds?.includes(lesson.id));
      if (!parent) throw new Error(`Lesson ${lesson.id} readiness changed but no unit references it`);
      const prior = promotions.get(parent.id);
      promotions.set(parent.id, prior === 'validated' || target === 'validated' ? 'validated' : 'review');
    }
  }

  if (!promotions.size) {
    console.log('No readiness promotion into review/validated detected; draft authoring is not gated.');
  } else {
    for (const [unitId, target] of promotions) {
      console.log(`Checking readiness promotion for ${unitId} -> ${target}`);
      const result = spawnSync('npm', ['run', 'report:cgei-unit', '--', '--unit', unitId, '--to', target], {
        stdio: 'inherit',
        shell: process.platform === 'win32',
      });
      if (result.status !== 0) process.exit(result.status ?? 1);
    }
  }
}
