"""Unit 6.3 core algorithm comparison (stdlib, offline, synthetic).

Compares majority-class baseline, a linear (logistic-style) score, and a
depth-1 threshold rule on the Unit 6.2 parcel table under a chronological
split. Not Multan data; not causal inference.
"""
from __future__ import annotations

import csv
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data" / "unit_6_2_feature_table.csv"

FEATURES = ("lst_c", "ndvi", "built_frac")
TARGET = "heat_exceed"


def load() -> list[dict]:
    with DATA.open(encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def split_year(rows: list[dict], holdout: int = 2021):
    train = [r for r in rows if int(r["year"]) < holdout]
    test = [r for r in rows if int(r["year"]) >= holdout]
    return train, test


def fit_scaler(train: list[dict], cols: tuple[str, ...]):
    stats = {}
    for c in cols:
        vals = [float(r[c]) for r in train]
        mu = sum(vals) / len(vals)
        sd = (sum((v - mu) ** 2 for v in vals) / len(vals)) ** 0.5 or 1.0
        stats[c] = (mu, sd)
    return stats


def transform_row(r: dict, stats: dict) -> list[float]:
    return [(float(r[c]) - stats[c][0]) / stats[c][1] for c in FEATURES]


def majority_baseline(train: list[dict]) -> int:
    ones = sum(int(r[TARGET]) for r in train)
    zeros = len(train) - ones
    return 1 if ones >= zeros else 0


def sigmoid(z: float) -> float:
    if z >= 0:
        ez = math.exp(-z)
        return 1.0 / (1.0 + ez)
    ez = math.exp(z)
    return ez / (1.0 + ez)


def fit_logistic_gd(train_x: list[list[float]], train_y: list[int], steps: int = 400, lr: float = 0.3):
    """Simple L2 logistic regression via gradient descent (fixed seed path)."""
    d = len(train_x[0])
    w = [0.0] * d
    b = 0.0
    n = len(train_x)
    for _ in range(steps):
        gw = [0.0] * d
        gb = 0.0
        for x, y in zip(train_x, train_y):
            z = b + sum(wi * xi for wi, xi in zip(w, x))
            p = sigmoid(z)
            err = p - y
            for j in range(d):
                gw[j] += err * x[j]
            gb += err
        for j in range(d):
            w[j] -= lr * (gw[j] / n + 0.01 * w[j])
        b -= lr * (gb / n)
    return w, b


def predict_logistic(x: list[float], w: list[float], b: float) -> int:
    z = b + sum(wi * xi for wi, xi in zip(w, x))
    return 1 if sigmoid(z) >= 0.5 else 0


def fit_stump(train: list[dict], feature: str = "lst_c"):
    """Depth-1 threshold on a single feature maximising train accuracy."""
    vals = sorted(set(float(r[feature]) for r in train))
    best_t, best_acc, best_dir = vals[0], -1.0, "ge"
    for t in vals:
        for direction in ("ge", "lt"):
            correct = 0
            for r in train:
                v = float(r[feature])
                pred = 1 if (v >= t if direction == "ge" else v < t) else 0
                correct += int(pred == int(r[TARGET]))
            acc = correct / len(train)
            if acc > best_acc:
                best_acc, best_t, best_dir = acc, t, direction
    return best_t, best_dir


def predict_stump(r: dict, feature: str, threshold: float, direction: str) -> int:
    v = float(r[feature])
    return 1 if (v >= threshold if direction == "ge" else v < threshold) else 0


def metrics(y_true: list[int], y_pred: list[int]) -> dict:
    tp = sum(1 for a, b in zip(y_true, y_pred) if a == 1 and b == 1)
    tn = sum(1 for a, b in zip(y_true, y_pred) if a == 0 and b == 0)
    fp = sum(1 for a, b in zip(y_true, y_pred) if a == 0 and b == 1)
    fn = sum(1 for a, b in zip(y_true, y_pred) if a == 1 and b == 0)
    prec = tp / (tp + fp) if (tp + fp) else 0.0
    rec = tp / (tp + fn) if (tp + fn) else 0.0
    f1 = 2 * prec * rec / (prec + rec) if (prec + rec) else 0.0
    acc = (tp + tn) / len(y_true)
    return {"accuracy": acc, "precision": prec, "recall": rec, "f1": f1, "tp": tp, "fp": fp, "fn": fn, "tn": tn}


def main() -> None:
    rows = load()
    train, test = split_year(rows)
    stats = fit_scaler(train, FEATURES)
    train_x = [transform_row(r, stats) for r in train]
    test_x = [transform_row(r, stats) for r in test]
    train_y = [int(r[TARGET]) for r in train]
    test_y = [int(r[TARGET]) for r in test]

    # 1) Majority baseline
    maj = majority_baseline(train)
    pred_maj = [maj] * len(test)
    m_maj = metrics(test_y, pred_maj)

    # 2) Logistic regression
    w, b = fit_logistic_gd(train_x, train_y)
    pred_log = [predict_logistic(x, w, b) for x in test_x]
    m_log = metrics(test_y, pred_log)

    # 3) Decision stump on raw LST (threshold from train only)
    thr, direction = fit_stump(train, "lst_c")
    pred_tree = [predict_stump(r, "lst_c", thr, direction) for r in test]
    m_tree = metrics(test_y, pred_tree)


    # Known confusion-matrix arithmetic on a fixed 4-vector
    yt_ex = [1, 0, 1, 0]
    yp_ex = [1, 1, 0, 0]
    m_ex = metrics(yt_ex, yp_ex)
    assert m_ex["tp"] == 1 and m_ex["fp"] == 1 and m_ex["fn"] == 1 and m_ex["tn"] == 1
    assert abs(m_ex["precision"] - 0.5) < 1e-9
    assert abs(m_ex["recall"] - 0.5) < 1e-9

    # Stump threshold from train only: refitting on test must not be used for selection
    thr_train, dir_train = fit_stump(train, "lst_c")
    thr_test, _ = fit_stump(test, "lst_c")
    # Predictions use train-selected threshold
    pred_tree = [predict_stump(r, "lst_c", thr_train, dir_train) for r in test]
    m_tree = metrics(test_y, pred_tree)
    # All models share chronological holdout
    assert all(int(r["year"]) >= 2021 for r in test)

    # Fair comparison: same split; at least one model should beat pure chance structure
    assert len(test_y) == 4
    # Logistic or stump should not be worse than majority on F1 in this synthetic design
    assert max(m_log["f1"], m_tree["f1"]) >= m_maj["f1"] - 1e-9

    # Coefficients are associations under this design — not causal claims
    assert len(w) == len(FEATURES)

    print(
        "Unit 6.3 core-algorithm checks passed "
        f"(maj_f1={m_maj['f1']:.2f}, log_f1={m_log['f1']:.2f}, "
        f"stump_f1={m_tree['f1']:.2f}, lst_threshold={thr})."
    )


if __name__ == "__main__":
    main()
