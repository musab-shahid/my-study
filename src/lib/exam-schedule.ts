/**
 * Explicit exam-session configuration.
 *
 * The dated FPSC entries below are a personal schedule, not a product-wide
 * default. General planning uses DEFAULT_EXAM_SESSIONS, which is intentionally
 * empty until a learner configures an exam session.
 */

export interface ExamSession {
  id: string;
  /** Short label shown on the dashboard countdown. */
  label: string;
  /** Paper / case reference (public post codes only). */
  caseRef?: string;
  /** ISO-8601 wall-clock start with an explicit UTC offset. */
  startsAtIso: string;
  /** IANA time zone for calendar-day planning (e.g. Asia/Karachi). */
  timeZone?: string;
  endsAtIso?: string;
  reportByIso?: string;
  doorsCloseIso?: string;
  venue?: string;
  note: string;
}

/** No exam is configured for a new learner by default. */
export const DEFAULT_EXAM_SESSIONS: readonly ExamSession[] = [];

/** Hall rules from the personal FPSC admission certificate. */
export const EXAM_DAY_CHECKLIST: readonly { id: string; label: string }[] = [
  { id: "id", label: "Original CNIC or Passport + admission certificate (slip)" },
  { id: "pen", label: "Black ball pen only (no pointer / ink / gel pen)" },
  { id: "phone", label: "No phone or electronic device in the exam hall" },
  { id: "doors", label: "Be inside the hall before doors close — no late entry" },
] as const;

/**
 * Personal FPSC sessions for 16 Oct 2026 (Multan).
 * This is retained as explicitly personal configuration for backward
 * compatibility; it must not be used as the application's default schedule.
 */
export const PERSONAL_FPSC_OCT_2026_SESSIONS: ExamSession[] = [
  {
    id: "fpsc-2026-10-16-am-asst-met",
    label: "Assistant Meteorologist · Morning",
    caseRef: "F4-17/2026-R",
    startsAtIso: "2026-10-16T10:00:00+05:00",
    endsAtIso: "2026-10-16T11:40:00+05:00",
    reportByIso: "2026-10-16T09:15:00+05:00",
    doorsCloseIso: "2026-10-16T09:45:00+05:00",
    timeZone: "Asia/Karachi",
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
    timeZone: "Asia/Karachi",
    venue: "Govt. Comprehensive HSS for Girls, Gulgasht, Multan (Main Hall-1)",
    note: "Report by 14:15 · doors close 14:45 · test 15:00–16:40.",
  },
];

/** @deprecated Use PERSONAL_FPSC_OCT_2026_SESSIONS explicitly; never use as a default. */
export const FPSC_OCT_2026_SESSIONS = PERSONAL_FPSC_OCT_2026_SESSIONS;

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  started: boolean;
}

export function getCountdownParts(iso: string, now: Date = new Date()): CountdownParts {
  const target = new Date(iso).getTime();
  if (!Number.isFinite(target)) {
    throw new RangeError('Invalid countdown date.');
  }
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

/** Return validation errors for configured sessions; an empty list means valid. */
export function validateExamSessions(sessions: readonly ExamSession[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const hasOffset = (value: string) => /(?:Z|[+-]\d{2}:\d{2})$/i.test(value);
  const isValidDate = (value: string | undefined) =>
    value === undefined || (hasOffset(value) && Number.isFinite(Date.parse(value)));

  for (const [index, session] of sessions.entries()) {
    const prefix = `sessions[${index}]`;
    if (!session.id.trim()) errors.push(`${prefix}.id is required`);
    else if (ids.has(session.id)) errors.push(`${prefix}.id must be unique`);
    ids.add(session.id);
    if (!session.label.trim()) errors.push(`${prefix}.label is required`);
    if (!isValidDate(session.startsAtIso)) errors.push(`${prefix}.startsAtIso must be a valid ISO date with an explicit offset`);
    if (!isValidDate(session.endsAtIso)) errors.push(`${prefix}.endsAtIso must be a valid ISO date with an explicit offset`);
    if (!isValidDate(session.reportByIso)) errors.push(`${prefix}.reportByIso must be a valid ISO date with an explicit offset`);
    if (!isValidDate(session.doorsCloseIso)) errors.push(`${prefix}.doorsCloseIso must be a valid ISO date with an explicit offset`);
    if (session.timeZone) {
      try {
        new Intl.DateTimeFormat('en', { timeZone: session.timeZone }).format(0);
      } catch {
        errors.push(`${prefix}.timeZone must be a valid IANA time zone`);
      }
    }
    const start = Date.parse(session.startsAtIso);
    const end = session.endsAtIso ? Date.parse(session.endsAtIso) : undefined;
    const report = session.reportByIso ? Date.parse(session.reportByIso) : undefined;
    const doors = session.doorsCloseIso ? Date.parse(session.doorsCloseIso) : undefined;
    if (Number.isFinite(start) && end !== undefined && end <= start) errors.push(`${prefix}.endsAtIso must be after startsAtIso`);
    if (Number.isFinite(start) && report !== undefined && report > start) errors.push(`${prefix}.reportByIso must not be after startsAtIso`);
    if (Number.isFinite(start) && doors !== undefined && doors > start) errors.push(`${prefix}.doorsCloseIso must not be after startsAtIso`);
  }
  return errors;
}

/** Next session whose test start is still in the future; null when all are past. */
export function getNextSession(
  sessions: readonly ExamSession[],
  now: Date = new Date(),
): ExamSession | null {
  const sorted = [...sessions].sort(
    (a, b) => new Date(a.startsAtIso).getTime() - new Date(b.startsAtIso).getTime(),
  );
  return sorted.find((s) => new Date(s.startsAtIso).getTime() > now.getTime()) ?? null;
}

export function hasUpcomingExam(sessions: readonly ExamSession[], now: Date = new Date()): boolean {
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
