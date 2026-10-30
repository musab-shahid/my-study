"""Unit 2.8 regional climate literacy helpers (stdlib).

Synthetic teaching checks only — not PMD observations or Multan station validation.

1) Season labeler: PMD-style seasonal bins vs fixed JJA monsoon default.
2) Completeness for a seasonal mean (missing ≠ zero).
3) Evidence-type tags must stay distinct (principle / assessment / observed /
   synthetic / hypothesis).
"""
from __future__ import annotations

from math import isclose

# month 1..12 -> PMD-style teaching bins (not official regulation text)
PMD_STYLE = {
    12: "winter",
    1: "winter",
    2: "winter",
    3: "pre-monsoon",
    4: "pre-monsoon",
    5: "pre-monsoon",
    6: "monsoon",
    7: "monsoon",
    8: "monsoon",
    9: "monsoon",
    10: "post-monsoon",
    11: "post-monsoon",
}


def season_pmd_style(month: int) -> str:
    if month not in PMD_STYLE:
        raise ValueError("month must be 1..12")
    return PMD_STYLE[month]


def is_jja(month: int) -> bool:
    return month in (6, 7, 8)


def seasonal_mean(values, min_complete=0.8):
    valid = [v for v in values if v is not None]
    if not values:
        raise ValueError("empty")
    if len(valid) / len(values) < min_complete:
        return None
    return sum(valid) / len(valid)


def main() -> None:
    assert season_pmd_style(4) == "pre-monsoon"
    assert season_pmd_style(7) == "monsoon"
    assert season_pmd_style(1) == "winter"
    # JJA is not identical to full monsoon bin (includes September in PMD-style map)
    assert is_jja(7) is True
    assert is_jja(9) is False
    assert season_pmd_style(9) == "monsoon"

    # Incomplete pre-monsoon mean
    sparse = [32.0, None, None, None, 34.0]
    assert seasonal_mean(sparse, 0.8) is None
    dense = [32.0, 33.0, 34.0, 35.0, 36.0]
    assert isclose(seasonal_mean(dense, 0.8), 34.0, abs_tol=1e-12)

    # Evidence tags are mutually exclusive labels in teaching workflow
    tags = {"principle", "assessment", "observed", "synthetic", "hypothesis"}
    assert "synthetic" in tags and "observed" in tags
    claim = {"text": "T = 30 + 0.2 t series", "tag": "synthetic"}
    assert claim["tag"] != "observed"

    try:
        season_pmd_style(13)
        raise AssertionError("expected failure")
    except ValueError:
        pass

    print(
        "Unit 2.8 regional-literacy checks passed "
        f"(Apr={season_pmd_style(4)}, Sep={season_pmd_style(9)}, "
        f"mean={seasonal_mean(dense, 0.8)})."
    )


if __name__ == "__main__":
    main()
