"""Unit 8.2 measurement and sampling design checks (stdlib, synthetic)."""
from __future__ import annotations


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


def validate_measurement_design(d: dict) -> list[str]:
    errs: list[str] = []
    for k in REQUIRED_DESIGN:
        v = d.get(k)
        if v is None or (isinstance(v, str) and not str(v).strip()):
            errs.append(f"missing:{k}")
    scale = d.get("measurement_scale")
    if scale and scale not in {"nominal", "ordinal", "interval", "ratio"}:
        errs.append("invalid_measurement_scale")
    method = d.get("sampling_method")
    if method and method not in {"probability", "nonprobability"}:
        errs.append("invalid_sampling_method")
    # Generalisation discipline
    if method == "nonprobability" and d.get("claims_population_inference") is True:
        errs.append("nonprobability_cannot_claim_population_inference")
    # Frame vs population
    if d.get("sampling_frame") and d.get("target_population"):
        if d["sampling_frame"] == d["target_population"] and d.get("frame_equals_population_justified") is not True:
            errs.append("frame_population_identity_unjustified")
    # Detection limit must be documented when measure is continuous physical
    if d.get("has_detection_limit") is True and not d.get("detection_limit_value"):
        errs.append("detection_limit_missing_value")
    # Spatial dependence warning for random point samples on surfaces
    if d.get("spatial_support") == "continuous_field" and d.get("ignores_spatial_dependence") is True:
        errs.append("spatial_dependence_not_addressed")
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
    # frame != population so OK
    assert validate_measurement_design(ok) == []

    spatial_bad = {
        **ok,
        "spatial_support": "continuous_field",
        "ignores_spatial_dependence": True,
    }
    assert "spatial_dependence_not_addressed" in validate_measurement_design(spatial_bad)

    dl_bad = {**ok, "has_detection_limit": True, "detection_limit_value": None}
    assert "detection_limit_missing_value" in validate_measurement_design(dl_bad)

    print("Unit 8.2 measurement/sampling checks passed.")


if __name__ == "__main__":
    main()
