#!/usr/bin/env bash
# Phase E3+: only content-bearing legacy banks remain frozen
# (data-science, climate-science). Roadmap stubs moved to roadmap-topics.ts.
set -euo pipefail

BASE_REF="${BASE_REF:-origin/main}"
if ! git rev-parse --verify "$BASE_REF" >/dev/null 2>&1; then
  BASE_REF="main"
fi

mapfile -t hits < <(git diff --name-status "$BASE_REF"...HEAD 2>/dev/null | awk '
  $1 ~ /^[MD]/ && $2 ~ /^src\/data\/cgei\/(data-science|climate-science)\/legacy\// { print $1 "\t" $2 }
  $1 ~ /^R/ && $2 ~ /^src\/data\/cgei\/(data-science|climate-science)\/legacy\// { print $1 "\t" $2 " -> " $3 }
')

if ((${#hits[@]} > 0)); then
  echo "ERROR: edits under content-bearing CGEI legacy/ banks are frozen."
  echo "Migrate content into canonical topics/questions modules instead."
  printf '%s\n' "${hits[@]}"
  exit 1
fi

echo "OK: no modifications under content-bearing CGEI legacy/ folders"
