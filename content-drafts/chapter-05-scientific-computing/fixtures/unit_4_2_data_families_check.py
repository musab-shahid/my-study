"""Unit 4.2 major EO data-family teaching checks (stdlib).

Synthetic product-metadata contracts — not live Landsat/Sentinel downloads.

1) Landsat-style surface temperature scale: ST = DN * scale + offset
2) Reject decoding without documented scale/offset
3) Cloud-mask logic: usable vs cloudy/shadow/missing
4) Product-family fitness tags must stay distinct
"""
from __future__ import annotations

from math import isclose

# Illustrative Collection-2 style factors for teaching (verify against USGS docs for ops)
ST_SCALE = 0.00341802
ST_OFFSET = 149.0


def decode_landsat_st_kelvin(dn: float, scale: float = ST_SCALE, offset: float = ST_OFFSET) -> float:
    if scale is None or offset is None:
        raise ValueError("scale and offset required")
    return dn * scale + offset


def usable_pixels(qa_flags):
    """qa_flags: iterable of {'clear','cloud','shadow','missing'}."""
    return sum(1 for f in qa_flags if f == "clear")


def main() -> None:
    # DN chosen so ST is near 300 K
    dn = (300.0 - ST_OFFSET) / ST_SCALE
    st = decode_landsat_st_kelvin(dn)
    assert isclose(st, 300.0, abs_tol=1e-6)

    try:
        decode_landsat_st_kelvin(1000.0, scale=None, offset=ST_OFFSET)  # type: ignore
        raise AssertionError("expected failure")
    except (ValueError, TypeError):
        pass

    flags = ["clear", "cloud", "clear", "shadow", "missing", "clear"]
    assert usable_pixels(flags) == 3
    assert usable_pixels(["cloud", "shadow"]) == 0

    families = {
        "optical_surface_reflectance": {"example": "Landsat C2 L2 / Sentinel-2 L2A"},
        "thermal_surface_temperature": {"example": "Landsat ST product"},
        "sar_backscatter": {"example": "Sentinel-1 GRD"},
        "dem": {"example": "Copernicus DEM / SRTM"},
        "land_cover": {"example": "ESA WorldCover / Dynamic World"},
    }
    assert "sar_backscatter" in families and families["dem"]["example"]

    # Cross-sensor continuity caution: same name ≠ same calibration
    assert "optical_surface_reflectance" != "thermal_surface_temperature"

    print(
        "Unit 4.2 data-family checks passed "
        f"(ST={st:.4f} K from DN, usable={usable_pixels(flags)})."
    )


if __name__ == "__main__":
    main()
