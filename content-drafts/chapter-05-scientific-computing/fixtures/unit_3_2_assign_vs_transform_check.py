"""Assign CRS metadata vs transform coordinates (Unit 3.2 teaching fixture).

Synthetic planar points only. Does not invoke PROJ, GDAL, or GeoPandas.
Demonstrates that setting a CRS label does not move coordinates, while a
documented transform changes values and must be validated.

Run:
  python3 content-drafts/chapter-05-scientific-computing/fixtures/unit_3_2_assign_vs_transform_check.py
"""
from __future__ import annotations

from dataclasses import dataclass
from math import isclose


@dataclass(frozen=True)
class LabeledPoint:
    x: float
    y: float
    crs: str | None


def assign_crs(point: LabeledPoint, crs: str) -> LabeledPoint:
    """Attach CRS metadata only — coordinate numbers unchanged."""
    return LabeledPoint(point.x, point.y, crs)


def transform_affine(
    point: LabeledPoint,
    *,
    target_crs: str,
    scale_x: float,
    scale_y: float,
    offset_x: float = 0.0,
    offset_y: float = 0.0,
) -> LabeledPoint:
    """Pedagogical affine map as a stand-in for a documented coordinate transform."""
    return LabeledPoint(
        point.x * scale_x + offset_x,
        point.y * scale_y + offset_y,
        target_crs,
    )


def same_coordinates(a: LabeledPoint, b: LabeledPoint) -> bool:
    return isclose(a.x, b.x, abs_tol=1e-12) and isclose(a.y, b.y, abs_tol=1e-12)


def main() -> None:
    raw = LabeledPoint(73.0, 30.2, None)  # synthetic lon/lat-like numbers, unlabeled

    # Assign EPSG:4326 without transforming: numbers identical, label changes.
    assigned = assign_crs(raw, "EPSG:4326")
    assert assigned.crs == "EPSG:4326"
    assert same_coordinates(raw, assigned)

    # Incorrect workflow: assign UTM label without transforming degrees → still ~73,30
    wrongly_labeled = assign_crs(raw, "EPSG:32642")
    assert same_coordinates(raw, wrongly_labeled)
    assert wrongly_labeled.crs == "EPSG:32642"
    # Downstream "distance" using those numbers as metres would be nonsense (~degree-scale).

    # Documented pedagogical transform to a local metre grid (not a real UTM formula).
    transformed = transform_affine(
        assigned,
        target_crs="EPSG:32642",
        scale_x=1000.0,
        scale_y=1100.0,
        offset_x=100_000.0,
        offset_y=3_000_000.0,
    )
    assert transformed.crs == "EPSG:32642"
    assert not same_coordinates(assigned, transformed)
    assert isclose(transformed.x, 73.0 * 1000.0 + 100_000.0, abs_tol=1e-9)
    assert isclose(transformed.y, 30.2 * 1100.0 + 3_000_000.0, abs_tol=1e-9)

    # Predict → execute → compare: expected offset from a control after transform.
    expected = LabeledPoint(173_000.0, 3_033_220.0, "EPSG:32642")
    residual = ((transformed.x - expected.x) ** 2 + (transformed.y - expected.y) ** 2) ** 0.5
    assert isclose(residual, 0.0, abs_tol=1e-9)

    print(
        "Unit 3.2 assign-vs-transform check passed "
        "(assign preserves coordinates; affine transform changes them; synthetic only)."
    )


if __name__ == "__main__":
    main()
