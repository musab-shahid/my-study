"""Unit 5.9 logistic interpretation arithmetic (stdlib).

Locks inverse-logit predictions at two predictor settings using the same
coefficients as the statsmodels fit in smoke_check.check_logistic_glm.
Does not re-fit the GLM; does not validate real-world heat risk models.
"""
from __future__ import annotations

from math import exp, isclose


COEF = {
    "Intercept": -0.5856719334245448,
    "lst_anom_c": 0.4400675881212699,
    "ndvi": -2.365330186603578,
    "built_frac": 0.47010450038829293,
}


def inv_logit(eta: float) -> float:
    return 1.0 / (1.0 + exp(-eta))


def linear_predictor(lst_anom_c: float, ndvi: float, built_frac: float) -> float:
    return (
        COEF["Intercept"]
        + COEF["lst_anom_c"] * lst_anom_c
        + COEF["ndvi"] * ndvi
        + COEF["built_frac"] * built_frac
    )


def main() -> None:
    # Setting A: cooler, greener, less built
    eta_a = linear_predictor(-1.0, 0.50, 0.20)
    p_a = inv_logit(eta_a)
    assert isclose(p_a, 0.10770664073655878, rel_tol=0, abs_tol=1e-12)

    # Setting B: warmer, lower NDVI, more built
    eta_b = linear_predictor(2.0, 0.15, 0.70)
    p_b = inv_logit(eta_b)
    assert isclose(p_b, 0.5667827809478765, rel_tol=0, abs_tol=1e-12)

    # Odds ratio for a +1 °C LST anomaly (other predictors fixed)
    or_lst = exp(COEF["lst_anom_c"])
    assert isclose(or_lst, 1.5528121666217003, rel_tol=0, abs_tol=1e-12)

    print(
        "Unit 5.9 logistic interpretation checks passed "
        f"(p_A={p_a:.4f}, p_B={p_b:.4f}, OR_lst={or_lst:.4f})."
    )


if __name__ == "__main__":
    main()
