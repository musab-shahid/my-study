#!/usr/bin/env bash
# Fail if a PR modifies, deletes, or renames *out of* files under
# src/data/cgei/*/legacy/. Renames *into* legacy/ (Phase B1 moves) are allowed.
set -euo pipefail

BASE_REF="${BASE_REF:-origin/main}"
if ! git rev-parse --verify "$BASE_REF" >/dev/null 2>&1; then
  BASE_REF="main"
fi

mapfile -t hits < <(git diff --name-status "$BASE_REF"...HEAD 2>/dev/null | awk '
  # Modify or delete a path already under legacy/
  $1 ~ /^[MD]/ && $2 ~ /^src\/data\/cgei\/[^/]+\/legacy\// { print $1 "\t" $2 }
  # Rename whose *source* is under legacy/ (moving out or within)
  $1 ~ /^R/ && $2 ~ /^src\/data\/cgei\/[^/]+\/legacy\// { print $1 "\t" $2 " -> " $3 }
')

if ((${#hits[@]} > 0)); then
  echo "ERROR: edits under src/data/cgei/*/legacy/ are frozen (Phase B1)."
  echo "Legacy topic banks must not change; migrate content into canonical topics files instead."
  printf '%s\n' "${hits[@]}"
  exit 1
fi

echo "OK: no modifications under CGEI legacy/ folders"
