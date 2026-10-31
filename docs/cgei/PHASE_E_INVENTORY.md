# Phase E — Legacy CGEI inventory (complete)

## Completed

| Step | Result |
|------|--------|
| E1 | DS Unit 5.1 progress aliases |
| E2 | Climate progress aliases |
| E3 | Roadmap-only topics → `roadmap-topics.ts`; delete those `legacy/` dirs |
| E4 | Content-bearing topics → `quiz-topics-*.ts`; **no CGEI `legacy/` left** |
| **E5** | Traceability policy locked; fixtures moved to `fixtures/cgei/` |

## E5 decisions

See `docs/cgei/TRACEABILITY_AND_FIXTURES.md`.

- Per-unit traceability CSVs are **inputs**
- Aggregate CSV is a working copy, not the sole authority
- Validators do not auto-rewrite dispositions
- Executable fixtures live under `fixtures/cgei/`

## Optional later (not blocking)

- Thin `quiz-topics-*.ts` prose when the practice UI only needs id/title/sectionId
- Generate aggregate CSV from per-unit files in CI (report-only)

## Invariants

- FPSC / HAT / QuizScreen untouched
- Progress aliases remain for DS + climate
- Reintroducing `src/data/cgei/*/legacy/` fails CI


## Layout (post-merge)

Each CGEI subject folder: `topics-<subject>.ts` + `questions-<subject>.ts` only.
Quiz-engine `Topic[]` is exported as `topics` from the same topics file where needed.


## File roles (authoritative)

| File | Contains |
|------|----------|
| `topics-<subject>.ts` | Curriculum hierarchy only: subject, units, lessons, activities, assessments, outcomes |
| `questions-<subject>.ts` | Quiz **questions** (`Question[]`) |
| `quiz-topics-<subject>.ts` | Quiz-engine **topics** (`Topic[]`) when the subject has practice topics — **not** curriculum lessons |

`curriculum.ts` is the thin assembler only. Do not put quiz `Topic[]` inside curriculum topics files.
