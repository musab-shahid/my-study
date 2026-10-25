"""Unit 8.9 proposal readiness checks (stdlib)."""
from __future__ import annotations

REQUIRED = (
    "problem", "gap", "objectives", "methods", "feasibility", "timeline", "ethics",
)


def validate_proposal(p: dict) -> list[str]:
    errs = []
    for k in REQUIRED:
        v = p.get(k)
        if not isinstance(v, str) or len(v.strip()) < 12:
            errs.append(f"weak_or_missing_{k}")
    risks = p.get("risks")
    if not isinstance(risks, list) or len(risks) < 1:
        errs.append("need_at_least_one_risk")
    methods = (p.get("methods") or "").lower()
    if "python" in methods and "validation" not in methods and "sensitivity" not in methods:
        if len(methods) < 40:
            errs.append("methods_looks_like_tool_list")
    if p.get("claims_empirical") and "validation" not in methods:
        errs.append("empirical_claim_without_validation_language")
    return errs


def main() -> None:
    good = {
        "problem": "Urban heat exposure is poorly quantified for Multan decision support.",
        "gap": "Prior South Asian SUHI studies rarely report reference sensitivity and validation design together.",
        "objectives": "Quantify SUHII sensitivity to rural reference choice and report validation limits.",
        "methods": "Landsat Collection 2 ST workflow with QA filtering, reference sensitivity, and independent air-temperature validation where available.",
        "feasibility": "Open Landsat data; limited in-situ stations; desktop compute only.",
        "timeline": "Six months: data prep, analysis, sensitivity, write-up.",
        "ethics": "No human subjects; open data licences respected; no identifiable private locations published.",
        "risks": ["Sparse in-situ validation data"],
        "claims_empirical": True,
    }
    bad = {
        "problem": "heat",
        "gap": "gap",
        "objectives": "do ML",
        "methods": "Python QGIS",
        "feasibility": "ok",
        "timeline": "soon",
        "ethics": "n/a",
        "risks": [],
        "claims_empirical": True,
    }
    assert validate_proposal(good) == []
    errs = validate_proposal(bad)
    assert errs
    print(f"Unit 8.9 proposal readiness checks passed (bad_errs={len(errs)}).")


if __name__ == "__main__":
    main()
