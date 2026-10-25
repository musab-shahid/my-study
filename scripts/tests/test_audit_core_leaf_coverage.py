#!/usr/bin/env python3
import csv
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "audit_core_leaf_coverage.py"


def write_csv(path: Path, rows, fieldnames):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(rows)


def test_unmapped_fails():
    with tempfile.TemporaryDirectory() as td:
        td_path = Path(td)
        source = td_path / "source.csv"
        write_csv(
            source,
            [
                {
                    "source_order": "1",
                    "source_paragraph_index": "1",
                    "node_type": "subtopic",
                    "source_id": "9.9.9.9",
                    "parent_id": "9.9.9",
                    "title": "Synthetic core leaf",
                    "priority": "Core",
                }
            ],
            [
                "source_order",
                "source_paragraph_index",
                "node_type",
                "source_id",
                "parent_id",
                "title",
                "priority",
            ],
        )
        docs = td_path / "docs_cgei"
        docs.mkdir()
        report = td_path / "report.csv"
        proc = subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                "--source-rows",
                str(source),
                "--docs-cgei",
                str(docs),
                "--curriculum",
                str(ROOT / "src/data/cgei/curriculum.ts"),
                "--report",
                str(report),
            ],
            capture_output=True,
            text=True,
        )
        assert proc.returncode == 1, proc.stdout + proc.stderr
        assert report.is_file()


def test_mapped_partial_ok_with_row():
    with tempfile.TemporaryDirectory() as td:
        td_path = Path(td)
        source = td_path / "source.csv"
        write_csv(
            source,
            [
                {
                    "source_order": "1",
                    "source_paragraph_index": "1",
                    "node_type": "subtopic",
                    "source_id": "1.1.1.1",
                    "parent_id": "1.1.1",
                    "title": "Atmosphere",
                    "priority": "Core",
                }
            ],
            [
                "source_order",
                "source_paragraph_index",
                "node_type",
                "source_id",
                "parent_id",
                "title",
                "priority",
            ],
        )
        docs = td_path / "docs_cgei"
        write_csv(
            docs / "subject-1-unit-1.1-subtopic-traceability.csv",
            [
                {
                    "source_subtopic_path": "1.1.1.1",
                    "source_subtopic_title": "Atmosphere",
                    "disposition": "mapped_partial",
                    "app_lesson_id": "cgei-es-lesson-1-1-1",
                    "evidence_note": "partial",
                }
            ],
            [
                "source_subtopic_path",
                "source_subtopic_title",
                "disposition",
                "app_lesson_id",
                "evidence_note",
            ],
        )
        report = td_path / "report.csv"
        proc = subprocess.run(
            [
                sys.executable,
                str(SCRIPT),
                "--source-rows",
                str(source),
                "--docs-cgei",
                str(docs),
                "--curriculum",
                str(ROOT / "src/data/cgei/curriculum.ts"),
                "--report",
                str(report),
            ],
            capture_output=True,
            text=True,
        )
        assert proc.returncode == 0, proc.stdout + proc.stderr


if __name__ == "__main__":
    test_unmapped_fails()
    test_mapped_partial_ok_with_row()
    print("test_audit_core_leaf_coverage: OK")
