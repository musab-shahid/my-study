"""Deterministic stationarity / ADF-interpretation checks for Unit 5.7.

Synthetic teaching series only. Does not claim empirical climate stationarity,
production unit-root software parity, or attribution conclusions.

Run:
  python3 content-drafts/chapter-05-scientific-computing/fixtures/unit_5_7_stationarity_adf_check.py
"""
from __future__ import annotations

from math import isclose


def build_trending_series() -> list[float]:
    """Deterministic level trend + mild AR noise (no RNG)."""
    y = []
    prev = 0.0
    for t in range(40):
        innov = 0.2 if (t % 5) < 3 else -0.1
        level = 0.15 * t
        prev = level + 0.5 * (prev - level) + innov
        y.append(prev)
    return y


def build_stationary_ar1() -> list[float]:
    """Mean-reverting AR(1)-like path around zero."""
    y = [0.0]
    for t in range(1, 40):
        innov = 0.15 if (t % 4) == 0 else -0.05
        y.append(0.4 * y[-1] + innov)
    return y


def window_means(series: list[float], n_windows: int = 4) -> list[float]:
    n = len(series)
    size = n // n_windows
    means = []
    for i in range(n_windows):
        chunk = series[i * size : (i + 1) * size]
        means.append(sum(chunk) / len(chunk))
    return means


def window_vars(series: list[float], n_windows: int = 4) -> list[float]:
    n = len(series)
    size = n // n_windows
    vars_ = []
    for i in range(n_windows):
        chunk = series[i * size : (i + 1) * size]
        m = sum(chunk) / len(chunk)
        vars_.append(sum((x - m) ** 2 for x in chunk) / len(chunk))
    return vars_


def lag1_acf(series: list[float]) -> float:
    if len(series) < 2:
        raise ValueError("need at least two points")
    mean = sum(series) / len(series)
    den = sum((x - mean) ** 2 for x in series)
    if den == 0:
        raise ValueError("constant series")
    num = sum((series[t] - mean) * (series[t - 1] - mean) for t in range(1, len(series)))
    return num / den


def first_diff(series: list[float]) -> list[float]:
    return [series[t] - series[t - 1] for t in range(1, len(series))]


def pedagogical_adf_tstat(series: list[float]) -> float:
    """Simplified Dickey–Fuller style regression without statsmodels.

    Fit Δy_t = a + b y_{t-1} + e_t by OLS and return t-stat for b.
    This is a teaching approximation (no lagged Δy terms, no constant-only variants).
    Locked against the deterministic series below; not a substitute for production ADF software.
    """
    if len(series) < 5:
        raise ValueError("series too short")
    y_lag = series[:-1]
    dy = first_diff(series)
    n = len(dy)
    # Design matrix: [1, y_{t-1}]
    sx = sum(y_lag)
    sy = sum(dy)
    sxx = sum(x * x for x in y_lag)
    sxy = sum(x * y for x, y in zip(y_lag, dy))
    det = n * sxx - sx * sx
    if det == 0:
        raise ValueError("singular design")
    a = (sy * sxx - sx * sxy) / det
    b = (n * sxy - sx * sy) / det
    resid = [dy[i] - a - b * y_lag[i] for i in range(n)]
    sse = sum(r * r for r in resid)
    sigma2 = sse / (n - 2)
    # Var(b) = sigma2 * n / det for [1,x] design
    se_b = (sigma2 * n / det) ** 0.5
    if se_b == 0:
        raise ValueError("zero SE")
    return b / se_b


def interpret_adf(t_stat: float, critical_5: float = -2.93) -> str:
    """Pedagogical rule using a fixed approximate 5% critical value for illustration.

    Critical values depend on sample size and model specification in real ADF tables.
    Failure to reject is not proof of a unit root; rejection is not proof of strict stationarity.
    """
    if t_stat < critical_5:
        return "reject_unit_root_null_at_illustrative_5pct"
    return "fail_to_reject_unit_root_null_at_illustrative_5pct"


def main() -> None:
    trend = build_trending_series()
    stat = build_stationary_ar1()

    # Trending series: window means should drift
    means_t = window_means(trend)
    assert means_t[-1] > means_t[0] + 1.0, means_t

    # Stationary-like series: window means stay near zero
    means_s = window_means(stat)
    assert all(abs(m) < 0.5 for m in means_s), means_s

    acf_trend = lag1_acf(trend)
    acf_diff = lag1_acf(first_diff(trend))
    # Differencing should reduce the lag-1 ACF for this construction
    assert acf_diff < acf_trend, (acf_trend, acf_diff)

    t_trend = pedagogical_adf_tstat(trend)
    t_stat = pedagogical_adf_tstat(stat)
    # Locked approximate values for regression stability
    assert isclose(t_trend, -0.400681, rel_tol=0, abs_tol=1e-5), t_trend
    assert isclose(t_stat, -7.251484, rel_tol=0, abs_tol=1e-5), t_stat

    assert interpret_adf(t_trend) == "fail_to_reject_unit_root_null_at_illustrative_5pct"
    assert interpret_adf(t_stat) == "reject_unit_root_null_at_illustrative_5pct"

    # Edge cases
    try:
        pedagogical_adf_tstat([1.0, 1.0])
        raise AssertionError("expected short-series error")
    except ValueError:
        pass

    print(
        "Unit 5.7 stationarity/ADF check passed "
        f"(t_trend={t_trend:.6f}, t_stat={t_stat:.6f}, synthetic only)."
    )


if __name__ == "__main__":
    main()
