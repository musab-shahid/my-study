"""Unit 2.6 ETCCDI-style R10mm + completeness teaching checks (stdlib).

R10mm (pedagogical): count of days with precipitation >= 10.0 mm.
Completeness (project-defined teaching rule):
  expected_n = declared length of the observation period (list slots or declared N)
  observed_n = count of non-missing valid numeric values (>= 0)
  missing_n = expected_n - observed_n
  completeness = observed_n / expected_n
  warn if completeness < 0.80 (pedagogical threshold — not an official ETCCDI rule)

Missing days are NOT treated as zero precipitation.
List-level completeness only — not calendar-aware gap detection.
Not a full ETCCDI software suite; not validated on real station data.
"""
from __future__ import annotations

from typing import Any


def r10mm(daily_pr_mm: list[Any], threshold_mm: float = 10.0) -> int:
    """Count days with pr >= threshold. None entries are missing — skipped, not zero."""
    if not daily_pr_mm:
        raise ValueError("empty series")
    if threshold_mm <= 0:
        raise ValueError("threshold must be positive")
    count = 0
    for v in daily_pr_mm:
        if v is None:
            continue
        if not isinstance(v, (int, float)) or isinstance(v, bool):
            raise ValueError("non-numeric precipitation")
        if v < 0:
            raise ValueError("negative precipitation")
        if v >= threshold_mm:
            count += 1
    return count


def observation_completeness(
    daily_pr_mm: list[Any],
    expected_n: int | None = None,
) -> dict[str, float | int | bool]:
    """List-level completeness for a declared period.

    If expected_n is None, expected_n defaults to len(daily_pr_mm) (slots provided).
    observed_n counts non-None numeric values >= 0.
    Completeness warning uses pedagogical threshold 0.80.
    """
    if expected_n is None:
        expected_n = len(daily_pr_mm)
    if expected_n <= 0:
        raise ValueError("expected_n must be positive")
    if len(daily_pr_mm) > expected_n:
        raise ValueError("series longer than declared expected_n")

    observed = 0
    for v in daily_pr_mm:
        if v is None:
            continue
        if not isinstance(v, (int, float)) or isinstance(v, bool):
            raise ValueError("non-numeric precipitation")
        if v < 0:
            raise ValueError("negative precipitation")
        observed += 1

    # Pad conceptual missing for slots not supplied when expected_n > len(list)
    missing = expected_n - observed
    completeness = observed / expected_n
    return {
        "expected_n": expected_n,
        "observed_n": observed,
        "missing_n": missing,
        "completeness": completeness,
        "completeness_ok": completeness >= 0.80,
        "r10mm": r10mm(daily_pr_mm) if daily_pr_mm else 0,
    }


def main() -> None:
    series = [0.0, 5.0, 10.0, 12.5, 9.9, None, 20.0, 0.0, 10.0, 3.0]
    assert r10mm(series) == 4
    assert r10mm([10.0]) == 1
    assert r10mm([9.999]) == 0
    assert r10mm([None, None, None]) == 0

    try:
        r10mm([-1.0])
        raise AssertionError("negative must fail")
    except ValueError:
        pass
    try:
        r10mm([])
        raise AssertionError("empty must fail")
    except ValueError:
        pass

    # Completeness: 9 valid of 10 slots → 0.9, OK under 0.80 rule
    c = observation_completeness(series, expected_n=10)
    assert c["expected_n"] == 10
    assert c["observed_n"] == 9
    assert c["missing_n"] == 1
    assert abs(float(c["completeness"]) - 0.9) < 1e-12
    assert c["completeness_ok"] is True
    assert c["r10mm"] == 4

    # Same R10mm=4 but poorer coverage: only 5 observed of 10 expected
    sparse = [10.0, 12.0, 15.0, 20.0, None, None, None, None, None, None]
    c2 = observation_completeness(sparse, expected_n=10)
    assert c2["r10mm"] == 4
    assert c2["observed_n"] == 4
    assert c2["missing_n"] == 6
    assert abs(float(c2["completeness"]) - 0.4) < 1e-12
    assert c2["completeness_ok"] is False  # below pedagogical 0.80

    # Zero is observed dry, not missing
    z = observation_completeness([0.0, 0.0, 0.0], expected_n=3)
    assert z["observed_n"] == 3
    assert z["missing_n"] == 0
    assert z["r10mm"] == 0

    # Exactly at threshold 0.80
    # 8 observed of 10
    at = [1.0] * 8 + [None, None]
    c3 = observation_completeness(at, expected_n=10)
    assert abs(float(c3["completeness"]) - 0.8) < 1e-12
    assert c3["completeness_ok"] is True
    # Just below: 7 of 10
    below = [1.0] * 7 + [None, None, None]
    c4 = observation_completeness(below, expected_n=10)
    assert abs(float(c4["completeness"]) - 0.7) < 1e-12
    assert c4["completeness_ok"] is False

    # No valid observations
    empty_obs = observation_completeness([None, None], expected_n=2)
    assert empty_obs["observed_n"] == 0
    assert empty_obs["r10mm"] == 0
    assert empty_obs["completeness_ok"] is False

    print(
        "Unit 2.6 R10mm+completeness checks passed "
        f"(r10mm={c['r10mm']}, completeness={c['completeness']:.2f}, "
        f"sparse_ok={c2['completeness_ok']}, at80_ok={c3['completeness_ok']}, "
        f"below80_ok={c4['completeness_ok']})."
    )


if __name__ == "__main__":
    main()
