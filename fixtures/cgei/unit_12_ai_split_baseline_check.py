"""Subject 12 AI evaluation teaching checks (stdlib).

Validates leakage-safe split discipline and baseline-before-complex-model practice
using synthetic tabular features (not real EO imagery or trained deep nets).

Checks:
1) Train/val/test partition sizes and no ID overlap
2) Spatial-neighbor leakage flag when adjacent tiles co-occur across splits
3) Simple linear baseline MSE vs an overfit lookup that fails to generalise
4) Model-card required fields for intended use and limitations
"""
from __future__ import annotations

from math import isclose


def check_disjoint_ids(train, val, test) -> list[str]:
    errors = []
    sets = [("train", set(train)), ("val", set(val)), ("test", set(test))]
    for i in range(len(sets)):
        for j in range(i + 1, len(sets)):
            overlap = sets[i][1] & sets[j][1]
            if overlap:
                errors.append(f"overlap:{sets[i][0]}-{sets[j][0]}:{sorted(overlap)[:3]}")
    return errors


def spatial_leakage(train_ids, test_ids, adjacency: dict[str, set[str]]) -> list[str]:
    """Flag if any test tile is adjacent to a train tile (teaching definition)."""
    flags = []
    train = set(train_ids)
    for tid in test_ids:
        neighbors = adjacency.get(tid, set())
        leak = neighbors & train
        if leak:
            flags.append(f"adjacent_leak:{tid}->{sorted(leak)[0]}")
    return flags


def linear_fit_predict(xs: list[float], ys: list[float], x_new: list[float]) -> list[float]:
    n = len(xs)
    mx = sum(xs) / n
    my = sum(ys) / n
    num = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    den = sum((x - mx) ** 2 for x in xs)
    if den == 0:
        return [my for _ in x_new]
    b = num / den
    a = my - b * mx
    return [a + b * x for x in x_new]


def mse(y_true: list[float], y_pred: list[float]) -> float:
    return sum((a - b) ** 2 for a, b in zip(y_true, y_pred)) / len(y_true)


def overfit_lookup_predict(train_x: list[float], train_y: list[float], x_new: list[float]) -> list[float]:
    """Memorise training points; fall back to global mean — poor generalisation demo."""
    table = {x: y for x, y in zip(train_x, train_y)}
    mean_y = sum(train_y) / len(train_y)
    return [table.get(x, mean_y) for x in x_new]


def validate_model_card(card: dict) -> list[str]:
    required = (
        "intended_use",
        "exclusions",
        "data_sources",
        "split_method",
        "baseline",
        "limitations",
        "human_review",
    )
    return [f"missing:{k}" for k in required if not card.get(k)]


def main() -> None:
    train_ids = ["T00", "T01", "T02"]
    val_ids = ["T10", "T11"]
    test_ids = ["T20", "T21"]
    assert check_disjoint_ids(train_ids, val_ids, test_ids) == []

    # Adjacent leakage example: T20 next to T02 which is in train
    adjacency = {
        "T20": {"T02", "T21"},
        "T21": {"T20"},
        "T02": {"T01", "T20"},
    }
    leaks = spatial_leakage(train_ids, test_ids, adjacency)
    assert any("T20" in f for f in leaks)

    # Safe adjacency: test only neighbours other test tiles
    safe_adj = {"T20": {"T21"}, "T21": {"T20"}}
    assert spatial_leakage(train_ids, test_ids, safe_adj) == []

    # Synthetic regression: y ≈ 2x + noise pattern
    train_x = [0.0, 1.0, 2.0, 3.0]
    train_y = [0.1, 2.0, 3.9, 6.1]
    test_x = [0.5, 2.5]
    test_y = [1.0, 5.0]
    pred_lin = linear_fit_predict(train_x, train_y, test_x)
    pred_over = overfit_lookup_predict(train_x, train_y, test_x)
    mse_lin = mse(test_y, pred_lin)
    mse_over = mse(test_y, pred_over)
    # Lookup cannot hit 0.5/2.5 exactly → falls back to mean → worse than linear trend
    assert mse_lin < mse_over

    card_bad = {"intended_use": "demo"}
    assert "missing:baseline" in validate_model_card(card_bad)
    card_good = {
        "intended_use": "Teaching baseline comparison on synthetic features",
        "exclusions": "Not operational EO mapping",
        "data_sources": "synthetic",
        "split_method": "disjoint tile IDs; adjacency checked",
        "baseline": "ordinary least squares",
        "limitations": "No deep network trained; metrics are pedagogical",
        "human_review": "Required before any decision use",
    }
    assert validate_model_card(card_good) == []

    print(
        "Unit 12 AI split/baseline checks passed "
        f"(mse_lin={mse_lin:.4f}, mse_over={mse_over:.4f}, leaks={len(leaks)})."
    )


if __name__ == "__main__":
    main()
