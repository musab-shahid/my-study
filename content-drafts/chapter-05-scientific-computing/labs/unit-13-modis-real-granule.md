# Unit 13.2 — Path C: Real MODIS/Terra MOD11A2 granule (learner-side)

**CI does not download NASA data.** Paths A/B remain the offline regression suite.

## Official product

| Field | Value |
|-------|--------|
| Product | MODIS/Terra Land Surface Temperature/Emissivity 8-Day L3 Global 1 km |
| Short name | **MOD11A2** |
| Version | **061** |
| Layer | `LST_Day_1km` |
| Scale factor | **0.02** (DN × 0.02 → Kelvin) |
| Fill value | **0** |
| Docs | https://lpdaac.usgs.gov/products/mod11a2v061/ |

## Acquisition (manual — credentials never committed)

1. Create a free [NASA Earthdata Login](https://urs.earthdata.nasa.gov/) if required.
2. Open the [MOD11A2 v061 product page](https://lpdaac.usgs.gov/products/mod11a2v061/) or Earthdata Search.
3. Select a granule covering **your** study area and 8-day period (for Multan-oriented work, choose a tile/window that intersects southern Punjab and record the exact granule ID).
4. Download the HDF to a **local** directory outside Git (e.g. `~/data/modis/`).
5. Record in a local manifest (do not commit secrets):
   - granule ID / filename
   - product version
   - temporal coverage (8-day range)
   - download date (UTC)
   - source URL or Earthdata order ID
   - SHA-256 of the downloaded file
   - documentation URL above

**Do not** commit Earthdata passwords, tokens, cookies, or temporary signed URLs.

## Local processing sketch (after download)

Dependencies (learner machine): GDAL with HDF4 support, or `pyhdf` / NASA tools — **not required for CI**.

```bash
# Inspect subdatasets (example)
gdalinfo MOD11A2.A2023161.h24v06.061.*.hdf

# Extract LST_Day_1km subdataset (name varies by GDAL build — confirm with gdalinfo)
# Apply scale 0.02 and set 0 to NoData per product guide.
```

Then:

1. Confirm layer identity, dimensions, georeferencing, fill value.
2. Apply **scale_factor 0.02** before interpreting Kelvin.
3. Convert to °C only after scale: `C = K - 273.15`.
4. Optionally crop to a documented study boundary with explicit CRS handling.
5. Export GeoTIFF/CSV summary **with** product, date range, scale, fill, QA treatment, CRS.
6. Label outputs: **not quality-screened** unless you apply official QC bit rules from the product user guide.

## Offline CI analogue (Path C logic)

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_modis_local_process_check.py
```

Uses `fixtures/data/modis_miniature/lst_day_miniature.json` to lock scale/fill/Celsius maths. **Not a real granule.**

## Scientific non-claims

- A processed raster is **not** a climatology, trend, or attribution study.
- LST ≠ 2 m air temperature; hazard ≠ exposure ≠ vulnerability ≠ risk.
- Neighbourhood rankings need documented aggregation and still require human review.
- This exercise was **not** executed against a Multan granule in the repository CI environment.
