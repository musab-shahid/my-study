"""Subject 13 MODIS local-process checks (stdlib + optional GDAL).

Default (CI): miniature JSON contract — NOT a NASA HDF granule.

Optional: learner-supplied local MOD11A2/MYD11A2 HDF via GDAL (--hdf / MODIS_HDF_PATH).
Never downloads files or contacts Earthdata.

Usage:
  python unit_13_modis_local_process_check.py
  python unit_13_modis_local_process_check.py --hdf /path/to/MOD11A2*.hdf
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from hashlib import sha256
from math import isclose
from pathlib import Path
from typing import Any, Callable

ROOT = Path(__file__).resolve().parent
MINI = ROOT / "data" / "modis_miniature" / "lst_day_miniature.json"
OUT_DIR = ROOT / "data" / "modis_miniature" / "outputs"

# MOD11A2 v061 documented processing constants (LP DAAC product page).
DOCUMENTED_SCALE = 0.02
DOCUMENTED_FILL = 0
KELVIN_TO_C = 273.15
DOC_URL = "https://lpdaac.usgs.gov/products/mod11a2v061/"
EXPECTED_LAYER_TOKEN = "LST_DAY_1KM"
# Teaching sanity bounds on *scaled Kelvin* (not an official LP DAAC QC bit rule).
TEACHING_K_LO = 250.0
TEACHING_K_HI = 340.0


def load_miniature(path: Path = MINI) -> dict:
    if not path.is_file():
        raise FileNotFoundError(f"missing_miniature_fixture:{path}")
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def validate_meta(meta: dict) -> list[str]:
    errs = []
    if meta.get("product") not in {"MOD11A2", "MYD11A2"}:
        errs.append("unexpected_product")
    if meta.get("layer") != "LST_Day_1km":
        errs.append("unexpected_layer")
    if meta.get("scale_factor") != DOCUMENTED_SCALE:
        errs.append("scale_factor_mismatch")
    if meta.get("fill_value") != DOCUMENTED_FILL:
        errs.append("fill_mismatch")
    if not meta.get("documentation_url"):
        errs.append("missing_documentation_url")
    return errs


def scale_raw_dn(
    raw_dn: list[list[int]],
    scale: float = DOCUMENTED_SCALE,
    fill: int = DOCUMENTED_FILL,
) -> tuple[list[list[float | None]], int, int]:
    """Scale DN to Kelvin; map fill to None. Does not apply teaching range."""
    out: list[list[float | None]] = []
    n_fill = 0
    n_scaled = 0
    for row in raw_dn:
        o: list[float | None] = []
        for dn in row:
            if dn == fill:
                o.append(None)
                n_fill += 1
            else:
                o.append(dn * scale)
                n_scaled += 1
        out.append(o)
    return out, n_scaled, n_fill


def apply_teaching_range(
    grid_k: list[list[float | None]],
    lo: float = TEACHING_K_LO,
    hi: float = TEACHING_K_HI,
) -> tuple[list[list[float | None]], int]:
    """Null out scaled values outside teaching sanity bounds; count rejects."""
    out: list[list[float | None]] = []
    n_reject = 0
    for row in grid_k:
        o: list[float | None] = []
        for v in row:
            if v is None:
                o.append(None)
            elif v < lo or v > hi:
                o.append(None)
                n_reject += 1
            else:
                o.append(v)
        out.append(o)
    return out, n_reject


def kelvin_to_celsius(grid_k: list[list[float | None]]) -> list[list[float | None]]:
    return [[None if v is None else v - KELVIN_TO_C for v in row] for row in grid_k]


def summarise_grid(
    grid_c: list[list[float | None]],
    *,
    n_fill: int,
    n_rejected: int,
    qa_screened: bool = False,
    qa_note: str = "",
) -> dict[str, Any]:
    vals = [v for row in grid_c for v in row if v is not None]
    if not vals:
        raise ValueError("no_valid_pixels_after_fill_and_range_screening")
    return {
        "n_valid": len(vals),
        "n_fill": n_fill,
        "n_rejected_range": n_rejected,
        "mean_c": sum(vals) / len(vals),
        "min_c": min(vals),
        "max_c": max(vals),
        "qa_screened": qa_screened,
        "qa_note": qa_note
        or "Official MODIS QC SDS not applied; teaching range only.",
        "teaching_range_k": [TEACHING_K_LO, TEACHING_K_HI],
    }


def process_dn_grid(
    raw_dn: list[list[int]],
    scale: float = DOCUMENTED_SCALE,
    fill: int = DOCUMENTED_FILL,
) -> dict[str, Any]:
    """Shared pixel pipeline: scale → teaching range → °C → summary."""
    grid_k, n_scaled, n_fill = scale_raw_dn(raw_dn, scale, fill)
    grid_k, n_reject = apply_teaching_range(grid_k)
    grid_c = kelvin_to_celsius(grid_k)
    summary = summarise_grid(grid_c, n_fill=n_fill, n_rejected=n_reject)
    # n_scaled includes later range rejects
    summary["n_scaled_before_range"] = n_scaled
    return {"grid_k": grid_k, "grid_c": grid_c, "summary": summary}


def build_provenance(
    meta: dict,
    source_path: Path,
    summary: dict,
    *,
    path_kind: str,
    software_version: str = "0.3.0",
) -> dict:
    data = source_path.read_bytes()
    return {
        "path_kind": path_kind,
        "source_path": str(source_path.resolve()),
        "source_filename": source_path.name,
        "source_sha256": sha256(data).hexdigest(),
        "product": meta.get("product"),
        "product_source": meta.get("product_source", "filename_heuristic"),
        "version": meta.get("version"),
        "version_source": meta.get("version_source", "documented_fallback"),
        "layer": meta.get("layer"),
        "layer_source": meta.get("layer_source", "selected_subdataset"),
        "scale_factor": meta.get("scale_factor"),
        "scale_source": meta.get("scale_source", "documented_fallback"),
        "fill_value": meta.get("fill_value"),
        "fill_source": meta.get("fill_source", "documented_fallback"),
        "crs": meta.get("crs"),
        "crs_source": meta.get("crs_source", "unknown"),
        "geotransform_preview": meta.get("geotransform_preview"),
        "documentation_url": meta.get("documentation_url") or DOC_URL,
        "software_version": software_version,
        "summary": summary,
        "limitations": [
            "LST is not near-surface air temperature",
            "8-day composite is not a climatology or trend",
            "Official MODIS QC SDS not applied on this path",
            "Teaching Kelvin range is a curriculum sanity check, not LP DAAC QC",
            "Successful processing is not scientific validation of heat risk",
            "Preview statistics are not full-granule statistics unless stated",
            (
                "Miniature teaching array — NOT a NASA HDF granule"
                if path_kind == "miniature_json"
                else "Local HDF: learner-supplied; study-area claim is the learner's responsibility"
            ),
        ],
    }


def process_miniature(path: Path = MINI) -> dict:
    payload = load_miniature(path)
    meta = payload["meta"]
    errs = validate_meta(meta)
    if errs:
        raise ValueError(";".join(errs))
    processed = process_dn_grid(
        payload["raw_dn"], meta["scale_factor"], meta["fill_value"]
    )
    meta = {
        **meta,
        "product_source": "fixture_meta",
        "version_source": "fixture_meta",
        "layer_source": "fixture_meta",
        "scale_source": "fixture_meta",
        "fill_source": "fixture_meta",
        "crs_source": "fixture_meta",
    }
    prov = build_provenance(
        meta, path, processed["summary"], path_kind="miniature_json"
    )
    return {
        "summary": processed["summary"],
        "provenance": prov,
        "grid_c": processed["grid_c"],
    }


def validate_hdf_path(path: Path) -> list[str]:
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
            "filename is a filter only, not product proof"
        )
    if path.suffix.lower() not in {".hdf", ".hdf4", ".h4"}:
        errs.append(f"unexpected_extension:{path.suffix}")
    return errs


def product_from_filename(name: str) -> tuple[str, str]:
    u = name.upper()
    if "MOD11A2" in u:
        return "MOD11A2", "filename_heuristic"
    if "MYD11A2" in u:
        return "MYD11A2", "filename_heuristic"
    return "unknown", "unresolved"


def resolve_scale_fill(
    band_scale: float | None,
    band_nodata: float | None,
    metadata: dict[str, str],
) -> tuple[float, str, int, str]:
    """Prefer band/metadata values; fall back to documented MOD11A2 constants."""
    scale = DOCUMENTED_SCALE
    scale_src = "documented_fallback"
    for key in ("scale_factor", "SCALE_FACTOR", "scale"):
        if key in metadata:
            try:
                cand = float(metadata[key])
                if cand not in (0.0, 1.0):
                    scale, scale_src = cand, f"band_metadata:{key}"
                    break
            except ValueError:
                pass
    if scale_src == "documented_fallback" and band_scale not in (None, 0.0, 1.0):
        scale, scale_src = float(band_scale), "gdal_band_scale"

    fill = DOCUMENTED_FILL
    fill_src = "documented_fallback"
    if band_nodata is not None:
        fill, fill_src = int(band_nodata), "gdal_nodata"
    return scale, scale_src, fill, fill_src


def _find_lst_subdataset(subdatasets: list[tuple[str, str]]) -> str | None:
    for name, desc in subdatasets:
        blob = f"{name} {desc}".upper()
        if EXPECTED_LAYER_TOKEN in blob.replace(" ", ""):
            return name
        if "LST_DAY" in blob and "1KM" in blob:
            return name
    return None


class _FakeBand:
    def __init__(
        self,
        array: list[list[int]],
        *,
        scale: float | None = None,
        nodata: float | None = 0,
        metadata: dict | None = None,
    ):
        self._array = array
        self.XSize = len(array[0]) if array else 0
        self.YSize = len(array)
        self._scale = scale
        self._nodata = nodata
        self._md = metadata or {}

    def GetScale(self):
        return self._scale

    def GetNoDataValue(self):
        return self._nodata

    def GetMetadata(self):
        return self._md

    def ReadAsArray(self, xoff, yoff, xsize, ysize):
        return [row[xoff : xoff + xsize] for row in self._array[yoff : yoff + ysize]]


class _FakeDataset:
    def __init__(
        self,
        subdatasets: list[tuple[str, str]] | None,
        band: _FakeBand | None,
        *,
        geotransform=None,
        projection: str = "",
    ):
        self._subs = subdatasets
        self._band = band
        self._gt = geotransform or (0, 1, 0, 0, 0, -1)
        self._proj = projection

    def GetSubDatasets(self):
        return self._subs

    def GetRasterBand(self, i):
        return self._band if i == 1 else None

    def GetGeoTransform(self):
        return self._gt

    def GetProjection(self):
        return self._proj


def process_local_hdf(
    path: Path,
    max_preview_rows: int = 32,
    *,
    gdal_open: Callable[[str], Any] | None = None,
) -> dict:
    """Process local MOD11A2/MYD11A2 HDF. Inject gdal_open for tests."""
    pre = validate_hdf_path(path)
    if pre:
        raise ValueError(";".join(pre))

    if gdal_open is None:
        try:
            from osgeo import gdal  # type: ignore

            gdal.UseExceptions()
            gdal_open = gdal.Open
        except ImportError as exc:
            raise RuntimeError(
                "gdal_python_not_available: install GDAL Python bindings to process "
                "real MODIS HDF locally. Default/CI path uses miniature JSON only."
            ) from exc

    ds = gdal_open(str(path))
    if ds is None:
        raise ValueError(f"gdal_open_failed:{path}")

    subs = ds.GetSubDatasets() or []
    if not subs:
        band = ds.GetRasterBand(1)
        if band is None:
            raise ValueError("no_subdatasets_and_no_band1")
        sds_name = str(path)
        sds = ds
        layer_source = "band1_no_subdatasets"
    else:
        sds_name = _find_lst_subdataset([(s[0], s[1]) for s in subs])
        if not sds_name:
            available = [s[1] for s in subs[:12]]
            raise ValueError(
                "missing_required_layer_LST_Day_1km:"
                f"available_preview={available}"
            )
        sds = gdal_open(sds_name)
        if sds is None:
            raise ValueError(f"gdal_open_subdataset_failed:{sds_name}")
        band = sds.GetRasterBand(1)
        if band is None:
            raise ValueError("lst_band_missing")
        layer_source = "subdataset_name_match"

    scale, scale_src, fill, fill_src = resolve_scale_fill(
        band.GetScale(),
        band.GetNoDataValue(),
        band.GetMetadata() or {},
    )

    xsize = band.XSize
    ysize = band.YSize
    if xsize < 1 or ysize < 1:
        raise ValueError("invalid_raster_dimensions")

    win_x = min(max_preview_rows, xsize)
    win_y = min(max_preview_rows, ysize)
    arr = band.ReadAsArray(0, 0, win_x, win_y)
    if arr is None:
        raise ValueError("read_array_failed")

    raw_dn = [[int(v) for v in row] for row in arr]
    processed = process_dn_grid(raw_dn, scale=float(scale), fill=int(fill))
    summary = processed["summary"]
    summary["preview_width"] = win_x
    summary["preview_height"] = win_y
    summary["full_width"] = xsize
    summary["full_height"] = ysize
    summary["stats_scope"] = "preview_window_only"

    gt = sds.GetGeoTransform()
    proj = sds.GetProjection() or ""
    product, product_src = product_from_filename(path.name)
    meta = {
        "product": product,
        "product_source": product_src,
        "version": None,
        "version_source": "not_read_from_file",
        "layer": "LST_Day_1km",
        "layer_source": layer_source,
        "scale_factor": float(scale),
        "scale_source": scale_src,
        "fill_value": int(fill),
        "fill_source": fill_src,
        "crs": (proj[:120] if proj else None),
        "crs_source": "gdal_projection" if proj else "unavailable",
        "geotransform_preview": list(gt) if gt else None,
        "documentation_url": DOC_URL,
        "subdataset": sds_name if subs else "band1",
    }
    prov = build_provenance(meta, path, summary, path_kind="local_hdf")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out_json = OUT_DIR / f"local_hdf_preview_{path.stem}.json"
    payload = {
        "summary": summary,
        "provenance": prov,
        "grid_c_preview": processed["grid_c"],
        "note": "Preview window only; not a full georeferenced product export.",
    }
    out_json.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    prov["output_json"] = str(out_json)
    prov["georeferenced_raster_exported"] = False

    return {
        "summary": summary,
        "provenance": prov,
        "grid_c": processed["grid_c"],
        "output_json": out_json,
    }


def run_contract_tests() -> None:
    # --- miniature path ---
    try:
        load_miniature(ROOT / "data" / "modis_miniature" / "does_not_exist.json")
        raise AssertionError("expected missing file")
    except FileNotFoundError:
        pass

    bad = load_miniature()
    assert "scale_factor_mismatch" in validate_meta({**bad["meta"], "scale_factor": 1.0})
    assert "unexpected_layer" in validate_meta({**bad["meta"], "layer": "LST_Night_1km"})

    out = process_miniature()
    assert isclose(out["grid_c"][0][1], 15500 * 0.02 - KELVIN_TO_C, abs_tol=1e-9)
    assert out["grid_c"][0][0] is None
    assert out["summary"]["n_fill"] == 3
    assert out["summary"]["n_valid"] == 6
    assert out["summary"]["n_rejected_range"] == 0
    assert out["summary"]["qa_screened"] is False
    assert out["provenance"]["path_kind"] == "miniature_json"
    assert out["provenance"]["scale_source"] == "fixture_meta"

    # Teaching range rejects extreme scaled values; keep one valid DN
    extreme = process_dn_grid([[0, 100, 20000, 15500]], scale=0.02, fill=0)
    # fill + 2K reject + 400K reject + one valid (~310K)
    assert extreme["summary"]["n_fill"] == 1
    assert extreme["summary"]["n_rejected_range"] == 2
    assert extreme["summary"]["n_valid"] == 1
    try:
        process_dn_grid([[0, 0], [0, 0]], fill=0)
        raise AssertionError("expected no_valid_pixels")
    except ValueError as e:
        assert "no_valid_pixels" in str(e)

    # --- path filters ---
    missing = ROOT / "data" / "modis_miniature" / "no_such_granule.hdf"
    assert "missing_file" in ";".join(validate_hdf_path(missing))

    decoy = ROOT / "data" / "modis_miniature" / "random_other.hdf"
    decoy.write_bytes(b"NOT_A_REAL_HDF" * 20)
    try:
        assert any("filename_must_contain_MOD11A2" in e for e in validate_hdf_path(decoy))
    finally:
        decoy.unlink(missing_ok=True)

    wrong_ext = ROOT / "data" / "modis_miniature" / "MOD11A2.A2020001.h00v00.061.txt"
    wrong_ext.write_text("not hdf", encoding="utf-8")
    try:
        assert any("unexpected_extension" in e for e in validate_hdf_path(wrong_ext))
    finally:
        wrong_ext.unlink(missing_ok=True)

    # --- mocked GDAL: missing LST layer ---
    fake_path = ROOT / "data" / "modis_miniature" / "MOD11A2.A2020001.h00v00.061.fake.hdf"
    fake_path.write_bytes(b"FAKE_HDF_CONTENT_FOR_TESTS" * 8)

    def open_no_lst(name: str):
        if name == str(fake_path):
            return _FakeDataset(
                [("HDF4_EOS:OTHER", "Emis_31"), ("HDF4_EOS:OTHER", "View_angle")],
                None,
            )
        return None

    try:
        process_local_hdf(fake_path, gdal_open=open_no_lst)
        raise AssertionError("expected missing layer")
    except ValueError as e:
        assert "missing_required_layer_LST_Day_1km" in str(e)

    # --- mocked GDAL: happy path with fill + out-of-range ---
    # DN: fill 0, valid 15500 (~310K), extreme 500 (10K → reject)
    arr = [[0, 15500, 500], [15400, 0, 15600]]
    band = _FakeBand(arr, scale=1.0, nodata=0, metadata={"scale_factor": "0.02"})

    def open_ok(name: str):
        if name == str(fake_path):
            return _FakeDataset(
                [
                    (
                        f"HDF4_EOS:EOS_GRID:{fake_path}:MODIS_Grid_8Day_1km_LST:LST_Day_1km",
                        "LST_Day_1km",
                    )
                ],
                None,
                projection="EPSG:4326",
                geotransform=(60.0, 0.01, 0, 30.0, 0, -0.01),
            )
        if "LST_Day_1km" in name:
            return _FakeDataset(None, band, projection="EPSG:4326")
        return None

    result = process_local_hdf(fake_path, gdal_open=open_ok)
    assert result["summary"]["n_fill"] == 2
    assert result["summary"]["n_rejected_range"] == 1
    assert result["summary"]["n_valid"] == 3
    assert result["summary"]["stats_scope"] == "preview_window_only"
    assert result["provenance"]["scale_source"] == "band_metadata:scale_factor"
    assert result["provenance"]["fill_source"] == "gdal_nodata"
    assert result["provenance"]["product"] == "MOD11A2"
    assert result["provenance"]["version_source"] == "not_read_from_file"
    assert result["provenance"]["georeferenced_raster_exported"] is False
    assert result["output_json"].is_file()

    # --- mocked: all fill → fail ---
    band_fill = _FakeBand([[0, 0], [0, 0]], nodata=0, metadata={"scale_factor": "0.02"})

    def open_all_fill(name: str):
        if name == str(fake_path):
            return _FakeDataset(
                [(f"SDS:{fake_path}:LST_Day_1km", "LST_Day_1km")], None
            )
        if "LST_Day" in name:
            return _FakeDataset(None, band_fill)
        return None

    try:
        process_local_hdf(fake_path, gdal_open=open_all_fill)
        raise AssertionError("expected no valid pixels")
    except ValueError as e:
        assert "no_valid_pixels" in str(e)

    # cleanup generated fake and optional output
    fake_path.unlink(missing_ok=True)

    print(
        "Unit 13 MODIS local-process checks passed "
        f"(n_valid={out['summary']['n_valid']}, mean_c={out['summary']['mean_c']:.2f}, "
        f"qa_screened={out['summary']['qa_screened']})."
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="MOD11A2 miniature tests or local HDF processing"
    )
    parser.add_argument(
        "--hdf",
        type=str,
        default=os.environ.get("MODIS_HDF_PATH", ""),
        help="Path to local MOD11A2/MYD11A2 HDF (requires GDAL). Empty = miniature CI tests.",
    )
    args = parser.parse_args(argv)

    if args.hdf:
        path = Path(args.hdf).expanduser()
        try:
            result = process_local_hdf(path)
        except Exception as exc:  # noqa: BLE001
            print(f"Local HDF processing failed: {exc}", file=sys.stderr)
            return 1
        print(
            "Local MODIS HDF preview processed "
            f"(file={path.name}, n_valid={result['summary']['n_valid']}, "
            f"n_fill={result['summary']['n_fill']}, "
            f"n_rejected_range={result['summary']['n_rejected_range']}, "
            f"mean_c={result['summary']['mean_c']:.2f}, "
            f"scope={result['summary']['stats_scope']}, "
            f"output={result.get('output_json')}). "
            "Not Multan validation; LST ≠ air temperature; QC SDS not applied; preview only."
        )
        return 0

    run_contract_tests()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
