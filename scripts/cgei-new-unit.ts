/**
 * Phase D — scaffold a draft unit shell and traceability note. No fake fixture is created.
 *
 *   npm run new:unit -- --subject cgei-data-science --code 5.13 --title "My unit"
 *
 * Creates:
 *   - content-drafts/.../fixtures/unit_<code>_stub_check.py (minimal pass)
 *   - docs/cgei/unit-<code>-traceability-stub.csv
 *   - prints the topics-<subject>.ts unit object to paste (does not auto-edit large modules)
 */
import { writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

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
  const prefixes: Record<string, string> = {
    'cgei-env-systems': 'cgei-es',
    'cgei-climate-science': 'cgei-cl',
    'cgei-geospatial': 'cgei-geo',
    'cgei-remote-sensing': 'cgei-rs',
    'cgei-data-science': 'cgei-ds',
    'cgei-ml-geoai': 'cgei-ml',
    'cgei-climate-risk': 'cgei-risk',
    'cgei-research-practice': 'cgei-rp',
    'cgei-decision-support': 'cgei-dspt',
    'cgei-climate-policy': 'cgei-pol',
    'cgei-software-engineering': 'cgei-se',
    'cgei-advanced-ai': 'cgei-ai',
    'cgei-capstone': 'cgei-cap',
  };
  const prefix = prefixes[subject];
  if (!prefix) throw new Error(`Unsupported canonical CGEI subject: ${subject}`);
  const unitId = `${prefix}-unit-${codeSlug}`;

  // Never create a passing placeholder fixture. Scientific-smoke only discovers
  // executable unit_*_check.py files with real assertions.
  console.log('No fixture stub created. Add a real unit_*_check.py only when it contains executable checks.');

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
