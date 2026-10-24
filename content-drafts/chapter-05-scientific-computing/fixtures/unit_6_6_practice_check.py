"""Unit 6.6 environmental ML practice-pack checks (stdlib)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPORT = ROOT.parent / "labs" / "portfolio" / "env_ml_practice_report.json"
REQUIRED_TOP = (
    "problem_framing",
    "data",
    "baseline",
    "evaluation",
    "reproducibility",
    "model_card",
    "pitfalls_acknowledged",
)


def validate(report: dict) -> list[str]:
    errs: list[str] = []
    for k in REQUIRED_TOP:
        if not report.get(k):
            errs.append(f"missing:{k}")
    data = report.get("data") or {}
    if data.get("synthetic") is not True:
        errs.append("must_label_synthetic")
    if data.get("not_multan") is not True:
        errs.append("must_disclaim_multan")
    if "heat_exceed" not in (data.get("excluded_from_features") or []):
        errs.append("target_must_be_excluded_from_features")
    if (report.get("evaluation") or {}).get("holdout_used_for_selection") is True:
        errs.append("holdout_must_not_select_models")
    if (report.get("evaluation") or {}).get("train_only_preprocessing") is not True:
        errs.append("preprocessing_must_be_train_only")
    card = report.get("model_card") or {}
    for k in ("intended_use", "out_of_scope", "limitations", "next_validation_steps"):
        if not card.get(k):
            errs.append(f"model_card_missing:{k}")
    pitfalls = set(report.get("pitfalls_acknowledged") or [])
    for p in ("random_pixel_cv_inflation", "target_proxy_leakage", "overclaiming_transferability"):
        if p not in pitfalls:
            errs.append(f"pitfall_missing:{p}")
    cmds = (report.get("reproducibility") or {}).get("commands") or []
    if len(cmds) < 3:
        errs.append("repro_commands_incomplete")
    # Prefer full Core spine when present
    joined = "\n".join(cmds)
    for must in ("unit_6_1_learning_problem", "unit_6_4_leakage", "unit_6_7_eo_deep"):
        if must not in joined:
            errs.append(f"core_spine_incomplete:{must}")
    return errs


def main() -> None:
    if not REPORT.is_file():
        raise FileNotFoundError(f"missing_report:{REPORT}")
    report = json.loads(REPORT.read_text(encoding="utf-8"))
    errs = validate(report)
    assert errs == [], errs

    bad = {**report, "data": {**report["data"], "synthetic": False}}
    assert "must_label_synthetic" in validate(bad)

    print(
        "Unit 6.6 practice checks passed "
        f"(pitfalls={len(report['pitfalls_acknowledged'])}, "
        f"commands={len(report['reproducibility']['commands'])})."
    )


if __name__ == "__main__":
    main()
