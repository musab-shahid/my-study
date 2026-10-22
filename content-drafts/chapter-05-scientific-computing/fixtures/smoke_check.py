#!/usr/bin/env python3
"""Recompute selected Chapter 5 numerical teaching claims. Synthetic only."""
from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf

ROOT = Path(__file__).resolve().parent


def check_eigen() -> None:
    S = np.array([[1.0, 0.8], [0.8, 1.0]])
    evals, evecs = np.linalg.eigh(S)
    order = np.argsort(evals)[::-1]
    evals, evecs = evals[order], evecs[:, order]
    assert np.allclose(evals, [1.8, 0.2])
    assert np.allclose(S @ evecs[:, 0], evals[0] * evecs[:, 0])
    print("OK eigenexample")


def check_bayes() -> None:
    p_b = 0.9 * 0.05 + 0.1 * 0.95
    post = 0.9 * 0.05 / p_b
    assert abs(p_b - 0.14) < 1e-12
    assert abs(post - 0.32142857142857145) < 1e-9
    print("OK bayes A5")


def check_euler() -> None:
    k, c0, dt = 0.5, 10.0, 1.0
    c1 = c0 + dt * (-k * c0)
    c2 = c1 + dt * (-k * c1)
    assert abs(c1 - 5.0) < 1e-12 and abs(c2 - 2.5) < 1e-12
    print("OK euler path", c1, c2)


def check_pkt_daily_max() -> None:
    df = pd.read_csv(ROOT / "synthetic_hourly_utc.csv", parse_dates=["time_utc"])
    df["time_utc"] = pd.to_datetime(df["time_utc"], utc=True)
    df["time_pkt"] = df["time_utc"].dt.tz_convert("Asia/Karachi")
    df["local_date"] = df["time_pkt"].dt.date
    daily = df.groupby("local_date")["t2m_c"].max()
    # Sanity: more than one local day; maxima finite
    assert len(daily) >= 2
    assert np.isfinite(daily.to_numpy()).all()
    print("OK pkt daily max\n", daily)


def check_eof_weights() -> None:
    # Synthetic field: time x space, known spatial mode proportional to cos(lat)
    rng = np.random.default_rng(0)
    lats = np.array([10.0, 20.0, 30.0, 40.0])
    n_time = 40
    mode = np.cos(np.deg2rad(lats))
    pc = rng.normal(size=n_time)
    X = np.outer(pc, mode) + 0.05 * rng.normal(size=(n_time, lats.size))
    X -= X.mean(axis=0, keepdims=True)
    w = np.sqrt(np.cos(np.deg2rad(lats)))
    Xw = X * w
    _u, s, vt = np.linalg.svd(Xw, full_matrices=False)
    eof1_weighted_space = vt[0]
    # Map spatial pattern back to physical grid for plotting
    eof1_map = eof1_weighted_space / w
    # First mode should correlate strongly with true mode (abs)
    corr = np.corrcoef(np.abs(eof1_map), np.abs(mode))[0, 1]
    assert corr > 0.9
    print("OK eof synthetic corr", float(corr), "varfrac0", float(s[0] ** 2 / np.sum(s ** 2)))




def check_logistic_glm() -> None:
    """Unit 5.9 synthetic logistic GLM — coefficients and predicted probs."""
    df = pd.read_csv(ROOT / "synthetic_heat_exceedance.csv")
    assert set(df.columns) >= {"lst_anom_c", "ndvi", "built_frac", "exceed"}
    assert df["exceed"].isin([0, 1]).all()
    assert 0.1 < df["exceed"].mean() < 0.9  # not separated by class rarity alone

    model = smf.glm(
        "exceed ~ lst_anom_c + ndvi + built_frac",
        data=df,
        family=sm.families.Binomial(),
    ).fit()

    # Locked reference values from audit execution (seeded fixture)
    expected = {
        "Intercept": -0.5856719334245448,
        "lst_anom_c": 0.4400675881212699,
        "ndvi": -2.365330186603578,
        "built_frac": 0.47010450038829293,
    }
    for name, val in expected.items():
        assert abs(float(model.params[name]) - val) < 1e-8, name

    settings = pd.DataFrame(
        {
            "lst_anom_c": [-1.0, 2.0],
            "ndvi": [0.50, 0.15],
            "built_frac": [0.20, 0.70],
        }
    )
    pred = model.predict(settings).to_numpy()
    assert abs(pred[0] - 0.10770664073655878) < 1e-8
    assert abs(pred[1] - 0.5667827809478765) < 1e-8

    # Independent recompute from coefficients
    b = model.params
    for i, row in settings.iterrows():
        eta = (
            b["Intercept"]
            + b["lst_anom_c"] * row["lst_anom_c"]
            + b["ndvi"] * row["ndvi"]
            + b["built_frac"] * row["built_frac"]
        )
        p = 1.0 / (1.0 + np.exp(-eta))
        assert abs(p - pred[i]) < 1e-12

    # No complete separation: fitted probabilities not stuck at 0/1
    phat = model.predict(df)
    assert phat.min() > 0.001 and phat.max() < 0.999

    print(
        "OK logistic GLM",
        f"predA={pred[0]:.4f}",
        f"predB={pred[1]:.4f}",
        f"n_iter={model.fit_history.get('iteration', '?') if hasattr(model, 'fit_history') else 'ok'}",
    )


def main() -> int:
    check_eigen()
    check_bayes()
    check_euler()
    check_pkt_daily_max()
    check_eof_weights()
    check_logistic_glm()
    print("All Chapter 5 smoke checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
