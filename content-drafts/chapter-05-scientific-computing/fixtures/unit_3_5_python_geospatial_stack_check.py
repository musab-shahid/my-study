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

    # --- SQL→spatial bridge: predict counts, then assign ---
    stations = [
        {"id": 1, "x": 0.5, "y": 0.5, "crs": "EPSG:4326"},
        {"id": 2, "x": 0.8, "y": 0.2, "crs": "EPSG:4326"},
        {"id": 3, "x": 5.5, "y": 5.5, "crs": "EPSG:4326"},
    ]
    districts = [
        {"name": "North", "bbox": (0.0, 0.0, 2.0, 2.0), "crs": "EPSG:4326"},
        {"name": "South", "bbox": (5.0, 5.0, 6.0, 6.0), "crs": "EPSG:4326"},
    ]
    expected_counts = {"North": 2, "South": 1}
    assignments = []
    for s in stations:
        hits = [d["name"] for d in districts if d["crs"] == s["crs"] and point_in_bbox(s["x"], s["y"], d["bbox"])]
        assert len(hits) == 1, f"expected unique district for station {s['id']}, got {hits}"
        assignments.append(hits[0])
    from collections import Counter
    got = Counter(assignments)
    assert dict(got) == expected_counts, f"count mismatch: {got} vs {expected_counts}"
    assert len(assignments) == len(stations) == sum(expected_counts.values())

    # Mixed CRS must fail closed (do not silently join).
    mixed = {"id": 9, "x": 0.5, "y": 0.5, "crs": "EPSG:3857"}
    mixed_hits = [d["name"] for d in districts if d["crs"] == mixed["crs"] and point_in_bbox(mixed["x"], mixed["y"], d["bbox"])]
    assert mixed_hits == [], "mixed CRS must not assign via naive coordinate compare"

    print(
        "Unit 3.5 python geospatial stack checks passed "
        "(bbox predicates + nodata-safe mean + join count bridge)."
    )


if __name__ == "__main__":
    main()
