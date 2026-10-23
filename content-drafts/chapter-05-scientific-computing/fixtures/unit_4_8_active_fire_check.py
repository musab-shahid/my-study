"""Unit 4.8 active-fire / hotspot teaching checks (stdlib).

Synthetic observation records — not real FIRMS/MODIS/VIIRS downloads.

Guardrails:
1) Count detection records vs unique cells (no silent event dedup claim)
2) Distinguish masked/missing from valid non-detection
3) QA filter is an explicit exercise parameter
4) Burned area is a separate input — never computed from hotspot count
5) Counterexample: more detections need not mean more burned area
6) Deterministic summary
"""
from __future__ import annotations

from math import isclose


# Synthetic schema: obs_id, cell_id, status in {detect, clear, masked}, confidence 0-100, frp optional
RECORDS = [
    {"obs_id": "s1", "cell_id": "A", "status": "detect", "confidence": 90, "frp": 12.0},
    {"obs_id": "s2", "cell_id": "A", "status": "detect", "confidence": 80, "frp": 10.0},  # same cell, later overpass
    {"obs_id": "s3", "cell_id": "B", "status": "detect", "confidence": 40, "frp": 5.0},
    {"obs_id": "s4", "cell_id": "C", "status": "clear", "confidence": 0, "frp": None},
    {"obs_id": "s5", "cell_id": "D", "status": "masked", "confidence": 0, "frp": None},
    {"obs_id": "s6", "cell_id": "E", "status": "detect", "confidence": 70, "frp": 8.0},
]

# Separate burned-area table (provenance: synthetic scar product — not from counts)
BURNED_AREA_HA = {
    "scene_hi_detect_low_ba": 2.0,   # many detections, small scar
    "scene_lo_detect_hi_ba": 50.0,   # fewer detections, large scar
}


def summarize(records, min_confidence: int = 50) -> dict:
    """Exercise QA threshold — not a universal operational FIRMS rule."""
    if min_confidence < 0 or min_confidence > 100:
        raise ValueError("min_confidence must be 0–100")
    n_records = len(records)
    n_masked = sum(1 for r in records if r["status"] == "masked")
    n_clear = sum(1 for r in records if r["status"] == "clear")
    detections = [
        r for r in records
        if r["status"] == "detect" and r["confidence"] >= min_confidence
    ]
    unique_cells = {r["cell_id"] for r in detections}
    return {
        "n_observation_records": n_records,
        "n_detections_after_qa": len(detections),
        "n_unique_detected_cells": len(unique_cells),
        "n_masked": n_masked,
        "n_valid_clear": n_clear,
        "qa_min_confidence_exercise": min_confidence,
        "burned_area_ha": None,  # never filled from detections
        "count_unit": "detection_records_and_unique_cells_not_unique_fire_events",
    }


def main() -> None:
    s = summarize(RECORDS, min_confidence=50)
    assert s["n_observation_records"] == 6
    # detections with conf>=50: s1, s2, s6 (s3 has 40 → excluded)
    assert s["n_detections_after_qa"] == 3
    assert s["n_unique_detected_cells"] == 2  # A, E
    assert s["n_masked"] == 1
    assert s["n_valid_clear"] == 1
    assert s["burned_area_ha"] is None

    # Counterexample: scene with more detections can have less BA
    ba_hi_det = BURNED_AREA_HA["scene_hi_detect_low_ba"]
    ba_lo_det = BURNED_AREA_HA["scene_lo_detect_hi_ba"]
    assert ba_hi_det < ba_lo_det

    s2 = summarize(RECORDS, min_confidence=50)
    assert s2 == s  # deterministic

    try:
        summarize(RECORDS, min_confidence=200)
        raise AssertionError("expected invalid confidence to fail")
    except ValueError:
        pass

    print(
        "Unit 4.8 active-fire checks passed "
        f"(records={s['n_observation_records']}, detections={s['n_detections_after_qa']}, "
        f"unique_cells={s['n_unique_detected_cells']}, masked={s['n_masked']}, "
        f"BA_not_from_counts, counterexample_ok)."
    )


if __name__ == "__main__":
    main()
