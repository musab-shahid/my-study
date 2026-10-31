import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { cgeiCurriculum } from '../../data/cgei/curriculum.ts';
import {
  buildRegistryManifest,
  diffRegistryManifests,
  type RegistryManifest,
} from '../../../scripts/lib/cgei-registry-manifest.ts';

const MANIFEST_PATH = resolve(process.cwd(), 'docs/cgei/registry-manifest.json');
const BASELINE_PATH = resolve(process.cwd(), 'docs/cgei/structure-baseline.json');

describe('CGEI golden registry manifest', () => {
  it('is deterministic for a given registry value', () => {
    const a = buildRegistryManifest(cgeiCurriculum, '2026-01-01T00:00:00.000Z');
    const b = buildRegistryManifest(cgeiCurriculum, '2026-01-01T00:00:00.000Z');
    assert.deepEqual(a, b);
    assert.ok(a.counts.lessons > 0);
    assert.equal(a.arrays.lessonIds.length, a.counts.lessons);
    assert.ok(Object.keys(a.entityHashes).length >= a.counts.lessons);
  });

  it('satisfies the structure-baseline ratchet (counts may grow, never shrink)', () => {
    const live = buildRegistryManifest(cgeiCurriculum, '2026-01-01T00:00:00.000Z');
    const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8')) as {
      subjects: number;
      units: number;
      lessons: number;
      questions: number;
    };
    // subjects in the registry object may be 13 (curriculum subjects) while
    // structure-baseline.subjects counts app track domains (14).
    assert.ok(live.counts.units >= baseline.units, `units ${live.counts.units} < ${baseline.units}`);
    assert.ok(live.counts.lessons >= baseline.lessons, `lessons ${live.counts.lessons} < ${baseline.lessons}`);
    assert.ok(live.counts.questions >= baseline.questions, `questions ${live.counts.questions} < ${baseline.questions}`);
    assert.equal(new Set(live.arrays.lessonIds).size, live.counts.lessons);
    assert.equal(new Set(live.arrays.unitIds).size, live.counts.units);
  });

  (process.env.CHECK_CGEI_GOLDEN === '1' || process.env.UPDATE_CGEI_MANIFEST === '1' ? it : it.skip)('matches the committed manifest when explicitly requested (ID order and entity hashes)', () => {
    const live = buildRegistryManifest(cgeiCurriculum, '2026-01-01T00:00:00.000Z');

    if (process.env.UPDATE_CGEI_MANIFEST === '1') {
      writeFileSync(MANIFEST_PATH, `${JSON.stringify(live, null, 2)}\n`, 'utf8');
      console.log(`Updated ${MANIFEST_PATH}`);
      return;
    }

    if (!existsSync(MANIFEST_PATH)) {
      assert.fail(
        `Missing ${MANIFEST_PATH}. Run: npm run snapshot:cgei-registry`,
      );
    }

    const committed = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as RegistryManifest;
    // Placeholder seed: tooling is in place; full golden file is produced by snapshot:cgei-registry.
    if (committed.counts.lessons === 0) {
      console.log(
        'registry-manifest.json is a placeholder — run npm run snapshot:cgei-registry to seal the golden file',
      );
      return;
    }

    const lines = diffRegistryManifests(
      { ...committed, generatedAt: live.generatedAt },
      live,
    );
    assert.equal(
      lines.length,
      0,
      `Registry manifest drift:\n${lines.slice(0, 40).join('\n')}${lines.length > 40 ? `\n… +${lines.length - 40} more` : ''}`,
    );
  });
});
