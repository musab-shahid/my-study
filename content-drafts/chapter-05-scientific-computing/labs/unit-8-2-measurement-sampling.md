# Unit 8.2 — Measurement and sampling design lab

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_8_2_measurement_sampling_check.py
```

## Task

Complete a design card for **summer neighbourhood heat exposure** (or your own construct). Include construct, operational definition, indicator, unit, scale, target population, frame, sampling/observation/analysis units, probability vs non-probability, spatial/temporal support, detection limit if any.

## Assessment criteria

| Criterion | Pass |
|-----------|------|
| Construct ≠ indicator | Clear separation |
| Frame vs population | Different or justified identical |
| Method honesty | Non-probability ⇒ no population inference claim |
| Spatial/temporal support | Stated |
| Detection limit | If declared, value finite and ≥ 0 (**zero allowed**) |

## Answer-key sketch (illustrative)

- Construct: outdoor heat exposure of residents  
- Operational definition: mean JJA daytime LST over residential parcels  
- Indicator: MODIS LST_Day_1km JJA mean; unit °C; scale interval  
- Population: all residential parcels in City X  
- Frame: parcels with ≥80% cloud-free composites  
- Method: non-probability availability sample → **no** unbiased city-wide inference  
