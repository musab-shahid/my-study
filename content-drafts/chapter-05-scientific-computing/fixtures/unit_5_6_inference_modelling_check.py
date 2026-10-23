"""Unit 5.6 intermediate inference teaching checks (stdlib).

Synthetic arithmetic only — not real environmental model fits.

1) Logistic odds ratio exp(beta)
2) Monte Carlo nominal CI coverage under Gaussian mean model
3) Block length > 1 required marker for dependent series (conceptual guard)
"""
from __future__ import annotations

import math
import random


def odds_ratio(beta: float) -> float:
    return math.exp(beta)


def mc_mean_ci_coverage(
    mu: float = 10.0,
    sigma: float = 2.0,
    n: int = 40,
    n_mc: int = 400,
    z: float = 1.96,
    seed: int = 56,
) -> float:
    rng = random.Random(seed)
    hits = 0
    for _ in range(n_mc):
        sample = [rng.gauss(mu, sigma) for _ in range(n)]
        m = sum(sample) / n
        se = sigma / math.sqrt(n)  # known-sigma interval under generative model
        lo, hi = m - z * se, m + z * se
        if lo <= mu <= hi:
            hits += 1
    return hits / n_mc


def block_bootstrap_requires_blocks(series_length: int, block_length: int) -> bool:
    """Guard: dependent series should not use block_length 1 as the only design."""
    if series_length < 2:
        raise ValueError("series too short")
    if block_length < 1:
        raise ValueError("block_length must be >= 1")
    return block_length >= 2


def main() -> None:
    oratio = odds_ratio(0.405)
    assert 1.49 < oratio < 1.51

    cov = mc_mean_ci_coverage()
    assert 0.90 <= cov <= 0.99  # nominal 95% under correct model

    assert block_bootstrap_requires_blocks(100, 5) is True
    assert block_bootstrap_requires_blocks(100, 1) is False

    try:
        block_bootstrap_requires_blocks(100, 0)
        raise AssertionError("expected invalid block")
    except ValueError:
        pass

    print(
        f"Unit 5.6 inference modelling checks passed "
        f"(odds_ratio={oratio:.3f}, mc_coverage={cov:.3f}, block_guard_ok)."
    )


if __name__ == "__main__":
    main()
