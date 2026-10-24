"""Subject 13 MODIS local-process checks (stdlib + optional GDAL).

Default (CI): exercises MOD11A2-documented scale_factor (0.02), fill_value (0),
Kelvin→Celsius conversion, range checks, and provenance export against a
miniature JSON fixture — NOT a real NASA HDF granule.

Optional Path C (learner, outside CI): process a learner-supplied local
MOD11A2 HDF via GDAL when installed. Never contacts Earthdata and never
downloads files.

Usage:
  python unit_13_modis_local_process_check.py
  python unit_13_modis_local_process_check.py --hdf /path/to/MOD11A2*.hdf
  MODIS_HDF_PATH=/path/to/file.hdf python unit_13_modis_local_process_check.py
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from hashlib import sha256
from math import isclose
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent
MINI = ROOT / "data" / "modis_miniature" / "lst_day_miniature.json"
OUT_DIR = ROOT / "data" / "modis_miniature" / "outputs"

DOCUMENTED_SCALE = 0.02
DOCUMENTED_FILL = 0
KELVIN_TO_C = 273.15
DOC_URL = "https://lpdaac.usgs.gov/products/mod11a2v061/"
EXPECTED_PRODUCT = "MOD11A2"
EXPECTED_LAYER = "LST_Day_1km"


def load_miniature(path: Path = MINI) -> dict:
    if not path.is_file():
        raise FileNotFoundError(f"missing_miniature_fixture:{path}")
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def validate_meta(meta: dict) -> list[str]:
    errs = []
    if meta.get("product") != EXPECTED_PRODUCT:
        errs.append("unexpected_product")
    if meta.get("layer") != EXPECTED_LAYER:
        errs.append("unexpected_layer")
    if meta.get("scale_factor") != DOCUMENTED_SCALE:
        errs.append("scale_factor_mismatch")
    if meta.get("fill_value") != DOCUMENTED_FILL:
        errs.append("fill_mismatch")
    if not meta.get("documentation_url"):
        errs.append("missing_documentation_url")
    return errs


def scale_lst_day(
    raw_dn: list[list[int]],
    scale: float = DOCUMENTED_SCALE,
    fill: int = DOCUMENTED_FILL,
):
    out = []
    n_fill = 0
    n_valid = 0
    for row in raw_dn:
        o = []
        for dn in row:
            if dn == fill:
                o.append(None)
                n_fill += 1
            else:
                o.append(dn * scale)
                n_valid += 1
        out.append(o)
    return out, n_valid, n_fill


def kelvin_to_celsius(grid_k: list[list]) -> list[list]:
    return [[None if v is None else v - KELVIN_TO_C for v in row] for row in grid_k]


def valid_range_check_k(grid_k: list[list], lo: float = 250.0, hi: float = 340.0) -> list[str]:
    errs = []
    for i, row in enumerate(grid_k):
        for j, v in enumerate(row):
            if v is None:
                continue
            if v < lo or v > hi:
                errs.append(f"out_of_range_k:{i},{j}:{v}")
    return errs


def summarise(grid_c: list[list], qa_screened: bool = False, qa_note: str = "") -> dict:
    vals = [v for row in grid_c for v in row if v is not None]
    if not vals:
        raise ValueError("no_valid_pixels")
    return {
        "n_valid": len(vals),
        "mean_c": sum(vals) / len(vals),
        "min_c": min(vals),
        "max_c": max(vals),
        "qa_screened": qa_screened,
        "qa_note": qa_note
        or "QA bits not applied on this path; label outputs as not quality-screened.",
    }


def build_provenance(
    meta: dict,
    source_path: Path,
    summary: dict,
    software_version: str = "0.2.0",
    path_kind: str = "miniature_json",
) -> dict:
    data = source_path.read_bytes()
    return {
        "path_kind": path_kind,
        "source_path": str(source_path.resolve()),
        "source_filename": source_path.name,
        "source_sha256": sha256(data).hexdigest(),
        "product": meta.get("product"),
        "version": meta.get("version"),
        "layer": meta.get("layer"),
        "scale_factor": meta.get("scale_factor"),
        "fill_value": meta.get("fill_value"),
        "crs": meta.get("crs"),
        "documentation_url": meta.get("documentation_url") or DOC_URL,
        "software_version": software_version,
        "summary": summary,
        "limitations": [
            "LST is not near-surface air temperature",
            "8-day composite is not a climatology or trend",
            "QA bits not applied unless explicitly stated",
            "Successful processing is not scientific validation of heat risk",
            "Nominal 1 km does not validate neighbourhood risk rankings",
            (
                "Miniature teaching array — NOT a NASA HDF granule"
                if path_kind == "miniature_json"
                else "Local HDF path: learner-supplied file; not verified Multan study-area unless documented by the learner"
            ),
        ],
    }


def process_miniature(path: Path = MINI) -> dict:
    payload = load_miniature(path)
    meta = payload["meta"]
    errs = validate_meta(meta)
    if errs:
        raise ValueError(";".join(errs))
    grid_k, n_valid, n_fill = scale_lst_day(
        payload["raw_dn"], meta["scale_factor"], meta["fill_value"]
    )
    range_errs = valid_range_check_k(grid_k)
    if range_errs:
        raise ValueError(";".join(range_errs))
    grid_c = kelvin_to_celsius(grid_k)
    summary = summarise(
        grid_c,
        qa_screened=False,
        qa_note="Miniature path does not apply MODIS QC bits; label outputs as not quality-screened.",
    )
    summary["n_fill"] = n_fill
    assert summary["n_valid"] == n_valid
    prov = build_provenance(meta, path, summary, path_kind="miniature_json")
    return {"summary": summary, "provenance": prov, "grid_c": grid_c}


def validate_hdf_path(path: Path) -> list[str]:
    """Structural checks before attempting GDAL open."""
    errs: list[str] = []
    if not path.exists():
        errs.append(f"missing_file:{path}")
        return errs
    if not path.is_file():
        errs.append(f"not_a_file:{path}")
        return errs
    if path.stat().st_size < 100:
        errs.append("file_too_small_for_modis_hdf")
    name = path.name.upper()
    if "MOD11A2" not in name and "MYD11A2" not in name:
        errs.append(
            "filename_must_contain_MOD11A2_or_MYD11A2:"
            "refusing to treat arbitrary HDF as MODIS LST"
        )
    if path.suffix.lower() not in {".hdf", ".hdf4", ".h4"}:
        errs.append(f"unexpected_extension:{path.suffix}")
    return errs


def _find_lst_subdataset(subdatasets: list[tuple[str, str]]) -> str | None:
    for name, desc in subdatasets:
        blob = f"{name} {desc}".upper()
        if "LST_DAY_1KM" in blob or "LST_DAY" in blob:
            return name
    return None


def process_local_hdf(path: Path, max_preview_rows: int = 32) -> dict:
    """Process a learner-supplied local MOD11A2/MYD11A2 HDF via GDAL.

    Requires GDAL Python bindings (`osgeo.gdal`). Does not download data.
    Reads a small preview window for summary statistics to stay memory-light.
    """
    pre = validate_hdf_path(path)
    if pre:
        raise ValueError(";".join(pre))

    try:
        from osgeo import gdal  # type: ignore
    except ImportError as exc:
        raise RuntimeError(
            "gdal_python_not_available: install GDAL Python bindings to process "
            "real MODIS HDF locally (e.g. conda install -c conda-forge gdal). "
            "CI and the default command use the miniature JSON path only."
        ) from exc

    gdal.UseExceptions()
    ds = gdal.Open(str(path))
    if ds is None:
        raise ValueError(f"gdal_open_failed:{path}")

    subs = ds.GetSubDatasets() or []
    if not subs:
        # Some builds expose the first SDS directly
        band = ds.GetRasterBand(1)
        if band is None:
            raise ValueError("no_subdatasets_and_no_band1")
        sds_name = str(path)
        sds = ds
    else:
        sds_name = _find_lst_subdataset([(s[0], s[1]) for s in subs])
        if not sds_name:
            available = [s[1] for s in subs[:12]]
            raise ValueError(
                "missing_required_layer_LST_Day_1km:"
                f"available_preview={available}"
            )
        sds = gdal.Open(sds_name)
        if sds is None:
            raise ValueError(f"gdal_open_subdataset_failed:{sds_name}")
        band = sds.GetRasterBand(1)
        if band is None:
            raise ValueError("lst_band_missing")

    # Prefer metadata; fall back to documented MOD11A2 defaults
    scale = band.GetScale() if band.GetScale() not in (None, 0, 1.0) else DOCUMENTED_SCALE
    # GDAL may report scale 1.0 when unset — use documented 0.02 for MOD11A2 DN
    meta_scale = None
    md = band.GetMetadata() or {}
    for key in ("scale_factor", "SCALE_FACTOR", "scale"):
        if key in md:
            try:
                meta_scale = float(md[key])
            except ValueError:
                pass
    if meta_scale is not None and meta_scale not in (0.0, 1.0):
        scale = meta_scale
    elif scale in (None, 0.0, 1.0):
        scale = DOCUMENTED_SCALE

    fill = band.GetNoDataValue()
    if fill is None:
        fill = float(DOCUMENTED_FILL)
    else:
        fill = float(fill)

    xsize = band.XSize
    ysize = band.YSize
    win_x = min(max_preview_rows, xsize)
    win_y = min(max_preview_rows, ysize)
    arr = band.ReadAsArray(0, 0, win_x, win_y)
    if arr is None:
        raise ValueError("read_array_failed")

    raw_dn = [[int(v) for v in row] for row in arr]
    grid_k, n_valid, n_fill = scale_lst_day(raw_dn, scale=float(scale), fill=int(fill))
    range_errs = valid_range_check_k(grid_k)
    # Soft: collect but do not fail entire granule on sparse outliers in preview
    grid_c = kelvin_to_celsius(grid_k)
    summary = summarise(
        grid_c,
        qa_screened=False,
        qa_note=(
            f"Preview window {win_x}x{win_y} of {xsize}x{ysize}; "
            "QC SDS not applied; not full-granule statistics."
        ),
    )
    summary["n_fill"] = n_fill
    summary["preview_width"] = win_x
    summary["preview_height"] = win_y
    summary["full_width"] = xsize
    summary["full_height"] = ysize
    summary["out_of_range_preview"] = len(range_errs)

    gt = sds.GetGeoTransform()
    proj = sds.GetProjection() or ""
    meta = {
        "product": "MOD11A2" if "MOD11A2" in path.name.upper() else "MYD11A2",
        "version": "061",
        "layer": EXPECTED_LAYER,
        "scale_factor": float(scale),
        "fill_value": int(fill),
        "crs": proj[:120] if proj else "unknown",
        "geotransform_preview": list(gt) if gt else None,
        "documentation_url": DOC_URL,
        "subdataset": sds_name if subs else "band1",
    }
    prov = build_provenance(meta, path, summary, path_kind="local_hdf")
    if range_errs[:5]:
        prov["range_warnings_preview"] = range_errs[:5]

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_json = OUT_DIR / f"local_hdf_preview_{path.stem}.json"
    payload = {
        "summary": summary,
        "provenance": prov,
        "grid_c_preview": grid_c,
    }
    out_json.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    prov["output_json"] = str(out_json)

    return {"summary": summary, "provenance": prov, "grid_c": grid_c, "output_json": out_json}


def run_contract_tests() -> None:
    """Deterministic tests (no GDAL, no network)."""
    try:
        load_miniature(ROOT / "data" / "modis_miniature" / "does_not_exist.json")
        raise AssertionError("expected missing file")
    except FileNotFoundError:
        pass

    bad = load_miniature()
    assert "scale_factor_mismatch" in validate_meta({**bad["meta"], "scale_factor": 1.0})
    assert "unexpected_layer" in validate_meta({**bad["meta"], "layer": "LST_Night_1km"})

    out = process_miniature()
    assert out["grid_c"][0][1] is not None
    assert isclose(out["grid_c"][0][1], 15500 * 0.02 - KELVIN_TO_C, abs_tol=1e-9)
    assert out["grid_c"][0][0] is None
    assert out["summary"]["n_fill"] == 3
    assert out["summary"]["n_valid"] == 6
    assert out["summary"]["qa_screened"] is False
    assert out["provenance"]["source_sha256"]
    assert "LST is not near-surface air temperature" in out["provenance"]["limitations"]
    assert out["provenance"]["path_kind"] == "miniature_json"

    # Missing real path
    missing = ROOT / "data" / "modis_miniature" / "no_such_granule.hdf"
    assert "missing_file" in ";".join(validate_hdf_path(missing))

    # Wrong product name
    decoy = ROOT / "data" / "modis_miniature" / "random_other.hdf"
    decoy.write_bytes(b"NOT_A_REAL_HDF" * 20)
    try:
        errs = validate_hdf_path(decoy)
        assert any("filename_must_contain_MOD11A2" in e for e in errs)
    finally:
        if decoy.exists():
            decoy.unlink()

    # Malformed extension with MOD11A2 in name
    wrong_ext = ROOT / "data" / "modis_miniature" / "MOD11A2.A2020001.h00v00.061.txt"
    wrong_ext.write_text("not hdf", encoding="utf-8")
    try:
        errs = validate_hdf_path(wrong_ext)
        assert any("unexpected_extension" in e for e in errs)
    finally:
        if wrong_ext.exists():
            wrong_ext.unlink()

    print(
        "Unit 13 MODIS local-process checks passed "
        f"(n_valid={out['summary']['n_valid']}, mean_c={out['summary']['mean_c']:.2f}, "
        f"qa_screened={out['summary']['qa_screened']})."
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="MOD11A2 miniature tests or local HDF processing")
    parser.add_argument(
        "--hdf",
        type=str,
        default=os.environ.get("MODIS_HDF_PATH", ""),
        help="Path to a local MOD11A2/MYD11A2 HDF (requires GDAL). Empty = run miniature CI tests.",
    )
    args = parser.parse_args(argv)

    if args.hdf:
        path = Path(args.hdf).expanduser()
        try:
            result = process_local_hdf(path)
        except Exception as exc:  # noqa: BLE001 — learner-facing error channel
            print(f"Local HDF processing failed: {exc}", file=sys.stderr)
            return 1
        print(
            "Local MODIS HDF preview processed "
            f"(file={path.name}, n_valid={result['summary']['n_valid']}, "
            f"mean_c={result['summary']['mean_c']:.2f}, "
            f"output={result.get('output_json')}). "
            "Not Multan validation; LST ≠ air temperature; QA not applied."
        )
        return 0

    run_contract_tests()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
