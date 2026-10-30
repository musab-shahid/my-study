"""Conceptual rook neighbourhood weights (Unit 3.9 teaching fixture).

Synthetic three-parcel line. Not PySAL, not a formal spatial weights export.

Run:
  python3 content-drafts/chapter-05-scientific-computing/fixtures/unit_3_9_neighbourhood_weights_check.py
"""
from __future__ import annotations


def rook_adjacency_line(n: int) -> list[list[int]]:
    """Binary rook adjacency for parcels 0..n-1 in a straight line."""
    if n < 1:
        raise ValueError("n must be positive")
    w = [[0] * n for _ in range(n)]
    for i in range(n):
        if i - 1 >= 0:
            w[i][i - 1] = 1
        if i + 1 < n:
            w[i][i + 1] = 1
    return w


def shared_value_with_neighbour(values: list[float], weights: list[list[int]]) -> bool:
    """True if any neighbour pair shares the exact same value (teaching dependence flag)."""
    n = len(values)
    for i in range(n):
        for j in range(n):
            if weights[i][j] and values[i] == values[j]:
                return True
    return False


def main() -> None:
    w = rook_adjacency_line(3)
    assert w == [
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
    ]
    # Ends not neighbours
    assert w[0][2] == 0 and w[2][0] == 0
    vals = [10.0, 10.0, 3.0]
    assert shared_value_with_neighbour(vals, w) is True
    vals2 = [1.0, 2.0, 3.0]
    assert shared_value_with_neighbour(vals2, w) is False
    try:
        rook_adjacency_line(0)
        raise AssertionError("expected error")
    except ValueError:
        pass
    print("Unit 3.9 neighbourhood weights check passed (rook line matrix; synthetic only).")


if __name__ == "__main__":
    main()
