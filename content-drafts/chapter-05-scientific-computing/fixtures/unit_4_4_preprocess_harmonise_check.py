"""Unit 4.4 preprocessing and harmonisation teaching checks (stdlib).

Synthetic radiometric and mask contracts — not live Landsat/Sentinel processing.

1) DN → radiance with gain/bias
2) Omission and commission rates for a cloud-mask sample
3) Co-registration residual RMSE on control shifts
4) Smoothing attenuation flag when an impulse is damped
"""
from __future__ import annotations

from math import isclose, sqrt


def dn_to_radiance(dn: float, gain: float, bias: float) -> float:
    return gain * dn + bias


def omission_commission(tp: int, fp: int, fn: int) -> tuple[float, float]:
    omit = fn / (tp + fn) if (tp + fn) else 0.0
    comm = fp / (tp + fp) if (tp + fp) else 0.0
    return omit, comm


def residual_rmse(dx: list[float], dy: list[float]) -> float:
    if not dx or len(dx) != len(dy):
        raise ValueError("dx/dy required and same length")
    return sqrt(sum(x * x + y * y for x, y in zip(dx, dy)) / len(dx))


def moving_average(series: list[float], window: int = 3) -> list[float]:
    """Simple smoother used only to illustrate attenuation of an impulse."""
    if window < 1 or window % 2 == 0:
        raise ValueError("window must be odd and >= 1")
    half = window // 2
    out = []
    n = len(series)
    for i in range(n):
        lo, hi = max(0, i - half), min(n, i + half + 1)
        out.append(sum(series[lo:hi]) / (hi - lo))
    return out


def main() -> None:
    # Radiometric chain teaching numbers
    L = dn_to_radiance(1000.0, gain=0.01, bias=1.5)
    assert isclose(L, 11.5, abs_tol=1e-9)

    # Mask sample from lesson worked example
    omit, comm = omission_commission(tp=35, fp=10, fn=5)
    assert isclose(omit, 0.125, abs_tol=1e-9)
    assert isclose(comm, 10 / 45, abs_tol=1e-9)

    # Independent control residuals (pixels)
    rmse = residual_rmse([0.2, -0.1, 0.3, 0.0], [0.1, 0.2, -0.2, 0.1])
    assert rmse > 0
    assert rmse < 0.5  # teaching threshold for "acceptable" demo only

    # Impulse attenuation under smoothing
    series = [1.0, 1.0, 5.0, 1.0, 1.0]
    smooth = moving_average(series, 3)
    assert smooth[2] < series[2]  # peak damped

    print(
        "Unit 4.4 preprocess/harmonise checks passed "
        f"(L={L:.2f}, O={omit:.3f}, C={comm:.3f}, RMSE={rmse:.3f}, peak_damped)."
    )


if __name__ == "__main__":
    main()
