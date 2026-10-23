"""Unit 3.1 spatial integrity checks on axis-aligned teaching polygons (stdlib).

Detects duplicate feature IDs and interior bounding-box overlaps. Shared edges
without interior overlap are treated as valid controls.

This is NOT a full OGC/GEOS topology engine. Complex polygons, true segment
intersection, and coverage rules require production GIS tools.
"""
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Box:
    id: str
    xmin: float
    ymin: float
    xmax: float
    ymax: float

    def __post_init__(self) -> None:
        if self.xmax <= self.xmin or self.ymax <= self.ymin:
            raise ValueError(f"invalid extent for {self.id}")


def interior_overlap(a: Box, b: Box) -> bool:
    """True if open interiors intersect (shared edges only => False)."""
    return a.xmin < b.xmax and b.xmin < a.xmax and a.ymin < b.ymax and b.ymin < a.ymax


def duplicate_ids(boxes: list[Box]) -> list[str]:
    seen: set[str] = set()
    dups: list[str] = []
    for box in boxes:
        if box.id in seen and box.id not in dups:
            dups.append(box.id)
        seen.add(box.id)
    return dups


def main() -> None:
    # Control: share only the edge x=1
    a = Box("A", 0.0, 0.0, 1.0, 1.0)
    b = Box("B", 1.0, 0.0, 2.0, 1.0)
    assert duplicate_ids([a, b]) == []
    assert interior_overlap(a, b) is False

    # Defect: interior overlap
    c = Box("C", 0.5, 0.0, 1.5, 1.0)
    assert interior_overlap(a, c) is True

    # Defect: duplicate IDs
    assert duplicate_ids([a, Box("A", 3.0, 3.0, 4.0, 4.0)]) == ["A"]

    print("Unit 3.1 spatial integrity checks passed (bbox interior overlap + unique IDs).")


if __name__ == "__main__":
    main()
