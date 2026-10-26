"""Unit 4.3 spectral indices and LST teaching checks (stdlib).

Synthetic reflectance and ST contracts — not live Landsat scenes.

1) NDVI for sparse and dense synthetic pixels
2) Official-style ST decode (teaching constants; verify USGS for ops)
3) QA usable-pixel count
4) Clear-sky composite bias: mean of clear subset > mean of all when cool cloudy days exist
"""
from __future__ import annotations

from math import isclose

# Teaching Collection-2 style factors (TOC / common USGS tables) — verify for operations.
ST_SCALE = 0.00341802
ST_OFFSET = 149.0
SR_SCALE = 0.0000275
SR_OFFSET = -0.2


def ndvi(nir: float, red: float) -> float:
    denom = nir + red
    if denom == 0:
        raise ValueError("NDVI undefined when NIR+Red == 0")
    return (nir - red) / denom


def decode_st_kelvin(dn: float, scale: float = ST_SCALE, offset: float = ST_OFFSET) -> float:
    if scale is None or offset is None:
        raise ValueError("scale and offset required")
    return dn * scale + offset


def decode_sr(dn: float, scale: float = SR_SCALE, offset: float = SR_OFFSET) -> float:
    return dn * scale + offset


def usable_clear(flags):
    return sum(1 for f in flags if f == "clear")


def main() -> None:
    assert isclose(ndvi(0.40, 0.10), 0.60, abs_tol=1e-12)
    try:
        ndvi(0.0, 0.0)
        raise AssertionError("expected zero-denominator failure")
    except ValueError:
        pass

    sparse = ndvi(0.25, 0.18)
    dense = ndvi(0.45, 0.05)
    assert isclose(sparse, 0.1627906976744186, rel_tol=1e-9)
    assert isclose(dense, 0.8, rel_tol=1e-9)
    assert dense > sparse

    dn_st = (310.0 - ST_OFFSET) / ST_SCALE
    st = decode_st_kelvin(dn_st)
    assert isclose(st, 310.0, abs_tol=1e-6)

    # Reflectance teaching decode: DN such that SR ~ 0.1
    dn_sr = (0.1 - SR_OFFSET) / SR_SCALE
    sr = decode_sr(dn_sr)
    assert isclose(sr, 0.1, abs_tol=1e-6)

    flags = ["clear", "cloud", "clear", "shadow", "clear", "fill"]
    assert usable_clear(flags) == 3

    # Clear-sky bias: cloudy days cooler
    lst_series = [304.0, 301.0, 298.0, 303.0, 297.0]  # last two "cloudy" if masked
    clear_mask = [True, True, False, True, False]
    clear_vals = [t for t, c in zip(lst_series, clear_mask) if c]
    assert sum(clear_vals) / len(clear_vals) > sum(lst_series) / len(lst_series)

    print(
        "Unit 4.3 indices/LST checks passed "
        f"(NDVI_sparse={sparse:.3f}, NDVI_dense={dense:.3f}, ST={st:.2f} K, "
        f"usable={usable_clear(flags)}, clear_sky_bias_ok)."
    )


if __name__ == "__main__":
    main()
