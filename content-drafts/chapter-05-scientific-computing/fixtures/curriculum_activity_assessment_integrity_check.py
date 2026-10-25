"""Referential integrity: activity/assessment IDs referenced by lessons must be defined."""
from __future__ import annotations
import re
from pathlib import Path

def main() -> None:
    ct = Path("src/data/cgei/curriculum.ts").read_text(encoding="utf-8")
    # IDs appearing in activityIds / assessmentIds arrays on lessons
    act_refs = set(re.findall(r"activityIds:\s*\[([^\]]*)\]", ct))
    # simpler global
    all_act = set(re.findall(r"'(cgei-(?:geo|rs|cl|cs)-a-[^']+)'", ct))
    defs_act = set(re.findall(r"id: '(cgei-(?:geo|rs|cl|cs)-a-[^']+)'", ct))
    missing_act = sorted(all_act - defs_act)
    all_as = set(re.findall(r"'(cgei-(?:geo|rs|cl|cs)-assess-[^']+)'", ct))
    defs_as = set(re.findall(r"id: '(cgei-(?:geo|rs|cl|cs)-assess-[^']+)'", ct))
    missing_as = sorted(all_as - defs_as)
    if missing_act or missing_as:
        raise SystemExit(f"missing activities={missing_act} assessments={missing_as}")
    print(
        f"Curriculum activity/assessment integrity OK "
        f"(activities={len(defs_act)}, assessments={len(defs_as)})."
    )

if __name__ == "__main__":
    main()
