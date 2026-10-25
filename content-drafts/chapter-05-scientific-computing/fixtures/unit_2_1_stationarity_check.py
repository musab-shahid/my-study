"""Unit 2.1 stationarity / nonstationarity teaching checks (stdlib).

Synthetic series only:
  - stationary: constant mean/variance white noise
  - mean_shift: abrupt level change mid-series
  - trend: linear drift

Uses a simple two-window mean difference statistic (not a formal ADF test).
Does not establish climate-change attribution or homogenised station analysis.
"""
from __future__ import annotations


def split_window_mean_diff(y: list[float]) -> float:
    if len(y) < 4:
        raise ValueError("series too short")
    mid = len(y) // 2
    a = sum(y[:mid]) / mid
    b = sum(y[mid:]) / (len(y) - mid)
    return abs(b - a)


def classify_mean_stability(y: list[float], threshold: float) -> str:
    """Return 'stable_mean' if |mean2-mean1| <= threshold else 'mean_shift_suspect'."""
    d = split_window_mean_diff(y)
    return "stable_mean" if d <= threshold else "mean_shift_suspect"


def main() -> None:
    # Deterministic "noise" via residual of a constant
    stationary = [0.1 * ((i * 13) % 7 - 3) for i in range(40)]
    # Same noise plus level shift after index 20
    mean_shift = [v + (2.5 if i >= 20 else 0.0) for i, v in enumerate(stationary)]
    # Linear trend
    trend = [0.05 * i + 0.1 * ((i * 13) % 7 - 3) for i in range(40)]

    d0 = split_window_mean_diff(stationary)
    d1 = split_window_mean_diff(mean_shift)
    d2 = split_window_mean_diff(trend)
    assert d1 > d0, "mean shift must increase two-window mean difference"
    assert d2 > d0, "trend must increase two-window mean difference"

    thr = max(0.5, 2.0 * d0)  # threshold above stationary fluctuation
    assert classify_mean_stability(stationary, thr) == "stable_mean"
    assert classify_mean_stability(mean_shift, thr) == "mean_shift_suspect"
    assert classify_mean_stability(trend, thr) == "mean_shift_suspect"

    try:
        split_window_mean_diff([1.0, 2.0])
        raise AssertionError("short series must fail")
    except ValueError:
        pass

    print(
        "Unit 2.1 stationarity checks passed "
        f"(d_stat={d0:.3f}, d_shift={d1:.3f}, d_trend={d2:.3f}, thr={thr:.3f})."
    )


if __name__ == "__main__":
    main()
