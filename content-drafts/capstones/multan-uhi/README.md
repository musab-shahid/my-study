# Multan UHI foundation (Gate B)

## Reproduce (offline / CI)

```bash
python analysis/uhi_contrast.py
python analysis/landsat_st_local.py
python ../../chapter-05-scientific-computing/fixtures/unit_multan_uhi_foundation_check.py
python ../../chapter-05-scientific-computing/fixtures/unit_multan_uhi_landsat_st_check.py
```

## Learner-supplied Landsat ST

1. Obtain Landsat Collection 2 Level-2 Surface Temperature + QA_PIXEL from USGS/EarthExplorer (account may be required).
2. Prepare a zone raster (codes 1/2/3/0) in the same grid/CRS.
3. Run `landsat_st_local.py --st-tif ... --zone-tif ... [--qa-tif ...]`.

No files are downloaded by this repository. Synthetic outputs are not Multan science results.
