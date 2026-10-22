# CGEI curriculum structure and authoring workflow

## Scope

The CGEI track follows the 14-domain Master Study TOC. Subjects 1–8 are the core learning spine; Subjects 9–13 integrate decision support, policy, engineering, advanced AI, and capstone work; Subject 14 is an optional set of specialist branches. A registered subject or roadmap does **not** mean its full curriculum or quiz bank is complete.

## Where content lives

Each subject has its own directory under `src/data/cgei/<subject-slug>/`:

- `topics-<subject-slug>.ts` — full study content, one `Topic` object per teachable topic.
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

The registry contains 14 domains and each has at least a roadmap topic. Subjects 9–14 now have tailored roadmap outlines and empty quiz-bank files. They are structural scaffolds, not completed lessons. Continue filling the existing subject files progressively; do not try to author the entire TOC in one change.
