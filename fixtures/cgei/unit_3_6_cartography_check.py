"""Unit 3.6 cartography honesty checks (stdlib)."""
from __future__ import annotations


def choropleth_attribute_ok(field_kind: str) -> bool:
    """Allow rate/density/intensity; reject raw count for intensity choropleth."""
    return field_kind in {"rate", "density", "intensity", "anomaly"}


def equal_interval_breaks(values: list[float], n_classes: int) -> list[float]:
    lo, hi = min(values), max(values)
    step = (hi - lo) / n_classes
    return [lo + i * step for i in range(n_classes + 1)]


def quantile_breaks(values: list[float], n_classes: int) -> list[float]:
    xs = sorted(values)
    n = len(xs)
    breaks = [xs[0]]
    for i in range(1, n_classes):
        # nearest-rank
        idx = int(round(i * (n - 1) / n_classes))
        breaks.append(xs[idx])
    breaks.append(xs[-1])
    return breaks


def legend_minimum_fields(meta: dict) -> list[str]:
    required = ("variable", "units", "period", "source")
    return [k for k in required if not meta.get(k)]


def main() -> None:
    assert choropleth_attribute_ok("rate") is True
    assert choropleth_attribute_ok("count") is False
    assert choropleth_attribute_ok("anomaly") is True

    good = {
        "variable": "Tmax anomaly",
        "units": "°C",
        "period": "2020-07",
        "source": "synthetic teaching grid",
    }
    assert legend_minimum_fields(good) == []
    bad = {"variable": "Tmax"}
    assert set(legend_minimum_fields(bad)) >= {"units", "period", "source"}

    rates = [0.1, 0.12, 0.15, 0.5, 0.9]
    ei = equal_interval_breaks(rates, 3)
    assert len(ei) == 4
    assert abs(ei[1] - ei[0] - (ei[-1] - ei[0]) / 3) < 1e-12
    q = quantile_breaks(rates, 3)
    assert len(q) == 4
    assert q[0] == 0.1 and q[-1] == 0.9
    # Different algorithms => not identical interior breaks on skewed data
    assert ei != q

    print("Unit 3.6 cartography checks passed (choropleth, legend, classification breaks).")


if __name__ == "__main__":
    main()
