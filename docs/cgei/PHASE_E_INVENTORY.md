# Phase E — Legacy CGEI inventory

## Completed

| Step | Result |
|------|--------|
| E1 | DS Unit 5.1 progress aliases |
| E2 | Climate progress aliases |
| E3 | Roadmap-only `legacy/` → `roadmap-topics.ts` |
| **E4** | Content-bearing `legacy/` → `quiz-topics-*.ts`; **no `legacy/` left under CGEI** |

## E4 paths

| Subject | Quiz topic module |
|---------|-------------------|
| Data Science | `src/data/cgei/data-science/quiz-topics-data-science.ts` |
| Climate Science | `src/data/cgei/climate-science/quiz-topics-climate-science.ts` |
| All other CGEI subjects | `src/data/cgei/roadmap-topics.ts` |

Canonical teaching content remains in `topics-<subject>.ts`. Quiz topic modules preserve stable `topicId` values for the shared quiz engine.

## Remaining (optional / later)

1. Traceability CSV input vs output decision
2. Move fixtures out of `content-drafts/` if CI paths allow
3. Further thin quiz-topics text once practice UI only needs id/title/sectionId

## Invariants

- FPSC / HAT / QuizScreen untouched
- Progress aliases still apply for DS + climate topic → lesson
- Reintroducing `src/data/cgei/*/legacy/` fails CI
