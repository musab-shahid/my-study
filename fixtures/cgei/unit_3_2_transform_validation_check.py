"""Unit 3.2 transform acceptance: grid-shift honesty + landmark residuals (stdlib).

Synthetic only — not Multan survey control, not a national NTv2 grid.
"""
from __future__ import annotations

from math import isclose, sqrt


def residual_m(expected_xy: tuple[float, float], observed_xy: tuple[float, float]) -> float:
    dx = observed_xy[0] - expected_xy[0]
    dy = observed_xy[1] - expected_xy[1]
    return sqrt(dx * dx + dy * dy)


def allow_high_accuracy_claim(grid_available: bool, claimed_accuracy_m: float, threshold_m: float = 1.0) -> bool:
    """Reject high-accuracy claims when grid-shift resource is unavailable."""
    if claimed_accuracy_m < threshold_m and not grid_available:
        return False
    return True


def validate_transform_metadata(meta: dict) -> list[str]:
    errs = []
    for k in ("source_crs", "target_crs", "transform_method", "grid_available"):
        if k not in meta:
            errs.append(f"missing:{k}")
    if meta.get("grid_available") is False and meta.get("claimed_accuracy_m", 999) < 1.0:
        errs.append("high_accuracy_without_grid")
    return errs


def main() -> None:
    # Landmark residual example from curriculum
    r = residual_m((500_000.0, 3_340_000.0), (500_012.0, 3_340_005.0))
    assert isclose(r, 13.0, rel_tol=0, abs_tol=1e-12)

    assert allow_high_accuracy_claim(grid_available=False, claimed_accuracy_m=0.05) is False
    assert allow_high_accuracy_claim(grid_available=True, claimed_accuracy_m=0.05) is True
    assert allow_high_accuracy_claim(grid_available=False, claimed_accuracy_m=50.0) is True

    ok = {
        "source_crs": "EPSG:4326",
        "target_crs": "EPSG:32642",
        "transform_method": "PROJ_pipeline",
        "grid_available": True,
        "claimed_accuracy_m": 5.0,
    }
    assert validate_transform_metadata(ok) == []

    bad = {
        "source_crs": "local_legacy",
        "target_crs": "EPSG:4326",
        "transform_method": "unknown_fallback",
        "grid_available": False,
        "claimed_accuracy_m": 0.1,
    }
    errs = validate_transform_metadata(bad)
    assert "high_accuracy_without_grid" in errs

    try:
        residual_m((0.0, 0.0), (0.0, 0.0))
    except Exception:
        raise AssertionError("zero residual should be allowed")
    assert residual_m((0.0, 0.0), (0.0, 0.0)) == 0.0

    print(
        "Unit 3.2 transform validation checks passed "
        f"(landmark_residual={r:.1f} m, grid-shift honesty locked)."
    )


if __name__ == "__main__":
    main()
