/**
 * Phase D — scaffold stubs for a new unit (topics note + fixture + traceability).
 *
 *   npm run new:unit -- --subject cgei-data-science --code 5.13 --title "My unit"
 *
 * Creates:
 *   - content-drafts/.../fixtures/unit_<code>_stub_check.py (minimal pass)
 *   - docs/cgei/unit-<code>-traceability-stub.csv
 *   - prints the topics-<subject>.ts unit object to paste (does not auto-edit large modules)
 */
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  if (i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--')) {
    return process.argv[i + 1];
  }
  return undefined;
}

function main(): void {
  const subject = arg('subject');
  const code = arg('code');
  const title = arg('title') ?? 'TODO unit title';
  if (!subject || !code) {
    console.error('Usage: npm run new:unit -- --subject cgei-data-science --code 5.13 [--title "..."]');
    process.exit(2);
  }

  const codeSlug = code.replace(/\./g, '-');
  const unitId = subject.replace('cgei-', 'cgei-').includes('data-science')
    ? `cgei-ds-unit-${codeSlug}`
    : `${subject.replace(/^cgei-/, 'cgei-')}-unit-${codeSlug}`;

  // Fixture stub
  const fixtureDir = resolve(
    process.cwd(),
    'content-drafts/chapter-05-scientific-computing/fixtures',
  );
  mkdirSync(fixtureDir, { recursive: true });
  const fixturePath = join(fixtureDir, `unit_${codeSlug.replace(/-/g, '_')}_stub_check.py`);
  if (!existsSync(fixturePath)) {
    writeFileSync(
      fixturePath,
      `"""Stub fixture for unit ${code}. Replace with real numerical checks before review."""\n\ndef main() -> None:\n    print("Unit ${code} stub fixture OK (replace with real assertions).")\n\n\nif __name__ == "__main__":\n    main()\n`,
      'utf8',
    );
    console.log('Wrote', fixturePath);
  } else {
    console.log('Fixture exists', fixturePath);
  }

  // Traceability stub
  const tracePath = resolve(process.cwd(), 'docs/cgei', `unit-${codeSlug}-traceability-stub.csv`);
  if (!existsSync(tracePath)) {
    writeFileSync(
      tracePath,
      'source_subtopic_path,source_subtopic_title,priority,app_lesson_id,disposition,evidence_note\n'
      + `${code}.1,TODO source leaf,Core,,unmapped,Phase D stub — map when lesson exists\n`,
      'utf8',
    );
    console.log('Wrote', tracePath);
  }

  console.log('\nPaste this unit shell into topics-<subject>.ts (units array) and wire subject.unitIds:\n');
  console.log(`{
  "id": "${unitId}",
  "code": "${code}",
  "title": ${JSON.stringify(title)},
  "readiness": "draft",
  "lessonIds": [],
  "activityIds": [],
  "assessmentIds": [],
  "resourceIds": [],
  "deliverableIds": [],
  "outcomes": []
}`);
  console.log('\nThen: npm run new:lesson -- --unit', unitId);
  console.log('PR checklist: docs/cgei/UNIT_PR_CHECKLIST.md');
}

main();
