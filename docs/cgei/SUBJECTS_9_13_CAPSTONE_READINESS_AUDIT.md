# Subjects 9–13 — Capstone readiness audit (V19)

**Audit date:** 2026-10-24  
**Branch / PR:** `feat/cgei-full-curriculum-skeleton` / [#9](https://github.com/musab-shahid/my-study/pull/9)  
**Baseline HEAD at audit start:** `c7d59c2fa36c82fc4e6d3f1564a9d07122940621`

Scope: evidence-based readiness of Subjects 9–13 for a coherent, reproducible environmental-intelligence **teaching** capstone. Software fixture passes are not treated as scientific validation or operational readiness.

Related status docs (not duplicated):  
`SUBJECT_9_TRACEABILITY_AUDIT_STATUS.md` … `SUBJECT_13_TRACEABILITY_AUDIT_STATUS.md`, `capstone-public-data-manifest.md`, `capstone-modis-real-granule.md`.

## Capstone core path (observed)

| Stage | Subject/Unit | Evidence |
|-------|--------------|----------|
| Scope & non-claims | 13.1 + protocol §0 | `labs/unit-13-core-reproduction-protocol.md` |
| Synthetic H/E/V ranks | 13.2 Path A | `unit_13_capstone_heat_risk_check.py` |
| Offline public-schema extract | 13.2 Path B | `unit_13_public_data_pathway_check.py` |
| MODIS scale/fill logic (miniature) | 13.2 Path C | `unit_13_modis_local_process_check.py` |
| Decision product card | 9.4 | `unit_9_decision_product_check.py` |
| Pipeline / provenance habits | 11.2 / 11.5 | `unit_11_env_pipeline_check.py` |
| Leakage-safe split & baselines | 12.1 | `unit_12_ai_split_baseline_check.py` |
| Report methods & limits | 8.6 | `unit_8_6_reporting_check.py` |
| Portfolio / self-review | 13.3 / 13.6 | `unit_13_portfolio_check.py`, `independent_repro_record.json` |

Offline CI paths do **not** require network credentials. Path C does **not** process a genuine NASA HDF in CI.

## Findings

### Blocker (fixed this cycle)

| ID | Location | Issue | Fix | Verification |
|----|----------|-------|-----|--------------|
| B1 | `unit_8_6_reporting_check.py` | `non_claims` accepted weak structure (empty list items, wrong types) | Structured accept: non-empty str **or** non-empty list of non-empty strs; reject blank/empty/wrong types | Fixture self-tests |
| B2 | `unit_9_decision_product_check.py` | Product card lacked `non_claims`, breaking report→product chain to 8.6 | Require non_claims with same structural rules | Fixture self-tests |

### Major (remaining)

| ID | Subject/Unit | Evidence | Why it matters | Min action |
|----|--------------|----------|----------------|------------|
| M1 | 13 Path C | `capstone-modis-real-granule.md`, no HDF in CI | Learners may assume real-granule validation | Keep explicit non-claim; optional offline acquisition lab only |
| M2 | 13.6 | `external_review_packet.json` is `illustrative_scenario` | Packet can be misread as peer review | Already labelled; retain |
| M3 | 9.2, 9.5–9.6 | Deferred per status | Incomplete decision-comms path | Defer until Core 9.4 stable |
| M4 | 12.2–12.6 | Deferred | EO CV / deeper DL not taught | Defer; 12.1 baseline/leakage is the gate |

### Minor

| ID | Note |
|----|------|
| m1 | Subject 10 has no Core TOC units; Support/Optional only — correct for prioritisation |
| m2 | Unit 11.1 is overview-depth Support |
| m3 | Weight-sensitivity demo in Unit 9 is synthetic scores, not stakeholder elicitation |

### Deferred (explicit)

- Genuine Multan / production LST validation  
- Independent human external review in CI  
- Subject 14 optional branches  
- Deep-learning training runs (12.x deferred units)  
- Live policy or carbon-market systems (10.x optional)

## Traceability honesty

| Unit | Status retained |
|------|-----------------|
| 8.6 | **mapped_partial** — structure checks only, not scientific peer review |
| 9.4 | Draft / mapped_partial product-card contract |
| 10.x | Support/Optional draft |
| 11.2 | Draft Core software design |
| 12.1 | Draft Core split/baseline |
| 13.1–13.3, 13.5–13.6 | Draft Core path; synthetic or illustrative evidence |

## Capstone reproducibility (teaching)

A learner can, offline:

1. Run Path A–C fixture commands listed in `unit-13-core-reproduction-protocol.md`  
2. Produce synthetic ranks and a decision-style product card with non_claims  
3. Complete self-review record labelled **not** independent review  

They **cannot**, from this repo alone: process a real MOD11A2 HDF in CI, obtain external scientific validation, or claim operational heat-health risk.

## Changes in this execution

1. Harden `unit_8_6_reporting_check.py` non_claims validator + tests  
2. Require `non_claims` on Unit 9.4 product cards  
3. This audit document  

No readiness promotions. PR #9 left open.

## V20 update — local MODIS HDF path

- Implemented optional `--hdf` / `MODIS_HDF_PATH` processing via GDAL in `unit_13_modis_local_process_check.py`.
- Filename must contain MOD11A2/MYD11A2; missing layer / missing GDAL fail clearly.
- CI still uses miniature JSON only; **no** genuine Multan HDF processed in this environment.
- Major item M1 reduced for *code path availability*; remains major for *study-area scientific validation*.
