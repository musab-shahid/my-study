"""Subject 13 Unit 13.6 external-review packet checks (stdlib).

Validates structure of an illustrative review-and-revision packet.
Does not constitute a genuine external review or scientific validation.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PACKET = ROOT.parent / "labs" / "portfolio" / "external_review_packet.json"

ALLOWED_DISPOSITIONS = {
    "accepted_change",
    "justified_rejection",
    "documented_limitation",
    "deferred",
}
ALLOWED_RELEASE = {"ready", "ready_with_limitations", "not_ready"}


def validate_packet(p: dict) -> list[str]:
    errs: list[str] = []
    if p.get("review_type") != "illustrative_scenario":
        errs.append("review_type_must_be_illustrative_scenario")
    disc = str(p.get("disclaimer", "")).lower()
    if "not" not in disc or "genuine" not in disc:
        errs.append("disclaimer_must_deny_genuine_review")

    brief = p.get("review_brief") or {}
    for k in ("research_question", "intended_use", "non_claims"):
        if not brief.get(k):
            errs.append(f"brief_missing:{k}")

    items = p.get("feedback_items") or []
    if len(items) < 2:
        errs.append("need_at_least_two_feedback_items")
    for i, it in enumerate(items):
        for k in ("id", "comment", "affected_claim_or_artifact", "severity", "disposition"):
            if not it.get(k):
                errs.append(f"feedback_incomplete:{i}:{k}")
        if it.get("disposition") not in ALLOWED_DISPOSITIONS:
            errs.append(f"bad_disposition:{i}:{it.get('disposition')}")

    rel = p.get("release_decision") or {}
    if rel.get("status") not in ALLOWED_RELEASE:
        errs.append("bad_release_status")
    if not rel.get("rationale"):
        errs.append("release_rationale_missing")

    # Critical: simulated packet must not claim genuine validation
    if p.get("claims_genuine_external_review") is True:
        errs.append("cannot_claim_genuine_external_review")
    if p.get("claims_scientific_validation") is True:
        errs.append("cannot_claim_scientific_validation")

    return errs


def main() -> None:
    if not PACKET.is_file():
        raise FileNotFoundError(f"missing_packet:{PACKET}")
    with PACKET.open(encoding="utf-8") as f:
        packet = json.load(f)
    errs = validate_packet(packet)
    assert errs == [], errs

    bad = {**packet, "review_type": "real"}
    assert "review_type_must_be_illustrative_scenario" in validate_packet(bad)
    bad2 = {**packet, "claims_genuine_external_review": True}
    assert "cannot_claim_genuine_external_review" in validate_packet(bad2)

    print(
        "Unit 13 external-review checks passed "
        f"(feedback_items={len(packet['feedback_items'])}, "
        f"release={packet['release_decision']['status']})."
    )


if __name__ == "__main__":
    main()
