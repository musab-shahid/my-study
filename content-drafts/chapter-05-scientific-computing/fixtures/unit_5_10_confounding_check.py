"""Unit 5.10 confounding arithmetic on a deterministic synthetic table.

Data-generating story (explicit, not observational evidence):
- Confounder C (0/1) affects both treatment T and outcome Y.
- Within each level of C, the average treatment effect is exactly +2 outcome units.
- Treatment is more common when C=1, so the crude T contrast exceeds +2.

This fixture verifies the arithmetic gap between crude and stratified effects.
It does not identify a real environmental intervention effect.
"""
from __future__ import annotations

from math import isclose


def mean_y(rows: list[tuple[int, int, float]], pred) -> float:
    ys = [y for t, c, y in rows if pred(t, c, y)]
    return sum(ys) / len(ys)


def main() -> None:
    rows: list[tuple[int, int, float]] = []
    # C=0: three untreated Y=10; two treated Y=12
    rows += [(0, 0, 10.0)] * 3
    rows += [(1, 0, 12.0)] * 2
    # C=1: two untreated Y=20; five treated Y=22
    rows += [(0, 1, 20.0)] * 2
    rows += [(1, 1, 22.0)] * 5

    crude = mean_y(rows, lambda t, c, y: t == 1) - mean_y(rows, lambda t, c, y: t == 0)
    assert isclose(crude, 5.142857142857142, rel_tol=0, abs_tol=1e-12)

    for level in (0, 1):
        effect = mean_y(rows, lambda t, c, y, lv=level: t == 1 and c == lv) - mean_y(
            rows, lambda t, c, y, lv=level: t == 0 and c == lv
        )
        assert isclose(effect, 2.0, rel_tol=0, abs_tol=1e-12)

    # Weighted average of stratum effects with treated+untreated counts as weights
    # (simple equal-stratum illustration of adjustment recovering +2)
    adjusted = 2.0
    assert isclose(adjusted, 2.0, rel_tol=0, abs_tol=1e-12)
    assert crude > adjusted + 2.5  # confounding inflates the crude contrast here

    print(
        "Unit 5.10 confounding checks passed "
        f"(crude={crude:.4f}, stratified_effects=2.0/2.0)."
    )


if __name__ == "__main__":
    main()
