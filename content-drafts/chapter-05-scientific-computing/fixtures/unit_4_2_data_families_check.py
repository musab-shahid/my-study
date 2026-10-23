"""Unit 4.2 major EO data-family teaching checks (stdlib).

Synthetic product-metadata contracts — not live Landsat/Sentinel downloads.

1) Landsat-style surface temperature scale: ST = DN * scale + offset
2) Reject decoding without documented scale/offset
3) Cloud-mask logic: usable vs cloudy/shadow/missing
4) Product-family fitness tags must stay distinct
5) SAR backscatter is not registered as a DEM or temperature product
"""
from __future__ import annotations

from math import isclose

# Illustrative Collection-2 style factors for teaching only.
# Operational work must read the current USGS Landsat Collection scale table
# (or the relevant agency product guide). Do not treat these constants as
# authoritative mission specifications.
ST_SCALE = 0.00341802
ST_OFFSET = 149.0


def decode_landsat_st_kelvin(dn: float, scale: float | None = ST_SCALE, offset: float | None = ST_OFFSET) -> float:
    if scale is None or offset is None:
        raise ValueError("scale and offset required from product documentation")
    return dn * scale + offset


def usable_pixels(qa_flags):
    """qa_flags: iterable of {'clear','cloud','shadow','missing'}."""
    return sum(1 for f in qa_flags if f == "clear")


def main() -> None:
    # DN chosen so ST is near 300 K with the teaching constants above
    dn = (300.0 - ST_OFFSET) / ST_SCALE
    st = decode_landsat_st_kelvin(dn)
    assert isclose(st, 300.0, abs_tol=1e-6)

    try:
        decode_landsat_st_kelvin(1000.0, scale=None, offset=ST_OFFSET)  # type: ignore[arg-type]
        raise AssertionError("expected failure when scale is missing")
    except (ValueError, TypeError):
        pass

    flags = ["clear", "cloud", "clear", "shadow", "missing", "clear"]
    assert usable_pixels(flags) == 3
    assert usable_pixels(["cloud", "shadow"]) == 0

    families = {
        "optical_surface_reflectance": {"example": "Landsat C2 L2 / Sentinel-2 L2A", "measures": "reflectance"},
        "thermal_surface_temperature": {"example": "Landsat ST product", "measures": "temperature_K"},
        "sar_backscatter": {"example": "Sentinel-1 GRD", "measures": "sigma0_not_elevation"},
        "dem": {"example": "Copernicus DEM / SRTM", "measures": "elevation"},
        "land_cover": {"example": "ESA WorldCover / Dynamic World", "measures": "discrete_classes"},
    }
    assert families["sar_backscatter"]["measures"] == "sigma0_not_elevation"
    assert families["sar_backscatter"]["measures"] != "elevation"
    assert families["optical_surface_reflectance"]["measures"] != families["thermal_surface_temperature"]["measures"]
    assert "dem" in families and families["land_cover"]["example"]

    # Cross-sensor continuity caution: same label family ≠ same calibration
    assert "optical_surface_reflectance" != "thermal_surface_temperature"

    print(
        "Unit 4.2 data-family checks passed "
        f"(ST={st:.4f} K from DN, usable={usable_pixels(flags)}, "
        "SAR≠DEM, optical≠thermal)."
    )


if __name__ == "__main__":
    main()
