"""Unit 3.9 spatial stats teaching checks (stdlib, synthetic).

IDW arithmetic + leave-location-out vs optimistic random pairing diagnostic.
Not PySAL, not kriging software.
"""
from __future__ import annotations

from math import isclose, sqrt


def idw_predict(samples: list[tuple[float, float]], power: float = 2.0) -> float:
    """samples: (distance, value); distances > 0."""
    weights = []
    vals = []
    for d, v in samples:
        if d <= 0:
            return v
        w = 1.0 / (d ** power)
        weights.append(w)
        vals.append(v)
    sw = sum(weights)
    return sum(w * v for w, v in zip(weights, vals)) / sw


def rmse(errs: list[float]) -> float:
    return sqrt(sum(e * e for e in errs) / len(errs))


def leave_location_out_const(values: list[float]) -> float:
    """Predict held-out site with mean of others."""
    errs = []
    for i, y in enumerate(values):
        train = [values[j] for j in range(len(values)) if j != i]
        pred = sum(train) / len(train)
        errs.append(y - pred)
    return rmse(errs)


def main() -> None:
    pred = idw_predict([(1.0, 10.0), (3.0, 16.0)], power=2.0)
    # w1=1, w2=1/9; pred = (10 + 16/9) / (1 + 1/9) = (90/9 + 16/9) / (10/9) = 106/10 = 10.6
    # Wait recalculate: w1=1, w2=1/9, sw=10/9
    # (1*10 + (1/9)*16) / (10/9) = (10 + 16/9) * 9/10 = (106/9)*(9/10)=106/10=10.6
    assert isclose(pred, 10.6, abs_tol=1e-12)

    # Smooth increasing field — LOO mean baseline has positive error
    vals = [2.0, 3.0, 4.0, 5.0, 6.0]
    loo = leave_location_out_const(vals)
    assert loo > 0

    # Optimistic protocol: score same points with global mean (not a spatial claim)
    mu = sum(vals) / len(vals)
    same = rmse([y - mu for y in vals])
    # LOO should be at least as large as in-sample RMSE for this baseline family
    assert loo >= same - 1e-12

    print(
        "Unit 3.9 spatial stats checks passed "
        f"(IDW={pred}, LOO_RMSE={loo:.4f}, in_sample_RMSE={same:.4f})."
    )


if __name__ == "__main__":
    main()
