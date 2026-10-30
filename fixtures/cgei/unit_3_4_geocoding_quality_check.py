"""Unit 3.4.3 synthetic geocoding quality metrics (stdlib).

Fictional records only — not a live geocoder and not real addresses.

Classification rules (mutually exclusive):
  matched     — single candidate, status=matched, has coordinates
  ambiguous   — status=ambiguous (multiple candidates or low confidence)
  unmatched   — status=unmatched or missing coordinates

Match rate denominator = all input records (n=10).
  match_rate = matched / n
  Ambiguous are NOT counted as matched.

Positional check (synthetic local metres CRS, not lon/lat degrees):
  One "matched" record is deliberately offset 150 m from reference.
  RMSE over verified matched records uses reference (x_ref, y_ref).

Expected (hand-checkable):
  n=10, matched=6, ambiguous=2, unmatched=2
  match_rate = 0.6
  accepted_after_review = matched excluding known bad position = 5
  position_error_bad_record = 150 m
"""
from __future__ import annotations

from math import isclose, sqrt

# status, x, y, x_ref, y_ref  (None where not applicable)
# Units: metres in a synthetic local projected system
RECORDS = [
    # matched and correct
    {"id": "R01", "status": "matched", "x": 100.0, "y": 200.0, "x_ref": 100.0, "y_ref": 200.0},
    {"id": "R02", "status": "matched", "x": 110.0, "y": 210.0, "x_ref": 110.0, "y_ref": 210.0},
    {"id": "R03", "status": "matched", "x": 120.0, "y": 220.0, "x_ref": 120.0, "y_ref": 220.0},
    {"id": "R04", "status": "matched", "x": 130.0, "y": 230.0, "x_ref": 130.0, "y_ref": 230.0},
    {"id": "R05", "status": "matched", "x": 140.0, "y": 240.0, "x_ref": 140.0, "y_ref": 240.0},
    # matched but positionally wrong (150 m east)
    {"id": "R06", "status": "matched", "x": 250.0, "y": 200.0, "x_ref": 100.0, "y_ref": 200.0},
    # ambiguous
    {"id": "R07", "status": "ambiguous", "x": 300.0, "y": 300.0, "x_ref": None, "y_ref": None},
    {"id": "R08", "status": "ambiguous", "x": 310.0, "y": 310.0, "x_ref": None, "y_ref": None},
    # unmatched
    {"id": "R09", "status": "unmatched", "x": None, "y": None, "x_ref": None, "y_ref": None},
    {"id": "R10", "status": "unmatched", "x": None, "y": None, "x_ref": None, "y_ref": None},
]


def classify(records):
    matched, ambiguous, unmatched = [], [], []
    for r in records:
        st = r["status"]
        if st == "matched" and r["x"] is not None and r["y"] is not None:
            matched.append(r)
        elif st == "ambiguous":
            ambiguous.append(r)
        else:
            unmatched.append(r)
    return matched, ambiguous, unmatched


def match_rate(matched, n):
    return len(matched) / n


def positional_errors(matched):
    """Metres; only records with reference coordinates."""
    errs = []
    for r in matched:
        if r["x_ref"] is None or r["y_ref"] is None:
            continue
        dx = r["x"] - r["x_ref"]
        dy = r["y"] - r["y_ref"]
        errs.append(sqrt(dx * dx + dy * dy))
    return errs


def main() -> None:
    n = len(RECORDS)
    assert n == 10

    matched, ambiguous, unmatched = classify(RECORDS)
    assert len(matched) == 6
    assert len(ambiguous) == 2
    assert len(unmatched) == 2
    assert len(matched) + len(ambiguous) + len(unmatched) == n

    rate = match_rate(matched, n)
    assert isclose(rate, 0.6, abs_tol=1e-12)

    # Ambiguous must not inflate match rate
    wrong_rate = (len(matched) + len(ambiguous)) / n
    assert wrong_rate == 0.8
    assert rate != wrong_rate

    errs = positional_errors(matched)
    assert len(errs) == 6
    bad = [e for e in errs if e > 1.0]
    assert len(bad) == 1
    assert isclose(bad[0], 150.0, abs_tol=1e-12)

    # Accepted after manual review: exclude positional outlier
    accepted = [r for r in matched if sqrt((r["x"] - r["x_ref"]) ** 2 + (r["y"] - r["y_ref"]) ** 2) < 1.0]
    assert len(accepted) == 5
    accepted_rate = len(accepted) / n
    assert isclose(accepted_rate, 0.5, abs_tol=1e-12)

    # Duplicate source id detection
    ids = [r["id"] for r in RECORDS]
    assert len(ids) == len(set(ids))

    # Duplicate address scenario (same text, two ids) is separate from id uniqueness
    # — teaching note only in lesson; no silent drop of unmatched
    assert any(r["status"] == "unmatched" for r in RECORDS)

    print(
        "Unit 3.4 geocoding quality checks passed "
        f"(n={n}, matched={len(matched)}, ambiguous={len(ambiguous)}, "
        f"unmatched={len(unmatched)}, match_rate={rate}, "
        f"bad_offset_m={bad[0]}, accepted_rate={accepted_rate})."
    )


if __name__ == "__main__":
    main()
