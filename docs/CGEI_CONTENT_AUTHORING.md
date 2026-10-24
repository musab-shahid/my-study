# CGEI curriculum structure and authoring workflow

## Scope

The CGEI track follows the 14-domain Master Study TOC. Subjects 1–8 are the core learning spine; Subjects 9–13 integrate decision support, policy, engineering, advanced AI, and capstone work; Subject 14 is an optional set of specialist branches. A registered subject or roadmap does **not** mean its full curriculum or quiz bank is complete.

## Canonical curriculum model (new for CGEI)

Use `src/types/curriculum.ts` and `src/data/cgei/curriculum.ts` for the instructional hierarchy (registry schema version 2):

- `CurriculumSubject` is the course/orientation layer: audience, purpose, prerequisites, outcomes, competencies, units and projects.
- `CurriculumUnit` defines unit outcomes, lesson order, activities, assessments, resources and deliverables.
- `CurriculumLesson` is one teachable objective with level, time estimate, content blocks, activities, assessments and an optional `sourceTopicId` migration bridge.
- Resources, activities, assessments, curriculum questions, rubrics, deliverables, competencies, and projects are separate typed entities linked by stable IDs. Curriculum questions are self-contained single-choice checks with an answer key, explanation, difficulty, and cognitive level; they need not be forced into legacy Topic quiz routing.
- `CurriculumProject` represents projects/capstones as first-class work, not as fake units or topics.
- Readiness status (`planned`, `outlined`, `draft`, `review`, `validated`, `released`) describes evidence state; do not mark a unit released because its metadata exists.

- For `validated` or `released` curriculum subjects, units, lessons, and projects, populate `readinessEvidence`: a named reviewer, a real `YYYY-MM-DD` review date, a non-empty list of completed checks, and notes/evidence references. Lesson release additionally requires substantive instructional content, observable objectives, and linked practice or assessment. CI rejects release-grade claims that lack these gates. A green CI run validates the checked commit; it does not replace the recorded human/content review.

**Important:** a course overview/roadmap belongs in `CurriculumSubject.overview`; it is not a `Topic`, lesson, quiz topic, or progress item. Subject 5 established the original pilot pattern, and the canonical registry now includes partial instructional content for Subjects 1–7. Use `npm run audit:cgei` to inspect current topic/question/unit/lesson counts and readiness classifications; do not infer TOC completeness from those counts. Unit 5.1's eight lessons bridge to legacy `Topic` records to preserve navigation, quiz access and saved progress; Units 5.2–5.5 are authored directly as canonical content blocks and have lesson-linked curriculum questions rendered inline. Unit 5.5 adds an acquisition workflow, SQL, API reliability, licence/secret handling and a reproducible package. These self-checks provide immediate feedback but are not yet wired into legacy adaptive quiz scoring or spaced-repetition statistics. Units 5.2–5.5 remain `draft` until code examples, fixtures and instructional review pass. Do not remove or rename a legacy `Topic.id` until progress/question migration is designed and tested.

Architecture and migration decisions: [CGEI Curriculum Architecture](CGEI_CURRICULUM_ARCHITECTURE.md).

## Where content lives

Each subject has a directory under `src/data/cgei/<subject-slug>/`. Canonical unit/lesson records for Subjects 1–7 live in `src/data/cgei/curriculum.ts`; legacy topic/question files remain compatibility layers during migration. The canonical registry's populated lesson records are still mostly draft and do not prove complete source-topic/subtopic coverage.

- `topics-<subject-slug>.ts` — legacy study content for sections that have not migrated to the canonical curriculum model; do not create a roadmap Topic as a substitute for a Subject overview.
- `questions-<subject-slug>.ts` — question bank, one `Question` object per quiz item.

The subject must also be registered consistently in:

- `src/types.ts` — `SubjectId` union.
- `src/data/subjects.ts` — title, icon, and track ownership.
- `src/data/sections.ts` — unit/section IDs and topic/question counts.
- `src/data/topic-metadata.ts` — lightweight topic ID, section ID, order, and title used before lazy content loads.
- `src/data/lazy-data.ts` — lazy topic and question loaders.
- `scripts/validate-question-bank.ts` — eager loaders used by CI validation.

A new domain should not be considered wired into the app until these registrations agree.

## Adding study content

1. Choose the correct subject file and the unit/section the topic belongs to.
2. Add a new topic object with a stable, unique ID such as `cgei-geospatial-crs`. Do not rename IDs after users may have saved progress against them.
3. Set `sectionId` to an existing section ID. If introducing a new unit, add a section in `sections.ts` and a matching topic-metadata entry for every topic in that section.
4. Add the same topic ID, section ID, order, and visible title to `topic-metadata.ts`. This metadata powers synchronous navigation and must match the lazy-loaded topic.
5. Prefer structured fields the study screen already supports: `definition`, `keyFacts`, `explanationSections`, `workedExample`, `comparisonTable`, `formula`, `subtopics`, `examPoints`, `commonMistakes`, and `relatedTopics`. Check `src/types.ts` for the full supported shape.
6. Keep learning outcomes concrete. For important methods, cover concept, when to use it, assumptions, a worked example, common failure modes, validation, and limitations.

## Adding quiz questions

1. Add items to the matching `questions-<subject-slug>.ts` file.
2. Use a unique question ID, the correct `sectionId`, and a valid `topicId` that exists in both the topic module and lightweight metadata.
3. Match the declared question type to the answer-key shape. Supported types are `single`, `true_false`, `multi`, `calculation`, `fill_blank`, and `matching`.
4. Every question needs a clear prompt, plausible options, a verified answer key, and an explanation. Include a useful `sourceCitation` when appropriate.
5. Do not inflate counts to make a subject look complete. Update `sections.ts` so `topicCount` equals the number of metadata topics in that section and `questionCount` equals the actual authored question-bank size.

## Validation before pushing

Run these from the repository root:

```bash
npm run validate:data
npm test
npm run typecheck
npm run build
```

The data validator checks duplicate IDs, broken topic/section references, question answer-key shapes, broken topic cross-references, and section count drift. A green build does not prove the scientific content is correct; independently verify facts, calculations, sources, and claims.

## Curriculum quality gates

Use the competence ladder consistently:

- **L1 — Recognise:** define the concept and explain why it matters.
- **L2 — Apply with guidance:** reproduce a worked example or tutorial and explain the steps.
- **L3 — Practise independently:** apply the method to new data with validation, documentation, and stated limits.
- **L4 — Extend and critique:** adapt a method, review research, and explain what the evidence does not support.

For the CGEI core, favour output-producing practice: a reproducible notebook, validated map, documented dataset, comparison/validation table, dashboard, or short research artefact. Course completion alone is not mastery.

## Current scaffold status

The registry contains 14 domains. Subjects 1–7 have partial canonical instructional content, while Subjects 8–14 are orientation-only scaffolds with no canonical lessons in the current coverage snapshot. These are not completed curricula. Continue filling the existing subject files progressively; do not try to author the entire TOC in one change. Run `npm run audit:cgei` to refresh the implementation-depth report; source-level coverage still requires a verified topic/subtopic crosswalk.

## Pull-request validation

For curriculum-content changes, confirm that GitHub Actions ran against the latest pull-request head before treating a result as current. The CI suite includes data validation, unit tests, typechecking, lint/build checks, and browser smoke tests. A run for an older merge commit is historical evidence only; after a new commit, inspect the newest run and address its actual failures.
