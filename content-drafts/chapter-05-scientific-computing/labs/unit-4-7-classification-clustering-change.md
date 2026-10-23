# Unit 4.7 — Classification, clustering, and change lab

**Fixture:** `fixtures/unit_4_7_classification_change_check.py`  
**Label:** Synthetic labels — not a real land-cover product or city change study.

## Locked design rules

| Topic | Rule |
|-------|------|
| Split | Spatially separated blocks; no train/test block overlap |
| Metrics | OA + per-class UA/PA/F1; do not headline kappa |
| Clusters | Integer IDs only until labelled against reference |
| Change | Comparable processing & temporal support required |
| Scenarios | Conditional, not unconditional forecasts |

## 1. Run the fixture

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_4_7_classification_change_check.py
```

## 2. Deliverables

1. **Confusion-matrix card** for a 2-class example: OA, UA/PA for the rare class, one sentence why OA misleads.  
2. **Split diagram** (text): train blocks vs test blocks.  
3. **Change checklist**: four comparability requirements before post-classification comparison.  
4. **Upgrade path**: six steps from exploratory K-means to area-adjusted reporting.

## 3. Limits

Synthetic only. Area-adjusted confidence intervals need a real sampling design (Olofsson-style) not fully computed here. No Dynamic World/ESA download in CI.
