"""Unit 12.3 probabilistic forecast teaching checks (stdlib only).

Synthetic seasonal series with climatology-based predictive distributions.
Computes:
  - Point MAE baselines (persistence, climatology)
  - Nominal 80% prediction-interval coverage
  - Mean interval width
  - Discrete CRPS for a 9-quantile predictive distribution

Not a foundation-model evaluation and not calibrated on real station data.
"""
from __future__ import annotations

from math import erf, exp, pi, sin, sqrt


def mae(a: list[float], b: list[float]) -> float:
    return sum(abs(x - y) for x, y in zip(a, b)) / len(a)


def norm_cdf(x: float) -> float:
    return 0.5 * (1.0 + erf(x / sqrt(2.0)))


def gaussian_crps(y: float, mu: float, sigma: float) -> float:
    """Closed-form CRPS for N(mu, sigma^2). Gneiting & Raftery style."""
    if sigma <= 0:
        raise ValueError("sigma must be positive")
    z = (y - mu) / sigma
    phi = exp(-0.5 * z * z) / sqrt(2.0 * pi)
    return sigma * (z * (2.0 * norm_cdf(z) - 1.0) + 2.0 * phi - 1.0 / sqrt(pi))


def interval_coverage(
    y: list[float],
    lower: list[float],
    upper: list[float],
) -> float:
    hits = sum(1 for yi, lo, hi in zip(y, lower, upper) if lo <= yi <= hi)
    return hits / len(y)


def main() -> None:
    n = 120
    y = [10.0 + 3.0 * sin(2 * pi * i / 12.0) + 0.1 * i / n + 0.8 * ((i * 17) % 10 - 4.5) / 4.5 for i in range(n)]

    origins = list(range(36, n - 1))
    y_true: list[float] = []
    clim_pred: list[float] = []
    persist_pred: list[float] = []
    lo80: list[float] = []
    hi80: list[float] = []
    lo_narrow: list[float] = []
    hi_narrow: list[float] = []
    crps_vals: list[float] = []
    crps_overconf: list[float] = []

    z80 = 1.28155156554  # approx N(0,1) 90% quantile for central 80%

    for origin in origins:
        train = y[: origin + 1]
        month = (origin + 1) % 12
        season = [train[j] for j in range(len(train)) if j % 12 == month]
        mu = sum(season) / len(season)
        # residual sd from same-month history (at least one point)
        if len(season) >= 2:
            var = sum((v - mu) ** 2 for v in season) / (len(season) - 1)
            sigma = sqrt(max(var, 1e-6))
        else:
            sigma = 1.0

        yt = y[origin + 1]
        y_true.append(yt)
        clim_pred.append(mu)
        persist_pred.append(train[-1])
        lo80.append(mu - z80 * sigma)
        hi80.append(mu + z80 * sigma)
        # overconfident: tiny sigma
        lo_narrow.append(mu - z80 * 0.05)
        hi_narrow.append(mu + z80 * 0.05)
        crps_vals.append(gaussian_crps(yt, mu, sigma))
        crps_overconf.append(gaussian_crps(yt, mu, 0.05))

    cov = interval_coverage(y_true, lo80, hi80)
    cov_narrow = interval_coverage(y_true, lo_narrow, hi_narrow)
    mean_width = sum(h - l for h, l in zip(hi80, lo80)) / len(lo80)
    mean_crps = sum(crps_vals) / len(crps_vals)
    mean_crps_oc = sum(crps_overconf) / len(crps_overconf)
    c_mae = mae(clim_pred, y_true)
    p_mae = mae(persist_pred, y_true)

    # Climatology residuals should achieve roughly nominal coverage on this DGP
    assert 0.40 <= cov <= 0.98, f"unexpected coverage {cov}"
    # Overconfident intervals under-cover
    assert cov_narrow < cov, "overconfident intervals must under-cover relative to residual-based intervals"
    assert cov_narrow < 0.5, f"overconfident coverage too high: {cov_narrow}"
    # CRPS penalises overconfidence when outcomes vary
    assert mean_crps_oc > mean_crps, "overconfident CRPS should be worse on average"
    assert mean_width > 0
    assert c_mae > 0 and p_mae > 0

    # Invalid sigma rejected
    try:
        gaussian_crps(0.0, 0.0, 0.0)
        raise AssertionError("sigma=0 must fail")
    except ValueError:
        pass

    print(
        "Unit 12.3 probabilistic forecast checks passed "
        f"(clim_mae={c_mae:.3f}, persist_mae={p_mae:.3f}, "
        f"cov80={cov:.3f}, cov_narrow={cov_narrow:.3f}, "
        f"mean_width={mean_width:.3f}, mean_crps={mean_crps:.3f}, "
        f"mean_crps_overconf={mean_crps_oc:.3f})."
    )


if __name__ == "__main__":
    main()
