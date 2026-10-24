# Unit 7.3 — Heat hazard intensity–likelihood lab

Synthetic teaching data only.

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_7_3_heat_hazard_check.py
```

## Definitions

| Term | Definition in this lab |
|------|------------------------|
| Intensity | Mean positive excess of daily Tmax above **40°C** (°C) |
| Likelihood | **Integer count** of heat spells over **10 seasons** (0 = rare; 1–3 = occasional; ≥4 = frequent) |
| Screen score | Ordinal 1–5 from intensity × likelihood matrix |
| Not included | Population exposure, vulnerability, health outcomes |

## Non-claims

- Not a calibrated probability of death, hospitalisation or crop loss
- Series are labelled Tmax-style; not Multan station data
- Threshold 40°C is **pre-specified for teaching**, not an operational HAP trigger
