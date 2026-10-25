# Unit 2.6 — Extremes batch lab (multi-index)

## Commands

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_6_extremes_batch_check.py
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_6_etccdi_r10mm_check.py
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_6_etccdi_cdd_check.py
```

## Learning objectives practised

1. **Rx1day** — max valid daily precipitation
2. **Tropical nights (TR)** — Tmin > 20°C count
3. **Summer days (SU25)** — Tmax > 25°C count
4. **CWD** — longest confirmed wet spell (missing breaks)
5. **Baseline sensitivity** — different 90th percentiles by half-period
6. **Bootstrap SE** — resampling uncertainty for a mean
7. **Cohen's d** — standardised mean difference
8. **Heatwave spell-days** — days inside runs ≥ min duration
9. **Compound hot-dry** — co-occurrence count (not causation)
10. **Reporting fields** — baseline, product, period, index, units, limitations

## Tasks

1. Compute Rx1day on `[0, 5, 12, 40, 3, missing, 8]`.
2. Why do first-half and second-half 90th percentiles differ on a stepped series?
3. Give one reason compound hot-dry counts are not attribution.
4. List the six reporting fields and name one missing from `{"baseline":"1991-2020","index":"R10mm"}`.

## Acceptance criteria

| Criterion | Pass |
|-----------|------|
| Multi-index | At least three indices computed correctly |
| Missing | Not coerced to zero for spells or Rx1day |
| Baseline | Sensitivity demonstrated |
| Non-claim | No ETCCDI-compliance or attribution claim |

## Non-claims

Synthetic only. Pedagogical definitions. Not operational climate monitoring.
