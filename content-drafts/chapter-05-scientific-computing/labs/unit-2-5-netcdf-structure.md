# Unit 2.5 — NetCDF-like structure lab

## Commands

```bash
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_5_netcdf_structure_check.py
python content-drafts/chapter-05-scientific-computing/fixtures/unit_2_5_climate_data_handling_check.py
```

## Tasks

1. List the dimensions and variables in the good cube; state tas shape and units.
2. Explain why a shape mismatch is a hard failure before computing anomalies.
3. Name two attributes a data variable should carry (units + standard_name or long_name).
4. State what this lab does **not** do (binary file I/O, full CF compliance).

## Acceptance criteria

| Criterion | Pass |
|-----------|------|
| Model | Dimensions vs variables vs attributes distinguished |
| Shape | Mismatch rejected |
| Metadata | Missing units rejected |
| Non-claim | No claim of binary NetCDF parsing |

## Non-claims

Synthetic dict cube only. Not netCDF4/xarray I/O. Not GRIB decoding. Not full CF checker.
