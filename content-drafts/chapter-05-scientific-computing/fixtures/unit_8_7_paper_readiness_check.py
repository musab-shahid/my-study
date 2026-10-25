"""Unit 8.7 paper-readiness teaching checks (stdlib).

Validates contribution-statement structure: exactly one primary pillar.
Not a peer-review or journal submission.
"""
from __future__ import annotations

PRIMARY = {"methods_sensitivity", "validation", "regional_evidence"}


def validate_contribution(stmt: dict) -> list[str]:
    errs = []
    primary = stmt.get("primary_contribution")
    if primary not in PRIMARY:
        errs.append("primary_contribution_must_be_one_of_" + "|".join(sorted(PRIMARY)))
    extras = stmt.get("also_claim_as_primary", [])
    if extras:
        errs.append("multiple_primary_claims_not_allowed")
    priors = stmt.get("prior_study_themes", [])
    if not isinstance(priors, list) or len(priors) < 3:
        errs.append("need_at_least_three_prior_themes")
    if stmt.get("claims_synthetic_as_field"):
        errs.append("synthetic_must_not_be_labelled_field")
    return errs


def main() -> None:
    good = {
        "primary_contribution": "validation",
        "also_claim_as_primary": [],
        "prior_study_themes": ["South Asian UHI", "Landsat LST", "LCZ mapping"],
        "claims_synthetic_as_field": False,
    }
    bad = {
        "primary_contribution": "methods_sensitivity",
        "also_claim_as_primary": ["validation", "regional_evidence"],
        "prior_study_themes": ["UHI"],
        "claims_synthetic_as_field": True,
    }
    assert validate_contribution(good) == []
    errs = validate_contribution(bad)
    assert "multiple_primary_claims_not_allowed" in errs
    assert "need_at_least_three_prior_themes" in errs
    assert "synthetic_must_not_be_labelled_field" in errs
    print(
        "Unit 8.7 paper-readiness checks passed "
        f"(good_ok, bad_errs={len(errs)})."
    )


if __name__ == "__main__":
    main()
