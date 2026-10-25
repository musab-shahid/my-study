# CGEI TOC-to-App Coverage Audit (first-pass inventory)

> **Historical mapping baseline — not current main-branch status.** This inventory targets PR #3 and an older registry revision. Its source-node counts describe the extracted TOC, but its app-mapping counts are not a current-main snapshot. Run `npm run audit:cgei` for current implementation counts; this script intentionally does not claim source-subtopic completeness. For current authority rules, source fingerprint limitations, and TOC-change workflow, see [Source of truth and change control](SOURCE_OF_TRUTH_AND_CHANGE_CONTROL.md) and [Curriculum change register](CURRICULUM_CHANGE_REGISTER.csv).


**Status:** Inventory generated; mapping is deliberately incomplete.  
**Baseline source used:** user-supplied `Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path(1).docx`; external provenance/approval is not independently authenticated. See source-control document.  
**Repository target:** PR #3, `feat/cgei-full-curriculum-skeleton`  
**Audited registry revision:** `7d1d0b809c1e78c11d7e03687c4eb57230b0b49b`

## Source inventory

| Source level | Count |
|---|---:|
| Subjects | 14 |
| Units | 130 |
| Numbered topics | 567 |
| Numbered subtopics | 2,052 |
| **Total traceability rows** | **2,763** |

The source inventory was re-extracted on 2026-10-25 from the user-supplied baseline file `Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path(1).docx` (SHA-256 `3480f590c548d71abd5a5519eaa678ee1629831363a33b4c664b7d73e9318ebb`). Counting the numbered subject headings and Part II `Unit X.Y`, `X.Y.Z`, and `X.Y.Z.W` headings confirms 14 subjects, 130 units, 567 numbered topics, and 2,052 numbered subtopics (2,763 source traceability rows total). This resolves the prior 125-versus-130 unit discrepancy: 125 was the stale count. The full source DOCX is not tracked in the repository, and a complete 2,763-row source-to-app crosswalk has not been completed. These counts are a baseline fingerprint/reconciliation, not proof of source authenticity or implementation coverage.

## Current app mapping evidence

- Canonical `CurriculumSubject`: 1 (Subject 5, `cgei-subject-5-data-science`; readiness `review`).
- Canonical units mapped by code: 12 (5.1–5.12); unit readiness does not imply instructional completeness.
- Topic rows with an accepted first-pass lesson mapping: 2 (5.2.2 NumPy and 5.2.3 pandas).
- Subtopic rows with an accepted content/activity/assessment mapping: 0.
- Other topic rows are unresolved. For 50 Subject 5 topics, the CSV includes candidate lesson IDs as **review hints only**; they are not accepted mappings.
- Subjects 1–4 and 6–14 have no canonical subject/unit mapping accepted in this pass. Legacy sections or catalog shells are not counted as canonical curriculum coverage.

## CSV disposition rules

- `mapped_to_canonical_entity`: an existing canonical app entity was verified at the row's level.
- `missing_or_unresolved`: no accepted source-to-app mapping is established yet. This means “not yet proven,” not necessarily “no content exists.”
- `candidate_app_ids`: search hints based on title/structure. These are not mappings and must not be used as evidence of coverage.
- `mapping_confidence`: explicitly separates verified matches from candidate-only hints.
- Subtopics remain unresolved until each is traced to actual lesson content, an activity, an assessment, a resource, or a documented defer/combine/split decision.

## Important limitations

This is a traceability baseline, not a claim of curriculum completion. It intentionally does not infer that a lesson covers all of its parent's subtopics. It also does not set Priority Path metadata in the app schema/UI; the `priority` column records the source TOC's Core/Support/Optional tag for future implementation.

The source document's numbered topics and subtopics remain unchanged. A roadmap/overview is not converted into a lesson by this extraction.

## Next gates

1. Complete Subject 5 subtopic dispositions, beginning with Core units 5.2–5.6 and 5.11, while keeping Support/Optional scope visible.
2. Audit the split mapping in 5.1 and the topic-to-lesson candidates across 5.3–5.12.
3. Record combine/split/defer rationale and actual app IDs; keep candidate IDs separate until reviewed.
4. Add automated checks that reject missing Core topic mappings and reject `validated` readiness without content, practice/check, validator pass, and human review evidence.
5. Expand canonical mappings to other subjects only after the Subject 5 mapping rules are proven.


## Source authority and change-control clarification — 2026-10-25

The uploaded DOCX fingerprint is recorded in [Source of truth and change control](SOURCE_OF_TRUTH_AND_CHANGE_CONTROL.md). The original DOCX is not currently tracked in this repository, so its fingerprint identifies the supplied bytes but does not independently establish official approval or preserve the bytes for future recovery. Treat this file as a historical mapping baseline. Subject 5's 184 lowest-level rows match the extracted source count, but exact row order, parentage, titles, and any app-side reorganization still require explicit row-by-row verification. Do not update the source TOC silently to match implementation.
