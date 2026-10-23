"""Unit 3.3 reclassification and map algebra (stdlib).

Reclass rules (LST-like teaching values in °C, synthetic):
  NoData sentinel = -9999
  < 20          → class 1 (cool)
  20 ≤ x < 30   → class 2 (moderate)   # left-closed, right-open except top
  30 ≤ x        → class 3 (hot)
  NoData stays NoData

Map algebra: indicator = 1 where class == 3 else 0; NoData stays NoData.
Incompatible grids (different shape) raise ValueError.
"""
from __future__ import annotations

from math import isclose

NODATA = -9999

INPUT = [
    [15.0, 22.0, NODATA],
    [30.0, 28.0, 35.0],
    [10.0, 30.0, 19.9],
]

EXPECTED_RECLASS = [
    [1, 2, NODATA],
    [3, 2, 3],
    [1, 3, 1],
]

EXPECTED_HOT = [
    [0, 0, NODATA],
    [1, 0, 1],
    [0, 1, 0],
]


def reclassify(grid, nodata=NODATA):
    out = []
    for row in grid:
        out_row = []
        for v in row:
            if v == nodata:
                out_row.append(nodata)
            elif v < 20:
                out_row.append(1)
            elif v < 30:
                out_row.append(2)
            else:
                out_row.append(3)
        out.append(out_row)
    return out


def hot_indicator(reclassed, nodata=NODATA):
    out = []
    for row in reclassed:
        out_row = []
        for v in row:
            if v == nodata:
                out_row.append(nodata)
            else:
                out_row.append(1 if v == 3 else 0)
        out_row and None
        out.append(out_row)
    return out


def require_same_shape(a, b):
    if len(a) != len(b) or any(len(ra) != len(rb) for ra, rb in zip(a, b)):
        raise ValueError("incompatible grid shapes")


def cellwise_diff(a, b, nodata=NODATA):
    require_same_shape(a, b)
    out = []
    for ra, rb in zip(a, b):
        row = []
        for va, vb in zip(ra, rb):
            if va == nodata or vb == nodata:
                row.append(nodata)
            else:
                row.append(va - vb)
        out.append(row)
    return out


def main() -> None:
    rec = reclassify(INPUT)
    assert rec == EXPECTED_RECLASS
    # Boundary: 30 is class 3; 19.9 is class 1; 20 would be class 2
    assert reclassify([[20.0]])[0][0] == 2
    assert reclassify([[30.0]])[0][0] == 3
    assert reclassify([[NODATA]])[0][0] == NODATA
    # Zero is a valid value, not NoData
    assert reclassify([[0.0]])[0][0] == 1

    hot = hot_indicator(rec)
    assert hot == EXPECTED_HOT

    # Compatible difference
    d = cellwise_diff([[10.0, NODATA], [5.0, 2.0]], [[3.0, 1.0], [NODATA, 2.0]])
    assert d == [[7.0, NODATA], [NODATA, 0.0]]

    try:
        cellwise_diff([[1.0]], [[1.0, 2.0]])
        raise AssertionError("expected shape error")
    except ValueError:
        pass

    print(
        "Unit 3.3 reclass/map-algebra checks passed "
        f"(hot cells={[c for row in hot for c in row if c == 1]})."
    )


if __name__ == "__main__":
    main()
