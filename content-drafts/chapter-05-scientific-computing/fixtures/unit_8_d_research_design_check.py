"""Unit 8.D research design mastery checks (stdlib)."""
from __future__ import annotations

REQUIRED = ("estimand", "unit_of_analysis", "data", "validation", "non_claim")


def validate_design(d: dict) -> list[str]:
    errs = []
    for k in REQUIRED:
        v = d.get(k)
        if not isinstance(v, str) or len(v.strip()) < 15:
            errs.append(f"weak_or_missing_{k}")
    if d.get("labels_synthetic_as_field"):
        errs.append("synthetic_labelled_as_field")
    non = (d.get("non_claim") or "").lower()
    if "causal" not in non and "not" not in non and "cannot" not in non:
        errs.append("non_claim_should_bound_interpretation")
    return errs


def main() -> None:
    good = {
        "estimand": "Mean clear-sky Landsat ST difference between defined urban core and rural reference in JJA 2018–2022.",
        "unit_of_analysis": "30 m Landsat pixels aggregated to urban/rural masks",
        "data": "Landsat Collection 2 Level-2 ST; urban/rural polygons; optional station air temperature",
        "validation": "Compare to available station air temperature with explicit temporal match rules; report coverage",
        "non_claim": "We do not claim causal effects of green cover or city-wide canopy UHI from LST alone.",
        "labels_synthetic_as_field": False,
    }
    bad = {
        "estimand": "heat",
        "unit_of_analysis": "pixels",
        "data": "satellite",
        "validation": "looks good",
        "non_claim": "n/a",
        "labels_synthetic_as_field": True,
    }
    assert validate_design(good) == []
    errs = validate_design(bad)
    assert errs
    print(f"Unit 8.D research design checks passed (bad_errs={len(errs)}).")


if __name__ == "__main__":
    main()
