#!/usr/bin/env bash
# Fail if a PR modifies or deletes files under src/data/cgei/*/legacy/.
# Additions are allowed only when introducing the freeze (not typical after B1).
set -euo pipefail

BASE_REF="${BASE_REF:-origin/main}"
if ! git rev-parse --verify "$BASE_REF" >/dev/null 2>&1; then
  BASE_REF="main"
fi

# Modified or deleted only (not pure adds)
mapfile -t hits < <(git diff --name-status "$BASE_REF"...HEAD 2>/dev/null | awk '
  $1 ~ /^[MD]/ && $2 ~ /^src\/data\/cgei\/[^/]+\/legacy\// { print $1 "\t" $2 }
  $1 ~ /^R/ && $3 ~ /^src\/data\/cgei\/[^/]+\/legacy\// { print $1 "\t" $3 }
')

if ((${#hits[@]} > 0)); then
  echo "ERROR: edits under src/data/cgei/*/legacy/ are frozen (Phase B1)."
  echo "Legacy topic banks must not change; migrate content into canonical topics-<subject>.ts instead."
  printf '%s\n' "${hits[@]}"
  exit 1
fi

echo "OK: no modifications under CGEI legacy/ folders"
