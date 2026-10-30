"""Unit 2.1 weather vs climate statistics (stdlib).

Synthetic monthly temperature series (°C), n=36 (3 years):
  base seasonal cycle + weak upward trend + one cold spike month.

Checks:
  1) Climatological mean of months 1–12 (year 1) as baseline normal
  2) Anomaly of a warm month relative to that baseline
  3) Linear trend slope over full series vs first 12 months (window sensitivity)
  4) Missing value excluded from mean (not treated as zero)
  5) A single cold month does not reverse the positive full-series trend sign

Teaching only — not a station homogenisation or attribution analysis.
"""
from __future__ import annotations

from math import isclose

# 36 months: seasonal 10 + 8*sin-like via fixed table + 0.02°C/month trend
# Precomputed for transparency (month index 0..35)
SEASON = [8, 9, 12, 16, 20, 24, 26, 25, 22, 17, 12, 9]  # °C toy seasonality
SERIES = []
for t in range(36):
    SERIES.append(SEASON[t % 12] + 0.02 * t)

# Inject a cold spike at month 5 of year 2 (index 17)
SERIES[17] = SERIES[17] - 8.0  # cold weather event


def mean(vals):
    vals = [v for v in vals if v is not None]
    if not vals:
        raise ValueError("no values for mean")
    return sum(vals) / len(vals)


def anomaly(value, baseline_mean):
    return value - baseline_mean


def linear_slope(y):
    """Ordinary least-squares slope vs index 0..n-1."""
    n = len(y)
    if n < 2:
        raise ValueError("need at least 2 points for slope")
    xs = list(range(n))
    xbar = sum(xs) / n
    ybar = sum(y) / n
    num = sum((x - xbar) * (yy - ybar) for x, yy in zip(xs, y))
    den = sum((x - xbar) ** 2 for x in xs)
    return num / den


def main() -> None:
    baseline = SERIES[:12]
    normal = mean(baseline)
    # Year-2 July-like month index 18 (warm season + trend)
    a18 = anomaly(SERIES[18], normal)
    assert a18 > 0  # warmer than year-1 normal for that seasonality+trend

    slope_full = linear_slope(SERIES)
    slope_short = linear_slope(SERIES[:12])
    # Full series includes positive trend; short window slope near seasonal residual
    assert slope_full > 0
    # Window sensitivity: slopes need not match
    assert not isclose(slope_full, slope_short, rel_tol=0, abs_tol=1e-6)

    # Missing data: None must not count as 0
    with_missing = [10.0, None, 14.0]
    assert isclose(mean(with_missing), 12.0, abs_tol=1e-12)
    wrong_as_zero = mean([10.0, 0.0, 14.0])
    assert wrong_as_zero < 12.0

    # Cold spike month 17 is below normal but full slope remains positive
    assert SERIES[17] < normal
    assert slope_full > 0

    print(
        "Unit 2.1 weather-climate checks passed "
        f"(normal≈{normal:.2f}°C, anomaly_18≈{a18:.2f}°C, "
        f"slope_full≈{slope_full:.4f}°C/month, slope_short≈{slope_short:.4f})."
    )


if __name__ == "__main__":
    main()
