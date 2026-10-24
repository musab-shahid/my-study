"""Unit 8.8 portfolio positioning checks (stdlib)."""
from __future__ import annotations

REQUIRED = ("place", "hazard_family", "methods_gap", "data_feasibility", "supervision_need")


def validate_positioning(obj: dict) -> list[str]:
    errs = []
    for k in REQUIRED:
        v = obj.get(k)
        if not isinstance(v, str) or not v.strip():
            errs.append(f"missing_{k}")
    sup = (obj.get("supervision_need") or "").lower()
    if sup and all(tok in sup for tok in ("python", "qgis", "excel")) and "method" not in sup:
        # tool list without methods language
        if "validation" not in sup and "sensitivity" not in sup and "uncertainty" not in sup:
            errs.append("supervision_looks_like_tool_list_only")
    return errs


def main() -> None:
    good = {
        "place": "Multan urban core",
        "hazard_family": "urban heat",
        "methods_gap": "reference-zone sensitivity and validation design",
        "data_feasibility": "open Landsat Collection 2 ST; limited in-situ air temperature",
        "supervision_need": "guidance on validation design and claim language under sparse in-situ data",
    }
    bad = {
        "place": "",
        "hazard_family": "everything",
        "methods_gap": "",
        "data_feasibility": "unclear",
        "supervision_need": "Python QGIS Excel tools",
    }
    assert validate_positioning(good) == []
    errs = validate_positioning(bad)
    assert "missing_place" in errs or "missing_methods_gap" in errs
    print(f"Unit 8.8 portfolio positioning checks passed (bad_errs={len(errs)}).")


if __name__ == "__main__":
    main()
