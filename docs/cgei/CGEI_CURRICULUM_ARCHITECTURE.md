# CGEI curriculum architecture (Phase B)

## Canonical model

```
subject → unit → lesson
```

with activities, assessments, resources, readiness evidence. The legacy Section → Topic → Question model is not extended for this track.

## File layout

```
src/data/cgei/
  curriculum.ts              # thin assembler → exports cgeiCurriculum
  curriculum-index.ts        # lightweight nav index (generated / maintained)
  shared.ts                  # track-level shared pieces
  lib/builders.ts            # pure helpers (e.g. legacyTopicToBlocks)
  curriculum-questions.ts    # temporary flat questions (Phase C → per-subject banks)
  <subject>/
    topics-<subject>.ts      # canonical units, lessons, activities, assessments
    questions-<subject>.ts   # quiz-engine question bank (Phase C unifies schema)
    legacy/topics-<subject>.ts  # frozen pre-canonical topics (do not edit)
    subject-2-curriculum.ts  # Climate Science extraction (re-exported by topics-climate-science.ts)
```

## Assembler rule

`curriculum.ts` imports subject modules and `shared.ts`, then builds `cgeiCurriculum`. Consumers keep importing `@/data/cgei/curriculum`.

## Climate Science (Subject 2)

- Canonical content: `climate-science/subject-2-curriculum.ts`
- Public module path: `climate-science/topics-climate-science.ts` (re-exports)
- Legacy quiz topics: `climate-science/legacy/topics-climate-science.ts` (frozen)

## Splitting the monolith (B3)

```bash
npx tsx --tsconfig tsconfig.app.json scripts/migrations/split-curriculum-by-subject.ts
npm run snapshot:cgei-registry
npm run check:cgei
```

Merge the same day while content is frozen. Gate: typecheck, tests, build, bundle budget, e2e.

## Related

- `docs/cgei/CONTENT_AUTHORING_GUIDE.md` — authoring workflow
- `docs/cgei/structure-baseline.json` — count ratchet
- `docs/cgei/registry-manifest.json` — golden registry (seal with `npm run snapshot:cgei-registry`)


## Phase C3 migration

```bash
npx tsx --tsconfig tsconfig.app.json scripts/migrations/c3-merge-question-banks.ts --check
npx tsx --tsconfig tsconfig.app.json scripts/migrations/c3-merge-question-banks.ts
```

Writes review sidecars under `src/data/cgei/_c3_merged/`. Legacy bank IDs win on conflict. After review, merge into `questions-<subject>.ts`, derive `assessment.questionIds`, delete `curriculum-questions.ts`.
