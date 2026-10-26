"""Arithmetic checks for Unit 5.8 EOF/PCA foundations.

Locks eigenvalues of a 2x2 covariance matrix used in teaching area-weighting
intuition, variance shares, and a North-rule sampling scale. Does not validate
EOFs of real gridded climate fields.
"""
from __future__ import annotations

from math import cos, isclose, radians, sqrt


def eigen_2x2(a: float, b: float, c: float) -> tuple[float, float]:
    disc = sqrt((a - c) ** 2 + 4 * b * b)
    return (a + c + disc) / 2, (a + c - disc) / 2


def north_delta(lam: float, n_star: float) -> float:
    """Sampling-error scale ~ lambda * sqrt(2/N*) (North et al. rule of thumb)."""
    if n_star <= 0:
        raise ValueError("n_star must be positive")
    return lam * (2.0 / n_star) ** 0.5


def area_weights_latitude(lat_deg: list[float]) -> list[float]:
    """Relative cell area weights proportional to cos(latitude) on a sphere."""
    w = [max(cos(radians(lat)), 0.0) for lat in lat_deg]
    s = sum(w)
    if s <= 0:
        raise ValueError("degenerate weights")
    return [x / s for x in w]


def main() -> None:
    l1, l2 = eigen_2x2(1.0, 0.8, 1.0)
    assert isclose(l1, 1.8, rel_tol=0, abs_tol=1e-12)
    assert isclose(l2, 0.2, rel_tol=0, abs_tol=1e-12)
    share = l1 / (l1 + l2)
    assert isclose(share, 0.9, rel_tol=0, abs_tol=1e-12)

    v = (1 / sqrt(2), 1 / sqrt(2))
    assert isclose(v[0] ** 2 + v[1] ** 2, 1.0, rel_tol=0, abs_tol=1e-12)

    w_eq = area_weights_latitude([30.0, -30.0])
    assert isclose(w_eq[0], 0.5, rel_tol=0, abs_tol=1e-12)
    assert isclose(w_eq[1], 0.5, rel_tol=0, abs_tol=1e-12)
    w_lat = area_weights_latitude([10.0, 60.0])
    assert w_lat[0] > w_lat[1]

    d1 = north_delta(1.8, 50)
    assert abs(d1 - 1.8 * (2 / 50) ** 0.5) < 1e-12
    assert (1.8 - 0.2) > d1
    d_close = north_delta(1.05, 20)
    assert abs(1.05 - 0.95) < d_close

    try:
        north_delta(1.0, 0)
        raise AssertionError("expected ValueError")
    except ValueError:
        pass

    print(
        "Unit 5.8 EOF/PCA checks passed "
        f"(λ1={l1}, λ2={l2}, share={share:.2f}, north_d1={d1:.4f})."
    )


if __name__ == "__main__":
    main()
