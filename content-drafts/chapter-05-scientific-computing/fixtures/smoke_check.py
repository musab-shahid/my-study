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


def check_unit_5_2_examples() -> None:
    """Check numerical claims represented in the Unit 5.2 app lessons."""
    def celsius_to_kelvin(temp_c: float) -> float:
        if temp_c < -273.15:
            raise ValueError("Temperature is below absolute zero")
        return temp_c + 273.15

    assert abs(celsius_to_kelvin(0.0) - 273.15) < 1e-10
    assert abs(celsius_to_kelvin(25.0) - 298.15) < 1e-10
    try:
        celsius_to_kelvin(-300.0)
    except ValueError:
        pass
    else:
        raise AssertionError("absolute-zero guard did not raise")

    baseline_c = np.array([[30.0, 31.0], [32.0, 33.0]])
    time_offset_c = np.array([0.0, 1.0, 2.0])[:, None, None]
    field = baseline_c[None, :, :] + time_offset_c
    assert field.shape == (3, 2, 2)
    values = np.array([30.0, np.nan, 32.0])
    assert np.isnan(np.mean(values))
    assert abs(float(np.nanmean(values)) - 31.0) < 1e-12
    try:
        _ = np.array([0.0, 1.0, 2.0]) + np.zeros((2, 2))
    except ValueError:
        pass
    else:
        raise AssertionError("incompatible broadcast was not rejected")

    boundary = pd.DataFrame({
        "time_utc": ["2026-06-01T18:00:00Z", "2026-06-01T19:00:00Z"],
        "t2m_c": [39.0, 41.0],
    })
    boundary["time_utc"] = pd.to_datetime(boundary["time_utc"], utc=True)
    boundary["time_pkt"] = boundary["time_utc"].dt.tz_convert("Asia/Karachi")
    boundary["local_date"] = boundary["time_pkt"].dt.date
    assert str(boundary.loc[0, "local_date"]) == "2026-06-01"
    assert str(boundary.loc[1, "local_date"]) == "2026-06-02"
    daily = boundary.groupby("local_date")["t2m_c"].max()
    assert daily.to_dict() == {
        pd.Timestamp("2026-06-01").date(): 39.0,
        pd.Timestamp("2026-06-02").date(): 41.0,
    }

    import re
    pattern = re.compile(r"(?P<sensor>Landsat\d+)_(?P<date>\d{8})_(?P<band>B\d+)\.tif")
    match = pattern.fullmatch("Landsat8_20260615_B4.tif")
    assert match is not None
    assert match.groupdict() == {"sensor": "Landsat8", "date": "20260615", "band": "B4"}
    assert pattern.fullmatch("Landsat8_20260615_B4.tif.extra") is None
    print("OK Unit 5.2 scientific Python examples")


def check_unit_5_3_examples() -> None:
    """Check the numeric anomaly example and basic labelled figure construction."""
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    time = pd.date_range("1991-01-01", periods=24, freq="MS")
    values = np.sin(np.arange(24) * 2 * np.pi / 12) + np.arange(24) * 0.1
    df = pd.DataFrame({
        "time": time,
        "tmean_c": values,
        "ndvi": np.linspace(0.1, 0.6, 24),
        "lst_c": 38.0 - 8.0 * np.linspace(0.1, 0.6, 24) + np.random.default_rng(42).normal(0, 0.3, 24),
    })
    df["month"] = df["time"].dt.month
    baseline = df.loc[df["time"].dt.year.between(1991, 2020)]
    climatology = baseline.groupby("month")["tmean_c"].mean()
    df["anomaly_c"] = df["tmean_c"] - df["month"].map(climatology)
    # With this two-year synthetic baseline, each month's anomalies average to zero.
    assert np.allclose(df.groupby("month")["anomaly_c"].mean().to_numpy(), 0.0, atol=1e-12)

    fig, axes = plt.subplots(1, 2, figsize=(9, 3.5))
    axes[0].hist(df["lst_c"].dropna(), bins=8, edgecolor="white")
    axes[0].set_xlabel("LST (°C)")
    axes[0].set_ylabel("Pixel count")
    axes[1].scatter(df["ndvi"], df["lst_c"], s=3, alpha=0.15)
    axes[1].set_xlabel("NDVI (dimensionless)")
    axes[1].set_ylabel("LST (°C)")
    fig.tight_layout()
    assert axes[0].get_xlabel() == "LST (°C)"
    assert axes[1].get_ylabel() == "LST (°C)"
    plt.close(fig)
    print("OK Unit 5.3 EDA and visualisation examples")


def check_unit_5_4_examples() -> None:
    """Check the confidence-interval arithmetic, OLS and FDR examples."""
    import math
    import statsmodels.api as sm
    from statsmodels.stats.multitest import multipletests

    n, mean_c, sd_c = 30, 0.8, 1.2
    se_c = sd_c / math.sqrt(n)
    low, high = mean_c - 1.96 * se_c, mean_c + 1.96 * se_c
    assert abs(se_c - 0.219089) < 1e-5
    assert abs(low - 0.370584) < 1e-5
    assert abs(high - 1.229416) < 1e-5

    rng = np.random.default_rng(42)
    ndvi = np.linspace(0.1, 0.8, 30)
    lst = 40.0 - 7.0 * ndvi + rng.normal(0.0, 0.3, len(ndvi))
    model = sm.OLS(lst, sm.add_constant(ndvi)).fit()
    assert model.params[1] < 0
    assert len(model.resid) == len(ndvi)

    raw_p = np.array([0.001, 0.012, 0.031, 0.20, 0.44])
    reject, adjusted_p, _, _ = multipletests(raw_p, alpha=0.05, method="fdr_bh")
    assert len(reject) == len(raw_p) and len(adjusted_p) == len(raw_p)
    assert np.all(adjusted_p >= raw_p)
    print("OK Unit 5.4 statistics examples")


def check_unit_5_5_examples() -> None:
    """Check the Unit 5.5 SQL, key integrity, idempotence and manifest examples."""
    import sqlite3

    conn = sqlite3.connect(":memory:")
    conn.executescript(
        """
        CREATE TABLE stations (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL
        );
        CREATE TABLE daily (
            station_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            tmax_c REAL,
            UNIQUE (station_id, date)
        );
        INSERT INTO stations VALUES
            (1, 'North', 31.0, 71.0),
            (2, 'South', 31.2, 71.4);
        INSERT INTO daily VALUES
            (1, '2024-06-01', 35.0),
            (1, '2024-06-02', 37.0),
            (1, '2024-07-01', 39.0),
            (2, '2024-06-01', 40.0),
            (99, '2024-06-01', 42.0);
        """
    )
    rows = conn.execute(
        """
        SELECT s.id, s.name, AVG(d.tmax_c), COUNT(d.tmax_c)
        FROM stations AS s
        JOIN daily AS d ON d.station_id = s.id
        WHERE d.date >= '2024-06-01' AND d.date < '2024-07-01'
        GROUP BY s.id, s.name
        ORDER BY s.id
        """
    ).fetchall()
    assert rows == [(1, "North", 36.0, 2), (2, "South", 40.0, 1)]
    orphan_count = conn.execute(
        """
        SELECT COUNT(*) FROM daily AS d
        LEFT JOIN stations AS s ON s.id = d.station_id
        WHERE s.id IS NULL
        """
    ).fetchone()[0]
    assert orphan_count == 1  # a join should not silently hide unmatched keys

    # Same-key, same-value ingestion is idempotent; conflicting values fail loudly.
    def merge_by_key(existing, incoming):
        merged = {(r["station_id"], r["date"]): dict(r) for r in existing}
        for record in incoming:
            key = (record["station_id"], record["date"])
            if key in merged and merged[key] != record:
                raise ValueError(f"conflicting record for {key}")
            merged[key] = dict(record)
        return [merged[key] for key in sorted(merged)]

    incoming = [
        {"station_id": "S1", "date": "2024-06-01", "tmax_c": 35.0},
        {"station_id": "S1", "date": "2024-06-02", "tmax_c": 37.0},
    ]
    first = merge_by_key([], incoming)
    second = merge_by_key(first, incoming)
    assert first == second and len(second) == 2
    try:
        merge_by_key(first, [{"station_id": "S1", "date": "2024-06-01", "tmax_c": 99.0}])
    except ValueError:
        pass
    else:
        raise AssertionError("conflicting duplicate key was not rejected")

    manifest = {
        "dataset_id": "synthetic_station_daily",
        "source": "synthetic fixture",
        "variable": "tmax_c",
        "source_units": "degree_Celsius",
        "temporal_extent": "2024-06-01/2024-06-30",
        "retrieved_utc": "2026-10-22T00:00:00Z",
        "licence": "synthetic educational fixture",
        "sha256": "example-checksum-placeholder",
    }
    required = {"dataset_id", "source", "variable", "source_units", "temporal_extent", "retrieved_utc", "licence", "sha256"}
    assert required.issubset(manifest)
    assert manifest["source_units"] == "degree_Celsius"

    # Mock HTTP responses: verify bounded retry, Retry-After and timeout handling
    # without relying on a live provider or network access.
    class FakeResponse:
        def __init__(self, status_code, payload, headers=None):
            self.status_code = status_code
            self._payload = payload
            self.headers = headers or {}

        def raise_for_status(self):
            if self.status_code >= 400:
                raise RuntimeError(f"HTTP {self.status_code}")

        def json(self):
            return self._payload

    def get_json_with_retry(get, attempts=4, sleep=lambda _seconds: None):
        retryable = {429, 500, 502, 503, 504}
        for attempt in range(attempts):
            try:
                response = get()
            except (TimeoutError, ConnectionError):
                if attempt == attempts - 1:
                    raise
                sleep(min(2 ** attempt, 60))
                continue
            if response.status_code in retryable and attempt < attempts - 1:
                retry_after = response.headers.get("Retry-After", "")
                wait = int(retry_after) if retry_after.isdigit() else 2 ** attempt
                sleep(min(wait, 60))
                continue
            response.raise_for_status()
            return response.json()
        raise RuntimeError("Request attempts exhausted")

    queued = [FakeResponse(429, {"message": "rate limited"}, {"Retry-After": "3"}),
              FakeResponse(200, {"ok": True})]
    delays = []
    payload = get_json_with_retry(lambda: queued.pop(0), sleep=delays.append)
    assert payload == {"ok": True} and delays == [3]

    timeout_calls = {"n": 0}
    def timeout_then_success():
        timeout_calls["n"] += 1
        if timeout_calls["n"] == 1:
            raise TimeoutError("synthetic timeout")
        return FakeResponse(200, {"ok": True})
    timeout_delays = []
    assert get_json_with_retry(timeout_then_success, sleep=timeout_delays.append) == {"ok": True}
    assert timeout_calls["n"] == 2 and timeout_delays == [1]

    server_errors = [FakeResponse(500, {"error": "synthetic"}), FakeResponse(500, {"error": "synthetic"})]
    server_delays = []
    try:
        get_json_with_retry(lambda: server_errors.pop(0), attempts=2, sleep=server_delays.append)
    except RuntimeError:
        pass
    else:
        raise AssertionError("repeated HTTP 500 responses should fail after the retry limit")
    assert server_delays == [1] and not server_errors

    conn.close()
    print("OK Unit 5.5 SQL, idempotence, manifest and mocked API retry examples")


def main() -> int:
    check_eigen()
    check_bayes()
    check_euler()
    check_pkt_daily_max()
    check_eof_weights()
    check_logistic_glm()
    check_unit_5_2_examples()
    check_unit_5_3_examples()
    check_unit_5_4_examples()
    check_unit_5_5_examples()
    print("All Chapter 5 smoke checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
