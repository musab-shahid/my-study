"""Unit 3.3 zonal statistics on an explicit cell-membership mask (stdlib).

Validates mean/sum/count with NoData exclusion. Membership is provided as a
zone-id mask aligned with the value grid — this checks aggregation logic, not
polygon rasterization or GIS engine topology.

Grid (values):
  10  20  -9999
  30  40     50
  60  70     80
NoData sentinel = -9999

Zone mask:
  1  1  1
  1  2  2
  2  2  0   # zone 0 = outside / ignored
"""
from __future__ import annotations

from math import isclose

NODATA = -9999

VALUES = [
    [10.0, 20.0, NODATA],
    [30.0, 40.0, 50.0],
    [60.0, 70.0, 80.0],
]
ZONES = [
    [1, 1, 1],
    [1, 2, 2],
    [2, 2, 0],
]


def zonal_mean_sum_count(values, zones, zone_id: int, nodata=NODATA):
    vals = []
    for r in range(len(values)):
        for c in range(len(values[0])):
            if zones[r][c] != zone_id:
                continue
            v = values[r][c]
            if v == nodata:
                continue
            vals.append(v)
    if not vals:
        return {"count": 0, "sum": None, "mean": None}
    s = sum(vals)
    return {"count": len(vals), "sum": s, "mean": s / len(vals)}


def main() -> None:
    z1 = zonal_mean_sum_count(VALUES, ZONES, 1)
    # Zone 1 cells: 10, 20 (nodata skipped), 30 → mean 20, sum 60, count 3
    assert z1["count"] == 3
    assert isclose(z1["sum"], 60.0, rel_tol=0, abs_tol=1e-12)
    assert isclose(z1["mean"], 20.0, rel_tol=0, abs_tol=1e-12)

    z2 = zonal_mean_sum_count(VALUES, ZONES, 2)
    # 40, 50, 60, 70 → sum 220, mean 55, count 4
    assert z2["count"] == 4
    assert isclose(z2["sum"], 220.0, rel_tol=0, abs_tol=1e-12)
    assert isclose(z2["mean"], 55.0, rel_tol=0, abs_tol=1e-12)

    z0 = zonal_mean_sum_count(VALUES, ZONES, 9)  # empty zone
    assert z0["count"] == 0
    assert z0["mean"] is None

    # Zero is valid, not NoData
    values_with_zero = [row[:] for row in VALUES]
    values_with_zero[0][0] = 0.0
    z1z = zonal_mean_sum_count(values_with_zero, ZONES, 1)
    assert z1z["count"] == 3
    assert isclose(z1z["sum"], 50.0, rel_tol=0, abs_tol=1e-12)  # 0+20+30

    # Treating NoData as zero would wrongly inflate count and deflate mean
    bad_count = 4  # if someone counted the nodata cell as 0
    assert z1["count"] != bad_count

    print(
        "Unit 3.3 zonal stats checks passed "
        f"(zone1 mean={z1['mean']}, zone2 mean={z2['mean']})."
    )


if __name__ == "__main__":
    main()
