"""Unit 4.9 advanced EO analysis teaching checks (stdlib).

Synthetic scores and series — not STARFM/TIMESAT production runs.

1) Fusion skill vs best single source (prefer fusion only if better)
2) Seasonal anomaly = observation - baseline
3) Stratum-wise rates vs overall
4) Monitoring config validation (latency, threshold present)
"""
from __future__ import annotations

from math import isclose


def best_single_source(scores: dict[str, float]) -> tuple[str, float]:
    return max(scores.items(), key=lambda kv: kv[1])


def fusion_adds_value(fusion_score: float, singles: dict[str, float]) -> bool:
    _, best = best_single_source(singles)
    return fusion_score > best


def seasonal_anomaly(observed: float, baseline: float) -> float:
    return observed - baseline


def stratum_rates(correct: dict[str, int], total: dict[str, int]) -> dict[str, float]:
    rates = {}
    for k in total:
        if total[k] <= 0:
            raise ValueError(f"empty stratum {k}")
        rates[k] = correct.get(k, 0) / total[k]
    return rates


def overall_rate(correct: dict[str, int], total: dict[str, int]) -> float:
    c = sum(correct.values())
    t = sum(total.values())
    return c / t if t else 0.0


def validate_monitor_config(cfg: dict) -> list[str]:
    errs = []
    for k in ("cadence_hours", "max_latency_hours", "alert_threshold", "human_review"):
        if k not in cfg:
            errs.append(f"missing:{k}")
    if "max_latency_hours" in cfg and "cadence_hours" in cfg:
        if cfg["max_latency_hours"] < 0 or cfg["cadence_hours"] <= 0:
            errs.append("invalid:timing")
    return errs


def main() -> None:
    singles = {"optical": 0.72, "sar": 0.68, "thermal": 0.60}
    fusion_good = 0.78
    fusion_bad = 0.70
    assert fusion_adds_value(fusion_good, singles) is True
    assert fusion_adds_value(fusion_bad, singles) is False
    name, best = best_single_source(singles)
    assert name == "optical" and isclose(best, 0.72)

    anom = seasonal_anomaly(0.40, 0.55)
    assert isclose(anom, -0.15)

    correct = {"irrigated": 40, "rainfed": 20}
    total = {"irrigated": 50, "rainfed": 50}
    rates = stratum_rates(correct, total)
    overall = overall_rate(correct, total)
    assert isclose(rates["irrigated"], 0.8)
    assert isclose(rates["rainfed"], 0.4)
    assert isclose(overall, 0.6)
    assert rates["irrigated"] != rates["rainfed"]  # overall hides gap

    ok = {"cadence_hours": 24, "max_latency_hours": 12, "alert_threshold": -0.15, "human_review": True}
    assert validate_monitor_config(ok) == []
    assert "missing:alert_threshold" in validate_monitor_config({"cadence_hours": 24, "max_latency_hours": 12, "human_review": True})

    print(
        "Unit 4.9 advanced EO checks passed "
        f"(fusion_gain_ok, anomaly={anom:.2f}, stratum_gap_ok, monitor_cfg_ok)."
    )


if __name__ == "__main__":
    main()
