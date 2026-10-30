# CGEI curriculum architecture and authoring guide

**Status:** current architecture and working conventions  
**Source of truth:** `Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path.docx`

The Master Study table of contents defines the intended learning scope. The app must reflect that source; do not change the source TOC merely to make it match current implementation. A registered subject, roadmap entry, or passing validator does not mean its curriculum is complete.

## 1. Canonical model

CGEI's instructional hierarchy is:

`subject → unit → lesson`

The canonical registry also links activities, assessments, resources, deliverables, competencies, rubrics and projects by stable IDs. Course orientation and roadmap navigation are not lessons and must not be counted as lesson progress.

There are 13 active canonical subjects. Subject 14 (advanced specialist branches) remains outside the canonical unit/lesson structure until its branches have authored units. Do not create empty lessons or promote roadmap stubs simply to increase counts.

## 2. Source layout

The current layout is one content module and one question bank per active subject:

```text
src/data/cgei/
  curriculum.ts                  thin assembler; exports cgeiCurriculum
  curriculum-index.ts            generated navigation index
  curriculum-index-helpers.ts    index helpers
  question-projection-order.ts   stable compatibility order for questions
  shared.ts                      track-level shared records
  registry-shared.ts              competencies and rubrics
  lib/builders.ts                 typed content builders
  <subject-slug>/
    topics-<subject-slug>.ts      canonical subject, units, lessons and linked records
    questions-<subject-slug>.ts   unified quiz-engine question bank
```

Examples of subject folders include `data-science/`, `climate-science/`, `geospatial/` and `remote-sensing/`.

- Edit the subject's `topics-*.ts` for canonical instructional structure and lesson content.
- Edit the subject's `questions-*.ts` for questions. Do not create a flat cross-subject question file.
- `curriculum.ts` is an assembler, not a place to author subject content. It statically imports the subject modules and preserves the public `cgeiCurriculum` API.
- `curriculum-index.ts` is generated. Regenerate it with `npm run generate:cgei-index`; verify it with `npm run check:cgei-index`.
- CGEI's old `legacy/` content folders have been retired. The existing quiz engine and its quiz-topic metadata are compatibility infrastructure; do not confuse those engine records with the canonical subject/unit/lesson hierarchy.

The canonical subject modules and their question banks are consumed through the lazy CGEI screen boundary. The quiz loader shares those subject-bank modules; do not reintroduce a second flat copy of their question content.

## 3. Subject-file contracts

### Canonical topic module

A `topics-<subject-slug>.ts` module exports the subject record and its ordered units, lessons, activities, assessments, resources and deliverables, typed against `src/types/curriculum.ts`. Array order is display order. Keep IDs stable and references within the same subject unless a deliberate cross-subject relationship is defined and validated.

### Question bank

A `questions-<subject-slug>.ts` module exports `questions: Question[]` using the shared quiz engine schema from `src/types.ts`.

The engine schema includes stable `id`, `sectionId`, `topicId`, `difficulty`, `type`, `question`, `options`, `correctAnswer`, `explanation` and `sourceCitation`. Curriculum linkage fields are optional during migration and include:

- `lessonId` — canonical lesson primarily assessed;
- `assessmentId` — canonical assessment association when explicitly authored;
- `objectiveIds` — learning objectives probed;
- `cognitiveLevel` — remember, understand, apply, analyze, evaluate or create;
- `tests` — optional lesson-content block or skill tag.

Supported engine question types are `single`, `true_false`, `multi`, `calculation`, `fill_blank` and `matching`. Keep the answer-key shape consistent with the declared type. The shared quiz engine is not being replaced; FPSC and HAT continue to use it.

## 4. Question projection and assessment behaviour

The canonical assembler keeps `cgeiCurriculum.questions` as a compatibility projection for existing curriculum consumers. It is built from the subject banks; it is not a second source of question content.

- The projection contains lesson-linked single-choice questions with numeric answer indices.
- The engine's `question` field is exposed as the curriculum `prompt`; the question ID, lesson, options, answer, explanation, difficulty and cognitive level are preserved.
- `question-projection-order.ts` preserves the former registry question order. The assembler fails closed if a projected question is missing from that order or a new projected ID has not been deliberately added. Update it in the same change when adding/removing a lesson-linked single-choice question.
- The assembler derives an assessment's `questionIds` from the questions linked to lessons that reference that assessment **only when the assessment has no hand-authored IDs**. Existing authored IDs take precedence.
- Lesson-page checks use the subject bank, deduplicate by question ID, and currently render `single` and `true_false`. Options are shuffled for an attempt; these inline checks do not currently record answers into quiz-attempt or spaced-repetition progress.
- Multi-select, calculation, fill-blank and matching remain available to the quiz engine, not the current inline lesson renderer.

**Climate Science migration boundary:** 37 legacy Climate questions still have no canonical `lessonId` and remain engine-only. The review proposal is `docs/cgei/CLIMATE_QUESTION_LESSON_MAPPING_REVIEW.md`. Do not apply those mappings until the owner approves them. A question's old quiz `topicId` is retained for engine compatibility and is not, by itself, sufficient evidence for a canonical lesson mapping.

## 5. IDs and progress compatibility

Question IDs are permanent because saved answers, review schedules and mastery are keyed by ID.

- `docs/cgei/question-id-ledger.json` records every question ID and its owning subject.
- The ledger check rejects missing IDs, unrecorded new IDs, duplicate IDs and subject moves without an explicit history record.
- Record a new ID with `npm run snapshot:cgei-question-ids -- --record-new-ids --reason="why this ID is being added"`.
- Record a subject move with `npm run snapshot:cgei-question-ids -- --record-moves --reason="why ownership changed"`.
- Never delete or rename an ID to make a check pass. A legitimate move must preserve the ID and include an auditable reason.

A lesson's `sourceTopicId`, where present, is a compatibility alias for existing studied-state and last-topic progress. Preserve it unless a deliberate, tested progress migration replaces it. It is not a source from which canonical lesson content should be generated.

## 6. Authoring workflow

Use the scaffolds, then edit the generated subject file. Do not hand-edit generated navigation indexes or use regex-based source rewrites.

### Add a unit

```bash
npm run new:unit -- --subject cgei-data-science --code 5.13
```

Supply the canonical subject ID and next unit code. Review the generated unit, fixture stub, traceability rows and audit stub.

### Add a lesson

```bash
npm run new:lesson -- --unit cgei-ds-unit-5-1
```

Complete the generated lesson in the subject's `topics-*.ts` file and update the unit's ordered `lessonIds` as instructed by the scaffold.

### Add a question

```bash
npm run new:question -- --lesson cgei-ds-lesson-5-1-1
```

The scaffold allocates the next free ID and links the question to its lesson. Complete the prompt, answer key, distractors, explanation, difficulty, cognitive level, source citation and engine topic/section references. If it is a lesson-linked single-choice question, update `question-projection-order.ts` in the same PR.

After authoring, update the question-ID ledger using the explicit command above. Run the question lint and all relevant validators; do not lower a baseline to hide a new defect.

## 7. Validation and delivery gates

Run the same gates locally that CI runs:

```bash
npm run check:cgei
npm run check:cgei-registry
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

- `npm run check:cgei` runs data validation, question-quality lint, Core-leaf evidence audit, question-ID ledger check and generated-index check.
- `npm run check:cgei-registry` checks the golden registry snapshot.
- `npm run build` includes the production build, security-header generation and bundle-budget check.
- CI additionally runs the secret/security, design-system, contrast, branding, feature-icon, legacy-freeze, scientific-smoke, Playwright and Lighthouse checks.
- Confirm that checks ran on the exact latest PR head, not an older commit.

For coverage and readiness reports, use `npm run audit:cgei` and `npm run audit:core-leaf-evidence`. A generated index or green CI is evidence of structural integrity, not proof that every TOC leaf has been taught.

## 8. Content quality and scientific review

Work one unit per pull request. A useful unit should include:

1. A stated tier (Core or Support) and measurable objectives.
2. Substantive lessons with explanation, worked examples using real numbers where applicable, cautions and limitations.
3. At least three questions per lesson across at least two cognitive levels, including an apply-or-higher item where appropriate.
4. A coding/data activity and a verifiable artefact.
5. Fixtures for numerical claims and examples; figures in lessons must agree with fixture output.
6. Traceability notes that distinguish fully mapped, partial, deferred and unmapped source items.

New or changed questions should have balanced correct-answer positions, plausible distractors and explanations that address why likely wrong answers are wrong. Numeric questions must use calculation/parameterized templates and be tied to fixtures where appropriate.

Readiness moves from `draft` to `review` to `validated` only with recorded evidence from a subject-competent human reviewer. The reviewer must check formulas, units, assumptions, worked examples and answer keys. Green CI never substitutes for scientific review. Without a named reviewer and evidence, keep the unit in draft.

## 9. Boundaries

- Do not replace or casually refactor the shared quiz engine, QuizScreen, FPSC or HAT as part of CGEI content work.
- Do not remove compatibility topic IDs, progress aliases or deep links without a dedicated migration and saved-progress tests.
- Do not claim a subject is complete because it has a registry entry, roadmap card, question count or green build.
- Do not invent data, citations, calculations or source coverage. Record gaps honestly and keep readiness at draft.
- Do not merge content work until exact-head CI and the required human review are complete.
