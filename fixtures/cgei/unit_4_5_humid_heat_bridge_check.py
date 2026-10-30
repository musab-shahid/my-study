"""Unit 4.5 ↔ 2.3 bridge: SUHII does not determine Tw ranking.

Synthetic LST contrast vs simple Tw proxy from T_air and RH.
Not a full psychrometric formula—teaching invariant only.
"""
from __future__ import annotations

from math import isclose


def suhii(urban_lst: float, ref_lst: float) -> float:
    return urban_lst - ref_lst


def tw_proxy(t_air_c: float, rh: float) -> float:
    """Crude wet-bulb proxy (°C): Tw ≈ T - (T - Td)*0.3 with Td from RH rule of thumb.

    Uses dewpoint approximation Td ≈ T - (100-RH)/5 (very rough) for teaching only.
    """
    td = t_air_c - (100.0 - 100.0 * rh) / 5.0
    return t_air_c - 0.3 * (t_air_c - td)


def main() -> None:
    # Positive SUHII
    s = suhii(312.0, 308.0)
    assert isclose(s, 4.0)

    # Scenario A: urban hotter surface but much drier; rural cooler but very moist
    tw_u = tw_proxy(33.0, 0.25)
    tw_r = tw_proxy(29.0, 0.95)
    # Teaching point: moist rural Tw can exceed dry urban Tw despite cooler LST
    assert tw_r > tw_u

    # Scenario B: matched humidity — warmer urban air → higher Tw
    tw_u_b = tw_proxy(34.0, 0.40)
    tw_r_b = tw_proxy(30.0, 0.40)
    assert tw_u_b > tw_r_b

    # Guard: positive SUHII must not be treated as proof of higher urban Tw in A
    assert s > 0 and tw_u < tw_r

    print(
        "Unit 4.5 humid-heat bridge checks passed "
        f"(SUHII={s:.1f} K, Tw_u_A={tw_u:.2f}, Tw_r_A={tw_r:.2f}, "
        f"Tw_u_B={tw_u_b:.2f}, Tw_r_B={tw_r_b:.2f})."
    )


if __name__ == "__main__":
    main()
