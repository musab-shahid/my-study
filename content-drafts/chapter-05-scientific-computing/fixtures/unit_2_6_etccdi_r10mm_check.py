"""Unit 2.6 ETCCDI-style R10mm teaching checks (stdlib).

R10mm (pedagogical): count of days with precipitation >= 10.0 mm
on a complete daily series for one calendar year (or stated period).

Missing days are NOT treated as zero precipitation.
Not a full ETCCDI software suite; not validated on real station data.
"""
from __future__ import annotations


def r10mm(daily_pr_mm: list[float | None], threshold_mm: float = 10.0) -> int:
    """Count days with pr >= threshold. None entries are missing — skipped, not zero.

    Raises ValueError if series is empty or threshold is non-positive.
    """
    if not daily_pr_mm:
        raise ValueError("empty series")
    if threshold_mm <= 0:
        raise ValueError("threshold must be positive")
    count = 0
    for v in daily_pr_mm:
        if v is None:
            continue
        if not isinstance(v, (int, float)):
            raise ValueError("non-numeric precipitation")
        if v < 0:
            raise ValueError("negative precipitation")
        if v >= threshold_mm:
            count += 1
    return count


def main() -> None:
    # 10-day synthetic period (not a full year — units are "days", not "days/year")
    series = [0.0, 5.0, 10.0, 12.5, 9.9, None, 20.0, 0.0, 10.0, 3.0]
    # qualifying: 10.0, 12.5, 20.0, 10.0 → 4; None skipped; 9.9 does not qualify
    assert r10mm(series) == 4

    # Boundary: exactly 10 counts
    assert r10mm([10.0]) == 1
    assert r10mm([9.999]) == 0

    # Missing must not become zero (would incorrectly not affect count either way,
    # but a zero would incorrectly *not* count — here we ensure missing is skipped
    # and that a series of all missing yields 0 without treating as dry days for rate)
    assert r10mm([None, None, None]) == 0

    # Counterexample path: negative invalid
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

    # Inclusive threshold distinction vs strict >
    assert r10mm([10.0], threshold_mm=10.0) == 1

    print(
        "Unit 2.6 R10mm checks passed "
        f"(r10mm_10day={r10mm(series)}, boundary_10={r10mm([10.0])}, "
        f"boundary_9_999={r10mm([9.999])})."
    )


if __name__ == "__main__":
    main()
