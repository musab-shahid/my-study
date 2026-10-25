# C.64 — Residual Core-leaf audit (Units 11.2, 12.1, 12.2, 12.3, 13.1, 13.2)

## A. Repository state
- Start: `8756657b5cca10fa0b496c43d282e53c87c0daa1`
- Branch: `feat/cgei-core-leaf-coverage-gate` · PR #117
- Method: `scripts/audit_core_leaf_coverage.py`; dispositions VALID={mapped, mapped_partial, deferred}; unmapped = absence of CSV row

## B–C. Residual leaf ledger (18 previously unmapped)

| Leaf | Final | Canonical evidence | Finding | Gap |
|------|-------|--------------------|---------|-----|
| 11.2.4.1 README/docstrings/architecture | mapped_partial | se-112-1-2; 112-2-3 | Partial coverage | Architecture notes thin |
| 11.2.4.2 Issue tracking / code review QC | mapped_partial | se-112-2-3 | Partial / light | Solo QC workflow not practised |
| 11.2.4.3 Design decisions / limitations | mapped_partial | se-112-1-2 | Partial | Formal ADR log absent |
| 12.1.3.1 Params/memory/time estimate | mapped_partial | ai-121-1-4 | Partial | No estimation worksheet |
| **12.1.3.2 Loaders/batching/raster I/O** | **unmapped** | — | **Genuine gap** | Not taught in 12-1-1 |
| 12.1.3.3 Energy/cost reporting | mapped_partial | ai-121-1-4 | Partial | No measurement protocol |
| 12.2.3.1 Tiled inference overlap/blend | mapped_partial | ai-122-1-3 | Partial | Callout only; not practised |
| **12.2.3.2 Vector post-process/topology** | **unmapped** | — | **Genuine gap** | Not taught |
| 12.2.3.3 Drift monitoring | mapped_partial | ai-122-1-3 | Partial | Domain-shift named; no protocol |
| 12.3.2.2 Transfer regimes | mapped_partial | ai-123-3-1; 123-3-phys | Partial | No transfer experiment |
| 12.3.2.3 Pretraining data/licence/leak | mapped_partial | ai-123-3-1; 123-3-phys | Partial | Checklist not graded |
| 12.3.3.3 Physical/post-processed baselines | mapped_partial | ai-123-3-1; 123-3-phys | Partial | Explicit physical-model compare light |
| 13.1.3.1 Data access/licence/compute | mapped_partial | cap-131-1-1; 131-1-3 | Partial | Live access not executed |
| 13.1.3.2 Method risks / fallbacks | mapped_partial | cap-131-1-2 | Partial | Fallback templates not graded |
| 13.1.3.3 Ethics/privacy screen | mapped_partial | cap-131-1-3 | Partial | Formal IRB workflow absent |
| 13.2.3.1 Review checkpoints | mapped_partial | cap-132-1-1; lab | Partial | Capstone fixture sequence |
| 13.2.3.2 Clean-env reproduction | mapped_partial | cap-132-1-3; 132-1-repro | Partial | Protocol run table |
| **13.2.3.3 External feedback/revision** | **unmapped** | — | **Genuine gap** | Revision taught in 13.6, not 13.2 |

## D. Per-unit summary
| Unit | Audited residual | → mapped_partial | Remain unmapped | Genuine gaps |
|------|-----------------:|-----------------:|----------------:|--------------|
| 11.2 | 3 | 3 | 0 | — |
| 12.1 | 3 | 2 | 1 | 12.1.3.2 |
| 12.2 | 3 | 2 | 1 | 12.2.3.2 |
| 12.3 | 3 | 3 | 0 | — |
| 13.1 | 3 | 3 | 0 | — |
| 13.2 | 3 | 2 | 1 | 13.2.3.3 |

## E. Global coverage
| Disposition | Before | After |
|-------------|-------:|------:|
| mapped | 6 | 6 |
| mapped_partial | 869 | **884** |
| deferred | 122 | 122 |
| unmapped | 18 | **3** |
| stale | 0 | 0 |

## F. Curriculum-gap backlog (content development)
1. **12.1.3.2** — Teach raster data loaders, batching, and I/O bottlenecks (Unit 12.1).
2. **12.2.3.2** — Teach prediction→vector post-processing with topology checks (Unit 12.2).
3. **13.2.3.3** — Either add external-feedback/revision tracking to 13.2 or document cross-unit evidence from 13.6 if policy allows.

## G. Validation
- Transitional: OK with `--allow-unmapped`
- Strict gate: FAIL 3 unmapped; 0 stale (intentional)
