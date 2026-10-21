import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { SubjectId } from '@/types';
import type { ExamTrackId } from '@/lib/exam-track';
import { TRACK_IDS } from '@/lib/exam-track';
import { isTrackId } from '@/data/tracks';
import { subjectsForScope } from '@/lib/track-scope';
import { subjectsByTrack } from '@/data/subjects';
import { STAGE_SCREENS } from '@/lib/constants';
import { useData } from '@/hooks/useData';

export type StageScreen = (typeof STAGE_SCREENS)[number];
export type SubjectSelection = SubjectId | 'all';

interface TrackPrefs {
  perScreen: Record<string, SubjectSelection>;
  /** Last concrete subject chosen (never 'all') */
  lastSelected: SubjectId;
  prefersAll: boolean;
}

interface SubjectSelectionState {
  /**
   * Preferences keyed by track — switching restores the other track's picks.
   * PREFS-ONLY: not enrollment. Learning focus is AppData.trackMembership.activeTrackId.
   */
  byTrack: Partial<Record<ExamTrackId, TrackPrefs>>;
  /**
   * UI focus track for subject selectors (kept in sync with membership when possible).
   * Canonical enrollment focus remains AppData.trackMembership.activeTrackId.
   */
  activeTrack: ExamTrackId;
}

interface SubjectSelectionContextValue {
  perScreen: Record<string, SubjectSelection>;
  lastSelected: SubjectId;
  prefersAll: boolean;
  activeTrack: ExamTrackId;
  getActiveSubject: (screen: StageScreen) => SubjectSelection;
  setActiveSubjectForScreen: (screen: StageScreen, value: SubjectSelection) => void;
  setGlobalSubject: (value: SubjectSelection) => void;
  setActiveTrack: (track: ExamTrackId) => void;
}

const STORAGE_KEY = 'examprep-subject-selection';

const SubjectSelectionContext = createContext<SubjectSelectionContextValue | null>(null);

function defaultLastSelected(track: ExamTrackId): SubjectId {
  return (subjectsByTrack(track)[0]?.id ?? 'meteo-climatology') as SubjectId;
}

function defaultPrefs(track: ExamTrackId): TrackPrefs {
  return {
    perScreen: {},
    lastSelected: defaultLastSelected(track),
    prefersAll: false,
  };
}

function isValidForTrack(
  selection: SubjectSelection,
  track: ExamTrackId,
  examId?: string | null,
): boolean {
  if (selection === 'all') return true;
  // Must belong to track AND current exam profile subject policy
  const allowed = subjectsForScope({ trackId: track, examId: examId ?? null });
  return allowed.some((s) => s.id === selection);
}

function loadPersisted(): SubjectSelectionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const activeTrack: ExamTrackId =
        typeof parsed.activeTrack === 'string' && isTrackId(parsed.activeTrack)
          ? parsed.activeTrack
          : TRACK_IDS[0];

      // New shape
      if (parsed.byTrack && typeof parsed.byTrack === 'object') {
        const byTrack: SubjectSelectionState['byTrack'] = {};
        for (const key of TRACK_IDS) {
          const bucket = (parsed.byTrack as Record<string, unknown>)[key];
          if (bucket && typeof bucket === 'object') {
            const b = bucket as Record<string, unknown>;
            byTrack[key] = {
              perScreen: (b.perScreen as Record<string, SubjectSelection>) ?? {},
              lastSelected: (typeof b.lastSelected === 'string'
                ? b.lastSelected
                : defaultLastSelected(key)) as SubjectId,
              prefersAll: Boolean(b.prefersAll),
            };
          }
        }
        return { byTrack, activeTrack };
      }

      // Legacy flat shape → migrate into active track bucket
      const legacyPrefs: TrackPrefs = {
        perScreen: (parsed.perScreen as Record<string, SubjectSelection>) ?? {},
        lastSelected: (typeof parsed.lastSelected === 'string'
          ? parsed.lastSelected
          : defaultLastSelected(activeTrack)) as SubjectId,
        prefersAll: Boolean(parsed.prefersAll),
      };
      return {
        byTrack: { [activeTrack]: legacyPrefs },
        activeTrack,
      };
    }
  } catch {
    /* ignore */
  }
  return { byTrack: {}, activeTrack: TRACK_IDS[0] };
}

function prefsFor(state: SubjectSelectionState, track: ExamTrackId): TrackPrefs {
  return state.byTrack[track] ?? defaultPrefs(track);
}

export function SubjectSelectionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(() => loadPersisted());
  const { trackMembership } = useData();

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        /* ignore */
      }
    }, 120);
    return () => window.clearTimeout(id);
  }, [state]);

  // Canonical focus is membership.activeTrackId — mirror into UI prefs context only
  useEffect(() => {
    const focus = trackMembership.activeTrackId;
    if (!focus || !isTrackId(focus)) return;
    setState((prev) => {
      if (prev.activeTrack === focus) return prev;
      const byTrack = prev.byTrack[focus]
        ? prev.byTrack
        : { ...prev.byTrack, [focus]: defaultPrefs(focus) };
      return { ...prev, byTrack, activeTrack: focus };
    });
  }, [trackMembership.activeTrackId]);

  // When exam profile changes, drop subject picks that are no longer in scope
  useEffect(() => {
    const focus = trackMembership.activeTrackId;
    if (!focus || !isTrackId(focus)) return;
    const examId = trackMembership.enrollments[focus]?.activeExamId ?? null;
    setState((prev) => {
      const cur = prefsFor(prev, focus);
      let changed = false;
      const perScreen = { ...cur.perScreen };
      for (const [screen, sel] of Object.entries(perScreen)) {
        if (!isValidForTrack(sel as SubjectSelection, focus, examId)) {
          delete perScreen[screen];
          changed = true;
        }
      }
      let lastSelected = cur.lastSelected;
      if (!isValidForTrack(lastSelected, focus, examId)) {
        lastSelected = defaultLastSelected(focus);
        // If default also invalid under tight profiles, keep id; getActiveSubject falls back to 'all'
        changed = true;
      }
      if (!changed) return prev;
      return {
        ...prev,
        byTrack: {
          ...prev.byTrack,
          [focus]: { ...cur, perScreen, lastSelected },
        },
      };
    });
  }, [trackMembership.activeTrackId, trackMembership.enrollments]);

  // Full reset / multi-tab clear — wipe in-memory prefs so they cannot re-persist
  useEffect(() => {
    const onReset = () => {
      setState({ byTrack: {}, activeTrack: TRACK_IDS[0] });
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch { /* ignore */ }
    };
    window.addEventListener('examprep-subject-selection-reset', onReset);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue == null) onReset();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('examprep-subject-selection-reset', onReset);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // UI track label follows membership when enrolled; otherwise local state (not enrollment).
  const derivedActiveTrack: ExamTrackId =
    trackMembership.activeTrackId && isTrackId(trackMembership.activeTrackId)
      ? trackMembership.activeTrackId
      : state.activeTrack;

  const activePrefs = prefsFor(state, derivedActiveTrack);

  const focusExamId =
    trackMembership.activeTrackId && isTrackId(trackMembership.activeTrackId)
      ? (trackMembership.enrollments[trackMembership.activeTrackId]?.activeExamId ?? null)
      : null;

  const getActiveSubject = useCallback(
    (screen: StageScreen): SubjectSelection => {
      const prefs = prefsFor(state, derivedActiveTrack);
      const explicit = prefs.perScreen[screen];
      if (explicit !== undefined) {
        if (isValidForTrack(explicit, derivedActiveTrack, focusExamId)) return explicit;
        return 'all';
      }
      if (prefs.prefersAll) return 'all';
      if (isValidForTrack(prefs.lastSelected, derivedActiveTrack, focusExamId)) {
        return prefs.lastSelected;
      }
      return 'all';
    },
    [state, derivedActiveTrack, focusExamId],
  );

  const setActiveSubjectForScreen = useCallback((screen: StageScreen, value: SubjectSelection) => {
    setState((prev) => {
      const track =
        trackMembership.activeTrackId && isTrackId(trackMembership.activeTrackId)
          ? trackMembership.activeTrackId
          : prev.activeTrack;
      const cur = prefsFor(prev, track);
      return {
        ...prev,
        byTrack: {
          ...prev.byTrack,
          [track]: {
            perScreen: { ...cur.perScreen, [screen]: value },
            lastSelected: value !== 'all' ? (value as SubjectId) : cur.lastSelected,
            prefersAll: value === 'all' ? true : false,
          },
        },
      };
    });
  }, [trackMembership.activeTrackId]);

  const setGlobalSubject = useCallback((value: SubjectSelection) => {
    setState((prev) => {
      const track =
        trackMembership.activeTrackId && isTrackId(trackMembership.activeTrackId)
          ? trackMembership.activeTrackId
          : prev.activeTrack;
      const cur = prefsFor(prev, track);
      const newPerScreen: Record<string, SubjectSelection> = {};
      for (const s of STAGE_SCREENS) newPerScreen[s] = value;
      return {
        ...prev,
        byTrack: {
          ...prev.byTrack,
          [track]: {
            perScreen: newPerScreen,
            lastSelected: value !== 'all' ? (value as SubjectId) : cur.lastSelected,
            prefersAll: value === 'all',
          },
        },
      };
    });
  }, [trackMembership.activeTrackId]);

  /**
   * Switch UI subject context to another track.
   * Does not clear the previous track's preferences (stored under byTrack).
   */
  const setActiveTrack = useCallback((track: ExamTrackId) => {
    // UI track follows membership. Do not adopt an unenrolled track while another is enrolled.
    const enrolled = trackMembership.enrollments[track];
    const hasAny = Object.keys(trackMembership.enrollments).length > 0;
    if (hasAny && !enrolled) return;
    setState((prev) => {
      if (prev.activeTrack === track) return prev;
      const byTrack = prev.byTrack[track]
        ? prev.byTrack
        : { ...prev.byTrack, [track]: defaultPrefs(track) };
      return { ...prev, byTrack, activeTrack: track };
    });
  }, [trackMembership.enrollments]);


  return (
    <SubjectSelectionContext.Provider
      value={{
        perScreen: activePrefs.perScreen,
        lastSelected: activePrefs.lastSelected,
        prefersAll: activePrefs.prefersAll,
        activeTrack: derivedActiveTrack,
        getActiveSubject,
        setActiveSubjectForScreen,
        setGlobalSubject,
        setActiveTrack,
      }}
    >
      {children}
    </SubjectSelectionContext.Provider>
  );
}

export function useSubjectSelection(): SubjectSelectionContextValue {
  const ctx = useContext(SubjectSelectionContext);
  if (!ctx) throw new Error('useSubjectSelection must be used within SubjectSelectionProvider');
  return ctx;
}
