"""Unit 2.2 climate system process checks (stdlib).

1) One-layer IR greenhouse teaching model:
     TOA: σ Te^4 = S(1-A)/4
     Surface under ideal longwave absorber: σ Ts^4 = 2 σ Te^4
     => Ts = Te * 2**(1/4)
   Not a multi-layer GCM.

2) Surface energy residual with latent heat:
     Q* + Q_F = Q_H + Q_E + dQ_S
   Increasing Q_E (evaporative cooling) reduces residual available for Q_H+dQ_S.

3) Feedback sign helper: ice-albedo positive (melt -> lower A -> more absorbed).
"""
from __future__ import annotations

from math import isclose

SIGMA = 5.670374419e-8


def effective_temperature(s: float, albedo: float) -> float:
    absorbed = s * (1.0 - albedo) / 4.0
    return (absorbed / SIGMA) ** 0.25


def one_layer_surface_temperature(te: float) -> float:
    if te <= 0:
        raise ValueError("Te must be positive")
    return te * (2.0**0.25)


def absorbed_solar(s: float, albedo: float) -> float:
    return s * (1.0 - albedo) / 4.0


def storage_term(q_star, q_f, q_h, q_e):
    return q_star + q_f - q_h - q_e


def main() -> None:
    te = effective_temperature(1361.0, 0.30)
    ts = one_layer_surface_temperature(te)
    assert 254.0 < te < 256.0
    assert ts > te
    assert 300.0 < ts < 305.0  # ~302.7 K teaching value

    # Albedo decrease increases absorbed solar (positive ice-albedo direction)
    a_hi = absorbed_solar(1361.0, 0.35)
    a_lo = absorbed_solar(1361.0, 0.25)
    assert a_lo > a_hi

    # Latent heat reduces residual for storage/sensible path
    base = storage_term(400.0, 0.0, 150.0, 100.0)  # 150
    wetter = storage_term(400.0, 0.0, 150.0, 180.0)  # 70
    assert wetter < base

    try:
        one_layer_surface_temperature(0)
        raise AssertionError("expected failure")
    except ValueError:
        pass

    print(
        "Unit 2.2 climate-process checks passed "
        f"(Te≈{te:.2f} K, Ts≈{ts:.2f} K, absorbed_loA={a_lo:.1f}, "
        f"dQs_base={base}, dQs_wet={wetter})."
    )


if __name__ == "__main__":
    main()
