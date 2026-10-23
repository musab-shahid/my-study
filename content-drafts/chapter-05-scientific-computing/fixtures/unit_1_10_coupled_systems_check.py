"""Unit 1.10 coupled human–natural systems teaching checks (stdlib).

1) Urban surface energy residual (simplified, W/m^2):
     Q_star + Q_F = Q_H + Q_E + dQ_S
   Solve for storage change dQ_S and require energy closure within tolerance.

2) Urban heat intensity: T_u - T_r for paired synthetic stations.

3) Compound stress flag: heat + drought indicators both above thresholds
   (synthetic binary scores — not a hazard model).

Teaching only — not a calibrated urban climate model or risk assessment.
"""
from __future__ import annotations

from math import isclose


def storage_term(q_star: float, q_f: float, q_h: float, q_e: float) -> float:
    """dQ_S = Q* + Q_F - Q_H - Q_E  (W/m^2)."""
    return q_star + q_f - q_h - q_e


def uhi(t_urban_c: float, t_rural_c: float) -> float:
    return t_urban_c - t_rural_c


def compound_stress(heat_index: float, drought_index: float, heat_th: float, drought_th: float) -> bool:
    """True when both stressors exceed thresholds (AND compound)."""
    return heat_index >= heat_th and drought_index >= drought_th


def main() -> None:
    # Urban midday teaching values (W/m^2)
    q_star, q_f, q_h, q_e = 450.0, 30.0, 280.0, 80.0
    dqs = storage_term(q_star, q_f, q_h, q_e)
    # 450+30-280-80 = 120
    assert isclose(dqs, 120.0, abs_tol=1e-12)
    # Closure: residual of rearranged equation is 0
    residual = q_star + q_f - q_h - q_e - dqs
    assert isclose(residual, 0.0, abs_tol=1e-12)

    # Rural contrast: Q_F≈0, smaller storage
    dqs_r = storage_term(450.0, 0.0, 200.0, 200.0)
    assert isclose(dqs_r, 50.0, abs_tol=1e-12)
    assert dqs > dqs_r  # urban stores more heat in this teaching case

    # UHI
    delta = uhi(38.5, 35.0)
    assert isclose(delta, 3.5, abs_tol=1e-12)
    assert uhi(30.0, 30.0) == 0.0

    # Compound stress
    assert compound_stress(0.8, 0.7, 0.6, 0.6) is True
    assert compound_stress(0.8, 0.4, 0.6, 0.6) is False  # drought below
    assert compound_stress(0.5, 0.9, 0.6, 0.6) is False  # heat below

    # Invalid energy: negative is allowed mathematically but flagged if |residual| large
    # when an independent closure observation is supplied
    observed_dqs = 100.0
    closure_error = abs(storage_term(q_star, q_f, q_h, q_e) - observed_dqs)
    assert closure_error > 15.0  # detects mismatch vs observed storage

    print(
        "Unit 1.10 coupled-systems checks passed "
        f"(urban_dQs={dqs}, rural_dQs={dqs_r}, UHI={delta}, "
        f"compound={compound_stress(0.8, 0.7, 0.6, 0.6)})."
    )


if __name__ == "__main__":
    main()
