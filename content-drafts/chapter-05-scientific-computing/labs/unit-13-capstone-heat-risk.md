# Unit 13.2 — Capstone labs: synthetic path + public-data pathway

## Path A — Synthetic (deterministic CI)

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_capstone_heat_risk_check.py
```

Protocol → row contracts → baseline → H/E/V ranks → decision card → fingerprint.

## Path B — Public-data pathway (offline teaching extract)

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_public_data_pathway_check.py
```

1. Read `fixtures/data/capstone_public_manifest.json` (MOD11A2 documentation, licence note, units, resolution).
2. Load `fixtures/data/capstone_lst_extract_sample.csv` (schema-matched teaching extract; **not** a verified Multan download).
3. QA-filter (`qa_ok=1`), compute LST anomaly vs extract mean.
4. Merge **explicit synthetic** exposure/vulnerability proxies (no silent zeros).
5. Compare equal-weight vs heat-heavy ranks.
6. Reject LST=air-temperature and calibrated-health claims.

### Acquire real MODIS data (manual, outside CI)

1. Open [MOD11A2 v061 product page](https://lpdaac.usgs.gov/products/mod11a2v061/).
2. Use Earthdata Search / LP DAAC tools for the study window (account may be required).
3. Record retrieval date, granule IDs, CRS, scale factors, and licence in a local manifest.
4. Replace the teaching extract with your processed neighbourhood means—**do not** cite the teaching CSV as observations.

### Non-claims

- LST ≠ near-surface air temperature  
- Rankings ≠ calibrated health risk or expected loss  
- Synthetic E/V proxies ≠ census ground truth  
- Pipeline success ≠ validated adaptation priority  
