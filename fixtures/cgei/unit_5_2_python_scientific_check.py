"""Unit 5.2 Python-for-science teaching checks (stdlib).

Pure-Python stand-ins for mask, seed, and tidy reshape ideas.
Does not require NumPy/pandas at runtime.
"""
from __future__ import annotations

import random


def boolean_mask_mean(values, valid):
    selected = [v for v, m in zip(values, valid) if m]
    if not selected:
        raise ValueError("no valid values")
    return sum(selected) / len(selected)


def seeded_sequence(seed: int, n: int = 5):
    rng = random.Random(seed)
    return [rng.random() for _ in range(n)]


def tidy_length(ids, times, values):
    if not (len(ids) == len(times) == len(values)):
        raise ValueError("tidy columns must share length")
    return len(values)


def main() -> None:
    values = [1.0, 2.0, -9999.0, 4.0]
    valid = [True, True, False, True]
    mean = boolean_mask_mean(values, valid)
    assert abs(mean - (1 + 2 + 4) / 3) < 1e-12

    a = seeded_sequence(42)
    b = seeded_sequence(42)
    assert a == b
    assert seeded_sequence(0) != a

    assert tidy_length(["S1", "S1"], ["t1", "t2"], [1.0, 2.0]) == 2
    try:
        tidy_length(["S1"], ["t1", "t2"], [1.0])
        raise AssertionError("expected length mismatch")
    except ValueError:
        pass

    print(
        f"Unit 5.2 python scientific checks passed "
        f"(mask_mean={mean:.4f}, seed_ok, tidy_guard_ok)."
    )


if __name__ == "__main__":
    main()
