"""Unit 6.2 feature preparation checks (stdlib, offline).

Synthetic parcel table only — not Multan observations.
Validates schema, range QC, train-only scaling, leakage column rejection,
and simple feature contracts (NDVI-like, anomaly).
"""
from __future__ import annotations

import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data" / "unit_6_2_feature_table.csv"

FEATURE_COLS = ("lst_c", "ndvi", "rain_mm", "dist_water_km", "built_frac")
TARGET = "heat_exceed"
META = ("parcel_id", "year")
# Columns that must never be treated as predictors in this teaching contract
FORBIDDEN_AS_FEATURES = ("heat_exceed", "parcel_id")


def load_rows(path: Path = DATA) -> list[dict]:
    if not path.is_file():
        raise FileNotFoundError(f"missing_fixture:{path}")
    with path.open(encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))
    if not rows:
        raise ValueError("empty_table")
    return rows


def validate_schema(rows: list[dict]) -> list[str]:
    errs: list[str] = []
    required = set(FEATURE_COLS) | {TARGET} | set(META)
    keys = set(rows[0].keys())
    missing = required - keys
    if missing:
        errs.append(f"missing_columns:{sorted(missing)}")
    return errs


def validate_ranges(rows: list[dict]) -> list[str]:
    errs: list[str] = []
    seen_keys: set[str] = set()
    for i, r in enumerate(rows):
        key = f"{r['parcel_id']}:{r['year']}"
        if key in seen_keys:
            errs.append(f"duplicate_key:{key}")
        seen_keys.add(key)
        ndvi = float(r["ndvi"])
        if not (-0.2 <= ndvi <= 1.0):
            errs.append(f"ndvi_out_of_range:{i}:{ndvi}")
        lst = float(r["lst_c"])
        if not (-40.0 <= lst <= 70.0):
            errs.append(f"lst_out_of_range:{i}:{lst}")
        bf = float(r["built_frac"])
        if not (0.0 <= bf <= 1.0):
            errs.append(f"built_frac_out_of_range:{i}:{bf}")
        y = int(r[TARGET])
        if y not in (0, 1):
            errs.append(f"target_not_binary:{i}:{y}")
    return errs


def chronological_split(rows: list[dict], holdout_year: int = 2021):
    train = [r for r in rows if int(r["year"]) < holdout_year]
    test = [r for r in rows if int(r["year"]) >= holdout_year]
    if not train or not test:
        raise ValueError("degenerate_year_split")
    return train, test


def fit_mean_std(train: list[dict], col: str) -> tuple[float, float]:
    vals = [float(r[col]) for r in train]
    mu = sum(vals) / len(vals)
    var = sum((v - mu) ** 2 for v in vals) / len(vals)
    sd = var ** 0.5
    if sd == 0:
        sd = 1.0
    return mu, sd


def transform(rows: list[dict], col: str, mu: float, sd: float) -> list[float]:
    return [(float(r[col]) - mu) / sd for r in rows]


def reject_leakage_feature_set(feature_names: list[str]) -> list[str]:
    return [f for f in feature_names if f in FORBIDDEN_AS_FEATURES]


def rain_anomaly(train: list[dict], rows: list[dict]) -> list[float]:
    """Anomaly vs training-period mean rainfall only."""
    mu, _ = fit_mean_std(train, "rain_mm")
    return [float(r["rain_mm"]) - mu for r in rows]


def main() -> None:
    rows = load_rows()
    schema_errs = validate_schema(rows)
    assert schema_errs == [], schema_errs
    range_errs = validate_ranges(rows)
    assert range_errs == [], range_errs

    train, test = chronological_split(rows, 2021)
    assert all(int(r["year"]) == 2020 for r in train)
    assert all(int(r["year"]) == 2021 for r in test)

    # Train-only scaling for lst_c
    mu, sd = fit_mean_std(train, "lst_c")
    train_z = transform(train, "lst_c", mu, sd)
    test_z = transform(test, "lst_c", mu, sd)
    # Mean of train z-scores ~ 0
    assert abs(sum(train_z) / len(train_z)) < 1e-9

    # If we wrongly fit on all rows, train mean z would still be ~0 but
    # holdout distribution shifts — we only assert train-only fit is used.
    mu_all, sd_all = fit_mean_std(rows, "lst_c")
    assert (mu, sd) != (mu_all, sd_all) or len(test) == 0

    # Leakage rejection
    bad = reject_leakage_feature_set(["lst_c", "ndvi", "heat_exceed", "parcel_id"])
    assert "heat_exceed" in bad and "parcel_id" in bad

    # Simple engineered feature: rain anomaly using train mean
    anom_test = rain_anomaly(train, test)
    assert len(anom_test) == len(test)

    # NDVI mean higher for non-exceedance in this synthetic table
    ndvi_0 = [float(r["ndvi"]) for r in rows if int(r[TARGET]) == 0]
    ndvi_1 = [float(r["ndvi"]) for r in rows if int(r[TARGET]) == 1]
    assert sum(ndvi_0) / len(ndvi_0) > sum(ndvi_1) / len(ndvi_1)

    print(
        "Unit 6.2 feature-prep checks passed "
        f"(n={len(rows)}, train={len(train)}, test={len(test)}, "
        f"lst_train_mu={mu:.2f})."
    )


if __name__ == "__main__":
    main()
