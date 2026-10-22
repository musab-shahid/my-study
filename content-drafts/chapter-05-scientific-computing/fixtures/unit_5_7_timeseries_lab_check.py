"""Deterministic time-series lab checks for Unit 5.7.

Verifies lag construction, lag-1 autocorrelation arithmetic, and chronological
train/test ordering for a lag-1 persistence forecast. A fixed mixed-order
evaluation is reported for comparison in the lesson text.

This fixture does not establish real-world forecast skill, stationarity of a
climate process, or optimality of persistence as a model class.
"""
from __future__ import annotations

from math import isclose


def lag1_acf(series: list[float]) -> float:
    n = len(series)
    mean = sum(series) / n
    num = sum((series[t] - mean) * (series[t - 1] - mean) for t in range(1, n))
    den = sum((x - mean) ** 2 for x in series)
    return num / den


def persistence_mae(y_true: list[float], y_pred: list[float]) -> float:
    return sum(abs(a - b) for a, b in zip(y_true, y_pred)) / len(y_true)


def build_series() -> list[float]:
    """Deterministic AR(1)-like series with fixed innovation pattern (no RNG)."""
    series = [0.0]
    for t in range(1, 48):
        innov = 0.1 if (t // 4) % 2 == 0 else -0.05
        series.append(0.75 * series[-1] + innov)
    return series


def main() -> None:
    series = build_series()
    acf1 = lag1_acf(series)
    assert isclose(acf1, 0.6362820695451732, rel_tol=0, abs_tol=1e-9), acf1

    pairs = [(series[t - 1], series[t]) for t in range(1, len(series))]
    n_pairs = len(pairs)
    test_size = 12
    train_idx = list(range(0, n_pairs - test_size))
    test_idx = list(range(n_pairs - test_size, n_pairs))
    assert train_idx[-1] < test_idx[0]

    chrono_mae = persistence_mae(
        [pairs[i][1] for i in test_idx],
        [pairs[i][0] for i in test_idx],
    )
    assert isclose(chrono_mae, 0.07789306503667083, rel_tol=0, abs_tol=1e-9), chrono_mae

    # Fixed permutation of pair indices (not a recommended validation design).
    perm = [(i * 5 + 3) % n_pairs for i in range(n_pairs)]
    assert sorted(perm) == list(range(n_pairs))
    mixed_test = perm[-test_size:]
    mixed_mae = persistence_mae(
        [pairs[i][1] for i in mixed_test],
        [pairs[i][0] for i in mixed_test],
    )
    assert isclose(mixed_mae, 0.07474422317683212, rel_tol=0, abs_tol=1e-9), mixed_mae

    print("Unit 5.7 lag-1 ACF, chronological split, and persistence MAE checks passed.")
    print(f"acf1={acf1:.6f} chrono_mae={chrono_mae:.6f} mixed_order_mae={mixed_mae:.6f}")


if __name__ == "__main__":
    main()
