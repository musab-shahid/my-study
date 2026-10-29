import { useEffect, useMemo, useState } from 'react';
import { CalendarClock, Plus, Pencil, Trash2, X, Save, AlertCircle } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { useData } from '@/hooks/useData';
import { getTrackDefinition, listTrackDefinitions, isTrackId, type TrackId } from '@/data/tracks';
import {
  formatIsoInTimeZone,
  getExamSessionConfigKey,
  getNextSession,
  localDateTimeToIso,
  validateExamSessions,
  type ExamSession,
} from '@/lib/exam-schedule';

interface SessionDraft {
  label: string;
  date: string;
  startTime: string;
  endTime: string;
  reportTime: string;
  doorsCloseTime: string;
  timeZone: string;
  note: string;
  venue: string;
}

const DEFAULT_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

function todayInZone(timeZone: string): string {
  try {
    return formatIsoInTimeZone(new Date().toISOString(), timeZone).slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function blankDraft(): SessionDraft {
  const timeZone = DEFAULT_TIME_ZONE;
  return {
    label: '',
    date: todayInZone(timeZone),
    startTime: '09:00',
    endTime: '',
    reportTime: '',
    doorsCloseTime: '',
    timeZone,
    note: '',
    venue: '',
  };
}

function toDraft(session: ExamSession): SessionDraft {
  const timeZone = session.timeZone || DEFAULT_TIME_ZONE;
  const localStart = formatIsoInTimeZone(session.startsAtIso, timeZone);
  return {
    label: session.label,
    date: localStart.slice(0, 10),
    startTime: localStart.slice(11, 16),
    endTime: session.endsAtIso ? formatIsoInTimeZone(session.endsAtIso, timeZone).slice(11, 16) : '',
    reportTime: session.reportByIso ? formatIsoInTimeZone(session.reportByIso, timeZone).slice(11, 16) : '',
    doorsCloseTime: session.doorsCloseIso ? formatIsoInTimeZone(session.doorsCloseIso, timeZone).slice(11, 16) : '',
    timeZone,
    note: session.note ?? '',
    venue: session.venue ?? '',
  };
}

function createSession(draft: SessionDraft, id: string): ExamSession {
  if (!draft.label.trim()) throw new RangeError('Enter an exam name.');
  if (!draft.date || !draft.startTime) throw new RangeError('Choose the exam date and start time.');
  const toIso = (time: string) => time ? localDateTimeToIso(`${draft.date}T${time}`, draft.timeZone) : undefined;
  const startsAtIso = toIso(draft.startTime);
  if (!startsAtIso) throw new RangeError('Choose the exam start time.');
  return {
    id,
    label: draft.label.trim(),
    startsAtIso,
    timeZone: draft.timeZone,
    note: draft.note.trim(),
    ...(draft.venue.trim() ? { venue: draft.venue.trim() } : {}),
    ...(draft.endTime ? { endsAtIso: toIso(draft.endTime) } : {}),
    ...(draft.reportTime ? { reportByIso: toIso(draft.reportTime) } : {}),
    ...(draft.doorsCloseTime ? { doorsCloseIso: toIso(draft.doorsCloseTime) } : {}),
  };
}

function sessionDateLabel(session: ExamSession): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: session.timeZone,
  }).format(new Date(session.startsAtIso));
}

export function ExamScheduleSettings() {
  const { data, trackMembership, setExamSessions } = useData();
  const availableTracks = useMemo(
    () => listTrackDefinitions().filter((track) => track.status === 'available'),
    [],
  );
  const initialTrack = trackMembership.activeTrackId && isTrackId(trackMembership.activeTrackId)
    ? trackMembership.activeTrackId
    : availableTracks[0]?.id ?? 'fpsc';
  const [trackValue, setTrackValue] = useState<string>(initialTrack);
  const selectedTrack = isTrackId(trackValue) ? trackValue : null;
  const activeProfile = selectedTrack
    ? (trackMembership.enrollments[selectedTrack]?.activeExamId ?? null)
    : null;
  const [profileValue, setProfileValue] = useState('general');
  const [draft, setDraft] = useState<SessionDraft>(() => blankDraft());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (trackMembership.activeTrackId && isTrackId(trackMembership.activeTrackId)) {
      setTrackValue(trackMembership.activeTrackId);
      setProfileValue(trackMembership.enrollments[trackMembership.activeTrackId]?.activeExamId ?? 'general');
    }
  }, [trackMembership.activeTrackId, trackMembership.enrollments]);

  const profileId = profileValue === 'general' ? null : profileValue;
  const configKey = selectedTrack ? getExamSessionConfigKey(selectedTrack, profileId) : '';
  const sessions = selectedTrack ? (data.examSessionsByProfile?.[configKey] ?? []) : [];
  const sortedSessions = [...sessions].sort((a, b) => Date.parse(a.startsAtIso) - Date.parse(b.startsAtIso));
  const nextSession = getNextSession(sessions);

  const changeTrack = (value: string) => {
    setTrackValue(value);
    const nextTrack = isTrackId(value) ? value : null;
    setProfileValue(nextTrack && nextTrack === trackMembership.activeTrackId
      ? (trackMembership.enrollments[nextTrack]?.activeExamId ?? 'general')
      : 'general');
    setEditingId(null);
    setDraft(blankDraft());
    setMessage(null);
  };

  const changeProfile = (value: string) => {
    setProfileValue(value);
    setEditingId(null);
    setDraft(blankDraft());
    setMessage(null);
  };

  const beginEdit = (session: ExamSession) => {
    setEditingId(session.id);
    setDraft(toDraft(session));
    setMessage(null);
  };

  const saveSession = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTrack) return;
    try {
      const session = createSession(draft, editingId ?? `exam-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
      const next = [...sessions.filter((item) => item.id !== editingId), session]
        .sort((a, b) => Date.parse(a.startsAtIso) - Date.parse(b.startsAtIso));
      const errors = validateExamSessions(next);
      if (errors.length > 0) throw new RangeError(errors.join(' '));
      const result = setExamSessions(selectedTrack, profileId, next);
      if (!result.ok) throw new Error(result.reason === 'persist-failed'
        ? 'Could not save to this device. Check available browser storage and try again.'
        : result.reason ?? 'Could not save this exam.');
      setEditingId(null);
      setDraft(blankDraft());
      setMessage({ kind: 'success', text: editingId ? 'Exam session updated.' : 'Exam session added.' });
    } catch (error) {
      setMessage({ kind: 'error', text: error instanceof Error ? error.message : 'Could not save this exam session.' });
    }
  };

  const removeSession = (sessionId: string) => {
    if (!selectedTrack) return;
    const result = setExamSessions(selectedTrack, profileId, sessions.filter((session) => session.id !== sessionId));
    if (!result.ok) {
      setMessage({ kind: 'error', text: 'Could not remove this exam. Your saved configuration was kept.' });
      return;
    }
    if (editingId === sessionId) {
      setEditingId(null);
      setDraft(blankDraft());
    }
    setMessage({ kind: 'success', text: 'Exam session removed.' });
  };

  return (
    <Card className="p-card-pad sm:p-card-pad-lg mb-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-btn bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
          <CalendarClock className="w-5 h-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-ink text-sm">Exam dates &amp; planning</h2>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Add dates for your own exams. Dates are saved with this device’s study data and are never assumed for other learners.
            Choose the correct time zone for the exam location.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-xs font-medium text-ink">
          Track
          <select
            className="mt-1 block w-full rounded-btn border border-slate-300 bg-white px-3 py-2 text-sm"
            value={trackValue}
            onChange={(event) => changeTrack(event.target.value)}
          >
            {availableTracks.map((track) => <option key={track.id} value={track.id}>{track.title}</option>)}
          </select>
        </label>
        <label className="block text-xs font-medium text-ink">
          Exam profile
          <select
            className="mt-1 block w-full rounded-btn border border-slate-300 bg-white px-3 py-2 text-sm"
            value={profileValue}
            onChange={(event) => changeProfile(event.target.value)}
          >
            <option value="general">General preparation</option>
            {selectedTrack && getTrackDefinition(selectedTrack).examProfiles.map((profile) => (
              <option key={profile.id} value={profile.id}>{profile.title}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 rounded-card border border-slate-200 bg-slate-50 p-3">
        {nextSession ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Next configured exam</p>
            <p className="mt-1 text-sm font-semibold text-ink">{nextSession.label}</p>
            <p className="mt-0.5 text-xs text-ink-muted">{sessionDateLabel(nextSession)} · {nextSession.timeZone}</p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-ink">No upcoming exam configured</p>
            <p className="mt-1 text-xs text-ink-muted">
              {sessions.length > 0
                ? 'All saved sessions have passed. Add a future date or edit an existing session.'
                : 'Add an exam date below to enable an honest countdown and date-aware planning for this scope.'}
            </p>
          </>
        )}
      </div>

      {sortedSessions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-ink">Saved sessions</h3>
          <ul className="mt-2 space-y-2">
            {sortedSessions.map((session) => {
              const passed = Date.parse(session.startsAtIso) <= Date.now();
              return (
                <li key={session.id} className="flex flex-col gap-2 rounded-card border border-slate-200 p-3 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink">{session.label}</p>
                    <p className="mt-0.5 text-xs text-ink-muted">{sessionDateLabel(session)} · {session.timeZone}{passed ? ' · Passed' : ''}</p>
                    {session.venue && <p className="mt-1 text-xs text-ink-muted">{session.venue}</p>}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button type="button" className="inline-flex items-center gap-1 rounded-btn border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-ink hover:bg-slate-50" onClick={() => beginEdit(session)}>
                      <Pencil className="h-3.5 w-3.5" aria-hidden /> Edit
                    </button>
                    <button type="button" className="inline-flex items-center gap-1 rounded-btn border border-danger-200 bg-white px-2.5 py-1.5 text-xs font-medium text-danger-700 hover:bg-danger-50" onClick={() => removeSession(session.id)}>
                      <Trash2 className="h-3.5 w-3.5" aria-hidden /> Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <form className="mt-4 border-t border-slate-200 pt-4" onSubmit={saveSession}>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-ink">{editingId ? 'Edit exam session' : 'Add an exam session'}</h3>
          {editingId && (
            <button type="button" className="inline-flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-ink" onClick={() => { setEditingId(null); setDraft(blankDraft()); setMessage(null); }}>
              <X className="h-3.5 w-3.5" aria-hidden /> Cancel edit
            </button>
          )}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="block text-xs font-medium text-ink sm:col-span-2">
            Exam name
            <input required maxLength={120} className="mt-1 block w-full rounded-btn border border-slate-300 px-3 py-2 text-sm" value={draft.label} onChange={(event) => setDraft({ ...draft, label: event.target.value })} placeholder="e.g. Meteorologist paper" />
          </label>
          <label className="block text-xs font-medium text-ink">
            Exam date
            <input required type="date" className="mt-1 block w-full rounded-btn border border-slate-300 px-3 py-2 text-sm" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} />
          </label>
          <label className="block text-xs font-medium text-ink">
            Start time
            <input required type="time" className="mt-1 block w-full rounded-btn border border-slate-300 px-3 py-2 text-sm" value={draft.startTime} onChange={(event) => setDraft({ ...draft, startTime: event.target.value })} />
          </label>
          <label className="block text-xs font-medium text-ink sm:col-span-2">
            Time zone (IANA)
            <input required className="mt-1 block w-full rounded-btn border border-slate-300 px-3 py-2 text-sm" value={draft.timeZone} onChange={(event) => setDraft({ ...draft, timeZone: event.target.value })} placeholder="Asia/Karachi" list="exam-time-zone-options" />
            <datalist id="exam-time-zone-options">
              <option value="Asia/Karachi" />
              <option value="UTC" />
              <option value="Europe/London" />
              <option value="America/New_York" />
              <option value="Asia/Dubai" />
            </datalist>
            <span className="mt-1 block font-normal text-ink-muted">Use an IANA zone such as Asia/Karachi, Europe/London, or UTC.</span>
          </label>
          <label className="block text-xs font-medium text-ink">
            End time (optional)
            <input type="time" className="mt-1 block w-full rounded-btn border border-slate-300 px-3 py-2 text-sm" value={draft.endTime} onChange={(event) => setDraft({ ...draft, endTime: event.target.value })} />
          </label>
          <label className="block text-xs font-medium text-ink">
            Report-by time (optional)
            <input type="time" className="mt-1 block w-full rounded-btn border border-slate-300 px-3 py-2 text-sm" value={draft.reportTime} onChange={(event) => setDraft({ ...draft, reportTime: event.target.value })} />
          </label>
          <label className="block text-xs font-medium text-ink">
            Doors-close time (optional)
            <input type="time" className="mt-1 block w-full rounded-btn border border-slate-300 px-3 py-2 text-sm" value={draft.doorsCloseTime} onChange={(event) => setDraft({ ...draft, doorsCloseTime: event.target.value })} />
          </label>
          <label className="block text-xs font-medium text-ink">
            Venue (optional)
            <input maxLength={180} className="mt-1 block w-full rounded-btn border border-slate-300 px-3 py-2 text-sm" value={draft.venue} onChange={(event) => setDraft({ ...draft, venue: event.target.value })} placeholder="Test centre or online" />
          </label>
          <label className="block text-xs font-medium text-ink sm:col-span-2">
            Notes (optional)
            <textarea rows={2} maxLength={500} className="mt-1 block w-full rounded-btn border border-slate-300 px-3 py-2 text-sm" value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} placeholder="Materials to bring, reporting instructions, etc." />
          </label>
        </div>
        {message && (
          <p className={`mt-3 flex items-start gap-2 text-xs ${message.kind === 'error' ? 'text-danger-700' : 'text-success-700'}`} role={message.kind === 'error' ? 'alert' : 'status'} aria-live={message.kind === 'error' ? 'assertive' : 'polite'}>
            {message.kind === 'error' ? <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> : null}
            <span>{message.text}</span>
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="submit">
            <Save className="h-4 w-4" aria-hidden /> {editingId ? 'Save changes' : 'Save exam date'}
          </Button>
          {!editingId && (
            <Button type="button" variant="secondary" onClick={() => { setDraft(blankDraft()); setMessage(null); }}>
              <Plus className="h-4 w-4" aria-hidden /> Clear form
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
