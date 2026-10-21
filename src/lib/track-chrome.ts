/**
 * UI chrome derived from the track registry — avoid hard-coded fpsc/hat maps.
 */
import {
  listTrackDefinitions,
  getTrackDefinition,
  isTrackId,
  type TrackId,
} from "../data/tracks.ts";
import { FileText, GraduationCap, type LucideIcon } from "lucide-react";

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

export function trackAccentClasses(trackId: TrackId): {
  gradient: string;
  iconWrap: string;
  text: string;
} {
  const accent = getTrackDefinition(trackId).accent;
  if (accent === "indigo") {
    return {
      gradient: "from-indigo-500 to-violet-600",
      iconWrap: "bg-indigo-500",
      text: "text-indigo-400",
    };
  }
  if (accent === "teal") {
    return {
      gradient: "from-teal-500 to-cyan-600",
      iconWrap: "bg-teal-600",
      text: "text-teal-400",
    };
  }
  return {
    gradient: "from-sky-500 to-cyan-600",
    iconWrap: "bg-sky-500",
    text: "text-sky-400",
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
