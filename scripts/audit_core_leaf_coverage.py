#!/usr/bin/env python3
"""Core-leaf coverage gate: source TOC subtopics (Core) vs app dispositions.

Exit codes:
  0 — report written; no unmapped Core leaves and no stale app lesson IDs
  1 — unmapped Core leaves and/or stale lesson ID references
  2 — usage / IO / source parse error

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


def load_source_core(path: Path) -> list[dict[str, str]]:
    rows = list(csv.DictReader(path.open(encoding="utf-8")))
    return [
        r
        for r in rows
        if r.get("node_type") == "subtopic" and r.get("priority") == "Core"
    ]


def load_dispositions(docs_cgei: Path) -> dict[str, dict[str, str]]:
    out: dict[str, dict[str, str]] = {}
    for p in sorted(docs_cgei.glob("subject-*-unit-*-subtopic-traceability.csv")):
        with p.open(encoding="utf-8-sig", newline="") as fh:
            for row in csv.DictReader(fh):
                sid = (
                    row.get("source_subtopic_path")
                    or row.get("source_topic_path")
                    or row.get("leaf_id")
                    or row.get("source_id")
                    or ""
                ).strip()
                if not sid:
                    continue
                raw = (
                    row.get("disposition")
                    or row.get("mapping_status")
                    or row.get("subtopic_coverage_status")
                    or "mapped_partial"
                ).strip()
                # normalize legacy vocabulary into gate vocabulary
                if raw in ("mapped", "complete"):
                    disp = "mapped"
                elif raw in ("deferred",):
                    disp = "deferred"
                elif raw in ("gap", "unresolved", "candidate"):
                    # candidate/gap without lesson evidence stays visible as partial/unmapped later
                    disp = "mapped_partial" if (row.get("app_lesson_id") or row.get("app_lesson_ids")) else "mapped_partial"
                else:
                    disp = "mapped_partial"
                out[sid] = {
                    "disposition": disp if disp in VALID else "mapped_partial",
                    "app_lesson_ids": (
                        row.get("app_lesson_id") or row.get("app_lesson_ids") or ""
                    ).strip(),
                    "notes": (row.get("evidence_note") or row.get("notes") or "").strip(),
                    "source_file": p.name,
                }
    return out


def lesson_ids_in_curriculum(curriculum_ts: Path) -> set[str]:
    text = curriculum_ts.read_text(encoding="utf-8")
    return set(re.findall(r"id:\s*['\"](cgei-[^'\"]*lesson[^'\"]*)['\"]", text))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source-rows",
        type=Path,
        default=Path("docs/cgei/source-toc/priority-path-source-rows.csv"),
    )
    parser.add_argument("--docs-cgei", type=Path, default=Path("docs/cgei"))
    parser.add_argument(
        "--curriculum",
        type=Path,
        default=Path("src/data/cgei/curriculum.ts"),
    )
    parser.add_argument(
        "--report",
        type=Path,
        default=Path("docs/cgei/source-toc/core-leaf-coverage-report.csv"),
    )
    parser.add_argument(
        "--allow-unmapped",
        action="store_true",
        help="Exit 0 even if unmapped Core leaves remain (report still written).",
    )
    args = parser.parse_args()

    if not args.source_rows.is_file():
        print(f"ERROR: missing source rows {args.source_rows}", file=sys.stderr)
        return 2

    core = load_source_core(args.source_rows)
    dispositions = load_dispositions(args.docs_cgei)
    lessons = lesson_ids_in_curriculum(args.curriculum) if args.curriculum.is_file() else set()

    report_rows = []
    counts: Counter[str] = Counter()
    stale = 0
    for leaf in core:
        sid = leaf["source_id"]
        title = leaf.get("title", "")
        d = dispositions.get(sid)
        if not d:
            status = "unmapped"
            lesson_ids = ""
            notes = "No traceability row"
            source_file = ""
        else:
            status = d["disposition"]
            lesson_ids = d["app_lesson_ids"]
            notes = d["notes"]
            source_file = d["source_file"]
            for lid in re.split(r"[;,\s]+", lesson_ids):
                if lid and lessons and lid not in lessons:
                    status = "stale_mapping"
                    notes = f"Unknown lesson ID {lid}; {notes}".strip()
                    stale += 1
                    break
        counts[status] += 1
        report_rows.append(
            {
                "source_id": sid,
                "title": title,
                "unit": leaf.get("parent_id", ""),
                "priority": "Core",
                "disposition": status,
                "app_lesson_ids": lesson_ids,
                "traceability_file": source_file,
                "notes": notes,
            }
        )

    args.report.parent.mkdir(parents=True, exist_ok=True)
    with args.report.open("w", encoding="utf-8", newline="") as fh:
        writer = csv.DictWriter(
            fh,
            fieldnames=[
                "source_id",
                "title",
                "unit",
                "priority",
                "disposition",
                "app_lesson_ids",
                "traceability_file",
                "notes",
            ],
        )
        writer.writeheader()
        writer.writerows(report_rows)

    unmapped = counts.get("unmapped", 0)
    print(f"Core leaves: {len(core)}")
    print(
        "Disposition counts: "
        + ", ".join(f"{k}={counts[k]}" for k in sorted(counts))
    )
    print(f"Report: {args.report}")
    if unmapped and not args.allow_unmapped:
        print(
            f"FAIL: {unmapped} unmapped Core leaves (and {stale} stale mapping issues).",
            file=sys.stderr,
        )
        return 1
    if stale and not args.allow_unmapped:
        print(f"FAIL: {stale} stale mapping issues.", file=sys.stderr)
        return 1
    print("Core-leaf coverage gate: OK (or unmapped allowed).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
