# Subject 7 Core audit status

Canonical Core units: **7.1**, **7.3**, **7.5**.  
Support/Optional (deferred): 7.2, 7.4, 7.6–7.10.

## Outcome evidence

| Outcome area | Status | Evidence |
|--------------|--------|----------|
| H/E/V/capacity vocabulary & risk as interaction | implemented (draft) | Lessons `cgei-risk-lesson-7-1-*`; questions |
| Hazard modules overview | mapped_partial | Unit 7.3 lessons; not full multi-hazard library |
| Transparent index, weights, missing components | implemented (synthetic) | `unit_7_risk_index_check.py`; lesson 7-5-1; lab |
| Normalisation & capacity directionality | implemented (synthetic) | Fixture normalisation/capacity block |
| Weight sensitivity of ranks | implemented | Equal vs hazard-heavy vs vuln-heavy ranks |
| Screening ≠ measured/forecast risk; no causality | implemented (teaching) | Lesson prose + lab non-claims |
| Historical loss validation | mapped_partial / deferred | Explicitly not claimed |
| Cat models, EWS, adaptation finance | deferred_support | Units 7.6–7.9 |

## Downstream

Subjects 9, 10, and 13 may reuse H–E–V separation and weight-sensitivity discipline; they must not treat the synthetic index as calibrated loss.

## Unit 7.3 heat module (V16)

- **Implemented (synthetic):** intensity = mean Tmax excess above 40°C; likelihood = stated events/10 seasons; ordinal 1–5 screen matrix.
- **Fixture:** `unit_7_3_heat_hazard_check.py`
- **Still mapped_partial / deferred:** WBGT/UTCI, heat–mortality curves, flood/drought modules, operational HAP triggers, Multan validation.
