import {
  RefreshCw,
  BookOpenCheck, BookOpen,
  Check, CheckCircle2, AlertTriangle, FileText, Database,
  Share,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useData } from '@/hooks/useData';
import {
  subjects, subjectsByTrack,
  examTracks,
} from '@/data/subjects';
import { PageContainer, Card, Button, ScreenHeader } from '@/components/ui';
import { WorkspaceSettingsCard } from '@/components/track/WorkspaceSettingsCard';
import { ExamScheduleSettings } from '@/components/ExamScheduleSettings';
import { AuthAccountCard } from '@/components/AuthAccountCard';
import { downloadBackupFile, getLocalMutationAt } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/constants';
import {
  isProgressSyncConfigured,
  getProgressSyncAccessToken,
  pushProgress,
  pullProgress,
} from '@/lib/progress-sync';

import { planCloudRestoreWrite, isLocalNewerThanCloud } from '@/lib/cloud-restore';
import {
  isErrorReportingEnabled,
  setErrorReportingEnabled,
} from '@/lib/error-reporting';
import { sections } from '@/data/sections';
import { claimInstallPrompt, INSTALL_PROMPT_CONSUMED_EVENT } from '@/lib/install-prompt';
import { clearTutorData, getTutorMemoryRecords } from '@/lib/ai-tutor-storage';
import { requestPersistentStorage } from '@/lib/storage-persistence';
import type { SubjectId } from '@/types';

function cloudSyncErrorMessage(error: string | undefined, action: 'upload' | 'download'): string {
  switch (error) {
    case 'auth-required':
      return action === 'upload'
        ? 'Sign in required before cloud backup.'
        : 'Sign in required before cloud restore.';
    case 'token-expired':
      return 'Your session expired. Sign in again, then retry cloud backup.';
    case 'device-id-unavailable':
      return action === 'upload'
        ? 'This browser cannot create a stable device ID, so cloud backup is unavailable.'
        : 'This browser cannot create a stable device ID, so cloud restore is unavailable.';
    case 'invalid-cloud-data':
      return 'Cloud backup is invalid or incompatible. Local data was not changed.';
    case 'invalid-token':
      return 'Sign-in token is invalid. Sign out, sign in again, then retry.';
    case 'cloud-conflict':
      return 'The account backup changed on another device. Review the latest backup and retry.';
    default:
      return action === 'upload'
        ? `Upload failed: ${error ?? 'unknown'}`
        : `Download failed: ${error ?? 'unknown'}`;
  }
}

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
  const [selectedSubjects, setSelectedSubjects] = useState<Set<SubjectId>>(new Set());
  const [confirming, setConfirming] = useState(false);
  const [resetDone, setResetDone] = useState<{ message: string; kind: 'success' | 'error' } | null>(null);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const [syncBusy, setSyncBusy] = useState(false);
  const [, setSessionTick] = useState(0);
  const [errorReporting, setErrorReporting] = useState(isErrorReportingEnabled);
  const [confirmCloudRestore, setConfirmCloudRestore] = useState(false);
  const [pendingCloudUploadAt, setPendingCloudUploadAt] = useState<string | null>(null);
  const [backupMsg, setBackupMsg] = useState<string | null>(null);
  const [confirmClearTutorData, setConfirmClearTutorData] = useState(false);
  const [tutorDataMsg, setTutorDataMsg] = useState<string | null>(null);
  const [storagePersistenceMsg, setStoragePersistenceMsg] = useState<string | null>(null);
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);
  const [installMsg, setInstallMsg] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  const globalTopicCount = sections.reduce((sum, s) => sum + s.topicCount, 0);
  const globalQuestionCount = sections.reduce((sum, s) => sum + s.questionCount, 0);
  const tutorMemoryRecords = getTutorMemoryRecords();

  const allSelected = selectedSubjects.size === subjects.length;
  const noneSelected = selectedSubjects.size === 0;
  const isFullReset = allSelected;
  const selectedSubjectNames = subjects
    .filter((subject) => selectedSubjects.has(subject.id as SubjectId))
    .map((subject) => subject.title);


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
        subtitle="Set up your workspace, plan exams, and manage your account, data, and app."
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

      <nav aria-label="Settings sections" className="mb-6 flex flex-wrap gap-2 border-b border-border pb-3">
        {[
          ['workspace-settings', 'Workspace'], ['exam-settings', 'Exam planning'],
          ['account-settings', 'Account & sync'], ['data-settings', 'Data & privacy'],
          ['app-settings', 'App'], ['reset-settings', 'Reset'], ['about-settings', 'About'],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`} className="rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-ink-muted transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700">{label}</a>
        ))}
      </nav>

      <section id="workspace-settings" aria-labelledby="workspace-settings-heading" className="scroll-mt-24 mb-6 space-y-4">
        <h2 id="workspace-settings-heading" className="text-sm font-bold uppercase tracking-wide text-muted">Workspace</h2>
        <WorkspaceSettingsCard />
      </section>


      <section id="exam-settings" aria-labelledby="exam-settings-heading" className="scroll-mt-24 mb-6 space-y-3">
        <h2 id="exam-settings-heading" className="text-sm font-bold uppercase tracking-wide text-muted">Exam planning</h2>
        <ExamScheduleSettings />
      </section>

      <section id="account-settings" aria-labelledby="account-settings-heading" className="scroll-mt-24 mb-6 space-y-3">
        <h2 id="account-settings-heading" className="text-sm font-bold uppercase tracking-wide text-muted">Account & sync</h2>
        <AuthAccountCard onSessionChange={() => setSessionTick((t) => t + 1)} />
      {isProgressSyncConfigured() && (
        <Card className="p-card-pad mb-4">
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-semibold text-ink text-sm">Cloud backup</p>
              <p className="text-muted text-xs mt-0.5">
                Optional account-wide backup of local progress, available across your signed-in devices. Requires network and a signed-in account.
                {!getProgressSyncAccessToken() && (
                  <span className="block mt-1 text-warning-800">
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
                  setPendingCloudUploadAt(null);
                  const cloud = await pullProgress();
                  if (cloud.ok && cloud.source === 'account' && cloud.updatedAt) {
                    setPendingCloudUploadAt(cloud.updatedAt);
                    setSyncMsg('An account backup already exists. Review the timestamp and confirm before replacing it.');
                    setSyncBusy(false);
                    return;
                  }
                  if (!cloud.ok && cloud.error !== 'empty') {
                    setSyncMsg(cloudSyncErrorMessage(cloud.error, 'upload'));
                    setSyncBusy(false);
                    return;
                  }
                  const result = await pushProgress(data, null);
                  setSyncMsg(result.ok ? 'Uploaded an account-wide backup.' : result.error === 'cloud-conflict'
                    ? 'A backup was created on another device. Select Upload again to review it before replacing.'
                    : cloudSyncErrorMessage(result.error, 'upload'));
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
            {pendingCloudUploadAt && (
              <div className="rounded-xl border border-warning-200 bg-warning-50 p-3" role="group" aria-label="Confirm account backup replacement">
                <p className="text-sm font-semibold text-warning-900">Replace the existing account-wide backup?</p>
                <p className="mt-1 text-xs leading-5 text-warning-800">
                  Last saved {new Date(pendingCloudUploadAt).toLocaleString()}. This replaces the shared backup for all devices. If another device updates it first, the upload will be stopped and you can review the newer version.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    variant="danger"
                    disabled={syncBusy}
                    onClick={async () => {
                      setSyncBusy(true);
                      setSyncMsg(null);
                      const result = await pushProgress(data, pendingCloudUploadAt);
                      setSyncMsg(result.ok ? 'Account-wide backup replaced.' : result.error === 'cloud-conflict'
                        ? 'The cloud backup changed on another device. Select Upload again to review the latest version.'
                        : cloudSyncErrorMessage(result.error, 'upload'));
                      setPendingCloudUploadAt(null);
                      setSyncBusy(false);
                    }}
                  >
                    Replace account backup
                  </Button>
                  <Button variant="secondary" disabled={syncBusy} onClick={() => setPendingCloudUploadAt(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            {confirmCloudRestore && (
              <div className="rounded-xl border border-warning-200 bg-warning-50 p-3" role="group" aria-label="Confirm cloud restore">
                <p className="text-sm font-semibold text-warning-900">Replace local progress with the cloud backup?</p>
                <p className="mt-1 text-xs leading-5 text-warning-800">
                  A recovery copy of your current local data will be saved first. The account-wide backup may have been updated from another device.
                  {getLocalMutationAt()
                    ? ' If this device was edited after the last cloud upload, restoring will overwrite those edits.'
                    : ''}
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
                        setSyncMsg(cloudSyncErrorMessage(!r.ok ? r.error : undefined, 'download'));
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
                        const newer = r.ok && isLocalNewerThanCloud(getLocalMutationAt(), r.updatedAt);
                        setSyncMsg(
                          newer
                            ? 'Downloaded and saved (local data was newer than the cloud backup and was overwritten). Reloading…'
                            : 'Downloaded and saved. Reloading…',
                        );
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
            {syncMsg && <p className="text-xs text-muted" role="status" aria-live="polite" aria-atomic="true">{syncMsg}</p>}
          </div>
        </Card>
      )}
      </section>


      <section id="data-settings" aria-labelledby="data-settings-heading" className="scroll-mt-24 mb-6 space-y-3">
      <h2 id="data-settings-heading" className="text-sm font-bold uppercase tracking-wide text-muted">Data & privacy</h2>
      <Card className="p-card-pad mb-4">
        <p className="font-semibold text-ink text-sm">Privacy &amp; data</p>
        <div className="mt-2 space-y-2 text-xs leading-relaxed text-ink-muted">
          <p>
            <strong className="font-medium">On this device.</strong>{' '}
            Study progress, quiz history, and preferences are stored in your browser
            (localStorage). Submitted quiz attempts, flashcard grades, lesson-check outcomes, and their recovery queue
            are stored separately in this browser's IndexedDB. Review records are currently device-local and are not included in the
            JSON export or account-wide cloud backup. Clearing this site's browser data removes both stores.
          </p>
          <p>
            <strong className="font-medium">Cloud backup (optional).</strong>{' '}
            If you sign in, one account-wide snapshot can be uploaded and restored on your other devices. Replacing an existing snapshot requires confirmation and uses a version check so a concurrent upload is not silently overwritten. Older per-device snapshots remain available on the device that created them until an account-wide snapshot is created.
          </p>
          <p>
            <strong className="font-medium">AI tutor.</strong>{' '}
            When you send a message, the current conversation, relevant topic material, and study context
            (which can include recent missed questions, quiz performance, and saved struggle notes) are
            sent to the selected third-party model provider. Depending on deployment configuration, the
            request passes through our Supabase proxy or goes directly from your browser to the provider.
            Chat transcripts (up to 40 messages per topic) and tutor-memory notes (up to four per topic)
            are stored in this browser. The provider's own privacy and retention terms apply to requests
            it receives. Avoid sending sensitive personal information.
          </p>
          <p>
            <strong className="font-medium">Deletion.</strong>{' '}
            Export or clear local data from this Settings screen. While signed in, use
            &quot;Delete cloud account&quot; on the Account card to remove the cloud account and
            synced backups (requires the delete-account function to be deployed).
          </p>
        </div>
      </Card>

      <Card className="p-card-pad mb-4">
        <div className="flex flex-col gap-2">
          <div>
            <p className="font-semibold text-ink text-sm">AI tutor history &amp; memory</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">
              Clear chat transcripts and automatically saved struggle notes for every topic on this device.
              This does not delete information already sent to an external AI provider or affect study progress.
            </p>
          </div>
          <details className="rounded-lg border border-border px-3 py-2">
            <summary className="cursor-pointer text-xs font-medium text-ink-muted">
              View saved tutor memory ({tutorMemoryRecords.reduce((sum, record) => sum + record.notes.length, 0)} notes)
            </summary>
            {tutorMemoryRecords.length > 0 ? (
              <div className="mt-2 space-y-3">
                {tutorMemoryRecords.map((record) => (
                  <div key={record.topicKey}>
                    <p className="text-xs font-semibold text-ink">{record.topicKey}</p>
                    <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-ink-muted">
                      {record.notes.map((note, index) => <li key={index}>{note}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-xs text-ink-muted">No saved tutor-memory notes on this device.</p>
            )}
          </details>
          {!confirmClearTutorData ? (
            <Button
              type="button"
              variant="danger"
              className="self-start"
              onClick={() => {
                setTutorDataMsg(null);
                setConfirmClearTutorData(true);
              }}
            >
              Clear all tutor history and memory
            </Button>
          ) : (
            <div className="rounded-xl border border-danger-200 bg-danger-50 p-3" role="group" aria-label="Confirm clearing AI tutor data">
              <p className="text-xs leading-relaxed text-danger-900">
                This removes all locally stored AI tutor conversations and memory notes across topics from this browser.
                Copies already sent to model providers cannot be recalled by this action.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => {
                    const result = clearTutorData();
                    setTutorDataMsg(result.ok
                      ? `Cleared ${result.chatThreads} chat histories and ${result.memoryTopics} tutor-memory records from this device.`
                      : 'Some tutor data could not be cleared. Check browser storage permissions and try again.');
                    setConfirmClearTutorData(false);
                  }}
                >
                  Confirm clear
                </Button>
                <Button type="button" variant="secondary" onClick={() => setConfirmClearTutorData(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
          {tutorDataMsg && <p className="text-xs text-ink-muted" role="status" aria-live="polite">{tutorDataMsg}</p>}
        </div>
      </Card>

      <Card className="p-card-pad mb-4">
        <div className="space-y-2">
          <div>
            <p className="font-semibold text-ink text-sm">Browser storage protection</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">
              My Study flushes pending progress writes when the page is hidden or closed. You can also ask
              your browser to protect this site's storage from automatic eviction when device storage is
              under pressure. This does not prevent you or the browser from clearing site data, and it does
              not protect against device loss or hardware failure. Keep a downloadable backup for important progress.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            className="self-start"
            onClick={async () => {
              setStoragePersistenceMsg('Checking browser storage protection…');
              const result = await requestPersistentStorage(
                typeof navigator !== 'undefined' ? navigator.storage : null,
              );
              const usage = result.usage !== undefined && result.quota !== undefined
                ? ` Site storage usage: ${(result.usage / 1024 / 1024).toFixed(1)} MB of ${(result.quota / 1024 / 1024).toFixed(1)} MB.`
                : '';
              const messages = {
                'already-persisted': 'This browser has already marked My Study storage as persistent. Automatic eviction risk is reduced, but this is not a backup.',
                granted: 'Your browser granted persistent storage. Automatic eviction risk is reduced, but manual clearing and device failure can still remove data.',
                denied: 'Your browser did not grant persistent storage. Progress remains saved best-effort; download a backup regularly.',
                unsupported: 'This browser does not support persistent storage requests. Download a backup regularly.',
                error: 'The browser could not complete the persistent-storage request. Your existing local save behavior is unchanged.',
              } as const;
              setStoragePersistenceMsg(messages[result.status] + usage);
            }}
          >
            Request persistent storage
          </Button>
          {storagePersistenceMsg && (
            <p className="text-xs text-ink-muted" role="status" aria-live="polite">{storagePersistenceMsg}</p>
          )}
        </div>
      </Card>

      <Card className="p-card-pad mb-4">
        <h2 className="font-semibold text-ink text-sm">Diagnostics</h2>
        <p className="mt-1 text-xs text-ink-muted leading-relaxed">
          Optionally send crash diagnostics (error message, route, app version). Tokens and
          emails are scrubbed. No report is sent unless you enable this.
        </p>
        <label className="mt-3 flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            className="rounded"
            checked={errorReporting}
            onChange={(e) => {
              const on = e.target.checked;
              setErrorReportingEnabled(on);
              setErrorReporting(on);
            }}
          />
          Share crash diagnostics
        </label>
      </Card>



      <Card className="p-card-pad mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="font-semibold text-ink text-sm">Export progress</p>
            <p className="text-muted text-xs mt-0.5">Download a JSON backup of your local study data.</p>
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
          {backupMsg && <p className="text-xs text-muted sm:basis-full" role="status" aria-live="polite">{backupMsg}</p>}
        </div>
      </Card>

      </section>


      <section id="app-settings" aria-labelledby="app-settings-heading" className="scroll-mt-24 mb-6 space-y-3">
      <h2 id="app-settings-heading" className="text-sm font-bold uppercase tracking-wide text-muted">App and installation</h2>
      <Card className="p-card-pad mb-4 animate-fade-in-up" style={{ animationDelay: '0.12s' }}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shrink-0 shadow-sm">
            <RefreshCw className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-ink text-sm">App updates</p>
            <p className="text-muted text-xs mt-0.5 leading-relaxed">
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
            {updateMsg && <p className="text-xs text-muted mt-2" role="status">{updateMsg}</p>}
          </div>
        </div>
      </Card>

      {showInstall && (
        <Card className="p-card-pad mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              <Share className="w-5 h-5 text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-ink text-sm">Install app</p>
              <p className="text-muted text-xs mt-0.5 leading-relaxed">
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
              {installMsg && <p className="text-xs text-muted mt-2" role="status">{installMsg}</p>}
            </div>
          </div>
        </Card>
      )}

      </section>


      <section id="reset-settings" aria-labelledby="reset-settings-heading" className="scroll-mt-24 mb-6">
      <h2 id="reset-settings-heading" className="text-sm font-bold uppercase tracking-wide text-muted mb-3">Reset and recovery</h2>
      <Card className="p-card-pad mb-4">
        <p className="font-semibold text-ink text-sm mb-2">Reset progress</p>
        <p className="text-muted text-xs mb-3 leading-relaxed">
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
                className={`inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full border min-h-touch ${
                  selected ? 'bg-brand-100 border-brand-300 text-brand-800' : 'bg-white border-border text-muted'
                }`}
              >
                {selected ? <Check className="w-3.5 h-3.5 shrink-0 text-brand-700" aria-hidden /> : null}
                {s.title}
              </button>
            );
          })}
        </div>
        {!confirming ? (
          <Button variant="danger" disabled={noneSelected} onClick={() => setConfirming(true)}>
            Reset selected
          </Button>
        ) : (
          <div className="mt-3 rounded-xl border border-danger-200 bg-danger-50 p-3" role="alert">
            <p className="text-sm font-semibold text-danger-900">
              {isFullReset ? 'Full reset: all study data will be cleared.' : `Partial reset: ${selectedSubjects.size} selected subject${selectedSubjects.size === 1 ? '' : 's'} will be cleared.`}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-danger-800">
              {isFullReset ? 'This includes all subjects, quiz history and saved learning progress.' : selectedSubjectNames.join(' · ')}
            </p>
            <p className="mt-2 text-xs font-medium text-danger-800">
              A recovery backup will be saved before the reset. If the backup or save fails, the reset is cancelled and your current progress is kept.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="danger" onClick={handleReset}>
                {isFullReset ? 'Reset all data' : `Reset ${selectedSubjects.size} selected subject${selectedSubjects.size === 1 ? '' : 's'}`}
              </Button>
              <Button variant="secondary" onClick={() => setConfirming(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>
      </section>

      <section id="about-settings" aria-labelledby="about-settings-heading" className="scroll-mt-24 mb-6 space-y-3">
      <h2 id="about-settings-heading" className="text-sm font-bold uppercase tracking-wide text-muted">About</h2>
      <Card className="p-card-pad sm:p-card-pad-lg mb-4 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-card bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shrink-0 shadow-sm shadow-brand-500/20">
            <BookOpenCheck className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-ink text-base leading-tight">My Study</p>
            <p className="text-muted text-sm leading-tight">Learning and assessment · v{__APP_VERSION__}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
          <InfoStat icon={<BookOpen className="w-4 h-4 text-brand-500" />} value={`${subjects.length}`} label="subjects" />
          <InfoStat icon={<FileText className="w-4 h-4 text-brand-500" />} value={`${globalTopicCount}`} label="topics" />
          <InfoStat icon={<Database className="w-4 h-4 text-brand-500" />} value={`${globalQuestionCount}`} label="questions" />
        </div>
      </Card>

      </section>


    </PageContainer>
  );
}

function InfoStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1 mb-0.5">{icon}</div>
      <p className="text-base font-bold text-ink leading-tight">{value}</p>
      <p className="text-muted text-xs leading-tight">{label}</p>
    </div>
  );
}
