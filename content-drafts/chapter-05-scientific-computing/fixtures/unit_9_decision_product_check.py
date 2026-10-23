"""Subject 9 decision-product provenance checks (stdlib).

Validates a minimal product-card contract for Unit 9.4 teaching:
- source citation, validity time, spatial resolution present
- hazard / exposure / vulnerability layers kept separate
- review state requires named reviewer when published
- multi-criteria ranking sensitivity to weights (links Unit 9.3)

Synthetic product metadata only — not a deployed dashboard.
"""
from __future__ import annotations

from math import isclose


REQUIRED_META = ("variable", "units", "valid_time", "spatial_resolution", "source", "version")


def validate_product_card(card: dict) -> list[str]:
    errors: list[str] = []
    for key in REQUIRED_META:
        val = card.get(key)
        if val is None or (isinstance(val, str) and not val.strip()):
            errors.append(f"missing_meta:{key}")

    layers = card.get("layers") or {}
    for name in ("hazard", "exposure", "vulnerability"):
        if name not in layers:
            errors.append(f"missing_layer:{name}")

    # Opaque single score without components is a failure mode
    if card.get("shows_only_composite_score") is True and not card.get("components_visible"):
        errors.append("opaque_composite_without_components")

    state = card.get("review_state")
    if state == "published":
        if not card.get("reviewer"):
            errors.append("published_requires_reviewer")
        if not card.get("review_date"):
            errors.append("published_requires_review_date")

    conf = card.get("confidence_note")
    if not conf or not str(conf).strip():
        errors.append("missing_confidence_note")

    return errors


def weighted_score(criteria: dict[str, float], weights: dict[str, float]) -> float:
    if abs(sum(weights.values()) - 1.0) > 1e-9:
        raise ValueError("weights must sum to 1")
    return sum(criteria[k] * weights[k] for k in weights)


def main() -> None:
    incomplete = {"variable": "flood risk index"}
    e = validate_product_card(incomplete)
    assert "missing_meta:units" in e
    assert "missing_layer:hazard" in e

    opaque = {
        "variable": "composite risk",
        "units": "index 0-1",
        "valid_time": "2024-06",
        "spatial_resolution": "1 km",
        "source": "synthetic demo",
        "version": "0.1",
        "layers": {"hazard": "H", "exposure": "E", "vulnerability": "V"},
        "shows_only_composite_score": True,
        "components_visible": False,
        "review_state": "draft",
        "confidence_note": "screening only",
    }
    assert "opaque_composite_without_components" in validate_product_card(opaque)

    published_bad = {
        **opaque,
        "shows_only_composite_score": False,
        "components_visible": True,
        "review_state": "published",
    }
    e2 = validate_product_card(published_bad)
    assert "published_requires_reviewer" in e2

    good = {
        "variable": "heat screening index",
        "units": "index 0-1",
        "valid_time": "2023 summer",
        "spatial_resolution": "neighbourhood",
        "source": "synthetic LST + census proxies",
        "version": "1.0.0",
        "layers": {"hazard": "LST", "exposure": "pop", "vulnerability": "age_housing"},
        "components_visible": True,
        "review_state": "published",
        "reviewer": "A. Analyst",
        "review_date": "2024-01-15",
        "confidence_note": "Ranks places; not calibrated health risk",
    }
    assert validate_product_card(good) == []

    # Weight sensitivity (Unit 9.3 link)
    opt_a = {"cost": 0.8, "equity": 0.4, "feasibility": 0.7}
    opt_b = {"cost": 0.5, "equity": 0.9, "feasibility": 0.6}
    w_cost = {"cost": 0.6, "equity": 0.2, "feasibility": 0.2}
    w_equity = {"cost": 0.2, "equity": 0.6, "feasibility": 0.2}
    sa = weighted_score(opt_a, w_cost)
    sb = weighted_score(opt_b, w_cost)
    sa2 = weighted_score(opt_a, w_equity)
    sb2 = weighted_score(opt_b, w_equity)
    assert sa > sb  # cost-heavy prefers A
    assert sb2 > sa2  # equity-heavy prefers B
    assert not isclose(sa - sb, sa2 - sb2)

    print("Unit 9 decision-product checks passed.")


if __name__ == "__main__":
    main()
