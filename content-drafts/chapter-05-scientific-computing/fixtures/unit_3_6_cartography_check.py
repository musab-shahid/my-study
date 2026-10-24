"""Unit 3.6 cartography honesty checks (stdlib)."""
from __future__ import annotations


def choropleth_attribute_ok(field_kind: str) -> bool:
    """Allow rate/density/intensity; reject raw count for intensity choropleth."""
    return field_kind in {"rate", "density", "intensity", "anomaly"}


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

    print("Unit 3.6 cartography checks passed (choropleth attribute + legend fields).")


if __name__ == "__main__":
    main()
