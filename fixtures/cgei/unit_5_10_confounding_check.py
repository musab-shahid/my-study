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
    if not ys:
        raise ValueError("empty stratum")
    return sum(ys) / len(ys)


def stratum_ate(rows: list[tuple[int, int, float]], c_val: int) -> float:
    y1 = mean_y(rows, lambda t, c, y: t == 1 and c == c_val)
    y0 = mean_y(rows, lambda t, c, y: t == 0 and c == c_val)
    return y1 - y0


def crude_ate(rows: list[tuple[int, int, float]]) -> float:
    y1 = mean_y(rows, lambda t, c, y: t == 1)
    y0 = mean_y(rows, lambda t, c, y: t == 0)
    return y1 - y0


def main() -> None:
    rows = [
        (1, 0, 5.0),
        (1, 0, 5.0),
        (0, 0, 3.0),
        (0, 0, 3.0),
        (0, 0, 3.0),
        (0, 0, 3.0),
        (1, 1, 10.0),
        (1, 1, 10.0),
        (1, 1, 10.0),
        (1, 1, 10.0),
        (0, 1, 8.0),
        (0, 1, 8.0),
    ]
    ate0 = stratum_ate(rows, 0)
    ate1 = stratum_ate(rows, 1)
    assert isclose(ate0, 2.0, rel_tol=0, abs_tol=1e-12)
    assert isclose(ate1, 2.0, rel_tol=0, abs_tol=1e-12)
    crude = crude_ate(rows)
    assert crude > 2.0
    stratified = 0.5 * ate0 + 0.5 * ate1
    assert isclose(stratified, 2.0, rel_tol=0, abs_tol=1e-12)
    assert abs(crude - stratified) > 0.5

    print(
        "Unit 5.10 confounding checks passed "
        f"(ate0={ate0}, ate1={ate1}, crude={crude:.3f}, stratified={stratified})."
    )


if __name__ == "__main__":
    main()
