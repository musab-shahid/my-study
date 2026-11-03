import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const workflow = readFileSync(join(root, '.github/workflows/ci.yml'), 'utf8');

const delegatedChecks = {
  'check:design-system': {
    file: '.github/workflows/ci.yml',
    marker: 'node scripts/check-design-system.mjs',
    reason: 'CI runs the underlying ratchet and PR-diff commands directly so it can supply the correct comparison base.',
  },
  'check:perf-gate': {
    file: '.github/workflows/ci.yml',
    marker: 'node scripts/run-lighthouse-ci.mjs',
    reason: 'CI runs the underlying Lighthouse gate directly after its production build.',
  },
  'check:cgei-legacy-freeze': {
    file: '.github/workflows/ci.yml',
    marker: 'scripts/check-cgei-legacy-freeze.sh',
    reason: 'CI supplies BASE_REF to the shell implementation directly.',
  },
  'check:cgei-index': {
    file: 'scripts/check-cgei.mjs',
    marker: "['npm', ['run', 'check:cgei-index']]",
    reason: 'Delegated to the unified check:cgei gate.',
  },
  'check:cgei-registry': {
    file: 'scripts/check-cgei.mjs',
    marker: "['npm', ['run', 'check:cgei-registry']]",
    reason: 'Delegated to the unified check:cgei gate.',
  },
  'check:cgei-readiness-transitions': {
    file: 'scripts/check-cgei.mjs',
    marker: "['npm', ['run', 'check:cgei-readiness-transitions']]",
    reason: 'Delegated to the unified check:cgei gate.',
  },
  'check:cgei-sync': {
    file: 'scripts/check-cgei.mjs',
    marker: "['npm', ['run', 'check:cgei-sync']]",
    reason: 'Delegated to the unified check:cgei gate.',
  },
  'check:cgei-question-ids': {
    file: 'scripts/check-cgei.mjs',
    marker: "['npm', ['run', 'check:cgei-question-ids']]",
    reason: 'Delegated to the unified check:cgei gate.',
  },
  'check:cgei-subject-boundary': {
    file: 'scripts/check-cgei.mjs',
    marker: "['node', ['scripts/check-cgei-subject-boundary.mjs']]",
    reason: 'Delegated to the unified check:cgei gate.',
  },
  'check:cgei-authoring': {
    file: 'scripts/check-cgei.mjs',
    marker: "['node', ['scripts/check-cgei-authoring.mjs']]",
    reason: 'Delegated to the unified check:cgei gate.',
  },
};

const checkScripts = Object.keys(packageJson.scripts ?? {}).filter(
  (name) => name === 'check' || name.startsWith('check:'),
);
const violations = [];

if (!workflow.includes('node scripts/check-ci-gate-coverage.mjs')) {
  violations.push('The CI workflow does not run this gate-coverage meta-test.');
}

for (const name of checkScripts) {
  if (workflow.includes(`npm run ${name}`)) continue;

  const delegation = delegatedChecks[name];
  if (!delegation) {
    violations.push(`${name} is neither invoked directly by CI nor documented as a delegated check.`);
    continue;
  }

  if (!delegation.reason.trim()) {
    violations.push(`${name} has no documented reason for its CI delegation.`);
  }
  const source = readFileSync(join(root, delegation.file), 'utf8');
  if (!source.includes(delegation.marker)) {
    violations.push(`${name} delegation marker is missing from ${delegation.file}.`);
  }
}

for (const name of Object.keys(delegatedChecks)) {
  if (!checkScripts.includes(name)) {
    violations.push(`Stale CI delegation entry for removed script ${name}.`);
  }
}

if (violations.length) {
  console.error('CI check-script coverage drift detected:');
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(`CI check-script coverage passed (${checkScripts.length} scripts accounted for).`);
