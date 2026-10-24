"""Subject 13 Core reproduction-protocol checks (stdlib).

Verifies the unified protocol doc references existing path scripts and that
the independent self-review record is honestly labelled.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
LABS = ROOT.parent / "labs"
PROTOCOL = LABS / "unit-13-core-reproduction-protocol.md"
RECORD = LABS / "portfolio" / "independent_repro_record.json"

REQUIRED_SCRIPTS = [
    "unit_13_capstone_heat_risk_check.py",
    "unit_13_public_data_pathway_check.py",
    "unit_13_modis_local_process_check.py",
    "unit_13_portfolio_check.py",
    "unit_13_research_fit_check.py",
    "unit_13_external_review_check.py",
]


def main() -> None:
    if not PROTOCOL.is_file():
        raise FileNotFoundError(f"missing_protocol:{PROTOCOL}")
    text = PROTOCOL.read_text(encoding="utf-8")
    for name in REQUIRED_SCRIPTS:
        if name not in text:
            raise AssertionError(f"protocol_missing_script_ref:{name}")
        path = ROOT / name
        if not path.is_file():
            raise AssertionError(f"script_missing_on_disk:{name}")

    for token in (
        "synthetic_city_grid",
        "Non-claims",
        "Independent reproducibility checklist",
        "not a NASA HDF",
    ):
        if token not in text:
            raise AssertionError(f"protocol_missing_token:{token}")

    if not RECORD.is_file():
        raise FileNotFoundError(f"missing_repro_record:{RECORD}")
    rec = json.loads(RECORD.read_text(encoding="utf-8"))
    if rec.get("reviewer_mode") != "self_review":
        raise AssertionError("repro_record_must_be_self_review")
    disc = str(rec.get("disclaimer", "")).lower()
    if "not" not in disc or "independent" not in disc:
        raise AssertionError("repro_record_disclaimer_weak")
    checks = rec.get("checks") or []
    if len(checks) < 5:
        raise AssertionError("repro_record_too_few_checks")
    unresolved = rec.get("unresolved") or []
    if not unresolved:
        raise AssertionError("repro_record_must_list_unresolved")

    print(
        "Unit 13 Core repro-protocol checks passed "
        f"(scripts={len(REQUIRED_SCRIPTS)}, self_checks={len(checks)})."
    )


if __name__ == "__main__":
    main()
