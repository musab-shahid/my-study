"""Unit 3.4 instructional D8 flow direction and accumulation (stdlib).

Elevation grid Z (metres), cell size 1 (unitless teaching grid):

    c0  c1  c2
r0   9   8   7
r1   6   5   4
r2   3   2   1

D8: route each cell to the neighbour with the steepest descent
(drop / distance). Cardinal distance = 1; diagonal = sqrt(2).
Ties: prefer E, SE, S, SW, W, NW, N, NE in that order.

Direction codes (Esri-style):
  1=E, 2=SE, 4=S, 8=SW, 16=W, 32=NW, 64=N, 128=NE
  0 = no downslope neighbour (sink / edge with no lower neighbour)

Accumulation convention: each cell contributes 1 (includes itself) plus
the accumulation of all cells that flow into it.

NoData sentinel -9999 is not crossed.

This is an instructional single-flow D8, not GRASS r.watershed or ArcGIS.
"""
from __future__ import annotations

from math import sqrt

NODATA = -9999
# (dr, dc, code, dist)
NEIGH = [
    (0, 1, 1, 1.0),  # E
    (1, 1, 2, sqrt(2)),  # SE
    (1, 0, 4, 1.0),  # S
    (1, -1, 8, sqrt(2)),  # SW
    (0, -1, 16, 1.0),  # W
    (-1, -1, 32, sqrt(2)),  # NW
    (-1, 0, 64, 1.0),  # N
    (-1, 1, 128, sqrt(2)),  # NE
]

Z = [
    [9.0, 8.0, 7.0],
    [6.0, 5.0, 4.0],
    [3.0, 2.0, 1.0],
]


def d8_direction(z, r, c):
    rows, cols = len(z), len(z[0])
    z0 = z[r][c]
    if z0 == NODATA:
        return 0
    best_slope = 0.0
    best_code = 0
    for dr, dc, code, dist in NEIGH:
        rr, cc = r + dr, c + dc
        if rr < 0 or rr >= rows or cc < 0 or cc >= cols:
            continue
        zn = z[rr][cc]
        if zn == NODATA:
            continue
        drop = z0 - zn
        if drop <= 0:
            continue
        slope = drop / dist
        if slope > best_slope:
            best_slope = slope
            best_code = code
    return best_code


def flow_direction_grid(z):
    return [[d8_direction(z, r, c) for c in range(len(z[0]))] for r in range(len(z))]


def code_to_delta(code):
    for dr, dc, c, _ in NEIGH:
        if c == code:
            return dr, dc
    return None


def flow_accumulation(z, fdir):
    rows, cols = len(z), len(z[0])
    # Build inflow lists
    inflow = [[]]
    inflow = [[[] for _ in range(cols)] for _ in range(rows)]
    for r in range(rows):
        for c in range(cols):
            code = fdir[r][c]
            if code == 0:
                continue
            d = code_to_delta(code)
            if d is None:
                continue
            rr, cc = r + d[0], c + d[1]
            if 0 <= rr < rows and 0 <= cc < cols:
                inflow[rr][cc].append((r, c))

    memo = [[None] * cols for _ in range(rows)]

    def acc(r, c):
        if memo[r][c] is not None:
            return memo[r][c]
        if z[r][c] == NODATA:
            memo[r][c] = 0
            return 0
        total = 1  # include self
        for ur, uc in inflow[r][c]:
            total += acc(ur, uc)
        memo[r][c] = total
        return total

    return [[acc(r, c) for c in range(cols)] for r in range(rows)]


def main() -> None:
    fdir = flow_direction_grid(Z)
    # Hand derivation (steepest descent / distance):
    # Centre (1,1)=5: S to 2 has slope 3 > SE to 1 (~2.83) → code 4 (S)
    # (0,0)=9: S to 6 has slope 3 > SE to 5 (~2.83) → code 4 (S)
    # (2,2)=1: no lower neighbour → code 0 (outlet/sink)
    # Accumulation includes self; full grid drains to (2,2) → facc=9
    assert fdir[1][1] == 4  # S
    assert fdir[0][0] == 4  # S
    assert fdir[2][2] == 0  # outlet
    assert fdir[2][0] == 1  # E toward outlet row

    facc = flow_accumulation(Z, fdir)
    assert facc[2][2] == 9
    assert facc[0][0] == 1
    assert facc[2][1] == 6  # receives left branch + self path
    # Flat synthetic grid: all equal → no positive drop → all directions 0
    flat = [[5.0] * 3 for _ in range(3)]
    fdir_flat = flow_direction_grid(flat)
    assert all(code == 0 for row in fdir_flat for code in row)

    # NoData neighbour is not selected as a route
    z_nd = [
        [3.0, 2.0],
        [NODATA, 1.0],
    ]
    # (0,0)=3: S is NoData (skipped); E drop/dist=1; SE drop/dist≈1.41 → SE (2)
    # Confirms NoData is not used as destination even when cardinally adjacent
    assert d8_direction(z_nd, 0, 0) == 2  # SE to 1, not into NoData
    assert d8_direction([[2.0, NODATA]], 0, 0) == 0  # only neighbour is NoData

    print(
        "Unit 3.4 flow-routing checks passed "
        f"(fdir_centre={fdir[1][1]}, facc_outlet={facc[2][2]})."
    )


if __name__ == "__main__":
    main()
