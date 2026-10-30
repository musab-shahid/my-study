"""Subject 13 capstone teaching checks (stdlib).

End-to-end synthetic urban-heat screening workflow:
protocol fields → data contract → baseline summary → H/E/V index →
weight sensitivity → provenance → decision card limits.

SYNTHETIC neighbourhoods only. Not Multan observations, not calibrated
health risk, not operational guidance.
"""
from __future__ import annotations

from math import isclose
from hashlib import sha256
import json


PROTOCOL_REQUIRED = (
    "research_question",
    "study_area_label",
    "time_horizon",
    "estimand",
    "intended_use",
    "exclusions",
)


def validate_protocol(protocol: dict) -> list[str]:
    errs = []
    for k in PROTOCOL_REQUIRED:
        if not protocol.get(k):
            errs.append(f"missing_protocol:{k}")
    if protocol.get("claims_operational_forecast") is True:
        errs.append("operational_forecast_not_allowed_in_capstone_fixture")
    if protocol.get("claims_calibrated_health_risk") is True:
        errs.append("calibrated_health_risk_not_allowed")
    return errs


def validate_rows(rows: list[dict]) -> list[dict]:
    if not rows:
        raise ValueError("empty_input")
    required = ("nbhd_id", "lst_anomaly_c", "pop_density", "vuln_index")
    out = []
    for i, row in enumerate(rows):
        for k in required:
            if k not in row or row[k] is None:
                raise ValueError(f"missing_field:{k}:row:{i}")
        lst = float(row["lst_anomaly_c"])
        pop = float(row["pop_density"])
        vuln = float(row["vuln_index"])
        if pop < 0:
            raise ValueError(f"negative_population:row:{i}")
        if not (0 <= vuln <= 1):
            raise ValueError(f"vuln_out_of_range:row:{i}")
        out.append({"nbhd_id": str(row["nbhd_id"]), "H": lst, "E": pop, "V": vuln})
    return out


def minmax(values: list[float]) -> list[float]:
    lo, hi = min(values), max(values)
    if hi == lo:
        return [0.0 for _ in values]
    return [(v - lo) / (hi - lo) for v in values]


def risk_scores(rows: list[dict], weights=(1 / 3, 1 / 3, 1 / 3)) -> list[dict]:
    wh, we, wv = weights
    if abs(wh + we + wv - 1.0) > 1e-9:
        raise ValueError("weights_must_sum_to_1")
    h_n = minmax([r["H"] for r in rows])
    e_n = minmax([r["E"] for r in rows])
    v_n = minmax([r["V"] for r in rows])
    scored = []
    for r, h, e, v in zip(rows, h_n, e_n, v_n):
        scored.append(
            {
                "nbhd_id": r["nbhd_id"],
                "H_n": h,
                "E_n": e,
                "V_n": v,
                "risk": wh * h + we * e + wv * v,
            }
        )
    return scored


def ranks(scores: list[float]) -> list[int]:
    order = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)
    out = [0] * len(scores)
    for rank, i in enumerate(order, start=1):
        out[i] = rank
    return out


def decision_card(scored: list[dict], protocol: dict, software_version: str) -> dict:
    top = sorted(scored, key=lambda r: r["risk"], reverse=True)[:2]
    return {
        "intended_use": protocol["intended_use"],
        "exclusions": protocol["exclusions"],
        "top_neighbourhoods": [t["nbhd_id"] for t in top],
        "components_visible": True,
        "confidence_note": "Synthetic screening ranks only; not calibrated loss or health risk",
        "software_version": software_version,
        "human_review_required": True,
    }


def run_capstone(rows: list[dict], protocol: dict, software_version: str = "0.1.0") -> dict:
    perr = validate_protocol(protocol)
    if perr:
        raise ValueError(";".join(perr))
    cleaned = validate_rows(rows)
    baseline = {
        "n": len(cleaned),
        "mean_lst_anomaly_c": sum(r["H"] for r in cleaned) / len(cleaned),
        "mean_vuln": sum(r["V"] for r in cleaned) / len(cleaned),
    }
    equal = risk_scores(cleaned, (1 / 3, 1 / 3, 1 / 3))
    heat_heavy = risk_scores(cleaned, (0.6, 0.2, 0.2))
    rank_eq = ranks([r["risk"] for r in equal])
    rank_hh = ranks([r["risk"] for r in heat_heavy])
    card = decision_card(equal, protocol, software_version)
    payload = {
        "baseline": baseline,
        "equal_weight": equal,
        "rank_equal": rank_eq,
        "rank_heat_heavy": rank_hh,
        "decision_card": card,
        "provenance": {
            "source": "synthetic_neighbourhood_table",
            "n_input": len(rows),
            "n_output": len(cleaned),
            "software_version": software_version,
            "study_area_label": protocol["study_area_label"],
        },
    }
    payload["fingerprint"] = sha256(
        json.dumps(
            {
                "baseline": baseline,
                "ranks": {"eq": rank_eq, "hh": rank_hh},
                "top": card["top_neighbourhoods"],
            },
            sort_keys=True,
            separators=(",", ":"),
        ).encode("utf-8")
    ).hexdigest()
    return payload


def main() -> None:
    protocol = {
        "research_question": "Which synthetic neighbourhoods rank highest for heat screening under equal H/E/V weights?",
        "study_area_label": "synthetic_city_grid",
        "time_horizon": "synthetic summer snapshot",
        "estimand": "Equal-weight min-max composite of LST anomaly, population density, and vulnerability index by neighbourhood",
        "intended_use": "Teaching screening ranks only",
        "exclusions": "Not Multan empirical risk; not health or loss calibration",
        "claims_operational_forecast": False,
        "claims_calibrated_health_risk": False,
    }
    rows = [
        {"nbhd_id": "N1", "lst_anomaly_c": 3.0, "pop_density": 100.0, "vuln_index": 0.2},
        {"nbhd_id": "N2", "lst_anomaly_c": 1.0, "pop_density": 500.0, "vuln_index": 0.8},
        {"nbhd_id": "N3", "lst_anomaly_c": 2.0, "pop_density": 200.0, "vuln_index": 0.5},
    ]
    out1 = run_capstone(rows, protocol)
    out2 = run_capstone(rows, protocol)
    assert out1["fingerprint"] == out2["fingerprint"]
    assert out1["baseline"]["n"] == 3
    assert isclose(out1["baseline"]["mean_lst_anomaly_c"], 2.0, abs_tol=1e-12)
    assert out1["decision_card"]["components_visible"] is True
    assert out1["decision_card"]["human_review_required"] is True
    assert out1["rank_equal"] != out1["rank_heat_heavy"] or True  # may or may not differ; check sensitivity runs
    # Force sensitivity: N1 high H, N2 high E/V — ranks should differ
    assert out1["rank_equal"] != out1["rank_heat_heavy"]

    bad_protocol = {**protocol, "claims_calibrated_health_risk": True}
    try:
        run_capstone(rows, bad_protocol)
        raise AssertionError("expected health risk claim failure")
    except ValueError as exc:
        assert "calibrated_health_risk_not_allowed" in str(exc)

    try:
        validate_rows([{"nbhd_id": "N1", "lst_anomaly_c": 1.0, "pop_density": -1, "vuln_index": 0.5}])
        raise AssertionError("expected negative pop failure")
    except ValueError as exc:
        assert "negative_population" in str(exc)

    print(
        "Unit 13 capstone heat-risk checks passed "
        f"(top={out1['decision_card']['top_neighbourhoods']}, "
        f"fp={out1['fingerprint'][:12]}…)."
    )


if __name__ == "__main__":
    main()
