"""Unit 3.3 administrative hierarchy and join integrity (stdlib).

Synthetic units (not official Pakistani codes):
  district D1 parent P1
  district D2 parent P1
  tehsil T1 parent D1
  tehsil T2 parent D1
  tehsil T3 parent D2
  tehsil T_BAD parent D9   # missing parent — defect
  tehsil T1 duplicate id   # duplicate — defect (second record)

Observations join on unit_id; unmatched code U_X is reported.
"""
from __future__ import annotations

from collections import Counter

# unit_id, level, parent_id (None for province)
UNITS = [
    ("P1", "province", None),
    ("D1", "district", "P1"),
    ("D2", "district", "P1"),
    ("T1", "tehsil", "D1"),
    ("T2", "tehsil", "D1"),
    ("T3", "tehsil", "D2"),
    ("T_BAD", "tehsil", "D9"),  # missing parent
    ("T1", "tehsil", "D1"),  # duplicate id
]

OBS = [
    ("T1", 10.0),
    ("T2", 20.0),
    ("T3", 30.0),
    ("U_X", 99.0),  # unmatched
]


def duplicate_ids(units):
    counts = Counter(u[0] for u in units)
    return sorted([uid for uid, n in counts.items() if n > 1])


def missing_parents(units):
    ids = {u[0] for u in units}
    missing = []
    for uid, level, parent in units:
        if parent is not None and parent not in ids:
            missing.append((uid, parent))
    # unique by child
    return sorted(set(missing))


def join_obs(units, obs):
    unit_ids = {u[0] for u in units}
    matched = [(uid, val) for uid, val in obs if uid in unit_ids]
    unmatched = [(uid, val) for uid, val in obs if uid not in unit_ids]
    return matched, unmatched


def main() -> None:
    dups = duplicate_ids(UNITS)
    assert dups == ["T1"]

    miss = missing_parents(UNITS)
    assert ("T_BAD", "D9") in miss

    # Clean subset for join control
    clean = [u for u in UNITS if u[0] != "T_BAD" and not (u[0] == "T1" and u is UNITS[-1])]
    # simpler clean list without defects
    clean_units = [
        ("P1", "province", None),
        ("D1", "district", "P1"),
        ("D2", "district", "P1"),
        ("T1", "tehsil", "D1"),
        ("T2", "tehsil", "D1"),
        ("T3", "tehsil", "D2"),
    ]
    assert duplicate_ids(clean_units) == []
    assert missing_parents(clean_units) == []

    matched, unmatched = join_obs(clean_units, OBS)
    assert len(matched) == 3
    assert unmatched == [("U_X", 99.0)]
    assert abs(sum(v for _, v in matched) - 60.0) < 1e-12

    # Format manifest contract (teaching): required keys for exchange package
    manifest = {
        "vector_preferred": "GeoPackage",
        "vector_exchange_web": "GeoJSON",
        "raster_preferred": "GeoTIFF",
        "shapefile_field_limit": 10,
        "note": "Changing CRS tag is not reprojection",
    }
    assert manifest["shapefile_field_limit"] == 10
    assert manifest["vector_preferred"] == "GeoPackage"

    print(
        "Unit 3.3 admin/formats checks passed "
        f"(dups={dups}, missing_parents={miss}, matched={len(matched)})."
    )


if __name__ == "__main__":
    main()
