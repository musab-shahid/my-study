#!/usr/bin/env python3
"""Core-leaf coverage gate: source TOC subtopics (Core) vs app dispositions.

Exit codes:
  0 — report written; no unmapped Core leaves and no stale app lesson IDs
  1 — unmapped Core leaves and/or stale app lesson ID references
  2 — usage, input, duplicate-disposition, or curriculum-parse error

This gate measures traceability dispositions only. It does not certify mastery,
pedagogy, or scientific validity.
"""
from __future__ import annotations

import argparse
import csv
import re
import sys
from collections import Counter
from pathlib import Path

VALID = {"mapped", "mapped_partial", "deferred"}
LESSON_ID = re.compile(r"""id:\s*['"](cgei-[^'"]*lesson[^'"]*)['"]""")


def load_source_core(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8-sig", newline="") as fh:
        reader = csv.DictReader(fh)
        required = {"node_type", "priority", "source_id"}
        if not reader.fieldnames or not required.issubset(reader.fieldnames):
            raise ValueError(
                f"source rows missing required columns {sorted(required)}: {path}"
            )
        rows = list(reader)
    core = [
        r for r in rows
        if r.get("node_type") == "subtopic" and r.get("priority") == "Core"
    ]
    missing_ids = [str(i + 2) for i, row in enumerate(core) if not row.get("source_id", "").strip()]
    if missing_ids:
        raise ValueError(f"Core source rows have blank source_id at CSV lines {', '.join(missing_ids)}")
    ids = [row["source_id"].strip() for row in core]
    duplicates = sorted({sid for sid in ids if ids.count(sid) > 1})
    if duplicates:
        raise ValueError(f"duplicate Core source IDs in source rows: {duplicates[:20]}")
    return core


def load_dispositions(docs_cgei: Path) -> dict[str, dict[str, str]]:
    out: dict[str, dict[str, str]] = {}
    origins: dict[str, str] = {}
    for path in sorted(docs_cgei.glob("subject-*-unit-*-subtopic-traceability.csv")):
        with path.open(encoding="utf-8-sig", newline="") as fh:
            for line_number, row in enumerate(csv.DictReader(fh), start=2):
                sid = (
                    row.get("source_subtopic_path")
                    or row.get("source_topic_path")
                    or row.get("leaf_id")
                    or row.get("source_id")
                    or ""
                ).strip()
                if not sid:
                    continue
                origin = f"{path.name}:{line_number}"
                if sid in out:
                    raise ValueError(
                        f"duplicate disposition for source ID {sid!r}: "
                        f"{origins[sid]} and {origin}"
                    )
                raw = (
                    row.get("disposition")
                    or row.get("mapping_status")
                    or row.get("subtopic_coverage_status")
                    or ""
                ).strip().lower()
                lesson_ids = (
                    row.get("app_lesson_id") or row.get("app_lesson_ids") or ""
                ).strip()
                notes = (row.get("evidence_note") or row.get("notes") or "").strip()

                if raw in ("mapped", "complete"):
                    disposition = "mapped"
                elif raw == "deferred":
                    disposition = "deferred"
                elif raw in ("mapped_partial", "partial"):
                    disposition = "mapped_partial"
                elif raw in ("gap", "unresolved", "candidate", ""):
                    # A legacy gap/candidate is not a mapping unless it points to
                    # an actual lesson. Without that evidence, keep it unresolved.
                    disposition = "mapped_partial" if lesson_ids else "unmapped"
                else:
                    raise ValueError(
                        f"unknown disposition {raw!r} for {sid!r} at {origin}"
                    )

                if disposition in ("mapped", "mapped_partial") and not lesson_ids:
                    disposition = "unmapped"
                    notes = (
                        "No app lesson ID supplied for mapping disposition. "
                        + notes
                    ).strip()
                out[sid] = {
                    "disposition": disposition,
                    "app_lesson_ids": lesson_ids,
                    "notes": notes,
                    "source_file": path.name,
                }
                origins[sid] = origin
    return out


def lesson_ids_in_curriculum(path: Path) -> set[str]:
    if not path.is_file():
        raise ValueError(f"missing curriculum input: {path}")
    text = path.read_text(encoding="utf-8")
    ids = set(LESSON_ID.findall(text))
    if not ids:
        raise ValueError(
            f"curriculum input is empty or unparseable: no CGEI lesson IDs found in {path}"
        )
    return ids


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source-rows", type=Path,
        default=Path("docs/cgei/source-toc/priority-path-source-rows.csv"),
    )
    parser.add_argument("--docs-cgei", type=Path, default=Path("docs/cgei"))
    parser.add_argument(
        "--curriculum", type=Path, default=Path("src/data/cgei/curriculum.ts"),
    )
    parser.add_argument(
        "--report", type=Path,
        default=Path("docs/cgei/source-toc/core-leaf-coverage-report.csv"),
    )
    parser.add_argument(
        "--allow-unmapped", action="store_true",
        help="Exit 0 even if unmapped Core leaves remain (report still written).",
    )
    args = parser.parse_args()

    try:
        if not args.source_rows.is_file():
            raise ValueError(f"missing source rows: {args.source_rows}")
        core = load_source_core(args.source_rows)
        if not core:
            raise ValueError(f"no Core subtopic leaves found in {args.source_rows}")
        dispositions = load_dispositions(args.docs_cgei)
        lessons = lesson_ids_in_curriculum(args.curriculum)
    except (OSError, UnicodeError, csv.Error, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    report_rows = []
    counts: Counter[str] = Counter()
    stale = 0
    for leaf in core:
        sid = leaf["source_id"].strip()
        disposition = dispositions.get(sid)
        if not disposition:
            status = "unmapped"
            lesson_ids = ""
            notes = "No traceability row"
            source_file = ""
        else:
            status = disposition["disposition"]
            lesson_ids = disposition["app_lesson_ids"]
            notes = disposition["notes"]
            source_file = disposition["source_file"]
            unknown = [
                lesson_id for lesson_id in re.split(r"[;,\s]+", lesson_ids)
                if lesson_id and lesson_id not in lessons
            ]
            if unknown:
                status = "stale_mapping"
                notes = f"Unknown lesson ID(s): {', '.join(unknown)}. {notes}".strip()
                stale += len(unknown)

        counts[status] += 1
        report_rows.append({
            "source_id": sid,
            "title": leaf.get("title", ""),
            "unit": leaf.get("parent_id", ""),
            "priority": "Core",
            "disposition": status,
            "app_lesson_ids": lesson_ids,
            "traceability_file": source_file,
            "notes": notes,
        })

    try:
        args.report.parent.mkdir(parents=True, exist_ok=True)
        with args.report.open("w", encoding="utf-8", newline="") as fh:
            writer = csv.DictWriter(
                fh,
                fieldnames=[
                    "source_id", "title", "unit", "priority", "disposition",
                    "app_lesson_ids", "traceability_file", "notes",
                ],
            )
            writer.writeheader()
            writer.writerows(report_rows)
    except OSError as exc:
        print(f"ERROR: cannot write report {args.report}: {exc}", file=sys.stderr)
        return 2

    unmapped = counts.get("unmapped", 0)
    print(f"Core leaves: {len(core)}")
    print("Disposition counts: " + ", ".join(
        f"{key}={counts[key]}" for key in sorted(counts)
    ))
    print(f"Report: {args.report}")
    if (unmapped or stale) and not args.allow_unmapped:
        print(
            f"FAIL: {unmapped} unmapped Core leaves; {stale} stale lesson ID reference(s).",
            file=sys.stderr,
        )
        return 1
    print("Core-leaf coverage gate: OK (unmapped allowed)." if args.allow_unmapped
          else "Core-leaf coverage gate: OK.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
