/**
 * Personal FPSC exam windows from the official admission certificate (roll no. slip).
 * Times are Asia/Karachi (+05:00). Do not store CNIC / personal identifiers here.
 */

export interface ExamSession {
  id: string;
  /** Short label shown on Home countdown */
  label: string;
  /** Paper / case reference (public post codes only) */
  caseRef?: string;
  /** Wall-clock start of the written test */
  startsAtIso: string;
  /** Wall-clock end of the written test */
  endsAtIso?: string;
  /** Report-by time at the examination hall (not the paper start) */
  reportByIso?: string;
  /** Doors close — after this, entry is not allowed */
  doorsCloseIso?: string;
  /** Venue short line (no personal data) */
  venue?: string;
  note: string;
}

/** Hall rules from the FPSC admission certificate — shown as a checklist on Home. */
export const EXAM_DAY_CHECKLIST: readonly { id: string; label: string }[] = [
  { id: "id", label: "Original CNIC or Passport + admission certificate (slip)" },
  { id: "pen", label: "Black ball pen only (no pointer / ink / gel pen)" },
  { id: "phone", label: "No phone or electronic device in the exam hall" },
  { id: "doors", label: "Be inside the hall before doors close — no late entry" },
] as const;

/**
 * 16 Oct 2026 (Friday) — Multan centre, two papers same day.
 * Morning: Assistant Meteorologist · Evening: Meteorologist.
 */
export const FPSC_OCT_2026_SESSIONS: ExamSession[] = [
  {
    id: "fpsc-2026-10-16-am-asst-met",
    label: "Assistant Meteorologist · Morning",
    caseRef: "F4-17/2026-R",
    startsAtIso: "2026-10-16T10:00:00+05:00",
    endsAtIso: "2026-10-16T11:40:00+05:00",
    reportByIso: "2026-10-16T09:15:00+05:00",
    doorsCloseIso: "2026-10-16T09:45:00+05:00",
    venue: "Govt. Comprehensive HSS for Girls, Gulgasht, Multan (Main Hall-1)",
    note: "Report by 09:15 · doors close 09:45 · test 10:00–11:40.",
  },
  {
    id: "fpsc-2026-10-16-pm-met",
    label: "Meteorologist · Evening",
    caseRef: "F4-16/2026-R",
    startsAtIso: "2026-10-16T15:00:00+05:00",
    endsAtIso: "2026-10-16T16:40:00+05:00",
    reportByIso: "2026-10-16T14:15:00+05:00",
    doorsCloseIso: "2026-10-16T14:45:00+05:00",
    venue: "Govt. Comprehensive HSS for Girls, Gulgasht, Multan (Main Hall-1)",
    note: "Report by 14:15 · doors close 14:45 · test 15:00–16:40.",
  },
];

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  started: boolean;
}

export function getCountdownParts(iso: string, now: Date = new Date()): CountdownParts {
  const target = new Date(iso).getTime();
  const diff = target - now.getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, started: true };
  }
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);
  return { days, hours, minutes, seconds, started: false };
}

export function formatCountdownShort(c: CountdownParts): string {
  if (c.started) return "Started";
  if (c.days > 0) return `${c.days}d ${c.hours}h`;
  if (c.hours > 0) return `${c.hours}h ${c.minutes}m`;
  return `${c.minutes}m ${c.seconds}s`;
}

/** Next session whose test start is still in the future; null when all are past. */
export function getNextSession(
  sessions: ExamSession[],
  now: Date = new Date(),
): ExamSession | null {
  const sorted = [...sessions].sort(
    (a, b) => new Date(a.startsAtIso).getTime() - new Date(b.startsAtIso).getTime(),
  );
  return sorted.find((s) => new Date(s.startsAtIso).getTime() > now.getTime()) ?? null;
}

export function hasUpcomingExam(sessions: ExamSession[], now: Date = new Date()): boolean {
  return sessions.some((s) => new Date(s.startsAtIso).getTime() > now.getTime());
}

/** Prefer report-by time for leave-for-centre urgency when available. */
export function getSessionUrgencyIso(session: ExamSession): string {
  return session.reportByIso ?? session.startsAtIso;
}

export type ExamCountdownPhase = "report" | "doors" | "test" | "started";

/** Which milestone the Home countdown should target. */
export function getExamCountdownTarget(
  session: ExamSession,
  now: Date = new Date(),
): { iso: string; phase: ExamCountdownPhase; label: string } {
  const t = now.getTime();
  if (session.reportByIso && new Date(session.reportByIso).getTime() > t) {
    return { iso: session.reportByIso, phase: "report", label: "until report time" };
  }
  if (session.doorsCloseIso && new Date(session.doorsCloseIso).getTime() > t) {
    return { iso: session.doorsCloseIso, phase: "doors", label: "until doors close" };
  }
  if (new Date(session.startsAtIso).getTime() > t) {
    return { iso: session.startsAtIso, phase: "test", label: "until test starts" };
  }
  return { iso: session.startsAtIso, phase: "started", label: "in progress" };
}
