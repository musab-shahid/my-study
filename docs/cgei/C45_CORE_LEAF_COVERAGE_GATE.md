# C.45 — Core-leaf coverage gate and referential integrity

## Baseline
- **main:** `03ace1741084ae7a6befafcb9cc8922ca9cd89d4` (CI: check, scientific-smoke, e2e success)
- **Source DOCX:** `Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path.docx`
- **SHA-256:** `3480f590c548d71abd5a5519eaa678ee1629831363a33b4c664b7d73e9318ebb`
- **Authority:** Matches existing `SOURCE_TOC_BASELINE_MANIFEST.json` fingerprint. Independently authenticated institutional approval is **not** claimed; treat as the project’s pinned working baseline.

## Regeneration
```bash
python3 scripts/audit-cgei-toc-source.py \
  --toc /path/to/Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path.docx \
  --output docs/cgei/source-toc/priority-path-source-rows.csv \
  --expected-sha256 3480f590c548d71abd5a5519eaa678ee1629831363a33b4c664b7d73e9318ebb

python3 scripts/audit_core_leaf_coverage.py --allow-unmapped   # transitional report
python3 scripts/audit_core_leaf_coverage.py                   # strict: fail on unmapped/stale
python3 content-drafts/chapter-05-scientific-computing/fixtures/curriculum_activity_assessment_integrity_check.py
python3 scripts/tests/test_audit_core_leaf_coverage.py
```

## Snapshot (this cycle)
| Metric | Count |
|--------|------:|
| Core subtopic leaves | 1015 |
| mapped | 6 |
| mapped_partial | 773 |
| deferred | 29 |
| stale_mapping | 0 |
| unmapped | 207 |

### C.46 audit correction

The first real-data run found 19 apparent stale mappings, all in Subject 5.5. They were false positives: the canonical curriculum registry stores lesson records with JSON-style `"id"` keys, while the classifier initially recognized only unquoted TypeScript `id:` keys. The classifier now recognizes both forms, with a regression test for JSON-style records. Re-running the audit against the checked-out repository succeeds in transitional mode with **0 stale lesson-ID references**; the 19 rows are correctly `mapped_partial`, not `stale_mapping`. The **207 unmapped Core leaves remain unresolved traceability gaps** after two Subject 3.1 leaves were explicitly dispositioned as deferred; no coverage was inferred from similar wording.

Traceability ≠ mastery. Synthetic fixtures ≠ field validation.

## Integrity
Expanded activity/assessment integrity check across full `cgei-*-a-*` / `*assess*` namespaces. Added missing Unit 5.5 activity/assessment definitions referenced by lessons.

## Review-ready contract (not auto-promoted)
A lesson is **review-ready** only with: explanation+limits, worked reasoning, guided practice, independent practice, assessment criteria/key, source-leaf traceability, and human readiness evidence. `hasSubstantiveLessonContent` alone is insufficient.


### C.47 strict-gate verification and reconciliation pilot

The Subject 3.1 traceability registry now explicitly records source leaves 3.1.1.5 and 3.1.1.6 as deferred because the current lesson evidence does not teach the stated data-model and raster-grid conventions. The generated report links both rows to `subject-3-unit-3.1-subtopic-traceability.csv`.

CI runs the transitional audit to regenerate the report, then runs the strict audit against the same repository data and asserts the expected blocking result: exit code 1, 207 unmapped Core leaves, and 0 stale lesson-ID references. This is an expected-failure assertion, not a waiver; strict coverage remains blocked until unmapped leaves receive evidence-based dispositions. The report artifact is uploaded after both runs.

## Current-main snapshot (2026-10-26, post-PR #137 + Unit 6.1 refresh)

Historical counts above remain valid for their recorded baselines. Regenerated on branch `feat/cgei-subject6-core-slice` after rebase onto `15fff7f`:

* Run `python scripts/audit_core_leaf_coverage.py` for live denominators.
* Do not promote `mapped_partial` to `mapped` without full instructional contract evidence.
* Issue #104 remains open until acceptance criteria beyond structural disposition are met.
