"""Unit 2.1 percentiles and return-period teaching checks (stdlib).

Empirical percentile (nearest-rank) and the elementary relationship
  return_period_years ≈ 1 / annual_exceedance_probability
for a defined event on a stationary annual series.

Synthetic only — not GEV fitting, not operational flood design, not AR6 extremes.
"""
from __future__ import annotations


def empirical_percentile(sorted_vals: list[float], p: float) -> float:
    """Nearest-rank percentile on a pre-sorted ascending sample.

    p in [0, 100]. For n samples, rank = ceil(p/100 * n), 1-indexed, clamped.
    """
    if not sorted_vals:
        raise ValueError("empty sample")
    if p < 0 or p > 100:
        raise ValueError("p out of range")
    n = len(sorted_vals)
    if p == 0:
        return sorted_vals[0]
    # nearest-rank: rank = ceil(p/100 * n)
    rank = int((p / 100.0) * n)
    if (p / 100.0) * n > rank:
        rank += 1
    rank = max(1, min(n, rank))
    return sorted_vals[rank - 1]


def annual_exceedance_probability(threshold: float, annual_maxima: list[float]) -> float:
    """Fraction of years with annual maximum strictly greater than threshold."""
    if not annual_maxima:
        raise ValueError("empty series")
    exceed = sum(1 for v in annual_maxima if v > threshold)
    return exceed / len(annual_maxima)


def return_period_years(aep: float) -> float:
    """T = 1 / AEP for 0 < AEP <= 1. Undefined for AEP == 0."""
    if aep <= 0 or aep > 1:
        raise ValueError("AEP must be in (0, 1]")
    return 1.0 / aep


def main() -> None:
    # 10 synthetic annual maxima (sorted for percentile convenience)
    am = [10.0, 12.0, 13.0, 14.0, 15.0, 16.0, 18.0, 20.0, 22.0, 30.0]
    assert empirical_percentile(am, 50) == 15.0  # rank ceil(0.5*10)=5 → 15
    assert empirical_percentile(am, 90) == 22.0  # rank ceil(0.9*10)=9 → 22
    assert empirical_percentile(am, 100) == 30.0

    # Threshold at 20: exceeds are 22, 30 → 2/10 = 0.2 → T = 5 years
    aep = annual_exceedance_probability(20.0, am)
    assert abs(aep - 0.2) < 1e-12
    t = return_period_years(aep)
    assert abs(t - 5.0) < 1e-12

    # Misconception guard: percentile rank is not automatically a return period
    # 90th percentile value 22 has empirical AEP = 1/10 = 0.1 on this sample
    # (only 30 exceeds 22), so T ≈ 10, not 90.
    aep_p90 = annual_exceedance_probability(22.0, am)
    assert abs(aep_p90 - 0.1) < 1e-12
    assert abs(return_period_years(aep_p90) - 10.0) < 1e-12

    try:
        return_period_years(0.0)
        raise AssertionError("AEP=0 must fail")
    except ValueError:
        pass
    try:
        empirical_percentile([], 50)
        raise AssertionError("empty must fail")
    except ValueError:
        pass

    print(
        "Unit 2.1 percentiles/return-period checks passed "
        f"(p50={empirical_percentile(am, 50)}, p90={empirical_percentile(am, 90)}, "
        f"AEP(>20)={aep}, T={t})."
    )


if __name__ == "__main__":
    main()
