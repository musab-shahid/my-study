# C.69 / C.71 — SQL + geospatial instructional review packet

## Current state (verified 2026-10-25)

| PR | Head | Base | CI @ exact head |
|----|------|------|-----------------|
| **#117** | `33d3fe3e2a574a838d3e5a38bd8fe757cc8ebf49` | `main` | check / scientific-smoke / e2e **success** |
| **#118** | see Git tip after C.71 commits | `feat/cgei-core-leaf-coverage-gate` @ `33d3fe3e…` | was green @ `f6cc2cb…`; re-verify after C.71 push |
| **#119** | `390ebe9c5d1d…` | `main` | isolated; not modified |
| **#120** | `3a4a83d9edbe…` | `main` | check / scientific-smoke / e2e **success** (workflow policy) |

**Ancestry:** #118 contains #117 tip (authorized rebase completed in C.70).  
**Recovery ref (pre-rebase):** `eb81dbe989216d15d55e1b26ed2d167a6c978be5`.

### Coverage gate
Strict audit on integrated stack: **OK** — mapped=6, mapped_partial=887, deferred=122, unmapped=0, stale=0.  
Zero unmapped ≠ mastery of every mapped leaf.

### Status labels
| Gate | Status |
|------|--------|
| automated_checks | passed (local fixtures + strict gate; re-confirm CI on C.71 head) |
| instructional_review | **pending** |
| accessibility_review (#115 manual keyboard/SR) | **pending** |
| readiness | **draft** |

---

## Instructional scope for review

### Subject 5.5 SQL — `cgei-ds-lesson-5-5-2`
- **Outcome:** `cgei-ds-o-55-sql`
- **Activity:** `cgei-ds-a-55-sql`
- **Assessment:** `cgei-ds-assess-55-sql` → questions `q-55-003`, `q-55-004`, `q-55-013`
- **Fixture:** `content-drafts/chapter-05-scientific-computing/fixtures/unit_5_5_sql_practice_check.py`
- **Key blocks:** half-open June SQL, LEFT JOIN + ON vs WHERE, orphan diagnostic, fan-out, integrity habit, guided/independent practice

### Subject 3 geo bridge — `cgei-geo-lesson-3-5-1`
- **Blocks:** `cgei-geo-35-1-sql-bridge`, `cgei-geo-35-1-bridge-lab` (+ existing cardinality trap)
- **Fixture:** `unit_3_5_python_geospatial_stack_check.py` (bbox + predicted counts {North:2,South:1}; mixed CRS fails closed)

---

## C.71 expert review findings

| Severity | Finding | Action |
|----------|---------|--------|
| **Major** | Assessment included `q-55-011` (PDF extraction / lesson 5-5-3), not testing SQL join outcome | Replaced with `q-55-013` (LEFT JOIN / n_valid=0 semantics) |
| **Moderate** | Column name `tmax_c` vs `tmax` inconsistency across advanced SQL, questions, and fixture | Aligned primary path and assessment to `tmax` |
| **Moderate** | Advanced SQL CTE named `daily` while selecting FROM `station_daily` | Rewrote to `WITH ranked AS … FROM daily` |
| Minor | Synthetic fixture limits must stay explicit | Retained; not production validation |

---

## Human-review checklist
1. [ ] Half-open June bounds and AVG/COUNT(tmax) match the fixture numbers (A:42.0/3, B:35.0/2).
2. [ ] INNER vs LEFT JOIN and ON vs WHERE are teachable and correct.
3. [ ] Fan-out example tests diagnosis (COUNT(*) vs distinct entity-days), not memorization.
4. [ ] Independent task requires transfer beyond the worked query.
5. [ ] Assessment items map to `cgei-ds-o-55-sql` (date filter, join diagnostics, LEFT JOIN semantics).
6. [ ] Geo bridge: attribute vs spatial joins; CRS assign ≠ transform; count prediction habit.
7. [ ] Feedback/explanations help correct errors, not only reveal the option letter.
8. [ ] Scope limits clear: SQLite + bbox only.

---

## Historical notes (not current instructions)
- C.69 originally recommended rebase; **completed in C.70** under explicit authorization.
- C.70 authorization blocker doc described a pre-authorization state; rebase **done**.
- Pre-integration strict gate FAIL (209 unmapped) was **stale-base artifact**, not an SQL regression.

## Outstanding maintainer decisions
1. Human instructional accept / changes-requested on this packet.
2. Merge policy for #120 (CI trigger) and later #117 / #118.
3. #115 manual accessibility sign-off.
4. Do **not** treat automated green as instructional acceptance.
