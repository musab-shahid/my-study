"""Unit 8.D integrated research-exit package checks (stdlib).

Validates a single learner-produced package object that ties together:
  design (estimand), methods, validity, reproducibility, and non-claims.

Does NOT grant institutional ethics approval or scientific peer review.
"""
from __future__ import annotations

DESIGN_KEYS = ("estimand", "unit_of_analysis", "data", "validation", "non_claim")
METHODS_KEYS = ("data_id_version", "preprocessing", "software", "parameters")
VALIDITY_KEYS = ("construct", "internal", "external", "statistical_conclusion")
REPRO_KEYS = ("code_availability", "data_availability")


def _weak(v: object, min_len: int = 12) -> bool:
    return not isinstance(v, str) or len(v.strip()) < min_len


def validate_exit_package(pkg: dict) -> list[str]:
    errs: list[str] = []
    design = pkg.get("design") or {}
    methods = pkg.get("methods") or {}
    validity = pkg.get("validity") or {}
    repro = pkg.get("reproducibility") or {}

    if not isinstance(design, dict):
        errs.append("design_not_object")
        design = {}
    if not isinstance(methods, dict):
        errs.append("methods_not_object")
        methods = {}
    if not isinstance(validity, dict):
        errs.append("validity_not_object")
        validity = {}
    if not isinstance(repro, dict):
        errs.append("reproducibility_not_object")
        repro = {}

    for k in DESIGN_KEYS:
        if _weak(design.get(k)):
            errs.append(f"design_weak_{k}")
    for k in METHODS_KEYS:
        if _weak(methods.get(k)):
            errs.append(f"methods_weak_{k}")
    for k in VALIDITY_KEYS:
        if _weak(validity.get(k), min_len=8):
            errs.append(f"validity_weak_{k}")
    for k in REPRO_KEYS:
        if _weak(repro.get(k), min_len=8):
            errs.append(f"repro_weak_{k}")

    # Synthetic teaching data must not be labelled as field validation
    if pkg.get("labels_synthetic_as_field") is True:
        errs.append("synthetic_labelled_as_field")

    # Non-claim must bound interpretation
    non = (design.get("non_claim") or "").lower()
    if not any(tok in non for tok in ("not", "cannot", "do not", "no causal", "without")):
        errs.append("non_claim_not_bounding")

    # Availability honesty: cannot claim public DOI without providing one
    if repro.get("claims_public_doi") is True and _weak(repro.get("doi_or_url"), min_len=8):
        errs.append("doi_claimed_without_identifier")

    # Consistency: if methods mention synthetic, design validation must not claim field stations only
    meth = " ".join(str(methods.get(k) or "") for k in METHODS_KEYS).lower()
    val = (design.get("validation") or "").lower()
    if "synthetic" in meth and "station" in val and "synthetic" not in val and "optional" not in val:
        errs.append("methods_synthetic_but_validation_reads_as_field_only")

    # Causal claim without design support
    if pkg.get("claims_causal") is True and "causal" not in non:
        errs.append("causal_claim_without_nonclaim_boundary")

    return errs


def main() -> None:
    good = {
        "design": {
            "estimand": "Mean clear-sky Landsat ST difference urban core vs rural reference, JJA 2018–2022.",
            "unit_of_analysis": "30 m Landsat pixels aggregated to stated urban/rural masks",
            "data": "Landsat C2 L2 ST; urban/rural polygons; optional station air temperature",
            "validation": "Optional station comparison with explicit temporal match; report n and coverage; synthetic demos labelled synthetic",
            "non_claim": "We do not claim causal green-cover effects or city-wide canopy UHI from LST alone.",
        },
        "methods": {
            "data_id_version": "Landsat Collection 2 Level-2; product version stated in manifest",
            "preprocessing": "QA mask, scaling, urban/rural mask intersection, seasonal composite rule",
            "software": "Python 3.11; listed package versions in environment file",
            "parameters": "Composite = median of clear-sky scenes; power and buffers documented",
        },
        "validity": {
            "construct": "LST is surface proxy, not core temperature or admissions",
            "internal": "Confounding by building stock and industry possible",
            "external": "One industrial belt may not transfer to coastal suburbs",
            "statistical_conclusion": "Spatial dependence reduces effective sample size",
        },
        "reproducibility": {
            "code_availability": "Analysis scripts in repository path with README run steps",
            "data_availability": "Public Landsat via Earthdata; teaching extract path documented",
            "claims_public_doi": False,
        },
        "labels_synthetic_as_field": False,
        "claims_causal": False,
    }
    assert validate_exit_package(good) == []

    weak = {"design": {"estimand": "heat"}, "methods": {}, "validity": {}, "reproducibility": {}}
    e1 = validate_exit_package(weak)
    assert any(x.startswith("design_weak") for x in e1)
    assert any(x.startswith("methods_weak") for x in e1)

    doi_bad = {
        **good,
        "reproducibility": {
            **good["reproducibility"],
            "claims_public_doi": True,
            "doi_or_url": "",
        },
    }
    assert "doi_claimed_without_identifier" in validate_exit_package(doi_bad)

    field_bad = {**good, "labels_synthetic_as_field": True}
    assert "synthetic_labelled_as_field" in validate_exit_package(field_bad)

    causal_bad = {**good, "claims_causal": True}
    # non_claim already says do not claim causal - should pass if non_claim bounds
    # Force non_claim without bound
    causal_bad = {
        **good,
        "claims_causal": True,
        "design": {**good["design"], "non_claim": "Results are interesting."},
    }
    assert "causal_claim_without_nonclaim_boundary" in validate_exit_package(causal_bad) or "non_claim_not_bounding" in validate_exit_package(causal_bad)

    print(f"Unit 8.D exit package checks passed (weak_errs={len(e1)}).")


if __name__ == "__main__":
    main()
