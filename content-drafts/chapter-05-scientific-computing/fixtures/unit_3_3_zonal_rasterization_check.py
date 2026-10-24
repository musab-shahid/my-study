"""Deterministic synthetic check for the Unit 3.3 zonal-statistics lab.

This is a standard-library teaching fixture. It does not call QGIS/GDAL and
cannot validate a production polygon rasterization engine.
"""
from math import isclose

NODATA = -9999
RASTER = [
    [10, 20, NODATA, 40],
    [12, 22, 32, 42],
    [14, NODATA, 34, 44],
]
# Pixel-center coordinates are x=(0.5, 1.5, 2.5, 3.5) and
# y=(2.5, 1.5, 0.5) from the first row to the last.
ZONES = {
    "urban": (0.0, 1.0, 2.0, 3.0),
    "reference": (2.0, 0.0, 4.0, 3.0),
}


def summarize(rectangle):
    xmin, ymin, xmax, ymax = rectangle
    assigned = []
    valid = []
    for row_index, row in enumerate(RASTER):
        y = 2.5 - row_index
        for col_index, value in enumerate(row):
            x = 0.5 + col_index
            # Strict center-in-rectangle test; boundaries are excluded.
            if xmin < x < xmax and ymin < y < ymax:
                assigned.append(value)
                if value != NODATA:
                    valid.append(value)
    return {
        "assigned": len(assigned),
        "valid": len(valid),
        "coverage": len(valid) / len(assigned) if assigned else 0.0,
        "mean": sum(valid) / len(valid) if valid else None,
    }


def main():
    urban = summarize(ZONES["urban"])
    reference = summarize(ZONES["reference"])
    assert urban["assigned"] == 4
    assert urban["valid"] == 4
    assert isclose(urban["coverage"], 1.0)
    assert isclose(urban["mean"], 16.0)
    assert reference["assigned"] == 6
    assert reference["valid"] == 5
    assert isclose(reference["coverage"], 5 / 6)
    assert isclose(reference["mean"], 38.4)
    assert isclose(urban["mean"] - reference["mean"], -22.4)
    # Guard against a common error: including the NoData sentinel or zero.
    assert not isclose(reference["mean"], sum(v for row in RASTER for v in row if v != NODATA) / 10)
    print("PASS: synthetic zonal counts, NoData exclusion, coverage and means")
    print("LIMIT: arithmetic fixture only; no GIS engine or real dataset executed")


if __name__ == "__main__":
    main()
