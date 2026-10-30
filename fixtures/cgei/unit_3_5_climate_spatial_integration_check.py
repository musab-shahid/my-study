"""Synthetic climate × spatial integration (Units 2.5, 3.2, 3.5) — stdlib only.

NOT Multan observations. Tests CRS agreement, point-in-bbox assignment,
and mean that ignores missing temperatures.
"""
from __future__ import annotations

from math import isclose


def require_same_crs(a: str, b: str) -> None:
    if a != b:
        raise ValueError(f"crs_mismatch:{a}!={b}")


def point_in_bbox(x: float, y: float, box: tuple[float, float, float, float]) -> bool:
    minx, miny, maxx, maxy = box
    return minx <= x <= maxx and miny <= y <= maxy


def district_mean_tmax(
    stations: list[dict],
    districts: list[dict],
    station_crs: str,
    district_crs: str,
) -> dict[str, float | None]:
    require_same_crs(station_crs, district_crs)
    out: dict[str, float | None] = {}
    for d in districts:
        vals = []
        for s in stations:
            if point_in_bbox(s["lon"], s["lat"], d["bbox"]):
                if s.get("tmax_c") is not None:
                    vals.append(float(s["tmax_c"]))
        out[d["id"]] = (sum(vals) / len(vals)) if vals else None
    return out


def main() -> None:
    try:
        require_same_crs("EPSG:4326", "EPSG:32642")
        raise AssertionError("expected crs mismatch")
    except ValueError as e:
        assert "crs_mismatch" in str(e)

    stations = [
        {"id": "s1", "lon": 71.5, "lat": 30.2, "tmax_c": 40.0},
        {"id": "s2", "lon": 71.6, "lat": 30.3, "tmax_c": None},
        {"id": "s3", "lon": 71.55, "lat": 30.25, "tmax_c": 42.0},
    ]
    districts = [
        {"id": "D1", "bbox": (71.4, 30.1, 71.7, 30.4)},
        {"id": "D2", "bbox": (72.0, 31.0, 72.2, 31.2)},
    ]
    means = district_mean_tmax(stations, districts, "EPSG:4326", "EPSG:4326")
    assert isclose(means["D1"], 41.0, abs_tol=1e-12)  # (40+42)/2; None excluded
    assert means["D2"] is None

    print(
        "Unit 3.5 climate–spatial integration checks passed "
        f"(D1_mean={means['D1']}, D2_empty, CRS mismatch rejected)."
    )


if __name__ == "__main__":
    main()
