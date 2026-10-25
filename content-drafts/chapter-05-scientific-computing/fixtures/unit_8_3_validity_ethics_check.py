"""Unit 8.3 validity, ethics and integrity checks (stdlib).

Does NOT grant institutional ethics approval.
"""
from __future__ import annotations

VALIDITY_TYPES = ("construct", "internal", "external", "statistical_conclusion")


def validate_validity_ethics(record: dict) -> list[str]:
    errs: list[str] = []
    for vt in VALIDITY_TYPES:
        key = f"addresses_{vt}_validity"
        if record.get(key) is not True:
            errs.append(f"missing_validity:{vt}")
    # Causal claim without design support
    if record.get("claims_causal") is True and not record.get("causal_design_justification"):
        errs.append("causal_claim_without_design")
    # Leakage as internal-validity threat for predictive studies
    if record.get("study_type") == "predictive" and record.get("acknowledges_leakage_risk") is not True:
        errs.append("predictive_must_acknowledge_leakage")
    # Sensitive geospatial
    if record.get("uses_sensitive_location_data") is True:
        if record.get("data_minimisation") is not True:
            errs.append("sensitive_location_requires_minimisation")
        if record.get("reidentification_risk_assessed") is not True:
            errs.append("sensitive_location_requires_reidentification_assessment")
    # Integrity
    if record.get("has_preanalysis_plan") is True and record.get("documents_deviations") is not True:
        errs.append("preanalysis_requires_deviation_documentation")
    if record.get("selective_outcome_reporting") is True:
        errs.append("selective_outcome_reporting_not_allowed")
    # Fixture is not IRB
    if record.get("claims_ethics_approval_via_this_check") is True:
        errs.append("fixture_is_not_institutional_ethics_approval")
    return errs


def main() -> None:
    bare = {}
    e = validate_validity_ethics(bare)
    assert "missing_validity:construct" in e
    assert "missing_validity:internal" in e

    causal_bad = {
        "addresses_construct_validity": True,
        "addresses_internal_validity": True,
        "addresses_external_validity": True,
        "addresses_statistical_conclusion_validity": True,
        "claims_causal": True,
        # no justification
    }
    assert "causal_claim_without_design" in validate_validity_ethics(causal_bad)

    pred_bad = {
        **{f"addresses_{v}_validity": True for v in VALIDITY_TYPES},
        "study_type": "predictive",
        "acknowledges_leakage_risk": False,
    }
    assert "predictive_must_acknowledge_leakage" in validate_validity_ethics(pred_bad)

    sens_bad = {
        **{f"addresses_{v}_validity": True for v in VALIDITY_TYPES},
        "uses_sensitive_location_data": True,
        "data_minimisation": False,
        "reidentification_risk_assessed": False,
    }
    e3 = validate_validity_ethics(sens_bad)
    assert "sensitive_location_requires_minimisation" in e3

    irb_bad = {
        **{f"addresses_{v}_validity": True for v in VALIDITY_TYPES},
        "claims_ethics_approval_via_this_check": True,
    }
    assert "fixture_is_not_institutional_ethics_approval" in validate_validity_ethics(irb_bad)

    ok = {
        **{f"addresses_{v}_validity": True for v in VALIDITY_TYPES},
        "study_type": "predictive",
        "acknowledges_leakage_risk": True,
        "claims_causal": False,
        "uses_sensitive_location_data": False,
        "has_preanalysis_plan": True,
        "documents_deviations": True,
        "selective_outcome_reporting": False,
        "claims_ethics_approval_via_this_check": False,
    }
    assert validate_validity_ethics(ok) == []

    print("Unit 8.3 validity/ethics checks passed.")


if __name__ == "__main__":
    main()
