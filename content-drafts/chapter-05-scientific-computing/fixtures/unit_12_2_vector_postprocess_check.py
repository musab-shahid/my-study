"""Unit 12.2.3.2 — synthetic prediction-to-vector post-process checks (stdlib).

Polygonizes a binary mask on a regular grid, injects deliberate defects,
and validates geometry / CRS bookkeeping. Does not prove model accuracy.
"""
from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class Polygon:
    ring: list[tuple[float, float]]  # exterior, closed
    crs: str
    source_tile: str
    flags: list[str] = field(default_factory=list)

    def is_closed(self) -> bool:
        return len(self.ring) >= 4 and self.ring[0] == self.ring[-1]

    def area(self) -> float:
        # shoelace
        if len(self.ring) < 4:
            return 0.0
        a = 0.0
        for (x1, y1), (x2, y2) in zip(self.ring, self.ring[1:]):
            a += x1 * y2 - x2 * y1
        return abs(a) / 2.0

    def bbox(self):
        xs = [p[0] for p in self.ring]
        ys = [p[1] for p in self.ring]
        return min(xs), min(ys), max(xs), max(ys)


def cell_polygon(r: int, c: int, transform, crs: str, tile: str) -> Polygon:
    """transform: (origin_x, origin_y, pixel_size) north-up."""
    ox, oy, ps = transform
    x0 = ox + c * ps
    x1 = ox + (c + 1) * ps
    y1 = oy - r * ps
    y0 = oy - (r + 1) * ps
    ring = [(x0, y0), (x1, y0), (x1, y1), (x0, y1), (x0, y0)]
    return Polygon(ring=ring, crs=crs, source_tile=tile)


def polygonize_mask(mask, transform, crs: str, tile: str, threshold: float = 0.5) -> list[Polygon]:
    polys = []
    for r, row in enumerate(mask):
        for c, v in enumerate(row):
            if v is None:
                continue
            if v >= threshold:
                polys.append(cell_polygon(r, c, transform, crs, tile))
    return polys


def validate_polygon(p: Polygon, expected_crs: str) -> list[str]:
    errs = []
    if not p.is_closed():
        errs.append("not_closed")
    if p.area() <= 0:
        errs.append("non_positive_area")
    if p.crs != expected_crs:
        errs.append("crs_mismatch")
    # simple self-intersection: duplicate consecutive vertices (not closing)
    for a, b in zip(p.ring, p.ring[1:-1]):
        if a == b:
            errs.append("duplicate_vertex")
            break
    return errs


def inject_defects(polys: list[Polygon]) -> list[Polygon]:
    out = list(polys)
    # open ring
    bad = Polygon(ring=[(0, 0), (1, 0), (1, 1)], crs="EPSG:4326", source_tile="t0", flags=["injected_open"])
    out.append(bad)
    # wrong CRS
    if polys:
        w = Polygon(ring=list(polys[0].ring), crs="EPSG:3857", source_tile="t0", flags=["injected_crs"])
        out.append(w)
    # zero-area spike
    zero = Polygon(ring=[(2, 2), (2, 2), (2, 2), (2, 2)], crs="EPSG:4326", source_tile="t0", flags=["injected_zero"])
    out.append(zero)
    return out


def filter_valid(polys: list[Polygon], expected_crs: str) -> tuple[list[Polygon], list[tuple[Polygon, list[str]]]]:
    kept, rejected = [], []
    for p in polys:
        errs = validate_polygon(p, expected_crs)
        if errs:
            rejected.append((p, errs))
        else:
            kept.append(p)
    return kept, rejected


def main() -> None:
    # 4x4 mask: two active cells
    mask = [
        [0.1, 0.9, 0.0, None],
        [0.0, 0.8, 0.2, 0.0],
        [0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0],
    ]
    transform = (10.0, 50.0, 0.5)  # origin x,y, pixel size
    crs = "EPSG:4326"
    polys = polygonize_mask(mask, transform, crs, tile="t0", threshold=0.5)
    assert len(polys) == 2, f"expected_2_cells_got_{len(polys)}"
    for p in polys:
        assert validate_polygon(p, crs) == []

    dirty = inject_defects(polys)
    kept, rejected = filter_valid(dirty, crs)
    assert len(kept) == 2
    assert len(rejected) >= 3
    reasons = {e for _, errs in rejected for e in errs}
    assert "not_closed" in reasons
    assert "crs_mismatch" in reasons
    assert "non_positive_area" in reasons

    # tile seam bookkeeping: features retain source_tile
    assert all(p.source_tile == "t0" for p in kept)
    print(
        "PASS unit_12_2_vector_postprocess_check",
        f"kept={len(kept)} rejected={len(rejected)} reasons={sorted(reasons)}",
    )


if __name__ == "__main__":
    main()
