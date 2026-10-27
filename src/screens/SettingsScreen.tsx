import {
  RefreshCw,
  Trash2, Library, Flame, TrendingUp, BookOpen, Brain, Target,
  Check, CheckCircle2, Minus, AlertTriangle, FileText, Database, Info,
  Download, Share,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useData } from '@/hooks/useData';
import { useSubjectData } from '@/hooks/useSubjectData';
import {
  subjects, subjectsByTrack,
  examTracks, examTrackMap,
} from '@/data/subjects';
import { getSubjectStyle, getTrackStyle } from '@/data/subject-colors';
import { PageContainer, Card, Button, ScreenHeader } from '@/components/ui';
import { WorkspaceSettingsCard } from '@/components/track/WorkspaceSettingsCard';
import { AuthAccountCard } from '@/components/AuthAccountCard';
import { computeStreak, getTodayActivity, getWeekActivity } from '@/lib/streak';
import { downloadBackupFile } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/constants';
import {
  isProgressSyncConfigured,
  getProgressSyncAccessToken,
  pushProgress,
  pullProgress,
} from '@/lib/progress-sync';
import { planCloudRestoreWrite } from '@/lib/cloud-restore';
import { sections } from '@/data/sections';
import { claimInstallPrompt, INSTALL_PROMPT_CONSUMED_EVENT } from '@/lib/install-prompt';
import type { SubjectId } from '@/types';

function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;
}

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function SettingsScreen() {
  const { data, reset, resetSubjects } = useData();
  const sd = useSubjectData();
  const [selectedSubjects, setSelectedSubjects] = useState<Set<SubjectId>>(new Set());
  const [confirming, setConfirming] = useState(false);
  const [resetDone, setResetDone] = useState<{ message: string; kind: 'success' | 'error' } | null>(null);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [syncBusy, setSyncBusy] = useState(false);
  const [sessionTick, setSessionTick] = useState(0);
  const [confirmCloudRestore, setConfirmCloudRestore] = useState(false);
  const [backupMsg, setBackupMsg] = useState<string | null>(null);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);
  const [installMsg, setInstallMsg] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  const streak = computeStreak(data);
  const today = getTodayActivity(data);
  const week = getWeekActivity(data);

  const globalStudied = data.studiedTopics.length;
  const globalAnswered = Object.keys(data.questionResults).length;
  const globalCorrect = Object.values(data.questionResults).filter((r) => r.correct).length;

  const globalTopicCount = sections.reduce((sum, s) => sum + s.topicCount, 0);
  const globalQuestionCount = sections.reduce((sum, s) => sum + s.questionCount, 0);
  const globalAcc = globalAnswered > 0 ? Math.round((globalCorrect / globalAnswered) * 100) : 0;

  const allSelected = selectedSubjects.size === subjects.length;
  const noneSelected = selectedSubjects.size === 0;
  const isFullReset = allSelected;
  const hasSession = Boolean(getProgressSyncAccessToken()) || sessionTick < 0;

  const toggleSubject = (id: SubjectId) => {
    setSelectedSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    setConfirming(false);
    setResetDone(null);
  };

  const toggleAll = () => {
    setSelectedSubjects(allSelected ? new Set() : new Set(subjects.map((s) => s.id as SubjectId)));
    setConfirming(false);
    setResetDone(null);
  };

  const toggleTrack = (trackId: string) => {
    setSelectedSubjects((prev) => {
      const next = new Set(prev);
      const trackSubjects = subjectsByTrack(trackId as typeof subjects[number]['track']);
      const allTrackSelected = trackSubjects.every((s) => next.has(s.id as SubjectId));
      if (allTrackSelected) {
        trackSubjects.forEach((s) => next.delete(s.id as SubjectId));
      } else {
        trackSubjects.forEach((s) => next.add(s.id as SubjectId));
      }
      return next;
    });
    setConfirming(false);
    setResetDone(null);
  };

  const handleReset = () => {
    try {
      if (isFullReset) {
        const didReset = reset();
        if (!didReset) {
          setResetDone({ kind: 'error', message: 'Reset cancelled because a recovery backup could not be saved. Free browser storage and try again.' });
          setConfirming(false);
          return;
        }
        setResetDone({ kind: 'success', message: 'All data has been reset. A recovery backup was saved.' });
      } else {
        const didReset = resetSubjects([...selectedSubjects]);
        if (!didReset) {
          setResetDone({ kind: 'error', message: 'Partial reset cancelled because a recovery backup or save could not be completed. Your current progress was kept.' });
          setConfirming(false);
          return;
        }
        const n = selectedSubjects.size;
        setResetDone({ kind: 'success', message: `${n} subject${n !== 1 ? 's' : ''} reset successfully. A recovery backup was saved.` });
      }
      setSelectedSubjects(new Set());
      setConfirming(false);
    } catch (err) {
      console.error('[settings] reset failed', err);
      setResetDone({ kind: 'error', message: 'Reset failed — check your saved data and backup before trying again.' });
      setConfirming(false);
    }
  };

  useEffect(() => {
    if (isStandalone()) {
      setShowInstall(false);
      return;
    }
    setShowInstall(true);
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onPromptConsumed = (event: Event) => {
      const consumedPrompt = (event as CustomEvent<Event>).detail;
      setDeferredPrompt((current) => current === consumedPrompt ? null : current);
    };
    const onInstalled = () => {
      setDeferredPrompt(null);
      setShowInstall(false);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener(INSTALL_PROMPT_CONSUMED_EVENT, onPromptConsumed);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener(INSTALL_PROMPT_CONSUMED_EVENT, onPromptConsumed);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    if (!claimInstallPrompt(deferredPrompt)) {
      setDeferredPrompt(null);
      setInstallMsg('The install prompt was already used. You can use your browser menu to install the app later.');
      return;
    }
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      if (outcome === 'accepted') {
        setShowInstall(false);
        setInstallMsg('App installation started.');
      } else {
        setInstallMsg('Installation was dismissed. You can use your browser menu to install the app later.');
      }
    } catch (err) {
      console.warn('[install] prompt failed', err);
      setInstallMsg('The install prompt could not be opened. Use your browser menu to install the app if available.');
      setDeferredPrompt(null);
    }
  };

  return (
    <PageContainer>
      <ScreenHeader
        title="Settings"
        subtitle="Manage your workspace, data, installation, and study preferences."
        className="animate-fade-in-up"
      />

      {resetDone && (
        <div
          role={resetDone.kind === 'error' ? 'alert' : 'status'}
          aria-live={resetDone.kind === 'error' ? 'assertive' : 'polite'}
          className={`mb-4 p-3 rounded-xl border flex items-center gap-2 animate-fade-in-up ${resetDone.kind === 'error' ? 'bg-danger-50 border-danger-100' : 'bg-success-50 border-success-100'}`}
        >
          {resetDone.kind === 'error'
            ? <AlertTriangle className="w-5 h-5 text-danger-600 shrink-0" />
            : <CheckCircle2 className="w-5 h-5 text-success-500 shrink-0" />}
          <p className={`text-sm font-medium ${resetDone.kind === 'error' ? 'text-danger-700' : 'text-success-700'}`}>{resetDone.message}</p>
        </div>
      )}

      <WorkspaceSettingsCard />

      <Card className="p-card-pad sm:p-card-pad-lg mb-4 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-card bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shrink-0 shadow-sm shadow-brand-500/20">
            <Library className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 text-base leading-tight">My Study</p>
            <p className="text-slate-500 text-sm leading-tight">Learning and assessment · v{__APP_VERSION__}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
          <InfoStat icon={<BookOpen className="w-4 h-4 text-brand-500" />} value={`${subjects.length}`} label="subjects" />
          <InfoStat icon={<FileText className="w-4 h-4 text-brand-500" />} value={`${globalTopicCount}`} label="topics" />
          <InfoStat icon={<Database className="w-4 h-4 text-brand-500" />} value={`${globalQuestionCount}`} label="questions" />
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3 mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <Card className="p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Flame className={`w-4 h-4 ${streak.streak > 0 ? 'text-orange-500' : 'text-slate-500'}`} />
            <span className="text-slate-500 text-xs font-medium">Streak</span>
          </div>
          <p className="text-xl font-bold text-slate-900 leading-tight">{streak.streak}<span className="text-sm font-normal text-slate-500">d</span></p>
          <p className="text-slate-500 text-xs mt-0.5 truncate">
            {streak.studiedToday ? 'On track' : streak.atRisk ? 'At risk' : 'Start today'}
          </p>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-4 h-4 text-brand-500" />
            <span className="text-slate-500 text-xs font-medium">Today</span>
          </div>
          <p className="text-xl font-bold text-slate-900 leading-tight">{today.questionsAnswered}</p>
          <p className="text-slate-500 text-xs mt-0.5 truncate">{today.quizCount} quizzes</p>
        </Card>
        <Card className="p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Target className="w-4 h-4 text-success-500" />
            <span className="text-slate-500 text-xs font-medium">Week</span>
          </div>
          <p className="text-xl font-bold text-slate-900 leading-tight">{week.avgAccuracy}<span className="text-sm font-normal text-slate-500">%</span></p>
          <p className="text-slate-500 text-xs mt-0.5 truncate">{week.questionsAnswered} answered</p>
        </Card>
      </div>

      <AuthAccountCard onSessionChange={() => setSessionTick((t) => t + 1)} />

      {isProgressSyncConfigured() && (
        <Card className="p-card-pad mb-4">
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-semibold text-slate-900 text-sm">Cloud backup</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Optional per-device backup of local progress. Requires network and a signed-in account.
                {!getProgressSyncAccessToken() && (
                  <span className="block mt-1 text-amber-800">
                    Sign in with the Account card above to enable upload and restore.
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                disabled={syncBusy || !getProgressSyncAccessToken()}
                onClick={async () => {
                  setSyncBusy(true);
                  setSyncMsg(null);
                  const r = await pushProgress(data);
                  setSyncMsg(
                    r.ok
                      ? 'Uploaded to cloud.'
                      : r.error === 'auth-required'
                        ? 'Sign in required before cloud backup.'
                        : r.error === 'device-id-unavailable'
                        ? 'This browser cannot create a stable device ID, so cloud backup is unavailable.'
                        : `Upload failed: ${r.error}`,
                  );
                  setSyncBusy(false);
                }}
              >
                Upload
              </Button>
              <Button
                variant="secondary"
                disabled={syncBusy || !getProgressSyncAccessToken()}
                onClick={() => setConfirmCloudRestore(true)}
              >
                Restore from cloud
              </Button>
            </div>
            {confirmCloudRestore && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3" role="group" aria-label="Confirm cloud restore">
                <p className="text-sm font-semibold text-amber-900">Replace local progress with the cloud backup?</p>
                <p className="mt-1 text-xs leading-5 text-amber-800">
                  A recovery copy of your current local data will be saved first.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    variant="danger"
                    disabled={syncBusy}
                    onClick={async () => {
                      setSyncBusy(true);
                      setSyncMsg(null);
                      const r = await pullProgress();
                      if (!r.ok || !r.data) {
                        setSyncMsg(
                          r.error === 'auth-required'
                            ? 'Sign in required before cloud restore.'
                            : r.error === 'invalid-cloud-data'
                              ? 'Cloud backup is invalid or incompatible. Local data was not changed.'
                              : r.error === 'device-id-unavailable'
                                ? 'This browser cannot create a stable device ID, so cloud restore is unavailable.'
                                : `Download failed: ${r.error ?? 'unknown'}`,
                        );
                        setSyncBusy(false);
                        setConfirmCloudRestore(false);
                        return;
                      }
                      try {
                        const existing = localStorage.getItem(STORAGE_KEYS.appData);
                        const plan = planCloudRestoreWrite(STORAGE_KEYS.appData, existing, r.data);
                        if (plan.recoveryValue != null) {
                          localStorage.setItem(plan.recoveryKey, plan.recoveryValue);
                        }
                        localStorage.setItem(plan.appDataKey, plan.appDataValue);
                        setSyncMsg('Downloaded and saved. Reloading…');
                        window.location.reload();
                      } catch {
                        setSyncMsg('Download ok but could not write locally — local data unchanged.');
                        setSyncBusy(false);
                      }
                      setConfirmCloudRestore(false);
                    }}
                  >
                    Confirm restore
                  </Button>
                  <Button variant="secondary" disabled={syncBusy} onClick={() => setConfirmCloudRestore(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            {syncMsg && <p className="text-xs text-slate-600" role="status" aria-live="polite" aria-atomic="true">{syncMsg}</p>}
          </div>
        </Card>
      )}

      <Card className="p-card-pad mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="font-semibold text-slate-900 text-sm">Export progress</p>
            <p className="text-slate-500 text-xs mt-0.5">Download a JSON backup of your local study data.</p>
          </div>
          <Button variant="secondary" onClick={() => {
            try {
              const started = downloadBackupFile(data);
              setBackupMsg(started ? 'Backup download started. Check your downloads.' : 'Backup could not be created. Please try again.');
            } catch (e) {
              console.error('[settings] export failed', e);
              setBackupMsg('Backup could not be created. Please try again.');
            }
          }}>Download backup</Button>
          {backupMsg && <p className="text-xs text-slate-600 sm:basis-full" role="status" aria-live="polite">{backupMsg}</p>}
        </div>
      </Card>

      <Card className="p-card-pad mb-4 animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shrink-0 shadow-sm">
            <RefreshCw className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 text-sm">App updates</p>
            <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
              Check if a new version is available and reload the app.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="secondary"
                onClick={async () => {
                  setUpdateMsg(null);
                  try {
                    if ('serviceWorker' in navigator) {
                      const regs = await navigator.serviceWorker.getRegistrations();
                      await Promise.all(regs.map((r) => r.update()));
                    }
                    setUpdateMsg('Checked for updates. If a new version was found, reload the page.');
                  } catch {
                    setUpdateMsg('Could not check for updates. Try reloading the page.');
                  }
                }}
              >
                Check for updates
              </Button>
              <Button variant="secondary" onClick={() => window.location.reload()}>
                Reload
              </Button>
            </div>
            {updateMsg && <p className="text-xs text-slate-600 mt-2" role="status">{updateMsg}</p>}
          </div>
        </div>
      </Card>

      {showInstall && (
        <Card className="p-card-pad mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              <Share className="w-5 h-5 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm">Install app</p>
              <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                {isIOS()
                  ? 'On iPhone/iPad: tap Share, then Add to Home Screen.'
                  : deferredPrompt
                    ? 'Install My Study for quicker access and offline use.'
                    : 'Use your browser menu (Install app / Add to Home Screen) if available.'}
              </p>
              {deferredPrompt && (
                <Button className="mt-3" onClick={handleInstall}>
                  Install
                </Button>
              )}
              {installMsg && <p className="text-xs text-slate-600 mt-2" role="status">{installMsg}</p>}
            </div>
          </div>
        </Card>
      )}

      <Card className="p-card-pad mb-4">
        <p className="font-semibold text-slate-900 text-sm mb-2">Reset progress</p>
        <p className="text-slate-500 text-xs mb-3 leading-relaxed">
          Choose subjects to clear. A recovery backup is saved first when possible.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <Button type="button" variant="secondary" size="sm" onClick={toggleAll}>
            {allSelected ? 'Clear selection' : 'Select all'}
          </Button>
          {examTracks.map((t) => (
            <Button key={t.id} type="button" variant="secondary" size="sm" onClick={() => toggleTrack(t.id)}>
              {t.shortTitle || t.title}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-3 max-h-40 overflow-y-auto">
          {subjects.map((s) => {
            const selected = selectedSubjects.has(s.id as SubjectId);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleSubject(s.id as SubjectId)}
                className={`text-xs px-2.5 py-1.5 rounded-full border min-h-touch ${
                  selected ? 'bg-brand-100 border-brand-300 text-brand-800' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                {selected ? '✓ ' : ''}{s.title}
              </button>
            );
          })}
        </div>
        {!confirming ? (
          <Button variant="danger" disabled={noneSelected} onClick={() => setConfirming(true)}>
            Reset selected
          </Button>
        ) : (
          <div className="flex flex-wrap gap-2">
            <Button variant="danger" onClick={handleReset}>
              Confirm reset
            </Button>
            <Button variant="secondary" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
          </div>
        )}
      </Card>
    </PageContainer>
  );
}

function InfoStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1 mb-0.5">{icon}</div>
      <p className="text-base font-bold text-slate-900 leading-tight">{value}</p>
      <p className="text-slate-500 text-xs leading-tight">{label}</p>
    </div>
  );
}
