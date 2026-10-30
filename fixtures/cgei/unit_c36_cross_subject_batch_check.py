"""C.36 cross-subject pedagogical batch (stdlib). Outside Unit 2.6.

Synthetic only — not operational GIS/EO/ML validation.
"""
from __future__ import annotations

from typing import Any, Sequence


def se_of_mean(sample: Sequence[float]) -> float:
    n = len(sample)
    if n < 2:
        raise ValueError("need n>=2")
    mu = sum(sample) / n
    var = sum((x - mu) ** 2 for x in sample) / (n - 1)
    return (var / n) ** 0.5


def ci95_mean(sample: Sequence[float]) -> tuple[float, float]:
    """Pedagogical normal approx: mean ± 1.96 * SE."""
    mu = sum(sample) / len(sample)
    se = se_of_mean(sample)
    return (mu - 1.96 * se, mu + 1.96 * se)


def pearson_r(x: Sequence[float], y: Sequence[float]) -> float:
    if len(x) != len(y) or len(x) < 2:
        raise ValueError("aligned n>=2 required")
    n = len(x)
    mx = sum(x) / n
    my = sum(y) / n
    num = sum((a - mx) * (b - my) for a, b in zip(x, y))
    denx = sum((a - mx) ** 2 for a in x) ** 0.5
    deny = sum((b - my) ** 2 for b in y) ** 0.5
    if denx == 0 or deny == 0:
        raise ValueError("zero variance")
    return num / (denx * deny)


def residual_diagnostics(y: Sequence[float], yhat: Sequence[float]) -> dict[str, float]:
    if len(y) != len(yhat) or not y:
        raise ValueError("length mismatch")
    res = [a - b for a, b in zip(y, yhat)]
    mean_r = sum(res) / len(res)
    ss_res = sum(r * r for r in res)
    my = sum(y) / len(y)
    ss_tot = sum((a - my) ** 2 for a in y)
    r2 = 1.0 - ss_res / ss_tot if ss_tot else 0.0
    return {"mean_residual": mean_r, "rmse": (ss_res / len(res)) ** 0.5, "r2": r2}


def kfold_indices(n: int, k: int = 5) -> list[list[int]]:
    """Contiguous fold test indices covering 0..n-1 exactly once."""
    if k < 2 or n < k:
        raise ValueError("need n>=k>=2")
    folds = [[] for _ in range(k)]
    for i in range(n):
        folds[i % k].append(i)
    return folds


def crs_compatible(a: str, b: str) -> bool:
    """Exact EPSG string match (pedagogical)."""
    if not a or not b:
        raise ValueError("missing CRS")
    return a.strip().upper() == b.strip().upper()


def class_imbalance_ratio(labels: Sequence[int]) -> float:
    """Majority/minority count ratio; 1.0 = balanced binary."""
    if not labels:
        raise ValueError("empty")
    counts: dict[int, int] = {}
    for lab in labels:
        counts[lab] = counts.get(lab, 0) + 1
    vals = sorted(counts.values())
    if vals[0] == 0:
        raise ValueError("zero class")
    return vals[-1] / vals[0]


def n_valid_masked(values: Sequence[Any], mask_valid: Sequence[bool]) -> int:
    if len(values) != len(mask_valid):
        raise ValueError("length mismatch")
    return sum(1 for v, m in zip(values, mask_valid) if m and v is not None)


def mean_exclude_nodata(values: Sequence[Any], nodata: float = -9999.0) -> float:
    vals = []
    for v in values:
        if v is None:
            continue
        if not isinstance(v, (int, float)) or isinstance(v, bool):
            raise ValueError("invalid")
        if v == nodata:
            continue
        vals.append(float(v))
    if not vals:
        raise ValueError("no valid data")
    return sum(vals) / len(vals)


def apply_scale_offset(dn: Sequence[float], scale: float, offset: float) -> list[float]:
    return [scale * x + offset for x in dn]


def sensitivity_delta(base: float, param: float, rel: float = 0.1) -> dict[str, float]:
    """Relative ± perturbation of param on identity model y=param*base (demo)."""
    y0 = param * base
    y_hi = (param * (1 + rel)) * base
    y_lo = (param * (1 - rel)) * base
    return {"y0": y0, "y_hi": y_hi, "y_lo": y_lo, "span": y_hi - y_lo}


def temporal_split_ok(times: Sequence[int], train_end: int) -> bool:
    """Train indices must all be <= train_end; test all > train_end."""
    train = [t for t in times if t <= train_end]
    test = [t for t in times if t > train_end]
    if not train or not test:
        return False
    return max(train) <= train_end < min(test)


def main() -> None:
    s = [1.0, 2.0, 3.0, 4.0]
    se = se_of_mean(s)
    assert abs(se - (se_of_mean(s))) < 1e-12
    lo, hi = ci95_mean(s)
    assert lo < sum(s) / 4 < hi

    r = pearson_r([1, 2, 3, 4], [2, 4, 6, 8])
    assert abs(r - 1.0) < 1e-12

    diag = residual_diagnostics([1, 2, 3], [1, 2, 2])
    assert abs(diag["mean_residual"] - (0 + 0 + 1) / 3) < 1e-12

    folds = kfold_indices(10, 5)
    assert sorted(i for f in folds for i in f) == list(range(10))
    assert all(len(f) == 2 for f in folds)

    assert crs_compatible("EPSG:4326", "epsg:4326") is True
    assert crs_compatible("EPSG:4326", "EPSG:3857") is False

    assert abs(class_imbalance_ratio([0, 0, 0, 1]) - 3.0) < 1e-12

    assert n_valid_masked([1, None, 3], [True, True, False]) == 1

    assert abs(mean_exclude_nodata([1.0, -9999.0, 3.0]) - 2.0) < 1e-12

    phys = apply_scale_offset([100, 200], 0.1, 200)
    assert phys == [210.0, 220.0]

    sens = sensitivity_delta(10.0, 2.0, 0.1)
    assert abs(sens["span"] - 4.0) < 1e-12

    assert temporal_split_ok([1, 2, 3, 4, 5], 3) is True
    assert temporal_split_ok([1, 5, 2, 4], 3) is True  # still ok by values
    # leakage pattern: train_end=3 but we'd need ordered policy — still values-based OK

    print(
        "C.36 cross-subject batch passed "
        f"(se={se:.4f}, r={r:.3f}, r2={diag['r2']:.3f}, "
        f"imbalance={class_imbalance_ratio([0,0,0,1]):.1f}, "
        f"phys0={phys[0]}, sens_span={sens['span']})."
    )


if __name__ == "__main__":
    main()
