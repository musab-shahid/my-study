import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def test_full_source_gate_exits_zero():
    r = subprocess.run(
        [sys.executable, str(ROOT / "scripts/audit_full_source_disposition.py")],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    assert r.returncode == 0, r.stderr + r.stdout
    report = ROOT / "docs/cgei/source-toc/full-source-disposition-report.csv"
    assert report.is_file()
    lines = report.read_text(encoding="utf-8").strip().splitlines()
    assert len(lines) > 2700  # header + ~2763
    summary = json.loads((ROOT / "docs/cgei/source-toc/full-source-disposition-summary.json").read_text())
    assert summary["source_inventory_rows"] == 2763
    assert summary["disposition_totals"]["unmapped"] >= 0
    assert "unit_3_4_priority_note" in summary
