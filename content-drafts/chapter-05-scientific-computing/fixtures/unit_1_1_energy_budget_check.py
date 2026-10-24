"""Unit 1.1 planetary energy budget and blackbody laws (stdlib).

Constants (SI):
  σ = 5.670374419e-8 W m^-2 K^-4  (Stefan–Boltzmann)
  Wien displacement: λ_max T = 2897.8 μm K  (teaching value)

Checks:
  1) Blackbody exitance M = σ T^4 at T=288 K
  2) Effective emitting temperature from global mean balance:
       σ Te^4 = S (1-A) / 4
     with S=1361 W/m^2, A=0.30 → Te ≈ 254.9 K
  3) Wien peak for T=288 K ≈ 10.06 μm (thermal IR)

Teaching model only — not a full GCM energy budget or calibrated climate sensitivity.
"""
from __future__ import annotations

from math import isclose

SIGMA = 5.670374419e-8  # W m^-2 K^-4
WIEN_UM_K = 2897.8  # μm K


def blackbody_exitance(t_k: float) -> float:
    if t_k <= 0:
        raise ValueError("temperature must be positive kelvin")
    return SIGMA * t_k**4


def effective_temperature(s: float, albedo: float) -> float:
    if not 0 <= albedo < 1:
        raise ValueError("albedo must be in [0, 1)")
    if s <= 0:
        raise ValueError("solar constant must be positive")
    absorbed = s * (1.0 - albedo) / 4.0
    return (absorbed / SIGMA) ** 0.25


def wien_peak_um(t_k: float) -> float:
    if t_k <= 0:
        raise ValueError("temperature must be positive kelvin")
    return WIEN_UM_K / t_k


def surface_energy_balance(
    rn: float, h: float, le: float, g: float
) -> float:
    """Residual of Rn = H + LE + G (W m^-2). Zero means closed budget.

    Sign convention (teaching): Rn net radiation into the surface; H, LE, G
    leave the surface into atmosphere / ground. Residual near zero is a
    closure check — not proof of instrument accuracy.
    """
    return rn - (h + le + g)


def main() -> None:

    m288 = blackbody_exitance(288.0)
    # Hand: 288^2=82944; 288^4=6.8797e9; *σ ≈ 390.1 W/m^2
    assert 389.0 < m288 < 391.0

    te = effective_temperature(1361.0, 0.30)
    assert 254.0 < te < 256.0

    # Zero albedo raises Te
    te0 = effective_temperature(1361.0, 0.0)
    assert te0 > te

    lam = wien_peak_um(288.0)
    assert isclose(lam, WIEN_UM_K / 288.0, rel_tol=0, abs_tol=1e-12)
    assert 10.0 < lam < 10.2

    # Invalid inputs fail
    try:
        blackbody_exitance(0)
        raise AssertionError("expected failure")
    except ValueError:
        pass
    try:
        effective_temperature(1361.0, 1.0)
        raise AssertionError("expected albedo failure")
    except ValueError:
        pass

    # Surface energy balance residual (teaching numbers)
    assert abs(surface_energy_balance(450.0, 120.0, 280.0, 50.0)) < 1e-9
    assert surface_energy_balance(450.0, 100.0, 280.0, 50.0) == 20.0  # open budget

    print(
        "Unit 1.1 energy-budget checks passed "
        f"(M_288≈{m288:.2f} W/m^2, Te≈{te:.2f} K, λ_max≈{lam:.2f} μm)."
    )


if __name__ == "__main__":
    main()
