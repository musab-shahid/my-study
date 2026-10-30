"""Unit 2.3 atmosphere teaching checks (stdlib).

Clausius–Clapeyron scaling via August–Roche–Magnus e_sat approximation.
Not an NWP model.
"""
from __future__ import annotations

from math import exp, isclose


def esat_hpa(t_k: float) -> float:
    """Saturation vapour pressure (hPa) from temperature (K)."""
    tc = t_k - 273.15
    return 6.1094 * exp((17.625 * tc) / (tc + 243.04))


def main() -> None:
    t0 = 300.0
    t1 = 301.0
    e0 = esat_hpa(t0)
    e1 = esat_hpa(t1)
    frac = e1 / e0 - 1.0
    assert 0.05 < frac < 0.08  # ~6–7%/K near 300 K
    # hydrostatic scale-height literacy: H = R_d T / g  (order 7–8 km for 250–300 K)
    rd = 287.0
    g = 9.81
    h_scale = rd * 288.0 / g
    assert 7000 < h_scale < 9000

    print(
        f"Unit 2.3 atmosphere checks passed "
        f"(e_sat_300K={e0:.3f} hPa, e_sat_301K={e1:.3f} hPa, "
        f"frac_increase={frac*100:.2f} %/K, H_scale={h_scale:.0f} m)."
    )


if __name__ == "__main__":
    main()
