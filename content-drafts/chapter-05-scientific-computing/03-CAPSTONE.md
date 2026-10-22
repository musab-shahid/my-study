# Part IV — Integrated capstone

## Purpose
Convert Chapter 5 skills into one coherent, public, reproducible artefact. Complete **one** track well rather than sampling every advanced method.

## Tracks (choose one)

### Track H — Heat / LST associations (Multan-relevant)
**Question family.** How does Landsat-derived LST co-vary with spectral indices and/or built-up proxies in Multan for a defined season/window, and how sensitive are patterns to masks, season, and spatial dependence?

**Hard constraints**
- Distinguish **LST**, **2 m air temperature**, and **personal heat exposure**.
- Association ≠ causal cooling without a Unit 5.10-level design.
- Spatial dependence: pixels are not i.i.d.; use blocked validation or cluster-aware inference (5.6).

### Track M — Climate diagnostics (ERA5 / monsoon context)
**Question family.** What do quality-controlled ERA5 (or ERA5-Land) temperature and/or precipitation diagnostics show for Multan/southern Punjab over a stated period, including anomalies, dependence-aware trends or extremes description, and product limits?

**Hard constraints**
- PKT local-day aggregation for daily extremes (5.2).
- Baseline anomalies fixed in advance (5.7).
- No flood-causation claims from rainfall summaries alone (needs hydrology, exposure, drainage).

---

## Required components (both tracks)

1. **Project brief** — question, estimand or descriptive target, study area, period, success criteria, non-goals.  
2. **Variable catalogue** — name, unit, support, source, missingness codes.  
3. **Data manifest** — source, version, access date, licence, request parameters, checksums where feasible (5.5).  
4. **QC + EDA** — ranges, missingness, maps/time plots, claims/non-claims memo (5.3).  
5. **Baseline method** — e.g. climatology; mean-only; simple OLS (5.4–5.6).  
6. **Primary analysis** — justified method from 5.6–5.8 as appropriate (not all at once).  
7. **Validation** — spatial or temporal holdout; metrics vs baseline (5.6–5.7).  
8. **Uncertainty & limitations** — dependence, product bias, what is not shown.  
9. **Software gate** — package layout, ≥3 tests, pinned env, one-command or clearly numbered rerun (5.11).  
10. **Short report** — ≤8 pages: methods, results, figures, limitations.

## Optional extensions (not required to pass)
- Weighted EOF on a regional field (5.8).  
- GLM or mixed model by class/station (5.9).  
- Causal design brief only if a real intervention contrast exists (5.10).  
- xarray pipeline stage for climate arrays (5.12).

---

## Repository layout (recommended)
```
capstone-<track>/
  README.md                 # one-command reproduce
  configs/default.yaml
  data/raw/.gitkeep
  data/processed/.gitkeep
  src/<pkg>/...
  tests/
  manifests/
  reports/capstone_report.md
  environment.yml | requirements.txt
  CITATION.cff
```

## Rubric (L2–L4)

| Criterion | L2 | L3 | L4 |
|-----------|----|----|-----|
| Question & domain | Clear variables | Justified scale/season/method | Sensitivity changes interpretation |
| Provenance | Sources listed | Full manifest + licences | Source conflicts discussed |
| Methods | Tutorial-level fit | Diagnostics + baseline | Alternatives compared |
| Validation | Basic metrics | Blocked/holdout design | Robustness documented |
| Software | Runs once | Tested, pinned, documented rerun | Snapshot/archive ready |
| Communication | Figures present | Uncertainty + non-claims | Anticipates misuse |

## Definition of done
- [ ] Track H or M selected and brief written  
- [ ] Manifest + QC/EDA complete  
- [ ] Baseline beaten or failure explained  
- [ ] Holdout/blocked validation reported  
- [ ] Software gate from Unit 5.11 met  
- [ ] Report includes limitations and non-claims  
- [ ] External person can rerun from README  

## Relation to chapter exit competencies
| Competency | Capstone mapping |
|------------|------------------|
| Reproducible repo | Required software gate |
| GLM/mixed | Optional unless track needs it; else demonstrated in 5.9 homework |
| EOF/PCA | Optional extension; else 5.8 homework |
| Causal brief | Optional; else 5.10 homework |
