"""Unit 5.6 intermediate inference teaching checks (stdlib).

Synthetic arithmetic only — not real environmental model fits.

1) Logistic odds ratio exp(beta)
2) Monte Carlo nominal CI coverage under Gaussian mean model
3) Compare iid and moving-block bootstrap intervals on a deterministic AR(1) series
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


def percentile(values: list[float], probability: float) -> float:
    """Linearly interpolated percentile for a non-empty list."""
    if not values:
        raise ValueError("values must not be empty")
    if not 0.0 <= probability <= 1.0:
        raise ValueError("probability must be in [0, 1]")
    ordered = sorted(values)
    position = (len(ordered) - 1) * probability
    lower = int(position)
    upper = min(lower + 1, len(ordered) - 1)
    fraction = position - lower
    return ordered[lower] * (1.0 - fraction) + ordered[upper] * fraction


def bootstrap_mean_samples(
    series: list[float], n_resamples: int, block_length: int, seed: int
) -> tuple[list[float], list[float]]:
    """Return iid and moving-block bootstrap means for the same series."""
    if len(series) < 2:
        raise ValueError("series too short")
    if n_resamples < 1:
        raise ValueError("n_resamples must be >= 1")
    if not 1 <= block_length <= len(series):
        raise ValueError("block_length must be between 1 and series length")

    rng = random.Random(seed)
    n = len(series)
    iid_means: list[float] = []
    block_means: list[float] = []
    for _ in range(n_resamples):
        iid_sample = [rng.choice(series) for _ in range(n)]
        iid_means.append(sum(iid_sample) / n)

        block_sample: list[float] = []
        while len(block_sample) < n:
            start = rng.randrange(0, n - block_length + 1)
            block_sample.extend(series[start : start + block_length])
        block_sample = block_sample[:n]
        block_means.append(sum(block_sample) / n)
    return iid_means, block_means


def check_block_bootstrap_dependence() -> None:
    """Show, for one fixed synthetic AR(1) series, why iid resampling can understate uncertainty."""
    rng = random.Random(5606)
    phi, n, n_resamples, block_length = 0.7, 100, 500, 5
    series = [0.0]
    for _ in range(1, n):
        series.append(phi * series[-1] + rng.gauss(0.0, 1.0))

    iid_means, block_means = bootstrap_mean_samples(
        series, n_resamples=n_resamples, block_length=block_length, seed=5607
    )
    iid_width = percentile(iid_means, 0.975) - percentile(iid_means, 0.025)
    block_width = percentile(block_means, 0.975) - percentile(block_means, 0.025)
    assert iid_width > 0.0
    # Locked deterministic fixture: the block interval is materially wider here.
    # This illustrates one DGP; it is not a universal block-length rule.
    assert block_width > 1.5 * iid_width, (iid_width, block_width)

    try:
        bootstrap_mean_samples(series, n_resamples=10, block_length=0, seed=1)
        raise AssertionError("expected invalid block length")
    except ValueError:
        pass

    print(
        "Unit 5.6 AR(1) bootstrap check passed "
        f"(iid_95_width={iid_width:.3f}, block_95_width={block_width:.3f})."
    )


def main() -> None:
    oratio = odds_ratio(0.405)
    assert 1.49 < oratio < 1.51

    cov = mc_mean_ci_coverage()
    assert 0.90 <= cov <= 0.99  # nominal 95% under correct model

    assert block_bootstrap_requires_blocks(100, 5) is True
    assert block_bootstrap_requires_blocks(100, 1) is False
    check_block_bootstrap_dependence()

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
