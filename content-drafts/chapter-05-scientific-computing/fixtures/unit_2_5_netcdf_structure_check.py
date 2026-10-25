"""Unit 2.5 NetCDF-like data-model teaching checks (stdlib only).

Validates a minimal CF-style cube dictionary:
  dimensions, variables (with dims + shape), and required attributes.

Does not read binary NetCDF/GRIB files and does not require netCDF4.
"""
from __future__ import annotations


def validate_cube(cube: dict) -> list[str]:
    errs: list[str] = []
    dims = cube.get("dimensions")
    variables = cube.get("variables")
    if not isinstance(dims, dict) or not dims:
        errs.append("dimensions_missing")
        dims = {}
    if not isinstance(variables, dict) or not variables:
        errs.append("variables_missing")
        variables = {}

    for name, size in dims.items():
        if not isinstance(size, int) or size <= 0:
            errs.append(f"bad_dimension_size:{name}")

    for vname, var in variables.items():
        if not isinstance(var, dict):
            errs.append(f"variable_not_object:{vname}")
            continue
        vdims = var.get("dims")
        data = var.get("data")
        attrs = var.get("attrs") or {}
        if not isinstance(vdims, (list, tuple)) or not vdims:
            errs.append(f"variable_dims_missing:{vname}")
            continue
        for d in vdims:
            if d not in dims:
                errs.append(f"unknown_dimension:{vname}:{d}")
        if not isinstance(data, list):
            errs.append(f"data_not_list:{vname}")
            continue
        # shape check for 1D or nested 2D lists
        expected = [dims[d] for d in vdims if d in dims]
        shape = _shape(data)
        if expected and shape != expected:
            errs.append(f"shape_mismatch:{vname}:{shape}!={expected}")
        # CF-ish required attrs for data variables (not pure coordinates)
        if vname not in dims:
            if "units" not in attrs:
                errs.append(f"missing_units:{vname}")
            if "standard_name" not in attrs and "long_name" not in attrs:
                errs.append(f"missing_standard_or_long_name:{vname}")

    return errs


def _shape(data: list) -> list[int]:
    if not isinstance(data, list):
        return []
    if not data:
        return [0]
    if all(not isinstance(x, list) for x in data):
        return [len(data)]
    # rectangular 2D
    rows = len(data)
    cols = len(data[0]) if data and isinstance(data[0], list) else 0
    if any(not isinstance(row, list) or len(row) != cols for row in data):
        return [rows, -1]
    return [rows, cols]


def main() -> None:
    good = {
        "dimensions": {"time": 3, "lat": 2},
        "variables": {
            "time": {
                "dims": ["time"],
                "data": [0, 1, 2],
                "attrs": {"units": "days since 2000-01-01", "standard_name": "time"},
            },
            "lat": {
                "dims": ["lat"],
                "data": [30.0, 31.0],
                "attrs": {"units": "degrees_north", "standard_name": "latitude"},
            },
            "tas": {
                "dims": ["time", "lat"],
                "data": [[300.1, 301.0], [299.5, 300.2], [301.1, 302.0]],
                "attrs": {"units": "K", "standard_name": "air_temperature"},
            },
        },
    }
    assert validate_cube(good) == []

    bad_shape = {
        "dimensions": {"time": 3, "lat": 2},
        "variables": {
            "tas": {
                "dims": ["time", "lat"],
                "data": [[1, 2], [3, 4]],  # wrong time length
                "attrs": {"units": "K", "standard_name": "air_temperature"},
            }
        },
    }
    e1 = validate_cube(bad_shape)
    assert any(x.startswith("shape_mismatch") for x in e1)

    missing_units = {
        "dimensions": {"time": 2},
        "variables": {
            "tas": {
                "dims": ["time"],
                "data": [1.0, 2.0],
                "attrs": {"standard_name": "air_temperature"},
            }
        },
    }
    e2 = validate_cube(missing_units)
    assert "missing_units:tas" in e2

    unknown_dim = {
        "dimensions": {"time": 2},
        "variables": {
            "tas": {
                "dims": ["time", "lon"],
                "data": [[1, 2], [3, 4]],
                "attrs": {"units": "K", "standard_name": "air_temperature"},
            }
        },
    }
    e3 = validate_cube(unknown_dim)
    assert any("unknown_dimension" in x for x in e3)

    print(
        "Unit 2.5 NetCDF-structure checks passed "
        f"(bad_shape_errs={len(e1)}, missing_units_errs={len(e2)}, unknown_dim_errs={len(e3)})."
    )


if __name__ == "__main__":
    main()
