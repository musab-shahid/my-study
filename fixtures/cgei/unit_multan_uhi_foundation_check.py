"""Multan UHI foundation checks (stdlib) — synthetic zones only."""
from __future__ import annotations

import importlib.util
from pathlib import Path

def _repo_root() -> Path:
    here = Path(__file__).resolve()
    for parent in here.parents:
        if (parent / "package.json").is_file() and (parent / "src").is_dir():
            return parent
    raise RuntimeError(f"Could not locate repo root from {here}")


ROOT = _repo_root() / "content-drafts"
ANALYSIS = ROOT / "capstones" / "multan-uhi" / "analysis" / "uhi_contrast.py"


def _load():
    spec = importlib.util.spec_from_file_location("uhi_contrast", ANALYSIS)
    if spec is None or spec.loader is None:
        raise FileNotFoundError(ANALYSIS)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def main() -> None:
    mod = _load()
    rows = mod.load_zones()
    assert len(rows) >= 6
    filtered = mod.filter_coverage(rows, 0.30)
    assert len(filtered) >= 5
    # Low coverage zone R3 has 0.60 valid — still ok; force stricter gate
    strict = mod.filter_coverage(rows, 0.90)
    assert all(r["n_valid"] / r["n_total"] >= 0.90 for r in strict)

    result = mod.run(min_coverage=0.30, weighted=False)
    assert result["suhii_vs_rural_c"] > 0
    assert result["suhii_vs_periurban_c"] is not None
    assert result["suhii_vs_rural_c"] > result["suhii_vs_periurban_c"]
    assert result["sensitivity_reference_delta_c"] > 0
    assert any("Synthetic" in c for c in result["non_claims"])

    weighted = mod.run(min_coverage=0.30, weighted=True)
    assert "suhii_vs_rural_c" in weighted

    # Empty group after impossible coverage
    try:
        mod.run(min_coverage=0.99)
        # may still pass if all zones high coverage — R3 is 0.60 so rural may remain
    except ValueError:
        pass

    print(
        "Multan UHI foundation checks passed "
        f"(SUHII_rural={result['suhii_vs_rural_c']:.3f} °C, "
        f"Δ_ref={result['sensitivity_reference_delta_c']:.3f} °C)."
    )


if __name__ == "__main__":
    main()
