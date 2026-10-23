"""Subject 7 risk-index teaching checks (stdlib).

Synthetic district-level components — not observed Multan/Pakistan loss data.

Validates:
1) Risk index is a transparent weighted combination of hazard, exposure, vulnerability
2) Rankings can change when weights change
3) Missing components yield incomplete (not silently zero) risk
4) Hazard alone is not treated as risk
"""
from __future__ import annotations

from math import isclose


def normalize_0_1(values):
    lo, hi = min(values), max(values)
    if hi == lo:
        return [0.0 for _ in values]
    return [(v - lo) / (hi - lo) for v in values]


def risk_index(h, e, v, weights=(1 / 3, 1 / 3, 1 / 3)):
    wh, we, wv = weights
    if abs(wh + we + wv - 1.0) > 1e-9:
        raise ValueError("weights must sum to 1")
    if h is None or e is None or v is None:
        return None  # incomplete — do not coerce missing to zero risk
    return wh * h + we * e + wv * v


def ranks(scores):
    # higher score => rank 1
    order = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)
    r = [0] * len(scores)
    for rank, i in enumerate(order, start=1):
        r[i] = rank
    return r


def main() -> None:
    # Three synthetic districts: raw component scores already on 0–1 teaching scale
    # A: high hazard, low vulnerability
    # B: moderate hazard, high vulnerability
    # C: low hazard, high exposure
    districts = [
        {"id": "A", "H": 0.90, "E": 0.40, "V": 0.20},
        {"id": "B", "H": 0.50, "E": 0.50, "V": 0.90},
        {"id": "C", "H": 0.30, "E": 0.95, "V": 0.40},
    ]

    equal = (1 / 3, 1 / 3, 1 / 3)
    scores_eq = [risk_index(d["H"], d["E"], d["V"], equal) for d in districts]
    assert all(s is not None for s in scores_eq)
    # Expected equal-weight scores
    assert isclose(scores_eq[0], (0.90 + 0.40 + 0.20) / 3, abs_tol=1e-12)
    assert isclose(scores_eq[1], (0.50 + 0.50 + 0.90) / 3, abs_tol=1e-12)
    assert isclose(scores_eq[2], (0.30 + 0.95 + 0.40) / 3, abs_tol=1e-12)

    # Hazard-heavy weights change ranking relative to vulnerability-heavy weights
    hazard_heavy = (0.70, 0.15, 0.15)
    vuln_heavy = (0.15, 0.15, 0.70)
    s_h = [risk_index(d["H"], d["E"], d["V"], hazard_heavy) for d in districts]
    s_v = [risk_index(d["H"], d["E"], d["V"], vuln_heavy) for d in districts]
    rank_h = ranks(s_h)
    rank_v = ranks(s_v)
    # A should rank higher under hazard-heavy than under vulnerability-heavy
    assert rank_h[0] < rank_v[0]
    # B should rank higher under vulnerability-heavy than under hazard-heavy
    assert rank_v[1] < rank_h[1]
    assert rank_h != rank_v  # weight choice changes ranking

    # Missing vulnerability must not become zero-risk by silent fill
    incomplete = risk_index(0.9, 0.5, None, equal)
    assert incomplete is None

    # Hazard alone is not the risk index
    hazard_only = [d["H"] for d in districts]
    assert ranks(hazard_only) != ranks(scores_eq)

    try:
        risk_index(0.1, 0.2, 0.3, (0.5, 0.5, 0.5))
        raise AssertionError("expected weight sum failure")
    except ValueError:
        pass

    print(
        "Unit 7 risk-index checks passed "
        f"(equal={['%.3f' % s for s in scores_eq]}, "
        f"rank_hazard_heavy={rank_h}, rank_vuln_heavy={rank_v})."
    )


if __name__ == "__main__":
    main()
