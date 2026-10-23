# Unit 4.4 — Image preprocessing and harmonisation lab

**Unit:** Subject 4 · Unit 4.4 Image preprocessing and harmonisation (Core)  
**Fixture:** `content-drafts/chapter-05-scientific-computing/fixtures/unit_4_4_preprocess_harmonise_check.py`  
**Label:** Synthetic teaching contracts — not operational LaSRC/Sen2Cor/HLS runs.

## 1. Run the fixture

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_4_4_preprocess_harmonise_check.py
```

Expected:

1. Radiance from DN with gain/bias (L = 11.5 for the teaching numbers).
2. Omission = 0.125 and commission ≈ 0.222 on the sample confusion counts.
3. Residual RMSE computed from control shifts.
4. Peak of an impulse series reduced after a simple moving-average smoother.

## 2. Deliverable — Preprocessing chain card

Document a chain for a **multi-date optical greenness or surface-water** question:

| Step | Your choice | Version / rule | QC metric |
|------|-------------|----------------|-----------|
| Radiometric level | TOA or SR | processor | — |
| Geometry | co-registration method | — | residual RMSE |
| Mask | product/algorithm | rule text | omission/commission on sample |
| Harmonisation | if multi-sensor | product | overlap check |
| Smoothing | yes/no | method | justification |

## 3. Reflection (6–10 sentences)

1. Why DN and surface reflectance must not be mixed in one NDVI series.  
2. Why mask rules are declared before compositing.  
3. When smoothing helps phenology and when it harms abrupt-change detection.

## 4. Limits

- No live satellite download or commercial GUI required.
- Fixture gain/bias and residuals are synthetic.
- Operational atmospheric processors need their own versioned ancillaries.
