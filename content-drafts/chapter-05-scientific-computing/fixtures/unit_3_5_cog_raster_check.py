"""Unit 3.5 COG/raster teaching invariants (stdlib).

Not rasterio/GDAL I/O and not an HTTP COG server.
"""
from __future__ import annotations

from math import isclose


def window_mean(grid: list[list[float]], r0: int, r1: int, c0: int, c1: int, nodata: float) -> float | None:
    vals = []
    for r in range(r0, r1):
        for c in range(c0, c1):
            v = grid[r][c]
            if v != nodata:
                vals.append(v)
    if not vals:
        return None
    return sum(vals) / len(vals)


def cog_layout_ok(meta: dict) -> bool:
    """Teaching checklist: tiled + overviews flagged (synthetic metadata only)."""
    return bool(meta.get("tiled")) and int(meta.get("overview_levels", 0)) >= 1


def main() -> None:
    nd = -9999.0
    grid = [
        [1.0, 2.0, 3.0, 4.0],
        [5.0, 6.0, nd, 8.0],
        [9.0, 10.0, 11.0, 12.0],
        [13.0, 14.0, 15.0, 16.0],
    ]
    # centre 2x2 window rows 1-3 cols 1-3 -> 6, nd, 10, 11
    m = window_mean(grid, 1, 3, 1, 3, nd)
    assert isclose(m, (6.0 + 10.0 + 11.0) / 3.0, abs_tol=1e-12)

    assert cog_layout_ok({"tiled": True, "overview_levels": 3}) is True
    assert cog_layout_ok({"tiled": False, "overview_levels": 3}) is False
    assert cog_layout_ok({"tiled": True, "overview_levels": 0}) is False

    # zero is valid
    assert isclose(window_mean([[0.0, nd], [2.0, 4.0]], 0, 2, 0, 2, nd), 2.0, abs_tol=1e-12)

    print("Unit 3.5 COG/raster checks passed (window mean + COG layout flags).")


if __name__ == "__main__":
    main()
