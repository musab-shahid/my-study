"""Subject 8 Unit 8.1 research-protocol teaching checks (stdlib).

Validates a minimal protocol completeness contract:
- required fields present
- estimand distinct from vague interest / question
- unit of analysis, population, time horizon declared
- confirmatory work requires pre-analysis plan and deviation-log field
- non-empty deviation entries must name what changed
- exploratory work must not claim confirmatory certainty

Synthetic protocol records only — not institutional ethics review or preregistration authority.
"""
from __future__ import annotations


REQUIRED = (
    "research_question",
    "estimand",
    "unit_of_analysis",
    "population",
    "time_horizon",
    "design_type",  # exploratory | confirmatory
)


def validate_protocol(protocol: dict) -> list[str]:
    errors: list[str] = []
    for key in REQUIRED:
        val = protocol.get(key)
        if val is None or (isinstance(val, str) and not val.strip()):
            errors.append(f"missing:{key}")

    rq = (protocol.get("research_question") or "").strip()
    est = (protocol.get("estimand") or "").strip()
    if rq and est and rq.lower() == est.lower():
        errors.append("estimand_not_distinct_from_question")

    if protocol.get("design_type") == "confirmatory":
        if not protocol.get("preanalysis_plan"):
            errors.append("confirmatory_requires_preanalysis_plan")
        if protocol.get("plan_deviations") is None:
            errors.append("confirmatory_requires_deviation_log_field")

    # Deviation entries: list of non-empty strings or dicts with "change"
    devs = protocol.get("plan_deviations")
    if isinstance(devs, list):
        for i, d in enumerate(devs):
            if isinstance(d, str):
                if not d.strip():
                    errors.append(f"deviation_blank:{i}")
            elif isinstance(d, dict):
                if not str(d.get("change") or "").strip():
                    errors.append(f"deviation_missing_change:{i}")
            else:
                errors.append(f"deviation_bad_type:{i}")
    elif devs is not None:
        errors.append("plan_deviations_must_be_list_or_none")

    if protocol.get("design_type") == "exploratory" and protocol.get("claims_confirmatory_certainty") is True:
        errors.append("exploratory_cannot_claim_confirmatory_certainty")

    return errors


def main() -> None:
    incomplete = {"research_question": "How does heat affect cities?"}
    errs = validate_protocol(incomplete)
    assert "missing:estimand" in errs
    assert "missing:unit_of_analysis" in errs

    vague = {
        "research_question": "Heat risk in City X",
        "estimand": "Heat risk in City X",
        "unit_of_analysis": "neighbourhood",
        "population": "residents of City X",
        "time_horizon": "2015–2024 summers",
        "design_type": "exploratory",
    }
    assert "estimand_not_distinct_from_question" in validate_protocol(vague)

    confirmatory_bad = {
        "research_question": "Does a green-roof programme associate with lower peak LST?",
        "estimand": "Difference in mean summer peak LST (°C) between treated and matched untreated parcels",
        "unit_of_analysis": "parcel",
        "population": "parcels in City X industrial belt",
        "time_horizon": "2018–2023",
        "design_type": "confirmatory",
    }
    e2 = validate_protocol(confirmatory_bad)
    assert "confirmatory_requires_preanalysis_plan" in e2
    assert "confirmatory_requires_deviation_log_field" in e2

    blank_dev = {
        "research_question": "Does a green-roof programme associate with lower peak LST?",
        "estimand": "Difference in mean summer peak LST (°C) between treated and matched untreated parcels",
        "unit_of_analysis": "parcel",
        "population": "parcels in City X industrial belt",
        "time_horizon": "2018–2023",
        "design_type": "confirmatory",
        "preanalysis_plan": "pap_v1.md",
        "plan_deviations": [""],
    }
    assert "deviation_blank:0" in validate_protocol(blank_dev)

    exploratory_overclaim = {
        "research_question": "Patterns of drought indices across districts",
        "estimand": "Spearman rank correlation between SPI-3 and maize yield anomaly by district-year",
        "unit_of_analysis": "district-year",
        "population": "agricultural districts in Region Y",
        "time_horizon": "2000–2020",
        "design_type": "exploratory",
        "claims_confirmatory_certainty": True,
    }
    assert "exploratory_cannot_claim_confirmatory_certainty" in validate_protocol(exploratory_overclaim)

    good = {
        "research_question": "Is a green-roof programme associated with lower peak LST after matching on building class?",
        "estimand": "Average difference in mean summer peak LST (°C) between treated and matched untreated parcels",
        "unit_of_analysis": "parcel",
        "population": "parcels in City X industrial belt",
        "time_horizon": "2018–2023",
        "design_type": "confirmatory",
        "preanalysis_plan": "pap_v1.md",
        "plan_deviations": [
            {"change": "Excluded 12 parcels with missing 2021 LST after QA failure; documented before unblinding outcomes."}
        ],
        "claims_confirmatory_certainty": False,
    }
    assert validate_protocol(good) == []

    print("Unit 8 research-protocol checks passed.")


if __name__ == "__main__":
    main()
