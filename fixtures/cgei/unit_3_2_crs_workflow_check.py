"""End-to-end CRS workflow teaching check (Unit 3.2).

Chains: diagnose label → assign vs transform → landmark residual → refuse
spatial predicate on CRS mismatch. Synthetic only — not PROJ/GDAL/GeoPandas.

Run:
  python3 content-drafts/chapter-05-scientific-computing/fixtures/unit_3_2_crs_workflow_check.py
"""
from __future__ import annotations

from dataclasses import dataclass
from math import isclose, sqrt


@dataclass(frozen=True)
class LabeledPoint:
    id: str
    x: float
    y: float
    crs: str | None


def assign_crs(p: LabeledPoint, crs: str) -> LabeledPoint:
    return LabeledPoint(p.id, p.x, p.y, crs)


def transform_affine(
    p: LabeledPoint, *, target_crs: str, sx: float, sy: float, ox: float, oy: float
) -> LabeledPoint:
    return LabeledPoint(p.id, p.x * sx + ox, p.y * sy + oy, target_crs)


def residual_m(expected: tuple[float, float], observed: tuple[float, float]) -> float:
    return sqrt((observed[0] - expected[0]) ** 2 + (observed[1] - expected[1]) ** 2)


def spatial_hit(point: LabeledPoint, box_crs: str, xmin: float, ymin: float, xmax: float, ymax: float) -> bool:
    if point.crs != box_crs:
        raise ValueError(f"CRS mismatch: point {point.crs} vs box {box_crs}")
    return xmin <= point.x <= xmax and ymin <= point.y <= ymax


def main() -> None:
    # 1. Raw unlabeled degree-like station
    raw = LabeledPoint("S1", 73.0, 30.2, None)
    assert raw.crs is None

    # 2. Correct assign for geographic numbers
    geo = assign_crs(raw, "EPSG:4326")
    assert geo.crs == "EPSG:4326" and (geo.x, geo.y) == (73.0, 30.2)

    # 3. Wrong assign: UTM label without transform — coordinates unchanged (trap)
    wrong = assign_crs(raw, "EPSG:32642")
    assert (wrong.x, wrong.y) == (73.0, 30.2) and wrong.crs == "EPSG:32642"

    # 4. Documented pedagogical transform (not real UTM)
    utm_like = transform_affine(
        geo, target_crs="EPSG:32642", sx=1000.0, sy=1100.0, ox=100_000.0, oy=3_000_000.0
    )
    assert utm_like.crs == "EPSG:32642"
    assert not isclose(utm_like.x, geo.x)  # numbers moved

    # 5. Landmark residual against control in target CRS
    control = (173_000.0, 3_033_220.0)
    r = residual_m(control, (utm_like.x, utm_like.y))
    assert isclose(r, 0.0, abs_tol=1e-9)

    # 6. Spatial integrity: same-CRS contains OK
    assert spatial_hit(utm_like, "EPSG:32642", 170_000, 3_030_000, 180_000, 3_040_000) is True

    # 7. Spatial integrity: CRS mismatch refused
    try:
        spatial_hit(geo, "EPSG:32642", 0, 0, 100, 100)
        raise AssertionError("expected CRS mismatch")
    except ValueError as exc:
        assert "CRS mismatch" in str(exc)

    print(
        "Unit 3.2 CRS workflow check passed "
        f"(residual={r:.3f} m, assign≠transform, spatial CRS guard OK; synthetic only)."
    )


if __name__ == "__main__":
    main()
