"""Unit 2.6 pedagogical CDD (consecutive dry days) checks (stdlib).

Dry day (pedagogical): precipitation < 1.0 mm (strictly below).
Non-dry: valid observation with pr >= 1.0 mm.
Missing: None — breaks confirmed runs; never treated as 0 mm.

CDD_confirmed = length of the longest run of consecutive *observed* dry days.
A missing day ends the current confirmed run and makes the true period
maximum potentially larger than CDD_confirmed (incomplete certainty).

Not full ETCCDI/ClimPACT; synthetic list-level only.
"""
from __future__ import annotations

from typing import Any


DRY_MM = 1.0


def classify_day(v: Any) -> str:
    """Return 'dry', 'wet', or 'missing'."""
    if v is None:
        return "missing"
    if not isinstance(v, (int, float)) or isinstance(v, bool):
        raise ValueError("non-numeric precipitation")
    if v < 0:
        raise ValueError("negative precipitation")
    if v < DRY_MM:
        return "dry"
    return "wet"


def cdd_confirmed(daily_pr_mm: list[Any]) -> dict[str, int | bool]:
    """Longest confirmed observed dry spell; missing breaks runs.

    Returns:
      cdd_confirmed: max consecutive observed dry days
      incomplete: True if any missing value present (true period max may be larger)
    """
    if not daily_pr_mm:
        raise ValueError("empty series")
    best = 0
    run = 0
    incomplete = False
    for v in daily_pr_mm:
        kind = classify_day(v)
        if kind == "dry":
            run += 1
            if run > best:
                best = run
        elif kind == "wet":
            run = 0
        else:  # missing
            incomplete = True
            run = 0
    return {"cdd_confirmed": best, "incomplete": incomplete}


def main() -> None:
    # Complete series: dry,dry,wet,dry,dry,dry → longest 3
    complete = [0.0, 0.5, 2.0, 0.0, 0.2, 0.0]
    r = cdd_confirmed(complete)
    assert r["cdd_confirmed"] == 3
    assert r["incomplete"] is False

    # Missing between dry days must NOT join spells (would if filled with 0)
    # dry,dry,missing,dry,dry → confirmed runs of 2 and 2 → max 2, incomplete
    gap = [0.0, 0.0, None, 0.0, 0.0]
    r2 = cdd_confirmed(gap)
    assert r2["cdd_confirmed"] == 2
    assert r2["incomplete"] is True
    # Counterexample: treating missing as 0 would yield 5 — forbidden
    filled = [0.0, 0.0, 0.0, 0.0, 0.0]
    assert cdd_confirmed(filled)["cdd_confirmed"] == 5

    # Boundary start and end
    # dry,dry,wet → 2; wet,dry,dry → 2
    assert cdd_confirmed([0.0, 0.0, 5.0])["cdd_confirmed"] == 2
    assert cdd_confirmed([5.0, 0.0, 0.0])["cdd_confirmed"] == 2

    # Exactly 1.0 mm is wet (not dry) under strict < 1.0
    assert classify_day(1.0) == "wet"
    assert classify_day(0.999) == "dry"

    try:
        cdd_confirmed([])
        raise AssertionError("empty must fail")
    except ValueError:
        pass
    try:
        cdd_confirmed([-0.1])
        raise AssertionError("negative must fail")
    except ValueError:
        pass

    print(
        "Unit 2.6 CDD checks passed "
        f"(complete={r['cdd_confirmed']}, gap={r2['cdd_confirmed']}, "
        f"gap_incomplete={r2['incomplete']})."
    )


if __name__ == "__main__":
    main()
