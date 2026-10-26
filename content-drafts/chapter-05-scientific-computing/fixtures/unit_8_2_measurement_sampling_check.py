"""Unit 8.2 measurement and sampling design checks (stdlib, synthetic)."""
from __future__ import annotations

from math import isfinite


REQUIRED_DESIGN = (
    "construct",
    "operational_definition",
    "indicator",
    "unit",
    "measurement_scale",  # nominal | ordinal | interval | ratio
    "target_population",
    "sampling_frame",
    "sampling_unit",
    "observation_unit",
    "unit_of_analysis",
    "sampling_method",  # probability | nonprobability
    "spatial_support",
    "temporal_support",
)


def _is_missing(v) -> bool:
    """True only for None or blank string — not for numeric zero."""
    if v is None:
        return True
    if isinstance(v, str) and not v.strip():
        return True
    return False


def validate_detection_limit_value(v) -> list[str]:
    """Rules when has_detection_limit is True.

    Accept: finite number >= 0 (including 0.0).
    Reject: missing, non-numeric, non-finite, negative.
    """
    errs: list[str] = []
    if _is_missing(v):
        errs.append("detection_limit_missing_value")
        return errs
    if isinstance(v, bool) or not isinstance(v, (int, float)):
        errs.append("detection_limit_invalid_type")
        return errs
    if not isfinite(float(v)):
        errs.append("detection_limit_non_finite")
        return errs
    if float(v) < 0:
        errs.append("detection_limit_negative")
    return errs


def validate_measurement_design(d: dict) -> list[str]:
    errs: list[str] = []
    for k in REQUIRED_DESIGN:
        if _is_missing(d.get(k)):
            errs.append(f"missing:{k}")
    scale = d.get("measurement_scale")
    if scale and scale not in {"nominal", "ordinal", "interval", "ratio"}:
        errs.append("invalid_measurement_scale")
    method = d.get("sampling_method")
    if method and method not in {"probability", "nonprobability"}:
        errs.append("invalid_sampling_method")
    if method == "nonprobability" and d.get("claims_population_inference") is True:
        errs.append("nonprobability_cannot_claim_population_inference")
    if d.get("sampling_frame") and d.get("target_population"):
        if d["sampling_frame"] == d["target_population"] and d.get("frame_equals_population_justified") is not True:
            errs.append("frame_population_identity_unjustified")
    if d.get("has_detection_limit") is True:
        errs.extend(validate_detection_limit_value(d.get("detection_limit_value")))
    if d.get("spatial_support") == "continuous_field" and d.get("ignores_spatial_dependence") is True:
        errs.append("spatial_dependence_not_addressed")
    # GPS / field point to raster pixel alignment must be documented when claimed
    if d.get("uses_gps_or_field_points") is True and d.get("documents_gps_pixel_alignment") is not True:
        errs.append("gps_pixel_alignment_not_documented")
    return errs


def main() -> None:
    incomplete = {"construct": "outdoor heat stress"}
    e = validate_measurement_design(incomplete)
    assert "missing:operational_definition" in e
    assert "missing:sampling_frame" in e

    bad_generalise = {
        "construct": "neighbourhood heat exposure",
        "operational_definition": "Mean summer LST in residential parcels",
        "indicator": "LST_Day_1km mean JJA",
        "unit": "°C",
        "measurement_scale": "interval",
        "target_population": "all residential parcels in City X",
        "sampling_frame": "parcels with cloud-free LST",
        "sampling_unit": "parcel",
        "observation_unit": "parcel-season",
        "unit_of_analysis": "parcel",
        "sampling_method": "nonprobability",
        "spatial_support": "parcel polygons",
        "temporal_support": "JJA 2018–2023",
        "claims_population_inference": True,
    }
    assert "nonprobability_cannot_claim_population_inference" in validate_measurement_design(bad_generalise)

    ok = {**bad_generalise, "claims_population_inference": False, "frame_equals_population_justified": False}
    assert validate_measurement_design(ok) == []

    spatial_bad = {**ok, "spatial_support": "continuous_field", "ignores_spatial_dependence": True}
    assert "spatial_dependence_not_addressed" in validate_measurement_design(spatial_bad)

    # Detection limit: zero is valid; None/blank/negative/NaN are not
    assert validate_detection_limit_value(0) == []
    assert validate_detection_limit_value(0.0) == []
    assert validate_detection_limit_value(0.05) == []
    assert "detection_limit_missing_value" in validate_detection_limit_value(None)
    assert "detection_limit_missing_value" in validate_detection_limit_value("")
    assert "detection_limit_invalid_type" in validate_detection_limit_value("0.05")
    assert "detection_limit_negative" in validate_detection_limit_value(-0.1)
    assert "detection_limit_non_finite" in validate_detection_limit_value(float("nan"))

    dl_ok = {**ok, "has_detection_limit": True, "detection_limit_value": 0.0}
    assert validate_measurement_design(dl_ok) == []
    dl_missing = {**ok, "has_detection_limit": True, "detection_limit_value": None}
    assert "detection_limit_missing_value" in validate_measurement_design(dl_missing)

    gps_bad = {**ok, "uses_gps_or_field_points": True, "documents_gps_pixel_alignment": False}
    assert "gps_pixel_alignment_not_documented" in validate_measurement_design(gps_bad)
    gps_ok = {**ok, "uses_gps_or_field_points": True, "documents_gps_pixel_alignment": True}
    assert validate_measurement_design(gps_ok) == []

    print("Unit 8.2 measurement/sampling checks passed.")


if __name__ == "__main__":
    main()
