"""Fixture-backed arithmetic checks for Unit 5.4 introductory statistics.

Validates worked-example calculations only. Does not validate sampling
assumptions, distributional calibration, or inferential claims on real data.
"""
from __future__ import annotations

from math import isclose, sqrt


def one_way_anova(groups):
    all_values = [value for group in groups for value in group]
    grand_mean = sum(all_values) / len(all_values)
    ss_between = sum(
        len(group) * (sum(group) / len(group) - grand_mean) ** 2
        for group in groups
    )
    ss_within = sum(
        (value - sum(group) / len(group)) ** 2
        for group in groups
        for value in group
    )
    df_between = len(groups) - 1
    df_within = len(all_values) - len(groups)
    return ss_between, ss_within, (ss_between / df_between) / (ss_within / df_within)


def pearson_chi_square(observed):
    row_totals = [sum(row) for row in observed]
    col_totals = [
        sum(observed[i][j] for i in range(len(observed)))
        for j in range(len(observed[0]))
    ]
    total = sum(row_totals)
    expected = [
        [row_totals[i] * col_totals[j] / total for j in range(len(col_totals))]
        for i in range(len(row_totals))
    ]
    statistic = sum(
        (observed[i][j] - expected[i][j]) ** 2 / expected[i][j]
        for i in range(len(observed))
        for j in range(len(observed[i]))
    )
    return expected, statistic


def sample_mean_and_sd(values):
    n = len(values)
    mean = sum(values) / n
    var = sum((v - mean) ** 2 for v in values) / (n - 1)
    return mean, sqrt(var)


def standard_error_mean(sd, n):
    if n <= 0:
        raise ValueError("n must be positive")
    return sd / sqrt(n)


def mean_ci_approx(mean, se, z=1.96):
    return mean - z * se, mean + z * se


def cohens_d(mean1, mean2, sd_pooled):
    if sd_pooled <= 0:
        raise ValueError("pooled sd must be positive")
    return (mean1 - mean2) / sd_pooled


def pearson_r(x, y):
    n = len(x)
    if n != len(y) or n < 2:
        raise ValueError("x and y must have equal length >= 2")
    mx = sum(x) / n
    my = sum(y) / n
    num = sum((a - mx) * (b - my) for a, b in zip(x, y))
    den = sqrt(sum((a - mx) ** 2 for a in x) * sum((b - my) ** 2 for b in y))
    if den == 0:
        raise ValueError("zero variance")
    return num / den


def z_statistic(mean, mu0, se):
    return (mean - mu0) / se


def main():
    groups = [[20, 22, 21], [25, 27, 26], [23, 24, 22]]
    ss_between, ss_within, f_statistic = one_way_anova(groups)
    assert isclose(ss_between, 38.0, rel_tol=0, abs_tol=1e-12)
    assert isclose(ss_within, 6.0, rel_tol=0, abs_tol=1e-12)
    assert isclose(f_statistic, 19.0, rel_tol=0, abs_tol=1e-12)

    observed = [[30, 10], [8, 52]]
    expected, chi_square = pearson_chi_square(observed)
    expected_flat = [value for row in expected for value in row]
    assert all(
        isclose(a, b, rel_tol=0, abs_tol=1e-12)
        for a, b in zip(expected_flat, [15.2, 24.8, 22.8, 37.2])
    )
    assert isclose(chi_square, 38.737973967176, rel_tol=0, abs_tol=1e-9)
    assert min(expected_flat) > 5

    n, rho = 100, 0.60
    n_eff = n * (1 - rho) / (1 + rho)
    assert isclose(n_eff, 25.0, rel_tol=0, abs_tol=1e-12)

    r_xy, r_xz, r_yz = -0.60, 0.50, -0.40
    r_xy_z = (r_xy - r_xz * r_yz) / ((1 - r_xz**2) * (1 - r_yz**2)) ** 0.5
    assert isclose(r_xy_z, -0.5039526306789696, rel_tol=0, abs_tol=1e-9)

    z_alpha, z_beta, sigma, delta = 1.96, 0.84, 4.0, 2.0
    n_per = 2 * (z_alpha + z_beta) ** 2 * (sigma / delta) ** 2
    assert isclose(n_per, 62.72, rel_tol=0, abs_tol=1e-9)

    series = [30.0, 31.0, 29.5, 30.5, 32.0, 30.0, 31.5, 29.0, 30.5, 31.0]
    mean, sd = sample_mean_and_sd(series)
    assert isclose(mean, 30.5, rel_tol=0, abs_tol=1e-12)
    se = standard_error_mean(sd, len(series))
    assert isclose(sd, sqrt(7.5 / 9), rel_tol=0, abs_tol=1e-12)
    assert isclose(se, sd / sqrt(10), rel_tol=0, abs_tol=1e-12)
    lo, hi = mean_ci_approx(mean, se, z=1.96)
    assert isclose(lo, mean - 1.96 * se, rel_tol=0, abs_tol=1e-12)
    assert isclose(hi, mean + 1.96 * se, rel_tol=0, abs_tol=1e-12)
    assert lo < mean < hi

    z = z_statistic(mean, 30.0, se)
    assert isclose(z, (mean - 30.0) / se, rel_tol=0, abs_tol=1e-12)
    assert z > 0

    g1, g2 = [20.0, 22.0, 21.0], [25.0, 27.0, 26.0]
    m1, s1 = sample_mean_and_sd(g1)
    m2, s2 = sample_mean_and_sd(g2)
    sp = sqrt((s1**2 + s2**2) / 2)
    d = cohens_d(m2, m1, sp)
    assert isclose(m1, 21.0, rel_tol=0, abs_tol=1e-12)
    assert isclose(m2, 26.0, rel_tol=0, abs_tol=1e-12)
    assert isclose(d, 5.0 / sp, rel_tol=0, abs_tol=1e-12)
    assert d > 1.0

    x = [1.0, 2.0, 3.0, 4.0, 5.0]
    y = [2.0, 4.0, 6.0, 8.0, 10.0]
    r = pearson_r(x, y)
    assert isclose(r, 1.0, rel_tol=0, abs_tol=1e-12)

    try:
        standard_error_mean(1.0, 0)
        raise AssertionError("expected failure")
    except ValueError:
        pass
    try:
        cohens_d(1.0, 0.0, 0.0)
        raise AssertionError("expected failure")
    except ValueError:
        pass

    print(
        "Unit 5.4 inference checks passed "
        f"(F={f_statistic}, chi2={chi_square:.3f}, n_eff={n_eff}, "
        f"SE={se:.4f}, z={z:.3f}, d={d:.3f}, r={r})."
    )


if __name__ == "__main__":
    main()
