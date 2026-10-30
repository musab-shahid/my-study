# Phase E — Legacy CGEI inventory

## E1 — Data Science progress (done)

16 Unit 5.1 topics → lesson progress aliases.

## E2 — Climate Science progress (done)

9 climate legacy topic ids → Subject 2 lessons (units 2.4–2.6).

## E3 — Roadmap-only legacy retirement (this slice)

| Change | Detail |
|--------|--------|
| Shared module | `src/data/cgei/roadmap-topics.ts` |
| Loaders | 12 roadmap subjects load from shared module |
| Deleted | `src/data/cgei/*/legacy/` for roadmap-only subjects |
| Still frozen | `data-science/legacy/`, `climate-science/legacy/` only |
| Advanced branches | Orientation-only via shared roadmap (same as other thin subjects) |

## Remaining

1. Retire content-bearing climate + data-science `legacy/` after quiz consumers use section/topic metadata only
2. Traceability CSV input/output decision
3. Move fixtures out of `content-drafts/` if desired

## Invariants

- FPSC / HAT / QuizScreen untouched
- Roadmap deep links still resolve via `overview.ts` + path router
- Green CI does not validate scientific readiness
