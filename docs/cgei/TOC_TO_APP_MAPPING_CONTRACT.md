# CGEI TOC-to-App Mapping Contract

**Status:** Proposed implementation contract; use on PR #3 before expanding the registry.  
**Source of truth:** Master Study TOC, Climate & Geospatial Intelligence Priority Path.  
**Scope:** Traceability and semantics, not a declaration that the curriculum is complete.

## 1. Two linked registries, not one overloaded hierarchy

Keep the learner-facing instructional hierarchy as:

`Track → Subject → Unit → Lesson`

Keep source provenance as a parallel graph:

`TOC subject path → TOC unit path → TOC topic path → TOC subtopic path`

A source node may map to a canonical instructional entity, to a content block within a lesson, to a practice/assessment/resource, or to an explicitly documented disposition. Do not force every source node to become a new UI node.

## 2. Required source provenance

Every mapped or dispositioned source item must retain:

- `sourceDocument` — canonical source filename/version.
- `sourcePath` — stable dotted TOC path, e.g. `5.2.3.2`.
- `sourceLevel` — `subject | unit | topic | subtopic`.
- `sourceTitle` — verbatim source title.
- `sourcePriority` — source priority tag when present: `Core | Support | Optional`.
- `disposition` — `mapped_entity | mapped_content | combined | split | deferred | not_applicable | unresolved`.
- `mappingRationale` for any combine, split, defer, or non-obvious mapping.
- `mappingEvidence` identifying the canonical IDs and content blocks that actually cover the source item.

The stable `sourcePath` is the primary join key; titles alone are not reliable identifiers. Keep existing canonical IDs stable. If one lesson covers several TOC topics, retain a mapping row for every source topic. If one topic requires multiple lessons, record all destinations against the same source path with an explicit split rationale.

## 3. Semantics and mapping rules

- A subject overview, roadmap, or orientation is not a normal teaching lesson. Model it as subject metadata or an explicit `orientation` node when the UI needs a navigable orientation.
- A unit introduction and outcomes are unit-level orientation material unless they teach a substantive concept that warrants a lesson.
- A TOC topic maps to a lesson only when it represents teachable content with explicit learning objectives and actual instructional content.
- A subtopic may map to a content block, a lesson, an activity, an assessment, or a documented disposition. It is not considered covered merely because its parent topic has a lesson.
- Practice items should map to activities/labs; checks of learning should map to assessments/questions; portfolio outputs should map to deliverables/projects.
- A candidate title match is not accepted evidence. Verify source path, semantics, content, and linked practice/assessment before changing disposition to mapped.
- Source priority remains independent from readiness. Core/Support/Optional describe curricular priority; planned/draft/review/validated/released describe implementation quality.
- `validated` requires actual content and checks, not just a populated title or stable ID.

## 4. Coverage statuses and confidence

Use these distinctions consistently:

| Disposition | Meaning |
|---|---|
| `mapped_entity` | Source item maps to a verified canonical entity. |
| `mapped_content` | Source item is explicitly taught in identified content blocks or linked instructional artifacts. |
| `combined` | Source item is covered together with other items; rationale and all source paths retained. |
| `split` | Source item is taught across multiple destinations; all destination IDs retained. |
| `deferred` | Deliberately not taught in the current release; reason and target milestone required. |
| `not_applicable` | Explicitly justified as not instructional content, with reviewer sign-off. |
| `unresolved` | Mapping has not been proven. This is a gap, not coverage. |

Mapping confidence is separate: `verified`, `candidate`, or `none`. Candidate mappings never count toward coverage.

## 5. Subject 5 pilot order

1. Resolve all Core topic paths for Units 5.1–5.12.
2. For every Core topic, disposition every child subtopic against actual content blocks, activity, assessment, resource, or deliverable.
3. Review Support and Optional items; retain their scope and rationale rather than silently omitting them.
4. Explicitly audit the Unit 5.1 compatibility bridge and check that legacy topic IDs are preserved where required.
5. Review candidate lesson matches for Units 5.2–5.12 manually before accepting them.
6. Only after review, use the verified mappings as the pattern for the other 13 subjects.

## 6. Automated acceptance checks

The implementation should fail validation when:

- A source path is duplicated for the same source document and version.
- A source item references a nonexistent canonical ID or content-block ID.
- A `mapped_*`, `combined`, or `split` disposition lacks evidence.
- A `combined` or `split` disposition lacks a rationale and complete source/destination links.
- A Core item remains unresolved while the subject/unit is claimed as complete.
- A lesson is marked `validated` without substantive content and linked practice or assessment evidence appropriate to its objectives.
- A roadmap/overview is represented as a normal lesson without substantive instructional objectives/content.
- Source priority is incorrectly used as implementation readiness, or vice versa.

Validation reports should count source items by level, priority, disposition, confidence, and readiness. They must distinguish “not proven” from “confirmed missing.”

## 7. Definition of complete

Do not claim full TOC coverage until every one of the 2,763 source nodes has a recorded disposition; all Core nodes have verified coverage or an explicitly approved deferral; each mapped node points to existing app content; every combine/split is auditable; and automated validation plus independent review passes. Report Support and Optional dispositions separately so a Core-only release is not misrepresented as full curriculum completion.
