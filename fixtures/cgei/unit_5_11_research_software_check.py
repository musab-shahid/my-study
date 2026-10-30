"""Unit 5.11 research software practice checks (stdlib)."""
from __future__ import annotations

REQUIRED_README = ("question", "data sources", "workflow", "reproduce", "limitations")
FORBIDDEN_PATH_SNIPPETS = ("API_KEY=", "BEGIN PRIVATE KEY", "password=")


def readme_has_sections(text: str) -> list[str]:
    lower = text.lower()
    return [s for s in REQUIRED_README if s not in lower]


def scan_for_secrets(text: str) -> list[str]:
    hits = []
    for snip in FORBIDDEN_PATH_SNIPPETS:
        if snip in text:
            hits.append(snip)
    return hits


def celsius_to_kelvin(t_c: float) -> float:
    return t_c + 273.15


def main() -> None:
    good_readme = """
    # Analysis
    question: trend in synthetic series
    data sources: local fixture v1
    workflow: scripts/run.py
    how to reproduce: pip install -r requirements.txt && python scripts/run.py
    outputs: results/table.csv
    limitations: synthetic data only
    """
    assert readme_has_sections(good_readme) == []
    assert "question" in readme_has_sections("no sections here")

    assert scan_for_secrets("print('ok')") == []
    assert "API_KEY=" in scan_for_secrets("API_KEY=secret")

    assert abs(celsius_to_kelvin(0.0) - 273.15) < 1e-12

    print("Unit 5.11 research software checks passed (readme sections, secret scan, unit test invariant).")


if __name__ == "__main__":
    main()
