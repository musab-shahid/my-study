"""Unit 8.6 scientific reporting section checks (stdlib)."""
from __future__ import annotations

REQUIRED_SECTIONS = (
    "research_question",
    "estimand",
    "measurement_and_sampling",
    "validity_and_ethics",
    "uncertainty_and_limitations",
    "data_and_code_availability",
    "non_claims",
)


def validate_report(report: dict) -> list[str]:
    errs: list[str] = []
    for k in REQUIRED_SECTIONS:
        v = report.get(k)
        if v is None or (isinstance(v, str) and not str(v).strip()):
            errs.append(f"missing_section:{k}")
    nc = report.get("non_claims")
    if isinstance(nc, list):
        if len(nc) < 1:
            errs.append("non_claims_empty")
    elif isinstance(nc, str) and "causal" not in nc.lower() and "not" not in nc.lower():
        # soft: still require non-empty handled above
        pass
    if report.get("claims_external_validation") is True:
        errs.append("must_not_claim_external_validation_without_evidence")
    return errs


def main() -> None:
    bare = {"research_question": "Heat patterns?"}
    e = validate_report(bare)
    assert "missing_section:estimand" in e
    assert "missing_section:non_claims" in e

    ok = {
        "research_question": "How do summer parcel LST values differ by roof type in City X industrial belt?",
        "estimand": "Difference in mean JJA peak LST (°C) between green-roof and conventional parcels",
        "measurement_and_sampling": "MODIS LST proxy; non-probability cloud-free parcels; no population inference",
        "validity_and_ethics": "Confounding by building age; leakage if post-outcome masks used; no sensitive GPS",
        "uncertainty_and_limitations": "Spatial dependence; sensor bias; small n",
        "data_and_code_availability": "Synthetic teaching tables in repo fixtures/",
        "non_claims": ["Not causal policy effect", "Not Multan validation", "Not IRB approval"],
        "claims_external_validation": False,
    }
    assert validate_report(ok) == []

    bad = {**ok, "claims_external_validation": True}
    assert "must_not_claim_external_validation_without_evidence" in validate_report(bad)

    print("Unit 8.6 reporting checks passed.")


if __name__ == "__main__":
    main()
