"""Landsat Collection 2 Level-2 Surface Temperature — local input pathway.

Default: process a synthetic teaching raster (JSON) with documented C2 L2 ST
scale/offset. Optional: learner-supplied GeoTIFF via GDAL (--st-tif).

Authoritative product notes (USGS Landsat Collection 2 Level-2 Science Products):
  https://www.usgs.gov/landsat-missions/landsat-collection-2-level-2-science-products
  ST band: scale_factor 0.00341802, additive_offset 149.0 → Kelvin
  Fill/nodata: typically 0 (verify scene metadata)
  Quality: use QA_PIXEL (and related) — this module applies a simplified
  clear-pixel bit check when a QA array is provided; full bitfield semantics
  remain the learner's responsibility against the current USGS handbook.

Does not download data. Does not claim Multan validation.
"""
from __future__ import annotations

import argparse
import json
import sys
from hashlib import sha256
from pathlib import Path
from typing import Any, Callable

ROOT = Path(__file__).resolve().parents[1]
SYNTH = ROOT / "data" / "synthetic_landsat_st_scene.json"
OUT = ROOT / "outputs"

# USGS Landsat C2 L2 Surface Temperature (ST) documented conversion to Kelvin
ST_SCALE = 0.00341802
ST_OFFSET = 149.0
ST_FILL = 0
KELVIN_TO_C = 273.15
# Teaching physical sanity on scaled Kelvin (not official product min/max alone)
TEACHING_K_LO = 250.0
TEACHING_K_HI = 340.0
DOC_URL = "https://www.usgs.gov/landsat-missions/landsat-collection-2-level-2-science-products"


def dn_to_kelvin(
    dn: int | float,
    scale: float = ST_SCALE,
    offset: float = ST_OFFSET,
    fill: int = ST_FILL,
) -> float | None:
    if int(dn) == fill:
        return None
    return float(dn) * scale + offset


def apply_qa_clear(qa: int | None, clear_mask: int = 0b0000000000000000) -> bool:
    """Return True if pixel may be retained.

    When qa is None, no QA filtering is applied (caller must record that).
    Default teaching rule: reject if bit 1 (dilated cloud) or bit 3 (cloud)
    set in Landsat C2 QA_PIXEL-style masks — simplified for fixtures.
    Official bit definitions must be verified in the current USGS handbook.
    """
    if qa is None:
        return True
    cloud_bits = (1 << 1) | (1 << 3)  # dilated cloud + cloud (simplified)
    return (int(qa) & cloud_bits) == 0


def process_arrays(
    st_dn: list[list[int]],
    qa: list[list[int]] | None,
    zone: list[list[int]],
    *,
    scale: float = ST_SCALE,
    offset: float = ST_OFFSET,
    fill: int = ST_FILL,
    apply_qa: bool = True,
) -> dict[str, Any]:
    """Zonal means for zone codes: 1=urban, 2=rural, 3=periurban, 0=ignore."""
    nrows, ncols = len(st_dn), len(st_dn[0])
    if zone and (len(zone) != nrows or any(len(r) != ncols for r in zone)):
        raise ValueError("zone_shape_mismatch")
    if qa is not None and (len(qa) != nrows or any(len(r) != ncols for r in qa)):
        raise ValueError("qa_shape_mismatch")

    buckets: dict[int, list[float]] = {1: [], 2: [], 3: []}
    n_fill = n_qa_reject = n_range_reject = n_valid = 0
    n_total = nrows * ncols

    for i in range(nrows):
        for j in range(ncols):
            z = int(zone[i][j]) if zone else 0
            if z not in buckets:
                continue
            dn = st_dn[i][j]
            k = dn_to_kelvin(dn, scale, offset, fill)
            if k is None:
                n_fill += 1
                continue
            if apply_qa and qa is not None and not apply_qa_clear(qa[i][j]):
                n_qa_reject += 1
                continue
            if k < TEACHING_K_LO or k > TEACHING_K_HI:
                n_range_reject += 1
                continue
            buckets[z].append(k - KELVIN_TO_C)  # store Celsius
            n_valid += 1

    def zone_stats(vals: list[float], code: int) -> dict[str, Any]:
        # coverage vs pixels labeled as this zone
        n_zone = sum(1 for row in zone for v in row if int(v) == code)
        return {
            "n_zone_pixels": n_zone,
            "n_valid": len(vals),
            "coverage": (len(vals) / n_zone) if n_zone else 0.0,
            "mean_c": (sum(vals) / len(vals)) if vals else None,
        }

    urban = zone_stats(buckets[1], 1)
    rural = zone_stats(buckets[2], 2)
    peri = zone_stats(buckets[3], 3)

    def suhii(a: dict, b: dict) -> float | None:
        if a["mean_c"] is None or b["mean_c"] is None:
            return None
        return a["mean_c"] - b["mean_c"]

    return {
        "product": "Landsat_C2_L2_ST_teaching_path",
        "scale": scale,
        "offset": offset,
        "fill": fill,
        "scale_offset_source": "usgs_c2_l2_documented",
        "units_output": "Celsius",
        "qa_applied": bool(apply_qa and qa is not None),
        "n_total_pixels": n_total,
        "n_fill": n_fill,
        "n_qa_reject": n_qa_reject,
        "n_range_reject": n_range_reject,
        "n_valid_assigned": n_valid,
        "urban": urban,
        "rural": rural,
        "periurban": peri,
        "suhii_vs_rural_c": suhii(urban, rural),
        "suhii_vs_periurban_c": suhii(urban, peri),
        "documentation_url": DOC_URL,
    }


def enforce_coverage(result: dict, min_frac: float = 0.3) -> list[str]:
    errs = []
    for key in ("urban", "rural"):
        cov = result[key]["coverage"]
        if cov < min_frac:
            errs.append(f"insufficient_coverage:{key}:{cov:.3f}")
    return errs


def load_synthetic_scene(path: Path = SYNTH) -> dict:
    if not path.is_file():
        raise FileNotFoundError(f"missing_synthetic_scene:{path}")
    return json.loads(path.read_text(encoding="utf-8"))


def process_synthetic(path: Path = SYNTH, min_coverage: float = 0.3) -> dict:
    scene = load_synthetic_scene(path)
    meta = scene.get("meta", {})
    result = process_arrays(
        scene["st_dn"],
        scene.get("qa"),
        scene["zone"],
        scale=float(meta.get("scale", ST_SCALE)),
        offset=float(meta.get("offset", ST_OFFSET)),
        fill=int(meta.get("fill", ST_FILL)),
        apply_qa=bool(meta.get("apply_qa", True)),
    )
    cov_errs = enforce_coverage(result, min_coverage)
    result["coverage_errors"] = cov_errs
    result["min_coverage"] = min_coverage
    result["input"] = str(path)
    result["input_sha256"] = sha256(path.read_bytes()).hexdigest()
    result["path_kind"] = "synthetic_json_raster"
    result["non_claims"] = [
        "Synthetic teaching raster — not a Landsat granule",
        "Not Multan observations",
        "LST/ST contrast is not 2 m air-temperature UHI",
        "Simplified QA bit check is not full USGS QA_PIXEL interpretation",
        "Not operational heat-health risk",
    ]
    if cov_errs:
        result["status"] = "coverage_failed"
    else:
        result["status"] = "ok"
    OUT.mkdir(parents=True, exist_ok=True)
    out = OUT / "landsat_st_synthetic_result.json"
    out.write_text(json.dumps(result, indent=2), encoding="utf-8")
    result["output_path"] = str(out)
    return result


def process_st_geotiff(
    st_path: Path,
    zone_path: Path | None = None,
    qa_path: Path | None = None,
    min_coverage: float = 0.3,
    gdal_open: Callable | None = None,
) -> dict:
    """Optional GDAL path for learner-supplied ST GeoTIFF (+ optional QA/zone)."""
    if not st_path.is_file():
        raise FileNotFoundError(f"missing_st_tif:{st_path}")
    name = st_path.name.upper()
    if "ST" not in name and "TEMP" not in name and "LST" not in name:
        # soft warning in result only
        pass

    if gdal_open is None:
        try:
            from osgeo import gdal  # type: ignore

            gdal.UseExceptions()
            gdal_open = gdal.Open
        except ImportError as exc:
            raise RuntimeError(
                "gdal_python_not_available: install GDAL to process real GeoTIFF; "
                "use synthetic JSON path for CI"
            ) from exc

    ds = gdal_open(str(st_path))
    if ds is None:
        raise ValueError(f"gdal_open_failed:{st_path}")
    band = ds.GetRasterBand(1)
    if band is None:
        raise ValueError("st_band_missing")
    arr = band.ReadAsArray()
    if arr is None:
        raise ValueError("read_failed")
    st_dn = [[int(v) for v in row] for row in arr]

    scale = band.GetScale() or ST_SCALE
    offset = band.GetOffset() if band.GetOffset() is not None else ST_OFFSET
    if scale in (None, 0, 1.0):
        scale = ST_SCALE
    fill = int(band.GetNoDataValue() if band.GetNoDataValue() is not None else ST_FILL)

    qa = None
    if qa_path and qa_path.is_file():
        qds = gdal_open(str(qa_path))
        qa = [[int(v) for v in row] for row in qds.GetRasterBand(1).ReadAsArray()]

    if zone_path is None or not zone_path.is_file():
        raise FileNotFoundError(
            "zone_raster_required: provide a zone GeoTIFF with codes "
            "1=urban, 2=rural, 3=periurban, 0=ignore"
        )
    zds = gdal_open(str(zone_path))
    zone = [[int(v) for v in row] for row in zds.GetRasterBand(1).ReadAsArray()]

    result = process_arrays(
        st_dn, qa, zone, scale=float(scale), offset=float(offset), fill=fill, apply_qa=qa is not None
    )
    result["coverage_errors"] = enforce_coverage(result, min_coverage)
    result["min_coverage"] = min_coverage
    result["input"] = str(st_path.resolve())
    result["input_sha256"] = sha256(st_path.read_bytes()).hexdigest()
    result["path_kind"] = "local_geotiff"
    result["crs"] = ds.GetProjection()[:120] if ds.GetProjection() else None
    result["geotransform"] = list(ds.GetGeoTransform()) if ds.GetGeoTransform() else None
    result["non_claims"] = [
        "Learner-supplied file — study-area claim is the learner's responsibility",
        "LST/ST is not 2 m air temperature",
        "QA handling simplified unless full bitfield logic is implemented",
        "Not operational Multan heat-health validation",
    ]
    result["status"] = "coverage_failed" if result["coverage_errors"] else "ok"
    OUT.mkdir(parents=True, exist_ok=True)
    out = OUT / f"landsat_st_local_{st_path.stem}.json"
    out.write_text(json.dumps(result, indent=2), encoding="utf-8")
    result["output_path"] = str(out)
    return result


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Landsat C2 L2 ST local / synthetic pathway")
    p.add_argument("--st-tif", default="", help="Learner-supplied ST GeoTIFF")
    p.add_argument("--zone-tif", default="", help="Zone codes GeoTIFF")
    p.add_argument("--qa-tif", default="", help="Optional QA_PIXEL GeoTIFF")
    p.add_argument("--min-coverage", type=float, default=0.3)
    args = p.parse_args(argv)

    if args.st_tif:
        try:
            r = process_st_geotiff(
                Path(args.st_tif),
                Path(args.zone_tif) if args.zone_tif else None,
                Path(args.qa_tif) if args.qa_tif else None,
                min_coverage=args.min_coverage,
            )
        except Exception as exc:  # noqa: BLE001
            print(f"Landsat ST local processing failed: {exc}", file=sys.stderr)
            return 1
        print(
            "Landsat ST local "
            f"(status={r['status']}, SUHII_rural={r['suhii_vs_rural_c']}, "
            f"SUHII_peri={r['suhii_vs_periurban_c']}, path={r['path_kind']})."
        )
        return 0 if r["status"] == "ok" else 2

    r = process_synthetic(min_coverage=args.min_coverage)
    print(
        "Landsat ST synthetic path "
        f"(status={r['status']}, SUHII_rural={r['suhii_vs_rural_c']:.3f} °C, "
        f"SUHII_peri={r['suhii_vs_periurban_c']:.3f} °C, "
        f"qa_applied={r['qa_applied']})."
    )
    return 0 if r["status"] == "ok" else 2


if __name__ == "__main__":
    raise SystemExit(main())
