"""Unit 6.1 — learning problem and baselines-first checks (stdlib, synthetic).

Chronological hold-out: last 20% of a time-ordered series.
Compares persistence, climatology, and a train-fit linear trend.
Not operational climate forecast validation.
"""
from __future__ import annotations


def chronological_split(n: int, test_frac: float = 0.2) -> tuple[range, range]:
    if not 0 < test_frac < 1:
        raise ValueError("test_frac must be in (0,1)")
    cut = int(n * (1 - test_frac))
    if cut <= 0 or cut >= n:
        raise ValueError("degenerate split")
    return range(0, cut), range(cut, n)


def mae(y_true: list[float], y_pred: list[float]) -> float:
    if len(y_true) != len(y_pred) or not y_true:
        raise ValueError("length mismatch or empty")
    return sum(abs(a - b) for a, b in zip(y_true, y_pred)) / len(y_true)


def persistence_forecast(series: list[float], test_idx: range) -> list[float]:
    return [series[i - 1] for i in test_idx]


def climatology_forecast(series: list[float], train_idx: range, test_idx: range) -> list[float]:
    clim = sum(series[i] for i in train_idx) / len(train_idx)
    return [clim for _ in test_idx]


def linear_trend_forecast(series: list[float], train_idx: range, test_idx: range) -> list[float]:
    """Least-squares line on train indices only; predict test times."""
    xs = list(train_idx)
    ys = [series[i] for i in train_idx]
    n = len(xs)
    mx = sum(xs) / n
    my = sum(ys) / n
    num = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    den = sum((x - mx) ** 2 for x in xs) or 1e-12
    b = num / den
    a = my - b * mx
    return [a + b * i for i in test_idx]


def random_index_split_is_not_chronological(n: int, seed: int = 61) -> bool:
    """Illustrative: a shuffled split mixes past/future indices."""
    import random

    idx = list(range(n))
    random.Random(seed).shuffle(idx)
    cut = int(n * 0.8)
    train, test = set(idx[:cut]), set(idx[cut:])
    # True if some test index is earlier than some train index (order leakage risk)
    return min(test) < max(train)


def main() -> None:
    # Mild trend + weekly cycle
    series = [float(i % 7) + 0.1 * i for i in range(50)]
    train, test = chronological_split(len(series), 0.2)
    assert list(train)[-1] < list(test)[0]

    y = [series[i] for i in test]
    pers = persistence_forecast(series, test)
    clim = climatology_forecast(series, train, test)
    lin = linear_trend_forecast(series, train, test)

    m_pers = mae(y, pers)
    m_clim = mae(y, clim)
    m_lin = mae(y, lin)
    assert m_pers >= 0 and m_clim >= 0 and m_lin >= 0
    # Under this generative design, linear trend should beat climatology
    assert m_lin < m_clim, f"expected linear < clim: {m_lin} vs {m_clim}"

    assert random_index_split_is_not_chronological(len(series)) is True

    print(
        "Unit 6.1 learning-problem checks passed "
        f"(persist_mae={m_pers:.4f}, clim_mae={m_clim:.4f}, lin_mae={m_lin:.4f})."
    )


if __name__ == "__main__":
    main()
