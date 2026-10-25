"""Unit 2.6 batch extremes / inference teaching checks (stdlib).

Pedagogical implementations only — not full ETCCDI/ClimPACT, not operational.
All series are synthetic.
"""
from __future__ import annotations

from typing import Any, Sequence


def rx1day(daily_pr_mm: list[Any]) -> float:
    """Maximum valid daily precipitation (mm). Missing skipped."""
    if not daily_pr_mm:
        raise ValueError("empty series")
    vals = []
    for v in daily_pr_mm:
        if v is None:
            continue
        if not isinstance(v, (int, float)) or isinstance(v, bool) or v < 0:
            raise ValueError("invalid precipitation")
        vals.append(float(v))
    if not vals:
        raise ValueError("no valid observations")
    return max(vals)


def tropical_nights(tmin_c: list[Any], threshold_c: float = 20.0) -> int:
    """Count days with Tmin > threshold (exclusive). Missing skipped."""
    if not tmin_c:
        raise ValueError("empty series")
    n = 0
    for v in tmin_c:
        if v is None:
            continue
        if not isinstance(v, (int, float)) or isinstance(v, bool):
            raise ValueError("invalid temperature")
        if v > threshold_c:
            n += 1
    return n


def summer_days(tmax_c: list[Any], threshold_c: float = 25.0) -> int:
    """Count days with Tmax > threshold (exclusive). Missing skipped."""
    if not tmax_c:
        raise ValueError("empty series")
    n = 0
    for v in tmax_c:
        if v is None:
            continue
        if not isinstance(v, (int, float)) or isinstance(v, bool):
            raise ValueError("invalid temperature")
        if v > threshold_c:
            n += 1
    return n


def cwd_confirmed(daily_pr_mm: list[Any], wet_mm: float = 1.0) -> dict[str, int | bool]:
    """Longest consecutive wet days (pr >= wet_mm). Missing breaks runs."""
    if not daily_pr_mm:
        raise ValueError("empty series")
    best = run = 0
    incomplete = False
    for v in daily_pr_mm:
        if v is None:
            incomplete = True
            run = 0
            continue
        if not isinstance(v, (int, float)) or isinstance(v, bool) or v < 0:
            raise ValueError("invalid precipitation")
        if v >= wet_mm:
            run += 1
            best = max(best, run)
        else:
            run = 0
    return {"cwd_confirmed": best, "incomplete": incomplete}


def empirical_percentile(sorted_vals: Sequence[float], p: float) -> float:
    if not sorted_vals:
        raise ValueError("empty")
    if p < 0 or p > 100:
        raise ValueError("p out of range")
    n = len(sorted_vals)
    if p == 0:
        return float(sorted_vals[0])
    rank = int((p / 100.0) * n)
    if (p / 100.0) * n > rank:
        rank += 1
    rank = max(1, min(n, rank))
    return float(sorted_vals[rank - 1])


def baseline_sensitivity(series: list[float], p: float = 90.0) -> dict[str, float]:
    """Same series, two baselines → possibly different percentile thresholds."""
    if len(series) < 4:
        raise ValueError("series too short")
    mid = len(series) // 2
    a = sorted(series[:mid])
    b = sorted(series[mid:])
    return {
        "p_first_half": empirical_percentile(a, p),
        "p_second_half": empirical_percentile(b, p),
    }


def bootstrap_mean_se(sample: list[float], n_boot: int = 200, seed: int = 42) -> dict[str, float]:
    """Pedagogical bootstrap SE of the mean (deterministic LCG)."""
    if len(sample) < 2:
        raise ValueError("need n>=2")
    # simple LCG
    state = seed & 0xFFFFFFFF

    def rnd() -> float:
        nonlocal state
        state = (1664525 * state + 1013904223) & 0xFFFFFFFF
        return state / 0x100000000

    n = len(sample)
    means = []
    for _ in range(n_boot):
        acc = 0.0
        for _j in range(n):
            idx = int(rnd() * n) % n
            acc += sample[idx]
        means.append(acc / n)
    mu = sum(means) / n_boot
    var = sum((m - mu) ** 2 for m in means) / (n_boot - 1)
    return {"boot_mean": mu, "boot_se": var ** 0.5}


def cohens_d(a: list[float], b: list[float]) -> float:
    """Pooled-SD Cohen's d (pedagogical)."""
    if len(a) < 2 or len(b) < 2:
        raise ValueError("need n>=2 each")
    ma = sum(a) / len(a)
    mb = sum(b) / len(b)
    va = sum((x - ma) ** 2 for x in a) / (len(a) - 1)
    vb = sum((x - mb) ** 2 for x in b) / (len(b) - 1)
    sp2 = ((len(a) - 1) * va + (len(b) - 1) * vb) / (len(a) + len(b) - 2)
    if sp2 <= 0:
        raise ValueError("zero pooled variance")
    return (ma - mb) / (sp2 ** 0.5)


def heatwave_spell_days(tmax_c: list[Any], threshold_c: float = 35.0, min_duration: int = 3) -> int:
    """Count days belonging to spells of length >= min_duration with Tmax > threshold."""
    if not tmax_c:
        raise ValueError("empty")
    flags = []
    for v in tmax_c:
        if v is None:
            flags.append(False)
        elif not isinstance(v, (int, float)) or isinstance(v, bool):
            raise ValueError("invalid")
        else:
            flags.append(v > threshold_c)
    total = 0
    i = 0
    n = len(flags)
    while i < n:
        if not flags[i]:
            i += 1
            continue
        j = i
        while j < n and flags[j]:
            j += 1
        length = j - i
        if length >= min_duration:
            total += length
        i = j
    return total


def compound_hot_dry(
    tmax_c: list[Any],
    pr_mm: list[Any],
    t_thresh: float = 35.0,
    pr_thresh: float = 1.0,
) -> int:
    """Count days with Tmax > t_thresh and pr < pr_thresh (both observed)."""
    if len(tmax_c) != len(pr_mm):
        raise ValueError("length mismatch")
    n = 0
    for t, p in zip(tmax_c, pr_mm):
        if t is None or p is None:
            continue
        if not isinstance(t, (int, float)) or not isinstance(p, (int, float)):
            raise ValueError("invalid")
        if t > t_thresh and p < pr_thresh:
            n += 1
    return n


def report_fields_present(meta: dict[str, Any]) -> list[str]:
    """Return missing required reporting keys for extremes results."""
    required = ["baseline", "product", "period", "index", "units", "limitations"]
    return [k for k in required if not meta.get(k)]


def main() -> None:
    pr = [0.0, 5.0, 12.0, 40.0, 3.0, None, 8.0]
    assert abs(rx1day(pr) - 40.0) < 1e-12

    tmin = [18.0, 20.0, 21.0, 19.5, 22.0, None]
    assert tropical_nights(tmin) == 2  # 21, 22 only (>20)

    tmax = [24.0, 25.0, 26.0, 30.0, None]
    assert summer_days(tmax) == 2  # 26, 30

    wet = [0.0, 2.0, 3.0, 0.5, 4.0, 5.0, None, 6.0]
    c = cwd_confirmed(wet)
    assert c["cwd_confirmed"] == 2  # 2,3 then 4,5
    assert c["incomplete"] is True

    series = [10.0, 11, 12, 13, 20, 21, 22, 23]
    sens = baseline_sensitivity(series, 90)
    assert sens["p_first_half"] != sens["p_second_half"] or True  # may differ
    # first half sorted 10-13, second 20-23
    assert sens["p_first_half"] == 13.0
    assert sens["p_second_half"] == 23.0

    boot = bootstrap_mean_se([1.0, 2.0, 3.0, 4.0], n_boot=100, seed=1)
    assert boot["boot_se"] > 0

    d = cohens_d([1.0, 2.0, 3.0], [4.0, 5.0, 6.0])
    assert d < 0  # a < b

    hw = [30, 36, 37, 38, 30, 36, 30]
    assert heatwave_spell_days(hw, 35, 3) == 3  # one spell of 3

    th = [36, 36, 30]
    pr2 = [0.0, 2.0, 0.0]
    assert compound_hot_dry(th, pr2, 35, 1.0) == 1  # day0 only

    missing = report_fields_present({"baseline": "1991-2020", "index": "R10mm"})
    assert "product" in missing and "period" in missing

    print(
        "Unit 2.6 extremes batch checks passed "
        f"(rx1day={rx1day(pr)}, TR={tropical_nights(tmin)}, SU={summer_days(tmax)}, "
        f"CWD={c['cwd_confirmed']}, boot_se={boot['boot_se']:.4f}, d={d:.3f}, "
        f"hw_days={heatwave_spell_days(hw, 35, 3)}, compound={compound_hot_dry(th, pr2)})."
    )


if __name__ == "__main__":
    main()
