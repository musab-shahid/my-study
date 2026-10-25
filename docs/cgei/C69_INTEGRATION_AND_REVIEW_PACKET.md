# C.71 — Human acceptance packet: Subject 5.5 SQL + Subject 3 geospatial bridge

## Status fields
| Field | Value |
|-------|--------|
| **automated_checks** | passed (local fixtures + strict gate @ tip; see validation) |
| **instructional_review** | **pending** |
| **accessibility_review** | **pending** (#115 manual keyboard/SR; e2e install-prompt still fails on stack until #119 merges) |
| **readiness** | **draft** / review-ready for human instructional review |

## Live PR state (verified)
| PR | Head | Base | CI |
|----|------|------|-----|
| #117 | `33d3fe3e2a574a838d3e5a38bd8fe757cc8ebf49` | main | success @ head |
| #118 | *update after C.71 push* | coverage-gate @ `33d3fe3e…` | check/scientific-smoke green historically; **e2e fails** on install-prompt touch target (shared with #119 scope) |
| #119 | `390ebe9c5d1d…` | main | a11y fix stream — **do not treat as done** |
| #120 | `3a4a83d9edbe…` | main | success (stacked CI policy) |

**Ancestry:** #118 includes authorized rebase onto #117 tip. Pre-rebase recovery: `eb81dbe989216d15d55e1b26ed2d167a6c978be5`.

## Instructional scope
### Subject 5.5 SQL — `cgei-ds-lesson-5-5-2`
- Outcome: `cgei-ds-o-55-sql`
- Activity: `cgei-ds-a-55-sql`
- Assessment: `cgei-ds-assess-55-sql` → questions `003`, `004`, `018`, **`019` (fan-out)**
- Fixture: `content-drafts/chapter-05-scientific-computing/fixtures/unit_5_5_sql_practice_check.py`

**Teaches:** half-open June bounds; `AVG(tmax)` / `COUNT(tmax)`; INNER vs LEFT JOIN; ON vs WHERE date placement; orphan keys; join fan-out (`COUNT(*)` vs distinct entity-days); predict → join → compare → diagnose.

### Subject 3 bridge — `cgei-geo-lesson-3-5-1`
- Blocks: `cgei-geo-35-1-sql-bridge`, `cgei-geo-35-1-bridge-lab` (+ existing cardinality/CRS material)
- Fixture: `unit_3_5_python_geospatial_stack_check.py` (bbox predicates; expected {North:2,South:1}; mixed CRS fails closed)

## Expert review findings (not learner testing)
| Severity | Finding | Action |
|----------|---------|--------|
| Moderate | Fan-out taught in lesson/fixture but was not in assessment set | **Fixed:** added `cgei-ds-q-55-019` |
| Minor | q-003 allows aggregation without join (names optional) | Explanation acknowledges join for metadata — acceptable |
| Minor | Synthetic/bbox limits must stay explicit | Present in callouts/fixtures |
| Blocker (release) | Human instructional acceptance | **Pending** |
| Blocker (release) | #115/#119 a11y | **Pending** — e2e install-prompt < 44px on stack |

## Non-claims
- Not production database validation
- Not GeoPandas/GEOS/production spatial correctness
- Zero unmapped Core leaves ≠ pedagogical mastery of every mapped leaf
- Automated pass ≠ human acceptance

## Human reviewer checklist
1. [ ] SQL half-open June + AVG/n_valid semantics match fixture numbers
2. [ ] LEFT JOIN / ON vs WHERE explanation is accurate and assessable via q-018
3. [ ] Fan-out / duplicate parent is clear and assessable via q-019
4. [ ] Independent task is transfer, not copy-paste of worked SQL
5. [ ] Geo bridge correctly separates attribute vs spatial joins and CRS assign vs transform
6. [ ] Feedback/explanations help diagnose errors
7. [ ] Scope limitations are honest

## Validation commands (run on C.71 tip)
```bash
python3 content-drafts/chapter-05-scientific-computing/fixtures/unit_5_5_sql_practice_check.py
python3 content-drafts/chapter-05-scientific-computing/fixtures/unit_3_5_python_geospatial_stack_check.py
python3 scripts/audit_core_leaf_coverage.py
# structure tests: npm test -- cgei-structure (or project equivalent)
```

## Outstanding gates
1. Human instructional review (this packet)
2. Merge decision on #120 (CI policy) — optional for content accept
3. #119 / #115 accessibility sign-off before treating full CI as green on stack
4. Maintainer merge order for #117 then #118
