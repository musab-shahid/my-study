"""Unit 3.9 method-selection under sparse / noisy samples (stdlib).

Decision rules for educational use only:
  - adequate_samples + structured variogram hint → ok_candidate (ordinary kriging plausible)
  - moderate_n + smooth field → idw_ok
  - n too small OR pure noise OR no spatial structure → do_not_interpolate

Does not fit variogram models, run PySAL, or claim operational map quality.
"""
from __future__ import annotations

from math import sqrt


def pairwise_mean_abs_diff(points: list[tuple[float, float, float]], max_dist: float) -> float:
    """Mean |z_i - z_j| for pairs closer than max_dist. 0 if no pairs."""
    diffs = []
    n = len(points)
    for i in range(n):
        for j in range(i + 1, n):
            xi, yi, zi = points[i]
            xj, yj, zj = points[j]
            d = sqrt((xi - xj) ** 2 + (yi - yj) ** 2)
            if d <= max_dist and d > 0:
                diffs.append(abs(zi - zj))
    if not diffs:
        return 0.0
    return sum(diffs) / len(diffs)


def far_mean_abs_diff(points: list[tuple[float, float, float]], min_dist: float) -> float:
    diffs = []
    n = len(points)
    for i in range(n):
        for j in range(i + 1, n):
            xi, yi, zi = points[i]
            xj, yj, zj = points[j]
            d = sqrt((xi - xj) ** 2 + (yi - yj) ** 2)
            if d >= min_dist:
                diffs.append(abs(zi - zj))
    if not diffs:
        return 0.0
    return sum(diffs) / len(diffs)


def recommend_method(points: list[tuple[float, float, float]]) -> str:
    """Return one of: do_not_interpolate | idw_ok | ok_candidate.

    Heuristic teaching rules (documented for learners):
    - n < 4 → do_not_interpolate
    - fewer than 3 near pairs → do_not_interpolate (cannot assess structure)
    - near-pair dissimilarity >= far-pair (no spatial structure) → do_not_interpolate
    - n >= 8 and far dissimilarity clearly exceeds near → ok_candidate
    - else if n >= 4 → idw_ok (simple deterministic option; still needs LOO check)
    """
    n = len(points)
    if n < 4:
        return "do_not_interpolate"

    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    diag = sqrt((max(xs) - min(xs)) ** 2 + (max(ys) - min(ys)) ** 2) or 1.0
    near_max = 0.45 * diag
    far_min = 0.55 * diag

    near_diffs = []
    far_diffs = []
    for i in range(n):
        for j in range(i + 1, n):
            xi, yi, zi = points[i]
            xj, yj, zj = points[j]
            d = sqrt((xi - xj) ** 2 + (yi - yj) ** 2)
            if 0 < d <= near_max:
                near_diffs.append(abs(zi - zj))
            if d >= far_min:
                far_diffs.append(abs(zi - zj))

    if len(near_diffs) < 3 or len(far_diffs) < 3:
        return "do_not_interpolate"

    near = sum(near_diffs) / len(near_diffs)
    far = sum(far_diffs) / len(far_diffs)

    if far <= 0 or near >= far * 0.95:
        return "do_not_interpolate"

    if n >= 8 and far > near * 1.5:
        return "ok_candidate"
    return "idw_ok"


def main() -> None:
    # Sparse: only three points
    sparse = [(0.0, 0.0, 1.0), (1.0, 0.0, 2.0), (0.0, 1.0, 1.5)]
    assert recommend_method(sparse) == "do_not_interpolate"

    # Pure noise on a grid (values independent of location)
    noise = [
        (0.0, 0.0, 3.0),
        (1.0, 0.0, 0.0),
        (2.0, 0.0, 4.0),
        (0.0, 1.0, 1.0),
        (1.0, 1.0, 5.0),
        (2.0, 1.0, 0.5),
    ]
    assert recommend_method(noise) == "do_not_interpolate"

    # Smooth gradient — enough for IDW teaching case
    gradient = [
        (0.0, 0.0, 0.0),
        (1.0, 0.0, 1.0),
        (2.0, 0.0, 2.0),
        (3.0, 0.0, 3.0),
        (0.0, 1.0, 0.5),
        (1.0, 1.0, 1.5),
    ]
    assert recommend_method(gradient) in ("idw_ok", "ok_candidate")

    # Larger structured field → ok_candidate
    structured = []
    for i in range(4):
        for j in range(3):
            structured.append((float(i), float(j), float(i) + 0.3 * j))
    assert recommend_method(structured) == "ok_candidate"

    # Empty / invalid
    assert recommend_method([]) == "do_not_interpolate"

    print(
        "Unit 3.9 method-selection checks passed "
        f"(sparse={recommend_method(sparse)}, noise={recommend_method(noise)}, "
        f"gradient={recommend_method(gradient)}, structured={recommend_method(structured)})."
    )


if __name__ == "__main__":
    main()
