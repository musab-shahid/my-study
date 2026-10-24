# C.13 — Referential integrity remediation

## Defect

Lessons for Units 3.2 (transform), 3.3 (layout/georef), 3.5, 3.6, 3.9, 4.11, and 4.12 referenced `activityIds` and `assessmentIds` that were never defined in the curriculum registry arrays (16 activities, 16 assessments).

## Fix

Defined matching activity and formative assessment records with objective links and questionIds where questions exist.

## Validation

`curriculum_activity_assessment_integrity_check.py` must report zero missing IDs.

## Limits

Activities are instructional tasks, not automated browser/GPU labs. Completion states remain draft/mapped_partial for those units.
