# Capstone Path C — Real MOD11A2 granule

| Claim | Status |
|-------|--------|
| Synthetic Path A tests | Automated in CI |
| Offline public-data Path B | Automated in CI |
| Miniature scale/fill Path C logic | Automated in CI |
| Local learner-supplied HDF processing (GDAL) | Implemented in fixture; **not** run in CI without a file |
| Genuine NASA granule downloaded in CI | **No** |
| Multan empirical LST validated | **No** |

Acquisition and interpretation: `content-drafts/chapter-05-scientific-computing/labs/unit-13-modis-real-granule.md`

Default CI command exercises only the miniature JSON contract. Optional:
`python …/unit_13_modis_local_process_check.py --hdf /path/to/MOD11A2….hdf`
