# Unit 4.3 — Spectral indices and thermal products lab

**Unit:** Subject 4 · Unit 4.3 Spectral indices and thermal products (Core)  
**Fixture:** `content-drafts/chapter-05-scientific-computing/fixtures/unit_4_3_indices_lst_check.py`  
**Label:** Synthetic reflectance and ST teaching contracts — not live Landsat scenes.

## 1. Run the fixture

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_4_3_indices_lst_check.py
```

Expected:

1. NDVI sparse ≈ 0.163 and dense = 0.80 from synthetic reflectance pairs.
2. ST decode to 310 K with teaching Collection-2 style scale/offset.
3. Surface-reflectance teaching decode near 0.1.
4. Usable clear count = 3 under mixed QA flags.
5. Clear-sky subset mean LST > full-series mean when cool cloudy samples are excluded.

Operational ST/SR scale factors must be verified against current USGS product documentation.

## 2. Deliverable A — Index card

For **one** vegetation or water index (NDVI, EVI, NDWI/MNDWI, or NBR):

- Formula and band identities
- What it responds to
- Saturation / soil / turbidity failure mode
- Independent check you would use

## 3. Deliverable B — LST discipline paragraph

In 6–10 sentences:

1. State ST = DN × scale + offset with the teaching constants and the verify-docs rule.
2. Explain why QA/cloud rules come before compositing.
3. Explain clear-sky warm bias and why `n_valid` matters.
4. State why morning LST ≠ afternoon air temperature / heat-stress index.

## 4. Limits

- No live download or credentials required.
- UTFVI-style categories are descriptive, not health thresholds.
- Thermal sharpening assumptions are discussed conceptually only (no sharpening code in the fixture).
