"""Unit 6.4 spatial/temporal leakage teaching checks (stdlib).

Separates geographic generalization difficulty from information leakage.
The mixed/blocked mean-predictor comparison changes the evaluation population;
it does not itself demonstrate leakage. A separate preprocessing check shows
how using held-out covariates contaminates fitted training parameters.
Synthetic teaching examples, not validation of any EO product.
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

    # Interleaved split: train/test both mix regions; no held-out labels are used.
    train_idx = [0, 2, 4, 6]
    test_idx = [1, 3, 5, 7]
    train_y = [y[i] for i in train_idx]
    test_y = [y[i] for i in test_idx]
    pred_mixed = mean_predict(train_y, len(test_idx))
    mae_mixed = mae(test_y, pred_mixed)

    # Blocked: train region 0, test region 1
    train_b = [i for i, r in enumerate(region) if r == 0]
    test_b = [i for i, r in enumerate(region) if r == 1]
    pred_block = mean_predict([y[i] for i in train_b], len(test_b))
    mae_block = mae([y[i] for i in test_b], pred_block)

    # In this example a held-out region is harder. This is not proof of leakage.
    assert mae_block > mae_mixed

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
    assert not isclose(scaled_test[0], 0.0, abs_tol=1e-9)

    # Actual contamination: fitting preprocessing on train + held-out inputs.
    # Change only the held-out covariate. A train-only mean stays fixed, while
    # the incorrectly pooled fitted mean changes. No accuracy gain is assumed.
    altered_test_vals = [100.0]
    pooled_mean = sum(train_vals + test_vals) / (len(train_vals) + len(test_vals))
    altered_pooled_mean = sum(train_vals + altered_test_vals) / (len(train_vals) + len(altered_test_vals))
    assert isclose(mu, 2.0)
    assert isclose(sum(train_vals) / len(train_vals), mu)
    assert not isclose(pooled_mean, mu)
    assert not isclose(altered_pooled_mean, pooled_mean)

    print(
        "Unit 6.4 generalization and preprocessing-leakage checks passed "
        f"(mae_mixed={mae_mixed:.3f}, mae_block={mae_block:.3f})."
    )


if __name__ == "__main__":
    main()
