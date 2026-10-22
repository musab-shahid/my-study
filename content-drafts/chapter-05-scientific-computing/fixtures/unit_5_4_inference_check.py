"""Fixture-backed arithmetic checks for the Unit 5.4 inference examples.

These checks validate the worked-example calculations only. They do not validate
sampling assumptions, distributional calibration, or inferential claims on real data.
"""
from math import isclose


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
    col_totals = [sum(observed[i][j] for i in range(len(observed))) for j in range(len(observed[0]))]
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


def main():
    groups = [[20, 22, 21], [25, 27, 26], [23, 24, 22]]
    ss_between, ss_within, f_statistic = one_way_anova(groups)
    assert isclose(ss_between, 38.0, rel_tol=0, abs_tol=1e-12)
    assert isclose(ss_within, 6.0, rel_tol=0, abs_tol=1e-12)
    assert isclose(f_statistic, 19.0, rel_tol=0, abs_tol=1e-12)

    observed = [[30, 10], [8, 52]]
    expected, chi_square = pearson_chi_square(observed)
    expected_flat = [value for row in expected for value in row]
    assert all(isclose(a, b, rel_tol=0, abs_tol=1e-12)
               for a, b in zip(expected_flat, [15.2, 24.8, 22.8, 37.2]))
    assert isclose(chi_square, 38.737973967176, rel_tol=0, abs_tol=1e-9)
    assert min(expected_flat) > 5

    # AR(1)-like effective-sample-size heuristic: illustrative, not universal.
    n, rho = 100, 0.60
    n_eff = n * (1 - rho) / (1 + rho)
    assert isclose(n_eff, 25.0, rel_tol=0, abs_tol=1e-12)
    # Partial correlation example used in lesson 5-4-4
    r_xy, r_xz, r_yz = -0.60, 0.50, -0.40
    r_xy_z = (r_xy - r_xz * r_yz) / ((1 - r_xz**2) * (1 - r_yz**2)) ** 0.5
    assert isclose(r_xy_z, -0.5039526306789697, rel_tol=0, abs_tol=1e-9)

    # Power sketch n ≈ 2 (zα + zβ)^2 (σ/δ)^2
    z_a, z_b, sigma, delta = 1.96, 0.84, 4.0, 2.0
    n_per_group = 2 * (z_a + z_b) ** 2 * (sigma / delta) ** 2
    assert isclose(n_per_group, 62.72, rel_tol=0, abs_tol=1e-9)

    print("Unit 5.4 ANOVA, chi-square, n_eff, partial correlation, and power-sketch arithmetic passed.")


if __name__ == "__main__":
    main()
