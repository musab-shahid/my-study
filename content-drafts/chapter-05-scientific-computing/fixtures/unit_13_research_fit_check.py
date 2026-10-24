"""Subject 13 Unit 13.5 research-fit preparation checks (stdlib).

Validates a research-fit evidence card structure used for graduate-study
preparation. Does not contact universities, verify funding, or claim offers.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CARD = ROOT.parent / "labs" / "portfolio" / "research_fit_evidence.json"

REQUIRED = (
    "research_interest_statement",
    "capstone_evidence",
    "skill_map",
    "application_checklist",
    "supervisor_enquiry_checklist",
    "funding_process_notes",
    "non_claims",
)


def validate_card(card: dict) -> list[str]:
    errs: list[str] = []
    for key in REQUIRED:
        if not card.get(key):
            errs.append(f"missing:{key}")

    stmt = str(card.get("research_interest_statement", ""))
    if len(stmt) < 40:
        errs.append("interest_statement_too_short")

    skills = card.get("skill_map") or []
    if not isinstance(skills, list) or len(skills) < 1:
        errs.append("skill_map_empty")
    for i, s in enumerate(skills):
        for k in ("skill", "evidence", "gap", "priority"):
            if not s.get(k):
                errs.append(f"skill_incomplete:{i}:{k}")

    caps = card.get("capstone_evidence") or {}
    if not caps.get("methods_demonstrated"):
        errs.append("missing_capstone_methods")
    if not caps.get("limitations_owned"):
        errs.append("missing_capstone_limitations")

    non = set(card.get("non_claims") or [])
    required_non = {
        "not_an_admission_offer",
        "not_a_funding_award",
        "not_supervisor_commitment",
    }
    if not required_non.issubset(non):
        errs.append("non_claims_incomplete")

    if card.get("claims_admission_or_funding") is True:
        errs.append("cannot_claim_admission_or_funding")

    enquiry = card.get("supervisor_enquiry_checklist") or []
    if len(enquiry) < 3:
        errs.append("enquiry_checklist_too_short")

    actions = card.get("next_actions") or []
    if len(actions) < 1:
        errs.append("next_actions_missing")

    return errs


def main() -> None:
    if not CARD.is_file():
        raise FileNotFoundError(f"missing_card:{CARD}")
    with CARD.open(encoding="utf-8") as f:
        card = json.load(f)
    errs = validate_card(card)
    assert errs == [], errs

    bad = {**card, "non_claims": []}
    assert "non_claims_incomplete" in validate_card(bad)
    bad2 = {**card, "claims_admission_or_funding": True}
    assert "cannot_claim_admission_or_funding" in validate_card(bad2)
    bad3 = {**card, "skill_map": [{"skill": "x"}]}
    assert any(e.startswith("skill_incomplete") for e in validate_card(bad3))

    print(
        "Unit 13 research-fit checks passed "
        f"(skills={len(card['skill_map'])}, "
        f"methods={len(card['capstone_evidence']['methods_demonstrated'])})."
    )


if __name__ == "__main__":
    main()
