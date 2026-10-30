"""Unit 5.6.4 — leakage-aware split check (stdlib, synthetic).

When y is driven by a group effect and x only weakly tracks that effect,
a random row split lets the same groups appear in train and test and looks
optimistic relative to holding entire groups out.

Not a real geospatial or climate model validation.
"""
from __future__ import annotations

import random


def make_grouped_data(n_groups: int = 10, n_per: int = 20, seed: int = 564):
    rng = random.Random(seed)
    rows = []
    group_means = {g: float(g) * 0.8 - 3.5 for g in range(n_groups)}  # strong group ladder
    for g in range(n_groups):
        for _ in range(n_per):
            # x only weakly informative of group (mostly noise)
            x = group_means[g] * 0.05 + rng.gauss(0.0, 1.0)
            y = group_means[g] + rng.gauss(0.0, 0.25)
            rows.append({"group": g, "x": x, "y": y})
    return rows


def rmse(preds_y: list[tuple[float, float]]) -> float:
    return (sum((p - y) ** 2 for p, y in preds_y) / len(preds_y)) ** 0.5


def fit_group_lookup_and_global(train, test):
    """Train-time group means when group seen; else global mean. Leakage when groups overlap."""
    by_g: dict[int, list[float]] = {}
    for r in train:
        by_g.setdefault(r["group"], []).append(r["y"])
    gmean = {g: sum(v) / len(v) for g, v in by_g.items()}
    global_mean = sum(r["y"] for r in train) / len(train)

    pairs = []
    for r in test:
        pred = gmean[r["group"]] if r["group"] in gmean else global_mean
        pairs.append((pred, r["y"]))
    return rmse(pairs)


def random_split(rows, test_frac=0.25, seed=1):
    rng = random.Random(seed)
    idx = list(range(len(rows)))
    rng.shuffle(idx)
    n_test = max(1, int(len(rows) * test_frac))
    te = set(idx[:n_test])
    train = [rows[i] for i in range(len(rows)) if i not in te]
    test = [rows[i] for i in range(len(rows)) if i in te]
    return train, test


def group_holdout_split(rows, test_groups: set[int]):
    train = [r for r in rows if r["group"] not in test_groups]
    test = [r for r in rows if r["group"] in test_groups]
    return train, test


def main() -> None:
    rows = make_grouped_data()
    tr_r, te_r = random_split(rows, test_frac=0.25, seed=11)
    overlap = {r["group"] for r in tr_r} & {r["group"] for r in te_r}
    assert overlap, "random split should overlap groups"

    rmse_random = fit_group_lookup_and_global(tr_r, te_r)

    held = {0, 1, 2}
    tr_g, te_g = group_holdout_split(rows, held)
    assert {r["group"] for r in tr_g}.isdisjoint(held)
    rmse_group = fit_group_lookup_and_global(tr_g, te_g)

    # Random split can use train-time means for overlapping groups → much lower RMSE.
    assert rmse_random < 0.5, f"random should look strong, got {rmse_random}"
    assert rmse_group > 1.5, f"held-out groups should be hard, got {rmse_group}"
    assert rmse_random < rmse_group * 0.5

    print(
        "PASS unit_5_6_leakage_split_check "
        f"rmse_random={rmse_random:.4f} rmse_group={rmse_group:.4f} "
        f"n_overlap_groups={len(overlap)}"
    )


if __name__ == "__main__":
    main()
