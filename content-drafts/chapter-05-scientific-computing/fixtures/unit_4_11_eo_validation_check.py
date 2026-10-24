"""Unit 4.11 EO–field validation (stdlib, synthetic sites only).

Leave-one-site-out RMSE for a mean baseline vs single-index slope model.
Rejects protocols that fit on all sites then evaluate the same sites without
holdout (information leakage pattern for teaching).
"""
from __future__ import annotations

from math import isclose, sqrt


# site_id, index, lab_value (synthetic)
SITES = [
    ("A", 0.10, 2.0),
    ("B", 0.20, 3.0),
    ("C", 0.30, 4.5),
    ("D", 0.40, 5.0),
    ("E", 0.50, 6.5),
]


def rmse(errors: list[float]) -> float:
    if not errors:
        raise ValueError("empty_errors")
    return sqrt(sum(e * e for e in errors) / len(errors))


def leave_one_out_mean_baseline(sites: list[tuple[str, float, float]]) -> float:
    errs = []
    for i in range(len(sites)):
        train = [sites[j][2] for j in range(len(sites)) if j != i]
        pred = sum(train) / len(train)
        errs.append(sites[i][2] - pred)
    return rmse(errs)


def leave_one_out_index_slope(sites: list[tuple[str, float, float]]) -> float:
    """Fit intercept+slope of lab ~ index on train sites; predict held-out site."""
    errs = []
    for i in range(len(sites)):
        train = [sites[j] for j in range(len(sites)) if j != i]
        xs = [t[1] for t in train]
        ys = [t[2] for t in train]
        n = len(xs)
        mx = sum(xs) / n
        my = sum(ys) / n
        varx = sum((x - mx) ** 2 for x in xs)
        if varx == 0:
            raise ValueError("degenerate_x")
        cov = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
        slope = cov / varx
        intercept = my - slope * mx
        x_h, y_h = sites[i][1], sites[i][2]
        pred = intercept + slope * x_h
        errs.append(y_h - pred)
    return rmse(errs)


def leakage_protocol_ok(fit_on_all_then_score_same: bool) -> bool:
    """Teaching rule: fitting and final scoring on the same sites without holdout is not OK."""
    return not fit_on_all_then_score_same


def main() -> None:
    base = leave_one_out_mean_baseline(SITES)
    model = leave_one_out_index_slope(SITES)
    assert base > 0 and model > 0
    # Model should not be wildly worse than baseline on this monotone synthetic set
    assert model < base + 1.0

    assert leakage_protocol_ok(False) is True
    assert leakage_protocol_ok(True) is False

    # Bias can exist with high correlation: constant offset series
    # (illustrative check: RMSE of zeros is zero)
    assert isclose(rmse([0.0, 0.0, 0.0]), 0.0)

    print(
        "Unit 4.11 EO validation checks passed "
        f"(LOO_RMSE_baseline={base:.4f}, LOO_RMSE_index={model:.4f}, leakage_guard)."
    )


if __name__ == "__main__":
    main()
