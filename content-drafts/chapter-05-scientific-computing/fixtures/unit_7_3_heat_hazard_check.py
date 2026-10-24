"""Unit 7.3 heat-hazard teaching module (stdlib, synthetic).

Illustrative screening only — not Multan validation, not a health forecast,
not a calibrated damage probability.

Hazard score combines:
  - intensity: excess of mean daily Tmax over a threshold (°C-days style mean)
  - likelihood: stated event frequency over a fixed period (e.g. seasons/decade)

Exposure and vulnerability are NOT folded into the hazard score.
"""
from __future__ import annotations

from math import isclose


THRESHOLD_C = 40.0  # illustrative Tmax threshold (°C); pre-specified teaching value
PERIOD = "10 seasons"  # stated analysis period for likelihood


def mean_excess_intensity(tmax_series: list[float], threshold: float = THRESHOLD_C) -> float:
    """Mean positive excess of daily Tmax over threshold (°C). Empty/invalid fails."""
    if not tmax_series:
        raise ValueError("tmax_series must be non-empty")
    for t in tmax_series:
        if t is None or not isinstance(t, (int, float)):
            raise ValueError("tmax values must be numeric")
        if t < -90 or t > 70:
            raise ValueError(f"tmax out of plausible range: {t}")
    excesses = [max(0.0, float(t) - threshold) for t in tmax_series]
    return sum(excesses) / len(excesses)


def intensity_class(mean_excess: float) -> str:
    """Ordinal intensity band for screening tables (illustrative cut-points)."""
    if mean_excess < 0:
        raise ValueError("mean_excess cannot be negative")
    if mean_excess < 1.0:
        return "low"
    if mean_excess < 3.0:
        return "moderate"
    return "high"


def likelihood_class(events_per_period: float) -> str:
    """Ordinal likelihood from count of threshold-exceeding spells in PERIOD."""
    if events_per_period is None:
        raise ValueError("events_per_period required")
    if events_per_period < 0:
        raise ValueError("events_per_period cannot be negative")
    if events_per_period < 1:
        return "rare"
    if events_per_period < 4:
        return "occasional"
    return "frequent"


# Simple matrix: rows intensity low/mod/high, cols likelihood rare/occasional/frequent
# Values are ordinal ranks 1–5 for transparent screening — NOT damage probabilities.
SCREEN_MATRIX = {
    ("low", "rare"): 1,
    ("low", "occasional"): 2,
    ("low", "frequent"): 3,
    ("moderate", "rare"): 2,
    ("moderate", "occasional"): 3,
    ("moderate", "frequent"): 4,
    ("high", "rare"): 3,
    ("high", "occasional"): 4,
    ("high", "frequent"): 5,
}


def hazard_screen_score(tmax_series: list[float], events_per_period: float) -> dict:
    inten = mean_excess_intensity(tmax_series)
    i_cls = intensity_class(inten)
    l_cls = likelihood_class(events_per_period)
    score = SCREEN_MATRIX[(i_cls, l_cls)]
    return {
        "mean_excess_c": inten,
        "intensity_class": i_cls,
        "likelihood_class": l_cls,
        "screen_score": score,
        "period": PERIOD,
        "threshold_c": THRESHOLD_C,
        "is_calibrated_damage_probability": False,
        "includes_exposure_or_vulnerability": False,
    }


def main() -> None:
    # Synthetic district heat weeks (daily Tmax °C) — not station observations
    mild = [38.0, 39.0, 37.5, 38.5]  # below/near threshold
    hot = [42.0, 43.0, 41.0, 44.0]  # clear excess
    hotter = [45.0, 46.0, 44.5, 47.0]

    r_mild = hazard_screen_score(mild, events_per_period=0.5)
    r_hot = hazard_screen_score(hot, events_per_period=2.0)
    r_hot_freq = hazard_screen_score(hot, events_per_period=5.0)
    r_hotter = hazard_screen_score(hotter, events_per_period=2.0)

    # Greater intensity raises score when likelihood held fixed
    assert r_hotter["screen_score"] >= r_hot["screen_score"]
    assert r_hotter["mean_excess_c"] > r_hot["mean_excess_c"]

    # Greater frequency raises score when intensity held fixed
    assert r_hot_freq["screen_score"] > r_hot["screen_score"]

    # Mild series is low intensity
    assert r_mild["intensity_class"] == "low"
    assert isclose(r_mild["mean_excess_c"], 0.0, abs_tol=1e-12)

    # Explicit non-claims
    assert r_hot["is_calibrated_damage_probability"] is False
    assert r_hot["includes_exposure_or_vulnerability"] is False

    # Missing / invalid inputs fail
    try:
        mean_excess_intensity([])
        raise AssertionError("empty series must fail")
    except ValueError:
        pass
    try:
        mean_excess_intensity([40.0, None])  # type: ignore
        raise AssertionError("None tmax must fail")
    except ValueError:
        pass
    try:
        likelihood_class(-1)
        raise AssertionError("negative events must fail")
    except ValueError:
        pass

    # Hazard must not silently absorb exposure population counts
    # (API has no exposure argument — regression guard via signature keys)
    assert "population" not in r_hot
    assert "vulnerability" not in r_hot

    print(
        "Unit 7.3 heat-hazard checks passed "
        f"(mild={r_mild['screen_score']}, hot={r_hot['screen_score']}, "
        f"hot_freq={r_hot_freq['screen_score']}, hotter={r_hotter['screen_score']})."
    )


if __name__ == "__main__":
    main()
