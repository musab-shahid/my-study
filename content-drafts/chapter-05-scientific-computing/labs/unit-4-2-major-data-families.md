# Unit 4.2 — Major data families lab

**Unit:** Subject 4 · Unit 4.2 Major data families (Core)  
**Fixture:** `content-drafts/chapter-05-scientific-computing/fixtures/unit_4_2_data_families_check.py`  
**Label:** Synthetic teaching contracts — not live Landsat/Sentinel downloads or operational scale tables.

## 1. Run the fixture

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_4_2_data_families_check.py
```

Expected behaviour:

1. Decode a synthetic Landsat-style surface-temperature DN to **ST ≈ 300 K** using documented teaching scale/offset.
2. **Refuse** decode when scale is missing (raises).
3. Count **usable clear pixels = 3** among mixed QA flags (`clear` / `cloud` / `shadow` / `missing`).
4. Keep product-family fitness tags distinct (optical SR ≠ thermal ST ≠ SAR backscatter ≠ DEM ≠ land cover).

The scale/offset constants in the fixture are **illustrative**. Operational work must read the current USGS Landsat Collection documentation (or the relevant agency table) for the exact product.

## 2. Product cards (deliverable)

Complete **three** product cards using the checklist from lesson `cgei-rs-lesson-4-2-3`:

| Card | Suggested family |
|------|------------------|
| A | Optical L2 surface reflectance (e.g. Landsat C2 L2 SR or Sentinel-2 L2A) |
| B | SAR backscatter (e.g. Sentinel-1 GRD) |
| C | DEM or thematic land-cover product |

Each card must state:

- Family and mission / product name and version
- Variable and units **after** decode (or “unitless class” for land cover)
- Spatial resolution vs output grid; temporal support
- QA / mask rules and invalid values
- Licence, latency, access path
- Known continuity limits (and surface-vs-terrain for DEM)

## 3. Cloudy-season selection paragraph

For a **monsoon surface-water** (or crop green-up) question in southern Punjab-scale study:

1. Argue whether optical-only reflectance is sufficient.
2. State what SAR adds and what it does **not** measure (e.g. not chlorophyll; not a DEM).
3. Note QA / cloud filtering effects on seasonal composites.
4. Do **not** declare one family universally best.

## 4. Assumptions and limits

- No credentials or live API required for the core lab.
- Fixture values are synthetic.
- Mission constellation status changes — verify agency notices for operational planning.
