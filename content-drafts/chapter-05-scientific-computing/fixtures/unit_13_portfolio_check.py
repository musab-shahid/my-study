"""Subject 13 Unit 13.3 portfolio-engineering checks (stdlib).

Validates a portfolio evidence card for the heat-screening capstone:
required narrative fields, path A/B/C evidence distinction, non-claims,
and reproduction instructions. Does not evaluate scientific validity.
"""
from __future__ import annotations

from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent
TEMPLATE = ROOT.parent / "labs" / "portfolio" / "capstone_portfolio_evidence.json"

REQUIRED_FIELDS = (
    "project_title",
    "research_question",
    "study_area_label",
    "audience",
    "data_inventory",
    "method_summary",
    "key_results",
    "limitations",
    "reproduction_steps",
    "evidence_paths",
    "non_claims",
    "licence_note",
)


def validate_portfolio(card: dict) -> list[str]:
    errs: list[str] = []
    for key in REQUIRED_FIELDS:
        val = card.get(key)
        if val is None or val == "" or val == [] or val == {}:
            errs.append(f"missing:{key}")

    inv = card.get("data_inventory") or []
    if isinstance(inv, list):
        for i, item in enumerate(inv):
            for k in ("source", "version_or_label", "role", "synthetic_or_real"):
                if not item.get(k):
                    errs.append(f"inventory_incomplete:{i}:{k}")
            label = str(item.get("synthetic_or_real", "")).lower()
            if label not in ("synthetic", "teaching_extract", "genuine_remote", "public_boundary"):
                errs.append(f"inventory_label_invalid:{i}:{label}")

    paths = card.get("evidence_paths") or {}
    for required in ("path_a_synthetic", "path_b_public_extract", "path_c_modis_logic"):
        if not paths.get(required):
            errs.append(f"missing_evidence_path:{required}")

    non = card.get("non_claims") or []
    required_non = {
        "not_calibrated_health_risk",
        "not_operational_forecast",
        "lst_not_air_temperature",
    }
    if not required_non.issubset(set(non)):
        errs.append("non_claims_incomplete")

    if card.get("claims_genuine_multan_granule_processed") is True:
        # Only allowed if explicit evidence hash present
        if not card.get("genuine_granule_sha256"):
            errs.append("genuine_granule_claim_without_checksum")


    rel = card.get("related_projects")
    if isinstance(rel, dict):
        for slot in ("geospatial_or_remote_sensing_slot", "ml_or_geoai_slot"):
            s = rel.get(slot) or {}
            if s.get("status") == "completed" and not s.get("repo_or_path"):
                errs.append(f"related_project_completed_without_path:{slot}")
    return errs


def main() -> None:
    if not TEMPLATE.is_file():
        raise FileNotFoundError(f"missing_portfolio_template:{TEMPLATE}")
    with TEMPLATE.open(encoding="utf-8") as f:
        card = json.load(f)

    errs = validate_portfolio(card)
    assert errs == [], errs

    # Negative cases
    bad = {**card, "limitations": ""}
    assert "missing:limitations" in validate_portfolio(bad)
    bad2 = {**card, "claims_genuine_multan_granule_processed": True, "genuine_granule_sha256": ""}
    assert "genuine_granule_claim_without_checksum" in validate_portfolio(bad2)
    bad3 = {**card, "non_claims": ["not_operational_forecast"]}
    assert "non_claims_incomplete" in validate_portfolio(bad3)

    print(
        "Unit 13 portfolio checks passed "
        f"(inventory_items={len(card['data_inventory'])}, "
        f"non_claims={len(card['non_claims'])})."
    )


if __name__ == "__main__":
    main()
