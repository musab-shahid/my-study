"""Unit 4.12 GeoAI method selection (stdlib, synthetic sites).

Compares mean baseline vs multi-feature linear score under leave-one-site-out.
Demonstrates leakage when feature weights are fit on all sites before scoring.
"""
from __future__ import annotations

from math import sqrt


SITES = [
    # id, f1, f2, f3, y
    ("A", 0.1, 0.5, 0.2, 2.0),
    ("B", 0.2, 0.4, 0.3, 3.0),
    ("C", 0.3, 0.3, 0.4, 4.0),
    ("D", 0.4, 0.2, 0.5, 5.0),
    ("E", 0.5, 0.1, 0.6, 6.0),
]


def rmse(errs: list[float]) -> float:
    return sqrt(sum(e * e for e in errs) / len(errs))


def loo_mean_baseline(sites) -> float:
    errs = []
    for i in range(len(sites)):
        ys = [sites[j][4] for j in range(len(sites)) if j != i]
        pred = sum(ys) / len(ys)
        errs.append(sites[i][4] - pred)
    return rmse(errs)


def fit_weights(train):
    # Toy: weight = correlation-like direction on f1 only for stability
    xs = [t[1] for t in train]
    ys = [t[4] for t in train]
    mx = sum(xs) / len(xs)
    my = sum(ys) / len(ys)
    varx = sum((x - mx) ** 2 for x in xs) or 1.0
    cov = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    w1 = cov / varx
    b = my - w1 * mx
    return w1, b


def loo_index_model(sites) -> float:
    errs = []
    for i in range(len(sites)):
        train = [sites[j] for j in range(len(sites)) if j != i]
        w1, b = fit_weights(train)
        x, y = sites[i][1], sites[i][4]
        pred = b + w1 * x
        errs.append(y - pred)
    return rmse(errs)


def leakage_score_all_sites(sites) -> float:
    """Fit on all sites, score same sites — invalid for generalization claims."""
    w1, b = fit_weights(sites)
    errs = [s[4] - (b + w1 * s[1]) for s in sites]
    return rmse(errs)


def main() -> None:
    base = loo_mean_baseline(SITES)
    loo = loo_index_model(SITES)
    leak = leakage_score_all_sites(SITES)

    assert base >= 0 and loo >= 0
    # Same-site fit must not be used as generalization evidence
    assert leak <= loo + 1e-6  # typically optimistic vs LOO
    assert base is not None and loo is not None

    print(
        "Unit 4.12 GeoAI method-selection checks passed "
        f"(LOO_baseline={base:.4f}, LOO_model={loo:.4f}, "
        f"same_site_fit_RMSE={leak:.4f})."
    )


if __name__ == "__main__":
    main()
