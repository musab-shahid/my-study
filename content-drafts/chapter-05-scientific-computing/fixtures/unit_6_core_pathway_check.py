"""Subject 6 Core pathway integrity (stdlib).

Ensures Units 6.1–6.7 fixtures exist and the practice report lists the full
offline command spine. Does not claim real-EO validation or Support 6.8–6.9.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPORT = ROOT.parent / "labs" / "portfolio" / "env_ml_practice_report.json"

CORE_FIXTURES = [
    "unit_6_1_learning_problem_check.py",
    "unit_6_2_feature_prep_check.py",
    "unit_6_3_core_algorithms_check.py",
    "unit_6_4_leakage_split_check.py",
    "unit_6_5_interpretation_check.py",
    "unit_6_6_practice_check.py",
    "unit_6_7_eo_deep_learning_check.py",
]


def main() -> None:
    missing = [name for name in CORE_FIXTURES if not (ROOT / name).is_file()]
    assert not missing, f"missing_core_fixtures:{missing}"

    report = json.loads(REPORT.read_text(encoding="utf-8"))
    cmds = "\n".join((report.get("reproducibility") or {}).get("commands") or [])
    for name in CORE_FIXTURES:
        assert name in cmds, f"practice_report_missing_command:{name}"

    path = report.get("core_pathway") or {}
    units = path.get("units") or []
    assert units == ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"], units
    assert "6.8" in (path.get("support_deferred") or [])
    assert "6.9" in (path.get("support_deferred") or [])

    # Synthetic discipline retained
    assert (report.get("data") or {}).get("synthetic") is True
    assert (report.get("data") or {}).get("not_multan") is True

    print(
        "Unit 6 Core pathway checks passed "
        f"(fixtures={len(CORE_FIXTURES)}, support_deferred=6.8-6.9)."
    )


if __name__ == "__main__":
    main()
