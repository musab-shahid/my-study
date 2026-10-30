"""Unit 12.3 spatiotemporal evaluation teaching checks (stdlib).

Rolling-origin vs leaky evaluation on a synthetic seasonal series.
Not a foundation-model run.
"""
from __future__ import annotations

from math import sin, pi


def mae(a, b) -> float:
    return sum(abs(x - y) for x, y in zip(a, b)) / len(a)


def main() -> None:
    n = 120
    y = [10.0 + 3.0 * sin(2 * pi * i / 12.0) + 0.1 * i / n for i in range(n)]
    # persistence
    persist = [y[0]] + y[:-1]
    clim = []
    for i in range(n):
        month = i % 12
        vals = [y[j] for j in range(i) if j % 12 == month]
        clim.append(sum(vals) / len(vals) if vals else y[i])
    # rolling origin: train past, predict next with lag-1 + seasonal mean hybrid
    ro_pred = []
    ro_true = []
    for origin in range(24, n - 1):
        train = y[: origin + 1]
        # honest: use only train
        month = (origin + 1) % 12
        season = [train[j] for j in range(len(train)) if j % 12 == month]
        pred = 0.5 * train[-1] + 0.5 * (sum(season) / len(season))
        ro_pred.append(pred)
        ro_true.append(y[origin + 1])
    ro_mae = mae(ro_pred, ro_true)
    p_mae = mae(persist[24:], y[24:])
    c_mae = mae(clim[24:], y[24:])

    # leaky: feature uses y[t+1] accidentally
    leak_pred = []
    for origin in range(24, n - 1):
        leak_pred.append(0.9 * y[origin + 1] + 0.1 * y[origin])  # peek
    leak_mae = mae(leak_pred, y[25:n])
    assert leak_mae < ro_mae  # optimistic
    assert p_mae > 0 and c_mae > 0 and ro_mae > 0

    print(
        "Unit 12.3 spatiotemporal eval checks passed "
        f"(persist_mae={p_mae:.3f}, clim_mae={c_mae:.3f}, "
        f"rolling_mae={ro_mae:.3f}, leaky_mae={leak_mae:.3f})."
    )


if __name__ == "__main__":
    main()
