"""Unit 5.1 numerical foundations: units, finite differences, Euler mass balance.

Stdlib only. These checks verify arithmetic and units bookkeeping for teaching
examples. They are not calibrated hydrological models or observational validation.
"""
from __future__ import annotations

from math import isclose


def celsius_to_kelvin(t_c: float) -> float:
    if t_c < -273.15:
        raise ValueError("below absolute zero")
    return t_c + 273.15


def mm_per_day_to_m_per_s(mm_day: float) -> float:
    """Convert a depth rate (mm/day) to SI m/s."""
    return (mm_day * 1e-3) / 86400.0


def central_diff(y_prev: float, y_next: float, dt: float) -> float:
    if dt <= 0:
        raise ValueError("dt must be positive")
    return (y_next - y_prev) / (2.0 * dt)


def forward_euler_volume(v0: float, q_in: float, q_out: float, dt: float) -> float:
    """V_{t+dt} = V_t + dt * (Q_in - Q_out). Units: V m^3, Q m^3/s, dt s."""
    if dt <= 0:
        raise ValueError("dt must be positive")
    return v0 + dt * (q_in - q_out)


def main() -> None:
    # --- Units / dimensional consistency ---
    assert isclose(celsius_to_kelvin(0.0), 273.15, rel_tol=0, abs_tol=1e-12)
    assert isclose(celsius_to_kelvin(25.0), 298.15, rel_tol=0, abs_tol=1e-12)
    # Wrong direction would subtract 273.15 from Celsius → nonsense kelvin
    assert celsius_to_kelvin(25.0) != 25.0 - 273.15

    # 1 mm/day → m/s
    rate = mm_per_day_to_m_per_s(1.0)
    assert isclose(rate, 1e-3 / 86400.0, rel_tol=0, abs_tol=1e-18)
    # Common error: forget 86400 → off by ~1e5
    assert not isclose(rate, 1e-3, rel_tol=0, abs_tol=1e-12)

    # --- Finite differences on y = t^2 at t=2 with h=0.1 ---
    # Exact derivative 2t = 4; central difference uses y(2.1), y(1.9)
    h = 0.1
    y_prev, y_next = (2.0 - h) ** 2, (2.0 + h) ** 2
    dydt = central_diff(y_prev, y_next, h)
    assert isclose(dydt, 4.0, rel_tol=0, abs_tol=1e-12)  # exact for quadratics
    # Forward difference (y(2.1)-y(2))/h = (4.41-4)/0.1 = 4.1
    forward = (y_next - 4.0) / h
    assert isclose(forward, 4.1, rel_tol=0, abs_tol=1e-12)
    assert abs(forward - 4.0) > abs(dydt - 4.0)

    # --- Lake mass-balance Euler step ---
    # V0 = 1e6 m^3; Qin=2.0 m^3/s; Qout=1.5 m^3/s; dt=3600 s
    v1 = forward_euler_volume(1.0e6, 2.0, 1.5, 3600.0)
    assert isclose(v1, 1.0e6 + 3600.0 * 0.5, rel_tol=0, abs_tol=1e-9)
    assert isclose(v1, 1_001_800.0, rel_tol=0, abs_tol=1e-9)
    # Unit mismatch demo: treating dt as hours without converting → wrong
    wrong = 1.0e6 + 1.0 * 0.5  # dt=1 "hour" but Q still in m^3/s
    assert abs(wrong - v1) > 1e3

    print(
        "Unit 5.1 foundations checks passed "
        f"(central_dydt={dydt}, V1={v1:.1f} m^3)."
    )


if __name__ == "__main__":
    main()
