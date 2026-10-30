"""Multan UHI Landsat C2 L2 ST pathway checks (stdlib, synthetic raster only)."""
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
MOD = ROOT / "capstones" / "multan-uhi" / "analysis" / "landsat_st_local.py"


def _load():
    spec = importlib.util.spec_from_file_location("landsat_st_local", MOD)
    mod = importlib.util.module_from_spec(spec)
    assert spec.loader is not None
    spec.loader.exec_module(mod)
    return mod


def main() -> None:
    m = _load()
    # scale/offset identity: 0 DN → None (fill); known K
    assert m.dn_to_kelvin(0) is None
    k = m.dn_to_kelvin(47103)
    assert k is not None and abs(k - 310.0) < 0.05

    # QA simplified cloud bit
    assert m.apply_qa_clear(0) is True
    assert m.apply_qa_clear(8) is False

    # missing synthetic
    try:
        m.load_synthetic_scene(Path("/no/such/synthetic_landsat.json"))
        raise AssertionError("expected missing")
    except FileNotFoundError:
        pass

    result = m.process_synthetic(min_coverage=0.3)
    assert result["status"] == "ok"
    assert result["path_kind"] == "synthetic_json_raster"
    assert result["qa_applied"] is True
    assert result["suhii_vs_rural_c"] is not None
    assert result["suhii_vs_rural_c"] > result["suhii_vs_periurban_c"]
    assert result["urban"]["n_valid"] >= 1
    assert result["rural"]["coverage"] >= 0.3
    assert result["scale"] == m.ST_SCALE
    assert result["offset"] == m.ST_OFFSET
    assert "not a Landsat granule" in " ".join(result["non_claims"]).lower() or any(
        "Synthetic" in c for c in result["non_claims"]
    )

    # shape mismatch
    try:
        m.process_arrays([[1, 2]], None, [[1]])
        raise AssertionError("expected shape mismatch")
    except ValueError as e:
        assert "zone_shape" in str(e)

    # all fill urban → insufficient or null SUHII
    st = [[0, 0], [0, 0]]
    zone = [[1, 1], [2, 2]]
    r = m.process_arrays(st, None, zone, apply_qa=False)
    assert r["urban"]["mean_c"] is None
    assert r["suhii_vs_rural_c"] is None

    print(
        "Multan UHI Landsat ST checks passed "
        f"(SUHII_rural={result['suhii_vs_rural_c']:.3f} °C, "
        f"qa_reject={result['n_qa_reject']}, fill={result['n_fill']})."
    )


if __name__ == "__main__":
    main()
