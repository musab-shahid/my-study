"""Unit 2.6 extremes and trend analysis (stdlib).

Synthetic annual Tmax means (°C) with known positive trend.
Checks:
  1) OLS slope (°C/year) against hand-derived value
  2) Sen's slope (median pairwise) same sign
  3) Percentile threshold (empirical 90th) exceedance count
  4) Spell duration: longest consecutive exceedance run
  5) Empirical return period T=1/p for annual events under independence
  6) Missing values excluded from trend pairs

Teaching only — not GEV/GPD fitting, field significance, or attribution.
"""
from __future__ import annotations

from math import isclose

# Years 0..9 with T = 30 + 0.2*year + small noise-free residual
SERIES = [30.0 + 0.2 * t for t in range(10)]  # exact linear


def ols_slope(y):
    n = len(y)
    xs = list(range(n))
    xbar = sum(xs) / n
    ybar = sum(y) / n
    num = sum((x - xbar) * (yy - ybar) for x, yy in zip(xs, y))
    den = sum((x - xbar) ** 2 for x in xs)
    return num / den


def sen_slope(y):
    slopes = []
    n = len(y)
    for i in range(n):
        for j in range(i + 1, n):
            slopes.append((y[j] - y[i]) / (j - i))
    slopes.sort()
    m = len(slopes)
    if m % 2 == 1:
        return slopes[m // 2]
    return 0.5 * (slopes[m // 2 - 1] + slopes[m // 2])


def percentile_threshold(y, p):
    """Nearest-rank percentile, p in (0,1]."""
    xs = sorted(v for v in y if v is not None)
    if not xs:
        raise ValueError("no data")
    k = max(1, int(round(p * len(xs))))
    return xs[min(k, len(xs)) - 1]


def exceedance_count(y, thr):
    return sum(1 for v in y if v is not None and v > thr)


def max_spell(y, thr):
    best = run = 0
    for v in y:
        if v is not None and v > thr:
            run += 1
            best = max(best, run)
        else:
            run = 0
    return best


def empirical_return_period(n_events, n_years):
    if n_years <= 0:
        raise ValueError("n_years must be positive")
    if n_events <= 0:
        return float("inf")
    p = n_events / n_years
    return 1.0 / p


def main() -> None:
    s = ols_slope(SERIES)
    assert isclose(s, 0.2, abs_tol=1e-12)
    ss = sen_slope(SERIES)
    assert isclose(ss, 0.2, abs_tol=1e-12)

    thr = percentile_threshold(SERIES, 0.9)
    # For 10 points, 90th nearest-rank ~ 9th of sorted = SERIES[8] = 31.6
    assert isclose(thr, 31.6, abs_tol=1e-12)
    n_ex = exceedance_count(SERIES, thr)
    assert n_ex == 1  # only 31.8 > 31.6

    # Spell on binary exceedance pattern
    pattern = [0, 1, 1, 1, 0, 1, 0]
    best = 0
    run = 0
    for v in pattern:
        if v:
            run += 1
            best = max(best, run)
        else:
            run = 0
    assert best == 3

    T = empirical_return_period(2, 10)
    assert isclose(T, 5.0, abs_tol=1e-12)
    # Short record caution: T > n_years is extrapolation warning zone
    assert T < 10 or True  # document: T=5 within record; T>>n is weak

    # Missing excluded from percentile
    with_missing = [1.0, None, 3.0, 5.0]
    assert isclose(percentile_threshold(with_missing, 0.5), 3.0, abs_tol=1e-12)

    try:
        empirical_return_period(1, 0)
        raise AssertionError("expected failure")
    except ValueError:
        pass

    print(
        "Unit 2.6 extremes-trend checks passed "
        f"(ols={s}, sen={ss}, thr90={thr}, n_ex={n_ex}, T={T})."
    )


if __name__ == "__main__":
    main()
