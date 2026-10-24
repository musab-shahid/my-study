"""Multan UHI foundation — zone-level SUHII contrast (stdlib).

Reads synthetic zone table by default. Emits SUHII for rural and peri-urban
references, coverage filtering, and provenance. Does not download satellite data.
"""
from __future__ import annotations

import csv
import json
from hashlib import sha256
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "synthetic_lst_zones.csv"
OUT = ROOT / "outputs"
DEFAULT_MIN_COVERAGE = 0.30


def load_zones(path: Path = DATA) -> list[dict]:
    if not path.is_file():
        raise FileNotFoundError(f"missing_zones:{path}")
    rows = []
    with path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            rows.append(
                {
                    "zone_id": row["zone_id"],
                    "zone_class": row["zone_class"],
                    "lst_c": float(row["lst_c"]),
                    "n_valid": int(row["n_valid"]),
                    "n_total": int(row["n_total"]),
                    "area_weight": float(row["area_weight"]),
                }
            )
    if not rows:
        raise ValueError("empty_zones")
    return rows


def coverage_fraction(row: dict) -> float:
    if row["n_total"] <= 0:
        return 0.0
    return row["n_valid"] / row["n_total"]


def filter_coverage(rows: list[dict], min_frac: float = DEFAULT_MIN_COVERAGE) -> list[dict]:
    return [r for r in rows if coverage_fraction(r) >= min_frac]


def mean_lst(rows: list[dict], weighted: bool = False) -> float:
    if not rows:
        raise ValueError("empty_group")
    if not weighted:
        return sum(r["lst_c"] for r in rows) / len(rows)
    wsum = sum(r["area_weight"] for r in rows)
    if wsum <= 0:
        raise ValueError("non_positive_weights")
    return sum(r["lst_c"] * r["area_weight"] for r in rows) / wsum


def suhii(urban: list[dict], reference: list[dict], weighted: bool = False) -> float:
    return mean_lst(urban, weighted=weighted) - mean_lst(reference, weighted=weighted)


def run(min_coverage: float = DEFAULT_MIN_COVERAGE, weighted: bool = False) -> dict:
    rows = filter_coverage(load_zones(), min_coverage)
    urban = [r for r in rows if r["zone_class"] == "urban"]
    rural = [r for r in rows if r["zone_class"] == "reference_rural"]
    peri = [r for r in rows if r["zone_class"] == "reference_periurban"]
    if not urban or not rural:
        raise ValueError("insufficient_classes_after_coverage_filter")

    s_rural = suhii(urban, rural, weighted=weighted)
    s_peri = suhii(urban, peri, weighted=weighted) if peri else None

    payload = {
        "estimand": "SUHII = mean(LST_urban) - mean(LST_reference) [°C]",
        "min_coverage": min_coverage,
        "area_weighted": weighted,
        "n_urban": len(urban),
        "n_rural_ref": len(rural),
        "n_peri_ref": len(peri),
        "suhii_vs_rural_c": s_rural,
        "suhii_vs_periurban_c": s_peri,
        "sensitivity_reference_delta_c": (
            None if s_peri is None else s_rural - s_peri
        ),
        "input": str(DATA.relative_to(ROOT)),
        "input_sha256": sha256(DATA.read_bytes()).hexdigest(),
        "non_claims": [
            "Synthetic zones — not Multan satellite observations",
            "LST contrast is not 2 m air-temperature UHI",
            "Not heat-health risk or causal vegetation effect",
            "Not an operational decision product",
        ],
    }
    OUT.mkdir(parents=True, exist_ok=True)
    out_path = OUT / "uhi_contrast_result.json"
    out_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    payload["output_path"] = str(out_path)
    return payload


def main() -> None:
    result = run(weighted=False)
    result_w = run(weighted=True)
    print(
        "Multan UHI foundation contrast "
        f"(SUHII_rural={result['suhii_vs_rural_c']:.3f} °C, "
        f"SUHII_peri={result['suhii_vs_periurban_c']:.3f} °C, "
        f"Δ_ref={result['sensitivity_reference_delta_c']:.3f} °C, "
        f"weighted_rural={result_w['suhii_vs_rural_c']:.3f} °C)."
    )


if __name__ == "__main__":
    main()
