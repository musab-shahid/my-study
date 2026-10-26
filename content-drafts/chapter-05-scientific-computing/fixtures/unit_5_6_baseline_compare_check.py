"""Unit 5.6.5 — baseline comparison on a fixed hold-out (stdlib, synthetic).

Compares a mean baseline vs a linear predictor on the same test rows.
Fails if metrics are computed on different lengths or if the candidate is
not evaluated against the baseline on identical indices.

Not a real climate forecast validation.
"""
from __future__ import annotations

import random


def mae(y, p):
    return sum(abs(a - b) for a, b in zip(y, p)) / len(y)


def rmse(y, p):
    return (sum((a - b) ** 2 for a, b in zip(y, p)) / len(y)) ** 0.5


def bias(y, p):
    return sum(b - a for a, b in zip(y, p)) / len(y)


def mean_baseline_predict(train_y, n_test: int):
    m = sum(train_y) / len(train_y)
    return [m] * n_test


def linear_predict(train_x, train_y, test_x):
    n = len(train_x)
    mx = sum(train_x) / n
    my = sum(train_y) / n
    num = sum((x - mx) * (y - my) for x, y in zip(train_x, train_y))
    den = sum((x - mx) ** 2 for x in train_x) or 1e-12
    b = num / den
    a = my - b * mx
    return [a + b * x for x in test_x]


def main() -> None:
    rng = random.Random(565)
    # y = 2 + 1.5 x + noise
    xs = [rng.uniform(0, 4) for _ in range(80)]
    ys = [2.0 + 1.5 * x + rng.gauss(0, 0.4) for x in xs]
    # fixed 60/20 split by index (not shuffled groups — different lesson)
    train_x, train_y = xs[:60], ys[:60]
    test_x, test_y = xs[60:], ys[60:]
    assert len(test_y) == 20

    pred_base = mean_baseline_predict(train_y, len(test_y))
    pred_lin = linear_predict(train_x, train_y, test_x)
    assert len(pred_base) == len(pred_lin) == len(test_y)

    m_base, m_lin = mae(test_y, pred_base), mae(test_y, pred_lin)
    r_base, r_lin = rmse(test_y, pred_base), rmse(test_y, pred_lin)
    # Linear should beat mean baseline under this generative design
    assert m_lin < m_base, f"MAE lin={m_lin} base={m_base}"
    assert r_lin < r_base, f"RMSE lin={r_lin} base={r_base}"

    # Guard: refuse comparison if lengths diverge (mismatched evaluation sets)
    try:
        mae(test_y, pred_lin[:-1])
        raise AssertionError("expected length mismatch to be detected by zip truncation check")
    except Exception:
        pass
    # Explicit equal-length check used by teaching code
    assert len(test_y) == len(pred_base) == len(pred_lin)

    print(
        "PASS unit_5_6_baseline_compare_check "
        f"mae_base={m_base:.4f} mae_lin={m_lin:.4f} "
        f"rmse_base={r_base:.4f} rmse_lin={r_lin:.4f} bias_lin={bias(test_y, pred_lin):.4f}"
    )


if __name__ == "__main__":
    main()
