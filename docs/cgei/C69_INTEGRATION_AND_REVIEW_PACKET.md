# C.69 — Integration decision + instructional review packet

## Verified live state (2026-10-25)

| PR | Head | Base SHA | CI @ head |
|----|------|----------|-----------|
| #117 | `33d3fe3e2a574a838d3e5a38bd8fe757cc8ebf49` | main `03ace174…` | check / scientific-smoke / e2e **success** |
| #118 | `9986100e05bc78f0e4114984404def4c81ad8e72` | `1ee98551c84626710e90132361479b803a503fec` | **no workflow runs** |
| #119 | `390ebe9c5d1d…` | main | isolated; not modified |

- Merge-base(#118, #117 tip) = `1ee98551` = current #118 base.
- Commits on #118 not in #117 tip: **8** (SQL slice + C.68).
- Commits on #117 tip not in #118: **42** (coverage-gate mapping through C.65/C.66-era tip).
- C.68 content markers present on #118 head (fan-out, integrity habit, SQL→geo bridge).

## Integration decision

| Option | Verdict |
|--------|---------|
| Retarget only | **Insufficient** — changing GitHub base ref does not replay 8 commits onto the 42 missing #117 commits. |
| **Rebase #118 onto #117 tip** | **Required** for combined ancestry and trustworthy coverage-gate evaluation. |
| Merge #117→#118 | Would create a merge commit; possible but less clean than rebase for a stacked draft PR. |

### Authorization
**No maintainer authorization** was granted in this cycle for force-push / history rewrite.  
Therefore **no rebase, retarget, or force-push was performed**.

### Proposed maintainer operation (not executed)
```bash
git fetch origin
git checkout feat/cgei-subject5-sql-vertical-slice
git rebase origin/feat/cgei-core-leaf-coverage-gate
# resolve any conflicts preserving C.68 blocks and fixtures
git push --force-with-lease origin feat/cgei-subject5-sql-vertical-slice
# optional: ensure PR base remains feat/cgei-core-leaf-coverage-gate
```
Risks: force-with-lease rewrites public branch history; collaborators must reset; conflict risk in `curriculum.ts` and coverage CSVs.

## Local validation on #118 head `9986100…` (stale ancestry)
```
python3 …/unit_5_5_sql_practice_check.py          → PASS
python3 …/unit_3_5_python_geospatial_stack_check.py → PASS
python3 scripts/audit_core_leaf_coverage.py       → FAIL (exit 1)
  deferred=27 mapped=6 mapped_partial=754 stale=19 unmapped=209
```
This FAIL is **expected on the obsolete base** (pre–C.49–C.65 mapping). It is **not** evidence that the SQL slice regressed. After rebase onto `33d3fe3e…`, re-run the strict gate; #117 tip previously reported **0 unmapped**.

## Human review checklist (authorized reviewer)
1. [ ] SQL half-open June bounds and AVG/COUNT(tmax) semantics match the fixture.
2. [ ] INNER vs LEFT JOIN and ON vs WHERE date placement are teachable and correct.
3. [ ] Fan-out example and COUNT(*) vs distinct entity-day diagnostic are clear.
4. [ ] Independent task requires transfer, not pure copy of worked SQL.
5. [ ] Assessment items align with `cgei-ds-o-55-sql`.
6. [ ] Geo bridge correctly separates attribute vs spatial joins and CRS assign vs transform.
7. [ ] Synthetic limits disclosed (SQLite / bbox ≠ production DB / GEOS).

**Readiness:** remains **draft**. No human approval recorded in this cycle.

## Separate obligations
- Manual keyboard/screen-reader verification from PR #115: **still outstanding**.
- CI on integrated SHA: **pending** until rebase + push triggers workflows.

## Next single dependency
**Maintainer-authorized rebase** of `feat/cgei-subject5-sql-vertical-slice` onto `33d3fe3e2a574a838d3e5a38bd8fe757cc8ebf49`, then CI on the new head.
