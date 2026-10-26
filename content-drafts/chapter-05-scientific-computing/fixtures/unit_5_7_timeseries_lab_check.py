"""Deterministic time-series lab checks for Unit 5.7.

Verifies lag construction, lag-1 autocorrelation arithmetic, chronological
train/test ordering, and expanding-window rolling-origin evaluation. Persistence
and climatology are scored on the exact same forecast origins. Metrics reject
mismatched or empty arrays instead of silently truncating with zip().

Synthetic checks only: no claim about real-world forecast skill, stationarity,
climate attribution, or the universal superiority of one baseline.
"""
from __future__ import annotations

from math import isclose


def _validate_pair(y_true: list[float], y_pred: list[float]) -> None:
    if not y_true or len(y_true) != len(y_pred):
        raise ValueError("observed and predicted values must have equal non-zero lengths")


def lag1_acf(series: list[float]) -> float:
    if len(series) < 2:
        raise ValueError("at least two observations are required")
    mean = sum(series) / len(series)
    den = sum((x - mean) ** 2 for x in series)
    if den == 0:
        raise ValueError("lag-1 ACF is undefined for a constant series")
    num = sum((series[t] - mean) * (series[t - 1] - mean) for t in range(1, len(series)))
    return num / den


def mae(y_true: list[float], y_pred: list[float]) -> float:
    _validate_pair(y_true, y_pred)
    return sum(abs(a - b) for a, b in zip(y_true, y_pred)) / len(y_true)


def persistence_mae(y_true: list[float], y_pred: list[float]) -> float:
    return mae(y_true, y_pred)


def build_series() -> list[float]:
    """Deterministic AR(1)-like series with fixed innovation pattern (no RNG)."""
    series = [0.0]
    for t in range(1, 48):
        innov = 0.1 if (t // 4) % 2 == 0 else -0.05
        series.append(0.75 * series[-1] + innov)
    return series


def climatology_mae(y_true: list[float], clim: float) -> float:
    return mae(y_true, [clim] * len(y_true))


def pearson(x: list[float], y: list[float]) -> float:
    _validate_pair(x, y)
    mx = sum(x) / len(x)
    my = sum(y) / len(y)
    num = sum((a - mx) * (b - my) for a, b in zip(x, y))
    denx = sum((a - mx) ** 2 for a in x) ** 0.5
    deny = sum((b - my) ** 2 for b in y) ** 0.5
    if denx == 0 or deny == 0:
        raise ValueError("correlation is undefined for a constant input")
    return num / (denx * deny)


def rolling_origin_baselines(
    series: list[float], first_origin: int
) -> tuple[list[float], list[float], list[float]]:
    """Expanding-window one-step forecasts; each prediction uses prior values only."""
    if first_origin < 2 or first_origin >= len(series):
        raise ValueError("first_origin must leave at least two training values and one test value")

    observed: list[float] = []
    persistence: list[float] = []
    climatology: list[float] = []
    for origin in range(first_origin, len(series)):
        history = series[:origin]
        assert len(history) == origin
        assert max(range(len(history))) < origin
        observed.append(series[origin])
        persistence.append(history[-1])
        climatology.append(sum(history) / len(history))

    _validate_pair(observed, persistence)
    _validate_pair(observed, climatology)
    return observed, persistence, climatology


def main() -> None:
    series = build_series()
    acf1 = lag1_acf(series)
    assert isclose(acf1, 0.6362820695451732, rel_tol=0, abs_tol=1e-9), acf1

    # Preserve the existing fixed chronological-vs-mixed-order teaching contrast.
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

    # Fixed permutation is intentionally shown only as a cautionary contrast,
    # never as an acceptable forecasting validation design.
    perm = [(i * 5 + 3) % n_pairs for i in range(n_pairs)]
    assert sorted(perm) == list(range(n_pairs))
    mixed_test = perm[-test_size:]
    mixed_mae = persistence_mae(
        [pairs[i][1] for i in mixed_test],
        [pairs[i][0] for i in mixed_test],
    )
    assert isclose(mixed_mae, 0.07474422317683212, rel_tol=0, abs_tol=1e-9), mixed_mae

    # Expanding-window evaluation: every origin is scored once, with both
    # baselines using identical held-out timestamps and history available then.
    observed, persistence, climatology = rolling_origin_baselines(series, first_origin=24)
    assert len(observed) == len(persistence) == len(climatology) == 24
    rolling_persistence_mae = mae(observed, persistence)
    rolling_climatology_mae = mae(observed, climatology)
    assert isclose(rolling_persistence_mae, 0.07789485695860783, rel_tol=0, abs_tol=1e-9)
    assert isclose(rolling_climatology_mae, 0.08870422422371488, rel_tol=0, abs_tol=1e-9)
    assert rolling_persistence_mae < rolling_climatology_mae

    # Metric guards: unequal lengths must not silently truncate; empty inputs
    # and undefined correlations must fail clearly.
    for metric in (mae, persistence_mae, pearson):
        for left, right in (([1.0, 2.0], [1.0]), ([], [])):
            try:
                metric(left, right)
            except ValueError:
                pass
            else:
                raise AssertionError(f"{metric.__name__} accepted invalid input lengths")

    try:
        lag1_acf([2.0, 2.0, 2.0])
    except ValueError:
        pass
    else:
        raise AssertionError("lag1_acf accepted a constant series")

    # Independent linear trends: high raw correlation, weaker differenced correlation.
    t = list(range(30))
    a = [0.5 * i + 0.01 * (i % 3) for i in t]
    b = [0.4 * i + 0.02 * ((i + 1) % 5) for i in t]
    r_raw = pearson(a, b)
    da = [a[i] - a[i - 1] for i in range(1, len(a))]
    db = [b[i] - b[i - 1] for i in range(1, len(b))]
    r_diff = pearson(da, db)
    assert r_raw > 0.9
    assert abs(r_diff) < abs(r_raw)

    print("PASS Unit 5.7 lag-1 ACF, chronological split, and rolling-origin baselines.")
    print(
        f"acf1={acf1:.6f} chrono_mae={chrono_mae:.6f} mixed_order_mae={mixed_mae:.6f} "
        f"rolling_persistence_mae={rolling_persistence_mae:.6f} "
        f"rolling_climatology_mae={rolling_climatology_mae:.6f}"
    )


if __name__ == "__main__":
    main()
