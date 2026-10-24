# Multan UHI flagship — research design (foundation)

**Status:** Foundation / draft. Synthetic and teaching extracts only until a learner-supplied or CI-gated real Landsat/MODIS scene is processed and provenance is recorded.

**Related:** Unit 4.5 SUHI methods · Unit 13 heat-risk screening · Track H in `chapter-05-scientific-computing/03-CAPSTONE.md`

## 1. Primary research question

For a **defined study area and temporal window**, what is the **surface urban heat intensity**

\[
\mathrm{SUHII} = \overline{\mathrm{LST}}_{\text{urban}} - \overline{\mathrm{LST}}_{\text{reference}}
\]

(in °C or K), and how sensitive is SUHII to (a) reference-area definition and (b) valid-pixel coverage thresholds?

## 2. What this project does **not** answer

| Construct | Status |
|-----------|--------|
| Near-surface (2 m) air temperature UHI | Out of scope without station/reanalysis design |
| Personal heat exposure / heat illness risk | Out of scope without exposure & epidemiology |
| Causal effect of vegetation or policy | Out of scope without identification strategy (Unit 5.10) |
| Multan-validated operational product | **Not claimed** until real study-area scenes + validation exist |

## 3. Study design parameters (to be filled per run)

| Parameter | Teaching default | Production requirement |
|-----------|------------------|------------------------|
| Study area | Synthetic zones labeled Multan-like | Official admin or AOI polygon + CRS |
| Period | Synthetic snapshot labels | Explicit Landsat/MODIS dates, season |
| Urban mask | Zone class = urban | Documented land-cover or local plan |
| Reference | Rural / peri-urban alternatives | Justified, same date/product |
| LST product | Synthetic DN/K table or MOD11A2 extract | Official product ID + scale/QA |

## 4. Estimand

**Primary:** Difference in mean daytime LST between urban and reference pixels (or zones), matched in product and date protocol.

**Secondary (sensitivity):** Change in SUHII under alternate reference; effect of minimum valid-pixel fraction.

## 5. Data sources (authoritative targets)

| Role | Product | Documentation |
|------|---------|---------------|
| LST (preferred EO) | Landsat Collection 2 Level-2 ST *or* MOD11A2 LST_Day | USGS Landsat ST; [MOD11A2 v061](https://lpdaac.usgs.gov/products/mod11a2v061/) |
| Urban/reference mask | Local land-cover or WorldCover/ESA (if used) | Provider docs + licence |
| Teaching extract | `data/synthetic_lst_zones.csv` | **Not** observed Multan |

## 6. Analysis plan

1. Load zone-level or pixel-level LST with units and fill handling.  
2. Apply coverage gate (default ≥30% valid in zone).  
3. Compute SUHII for reference design A and B.  
4. Report sensitivity Δ = SUHII_A − SUHII_B.  
5. Emit provenance JSON (inputs, parameters, software, non-claims).

## 7. Validation ladder

1. Software correctness (fixture tests) — **in CI**  
2. Product scale/fill contract — Path C / Unit 4.5  
3. Independent air-temperature or flux comparison — **not yet**  
4. Geographic transfer / multi-year robustness — **not yet**

## 8. Entry points

```bash
python content-drafts/capstones/multan-uhi/analysis/uhi_contrast.py
python content-drafts/chapter-05-scientific-computing/fixtures/unit_multan_uhi_foundation_check.py
```

## 9. Landsat C2 L2 ST local pathway (Gate B)

**Script:** `analysis/landsat_st_local.py`

| Mode | Input | CI |
|------|-------|-----|
| Synthetic | `data/synthetic_landsat_st_scene.json` | Yes |
| Learner GeoTIFF | `--st-tif` + `--zone-tif` [+ `--qa-tif`] | No (needs GDAL + files) |

**Product conversion (USGS C2 L2 ST):**  
\(T_K = DN \times 0.00341802 + 149.0\); fill DN = 0; output contrasts in °C.

**Zones:** raster codes 1=urban, 2=rural reference, 3=peri-urban reference, 0=ignore.  
Means are **valid-pixel averages** within each code (not area-weighted polygons unless weights are supplied upstream).  
Rural and peri-urban SUHII are reported **separately**.

**Coverage:** default minimum 30% valid among zone-labeled pixels.

**QA:** optional array; simplified clear-pixel rule (reject dilated-cloud/cloud bits). Full QA_PIXEL bitfields must be verified against the current USGS handbook.

### Commands

```bash
python content-drafts/capstones/multan-uhi/analysis/landsat_st_local.py
python content-drafts/capstones/multan-uhi/analysis/landsat_st_local.py \
  --st-tif /path/to/LC08_ST.tif --zone-tif /path/to/zones.tif --qa-tif /path/to/QA_PIXEL.tif
python content-drafts/chapter-05-scientific-computing/fixtures/unit_multan_uhi_landsat_st_check.py
```
