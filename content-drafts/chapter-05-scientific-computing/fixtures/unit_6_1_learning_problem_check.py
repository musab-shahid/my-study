
"""Unit 6.1 learning-problem and baseline checks (stdlib)."""
from __future__ import annotations


def chronological_split(n: int, test_frac: float = 0.2) -> tuple[range, range]:
    if not 0 < test_frac < 1:
        raise ValueError("test_frac must be in (0,1)")
    cut = int(n * (1 - test_frac))
    if cut <= 0 or cut >= n:
        raise ValueError("degenerate split")
    return range(0, cut), range(cut, n)


def mae(y_true: list[float], y_pred: list[float]) -> float:
    return sum(abs(a - b) for a, b in zip(y_true, y_pred)) / len(y_true)


def persistence_forecast(series: list[float], test_idx: range) -> list[float]:
    return [series[i - 1] for i in test_idx]


def climatology_forecast(series: list[float], train_idx: range, test_idx: range) -> list[float]:
    clim = sum(series[i] for i in train_idx) / len(train_idx)
    return [clim for _ in test_idx]


def main() -> None:
    series = [float(i % 7) + 0.1 * i for i in range(50)]
    train, test = chronological_split(len(series), 0.2)
    y = [series[i] for i in test]
    pers = persistence_forecast(series, test)
    clim = climatology_forecast(series, train, test)
    assert mae(y, pers) >= 0
    assert mae(y, clim) >= 0
    # Random shuffle would not preserve order — chronological cut is monotonic
    assert list(train)[-1] < list(test)[0]
    print(
        "Unit 6.1 learning-problem checks passed "
        f"(persist_mae={mae(y, pers):.4f}, clim_mae={mae(y, clim):.4f})."
    )


if __name__ == "__main__":
    main()
