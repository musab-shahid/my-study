"""Subject 3 Unit 3.2: CRS scale, degree-cell area, UTM zone 42N, resampling (stdlib).

Locks approximate metres-per-degree factors, cos(latitude) area ratio for 1°×1°
cells, UTM zone 42N longitude span [66°E, 72°E), and categorical resampling
preference. Not a geodesic library or equal-area projection engine.
"""
from __future__ import annotations

from math import cos, radians, isclose

R = 6_371_000.0  # mean Earth radius (m), instructional sphere


def meters_per_degree_lat() -> float:
    return radians(1.0) * R


def meters_per_degree_lon(lat_deg: float) -> float:
    return radians(1.0) * R * cos(radians(lat_deg))


def utm_zone_42n_contains_lon(lon_east: float) -> bool:
    """True if longitude (°E) is inside UTM zone 42N span [66, 72)."""
    return 66.0 <= lon_east < 72.0


def prefer_nearest_resampling(categorical: bool) -> str:
    return "nearest" if categorical else "bilinear_or_cubic"


def main() -> None:
    m_lat = meters_per_degree_lat()
    assert isclose(m_lat, 111_194.92664455873, rel_tol=0, abs_tol=1e-6)

    m_lon_eq = meters_per_degree_lon(0.0)
    assert isclose(m_lon_eq, m_lat, rel_tol=0, abs_tol=1e-9)

    m_lon_30 = meters_per_degree_lon(30.0)
    assert isclose(m_lon_30, m_lat * cos(radians(30.0)), rel_tol=0, abs_tol=1e-9)
    assert m_lon_30 < m_lat

    cell = 0.01 * m_lat
    assert 1000.0 < cell < 1200.0

    area_eq = meters_per_degree_lat() * meters_per_degree_lon(0.0)
    area_60 = meters_per_degree_lat() * meters_per_degree_lon(60.0)
    ratio = area_60 / area_eq
    assert isclose(ratio, 0.5, rel_tol=0, abs_tol=1e-12)

    # Multan ~71.5°E inside 42N; Lahore ~74.3°E outside
    assert utm_zone_42n_contains_lon(71.5) is True
    assert utm_zone_42n_contains_lon(74.3) is False
    assert utm_zone_42n_contains_lon(66.0) is True
    assert utm_zone_42n_contains_lon(72.0) is False
    assert prefer_nearest_resampling(True) == "nearest"
    assert prefer_nearest_resampling(False) != "nearest"

    print(
        "Unit 3.2 CRS scale/area/UTM checks passed "
        f"(m/deg_lat≈{m_lat:.1f}, area_ratio_60/eq={ratio:.2f}, zone42N locked)."
    )


if __name__ == "__main__":
    main()
