/**
 * UI chrome derived from the central track registry — avoids hard-coded
 * fpsc/hat/cgei color maps and keeps a single source of truth in
 * subject-colors.ts (getTrackStyle).
 */
import {
  listTrackDefinitions,
  getTrackDefinition,
  isTrackId,
  type TrackId,
} from "../data/tracks.ts";
import { FileText, GraduationCap, type LucideIcon } from "lucide-react";
import { getTrackStyle } from "../data/subject-colors.ts";

const ICON_BY_KEY: Record<string, LucideIcon> = {
  FileText,
  GraduationCap,
};

export function allTrackIds(): TrackId[] {
  return listTrackDefinitions().map((t) => t.id);
}

export function trackIcon(trackId: TrackId): LucideIcon {
  const key = getTrackDefinition(trackId).iconKey;
  return ICON_BY_KEY[key] ?? FileText;
}

/**
 * Track accent classes for surfaces that need raw Tailwind gradient/icon-wrap
 * strings (e.g. the mobile ToolsTray). Derived from the central track style
 * registry so there is exactly one definition per track — no parallel palette.
 */
export function trackAccentClasses(trackId: TrackId): {
  gradient: string;
  iconWrap: string;
  text: string;
} {
  const style = getTrackStyle(trackId);
  return {
    gradient: style.gradient,
    iconWrap: style.iconGradient,
    text: style.accentText,
  };
}

/** Enrolled track ids in registry order */
export function enrolledTrackIds(
  enrollments: Record<string, unknown> | null | undefined,
): TrackId[] {
  if (!enrollments) return [];
  return allTrackIds().filter((id) => Boolean(enrollments[id]));
}

export function resolveTrackId(value: unknown): TrackId | null {
  return isTrackId(value) ? value : null;
}
