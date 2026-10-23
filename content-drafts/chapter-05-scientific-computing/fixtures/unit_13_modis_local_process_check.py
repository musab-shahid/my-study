"""Subject 13 MODIS local-process checks (stdlib).

Exercises MOD11A2-documented scale_factor (0.02), fill_value (0),
Kelvin→Celsius conversion, range checks, and provenance export against a
miniature JSON fixture — NOT a real NASA HDF granule.

Path C (learner, outside CI): process a real downloaded granule locally
using the lab instructions. This module never contacts Earthdata.
"""
from __future__ import annotations

import json
from hashlib import sha256
from math import isclose
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MINI = ROOT / "data" / "modis_miniature" / "lst_day_miniature.json"

DOCUMENTED_SCALE = 0.02
DOCUMENTED_FILL = 0
KELVIN_TO_C = 273.15


def load_miniature(path: Path = MINI) -> dict:
    if not path.is_file():
        raise FileNotFoundError(f"missing_miniature_fixture:{path}")
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def validate_meta(meta: dict) -> list[str]:
    errs = []
    if meta.get("product") != "MOD11A2":
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


def scale_lst_day(raw_dn: list[list[int]], scale: float = DOCUMENTED_SCALE, fill: int = DOCUMENTED_FILL):
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


def summarise(grid_c: list[list]) -> dict:
    vals = [v for row in grid_c for v in row if v is not None]
    if not vals:
        raise ValueError("no_valid_pixels")
    return {
        "n_valid": len(vals),
        "mean_c": sum(vals) / len(vals),
        "min_c": min(vals),
        "max_c": max(vals),
        "qa_screened": False,
        "qa_note": "Miniature path does not apply MODIS QC bits; label outputs as not quality-screened.",
    }


def build_provenance(meta: dict, source_path: Path, summary: dict, software_version: str = "0.1.0") -> dict:
    data = source_path.read_bytes()
    return {
        "source_path": str(source_path.name),
        "source_sha256": sha256(data).hexdigest(),
        "product": meta.get("product"),
        "version": meta.get("version"),
        "layer": meta.get("layer"),
        "scale_factor": meta.get("scale_factor"),
        "fill_value": meta.get("fill_value"),
        "crs": meta.get("crs"),
        "documentation_url": meta.get("documentation_url"),
        "software_version": software_version,
        "summary": summary,
        "limitations": [
            "Not a real NASA HDF granule when using the miniature fixture",
            "LST is not near-surface air temperature",
            "8-day composite is not a climatology or trend",
            "QA bits not applied on miniature path",
            "Nominal 1 km does not validate neighbourhood risk rankings",
        ],
    }


def process_miniature(path: Path = MINI) -> dict:
    payload = load_miniature(path)
    meta = payload["meta"]
    errs = validate_meta(meta)
    if errs:
        raise ValueError(";".join(errs))
    grid_k, n_valid, n_fill = scale_lst_day(payload["raw_dn"], meta["scale_factor"], meta["fill_value"])
    range_errs = valid_range_check_k(grid_k)
    if range_errs:
        raise ValueError(";".join(range_errs))
    grid_c = kelvin_to_celsius(grid_k)
    summary = summarise(grid_c)
    summary["n_fill"] = n_fill
    assert summary["n_valid"] == n_valid
    prov = build_provenance(meta, path, summary)
    return {"summary": summary, "provenance": prov, "grid_c": grid_c}


def main() -> None:
    try:
        load_miniature(ROOT / "data" / "modis_miniature" / "does_not_exist.json")
        raise AssertionError("expected missing file")
    except FileNotFoundError:
        pass

    bad = load_miniature()
    assert "scale_factor_mismatch" in validate_meta({**bad["meta"], "scale_factor": 1.0})

    out = process_miniature()
    assert out["grid_c"][0][1] is not None
    assert isclose(out["grid_c"][0][1], 15500 * 0.02 - KELVIN_TO_C, abs_tol=1e-9)
    assert out["grid_c"][0][0] is None
    assert out["summary"]["n_fill"] == 3
    assert out["summary"]["n_valid"] == 6
    assert out["summary"]["qa_screened"] is False
    assert out["provenance"]["source_sha256"]
    assert "LST is not near-surface air temperature" in out["provenance"]["limitations"]

    print(
        "Unit 13 MODIS local-process checks passed "
        f"(n_valid={out['summary']['n_valid']}, mean_c={out['summary']['mean_c']:.2f}, "
        f"qa_screened={out['summary']['qa_screened']})."
    )


if __name__ == "__main__":
    main()
