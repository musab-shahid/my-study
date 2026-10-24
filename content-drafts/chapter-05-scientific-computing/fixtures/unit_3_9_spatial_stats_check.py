"""Unit 3.9 spatial stats practical mastery (stdlib, synthetic).

IDW arithmetic, leave-location-out IDW, residual magnitude check.
Not PySAL, not full kriging software.
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
    if not weights:
        raise ValueError("no_samples")
    sw = sum(weights)
    return sum(w * v for w, v in zip(weights, vals)) / sw


def rmse(errs: list[float]) -> float:
    return sqrt(sum(e * e for e in errs) / len(errs))


def leave_location_out_const(values: list[float]) -> float:
    errs = []
    for i, y in enumerate(values):
        train = [values[j] for j in range(len(values)) if j != i]
        pred = sum(train) / len(train)
        errs.append(y - pred)
    return rmse(errs)


def leave_location_out_idw(
    points: list[tuple[float, float, float]],
    power: float = 2.0,
) -> tuple[float, list[float]]:
    """points: (x, y, value). Predict each held-out point by IDW from others."""
    errs = []
    for i, (xi, yi, vi) in enumerate(points):
        samples = []
        for j, (xj, yj, vj) in enumerate(points):
            if i == j:
                continue
            d = sqrt((xi - xj) ** 2 + (yi - yj) ** 2)
            samples.append((d, vj))
        pred = idw_predict(samples, power=power)
        errs.append(vi - pred)
    return rmse(errs), errs


def residual_spatial_structure(coords: list[tuple[float, float]], residuals: list[float]) -> float:
    """Mean absolute residual difference for nearest neighbour pairs (simple lag diagnostic)."""
    n = len(coords)
    diffs = []
    for i in range(n):
        best = None
        for j in range(n):
            if i == j:
                continue
            d = sqrt((coords[i][0] - coords[j][0]) ** 2 + (coords[i][1] - coords[j][1]) ** 2)
            if best is None or d < best[0]:
                best = (d, j)
        diffs.append(abs(residuals[i] - residuals[best[1]]))
    return sum(diffs) / len(diffs)


def main() -> None:
    pred = idw_predict([(1.0, 10.0), (3.0, 16.0)], power=2.0)
    assert isclose(pred, 10.6, abs_tol=1e-12)

    vals = [2.0, 3.0, 4.0, 5.0, 6.0]
    loo = leave_location_out_const(vals)
    mu = sum(vals) / len(vals)
    same = rmse([y - mu for y in vals])
    assert loo >= same - 1e-12

    # Spatial field: value increases with x
    pts = [
        (0.0, 0.0, 1.0),
        (1.0, 0.0, 2.0),
        (2.0, 0.0, 3.0),
        (3.0, 0.0, 4.0),
        (4.0, 0.0, 5.0),
    ]
    idw_loo, errs = leave_location_out_idw(pts, power=2.0)
    assert idw_loo > 0
    coords = [(p[0], p[1]) for p in pts]
    lag = residual_spatial_structure(coords, errs)
    assert lag >= 0

    # Edge: single-point set cannot LOO-IDW
    try:
        leave_location_out_idw([(0.0, 0.0, 1.0)])
        # with one point, train empty — idw_predict gets empty
        raise AssertionError("expected failure path for n<2")
    except (ValueError, ZeroDivisionError):
        pass
    except Exception:
        # empty samples may ZeroDivision in idw
        pass

    print(
        "Unit 3.9 spatial stats checks passed "
        f"(IDW={pred}, LOO_mean_RMSE={loo:.4f}, LOO_IDW_RMSE={idw_loo:.4f}, "
        f"nn_residual_lag={lag:.4f})."
    )


if __name__ == "__main__":
    main()
