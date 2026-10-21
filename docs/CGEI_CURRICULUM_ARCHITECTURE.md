# CGEI Curriculum Architecture

**Status:** Architecture v1 — implemented incrementally, not yet a completed learning platform  
**Scope:** All 14 CGEI domains; first vertical slice: Subject 5, Scientific Computing & Data Science  
**Design principle:** The curriculum's semantic structure must not be inferred from a flat list of quiz topics.

## 1. The problem being corrected

The legacy app uses `Section → Topic → Question`. That is useful for exam revision but too weak to represent a curriculum containing orientations, learning units, lessons, readings, notebooks, exercises, formative assessments, projects, capstones, rubrics, and prerequisite relationships. A roadmap/overview is not a lesson and must not be counted as a topic.

The existing Topic content model remains a compatibility layer during migration. It is not the canonical long-term curriculum model.

## 2. Canonical hierarchy

```text
CGEI Track
├── Subject / Course
│   ├── Orientation (overview, audience, prerequisites, outcomes, diagnostic)
│   ├── Learning Unit
│   │   ├── Lesson (one coherent teachable objective)
│   │   │   ├── Content blocks (explanation, equation, worked example, code, table, callout)
│   │   │   ├── Supporting resources (reading, dataset, documentation, video)
│   │   │   ├── Learning activities (guided practice, independent exercise, notebook, critique)
│   │   │   └── Formative assessment (quiz/checkpoint with feedback)
│   │   ├── Unit assessment / practical
│   │   └── Unit deliverable
│   ├── Project / Capstone
│   │   ├── milestones and required evidence
│   │   └── assessment rubric
│   └── Optional branches / extension pathways
└── Competency map (outcomes ↔ lessons ↔ activities ↔ assessment evidence)
```

Tracks/subjects/units/lessons are navigational and instructional entities. Content blocks are presentation entities. Activities, assessments, resources, projects, and competencies are linked entities—not nested prose blobs. Cross-links use stable IDs.

## 3. Entity contracts

- **Track:** learning pathway and ordered subjects.
- **Subject:** audience, purpose, prerequisites, measurable outcomes, competencies, estimated effort, unit order, and course-level capstone(s).
- **Unit:** coherent group of lessons with outcomes, prerequisites, assessment plan, deliverable, and readiness state.
- **Lesson:** one focused instructional target, mapped to optional legacy Topic content during migration; carries measurable objectives, level, time estimate, content, activities, resources, and checks for understanding.
- **Content block:** typed and ordered (prose, key points, equation, worked example, code, table, figure, warning, reflection). Do not force all content into one long explanation string.
- **Resource:** type, title, URL or local asset, purpose, source/author, access notes, and verification date where appropriate.
- **Activity:** learner action, instructions, inputs, expected output/evidence, hints/scaffolding, and solution/rubric reference.
- **Assessment:** diagnostic/formative/summative/practical/portfolio; linked to objectives and evidence; supports feedback, answer key, rubric, and mastery threshold as appropriate.
- **Project/Capstone:** authentic problem, scope, milestones, artefacts, acceptance criteria, rubric, and reproducibility requirements.
- **Competency:** observable capability and evidence criteria. Link competencies to units/lessons/activities rather than relying on completion alone.

## 4. Learning progression

Use the existing CGEI competence ladder consistently:
- **L1 — Recognise:** explain a concept, identify an appropriate method, and recognise limits.
- **L2 — Apply with guidance:** reproduce and explain a worked example with scaffolding.
- **L3 — Practise independently:** solve a new problem, validate the output, document assumptions, and state limitations.
- **L4 — Extend and critique:** adapt a method, compare alternatives, examine research evidence, and defend decisions.

A level labels the expected performance, not just the difficulty of the prose. A course should contain evidence at multiple levels; optional advanced branches should not block core progression.

## 5. Learning-design rules

1. Start with audience, prerequisites, measurable outcomes, and evidence of success.
2. Design checks/activities against outcomes before writing long explanations; then author examples and explanations that prepare learners for those checks.
3. Each substantive lesson should have: objective(s), explanation, at least one worked example where applicable, learner practice, feedback/check for understanding, common failure modes, and limitations.
4. Every quantitative/scientific example must have units, assumptions, and a sanity check.
5. Every coding/data lesson should produce a small verifiable artefact (tested function, notebook, table, plot, map, documented dataset, or reproducible pipeline).
6. Distinguish required core, recommended practice, optional extension, and assessed capstone work in metadata and UI.
7. Track evidence and completion separately: opened/read ≠ practised ≠ assessed ≠ mastered.
8. Do not claim a unit is complete because its route or placeholder exists. Status must reflect content and validation evidence.
9. Prefer original explanations plus stable, authoritative links. Record provenance and verification dates for fast-changing APIs/products.
10. Preserve legacy topic IDs until progress migration is designed and tested.

## 6. Subject 5 vertical slice

Subject 5 is the pilot because a manuscript already exists for Units 5.1–5.12, supporting integration notes, exercise toolkit, capstone, and solution keys.

- The subject roadmap is a **course orientation**, not a topic.
- Unit 5.1 has eight substantive lessons mapped to the existing content bank:
  1. Quantities, units and dimensional analysis
  2. Calculus, finite differences and environmental fields
  3. Matrices, linear maps and least squares
  4. Eigenvalues, SVD and PCA foundations
  5. Stock–flux systems, ODEs and numerical integration
  6. Environmental mass and water balance
  7. Surface energy balance and thermal radiation
  8. Probability, uncertainty and dependent observations
- Units 5.2–5.5 have typed lesson content and knowledge checks, but remain `draft` until validation and content review; Units 5.6–5.12 are registered as planned units, not falsely represented as app-ready lessons.
- Chapter capstone, practice tracks, solution keys, fixtures, and rubric become first-class entities and link to relevant units.
- Existing `Topic` data is referenced by stable `sourceTopicId` until content blocks can be migrated without breaking progress, quizzes, or routes.

## 6.1 Current implementation boundary

The current registry is a **vertical slice**, not yet the complete canonical migration of all 14 subjects:

- Subject 5 orientation, Unit 5.1's eight lessons, and the capstone/project record are represented in the canonical curriculum model.
- Unit 5.1's 35 legacy questions are bridged into canonical question records; source citations, legacy topic IDs, quiz routing, and studied-state compatibility are preserved.
- Unit 5.1 has 16 additional worked-calculation, scientific-Python, and checklist blocks beyond the migrated source material.
- Units 5.2–5.5 have five authored typed lessons each and 41 knowledge-check questions across those units. Their readiness remains `draft`, not `validated` or `released`.
- Units 5.6–5.12 remain manuscript-first/planned in the app.
- **Track-wide migration is still outstanding:** twelve roadmap cards in the other CGEI domains remain legacy Topic records. Move each into a canonical Subject orientation only when its replacement navigation and subject/unit metadata ship together. Do not remove all remaining roadmap IDs in a bulk edit.

A green structural validator is necessary but insufficient: a fresh CI run, UI review, scientific-content review, and verification of the affected routes are still required before marking the pilot validated.

## 7. Migration sequence

**Phase A — semantic model:** Add versioned TypeScript contracts, data registry, Unit 5.1 mapping, orientation and planned unit records. No breaking migration of the old Topic store.

**Phase B — correct navigation:** Render course orientation separately; remove roadmap from topic counts and topic progress; show unit/lesson hierarchy and status.

**Phase C — content blocks and activities:** Migrate Unit 5.1 lesson content into the typed content model; render blocks, resources, exercises, and formative checks. Keep legacy question banks available during the transition.

**Phase D — assessment and evidence:** Add objective links, activity evidence, rubrics, unit checks, and a project/capstone view. Do not conflate quiz completion with portfolio competency.

**Phase E — expand by template:** Apply the tested model to Units 5.6–5.12, then the other CGEI subjects. Do not bulk-create empty lesson cards just to inflate visible coverage.

## 8. Acceptance criteria for the first vertical slice

- [x] The Subject 5 overview is rendered as orientation, never as a study topic.
- [x] The overview is excluded from lesson/topic counts and topic mastery.
- [x] Unit 5.1 contains eight substantive lessons, not an overview card masquerading as one.
- [x] The 8 lessons map one-to-one to stable legacy Topic IDs and the manuscript coverage map.
- [x] Units 5.2–5.5 have authored lesson records with draft readiness; Units 5.6–5.12 remain planned with no fabricated lesson counts.
- [x] Activities, resources, assessments, projects, and competencies have separate typed contracts.
- [x] Existing quiz answers, progress, and navigation retain stable legacy topic IDs during the migration.
- [x] Data validation checks unique IDs, valid references, ordered children, status/content consistency, and canonical assessment question references.
- [ ] Typecheck, tests, data validation, lint, build, and relevant UI/E2E tests pass.
- [ ] Scientific content review remains separate from software validation.

## 9. Research basis

The model borrows established instructional design practices, not a single LMS implementation:
- The Carpentries lesson-development guidance recommends defining audience and prerequisites, writing specific/measurable objectives, designing assessments and activities against those objectives, then writing explanatory content and evaluating lessons iteratively: https://carpentries.github.io/lesson-development-training/
- The Carpentries lesson template design principles emphasise clear dependencies, reusable lesson components, and contextual instructor notes: https://www.carpentries.org/blog/2020/08/lesson-template-design/
- Moodle competency guidance links competencies to course activities and allows evidence to be attached to activity completion: https://docs.moodle.org/36/en/Competencies

These are design references; CGEI should remain lighter and more research-workflow-oriented than a full LMS.
