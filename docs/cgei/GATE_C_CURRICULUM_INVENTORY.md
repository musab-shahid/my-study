# Gate C — Curriculum inventory (reconciled)

**Definitions used here**

| Term | Definition for counts |
|------|------------------------|
| **Subject** | Entry in `cgeiCurriculum.subjects` with a `subjectId` |
| **Unit code** | Unique `code: 'X.Y'` on a curriculum unit record |
| **Lesson** | Unique `id` matching `*lesson*` in the registry |
| **Question** | Unique `id` matching `*q-*` curriculum questions |
| **TOC unit** | `Unit X.Y` heading in Master Study TOC docx |

**Counting date:** Reconciled at audit start on PR #9 head `64e679f9e7b3485aa4ff7f08ee59ce2011bab534`, then updated for the Unit 3.2 instructional/assessment addition in this commit. The TOC DOCX is referenced by prior audit notes but is not tracked in the current repository tree, so the 125-unit TOC figure below remains a previously recorded count, not independently re-extracted during this pass.

## Exact counts

| Metric | Exact count | Source |
|--------|-------------|--------|
| Registry subjects | **13** | `subjects[]` |
| Unique unit codes in registry | **65** | `code: 'X.Y'` in live registry at audit start |
| Unique lesson IDs | **189** | `cgeiCurriculum.lessons.length` asserted by `cgei-structure.test.ts` |
| Unique question IDs | **459** | `cgeiCurriculum.questions.length` asserted by `cgei-structure.test.ts`; includes one new Unit 3.2 assessment item in this audit commit |
| TOC units (Subjects 1–14) | **125** | Unit headings in TOC (13+13+11+12+12+9+10+9+6+9+7+7+7+5) |

## TOC units vs registry (by subject)

| Subject | TOC units | Registry units | Missing registry codes (examples) |
|---------|-----------|----------------|-----------------------------------|
| 1 | 13 | 2 | 1.2–1.9, 1.11–1.13 (mostly Support/Optional) |
| 2 | 13 | 6 | 2.3, 2.7, 2.9–2.13 |
| 3 | 11 | 4 | 3.5–3.11 |
| 4 | 12 | 10 | 4.11–4.12 |
| 5 | 12 | 12 | — |
| 6–13 | (see TOC) | partial Core slices | Support/Optional often deferred |
| 14 | 5 | 0 | Optional advanced |

**Interpretation:** Registry counts ≠ TOC completion. Many TOC Support/Optional units are intentionally absent. Core gaps still exist (e.g. Subject 2/3 later units).

## Subject 1.1 review (Gate C.1)

| Item | Finding |
|------|---------|
| SEB form Rn=H+LE+G | Teaching simplification; residual = closure check |
| Omitted terms | Storage/advection/anthropogenic noted in Gate C.1 text update |
| Residence time τ≈M/F | Steady-state / well-mixed caveats present |
| Fixture | Stefan–Boltzmann, Te, Wien, SEB residual arithmetic |
| Status | Remains **draft / mapped_partial** (24/24 rows partial) |

## Next-subject selection matrix

| Criterion | Subject 2 (Climate) | Subject 3 (Geospatial) | Winner |
|-----------|---------------------|-------------------------|--------|
| Downstream / EO & Multan zones | High | **Higher** (CRS, raster/vector before LST) | S3 |
| Prerequisite for Subject 4 | Medium | **Required** | S3 |
| Missing Core instructional risk | Medium | CRS misuse is high technical risk | S3 |
| Capstone readiness | Climate context | Spatial correctness of zones/metrics | S3 |
| Feasibility of slice | Partial units exist | 3.1–3.4 exist; deepen CRS | S3 |

**Selected next vertical focus: Subject 3 — Unit 3.2 CRS (deepen Multan-relevant projected CRS practice).**

## Gap register (active)

| ID | Gap | Priority | Status |
|----|-----|----------|--------|
| G-S3-CRS | Explicit projected CRS for planar metrics (Multan/UTM) | High | improved C.1 |
| G-S2-missing | TOC 2.3/2.7/2.9+ absent | High | open |
| G-S1-support | 1.2–1.9 Support not started | Medium | deferred |
| G-Multan-real | No genuine Multan Landsat | Capstone | external |

## Multan evidence boundary (unchanged)

Synthetic Landsat ST pathway only; not Multan observations; SUHII ≠ air-temperature UHI.

## Gate C.2

Unit 3.2: fourth lesson + UTM/resampling fixture checks; CSV 16 leaves all mapped_partial. Unit 3.3 not expanded this cycle (await dependency/coverage evidence after 3.2).

## Gate C.3

Unit 3.3: verified gaps filled (print layouts, RMSE, GDAL CLI literacy) without new zonal/reclass lessons. Coverage matrix remains partial; unit draft.

## Gate C.4

Unit 3.2: grid-shift and landmark acceptance criteria specified; deterministic fixture added. Real-world validation protocol documented; not executed with Multan control points.


## Gate C.5 — live-head reconciliation and Unit 3.2 vertical slice

**Starting PR head:** `64e679f9e7b3485aa4ff7f08ee59ce2011bab534` (the earlier reported `bea07859bca0e2d300303f14ccebe4486c851943` is stale). The branch has 536 tracked files at this audit point. The latest visible PR workflow run was for the older `bea07859bca0e2d300303f14ccebe4486c851943` commit; the exact starting HEAD had no check runs returned by GitHub's commit check-runs endpoint. Do not treat that earlier green run as verification of the live head.

**Verified from the current registry and structural test:** 13 canonical curriculum subjects, 65 distinct unit codes, 189 lessons, and 458 questions before this pass. The app track registers 14 domains, while the canonical registry has 13 subject records; this is a known representation difference, not a count to silently collapse. After adding one Unit 3.2 question, the expected question total is 459. Unit codes/lesson/question counts do not measure instructional completeness.

**Unit 3.2 correction:** added substantive teaching on ellipsoid vs geodetic reference frame, horizontal vs vertical CRS, the conventional height relation `h = H + N`, and checks for coordinate-operation grids and control-point validation. Added a linked single-choice question. The unit remains **draft / mapped_partial**: this does not supply a local geoid model, a complete coordinate-operation calculation, independent Multan control points, or a learner-tested GIS lab. The existing CRS traceability rows remain partial.

**Verification boundary:** CI must run against the resulting commit SHA before this change can be called verified. No genuine field survey, independent control-point dataset, or local geoid transformation was executed as part of this audit.
