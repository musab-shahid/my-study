"""Unit 2.4 climate data-product QC and comparison (stdlib).

Synthetic station daily Tmax (°C) with deliberate defects:
  range violation, step jump, spike, persistence, missing vs zero.

Also a tiny 2×2 gridded field (°C) representing a grid-cell mean that
need not equal a point station inside the cell.

Teaching only — not GHCN ingestion, homogenisation software, or ERA5 validation.
"""
from __future__ import annotations

from math import isclose

# Day index, tmax (None = missing)
STATION = [
    28.0, 29.0, 30.0, 31.0, 32.0,  # 0-4 ok
    65.0,  # 5 range fail (impossible for teaching region)
    33.0,  # 6
    50.0,  # 7 step jump from 33
    34.0,  # 8
    34.0, 34.0, 34.0, 34.0, 34.0, 34.0,  # 9-14 persistence
    None,  # 15 missing
    0.0,  # 16 valid zero-ish winter? for Tmax teaching treat as suspicious if prior was warm — use as true zero test for precip later
    35.0,  # 17
    80.0,  # 18 spike
    36.0,  # 19
]

T_MIN_ALLOWED, T_MAX_ALLOWED = -20.0, 55.0
STEP_MAX = 12.0
PERSIST_DAYS = 5


def range_flags(vals, lo, hi):
    return [i for i, v in enumerate(vals) if v is not None and not (lo <= v <= hi)]


def step_flags(vals, max_step, lo=None, hi=None):
    """Flag large jumps between consecutive *in-range* values.

    Out-of-range values break the chain (treated like gaps) so a single
    range violation does not cascade into many step flags.
    """
    flags = []
    prev = None
    for i, v in enumerate(vals):
        if v is None:
            prev = None
            continue
        if lo is not None and hi is not None and not (lo <= v <= hi):
            prev = None
            continue
        if prev is not None and abs(v - prev) > max_step:
            flags.append(i)
        prev = v
    return flags


def spike_flags(vals, max_step):
    """Spike: large jump up then large jump down (or vice versa) within 3 points."""
    flags = []
    for i in range(1, len(vals) - 1):
        a, b, c = vals[i - 1], vals[i], vals[i + 1]
        if None in (a, b, c):
            continue
        if abs(b - a) > max_step and abs(c - b) > max_step and (b - a) * (c - b) < 0:
            flags.append(i)
    return flags


def persistence_flags(vals, n):
    flags = []
    run = 1
    for i in range(1, len(vals)):
        if vals[i] is not None and vals[i] == vals[i - 1]:
            run += 1
            if run >= n:
                flags.append(i)
        else:
            run = 1
    return flags


def mean_ignore_missing(vals):
    xs = [v for v in vals if v is not None]
    if not xs:
        raise ValueError("no valid values")
    return sum(xs) / len(xs)


def main() -> None:
    rf = range_flags(STATION, T_MIN_ALLOWED, T_MAX_ALLOWED)
    assert 5 in rf and 18 in rf  # 65 and 80

    sf = step_flags(STATION, STEP_MAX, T_MIN_ALLOWED, T_MAX_ALLOWED)
    assert 7 in sf  # 33 -> 50 (both in-range)
    assert 5 not in sf  # out-of-range day is a range flag, not a step chain

    sp = spike_flags(STATION, STEP_MAX)
    assert 18 in sp  # 35 -> 80 -> 36

    pf = persistence_flags(STATION, PERSIST_DAYS)
    assert any(i >= 13 for i in pf)  # long flat run

    # Missing is not zero
    with_missing = [10.0, None, 14.0]
    assert isclose(mean_ignore_missing(with_missing), 12.0, abs_tol=1e-12)
    as_zero = mean_ignore_missing([10.0, 0.0, 14.0])
    assert as_zero < 12.0

    # Station vs grid-cell: point need not equal cell mean
    grid = [[20.0, 22.0], [21.0, 23.0]]
    cell_mean = sum(sum(row) for row in grid) / 4.0
    station_in_cell = 25.0  # point warmer than cell mean
    assert not isclose(station_in_cell, cell_mean, abs_tol=1e-12)
    assert cell_mean == 21.5

    # Metadata contract
    meta = {
        "variable": "tasmax",
        "units": "degC",
        "product_type": "synthetic_station",
        "missing": "None",
    }
    assert meta["units"] == "degC"
    assert meta["product_type"] != "direct_observation_of_grid_cell"

    print(
        "Unit 2.4 data-product checks passed "
        f"(range={rf}, step={sf}, spike={sp}, persist_n={len(pf)}, "
        f"cell_mean={cell_mean}, station={station_in_cell})."
    )


if __name__ == "__main__":
    main()
