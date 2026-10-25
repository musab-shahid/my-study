# Subject 5 Source-to-App Reconciliation — Cycle C.28

**Date:** 2026-10-25  
**PR head:** `d7484eb682c08a7d1e7a43eee59700abd4ca5b50`  
**PR:** #9 (open, unmerged)

## Inputs

| Input | Identity |
|-------|----------|
| Baseline DOCX | `Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path.docx` |
| DOCX SHA-256 | `3480f590c548d71abd5a5519eaa678ee1629831363a33b4c664b7d73e9318ebb` |
| Audit script | `scripts/audit-cgei-toc-source.py` |
| Crosswalk | `docs/cgei/subject-5-canonical-leaf-inventory.csv` |

## Command

```bash
python3 scripts/audit-cgei-toc-source.py \
  --toc "/path/to/Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path.docx" \
  --output /tmp/cgei-source-toc-baseline.csv \
  --subject5-crosswalk docs/cgei/subject-5-canonical-leaf-inventory.csv
```

**Exit code:** 0

**Script summary:** Subject 5 leaf IDs, exact TOC titles, row count, and order match the baseline. Does not verify app-content semantics or readiness.

## Hierarchy counts (source extraction)

| Level | Count |
|-------|------:|
| Subjects | 14 |
| Units | 130 |
| Numbered topics | 567 |
| Numbered subtopics | 2,052 |
| Total hierarchy rows | 2,763 |
| Subject 5 units | 12 |
| Subject 5 topics | 51 |
| Subject 5 leaf subtopics | 184 |

## Row-level Subject 5 comparison

**Denominator:** 184 source leaf subtopics under Subject 5.

| Measure | Result |
|---------|-------:|
| Crosswalk rows | 184 |
| Source IDs missing from crosswalk | 0 |
| Crosswalk IDs absent from source | 0 |
| Duplicate leaf IDs | 0 |
| Exact source-title mismatches | 0 |
| Source-vs-crosswalk order differences | 0 |
| Parent/section prefix disagreements | 0 |
| **Exact ID + title + order matches** | **184 / 184** |
| **Match rate** | **100%** |

### Classification of all 184 leaves

| Class | Count | Disposition |
|-------|------:|-------------|
| Exact source-to-crosswalk match (ID, title, order) | 184 | Retain mapping |
| Crosswalk defect | 0 | — |
| Extra / missing ID | 0 | — |
| Title mismatch | 0 | — |
| Potential curriculum revision | 0 | No register entry |
| Unresolved | 0 | — |

## What this does **not** establish

- Instructional completeness or mastery (most leaves remain `mapped_partial` in the crosswalk).
- App lesson/block semantic correctness beyond ID presence in the inventory columns.
- External provenance/approval of the DOCX.
- That teaching content implements every leaf at Core depth.

## Change-control outcome

- Original TOC baseline: **unchanged**.
- Crosswalk: **no corrections required**.
- Curriculum change register: **no new entries**.
- Revised TOC: **not created**.
