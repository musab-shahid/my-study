"""Unit 8.6 scientific reporting section checks (stdlib)."""
from __future__ import annotations

from typing import Any

REQUIRED_SECTIONS = (
    "research_question",
    "estimand",
    "measurement_and_sampling",
    "validity_and_ethics",
    "uncertainty_and_limitations",
    "data_and_code_availability",
    "non_claims",
)


def _is_nonempty_str(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def validate_non_claims(value: Any) -> list[str]:
    """Accept a non-empty string or a non-empty list of non-empty strings.

    Reject missing/blank values, empty lists, lists with blank entries, and
    unsupported types (numbers, bools, dicts, None). Does not require specific
    vocabulary—only structural presence of meaningful text.
    """
    errs: list[str] = []
    if value is None:
        errs.append("non_claims_missing")
        return errs
    if isinstance(value, str):
        if not value.strip():
            errs.append("non_claims_blank")
        return errs
    if isinstance(value, list):
        if len(value) < 1:
            errs.append("non_claims_empty_list")
            return errs
        for i, item in enumerate(value):
            if not _is_nonempty_str(item):
                errs.append(f"non_claims_invalid_item:{i}")
        return errs
    errs.append(f"non_claims_unsupported_type:{type(value).__name__}")
    return errs


def validate_report(report: dict) -> list[str]:
    errs: list[str] = []
    for k in REQUIRED_SECTIONS:
        if k == "non_claims":
            continue
        v = report.get(k)
        if v is None or (isinstance(v, str) and not str(v).strip()):
            errs.append(f"missing_section:{k}")
    errs.extend(validate_non_claims(report.get("non_claims")))
    if report.get("claims_external_validation") is True:
        errs.append("must_not_claim_external_validation_without_evidence")
    return errs


def main() -> None:
    bare = {"research_question": "Heat patterns?"}
    e = validate_report(bare)
    assert "missing_section:estimand" in e
    assert "non_claims_missing" in e

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

    ok_str = {**ok, "non_claims": "Does not claim causal policy effect or external validation."}
    assert validate_report(ok_str) == []

    # non_claims structural negatives
    assert "non_claims_missing" in validate_non_claims(None)
    assert "non_claims_blank" in validate_non_claims("")
    assert "non_claims_blank" in validate_non_claims("   ")
    assert "non_claims_empty_list" in validate_non_claims([])
    assert "non_claims_invalid_item:1" in validate_non_claims(["ok", "  "])
    assert "non_claims_invalid_item:0" in validate_non_claims([42])
    assert "non_claims_unsupported_type:int" in validate_non_claims(3)
    assert "non_claims_unsupported_type:bool" in validate_non_claims(True)
    assert "non_claims_unsupported_type:dict" in validate_non_claims({"a": 1})

    bad = {**ok, "claims_external_validation": True}
    assert "must_not_claim_external_validation_without_evidence" in validate_report(bad)

    print("Unit 8.6 reporting checks passed.")


if __name__ == "__main__":
    main()
