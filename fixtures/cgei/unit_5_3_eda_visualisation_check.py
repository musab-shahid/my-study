"""Unit 5.3 EDA / visualisation teaching checks (stdlib).

Synthetic series only — not observed climate measurements.
"""
from __future__ import annotations


def flag_impossible_temps_c(values):
    """Domain QA: flag clearly impossible Celsius air temperatures for teaching."""
    return [v < -90 or v > 60 for v in values]


def outlier_treatment_requires_rule(delete: bool, rule_documented: bool) -> bool:
    """Deleting outliers is acceptable only when a pre-stated rule exists."""
    if not delete:
        return True
    return rule_documented


def axis_truncation_is_disclosed(y_min, data_min, disclosed: bool) -> bool:
    """Truncation below data range requires disclosure."""
    if y_min <= data_min:
        return True
    return disclosed


def main() -> None:
    flags = flag_impossible_temps_c([25.0, -9999.0, 42.0])
    assert flags == [False, True, False]

    assert outlier_treatment_requires_rule(delete=True, rule_documented=True)
    assert not outlier_treatment_requires_rule(delete=True, rule_documented=False)

    assert axis_truncation_is_disclosed(y_min=0, data_min=0, disclosed=False)
    assert not axis_truncation_is_disclosed(y_min=10, data_min=0, disclosed=False)
    assert axis_truncation_is_disclosed(y_min=10, data_min=0, disclosed=True)

    print("Unit 5.3 EDA visualisation checks passed (QA flags, outlier rule, axis disclosure).")


if __name__ == "__main__":
    main()
