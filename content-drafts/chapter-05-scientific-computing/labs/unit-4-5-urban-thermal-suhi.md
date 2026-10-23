# Unit 4.5 — Urban thermal environment (SUHI/UHI) lab

**Unit:** Subject 4 · Unit 4.5 Urban thermal environment analysis (SUHI/UHI methods) · Core  
**Fixture:** `fixtures/unit_4_5_suhi_analysis_check.py`  
**Label:** Synthetic LST samples — not a real city study or causal impact evaluation.

## Scientific protocol (locked for this lab)

| Element | Teaching rule |
|---------|----------------|
| Quantity | **SUHII** = mean LST_urban − mean LST_reference (K) |
| Not measured here | Canopy-layer air-temperature UHI; heat-health indices |
| Dates | Prefer **matched-date** urban/reference pairs |
| Reference | ≥2 alternatives; elevation/land-cover awareness; exclude non-comparable water/relief when justified |
| QA | Valid pixels only; report n_valid / coverage |
| Attribution | Associational language only unless design supports more |

## 1. Run the fixture

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_4_5_suhi_analysis_check.py
```

Expected: SUHII_A ≈ 3.625 K, SUHII_B ≈ 2.125 K (reference sensitivity), matched contrast below a naive mismatched-date contrast, coverage gate, area-weighted mean behaviour.

## 2. Deliverable — Study-design card

1. **Estimand:** one sentence (city-scale surface contrast under stated protocol).  
2. **Urban target:** inclusion rule.  
3. **References:** two candidates and why each is defensible or flawed.  
4. **Temporal rule:** matched dates and/or composite window + mask rule.  
5. **Coverage rule:** minimum valid fraction.  
6. **Sensitivity:** what you re-run when reference or composite changes.  
7. **Non-claims:** one causal sentence you will **not** write from this design alone.

## 3. Limits

- Synthetic numbers only.  
- No health outcome inference.  
- LST ≠ air temperature; exposure needs population/access layers (Subject 7).  
- Clear-sky sampling bias remains (Units 4.3–4.4).
