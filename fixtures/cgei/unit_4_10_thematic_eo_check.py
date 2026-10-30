"""Unit 4.10 thematic EO applications teaching checks (stdlib).

Method-selection and overclaim rejection — synthetic, not real product runs.

1) Recommend a method family for a stated question
2) Reject invalid inferences (proxy ≠ target)
3) Deterministic decision table
"""
from __future__ import annotations

# question_id -> (allowed_methods, forbidden_claims)
RULES = {
    "flood_cloudy_urban": {
        "allowed": {"sar_flood_mapping", "sar_change_detection"},
        "forbidden": {"optical_only_mndwi", "extent_equals_depth", "hotspot_counts_as_flood"},
    },
    "yield_from_ndvi": {
        "allowed": {"crop_model_with_validation", "multi_evidence_yield_proxy"},
        "forbidden": {"ndvi_equals_yield", "single_date_ndvi_map"},
    },
    "pm25_from_aod": {
        "allowed": {"aod_pm_model_spatial_cv"},
        "forbidden": {"aod_equals_personal_exposure", "column_equals_surface"},
    },
    "snow_storage": {
        "allowed": {"swe_product_or_model", "snow_course_validation"},
        "forbidden": {"ndsi_equals_swe"},
    },
    "subsidence_cause": {
        "allowed": {"insar_plus_well_levels"},
        "forbidden": {"insar_map_alone_proves_pumping", "los_equals_vertical_always"},
    },
}


def evaluate(question_id: str, chosen_method: str, claim: str) -> dict:
    if question_id not in RULES:
        raise ValueError(f"unknown question {question_id}")
    r = RULES[question_id]
    method_ok = chosen_method in r["allowed"]
    claim_bad = claim in r["forbidden"]
    return {
        "question_id": question_id,
        "method_ok": method_ok,
        "claim_rejected": claim_bad,
        "pass": method_ok and claim_bad,  # must pick good method AND reject bad claim
    }


def main() -> None:
    cases = [
        ("flood_cloudy_urban", "sar_flood_mapping", "extent_equals_depth"),
        ("yield_from_ndvi", "crop_model_with_validation", "ndvi_equals_yield"),
        ("pm25_from_aod", "aod_pm_model_spatial_cv", "aod_equals_personal_exposure"),
        ("snow_storage", "swe_product_or_model", "ndsi_equals_swe"),
        ("subsidence_cause", "insar_plus_well_levels", "insar_map_alone_proves_pumping"),
    ]
    results = [evaluate(*c) for c in cases]
    assert all(r["pass"] for r in results)

    # Negative: bad method should fail
    bad = evaluate("flood_cloudy_urban", "optical_only_mndwi", "extent_equals_depth")
    assert bad["method_ok"] is False

    try:
        evaluate("not_a_question", "x", "y")
        raise AssertionError("expected unknown question failure")
    except ValueError:
        pass

    print(
        "Unit 4.10 thematic EO checks passed "
        f"(cases={len(results)}, all_guardrails_ok, bad_method_rejected)."
    )


if __name__ == "__main__":
    main()
