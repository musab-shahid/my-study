# Subject 13 Core — Capstone reproduction protocol

Single entry point for reviewers and learners. **Offline CI paths do not require network or credentials.**

## 0. Scope card (Unit 13.1)

| Field | Teaching value |
|-------|----------------|
| Research question | Which synthetic neighbourhoods rank highest for heat screening under stated H/E/V weights? |
| Spatial boundary | `synthetic_city_grid` neighbourhood IDs only — **not** verified Multan admin polygons |
| Temporal boundary | Synthetic snapshot / teaching extract labels only — **not** a climatology |
| Intended decision | Teaching prioritisation ranks for method literacy |
| Data requirements | Synthetic table (A); optional MOD11A2-schema extract (B); optional miniature DN grid (C) |
| Non-claims | Not calibrated health risk; not operational forecast; LST ≠ air temperature; not Multan empirical validation |

## 1. Choose a path

| Path | Purpose | Command |
|------|---------|---------|
| **A** Synthetic ranks | Full H/E/V + decision card | `python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_capstone_heat_risk_check.py` |
| **B** Public offline extract | MOD11A2-schema QA + anomaly + proxy merge | `python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_public_data_pathway_check.py` |
| **C** MODIS process logic | Miniature JSON in CI; optional local MOD11A2 HDF via `--hdf` (GDAL) | `python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_modis_local_process_check.py` (± `--hdf PATH`) |
| **Portfolio** | Evidence-card structure | `python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_portfolio_check.py` |
| **Research fit** | Fit card structure | `python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_research_fit_check.py` |
| **Review packet** | Illustrative review dispositions | `python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_external_review_check.py` |
| **This protocol** | Meta-check of paths & files | `python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_core_repro_protocol_check.py` |


## 1b. Path C — local HDF (optional)

1. Install GDAL Python bindings (see `labs/unit-13-modis-real-granule.md`).
2. Download a MOD11A2/MYD11A2 `.hdf` manually (Earthdata); do not commit it.
3. Run: `python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_modis_local_process_check.py --hdf /path/to/file.hdf`
4. Inspect provenance JSON under `fixtures/data/modis_miniature/outputs/`.
5. Without a file, the same script’s default mode remains the miniature contract (CI).

## 2. Expected offline behaviour

- Each command prints a single PASS line and exits 0.
- Paths A–C must remain **separately** citable; do not merge into “Multan validated risk.”
- Path C miniature is not a NASA HDF granule.

## 3. Independent reproducibility checklist (Unit 13.6)

Executable self-review (label: **not** a substitute for an independent human reviewer).

| # | Check | Pass criterion |
|---|-------|----------------|
| 1 | Scope card complete | Question, spatial/temporal bounds, intended use, non-claims present |
| 2 | Path A runs | Exit 0; reports top ranks |
| 3 | Path B runs | Exit 0; QA filter documented |
| 4 | Path C runs | Exit 0; `qa_screened` false unless official QC applied |
| 5 | Portfolio card validates | Paths A/B/C linked; inventory labels valid |
| 6 | Review packet is illustrative | `review_type=illustrative_scenario` + disclaimer |
| 7 | Release honesty | Status is not “operational policy ready” without external evidence |

Record failures in `labs/portfolio/independent_repro_record.json` (template).

## 4. Still required before scientific finding status

- Genuine study-area data with documented licence and retrieval
- Domain-appropriate validation design
- Independent human review (not only this checklist)
- Governance for any decision use
