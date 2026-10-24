"""Unit 6.5 interpretation and robustness checks (stdlib, synthetic).

Illustrative only: tiny holdout must not be treated as real calibration
evidence or spatial generalization proof.
"""
from __future__ import annotations

import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data" / "unit_6_2_feature_table.csv"
TARGET = "heat_exceed"


def load():
    with DATA.open(encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def split_year(rows, holdout=2021):
    return [r for r in rows if int(r["year"]) < holdout], [r for r in rows if int(r["year"]) >= holdout]


def stump_predict(r, thr=36.5, feature="lst_c"):
    return 1 if float(r[feature]) >= thr else 0


def confusion(y_true, y_pred):
    tp = sum(1 for a, b in zip(y_true, y_pred) if a == 1 and b == 1)
    tn = sum(1 for a, b in zip(y_true, y_pred) if a == 0 and b == 0)
    fp = sum(1 for a, b in zip(y_true, y_pred) if a == 0 and b == 1)
    fn = sum(1 for a, b in zip(y_true, y_pred) if a == 1 and b == 0)
    return tp, fp, fn, tn


def reliability_bins(probs, y_true, n_bins=2):
    """Simple equal-width reliability table (illustrative on tiny n)."""
    bins = []
    for i in range(n_bins):
        lo, hi = i / n_bins, (i + 1) / n_bins
        idx = [j for j, p in enumerate(probs) if (p >= lo and (p < hi or (i == n_bins - 1 and p <= hi)))]
        if not idx:
            bins.append({"lo": lo, "hi": hi, "n": 0, "mean_p": None, "frac_pos": None})
            continue
        mean_p = sum(probs[j] for j in idx) / len(idx)
        frac = sum(y_true[j] for j in idx) / len(idx)
        bins.append({"lo": lo, "hi": hi, "n": len(idx), "mean_p": mean_p, "frac_pos": frac})
    return bins


def main() -> None:
    rows = load()
    train, test = split_year(rows)
    assert all(int(r["year"]) == 2020 for r in train)
    assert all(int(r["year"]) == 2021 for r in test)

    # Pre-specified illustrative teaching threshold (NOT fit on test labels).
    # For a data-driven alternative see unit_6_3 stump (train-selected).
    thr = 36.5  # pre_specified_illustrative
    y_true = [int(r[TARGET]) for r in test]
    y_pred = [stump_predict(r, thr) for r in test]
    tp, fp, fn, tn = confusion(y_true, y_pred)
    assert tp + fp + fn + tn == len(test)

    # Failure cases
    fps = [r["parcel_id"] for r, yt, yp in zip(test, y_true, y_pred) if yt == 0 and yp == 1]
    fns = [r["parcel_id"] for r, yt, yp in zip(test, y_true, y_pred) if yt == 1 and yp == 0]

    # Sensitivity: shift threshold
    y_pred_hi = [stump_predict(r, thr + 1.0) for r in test]
    _, fp_hi, fn_hi, _ = confusion(y_true, y_pred_hi)
    # Higher threshold should not increase FP for this monotone score
    assert fp_hi <= fp

    # Illustrative "probability" = scaled distance above threshold (not a calibrated model)
    probs = []
    for r in test:
        lst = float(r["lst_c"])
        # squash to (0,1) for demo only
        p = max(0.05, min(0.95, 0.5 + 0.1 * (lst - thr)))
        probs.append(p)
    bins = reliability_bins(probs, y_true, n_bins=2)
    assert len(bins) == 2

    # Subgroup: high vs low built_frac (descriptive only)
    high_built = [r for r in test if float(r["built_frac"]) >= 0.5]
    low_built = [r for r in test if float(r["built_frac"]) < 0.5]
    assert len(high_built) + len(low_built) == len(test)

    # Reporting contract keys
    report = {
        "target": TARGET,
        "provenance": "synthetic_unit_6_2_feature_table",
        "split": "year_2020_train_2021_test",
        "threshold_source": "pre_specified_illustrative_36.5",
        "limitations": [
            "n_test_tiny",
            "not_multan",
            "not_causal",
            "probabilities_illustrative_not_calibrated",
        ],
    }
    assert "not_causal" in report["limitations"]
    assert report["provenance"].startswith("synthetic")
    assert "pre_specified" in "pre_specified_illustrative_36.5"

    print(
        "Unit 6.5 interpretation checks passed "
        f"(tp={tp},fp={fp},fn={fn},tn={tn}, "
        f"fps={fps},fns={fns}, "
        f"sensitivity_fp_hi={fp_hi})."
    )


if __name__ == "__main__":
    main()
