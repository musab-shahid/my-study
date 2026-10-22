"""Subject 3 Unit 3.2: geographic scale and degree-cell area (stdlib).

Locks approximate metres-per-degree factors and the cos(latitude) area ratio
for 1°×1° cells. Not a geodesic library or equal-area projection engine.
"""
from __future__ import annotations

from math import cos, radians, isclose

R = 6_371_000.0  # mean Earth radius (m), instructional sphere


def meters_per_degree_lat() -> float:
    return radians(1.0) * R


def meters_per_degree_lon(lat_deg: float) -> float:
    return radians(1.0) * R * cos(radians(lat_deg))


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

    print(
        "Unit 3.2 CRS scale/area checks passed "
        f"(m/deg_lat≈{m_lat:.1f}, area_ratio_60/eq={ratio:.2f})."
    )


if __name__ == "__main__":
    main()
