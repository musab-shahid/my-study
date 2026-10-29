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
  /** Required IANA time zone for calendar-day planning (e.g. Asia/Karachi). */
  timeZone: string;
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

/** @deprecated Legacy default export; intentionally empty. Use PERSONAL_FPSC_OCT_2026_SESSIONS only for that personal schedule. */
export const FPSC_OCT_2026_SESSIONS: ExamSession[] = [];

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

/** Stable per-track/profile storage key; general preparation is deliberately separate. */
export function getExamSessionConfigKey(trackId: string, profileId: string | null): string {
  return `${trackId}:${profileId ?? 'general'}`;
}

/** Convert an ISO instant to a datetime-local value in the selected IANA zone. */
export function formatIsoInTimeZone(iso: string, timeZone: string): string {
  const instant = Date.parse(iso);
  if (!Number.isFinite(instant)) return '';
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(instant);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}`;
}

/**
 * Convert a wall-clock datetime-local value in an IANA zone into an ISO instant.
 * Nonexistent daylight-saving wall times are rejected instead of silently shifted.
 */
export function localDateTimeToIso(value: string, timeZone: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) throw new RangeError('Enter a valid date and time.');
  const [, year, month, day, hour, minute] = match;
  const targetWall = Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  if (!Number.isFinite(targetWall)) throw new RangeError('Enter a valid date and time.');
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    });
    let candidate = targetWall;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const parts = Object.fromEntries(formatter.formatToParts(candidate).map((part) => [part.type, part.value]));
      const representedWall = Date.UTC(
        Number(parts.year), Number(parts.month) - 1, Number(parts.day),
        Number(parts.hour), Number(parts.minute), Number(parts.second),
      );
      const delta = targetWall - representedWall;
      if (delta === 0) break;
      candidate += delta;
    }
    const roundTrip = formatIsoInTimeZone(new Date(candidate).toISOString(), timeZone);
    if (roundTrip !== value) throw new RangeError('That local time does not exist in the selected time zone because of a clock change.');
    return new Date(candidate).toISOString();
  } catch (error) {
    if (error instanceof RangeError) throw error;
    throw new RangeError('Choose a valid IANA time zone.');
  }
}

/** Keep valid session configurations while quarantining malformed optional config. */
export function normalizeExamSessionsByProfile(value: unknown): Record<string, ExamSession[]> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const normalized: Record<string, ExamSession[]> = Object.create(null) as Record<string, ExamSession[]>;
  for (const [key, sessions] of Object.entries(value as Record<string, unknown>)) {
    if (!/^(fpsc|hat|cgei):(?:general|[a-z0-9-]+)$/.test(key) || !Array.isArray(sessions)) continue;
    if (validateExamSessions(sessions as ExamSession[]).length === 0) {
      normalized[key] = sessions.map((session) => ({ ...(session as ExamSession) }));
    }
  }
  return normalized;
}

/** Return validation errors for configured sessions; an empty list means valid. */
export function validateExamSessions(sessions: readonly ExamSession[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const isValidDate = (value: unknown): value is string => {
    if (typeof value !== 'string') return false;
    const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d{1,3})?)?(Z|([+-])(\d{2}):(\d{2}))$/i.exec(value);
    if (!match) return false;
    const [, y, mo, d, h, mi, sec = '0', zone, , offsetHour = '0', offsetMinute = '0'] = match;
    const year = Number(y), month = Number(mo), day = Number(d);
    const hour = Number(h), minute = Number(mi), second = Number(sec);
    if (month < 1 || month > 12 || day < 1 || day > new Date(Date.UTC(year, month, 0)).getUTCDate()) return false;
    if (hour > 23 || minute > 59 || second > 59) return false;
    if (zone.toUpperCase() !== 'Z' && (Number(offsetHour) > 23 || Number(offsetMinute) > 59)) return false;
    return Number.isFinite(Date.parse(value));
  };

  if (!Array.isArray(sessions)) return ['sessions must be an array'];
  for (const [index, candidate] of sessions.entries()) {
    const prefix = 'sessions[' + index + ']';
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
      errors.push(prefix + ' must be an object');
      continue;
    }
    const session = candidate as ExamSession;
    if (typeof session.id !== 'string' || !session.id.trim()) errors.push(prefix + '.id is required');
    else if (ids.has(session.id)) errors.push(prefix + '.id must be unique');
    if (typeof session.id === 'string') ids.add(session.id);
    if (typeof session.label !== 'string' || !session.label.trim()) errors.push(prefix + '.label is required');
    else if (session.label.length > 120) errors.push(prefix + '.label must be 120 characters or fewer');
    if (typeof session.note !== 'string') errors.push(prefix + '.note must be a string');
    if (!isValidDate(session.startsAtIso)) errors.push(prefix + '.startsAtIso must be a valid ISO date with an explicit offset');
    for (const field of ['endsAtIso', 'reportByIso', 'doorsCloseIso'] as const) {
      const value = session[field];
      if (value !== undefined && !isValidDate(value)) errors.push(prefix + '.' + field + ' must be a valid ISO date with an explicit offset');
    }
    if (typeof session.timeZone !== 'string' || !session.timeZone.trim()) {
      errors.push(prefix + '.timeZone is required (IANA time zone)');
    } else {
      try {
        new Intl.DateTimeFormat('en', { timeZone: session.timeZone }).format(0);
      } catch {
        errors.push(prefix + '.timeZone must be a valid IANA time zone');
      }
    }
    const startAt = isValidDate(session.startsAtIso) ? Date.parse(session.startsAtIso) : Number.NaN;
    const endAt = isValidDate(session.endsAtIso) ? Date.parse(session.endsAtIso) : undefined;
    const reportAt = isValidDate(session.reportByIso) ? Date.parse(session.reportByIso) : undefined;
    const doorsAt = isValidDate(session.doorsCloseIso) ? Date.parse(session.doorsCloseIso) : undefined;
    if (Number.isFinite(startAt) && endAt !== undefined && endAt <= startAt) errors.push(prefix + '.endsAtIso must be after startsAtIso');
    if (Number.isFinite(startAt) && reportAt !== undefined && reportAt > startAt) errors.push(prefix + '.reportByIso must not be after startsAtIso');
    if (Number.isFinite(startAt) && doorsAt !== undefined && doorsAt > startAt) errors.push(prefix + '.doorsCloseIso must not be after startsAtIso');
    if (reportAt !== undefined && doorsAt !== undefined && reportAt > doorsAt) errors.push(prefix + '.reportByIso must not be after doorsCloseIso');
    if (session.venue !== undefined && typeof session.venue !== 'string') errors.push(prefix + '.venue must be a string');
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
