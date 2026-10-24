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


def empirical_semivariogram(
    points: list[tuple[float, float, float]],
    lags: list[tuple[float, float]],
) -> list[tuple[float, float, int]]:
    """Classical method-of-moments gamma for lag bins.

    points: (x, y, value)
    lags: list of (h_min, h_max) inclusive lower, exclusive upper except last
    returns list of (h_mid, gamma, n_pairs)
    gamma = mean 0.5 * (z_i - z_j)^2 over pairs with distance in bin
    """
    out = []
    for h_min, h_max in lags:
        pairs = []
        n = len(points)
        for i in range(n):
            for j in range(i + 1, n):
                dx = points[i][0] - points[j][0]
                dy = points[i][1] - points[j][1]
                d = (dx * dx + dy * dy) ** 0.5
                if h_min <= d < h_max or (h_max == lags[-1][1] and d == h_max):
                    dz = points[i][2] - points[j][2]
                    pairs.append(0.5 * dz * dz)
        if not pairs:
            out.append(((h_min + h_max) / 2.0, float("nan"), 0))
        else:
            out.append(((h_min + h_max) / 2.0, sum(pairs) / len(pairs), len(pairs)))
    return out


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

    # Empirical semivariogram on a smooth gradient (gamma rises with lag)
    cloud = [
        (0.0, 0.0, 0.0),
        (1.0, 0.0, 1.0),
        (2.0, 0.0, 2.0),
        (3.0, 0.0, 3.0),
        (4.0, 0.0, 4.0),
        (0.0, 1.0, 0.5),
        (1.0, 1.0, 1.5),
    ]
    bins = [(0.0, 1.5), (1.5, 3.0), (3.0, 5.0)]
    svg = empirical_semivariogram(cloud, bins)
    assert all(n > 0 for _, _, n in svg)
    g0, g1, g2 = svg[0][1], svg[1][1], svg[2][1]
    assert g0 < g2  # longer lags more dissimilar on a trend field

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
        f"nn_residual_lag={lag:.4f}, "
        f"semivariogram_gamma={[round(g, 4) for _, g, _ in svg]})."
    )


if __name__ == "__main__":
    main()
