"""Unit 3.4 terrain slope on a tiny DEM (stdlib).

3×3 elevation grid (metres). Cell size Δx = Δy = 30 m.
Finite-difference slope at the centre cell uses central differences:
  dz/dx = (z_e - z_w) / (2 Δx)
  dz/dy = (z_n - z_s) / (2 Δy)
  slope_ratio = sqrt((dz/dx)^2 + (dz/dy)^2)
  slope_deg = atan(slope_ratio) in degrees

This is a teaching stencil, not a production GIS slope algorithm
(no Horn method, no edge padding strategy beyond explicit edges).
"""
from __future__ import annotations

from math import atan, degrees, isclose, sqrt

DX = DY = 30.0  # metres
NODATA = -9999.0

# Row 0 is north
Z = [
    [100.0, 110.0, 120.0],
    [100.0, 115.0, 130.0],
    [100.0, 105.0, 110.0],
]


def centre_slope_deg(z, dx=DX, dy=DY):
    """Slope at centre (1,1) using central differences."""
    ze, zw = z[1][2], z[1][0]
    zn, zs = z[0][1], z[2][1]
    dzdx = (ze - zw) / (2.0 * dx)
    dzdy = (zn - zs) / (2.0 * dy)
    ratio = sqrt(dzdx * dzdx + dzdy * dzdy)
    return degrees(atan(ratio)), dzdx, dzdy, ratio


def main() -> None:
    # Manual: z_e=130, z_w=100 → dzdx = 30/(60) = 0.5
    # z_n=110, z_s=105 → dzdy = 5/60 ≈ 0.083333
    # ratio = sqrt(0.25 + 0.0069444) ≈ 0.5077
    # slope_deg ≈ atan(0.5077) ≈ 26.93°
    slope, dzdx, dzdy, ratio = centre_slope_deg(Z)
    assert isclose(dzdx, 0.5, rel_tol=0, abs_tol=1e-12)
    assert isclose(dzdy, 5.0 / 60.0, rel_tol=0, abs_tol=1e-12)
    assert isclose(ratio, sqrt(0.5**2 + (5.0 / 60.0) ** 2), rel_tol=0, abs_tol=1e-12)
    assert isclose(slope, degrees(atan(ratio)), rel_tol=0, abs_tol=1e-12)
    assert 26.0 < slope < 28.0

    # Flat surface → slope 0
    flat = [[10.0] * 3 for _ in range(3)]
    s0, _, _, r0 = centre_slope_deg(flat)
    assert isclose(s0, 0.0, abs_tol=1e-12)
    assert isclose(r0, 0.0, abs_tol=1e-12)

    # Vertical units must match horizontal units (both metres here)
    assert DX == DY == 30.0

    print(
        "Unit 3.4 terrain slope checks passed "
        f"(centre slope≈{slope:.2f}°, dzdx={dzdx}, dzdy={dzdy:.5f})."
    )


if __name__ == "__main__":
    main()
