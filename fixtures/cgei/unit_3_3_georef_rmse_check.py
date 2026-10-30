"""Unit 3.3 georeferencing RMSE (stdlib) — synthetic control residuals only."""
from __future__ import annotations

from math import isclose, sqrt


def residual_distance(dx: float, dy: float) -> float:
    return sqrt(dx * dx + dy * dy)


def rmse(residuals: list[tuple[float, float]]) -> float:
    if not residuals:
        raise ValueError("empty_residuals")
    mean_sq = sum(dx * dx + dy * dy for dx, dy in residuals) / len(residuals)
    return sqrt(mean_sq)


def main() -> None:
    pts = [(2.0, 1.0), (-1.0, 2.0), (0.0, -2.0), (1.0, 0.0)]
    # squared distances: 5, 5, 4, 1 → mean 3.75 → RMSE sqrt(3.75)
    expected = sqrt(3.75)
    got = rmse(pts)
    assert isclose(got, expected, rel_tol=0, abs_tol=1e-12)
    assert isclose(got, 1.9364916731037085, rel_tol=0, abs_tol=1e-12)

    try:
        rmse([])
        raise AssertionError("expected empty failure")
    except ValueError:
        pass

    assert isclose(residual_distance(3, 4), 5.0, abs_tol=1e-12)

    print(f"Unit 3.3 georef RMSE checks passed (RMSE≈{got:.4f} m on synthetic GCPs).")


if __name__ == "__main__":
    main()
