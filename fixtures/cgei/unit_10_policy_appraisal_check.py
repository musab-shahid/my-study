"""Subject 10 policy-appraisal teaching checks (stdlib).

Validates:
1) Policy instrument card required fields
2) Ex-ante appraisal vs ex-post evaluation distinction flag
3) Discount-rate sensitivity of a simple social-cost-style present value
4) Distribution note required when equity is claimed

Synthetic numbers only — not Pakistan NDC verification or official SCC.
"""
from __future__ import annotations

from math import isclose


REQUIRED_INSTRUMENT = (
    "instrument_type",  # regulation | tax | subsidy | trading | information | investment
    "objective",
    "target_sector",
    "responsible_authority",
    "indicator",
    "baseline",
    "uncertainty_note",
)


def validate_instrument_card(card: dict) -> list[str]:
    errors: list[str] = []
    for key in REQUIRED_INSTRUMENT:
        val = card.get(key)
        if val is None or (isinstance(val, str) and not val.strip()):
            errors.append(f"missing:{key}")

    phase = card.get("evaluation_phase")
    if phase not in ("ex_ante", "ex_post"):
        errors.append("evaluation_phase_must_be_ex_ante_or_ex_post")

    if card.get("claims_equity_benefit") is True and not card.get("distribution_note"):
        errors.append("equity_claim_requires_distribution_note")

    if card.get("claims_causal_impact") is True and phase == "ex_ante":
        errors.append("ex_ante_cannot_claim_causal_impact")

    return errors


def present_value(stream: list[float], discount_rate: float) -> float:
    if discount_rate < 0:
        raise ValueError("discount_rate must be non-negative")
    return sum(v / ((1 + discount_rate) ** t) for t, v in enumerate(stream))


def main() -> None:
    incomplete = {"instrument_type": "subsidy"}
    e = validate_instrument_card(incomplete)
    assert "missing:objective" in e
    assert "evaluation_phase_must_be_ex_ante_or_ex_post" in e

    overclaim = {
        "instrument_type": "regulation",
        "objective": "Reduce heat-related hospitalisations",
        "target_sector": "urban housing",
        "responsible_authority": "city authority (synthetic)",
        "indicator": "hospitalisations per 100k during heat spells",
        "baseline": "2015–2019 mean",
        "uncertainty_note": "Attribution to policy not established",
        "evaluation_phase": "ex_ante",
        "claims_causal_impact": True,
        "claims_equity_benefit": True,
        # missing distribution_note
    }
    e2 = validate_instrument_card(overclaim)
    assert "ex_ante_cannot_claim_causal_impact" in e2
    assert "equity_claim_requires_distribution_note" in e2

    good = {
        "instrument_type": "investment",
        "objective": "Expand shaded outdoor worker rest areas",
        "target_sector": "informal outdoor work",
        "responsible_authority": "municipal labour + health units (synthetic)",
        "indicator": "share of high-exposure sites with accessible shade/water within 500 m",
        "baseline": "2022 facility inventory (synthetic)",
        "uncertainty_note": "Health outcome link is indirect; monitor intermediate access metrics first",
        "evaluation_phase": "ex_ante",
        "claims_causal_impact": False,
        "claims_equity_benefit": True,
        "distribution_note": "Prioritise informal sites in heat islands; track gender and occupation of users",
    }
    assert validate_instrument_card(good) == []

    # Synthetic damage stream sensitivity to discount rate
    stream = [100.0, 100.0, 100.0, 100.0, 100.0]  # teaching units
    pv_low = present_value(stream, 0.02)
    pv_high = present_value(stream, 0.07)
    assert pv_low > pv_high
    assert isclose(pv_low, sum(100 / (1.02**t) for t in range(5)), abs_tol=1e-9)

    try:
        present_value([1.0], -0.1)
        raise AssertionError("expected failure")
    except ValueError:
        pass

    print(
        "Unit 10 policy-appraisal checks passed "
        f"(PV@2%={pv_low:.2f}, PV@7%={pv_high:.2f})."
    )


if __name__ == "__main__":
    main()
