# Capstone Path C — Local MOD11A2 processing

## What this path is

| Mode | What runs | When |
|------|-----------|------|
| **CI / default** | Miniature JSON scale/fill/K→°C contract | `python …/unit_13_modis_local_process_check.py` |
| **Learner local HDF** | Optional GDAL open of a **learner-supplied** MOD11A2/MYD11A2 `.hdf` | `--hdf /path/to/file.hdf` or `MODIS_HDF_PATH` |

| Claim | Status |
|-------|--------|
| Synthetic Path A tests | Automated in CI |
| Offline public-data Path B | Automated in CI |
| Miniature scale/fill Path C logic | Automated in CI |
| Local HDF processing code path | Implemented (requires GDAL + learner file) |
| Genuine NASA granule downloaded in CI | **No** |
| Multan empirical LST validated | **No** |

## Product parameters (MOD11A2 v061)

Documented at https://lpdaac.usgs.gov/products/mod11a2v061/

| Parameter | Teaching value |
|-----------|----------------|
| Layer | `LST_Day_1km` |
| Scale factor | **0.02** (DN → Kelvin) |
| Fill / nodata | **0** |
| Units after scale | Kelvin; curriculum converts to °C via \(T_{°C} = T_K - 273.15\) |
| Composite | 8-day; **not** a climatology |

## Dependencies

- **Miniature path:** Python 3 stdlib only.
- **Local HDF path:** GDAL with Python bindings, e.g.:
  - `conda install -c conda-forge gdal`
  - or system GDAL + `pip install gdal` matching the library version  
  If GDAL is missing, the tool exits with a clear error and does **not** pretend the file was processed.

## How to obtain a granule (manual; not performed by this repo)

1. Create a free **NASA Earthdata** account if required by the distributor.
2. Use NASA Earthdata Search or LP DAAC tools (e.g. AppEEARS) to select product **MOD11A2** version **061**.
3. Choose a tile/date for **your** study design (this curriculum does not ship a Multan granule).
4. Download the `.hdf` to your machine. **Do not commit large HDF files to git.**

## How to run local processing

```bash
# Contract tests only (CI-safe, miniature JSON):
python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_modis_local_process_check.py

# Learner-supplied file (requires GDAL):
python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_modis_local_process_check.py \
  --hdf /absolute/path/to/MOD11A2.AYYYYDDD.hXXvYY.061.*.hdf

# Or:
export MODIS_HDF_PATH=/absolute/path/to/MOD11A2....hdf
python content-drafts/chapter-05-scientific-computing/fixtures/unit_13_modis_local_process_check.py --hdf "$MODIS_HDF_PATH"
```

**Filename rule:** the basename must contain `MOD11A2` or `MYD11A2` and use a `.hdf` / `.hdf4` / `.h4` extension. Arbitrary HDF files are rejected.

## Outputs

- Provenance JSON under `fixtures/data/modis_miniature/outputs/local_hdf_preview_*.json` when HDF mode succeeds.
- Fields include source path, SHA-256, scale/fill, preview size, mean/min/max °C, and explicit limitations.
- Preview is a **corner window** (default ≤32×32) for memory safety—not full-granule analysis.

## Failures you should see

| Condition | Behaviour |
|-----------|-----------|
| Missing path | `missing_file:…` |
| Name without MOD11A2/MYD11A2 | `filename_must_contain_MOD11A2_or_MYD11A2` |
| Wrong extension | `unexpected_extension` |
| No GDAL | `gdal_python_not_available` |
| No LST_Day layer | `missing_required_layer_LST_Day_1km` |

## What success does **not** mean

- Not air temperature or validated human heat exposure  
- Not Multan (or any city) scientific validation unless **you** document study-area provenance  
- Not QC-bit screening unless you extend the pipeline  
- Not operational risk ranking  

See also: `docs/cgei/capstone-modis-real-granule.md`, `docs/cgei/capstone-public-data-manifest.md`.

## Pixel validity policy (V21)

1. Fill/nodata pixels are excluded from statistics.
2. Scaled Kelvin values outside the **teaching** sanity range [250, 340] K are excluded and counted as `n_rejected_range` (curriculum check, not LP DAAC QC SDS).
3. If no valid pixels remain, processing fails.
4. Provenance records whether scale/fill/version came from the file, GDAL, or documented fallback (`scale_source`, `fill_source`, `version_source`).
5. Statistics are for the **preview window only** (`stats_scope=preview_window_only`). No full georeferenced GeoTIFF is exported by this tool.
