"""Subject 11 environmental pipeline teaching checks (stdlib).

Minimal pipeline: validate → transform → analyse → emit provenance.

Synthetic station temperature records only. Checks:
1) Required fields and unit contract
2) Explicit rejection of invalid ranges / missing critical fields
3) Deterministic summary from fixed input
4) Provenance record includes source, config, software version, row counts
5) Idempotent re-run yields identical summary
"""
from __future__ import annotations

from math import isclose
from hashlib import sha256
import json


REQUIRED_FIELDS = ("station_id", "timestamp_utc", "temp_c")


def validate_records(rows: list[dict]) -> list[dict]:
    """Return cleaned rows; raise ValueError on contract failures."""
    if not rows:
        raise ValueError("empty_input")
    cleaned: list[dict] = []
    for i, row in enumerate(rows):
        for key in REQUIRED_FIELDS:
            if key not in row or row[key] is None or row[key] == "":
                raise ValueError(f"missing_field:{key}:row:{i}")
        temp = float(row["temp_c"])
        if temp < -90 or temp > 60:
            raise ValueError(f"temp_out_of_range:row:{i}:{temp}")
        unit = row.get("temp_unit", "C")
        if unit != "C":
            raise ValueError(f"unsupported_unit:{unit}:row:{i}")
        cleaned.append(
            {
                "station_id": str(row["station_id"]),
                "timestamp_utc": str(row["timestamp_utc"]),
                "temp_c": temp,
            }
        )
    return cleaned


def summarise(rows: list[dict]) -> dict:
    temps = [r["temp_c"] for r in rows]
    return {
        "n": len(temps),
        "mean_temp_c": sum(temps) / len(temps),
        "min_temp_c": min(temps),
        "max_temp_c": max(temps),
        "stations": sorted({r["station_id"] for r in rows}),
    }


def build_provenance(source: str, config: dict, software_version: str, n_in: int, n_out: int) -> dict:
    return {
        "source": source,
        "config": dict(config),
        "software_version": software_version,
        "n_input": n_in,
        "n_output": n_out,
    }


def run_pipeline(rows: list[dict], source: str, config: dict, software_version: str = "0.1.0") -> dict:
    n_in = len(rows)
    cleaned = validate_records(rows)
    summary = summarise(cleaned)
    prov = build_provenance(source, config, software_version, n_in, len(cleaned))
    payload = {"summary": summary, "provenance": prov}
    # deterministic fingerprint for regression checks
    payload["fingerprint"] = sha256(
        json.dumps(payload, sort_keys=True, separators=(",", ":")).encode("utf-8")
    ).hexdigest()
    return payload


def main() -> None:
    good = [
        {"station_id": "S1", "timestamp_utc": "2024-06-01T12:00:00Z", "temp_c": 34.0, "temp_unit": "C"},
        {"station_id": "S1", "timestamp_utc": "2024-06-01T15:00:00Z", "temp_c": 36.0, "temp_unit": "C"},
        {"station_id": "S2", "timestamp_utc": "2024-06-01T12:00:00Z", "temp_c": 32.0, "temp_unit": "C"},
    ]
    out1 = run_pipeline(good, source="synthetic_stations.csv", config={"threshold_c": 35.0})
    out2 = run_pipeline(good, source="synthetic_stations.csv", config={"threshold_c": 35.0})
    assert out1["fingerprint"] == out2["fingerprint"]
    assert out1["summary"]["n"] == 3
    assert isclose(out1["summary"]["mean_temp_c"], 34.0, abs_tol=1e-12)
    assert out1["summary"]["stations"] == ["S1", "S2"]
    assert out1["provenance"]["source"] == "synthetic_stations.csv"
    assert out1["provenance"]["n_input"] == 3
    assert out1["provenance"]["software_version"] == "0.1.0"

    try:
        validate_records([])
        raise AssertionError("expected empty_input")
    except ValueError as exc:
        assert "empty_input" in str(exc)

    try:
        validate_records([{"station_id": "S1", "timestamp_utc": "t", "temp_c": 120}])
        raise AssertionError("expected range failure")
    except ValueError as exc:
        assert "temp_out_of_range" in str(exc)

    try:
        validate_records([{"station_id": "S1", "timestamp_utc": "t", "temp_c": 30, "temp_unit": "F"}])
        raise AssertionError("expected unit failure")
    except ValueError as exc:
        assert "unsupported_unit" in str(exc)

    try:
        validate_records([{"station_id": "S1", "temp_c": 30}])
        raise AssertionError("expected missing timestamp")
    except ValueError as exc:
        assert "missing_field:timestamp_utc" in str(exc)

    print(
        "Unit 11 env-pipeline checks passed "
        f"(mean={out1['summary']['mean_temp_c']}, fp={out1['fingerprint'][:12]}…)."
    )


if __name__ == "__main__":
    main()
