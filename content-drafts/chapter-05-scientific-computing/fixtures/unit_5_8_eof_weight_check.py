"""Arithmetic checks for Unit 5.8 EOF/PCA foundations.

Locks eigenvalues of a 2x2 covariance matrix used in teaching area-weighting
intuition. Does not validate EOFs of real gridded climate fields.
"""
from math import isclose, sqrt


def eigen_2x2(a: float, b: float, c: float) -> tuple[float, float]:
    disc = sqrt((a - c) ** 2 + 4 * b * b)
    return (a + c + disc) / 2, (a + c - disc) / 2


def main() -> None:
    # Covariance S = [[1, 0.8], [0.8, 1]] (equal-area two-point toy field)
    l1, l2 = eigen_2x2(1.0, 0.8, 1.0)
    assert isclose(l1, 1.8, rel_tol=0, abs_tol=1e-12)
    assert isclose(l2, 0.2, rel_tol=0, abs_tol=1e-12)
    share = l1 / (l1 + l2)
    assert isclose(share, 0.9, rel_tol=0, abs_tol=1e-12)

    # Equal positive weights do not change eigenvectors for this symmetric case
    # when both locations share weight 1 (already unit-scaled). Unequal area
    # weights would pre-multiply rows/columns by sqrt(w); learners must state
    # the weight definition before interpreting variance shares.
    print("Unit 5.8 EOF/PCA 2x2 eigenvalue and variance-share checks passed.")


if __name__ == "__main__":
    main()
