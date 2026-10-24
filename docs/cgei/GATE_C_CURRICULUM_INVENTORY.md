# Gate C — Curriculum inventory (reconciled)

**Definitions used here**

| Term | Definition for counts |
|------|------------------------|
| **Subject** | Entry in `cgeiCurriculum.subjects` with a `subjectId` |
| **Unit code** | Unique `code: 'X.Y'` on a curriculum unit record |
| **Lesson** | Unique `id` matching `*lesson*` in the registry |
| **Question** | Unique `id` matching `*q-*` curriculum questions |
| **TOC unit** | `Unit X.Y` heading in Master Study TOC docx |

**Counting date:** Gate C.1 reconciliation against live `curriculum.ts` + TOC docx.

## Exact counts

| Metric | Exact count | Source |
|--------|-------------|--------|
| Registry subjects | **13** | `subjects[]` |
| Unique unit codes in registry | **58** | `code: 'X.Y'` |
| Unique lesson IDs | **182** | lesson id pattern |
| Unique question IDs | **402** | question id pattern |
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
