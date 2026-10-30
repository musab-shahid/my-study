# CGEI content authoring: where to edit and what to verify

This is the front door for routine CGEI content updates. Use it instead of trying to remember which of the many audit files to edit.

## The short version

- **Original requirements:** `Master_Study_TOC_Climate_Geospatial_Intelligence_Priority_Path.docx` is the preserved source-of-truth baseline. Do not rewrite it just to match the app.
- **Canonical course structure and curriculum lessons:** `src/data/cgei/curriculum.ts`. This is currently a very large registry (about 1.2 MB); it contains the structured subjects, units, lessons, activities, assessments, resources, and curriculum questions.
- **Existing topic lessons:** `src/data/cgei/<subject>/topics-*.ts`. The legacy topic system still powers direct topic routes and contributes to established study/practice/progress features. A canonical lesson with `sourceTopicId` may bridge to this content, so inspect that field before deciding which file is the actual content source.
- **Established quiz/practice question bank:** `src/data/cgei/<subject>/questions-*.ts`. These modules are loaded through `src/data/lazy-data.ts` and are used by the existing Quiz and Practice screens.
- **Lightweight navigation mirror:** `src/data/cgei/curriculum-index.ts`. This is generated metadata, not a second place to author lessons. Regenerate it after editing the canonical registry.
- **Lightweight topic lookup index:** `src/data/topic-metadata.ts`. The app's synchronous topic lookups and question validator read this metadata—not the full lazy-loaded topic modules—so it must be regenerated after topic IDs/titles/order change. The Subject 5 audit found that this index was stale.
- **Traceability matrices:** `docs/cgei/subject-*-unit-*-subtopic-traceability.csv`. These map source TOC leaves to app lessons/content and contain editorial dispositions/evidence notes. They are curated mapping records; don't assume they refresh when TypeScript changes.
- **Aggregate coverage/evidence reports:** regenerate using the scripts listed below; don't manually patch generated counts.

## How the app uses the two content paths

```text
Preserved TOC baseline
        |
        | human maps source leaves to instructional requirements
        v
src/data/cgei/curriculum.ts  -----> Learn > Learning path > Unit > Lesson
        |                                      |
        | sourceTopicId bridge (some lessons)  +--> activities/resources/assessments
        v
topics-*.ts --> legacy topic route and topic-linked study/progress
questions-*.ts --> Quiz / Practice / saved quiz attempts and mastery stats

curriculum-index.ts = small generated unit/lesson metadata mirror for navigation
traceability CSVs = source-to-app mapping and editorial evidence
aggregate reports = generated structural/coverage snapshots
```

The paths overlap, but are not equivalent:

- Curriculum lesson questions currently render as local, **unrecorded knowledge checks**; answering one does not save a quiz attempt or establish mastery.
- Legacy question-bank items feed the established quiz/practice workflow and its saved results.
- A lesson that uses `sourceTopicId` can depend on legacy topic content and topic IDs. Preserve those IDs unless doing a deliberate migration with progress/deep-link compatibility.
- The Learn screen prioritizes canonical units when they exist, so the old Section → Topic list can be hidden even though its data still supports direct links and quizzes.

## Routine editing recipe

### A. Add or revise a unit/lesson in the canonical Learning path

1. Check the original TOC for the requirement and preserve its exact source path/ID in the traceability record.
2. Edit the relevant records in `src/data/cgei/curriculum.ts`: subject/unit membership, lesson IDs/order, substantive content blocks, activities, assessment links, resources, and readiness.
3. If a lesson has `sourceTopicId`, inspect the matching topic record before editing: the learner-facing content may be bridged from the legacy topic.
4. Regenerate the lightweight navigation mirror with `npm run generate:cgei-index`.
5. If topic modules or topic IDs/titles/order changed, also run `npm run generate:topic-metadata`. These commands rebuild mechanical mirrors; they do not rewrite TOC traceability matrices.
6. Update the relevant per-unit traceability CSV only when source mapping, disposition, app lesson ID, content-block IDs, or evidence notes changed.
7. Run `npm run validate:data` and the relevant scientific fixture/tests. Review scientific and instructional quality manually; a passing structural check does not prove a lesson is complete.
8. Keep readiness honest. Do not promote `draft`/`review` to `validated` or `released` just because tests pass.

### B. Add or revise a question for normal Quiz/Practice

Edit the subject's `questions-*.ts` bank and ensure every question has a stable unique ID, valid section/topic references, a correct answer, a useful explanation, and a source citation when appropriate. If the question is intended to appear only in a curriculum lesson, add it to the curriculum question/assessment records instead—but do not assume it will automatically appear in the normal Quiz/Practice pool.

After changing the legacy question bank, update the matching `questionCount` in `src/data/sections.ts` (currently a manually maintained catalog field) and run:

```bash
npm run validate:data
```

That runs question-bank, curriculum, traceability, CGEI coverage, and data-inventory checks. Review the output rather than treating a green count alone as proof of instructional quality.

### C. Update source coverage

- Edit the relevant per-unit traceability CSV only when its source-to-app mapping or evidence changes.
- Regenerate aggregate coverage/evidence artifacts with `npm run audit:core-leaves`, `npm run audit:core-leaf-evidence`, or the specific command described in the relevant script. Some audits are intentionally transitional and do not mean every source leaf is complete.
- Do not alter the original TOC to make the coverage report look better.
- A `mapped_partial` disposition is valid when a lesson exists but the full explanation/practice/assessment contract is not yet met.

## Commands

| Command | Purpose |
|---|---|
| `npm run generate:cgei-index` | Regenerate the lightweight unit/lesson navigation mirror from the canonical registry |
| `npm run check:cgei-index` | Check whether that mirror matches the canonical registry without writing |
| `npm run generate:topic-metadata` | Rebuild synchronous topic metadata from the full lazy-loaded topic modules while preserving registered overview cards |
| `npm run check:topic-metadata` | Check whether synchronous topic metadata matches the full topic modules without writing |
| `npm run validate:data` | Run the repository's combined structural, question, traceability, coverage, and inventory validation |
| `npm test` | Run unit/data/router tests |
| `npm run typecheck` | Check TypeScript contracts |
| `npm run test:e2e` | Run Playwright end-to-end tests (requires the browser setup) |

## What should be simplified next

The current registry is too large for comfortable routine editing, and canonical curriculum questions do not yet share the normal quiz-attempt/mastery pipeline. The safe next architecture step is to split the canonical registry into per-subject curriculum modules while retaining `curriculum.ts` as a compatibility aggregator, then decide and test how curriculum questions should enter the saved assessment workflow. Do not delete legacy topic/question files until parity, stable IDs, deep links, progress restoration, and quiz results have been verified.

This guide explains the current behavior; it does not claim that all subjects are fully migrated or scientifically validated.


## Phase D — scaffolds and quality gates

| Command | Purpose |
|--------|---------|
| `npm run new:unit -- --subject cgei-data-science --code 5.13 --title "..."` | Fixture + traceability stubs + unit shell to paste |
| `npm run new:lesson -- --unit <unitId>` | Append draft lesson to `topics-<subject>.ts` (add to `unit.lessonIds` yourself) |
| `npm run new:question -- --lesson <lessonId>` | Append draft question to `questions-<subject>.ts` with next free id + `lessonId` |
| `npm run lint:cgei-questions` | Position-bias / longest-correct ratchets vs `docs/cgei/question-lint-baseline.json` |
| `npm run snapshot:cgei-question-lints` | Tighten baselines after intentional cleanup |

Per-unit PR checklist: `docs/cgei/UNIT_PR_CHECKLIST.md` and GitHub template `.github/PULL_REQUEST_TEMPLATE/cgei-unit.md`.

Readiness remains `draft` until scientific review — green CI never validates science.
