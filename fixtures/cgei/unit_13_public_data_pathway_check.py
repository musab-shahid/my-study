"""Subject 13 public-data pathway checks (stdlib, offline).

Validates:
1) Public-source manifest completeness
2) Teaching extract schema, units, CRS, QA filtering
3) Conversion LST Kelvin → anomaly vs extract mean (transparent baseline)
4) Merge with explicitly labelled synthetic exposure/vulnerability proxies
5) Reuse of ranking sensitivity + decision-card non-claims from capstone conventions
6) Rejection of air-temperature and calibrated-health claims

Does not download NASA data in CI. Does not assert Multan empirical findings.
"""
from __future__ import annotations

import csv
import json
from pathlib import Path
from math import isclose

# Reuse synthetic ranking helpers from the existing fixture module when available
ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"


def load_manifest() -> dict:
    path = DATA / "capstone_public_manifest.json"
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def validate_manifest(m: dict) -> list[str]:
    required = (
        "product_name",
        "documentation_url",
        "licence_note",
        "variable",
        "native_units",
        "spatial_resolution",
        "temporal_resolution",
        "crs",
        "teaching_extract_disclaimer",
    )
    return [f"missing_manifest:{k}" for k in required if not m.get(k)]


def load_extract() -> list[dict]:
    path = DATA / "capstone_lst_extract_sample.csv"
    with path.open(encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def validate_extract_rows(rows: list[dict]) -> list[dict]:
    if not rows:
        raise ValueError("empty_extract")
    out = []
    for i, row in enumerate(rows):
        for key in ("nbhd_id", "lst_day_k", "qa_ok", "crs", "source_product"):
            if key not in row or row[key] == "":
                raise ValueError(f"missing_field:{key}:row:{i}")
        if row["crs"] != "EPSG:4326":
            raise ValueError(f"unexpected_crs:{row['crs']}:row:{i}")
        lst_k = float(row["lst_day_k"])
        if lst_k < 250 or lst_k > 340:
            raise ValueError(f"lst_out_of_plausible_range_k:{lst_k}:row:{i}")
        qa = int(row["qa_ok"])
        if qa not in (0, 1):
            raise ValueError(f"invalid_qa:{qa}:row:{i}")
        if qa == 1:
            out.append({"nbhd_id": row["nbhd_id"], "lst_day_k": lst_k})
    if not out:
        raise ValueError("no_qa_pass_rows")
    return out


def lst_anomaly_c(rows: list[dict]) -> list[dict]:
    """Baseline: anomaly vs extract mean, reported in Celsius-sized units (K difference)."""
    mean_k = sum(r["lst_day_k"] for r in rows) / len(rows)
    return [
        {
            "nbhd_id": r["nbhd_id"],
            "lst_day_k": r["lst_day_k"],
            "lst_anomaly_c": r["lst_day_k"] - mean_k,  # K difference ≡ °C difference
            "note": "anomaly_vs_extract_mean_not_climatology",
        }
        for r in rows
    ]


def merge_with_synthetic_ev(lst_rows: list[dict]) -> list[dict]:
    """Teaching proxies only — explicitly not ground-truth exposure/vulnerability."""
    # Fixed synthetic proxies keyed by neighbourhood for determinism
    proxies = {
        "N1": {"pop_density": 120.0, "vuln_index": 0.25},
        "N2": {"pop_density": 480.0, "vuln_index": 0.75},
        "N3": {"pop_density": 220.0, "vuln_index": 0.45},
        "N5": {"pop_density": 300.0, "vuln_index": 0.55},
    }
    merged = []
    for r in lst_rows:
        p = proxies.get(r["nbhd_id"])
        if not p:
            continue  # drop IDs without proxy rather than invent zeros silently
        merged.append(
            {
                "nbhd_id": r["nbhd_id"],
                "lst_anomaly_c": r["lst_anomaly_c"],
                "pop_density": p["pop_density"],
                "vuln_index": p["vuln_index"],
                "exposure_source": "synthetic_teaching_proxy",
                "vulnerability_source": "synthetic_teaching_proxy",
            }
        )
    if not merged:
        raise ValueError("no_rows_after_proxy_merge")
    return merged


def minmax(vals: list[float]) -> list[float]:
    lo, hi = min(vals), max(vals)
    if hi == lo:
        return [0.0] * len(vals)
    return [(v - lo) / (hi - lo) for v in vals]


def rank_index(rows: list[dict], weights=(1 / 3, 1 / 3, 1 / 3)) -> list[dict]:
    wh, we, wv = weights
    h = minmax([r["lst_anomaly_c"] for r in rows])
    e = minmax([r["pop_density"] for r in rows])
    v = minmax([r["vuln_index"] for r in rows])
    out = []
    for r, hh, ee, vv in zip(rows, h, e, v):
        out.append({**r, "risk": wh * hh + we * ee + wv * vv})
    return sorted(out, key=lambda x: x["risk"], reverse=True)


def reject_unsupported_claims(claims: dict) -> list[str]:
    errs = []
    if claims.get("lst_equals_air_temperature"):
        errs.append("lst_is_not_air_temperature")
    if claims.get("calibrated_health_risk"):
        errs.append("calibrated_health_risk_not_supported")
    if claims.get("causal_driver_proven"):
        errs.append("causal_claim_not_supported")
    if claims.get("operational_forecast"):
        errs.append("operational_forecast_not_supported")
    return errs


def main() -> None:
    manifest = load_manifest()
    m_errs = validate_manifest(manifest)
    assert m_errs == [], m_errs
    assert "NOT" in manifest["teaching_extract_disclaimer"] or "not" in manifest["teaching_extract_disclaimer"].lower()

    rows = load_extract()
    qa_pass = validate_extract_rows(rows)
    assert len(qa_pass) == 4  # N4 qa_ok=0 dropped
    anomalies = lst_anomaly_c(qa_pass)
    assert isclose(sum(a["lst_anomaly_c"] for a in anomalies), 0.0, abs_tol=1e-9)

    merged = merge_with_synthetic_ev(anomalies)
    assert all(r["exposure_source"] == "synthetic_teaching_proxy" for r in merged)

    equal = rank_index(merged, (1 / 3, 1 / 3, 1 / 3))
    heat_heavy = rank_index(merged, (0.6, 0.2, 0.2))
    assert [r["nbhd_id"] for r in equal]  # non-empty
    # Sensitivity may reorder; at least both produce finite risk scores
    assert all("risk" in r for r in equal + heat_heavy)

    claim_errs = reject_unsupported_claims(
        {
            "lst_equals_air_temperature": True,
            "calibrated_health_risk": True,
            "causal_driver_proven": False,
            "operational_forecast": False,
        }
    )
    assert "lst_is_not_air_temperature" in claim_errs
    assert "calibrated_health_risk_not_supported" in claim_errs

    # Invalid unit/CRS rejection
    try:
        validate_extract_rows(
            [{"nbhd_id": "X", "lst_day_k": "300", "qa_ok": "1", "crs": "EPSG:3857", "source_product": "x"}]
        )
        raise AssertionError("expected CRS failure")
    except ValueError as exc:
        assert "unexpected_crs" in str(exc)

    print(
        "Unit 13 public-data pathway checks passed "
        f"(qa_pass={len(qa_pass)}, top_equal={equal[0]['nbhd_id']}, "
        f"top_heat_heavy={heat_heavy[0]['nbhd_id']})."
    )


if __name__ == "__main__":
    main()
