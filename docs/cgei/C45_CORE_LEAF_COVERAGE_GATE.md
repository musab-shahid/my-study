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
| mapped_partial | 754 |
| deferred | 27 |
| stale_mapping | 19 |
| unmapped | 209 |

Traceability ≠ mastery. Synthetic fixtures ≠ field validation.

## Integrity
Expanded activity/assessment integrity check across full `cgei-*-a-*` / `*assess*` namespaces. Added missing Unit 5.5 activity/assessment definitions referenced by lessons.

## Review-ready contract (not auto-promoted)
A lesson is **review-ready** only with: explanation+limits, worked reasoning, guided practice, independent practice, assessment criteria/key, source-leaf traceability, and human readiness evidence. `hasSubstantiveLessonContent` alone is insufficient.
