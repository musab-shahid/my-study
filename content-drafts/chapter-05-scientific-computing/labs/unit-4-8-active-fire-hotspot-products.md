# Unit 4.8 — Active fire and hotspot products lab (Support)

**Fixture:** `fixtures/unit_4_8_active_fire_check.py`  
**Label:** Synthetic observation records — **not** real FIRMS/MODIS/VIIRS data.

## Guardrails

1. Detection records ≠ unique fire events (dedup not implemented here).  
2. Unique cells ≠ burned hectares.  
3. Masked ≠ confirmed absence of fire.  
4. Burned area is a **separate** quantity with its own provenance.  
5. Exercise confidence threshold is **not** a universal operational FIRMS rule.

## 1. Run

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_4_8_active_fire_check.py
```

Expected (min_confidence=50): 6 records, 3 detections, 2 unique cells, 1 masked, burned_area field remains null from the detection path.

## 2. Deliverables

1. **Count card:** records vs unique cells; state that unique events are not claimed.  
2. **Limitations sentence** for a one-week VIIRS map with a confidence filter.  
3. **Dashboard checklist:** lineage fields + separation of AF / BA / smoke layers.  
4. **Counterexample note:** why more detections need not mean more burned area.

## 3. Limits

No live download. Consult current NASA FIRMS / product user guides for operational thresholds and field definitions.
