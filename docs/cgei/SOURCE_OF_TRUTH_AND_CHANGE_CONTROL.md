# CGEI curriculum source of truth and change control

**Working location:** all current curriculum authoring and reconciliation happens on PR #9, branch `feat/cgei-full-curriculum-skeleton`. Do not merge this work to `main` as part of this audit.

## 1. Authority model

Keep these layers separate:

1. **Baseline source TOC** — the supplied document that defines the original intended hierarchy, wording, numbering, and Core/Support/Optional priorities.
2. **Revised canonical TOC** — a separately versioned proposal for approved curriculum changes. It must never overwrite the baseline.
3. **Application registry and lesson content** — what the product currently implements.
4. **Source-to-app crosswalk** — the explicit relationship between each baseline/revised TOC node and the implementation.
5. **Change register** — the reasoned record of additions, moves, splits, combinations, retirements, title edits, and unresolved discrepancies.

No layer silently substitutes for another. Registry presence, matching counts, green CI, or a traceability link alone does not prove instructional coverage or source fidelity.

## 2. Current baseline identity and limitations

The baseline used for the current count reconciliation is the user-supplied file:

- Filename: `Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path(1).docx`
- SHA-256: `3480f590c548d71abd5a5519eaa678ee1629831363a33b4c664b7d73e9318ebb`
- Extracted numbered hierarchy: 14 subjects, 130 units, 567 numbered topics, and 2,052 numbered subtopics (2,763 rows across those four levels).
- Subject 5 numbered hierarchy: 12 units, 51 numbered topics, 184 numbered subtopics (247 rows across those three levels).

**Important:** the DOCX itself is not currently tracked in this repository. The fingerprint identifies the exact supplied bytes used for the counts; it does not establish the document's external approval/provenance, and it does not make the original recoverable from this repository. Do not describe the source as independently authenticated. The next baseline-hardening step is to preserve the original file unchanged in repository history or an approved immutable source store, with its provenance and version recorded.

The original file's hierarchy is the comparison baseline until a revised TOC is explicitly approved. Do not edit it in place to make it agree with the app.

## 3. Subject 5: what is and is not established

`docs/cgei/subject-5-canonical-leaf-inventory.csv` currently contains 184 lowest-level rows and serves as a **working source-to-app crosswalk**, not as the source TOC itself.

The count of 184 matches the extracted count of Subject 5 numbered subtopics. This is only a count check. It does not prove that row order, exact titles, parent relationships, or all app-content organization match the source. Prior reviews corrected several evidence links; those changes did not approve a TOC restructure.

Until a full ID/title/parent/order comparison is recorded:
- keep original TOC IDs and titles as the baseline;
- treat app-side rearrangement as an implementation mapping, not as a source change;
- record any suspected split, merge, move, addition, or omission as `unresolved`;
- do not promote a suspected addition into the canonical TOC without a change-register entry and explicit review.

## 4. Disposition vocabulary

Use one of these dispositions in the crosswalk/change register:

- `unchanged` — source node and meaning retained.
- `reordered` — presentation order changed; learning outcome and node identity retained.
- `split` — one source node is represented by multiple app nodes or content blocks.
- `combined` — multiple source nodes are taught together; each source ID remains traceable.
- `added` — genuinely new learning content with no baseline source node.
- `retired` — a previously approved node intentionally removed from the revised TOC.
- `title_edit` — wording changed; explain whether meaning changed.
- `mapping_correction` — crosswalk evidence corrected without changing the source TOC.
- `unresolved` — insufficient evidence to decide.

A source row must never disappear merely because it is combined, split, moved, or not yet implemented. Preserve its original ID and record the disposition.

## 5. Controlled TOC revision policy

A TOC update is allowed when a genuine addition, correction, or pedagogically justified restructuring is confirmed. It must be a **new revision**, not a silent rewrite of the baseline.

For each proposed change, record:
- stable baseline source ID(s) and exact baseline title(s);
- proposed revised ID/title and parent;
- change type and rationale;
- whether the learning outcome, priority, prerequisite, or assessment expectation changes;
- affected app lesson/content/activity/assessment IDs;
- reviewer and review date;
- decision: proposed, accepted, rejected, or deferred.

Only accepted changes enter the revised canonical TOC. The original TOC remains unchanged and retrievable. Update the source manifest, crosswalk, and automated checks together.

## 6. Efficient workflow for content authored in PR #9

Use a small, repeatable vertical slice rather than mixing source reconciliation with broad lesson-writing:

1. **Pin the current inputs:** record PR #9 head SHA, source-file fingerprint, and affected source IDs.
2. **Reconcile source rows first:** compare exact IDs, titles, parent IDs, and order against the baseline. Do not infer equivalence from similar wording.
3. **Choose one unit/slice:** list in-scope Core/Support/Optional rows and explicitly state what is deferred.
4. **Write/improve content in PR #9:** connect each in-scope source row to the actual lesson block(s), learner activity, and assessment/check.
5. **Audit evidence semantically:** a block must teach the claimed outcome, not merely mention the same keyword. Keep partial status if practice, assessment, depth, or evidence is missing.
6. **Validate both directions:** every source row has a disposition, and every app addition has a source mapping or an accepted `added` record.
7. **Run scoped checks and CI:** report the exact tested commit. CI success verifies configured checks only, not full curriculum completeness or external scientific validity.
8. **Update the ledger and change register in the same work batch.**
9. **Review before readiness promotion:** no lesson becomes validated/released from a mapping/count/build result alone.

For future sessions, resume from the latest PR #9 head and these control documents; never treat a previous SHA or historical audit snapshot as current without rechecking it.

## 7. Acceptance gates for declaring the source of truth established

- [ ] Original DOCX is preserved unchanged in a durable, approved location and its provenance/version are documented.
- [ ] Baseline manifest includes filename, SHA-256, extraction method/version, and source counts.
- [ ] Every baseline node has a stable ID, exact title, parent, priority where applicable, and source order.
- [ ] Subject 5 is compared row-by-row at the lowest level; all rearrangements/additions/omissions are resolved or explicitly left unresolved.
- [ ] The complete 2,763-row hierarchy has an explicit source-to-app disposition; the source count is not mistaken for mapping coverage.
- [ ] Every approved change is versioned and has a change-register entry.
- [ ] Automated checks catch duplicate IDs, missing baseline rows, unregistered additions, invalid parentage, and stale source fingerprints.
- [ ] Documentation and checks have been reviewed on the exact PR #9 head before any merge decision.

Until these gates are satisfied, the correct status is **baseline identified and count-reconciled; full source-to-app authority and change history not yet established**.
