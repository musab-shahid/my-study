"""Unit 3.5 Python geospatial stack teaching checks (stdlib only).

Axis-aligned bbox predicates and nodata-safe means — not GeoPandas/GEOS.
"""
from __future__ import annotations

from math import isclose


def bbox_intersects(a: tuple[float, float, float, float], b: tuple[float, float, float, float]) -> bool:
    """Boxes as (minx, miny, maxx, maxy)."""
    aminx, aminy, amaxx, amaxy = a
    bminx, bminy, bmaxx, bmaxy = b
    if aminx > amaxx or aminy > amaxy or bminx > bmaxx or bminy > bmaxy:
        raise ValueError("invalid_bbox")
    return not (amaxx < bminx or bmaxx < aminx or amaxy < bminy or bmaxy < aminy)


def point_in_bbox(x: float, y: float, box: tuple[float, float, float, float]) -> bool:
    minx, miny, maxx, maxy = box
    return minx <= x <= maxx and miny <= y <= maxy


def nodata_mean(values: list[float], nodata: float = -9999.0) -> float | None:
    valid = [v for v in values if v != nodata]
    if not valid:
        return None
    return sum(valid) / len(valid)


def main() -> None:
    a = (0.0, 0.0, 2.0, 2.0)
    b = (1.0, 1.0, 3.0, 3.0)
    c = (5.0, 5.0, 6.0, 6.0)
    assert bbox_intersects(a, b) is True
    assert bbox_intersects(a, c) is False
    assert point_in_bbox(1.0, 1.0, a) is True
    assert point_in_bbox(3.0, 3.0, a) is False

    assert isclose(nodata_mean([10.0, 12.0, -9999.0, 14.0]), 12.0, abs_tol=1e-12)
    assert nodata_mean([-9999.0, -9999.0]) is None
    # Zero is valid data
    assert isclose(nodata_mean([0.0, 2.0, -9999.0]), 1.0, abs_tol=1e-12)

    try:
        bbox_intersects((2.0, 0.0, 1.0, 1.0), a)
        raise AssertionError("expected invalid bbox")
    except ValueError:
        pass

    print(
        "Unit 3.5 python geospatial stack checks passed "
        "(bbox predicates + nodata-safe mean)."
    )


if __name__ == "__main__":
    main()
