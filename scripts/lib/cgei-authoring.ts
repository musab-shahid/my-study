import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as ts from 'typescript';

export const CGEI_ROOT = resolve(process.cwd(), 'src/data/cgei');
export interface SubjectModule { folder: string; topicsPath: string; text: string; source: ts.SourceFile; subject: ts.ObjectLiteralExpression; }
export interface LocatedUnit extends SubjectModule { unit: ts.ObjectLiteralExpression; }

function unwrap(expression: ts.Expression): ts.Expression {
  let current = expression;
  while (ts.isAsExpression(current) || ts.isSatisfiesExpression(current) || ts.isParenthesizedExpression(current) || ts.isTypeAssertionExpression(current)) current = current.expression;
  return current;
}
function propertyName(name: ts.PropertyName | undefined): string | undefined {
  return name && (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) ? name.text : undefined;
}
export function property(object: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  const item = object.properties.find((candidate) => ts.isPropertyAssignment(candidate) && propertyName(candidate.name) === name);
  return item && ts.isPropertyAssignment(item) ? item.initializer : undefined;
}
export function stringProperty(object: ts.ObjectLiteralExpression, name: string): string | undefined {
  const value = property(object, name);
  return value && ts.isStringLiteralLike(value) ? value.text : undefined;
}
export function numberProperty(object: ts.ObjectLiteralExpression, name: string): number | undefined {
  const value = property(object, name);
  return value && ts.isNumericLiteral(value) ? Number(value.text) : undefined;
}
export function arrayProperty(object: ts.ObjectLiteralExpression, name: string): ts.ArrayLiteralExpression {
  const value = property(object, name);
  if (!value || !ts.isArrayLiteralExpression(value)) throw new Error('Expected ' + name + ' to be an array in the canonical topics module.');
  return value;
}
export function exportedArray(source: ts.SourceFile, name: string): ts.ArrayLiteralExpression {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === name && declaration.initializer) {
        const initializer = unwrap(declaration.initializer);
        if (ts.isArrayLiteralExpression(initializer)) return initializer;
      }
    }
  }
  throw new Error('Could not find exported ' + name + ' array.');
}
export function objectById(array: ts.ArrayLiteralExpression, id: string): ts.ObjectLiteralExpression | undefined {
  return array.elements.find((element) => ts.isObjectLiteralExpression(element) && stringProperty(element, 'id') === id) as ts.ObjectLiteralExpression | undefined;
}
export function arrayStrings(array: ts.ArrayLiteralExpression): string[] {
  return array.elements.filter(ts.isStringLiteralLike).map((element) => element.text);
}
export function renderObject(value: unknown): string {
  return JSON.stringify(value, null, 2).split('\n').map((line) => '  ' + line).join('\n');
}
export interface TextEdit { start: number; end: number; content: string }
export function appendArrayEdit(text: string, source: ts.SourceFile, array: ts.ArrayLiteralExpression, value: string): TextEdit {
  const close = array.end - 1;
  let start = close;
  const arrayStart = array.getStart(source);
  while (start > arrayStart + 1 && /\s/.test(text[start - 1])) start -= 1;
  const before = text.slice(arrayStart, start).trimEnd();
  const comma = array.elements.length > 0 && !before.endsWith(',') ? ',' : '';
  return { start, end: close, content: comma + '\n' + value + '\n' };
}
export function applyEdits(text: string, edits: TextEdit[]): string {
  const ordered = [...edits].sort((a, b) => b.start - a.start);
  let output = text;
  let previousStart = Number.POSITIVE_INFINITY;
  for (const edit of ordered) {
    if (edit.end > previousStart) throw new Error('Overlapping authoring edits; refusing to write.');
    output = output.slice(0, edit.start) + edit.content + output.slice(edit.end);
    previousStart = edit.start;
  }
  return output;
}
function objectByDeclaration(source: ts.SourceFile, name: string): ts.ObjectLiteralExpression | undefined {
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === name && declaration.initializer) {
        const initializer = unwrap(declaration.initializer);
        if (ts.isObjectLiteralExpression(initializer)) return initializer;
      }
    }
  }
  return undefined;
}
export function listSubjectModules(): SubjectModule[] {
  const modules: SubjectModule[] = [];
  for (const entry of readdirSync(CGEI_ROOT, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const topicsPath = join(CGEI_ROOT, entry.name, 'topics-' + entry.name + '.ts');
    if (!existsSync(topicsPath)) continue;
    const text = readFileSync(topicsPath, 'utf8');
    const source = ts.createSourceFile(topicsPath, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const subject = objectByDeclaration(source, 'subject');
    if (subject) modules.push({ folder: entry.name, topicsPath, text, source, subject });
  }
  return modules;
}
export function findSubjectModule(subjectId: string): SubjectModule {
  const found = listSubjectModules().find((module) => stringProperty(module.subject, 'subjectId') === subjectId);
  if (!found) throw new Error('Unknown canonical CGEI subject: ' + subjectId);
  return found;
}
export function findUnit(unitId: string): LocatedUnit {
  for (const module of listSubjectModules()) {
    const unit = objectById(exportedArray(module.source, 'units'), unitId);
    if (unit) return { ...module, unit };
  }
  throw new Error('Unknown canonical CGEI unit: ' + unitId);
}
export function findLesson(lessonId: string): LocatedUnit & { lesson: ts.ObjectLiteralExpression } {
  for (const module of listSubjectModules()) {
    const lesson = objectById(exportedArray(module.source, 'lessons'), lessonId);
    if (!lesson) continue;
    const unit = exportedArray(module.source, 'units').elements.find((element) =>
      ts.isObjectLiteralExpression(element) && arrayStrings(arrayProperty(element, 'lessonIds')).includes(lessonId)) as ts.ObjectLiteralExpression | undefined;
    if (!unit) throw new Error('Lesson ' + lessonId + ' is not listed in any unit.lessonIds array.');
    return { ...module, unit, lesson };
  }
  throw new Error('Unknown canonical CGEI lesson: ' + lessonId);
}
