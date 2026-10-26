"""Deterministic attribute-join and CRS-hygiene checks for Unit 3.3.

Synthetic teaching tables and axis-aligned boxes only. Not GeoPandas, GEOS, or
production CRS registry validation.

Run:
  python3 content-drafts/chapter-05-scientific-computing/fixtures/unit_3_3_join_integrity_check.py
"""
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Station:
    station_id: str
    name: str


@dataclass(frozen=True)
class Observation:
    station_id: str
    day: str
    value: float


@dataclass(frozen=True)
class Point:
    id: str
    x: float
    y: float
    crs: str


@dataclass(frozen=True)
class Box:
    id: str
    xmin: float
    ymin: float
    xmax: float
    ymax: float
    crs: str

    def contains(self, p: Point) -> bool:
        # Inclusive edges for teaching determinism.
        return self.xmin <= p.x <= self.xmax and self.ymin <= p.y <= self.ymax


def attribute_join(
    stations: list[Station], observations: list[Observation]
) -> list[tuple[Observation, Station | None]]:
    """Left-join observations to stations on station_id (observation-driven)."""
    by_id = {s.station_id: s for s in stations}
    if len(by_id) != len(stations):
        raise ValueError("station_id must be unique on the station side")
    return [(obs, by_id.get(obs.station_id)) for obs in observations]


def join_diagnostics(
    stations: list[Station], observations: list[Observation]
) -> dict[str, int]:
    joined = attribute_join(stations, observations)
    matched = sum(1 for _, st in joined if st is not None)
    unmatched = sum(1 for _, st in joined if st is None)
    return {
        "n_stations": len(stations),
        "n_observations": len(observations),
        "n_joined_rows": len(joined),
        "n_matched": matched,
        "n_unmatched_obs": unmatched,
        "n_distinct_station_keys_in_obs": len({o.station_id for o in observations}),
    }


def spatial_join_points_to_boxes(
    points: list[Point], boxes: list[Box], *, require_crs_match: bool = True
) -> list[tuple[Point, Box]]:
    """Many-to-many contains matches; optionally refuse cross-CRS predicates."""
    hits: list[tuple[Point, Box]] = []
    for p in points:
        for b in boxes:
            if p.crs != b.crs:
                if require_crs_match:
                    raise ValueError(
                        f"CRS mismatch: point {p.id} ({p.crs}) vs box {b.id} ({b.crs}); "
                        "reproject or refuse the spatial predicate"
                    )
                # Unguarded path: numeric compare still runs — demonstrates silent risk.
            if b.contains(p):
                hits.append((p, b))
    return hits


def main() -> None:
    stations = [
        Station("S1", "North"),
        Station("S2", "South"),
    ]
    observations = [
        Observation("S1", "2024-06-01", 40.0),
        Observation("S1", "2024-06-02", 42.0),
        Observation("S1", "2024-06-03", 41.0),
        Observation("S2", "2024-06-01", 35.0),
        Observation("S9", "2024-06-01", 99.0),  # orphan key
    ]

    diag = join_diagnostics(stations, observations)
    assert diag["n_joined_rows"] == 5, diag
    assert diag["n_matched"] == 4, diag
    assert diag["n_unmatched_obs"] == 1, diag
    # One-to-many: three obs for S1 expand against one station row.
    joined = attribute_join(stations, observations)
    s1_rows = [pair for pair in joined if pair[0].station_id == "S1"]
    assert len(s1_rows) == 3 and all(st is not None for _, st in s1_rows)

    # Same-CRS spatial contains (synthetic planar units — not lon/lat metres).
    points = [
        Point("P1", 1.0, 1.0, "EPSG:32642"),
        Point("P2", 9.0, 9.0, "EPSG:32642"),
    ]
    boxes = [
        Box("B1", 0.0, 0.0, 2.0, 2.0, "EPSG:32642"),
        Box("B2", 8.0, 8.0, 10.0, 10.0, "EPSG:32642"),
    ]
    hits = spatial_join_points_to_boxes(points, boxes)
    assert [(p.id, b.id) for p, b in hits] == [("P1", "B1"), ("P2", "B2")]

    # Cross-CRS spatial predicate must fail closed when require_crs_match=True.
    bad_point = Point("P3", 1.0, 1.0, "EPSG:4326")
    try:
        spatial_join_points_to_boxes([bad_point], boxes, require_crs_match=True)
        raise AssertionError("expected CRS mismatch error")
    except ValueError as exc:
        assert "CRS mismatch" in str(exc)

    # Without the guard, a numeric coincidence can silently "match" — teaching risk.
    unguarded = spatial_join_points_to_boxes(
        [bad_point], boxes, require_crs_match=False
    )
    assert len(unguarded) == 1  # same numbers, different CRS — dangerous if accepted

    print(
        "Unit 3.3 join integrity check passed "
        f"(joined={diag['n_joined_rows']}, unmatched_obs={diag['n_unmatched_obs']}, "
        "CRS guard OK; synthetic only)."
    )


if __name__ == "__main__":
    main()
