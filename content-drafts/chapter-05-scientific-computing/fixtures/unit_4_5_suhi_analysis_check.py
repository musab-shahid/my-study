"""Unit 4.5 SUHI teaching checks (stdlib).

Synthetic LST samples — not a real city, sensor product, or causal study.

1) Baseline SUHII = mean(urban) - mean(reference) with explicit sign
2) Alternate reference changes intensity
3) Matched-date contrast vs naive mismatched-date contrast
4) Minimum valid-pixel coverage gate
5) Area-weighted vs unweighted urban mean
"""
from __future__ import annotations

from math import isclose


def mean(xs: list[float]) -> float:
    if not xs:
        raise ValueError("empty sample")
    return sum(xs) / len(xs)


def suhii(urban: list[float], reference: list[float]) -> float:
    """SUHII (K) = mean urban LST - mean reference LST."""
    return mean(urban) - mean(reference)


def area_weighted_mean(values: list[float], weights: list[float]) -> float:
    if len(values) != len(weights) or not values:
        raise ValueError("values/weights required")
    if any(w < 0 for w in weights) or sum(weights) <= 0:
        raise ValueError("weights must be non-negative with positive sum")
    return sum(v * w for v, w in zip(values, weights)) / sum(weights)


def coverage_ok(n_valid: int, n_total: int, min_frac: float = 0.3) -> bool:
    if n_total <= 0:
        return False
    return (n_valid / n_total) >= min_frac


def main() -> None:
    urban = [311.0, 312.0, 313.0, 312.5]
    ref_a = [308.0, 308.5, 309.0, 308.5]  # dry reference
    ref_b = [309.5, 310.0, 310.5, 310.0]  # irrigated fringe

    s_a = suhii(urban, ref_a)
    s_b = suhii(urban, ref_b)
    assert isclose(s_a, 3.625, abs_tol=1e-9)
    assert isclose(s_b, 2.125, abs_tol=1e-9)
    assert s_a > s_b  # reference design changes intensity

    # Matched date: urban and ref observed "same day"
    day1_u, day1_r = [312.0, 313.0], [308.0, 309.0]
    matched = suhii(day1_u, day1_r)
    # Mismatched: urban hot day vs reference cool day (invalid protocol demo)
    mismatched = mean([314.0, 315.0]) - mean([306.0, 307.0])
    assert matched < mismatched  # naive mismatch inflates contrast

    assert coverage_ok(40, 100, 0.3) is True
    assert coverage_ok(20, 100, 0.3) is False

    # Area weights emphasize larger urban zones
    vals = [310.0, 314.0]
    w_equal = area_weighted_mean(vals, [1.0, 1.0])
    w_heavy = area_weighted_mean(vals, [1.0, 3.0])
    assert isclose(w_equal, 312.0, abs_tol=1e-9)
    assert w_heavy > w_equal

    print(
        "Unit 4.5 SUHI checks passed "
        f"(SUHII_A={s_a:.3f} K, SUHII_B={s_b:.3f} K, matched={matched:.2f}, "
        f"mismatch={mismatched:.2f}, coverage_gate_ok)."
    )


if __name__ == "__main__":
    main()
