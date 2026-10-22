"""Unit 5.12 multidimensional array *contract* checks (stdlib).

Represents a tiny regular lat-lon-time cube as nested lists and verifies
selection, missing-value handling and an unweighted spatial mean.

This is NOT an xarray execution test. It locks scientific bookkeeping
invariants that an xarray pipeline must also respect. Equal-area weighting
is not applied; cells are treated as equal weight only for this toy grid.
"""
from __future__ import annotations

from math import isclose, nan


def spatial_mean(field: list[list[float]]) -> float:
    vals = [v for row in field for v in row if v == v]  # drop NaN
    return sum(vals) / len(vals)


def main() -> None:
    # Regular 2x2 spatial grid, 3 times; units: degree_Celsius (toy)
    # dims order: time, lat, lon
    data = [
        [[20.0, 22.0], [21.0, 23.0]],
        [[21.0, 23.0], [22.0, nan]],
        [[22.0, 24.0], [23.0, 25.0]],
    ]
    times = ["2024-06-01", "2024-06-02", "2024-06-03"]
    lats = [30.0, 31.0]
    lons = [70.0, 71.0]

    assert len(data) == 3 and len(lats) == 2 and len(lons) == 2
    assert times[1] == "2024-06-02"

    # Select time index 1
    t1 = data[1]
    mean_t1 = spatial_mean(t1)
    assert isclose(mean_t1, 22.0, rel_tol=0, abs_tol=1e-12)

    # Time mean of valid cells at (lat0, lon0)
    series = [data[t][0][0] for t in range(3)]
    assert isclose(sum(series) / 3, 21.0, rel_tol=0, abs_tol=1e-12)

    # Missing value is not treated as zero
    assert spatial_mean([[nan, 10.0], [10.0, 10.0]]) == 10.0

    print(
        "Unit 5.12 multidim contract checks passed "
        f"(t1_unweighted_mean={mean_t1}, point_time_mean=21.0)."
    )
    print(
        "Note: stdlib contract only; xarray Dataset API is not executed here."
    )


if __name__ == "__main__":
    main()
