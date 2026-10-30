"""Unit 4.6 processing platform / pipeline teaching checks (stdlib).

Offline parameterised pipeline — not a live Earth Engine or STAC session.

Stages:
1) Validate input manifest (required fields)
2) Compute synthetic zonal mean (stand-in for reducer)
3) Write output manifest with config hash and status
4) Deterministic rerun produces identical metric
5) Reject malformed manifest
"""
from __future__ import annotations

import hashlib
import json
from math import isclose


REQUIRED = ("collection_id", "date_start", "date_end", "scale_m", "values")


def validate_manifest(m: dict) -> list[str]:
    errors = []
    for k in REQUIRED:
        if k not in m:
            errors.append(f"missing:{k}")
    if "scale_m" in m and not (isinstance(m["scale_m"], (int, float)) and m["scale_m"] > 0):
        errors.append("invalid:scale_m")
    if "values" in m and (not isinstance(m["values"], list) or len(m["values"]) == 0):
        errors.append("invalid:values")
    return errors


def zonal_mean(values: list[float]) -> float:
    return sum(values) / len(values)


def config_hash(m: dict) -> str:
    payload = {k: m[k] for k in sorted(m) if k != "values"}
    payload["n_values"] = len(m.get("values", []))
    blob = json.dumps(payload, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(blob.encode()).hexdigest()[:16]


def run_pipeline(m: dict) -> dict:
    errs = validate_manifest(m)
    if errs:
        return {"status": "failed", "errors": errs}
    metric = zonal_mean(m["values"])
    return {
        "status": "ok",
        "metric_name": "zonal_mean_synthetic",
        "metric_value": metric,
        "collection_id": m["collection_id"],
        "scale_m": m["scale_m"],
        "config_hash": config_hash(m),
        "n_pixels": len(m["values"]),
    }


def main() -> None:
    good = {
        "collection_id": "LANDSAT/LC08/C02/T1_L2",
        "date_start": "2024-06-01",
        "date_end": "2024-08-31",
        "scale_m": 30,
        "values": [310.0, 311.0, 312.0, 311.5],
    }
    out1 = run_pipeline(good)
    assert out1["status"] == "ok"
    assert isclose(out1["metric_value"], 311.125, abs_tol=1e-9)
    out2 = run_pipeline(good)
    assert out2["metric_value"] == out1["metric_value"]
    assert out2["config_hash"] == out1["config_hash"]

    bad = {"collection_id": "X"}  # missing fields
    out_bad = run_pipeline(bad)
    assert out_bad["status"] == "failed"
    assert any(e.startswith("missing:") for e in out_bad["errors"])

    # Independent reconciliation target (same mean computed outside pipeline)
    independent = sum(good["values"]) / len(good["values"])
    assert isclose(out1["metric_value"], independent, abs_tol=1e-12)

    print(
        "Unit 4.6 pipeline/platform checks passed "
        f"(zonal_mean={out1['metric_value']:.3f}, hash={out1['config_hash']}, "
        f"rerun_ok, manifest_reject_ok)."
    )


if __name__ == "__main__":
    main()
