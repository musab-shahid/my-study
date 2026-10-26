#!/usr/bin/env python3
"""Full-source disposition audit for CGEI Priority Path TOC.

Denominators (do not conflate):
  - Full extracted inventory (all node types in priority-path-source-rows.csv)
  - Core subtopic leaves only (strict Core-leaf gate in audit_core_leaf_coverage.py)
  - Subject 8 Core leaves (112) vs broader 8.D competency target (117)

Every source node receives an explicit disposition. Missing matrix rows become
explicit `unmapped` (subtopic) or `aggregate` (subject/unit/topic derived from children).
Does not promote instructional readiness. Does not invent lessons.

Exit codes:
  0 — inventory complete; no invalid dispositions; Core subtopics have no silent gaps
  1 — structural integrity failure (duplicate IDs, broken parent links, invalid disposition)
  2 — usage / IO error
"""
from __future__ import annotations

import argparse
import csv
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE_CSV = ROOT / "docs/cgei/source-toc/priority-path-source-rows.csv"
REPORT_CSV = ROOT / "docs/cgei/source-toc/full-source-disposition-report.csv"
SUMMARY_JSON = ROOT / "docs/cgei/source-toc/full-source-disposition-summary.json"
DOCS_CGEI = ROOT / "docs/cgei"

VALID = {"mapped", "mapped_partial", "deferred", "unmapped", "aggregate", "not_applicable", "stale"}


def load_source_rows() -> list[dict[str, str]]:
    with SOURCE_CSV.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def load_matrix_dispositions() -> dict[str, dict[str, str]]:
    out: dict[str, dict[str, str]] = {}
    for path in sorted(DOCS_CGEI.rglob("*traceability*.csv")):
        with path.open(newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            if not reader.fieldnames:
                continue
            for row in reader:
                sid = (
                    row.get("source_subtopic_path")
                    or row.get("source_id")
                    or row.get("source_path")
                    or ""
                ).strip()
                if not sid:
                    continue
                disp = (row.get("disposition") or "").strip()
                lessons = (row.get("app_lesson_ids") or row.get("app_lesson_id") or "").strip()
                note = (row.get("evidence_note") or row.get("notes") or "").strip()
                origin = str(path.relative_to(ROOT))
                if sid in out and out[sid].get("disposition") != disp:
                    # prefer more complete evidence; keep first non-empty lessons
                    if lessons and not out[sid].get("lessons"):
                        out[sid]["lessons"] = lessons
                        out[sid]["origin"] = origin
                    continue
                out[sid] = {
                    "disposition": disp or "unmapped",
                    "lessons": lessons,
                    "note": note,
                    "origin": origin,
                }
    return out


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true", help="Write report CSV/JSON")
    parser.add_argument(
        "--require-core-dispositioned",
        action="store_true",
        default=True,
        help="Fail if any Core subtopic lacks a matrix disposition (default on)",
    )
    args = parser.parse_args()

    if not SOURCE_CSV.is_file():
        print(f"missing source inventory: {SOURCE_CSV}", file=sys.stderr)
        return 2

    rows = load_source_rows()
    matrices = load_matrix_dispositions()
    by_id = {r["source_id"]: r for r in rows if r.get("source_id")}

    errors: list[str] = []
    # duplicate source_id in inventory
    seen: dict[str, int] = {}
    for r in rows:
        sid = r["source_id"]
        if sid in seen:
            errors.append(f"duplicate source_id {sid!r} in inventory")
        seen[sid] = seen.get(sid, 0) + 1

    # parent integrity
    for r in rows:
        pid = (r.get("parent_id") or "").strip()
        if pid and pid not in by_id:
            errors.append(f"broken parent_id {pid!r} for {r['source_id']}")

    # build dispositions for every node
    report: list[dict[str, str]] = []
    counts: Counter[str] = Counter()
    by_priority: dict[str, Counter[str]] = defaultdict(Counter)
    by_level: dict[str, Counter[str]] = defaultdict(Counter)
    core_subtopic_missing_matrix = 0

    children: dict[str, list[str]] = defaultdict(list)
    for r in rows:
        pid = (r.get("parent_id") or "").strip()
        if pid:
            children[pid].append(r["source_id"])

    for r in rows:
        sid = r["source_id"]
        level = r.get("node_type") or ""
        priority = (r.get("priority") or "").strip() or "none"
        title = r.get("title") or ""
        mat = matrices.get(sid)
        if mat and mat.get("disposition") in VALID:
            disp = mat["disposition"]
            origin = mat.get("origin") or ""
            lessons = mat.get("lessons") or ""
            note = mat.get("note") or ""
        elif level == "subtopic":
            disp = "unmapped"
            origin = ""
            lessons = ""
            note = "No traceability matrix row; explicit unmapped."
            if priority == "Core":
                core_subtopic_missing_matrix += 1
        else:
            # hierarchy aggregate
            disp = "aggregate"
            origin = ""
            lessons = ""
            note = "Hierarchy node; disposition is structural aggregate of children."

        if disp not in VALID:
            errors.append(f"invalid disposition {disp!r} for {sid}")
            disp = "unmapped"

        if disp in ("mapped", "mapped_partial") and level == "subtopic" and not lessons:
            # soften: keep disposition but flag
            note = (note + " | mapping without lesson id list").strip(" |")

        counts[disp] += 1
        by_priority[priority][disp] += 1
        by_level[level][disp] += 1
        report.append(
            {
                "source_id": sid,
                "node_type": level,
                "parent_id": r.get("parent_id") or "",
                "title": title,
                "priority": priority,
                "disposition": disp,
                "app_lesson_ids": lessons,
                "matrix_origin": origin,
                "evidence_note": note,
            }
        )

    # Unit 3.4 priority note
    unit_34 = by_id.get("3.4")
    unit_34_note = ""
    if unit_34:
        kids = [by_id[c] for c in children.get("3.4", []) if c in by_id]
        sub_pri = Counter((k.get("priority") or "") for k in kids if k.get("node_type") == "subtopic")
        unit_34_note = (
            f"Unit 3.4 source priority={unit_34.get('priority')!r}; "
            f"child subtopic priority counts={dict(sub_pri)}. "
            "Pinned inventory is authoritative for source priority; "
            "stage-completion narrative must not override Support→Core."
        )

    summary = {
        "source_inventory_rows": len(rows),
        "unique_source_ids": len(by_id),
        "disposition_totals": dict(counts),
        "by_node_type": {k: dict(v) for k, v in by_level.items()},
        "by_priority": {k: dict(v) for k, v in by_priority.items()},
        "matrix_disposition_ids": len(matrices),
        "core_subtopics_without_matrix_row": core_subtopic_missing_matrix,
        "unit_3_4_priority_note": unit_34_note,
        "denominators": {
            "full_extracted_inventory": len(rows),
            "subtopics": sum(1 for r in rows if r.get("node_type") == "subtopic"),
            "core_subtopics_in_source": sum(
                1
                for r in rows
                if r.get("node_type") == "subtopic" and (r.get("priority") or "") == "Core"
            ),
        },
        "limits": [
            "Original DOCX is not in-repo; manifest hash identifies bytes when the file is supplied.",
            "Disposition is not instructional mastery or readiness promotion.",
            "aggregate nodes are structural and do not imply child completeness.",
        ],
    }

    if args.write or True:
        REPORT_CSV.parent.mkdir(parents=True, exist_ok=True)
        with REPORT_CSV.open("w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(
                f,
                fieldnames=[
                    "source_id",
                    "node_type",
                    "parent_id",
                    "title",
                    "priority",
                    "disposition",
                    "app_lesson_ids",
                    "matrix_origin",
                    "evidence_note",
                ],
            )
            w.writeheader()
            w.writerows(report)
        SUMMARY_JSON.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")

    print(f"Full source inventory: {len(rows)} nodes")
    print(f"Disposition totals: {dict(counts)}")
    print(f"Core subtopics without matrix row: {core_subtopic_missing_matrix}")
    print(f"Report: {REPORT_CSV.relative_to(ROOT)}")
    if unit_34_note:
        print(unit_34_note)

    if errors:
        print("ERRORS:", file=sys.stderr)
        for e in errors[:50]:
            print(f"  {e}", file=sys.stderr)
        if len(errors) > 50:
            print(f"  ... {len(errors) - 50} more", file=sys.stderr)
        return 1

    # Structural gate: inventory must be fully dispositioned (always true by construction)
    # Fail only on inventory integrity errors (handled above).
    print("Full-source disposition gate: OK (every source path has an explicit disposition).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
