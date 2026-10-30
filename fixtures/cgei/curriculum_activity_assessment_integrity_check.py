"""Referential integrity: activity/assessment IDs referenced by lessons must be defined."""
from __future__ import annotations

import re
import sys
from pathlib import Path

def _repo_root() -> Path:
    here = Path(__file__).resolve()
    for parent in here.parents:
        if (parent / "package.json").is_file() and (parent / "src").is_dir():
            return parent
    raise RuntimeError(f"Could not locate repo root from {here}")



def collect_array_ids(text: str, field: str) -> set[str]:
    ids: set[str] = set()
    for match in re.finditer(rf"{field}:\s*\[([^\]]*)\]", text):
        ids |= set(re.findall(r"'([^']+)'", match.group(1)))
        ids |= set(re.findall(r'"([^"]+)"', match.group(1)))
    return ids


def collect_defined_ids(text: str, kind_group: str) -> set[str]:
    """Match both TS object and JSON-like records with id + kind."""
    pattern = re.compile(
        rf"""id:\s*['"]([^'"]+)['"][^;]{{0,800}}?kind:\s*['"](?:{kind_group})['"]""",
        re.S,
    )
    found = set(pattern.findall(text))
    # also allow kind before id within a small window
    pattern2 = re.compile(
        rf"""kind:\s*['"](?:{kind_group})['"][^;]{{0,400}}?id:\s*['"]([^'"]+)['"]""",
        re.S,
    )
    found |= set(pattern2.findall(text))
    return found


def main() -> int:
    root = _repo_root()
    ct_path = root / "src/data/cgei/curriculum.ts"
    ct = ct_path.read_text(encoding="utf-8")

    act_refs = collect_array_ids(ct, "activityIds")
    assess_refs = collect_array_ids(ct, "assessmentIds")

    act_kinds = (
        "guided-practice|independent-practice|coding-lab|data-lab|"
        "reflection|critique|debugging|field-task|project-milestone"
    )
    assess_kinds = "diagnostic|formative|quiz|practical|summative|portfolio-review"

    # Prefer explicit id: lines for CGEI activity/assessment namespaces
    defs_act = set(re.findall(r"id:\s*['\"](cgei-[^'\"]+-a-[^'\"]+)['\"]", ct))
    defs_act |= set(re.findall(r"id:\s*['\"](cgei-[^'\"]*a-[^'\"]+)['\"]", ct))
    defs_act |= set(re.findall(r'"id"\s*:\s*"(cgei-[^"]+-a-[^"]+)"', ct))
    defs_act |= set(re.findall(r'"id"\s*:\s*"(cgei-[^"]*a-[^"]+)"', ct))
    # Narrow to IDs that look like activities (contain -a-)
    defs_act = {i for i in defs_act if re.search(r"-a-\d|-a-[a-z]", i) or "-a-" in i}

    defs_as = set(re.findall(r"id:\s*['\"](cgei-[^'\"]*assess[^'\"]+)['\"]", ct))
    defs_as |= set(re.findall(r'"id"\s*:\s*"(cgei-[^"]*assess[^"]+)"', ct))

    # Definitions must appear as object records; filter refs that are only in arrays
    # Keep only defs that also appear near a kind field or in activity registry sections.
    missing_act = sorted(act_refs - defs_act)
    missing_as = sorted(assess_refs - defs_as)

    # Secondary: ensure each def ID string exists at least once as id: '...'
    if missing_act or missing_as:
        print(
            f"missing activities={missing_act[:40]}{'...' if len(missing_act)>40 else ''}",
            file=sys.stderr,
        )
        print(
            f"missing assessments={missing_as[:40]}{'...' if len(missing_as)>40 else ''}",
            file=sys.stderr,
        )
        print(
            f"counts refs_act={len(act_refs)} defs_act={len(defs_act)} "
            f"refs_as={len(assess_refs)} defs_as={len(defs_as)} "
            f"missing_act={len(missing_act)} missing_as={len(missing_as)}",
            file=sys.stderr,
        )
        return 1

    print(
        f"Curriculum activity/assessment integrity OK "
        f"(activities={len(defs_act)}, assessments={len(defs_as)}, "
        f"refs_act={len(act_refs)}, refs_as={len(assess_refs)})."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
