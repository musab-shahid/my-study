"""Unit 3.4.4 synthetic field-data QC (stdlib).

Fictional observation records — not a mobile app test.

Schema contract:
  observation_id     required, non-empty, unique
  observed_at        required, YYYY-MM-DD
  observation_type   required, in VOCAB
  x_m, y_m           required numbers (synthetic local metres CRS)
  crs                required, must equal DECLARED_CRS
  gnss_accuracy_m    required, number >= 0
  notes              optional

Severity:
  error   — record fails contract (cannot enter analysis without fix)
  warning — usable with caveats (e.g. high accuracy value)

Expected findings (hand-checkable):
  n=8 records
  1 fully valid
  errors: missing required field, duplicate id, invalid vocab,
          out-of-range coord, missing gnss_accuracy, negative accuracy
  warnings: accuracy > 30 m
"""
from __future__ import annotations

from collections import Counter

VOCAB = {"heat_stress", "flood_mark", "station_visit"}
DECLARED_CRS = "EPSG:32642"
# Plausible study-area bounds in synthetic local metres
X_MIN, X_MAX = 0.0, 10000.0
Y_MIN, Y_MAX = 0.0, 10000.0

RECORDS = [
    {
        "observation_id": "OBS-001",
        "observed_at": "2026-06-01",
        "observation_type": "heat_stress",
        "x_m": 500.0,
        "y_m": 600.0,
        "crs": "EPSG:32642",
        "gnss_accuracy_m": 5.0,
        "notes": "valid",
    },
    {
        "observation_id": "OBS-002",
        "observed_at": "2026-06-02",
        "observation_type": "flood_mark",
        "x_m": 700.0,
        "y_m": 800.0,
        "crs": "EPSG:32642",
        "gnss_accuracy_m": 4.0,
        "notes": "valid",
    },
    {
        # missing observation_type
        "observation_id": "OBS-003",
        "observed_at": "2026-06-03",
        "observation_type": None,
        "x_m": 100.0,
        "y_m": 100.0,
        "crs": "EPSG:32642",
        "gnss_accuracy_m": 3.0,
        "notes": "missing type",
    },
    {
        # duplicate id
        "observation_id": "OBS-001",
        "observed_at": "2026-06-04",
        "observation_type": "station_visit",
        "x_m": 200.0,
        "y_m": 200.0,
        "crs": "EPSG:32642",
        "gnss_accuracy_m": 6.0,
        "notes": "duplicate id",
    },
    {
        # invalid vocab
        "observation_id": "OBS-005",
        "observed_at": "2026-06-05",
        "observation_type": "weather_stuff",
        "x_m": 300.0,
        "y_m": 300.0,
        "crs": "EPSG:32642",
        "gnss_accuracy_m": 5.0,
        "notes": "bad vocab",
    },
    {
        # out of bounds coordinate
        "observation_id": "OBS-006",
        "observed_at": "2026-06-06",
        "observation_type": "heat_stress",
        "x_m": 50000.0,
        "y_m": 100.0,
        "crs": "EPSG:32642",
        "gnss_accuracy_m": 5.0,
        "notes": "coord OOB",
    },
    {
        # missing gnss accuracy
        "observation_id": "OBS-007",
        "observed_at": "2026-06-07",
        "observation_type": "flood_mark",
        "x_m": 400.0,
        "y_m": 400.0,
        "crs": "EPSG:32642",
        "gnss_accuracy_m": None,
        "notes": "missing accuracy",
    },
    {
        # negative accuracy + high-accuracy warning path on another field
        "observation_id": "OBS-008",
        "observed_at": "2026-06-08",
        "observation_type": "station_visit",
        "x_m": 450.0,
        "y_m": 450.0,
        "crs": "EPSG:32642",
        "gnss_accuracy_m": -2.0,
        "notes": "negative accuracy",
    },
]


def validate(records):
    errors = []
    warnings = []
    id_counts = Counter(r["observation_id"] for r in records)

    for r in records:
        oid = r["observation_id"]
        if not oid:
            errors.append((oid, "empty observation_id"))
        if id_counts[oid] > 1:
            errors.append((oid, "duplicate observation_id"))

        if not r.get("observed_at"):
            errors.append((oid, "missing observed_at"))
        else:
            parts = str(r["observed_at"]).split("-")
            if len(parts) != 3 or not all(p.isdigit() for p in parts):
                errors.append((oid, "malformed observed_at"))

        ot = r.get("observation_type")
        if ot is None or ot == "":
            errors.append((oid, "missing observation_type"))
        elif ot not in VOCAB:
            errors.append((oid, f"invalid observation_type '{ot}'"))

        for coord in ("x_m", "y_m"):
            if r.get(coord) is None:
                errors.append((oid, f"missing {coord}"))
        if r.get("x_m") is not None and not (X_MIN <= r["x_m"] <= X_MAX):
            errors.append((oid, "x_m out of study-area bounds"))
        if r.get("y_m") is not None and not (Y_MIN <= r["y_m"] <= Y_MAX):
            errors.append((oid, "y_m out of study-area bounds"))

        if r.get("crs") != DECLARED_CRS:
            errors.append((oid, "crs mismatch or missing"))

        acc = r.get("gnss_accuracy_m")
        if acc is None:
            errors.append((oid, "missing gnss_accuracy_m"))
        elif not isinstance(acc, (int, float)):
            errors.append((oid, "non-numeric gnss_accuracy_m"))
        elif acc < 0:
            errors.append((oid, "negative gnss_accuracy_m"))
        elif acc > 30:
            warnings.append((oid, "gnss_accuracy_m > 30 m"))

    return errors, warnings


def main() -> None:
    n = len(RECORDS)
    assert n == 8

    errors, warnings = validate(RECORDS)
    codes = [e[1] for e in errors]

    assert any("duplicate observation_id" in c for c in codes)
    assert any("missing observation_type" in c for c in codes)
    assert any("invalid observation_type" in c for c in codes)
    assert any("x_m out of study-area bounds" in c for c in codes)
    assert any("missing gnss_accuracy_m" in c for c in codes)
    assert any("negative gnss_accuracy_m" in c for c in codes)

    # Valid records: OBS-001 (first) and OBS-002 only — but OBS-001 also flagged as duplicate
    # After accounting for duplicate flag on both OBS-001 rows, only OBS-002 has no errors
    error_ids = {e[0] for e in errors}
    clean = [r["observation_id"] for r in RECORDS if r["observation_id"] not in error_ids]
    assert clean == ["OBS-002"]

    # Dataset-level: at least 6 distinct error kinds
    assert len(set(codes)) >= 6

    # Empty dataset edge: no false pass
    e0, w0 = validate([])
    assert e0 == [] and w0 == []

    print(
        "Unit 3.4 field-data QC checks passed "
        f"(n={n}, error_findings={len(errors)}, warning_findings={len(warnings)}, "
        f"clean_ids={clean})."
    )


if __name__ == "__main__":
    main()
