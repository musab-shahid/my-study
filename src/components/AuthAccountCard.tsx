import { useState, type FormEvent } from 'react';
import { Card, Button } from '@/components/ui';
import { getSupabaseEnvStatus } from '@/lib/runtime-env';
import {
  isAuthConfigured,
  isSignedIn,
  getStoredUserEmail,
  signInWithPassword,
  signUpWithPassword,
  signOut,
  MIN_PASSWORD_LENGTH,
  requestPasswordReset,
  deleteAccount,
} from '@/lib/supabase-auth';

/**
 * Email + password account card for cloud backup and cloud AI tutor.
 * Always visible: if Supabase env is missing, shows setup steps + load status.
 */
export function AuthAccountCard({ onSessionChange }: { onSessionChange?: () => void }) {
  const [email, setEmail] = useState(getStoredUserEmail() ?? '');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(isSignedIn());
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const configured = isAuthConfigured();
  const envStatus = getSupabaseEnvStatus();

  const refresh = () => {
    setSignedIn(isSignedIn());
    onSessionChange?.();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!configured) return;
    setBusy(true);
    setErr(null);
    setMsg(null);
    if (mode === 'reset') {
      const result = await requestPasswordReset(email);
      setBusy(false);
      if (result.ok) {
        setMsg('If an account exists for that email, a reset link has been sent. Check your inbox.');
        setMode('signin');
      } else {
        setErr(result.error ?? 'Could not send reset email.');
      }
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setBusy(false);
      setErr(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    const result =
      mode === 'signin'
        ? await signInWithPassword(email, password)
        : await signUpWithPassword(email, password);
    setBusy(false);
    if (result.ok) {
      setPassword('');
      setMsg(mode === 'signin' ? 'Signed in. Cloud backup and AI tutor are ready.' : 'Account ready. You are signed in.');
      setEmail(result.email);
      refresh();
    } else {
      setErr(result.error);
      if (/confirm your email/i.test(result.error)) {
        setMode('signin');
        setMsg(result.error);
        setErr(null);
      }
      refresh();
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
    setErr(null);
    setMsg(null);
    await signOut();
    setPassword('');
    setBusy(false);
    setMsg('Signed out. Local progress on this device is unchanged.');
    refresh();
  };

  return (
    <Card className="p-card-pad mb-4">
      <div className="flex flex-col gap-3">
        <div>
          <p className="font-semibold text-ink text-sm">Account</p>
          <p className="text-ink-muted text-xs mt-0.5 leading-relaxed">
            Sign in to enable cloud backup and the cloud AI tutor. Study and quizzes work offline without an account.
          </p>
        </div>

        {!configured ? (
          <div className="rounded-btn border border-warning-200 bg-warning-50 p-3" role="status">
            <p className="text-sm font-semibold text-warning-900">Supabase is not connected in this preview</p>
            <p className="text-xs text-warning-800 mt-1 leading-relaxed">
              The preview did not receive both env values. Check this status (values are never shown):
            </p>
            <ul className="mt-2 text-xs text-warning-900 space-y-1">
              <li>
                <span className="font-mono">VITE_SUPABASE_URL</span>:{' '}
                {envStatus.urlPresent
                  ? envStatus.urlLooksValid
                    ? 'loaded'
                    : 'loaded but looks wrong (use https://xxxx.supabase.co only, no /rest/v1)'
                  : 'missing'}
              </li>
              <li>
                <span className="font-mono">VITE_SUPABASE_ANON_KEY</span>:{' '}
                {envStatus.keyPresent ? 'loaded' : 'missing'}
              </li>
            </ul>
            <p className="text-xs text-warning-800 mt-2 leading-relaxed">
              In Bolt, create a file named <span className="font-mono">.env</span> next to{' '}
              <span className="font-mono">package.json</span> with exactly:
            </p>
            <pre className="mt-2 text-[11px] leading-relaxed bg-white/80 border border-warning-100 rounded-btn p-2 overflow-x-auto text-ink">{`VITE_SUPABASE_URL=https://YOUR_REF.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...`}</pre>
            <p className="text-xs text-warning-800 mt-2 leading-relaxed">
              No quotes, no spaces around <span className="font-mono">=</span>, then fully restart the preview (stop and run again).
              Database → Secrets is for server keys and will not fill these client vars.
            </p>
          </div>
        ) : signedIn ? (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-muted">
                Signed in as{' '}
                <span className="font-medium text-ink">{getStoredUserEmail() || email || 'your account'}</span>
              </p>
              <Button type="button" variant="secondary" disabled={busy} onClick={handleSignOut}>
                Sign out
              </Button>
            </div>
            {!confirmDelete ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="self-start text-xs text-danger-700"
                disabled={busy}
                onClick={() => {
                  setConfirmDelete(true);
                  setErr(null);
                  setMsg(null);
                }}
              >
                Delete cloud account…
              </Button>
            ) : (
              <div className="rounded-btn border border-danger-100 bg-danger-50 p-3 space-y-2">
                <p className="text-xs text-danger-800 leading-relaxed">
                  This permanently deletes your cloud account and synced progress backups.
                  Local data on this device is not removed automatically. This cannot be undone.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={busy}
                    onClick={async () => {
                      setBusy(true);
                      setErr(null);
                      setMsg(null);
                      const result = await deleteAccount();
                      setBusy(false);
                      if (result.ok) {
                        setConfirmDelete(false);
                        setSignedIn(false);
                        setPassword('');
                        setMsg('Cloud account deleted. Local study data on this device was kept.');
                        refresh();
                        onSessionChange?.();
                      } else {
                        setErr(result.error);
                      }
                    }}
                  >
                    {busy ? 'Deleting…' : 'Yes, delete my account'}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={busy}
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2 text-xs items-center">
              <Button
                type="button"
                size="sm"
                variant={mode === 'signin' ? 'secondary' : 'ghost'}
                onClick={() => {
                  setMode('signin');
                  setErr(null);
                  setMsg(null);
                }}
              >
                Sign in
              </Button>
              <span className="text-ink-muted" aria-hidden>
                ·
              </span>
              <Button
                type="button"
                size="sm"
                variant={mode === 'signup' ? 'secondary' : 'ghost'}
                onClick={() => {
                  setMode('signup');
                  setErr(null);
                  setMsg(null);
                }}
              >
                Create account
              </Button>
              <span className="text-ink-muted" aria-hidden>
                ·
              </span>
              <Button
                type="button"
                size="sm"
                variant={mode === 'reset' ? 'secondary' : 'ghost'}
                onClick={() => {
                  setMode('reset');
                  setErr(null);
                  setMsg(null);
                  setPassword('');
                }}
              >
                Forgot password
              </Button>
            </div>
            <label className="block">
              <span className="text-xs font-medium text-ink-muted">Email</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-btn border border-slate-300 px-3 py-2 text-sm text-ink min-h-touch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
                placeholder="you@example.com"
              />
            </label>
            {mode !== 'reset' && (
              <label className="block">
                <span className="text-xs font-medium text-ink-muted">Password</span>
                <input
                  type="password"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-btn border border-slate-300 px-3 py-2 text-sm text-ink min-h-touch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
                  placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                />
              </label>
            )}
            {mode === 'reset' && (
              <p className="text-xs text-ink-muted leading-relaxed">
                We will email a reset link if an account exists for this address. The message is the same whether or not the account is found.
              </p>
            )}
            <Button type="submit" disabled={busy}>
              {busy
                ? 'Please wait…'
                : mode === 'signin'
                  ? 'Sign in'
                  : mode === 'signup'
                    ? 'Create account'
                    : 'Send reset link'}
            </Button>
          </form>
        )}

        {msg && (
          <p className="text-xs text-success-700" role="status">
            {msg}
          </p>
        )}
        {err && (
          <p className="text-xs text-danger-700" role="alert">
            {err}
          </p>
        )}
      </div>
    </Card>
  );
}
