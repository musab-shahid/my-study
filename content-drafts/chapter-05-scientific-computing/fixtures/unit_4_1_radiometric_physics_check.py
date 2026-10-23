"""Unit 4.1 radiometric physics teaching checks (stdlib).

Synthetic blackbody calculations — not satellite observations.

1) c = λ ν consistency
2) Wien peak (wavelength form): λ_max T = 2897.8 μm K
3) Planck B_λ(T) at λ=10 μm, T=300 K (SI spectral radiance W m^-2 sr^-1 m^-1)
4) Brightness-temperature inversion round-trip for the same spectral point
5) Invalid T/λ rejected

Teaching model only — not atmospheric correction or LST retrieval validation.
"""
from __future__ import annotations

from math import exp, isclose, log

H = 6.62607015e-34  # J s
C = 2.99792458e8  # m/s
K = 1.380649e-23  # J/K
WIEN_UM_K = 2897.8  # μm K (wavelength spectrum)


def wavelength_from_frequency(nu_hz: float) -> float:
    if nu_hz <= 0:
        raise ValueError("frequency must be positive")
    return C / nu_hz


def frequency_from_wavelength(lam_m: float) -> float:
    if lam_m <= 0:
        raise ValueError("wavelength must be positive")
    return C / lam_m


def wien_peak_um(t_k: float) -> float:
    if t_k <= 0:
        raise ValueError("temperature must be positive")
    return WIEN_UM_K / t_k


def planck_B_lambda(lam_m: float, t_k: float) -> float:
    """Spectral radiance B_λ in W m^-2 sr^-1 m^-1."""
    if lam_m <= 0 or t_k <= 0:
        raise ValueError("wavelength and temperature must be positive")
    x = H * C / (lam_m * K * t_k)
    # For Earth TIR, x is moderate; use direct form
    return (2 * H * C**2) / (lam_m**5) / (exp(x) - 1.0)


def brightness_temperature(lam_m: float, b_lambda: float) -> float:
    """Invert Planck B_λ for brightness temperature (K)."""
    if lam_m <= 0 or b_lambda <= 0:
        raise ValueError("wavelength and radiance must be positive")
    # B = 2hc^2/λ^5 / (exp(hc/λkT)-1)
    # exp(hc/λkT) = 2hc^2/(λ^5 B) + 1
    ratio = (2 * H * C**2) / (lam_m**5 * b_lambda) + 1.0
    return H * C / (lam_m * K * log(ratio))


def main() -> None:
    # 10 μm ↔ frequency
    lam = 10e-6
    nu = frequency_from_wavelength(lam)
    assert isclose(wavelength_from_frequency(nu), lam, rel_tol=0, abs_tol=1e-18)

    # Wien at 300 K ≈ 9.66 μm
    peak = wien_peak_um(300.0)
    assert 9.5 < peak < 9.8

    # Planck at 10 μm, 300 K
    b = planck_B_lambda(lam, 300.0)
    assert b > 0
    # Round-trip brightness temperature
    tb = brightness_temperature(lam, b)
    assert isclose(tb, 300.0, rel_tol=0, abs_tol=1e-6)

    # Hotter → larger B_λ at fixed λ in this regime
    b_hot = planck_B_lambda(lam, 320.0)
    assert b_hot > b

    try:
        planck_B_lambda(-1.0, 300.0)
        raise AssertionError("expected failure")
    except ValueError:
        pass
    try:
        brightness_temperature(lam, 0.0)
        raise AssertionError("expected failure")
    except ValueError:
        pass

    print(
        "Unit 4.1 radiometric checks passed "
        f"(ν={nu:.3e} Hz, λ_max(300K)={peak:.2f} μm, "
        f"B_λ={b:.3e} W/m2/sr/m, Tb={tb:.4f} K)."
    )


if __name__ == "__main__":
    main()
