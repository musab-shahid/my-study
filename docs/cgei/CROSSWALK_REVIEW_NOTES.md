# Crosswalk review findings and corrections

This note supersedes the provisional topic-mapping counts in the first-pass audit where they relied on numeric-suffix candidate IDs.

## Corrections

- The source inventory has 2,763 rows: 14 subjects, 130 units, 567 topics, 2,052 subtopics.
- The downloadable full CSV had an exact-parent bug in its `unit_code` field: naive string-prefix matching confused unit `5.10` with `5.1`. The local downloadable artifact was corrected by deriving the parent from the first two path components. Integrity check: all 2,619 topic/subtopic rows now point to the exact parent unit. The full CSV is not yet committed as a repository/CI input.
- Numeric suffixes are not semantic mappings. Source topic `5.1.1 Calculus and linear algebra` is not lesson `cgei-ds-lesson-5-1-1`, which teaches quantities, units and dimensional analysis. The topic splits across lessons `5-1-2`, `5-1-3` and `5-1-4`, with remaining subtopic gaps.
- The first evidence-based crosswalk covers 24 topics in Units 5.1–5.5. See `SUBJECT_5_TOPIC_CROSSWALK.md` and `subject-5-topic-crosswalk.csv`.
- Topic-level alignment does not prove full subtopic coverage. All 2,052 source subtopics remain unresolved until linked to specific content blocks, activities, assessments, resources, or a documented disposition.

## Immediate next implementation gate

Complete the 184 Subject 5 subtopic dispositions for Units 5.1–5.5. Record exact lesson/content-block IDs only where actual content supports the subtopic; otherwise mark a specific gap, combine/split rationale, or deferral. Resolve the two clear coverage risks before widening scope: the incomplete distribution/non-parametric statistics topics in 5.4 and the missing dedicated large-data tools topic in 5.5.3.

Do not mark content validated based on title alignment, lesson ID existence, or CI alone.
