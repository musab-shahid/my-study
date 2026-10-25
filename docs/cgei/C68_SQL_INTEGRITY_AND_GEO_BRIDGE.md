# C.68 — SQL integrity + geo bridge (**HISTORICAL implementation note**)

> Current review state: see `C69_INTEGRATION_AND_REVIEW_PACKET.md`.
> Stack integration completed in C.70; do not use the stale base table below as current.

# C.68 — SQL integrity deepening + Subject 3 join bridge

## Live PR state (inspected)
| PR | Head | Base | Notes |
|----|------|------|-------|
| #117 | `33d3fe3e2a57…` | main | coverage gate; tip advanced beyond #118 base |
| #118 | `bf999428bc77…` (start) | `feat/cgei-core-leaf-coverage-gate@1ee98551` | **stale base** — does not include latest #117 |
| #119 | `390ebe9c5d1d…` | main | a11y; isolated |

No merge/retarget/rebase performed. Coverage-gate CI on #118 may still reflect stack mismatch until base is refreshed by maintainer.

## C.67 review (defects fixed)
| Item | Finding |
|------|---------|
| Half-open June bounds | OK in SQL + fixture |
| AVG vs n_valid | OK; COUNT(tmax) ignores nulls |
| INNER vs LEFT / ON vs WHERE | OK |
| Orphan diagnostic | OK |
| **tmax vs tmax_c** | **Fixed** — schema text aligned to `tmax` (fixture column) |
| Join fan-out | **Added** worked example + fixture (`stations_dup`) |

## Delivered instruction
### SQL (lesson `cgei-ds-lesson-5-5-2`)
- New blocks: `cgei-ds-55-2-fanout`, `cgei-ds-55-2-integrity-habit`
- Independent practice extended with fan-out reflection
- Fixture: fan-out row count > distinct entity-days

### Geo bridge (lesson `cgei-geo-lesson-3-5-1`)
- New blocks: `cgei-geo-35-1-sql-bridge`, `cgei-geo-35-1-bridge-lab`
- Explicit transfer of SQL integrity habit to spatial/attribute joins
- Fixture: predicted district counts {North:2,South:1}; mixed CRS fails closed

## Validation (local)
```
python content-drafts/.../unit_5_5_sql_practice_check.py  # PASS
python content-drafts/.../unit_3_5_python_geospatial_stack_check.py  # PASS
```

## Readiness / non-claims
- draft / synthetic SQLite + bbox predicates only
- Not production DB validation; not GeoPandas/GEOS; not Multan
- Human instructional review still required
- #115 manual keyboard/SR review still outstanding

## Next single dependency
Maintainer refresh of PR #118 base onto current #117 tip (or merge stack) so coverage-gate and SQL slice CI evaluate the same ancestry—without force-push.

## Current pointer (C.71)
Instructional content lives on PR #118 (`feat/cgei-subject5-sql-vertical-slice`), stacked on #117 tip `33d3fe3e…`.
Review and acceptance tracking: `docs/cgei/C69_INTEGRATION_AND_REVIEW_PACKET.md`.
Remote CI for stacked base enabled via PR #120 + cherry-pick on #118.
