"""Subject 3 Unit 3.1: geographic scale bookkeeping (stdlib).

Locks approximate metres-per-degree factors used in teaching map scale.
Does not implement a full geodesic library or claim survey-grade accuracy.
"""
from __future__ import annotations

from math import cos, radians, isclose

# Mean Earth radius (m) used only for this instructional approximation
R = 6_371_000.0


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
    assert m_lon_30 < m_lat  # longitude degrees shrink away from equator

    # 0.01° cell at equator is ~1.11 km on a side (order-of-magnitude teaching check)
    cell = 0.01 * m_lat
    assert 1000.0 < cell < 1200.0

    print(
        "Unit 3.1 CRS scale checks passed "
        f"(m/deg_lat≈{m_lat:.1f}, m/deg_lon@30≈{m_lon_30:.1f})."
    )


if __name__ == "__main__":
    main()
