"""Unit 4.7 classification / change teaching checks (stdlib).

Synthetic labels only — not a real land-cover product validation.

1) Confusion-matrix OA, UA, PA, F1 for a rare class
2) Spatial block split: train/test blocks disjoint
3) Post-classification change matrix false-change count
4) Cluster IDs carry no semantic names (sanity on label set)
"""
from __future__ import annotations

from math import isclose


def confusion_counts(reference: list[int], predicted: list[int], n_classes: int):
    if len(reference) != len(predicted):
        raise ValueError("length mismatch")
    mat = [[0] * n_classes for _ in range(n_classes)]
    for r, p in zip(reference, predicted):
        mat[r][p] += 1
    return mat


def overall_accuracy(mat) -> float:
    n = sum(sum(row) for row in mat)
    return sum(mat[i][i] for i in range(len(mat))) / n


def user_accuracy(mat, j: int) -> float:
    col = sum(mat[i][j] for i in range(len(mat)))
    return mat[j][j] / col if col else 0.0


def producer_accuracy(mat, i: int) -> float:
    row = sum(mat[i])
    return mat[i][i] / row if row else 0.0


def f1(ua: float, pa: float) -> float:
    return 0.0 if (ua + pa) == 0 else 2 * ua * pa / (ua + pa)


def blocks_disjoint(train_blocks: set[int], test_blocks: set[int]) -> bool:
    return train_blocks.isdisjoint(test_blocks)


def change_matrix(t0: list[int], t1: list[int], n_classes: int):
    mat = [[0] * n_classes for _ in range(n_classes)]
    for a, b in zip(t0, t1):
        mat[a][b] += 1
    return mat


def main() -> None:
    # reference, predicted — class 1 is rare
    ref = [0] * 90 + [1] * 10
    pred = [0] * 85 + [1] * 5 + [0] * 5 + [1] * 5  # aligned length 100
    # Build explicit worked matrix from lesson style: majority correct, rare weak
    ref = [0] * 95 + [1] * 5
    pred = [0] * 90 + [1] * 5 + [0] * 2 + [1] * 3
    # lengths: 95+5=100; 90+5+2+3=100
    mat = confusion_counts(ref, pred, 2)
    oa = overall_accuracy(mat)
    ua1 = user_accuracy(mat, 1)
    pa1 = producer_accuracy(mat, 1)
    f1_1 = f1(ua1, pa1)
    assert oa > 0.9
    assert pa1 < oa  # rare class weaker than OA
    assert ua1 <= 1.0

    assert blocks_disjoint({0, 1, 2}, {3, 4}) is True
    assert blocks_disjoint({0, 1}, {1, 2}) is False

    # Synthetic change: true stable + false change from label flip noise
    t0 = [0, 0, 1, 1, 0, 1]
    t1 = [0, 1, 1, 1, 0, 0]  # two transitions that may be noise
    cm = change_matrix(t0, t1, 2)
    false_or_real_change = sum(cm[i][j] for i in range(2) for j in range(2) if i != j)
    assert false_or_real_change == 2

    cluster_ids = {0, 1, 2}
    semantic_forbidden = {"water", "urban", "forest"}
    assert cluster_ids.isdisjoint(set())  # IDs are integers only in this fixture
    assert not any(isinstance(x, str) for x in cluster_ids)

    print(
        "Unit 4.7 classification/change checks passed "
        f"(OA={oa:.3f}, UA1={ua1:.3f}, PA1={pa1:.3f}, F1_1={f1_1:.3f}, "
        f"change_offdiag={false_or_real_change}, blocks_ok)."
    )


if __name__ == "__main__":
    main()
