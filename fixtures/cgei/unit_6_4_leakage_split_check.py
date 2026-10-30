"""Unit 6.4 spatial/temporal leakage teaching checks (stdlib).

Demonstrates that random splits can look better than blocked splits when
neighbours share signal — a synthetic leakage illustration, not a claim about
any particular EO product.
"""
from __future__ import annotations

from math import isclose


def mae(y_true: list[float], y_pred: list[float]) -> float:
    return sum(abs(a - b) for a, b in zip(y_true, y_pred)) / len(y_true)


def mean_predict(train_y: list[float], n_test: int) -> list[float]:
    m = sum(train_y) / len(train_y)
    return [m] * n_test


def main() -> None:
    # 2 regions × 4 cells; strong within-region mean difference
    # ids: R0_0..R0_3, R1_0..R1_3
    y = [0.0, 0.2, 0.1, 0.0, 5.0, 5.1, 4.9, 5.2]
    region = [0, 0, 0, 0, 1, 1, 1, 1]

    # Random-ish interleaved split (leaky): train/test both mix regions
    train_idx = [0, 2, 4, 6]
    test_idx = [1, 3, 5, 7]
    train_y = [y[i] for i in train_idx]
    test_y = [y[i] for i in test_idx]
    pred_leaky = mean_predict(train_y, len(test_idx))
    mae_leaky = mae(test_y, pred_leaky)

    # Blocked: train region 0, test region 1
    train_b = [i for i, r in enumerate(region) if r == 0]
    test_b = [i for i, r in enumerate(region) if r == 1]
    pred_block = mean_predict([y[i] for i in train_b], len(test_b))
    mae_block = mae([y[i] for i in test_b], pred_block)

    # Blocked should be harder when regions differ
    assert mae_block > mae_leaky

    # Chronological future holdout
    series = list(range(20))
    train_t, test_t = series[:16], series[16:]
    assert max(train_t) < min(test_t)

    # Preprocessing fit-on-train only (scale)
    train_vals = [1.0, 2.0, 3.0]
    test_vals = [10.0]
    mu = sum(train_vals) / len(train_vals)
    sd = (sum((v - mu) ** 2 for v in train_vals) / len(train_vals)) ** 0.5
    scaled_test = [(v - mu) / sd for v in test_vals]
    # If scaled using test stats, mean would be 0 — must not happen
    assert not isclose(scaled_test[0], 0.0, abs_tol=1e-9)

    print(
        "Unit 6.4 leakage-split checks passed "
        f"(mae_leaky={mae_leaky:.3f}, mae_block={mae_block:.3f})."
    )


if __name__ == "__main__":
    main()
