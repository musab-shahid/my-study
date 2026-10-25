#!/usr/bin/env python3
"""Regression tests for the Core-leaf coverage gate's failure modes."""
from __future__ import annotations

import csv
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "audit_core_leaf_coverage.py"
SOURCE_FIELDS = [
    "source_order", "source_paragraph_index", "node_type", "source_id",
    "parent_id", "title", "priority",
]
TRACE_FIELDS = [
    "source_subtopic_path", "source_subtopic_title", "disposition",
    "app_lesson_id", "app_lesson_ids", "evidence_note",
]


def write_csv(path: Path, rows, fieldnames):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(fh, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def setup_case(td: str, source_rows=None, trace_rows=None, curriculum_text=None):
    root = Path(td)
    source = root / "source.csv"
    write_csv(source, source_rows if source_rows is not None else [{
        "source_order": "1", "source_paragraph_index": "1",
        "node_type": "subtopic", "source_id": "1.1.1.1",
        "parent_id": "1.1.1", "title": "Synthetic core leaf", "priority": "Core",
    }], SOURCE_FIELDS)
    docs = root / "docs_cgei"
    docs.mkdir(exist_ok=True)
    if trace_rows is not None:
        write_csv(docs / "subject-1-unit-1.1-subtopic-traceability.csv",
                  trace_rows, TRACE_FIELDS)
    curriculum = root / "curriculum.ts"
    if curriculum_text is None:
        curriculum_text = "export const lessons = [{ id: 'cgei-es-lesson-1-1-1' }];"
    curriculum.write_text(curriculum_text, encoding="utf-8")
    report = root / "report.csv"
    return source, docs, curriculum, report


def run_gate(source, docs, curriculum, report, *extra):
    return subprocess.run(
        [sys.executable, str(SCRIPT), "--source-rows", str(source),
         "--docs-cgei", str(docs), "--curriculum", str(curriculum),
         "--report", str(report), *extra],
        capture_output=True, text=True,
    )


def test_unmapped_fails_and_report_is_written():
    with tempfile.TemporaryDirectory() as td:
        source, docs, curriculum, report = setup_case(td)
        proc = run_gate(source, docs, curriculum, report)
        assert proc.returncode == 1, proc.stdout + proc.stderr
        assert "1 unmapped" in proc.stderr
        assert report.is_file()


def test_mapped_partial_with_real_lesson_id_passes():
    with tempfile.TemporaryDirectory() as td:
        source, docs, curriculum, report = setup_case(td, trace_rows=[{
            "source_subtopic_path": "1.1.1.1",
            "source_subtopic_title": "Synthetic core leaf",
            "disposition": "mapped_partial",
            "app_lesson_id": "cgei-es-lesson-1-1-1",
            "evidence_note": "partial mapping evidence",
        }])
        proc = run_gate(source, docs, curriculum, report)
        assert proc.returncode == 0, proc.stdout + proc.stderr


def test_partial_without_lesson_id_is_unmapped():
    with tempfile.TemporaryDirectory() as td:
        source, docs, curriculum, report = setup_case(td, trace_rows=[{
            "source_subtopic_path": "1.1.1.1",
            "disposition": "mapped_partial",
            "app_lesson_id": "",
            "app_lesson_ids": "",
            "evidence_note": "no actual lesson evidence",
        }])
        proc = run_gate(source, docs, curriculum, report)
        assert proc.returncode == 1, proc.stdout + proc.stderr
        with report.open(encoding="utf-8", newline="") as fh:
            row = next(csv.DictReader(fh))
        assert row["disposition"] == "unmapped"
        assert "No app lesson ID" in row["notes"]


def test_duplicate_source_disposition_is_fatal():
    with tempfile.TemporaryDirectory() as td:
        duplicate_rows = [
            {"source_subtopic_path": "1.1.1.1", "disposition": "mapped",
             "app_lesson_id": "cgei-es-lesson-1-1-1"},
            {"source_subtopic_path": "1.1.1.1", "disposition": "deferred",
             "app_lesson_id": ""},
        ]
        source, docs, curriculum, report = setup_case(td, trace_rows=duplicate_rows)
        proc = run_gate(source, docs, curriculum, report)
        assert proc.returncode == 2, proc.stdout + proc.stderr
        assert "duplicate disposition" in proc.stderr


def test_duplicate_source_core_ids_are_fatal():
    with tempfile.TemporaryDirectory() as td:
        duplicate_source = [
            {"source_order": "1", "source_paragraph_index": "1",
             "node_type": "subtopic", "source_id": "1.1.1.1",
             "parent_id": "1.1.1", "title": "A", "priority": "Core"},
            {"source_order": "2", "source_paragraph_index": "2",
             "node_type": "subtopic", "source_id": "1.1.1.1",
             "parent_id": "1.1.1", "title": "B", "priority": "Core"},
        ]
        source, docs, curriculum, report = setup_case(td, source_rows=duplicate_source)
        proc = run_gate(source, docs, curriculum, report)
        assert proc.returncode == 2, proc.stdout + proc.stderr
        assert "duplicate Core source IDs" in proc.stderr


def test_stale_id_fails():
    with tempfile.TemporaryDirectory() as td:
        source, docs, curriculum, report = setup_case(td, trace_rows=[{
            "source_subtopic_path": "1.1.1.1", "disposition": "mapped",
            "app_lesson_id": "cgei-es-lesson-does-not-exist",
        }])
        proc = run_gate(source, docs, curriculum, report)
        assert proc.returncode == 1, proc.stdout + proc.stderr
        assert "stale lesson ID" in proc.stderr
        with report.open(encoding="utf-8", newline="") as fh:
            row = next(csv.DictReader(fh))
        assert row["disposition"] == "stale_mapping"


def test_missing_curriculum_fails_closed():
    with tempfile.TemporaryDirectory() as td:
        source, docs, curriculum, report = setup_case(td)
        curriculum.unlink()
        proc = run_gate(source, docs, curriculum, report, "--allow-unmapped")
        assert proc.returncode == 2, proc.stdout + proc.stderr
        assert "missing curriculum input" in proc.stderr


def test_unparseable_curriculum_fails_closed():
    with tempfile.TemporaryDirectory() as td:
        source, docs, curriculum, report = setup_case(td, curriculum_text="not TypeScript lesson data")
        proc = run_gate(source, docs, curriculum, report, "--allow-unmapped")
        assert proc.returncode == 2, proc.stdout + proc.stderr
        assert "no CGEI lesson IDs found" in proc.stderr


def test_allow_unmapped_does_not_hide_stale_ids():
    with tempfile.TemporaryDirectory() as td:
        source, docs, curriculum, report = setup_case(td, trace_rows=[{
            "source_subtopic_path": "1.1.1.1", "disposition": "mapped",
            "app_lesson_id": "cgei-es-lesson-does-not-exist",
        }])
        proc = run_gate(source, docs, curriculum, report, "--allow-unmapped")
        assert proc.returncode == 1, proc.stdout + proc.stderr
        assert "stale lesson ID" in proc.stderr


def main():
    tests = [
        test_unmapped_fails_and_report_is_written,
        test_mapped_partial_with_real_lesson_id_passes,
        test_partial_without_lesson_id_is_unmapped,
        test_duplicate_source_disposition_is_fatal,
        test_duplicate_source_core_ids_are_fatal,
        test_stale_id_fails,
        test_missing_curriculum_fails_closed,
        test_unparseable_curriculum_fails_closed,
        test_allow_unmapped_does_not_hide_stale_ids,
    ]
    for test in tests:
        test()
    print(f"test_audit_core_leaf_coverage: OK ({len(tests)} cases)")


if __name__ == "__main__":
    main()
