import { useState, FormEvent } from 'react';
import { Card, Button } from '@/components/ui';
import {
  isAuthConfigured,
  isSignedIn,
  getStoredUserEmail,
  signInWithPassword,
  signUpWithPassword,
  signOut,
} from '@/lib/supabase-auth';

/**
 * Email + password account card for cloud backup and cloud AI tutor.
 * Renders nothing when Supabase is not configured.
 */
export function AuthAccountCard({ onSessionChange }: { onSessionChange?: () => void }) {
  const [email, setEmail] = useState(getStoredUserEmail() ?? '');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(isSignedIn());
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  if (!isAuthConfigured()) return null;

  const refresh = () => {
    setSignedIn(isSignedIn());
    onSessionChange?.();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setMsg(null);
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
      // Sign-up may succeed without an immediate session (email confirm).
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
          <p className="font-semibold text-slate-900 text-sm">Account</p>
          <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
            Sign in to enable cloud backup and the cloud AI tutor. Study and quizzes work offline without an account.
          </p>
        </div>

        {signedIn ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700">
              Signed in as{' '}
              <span className="font-medium text-slate-900">{getStoredUserEmail() || email || 'your account'}</span>
            </p>
            <Button type="button" variant="secondary" disabled={busy} onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                className={`font-semibold min-h-touch px-1 ${
                  mode === 'signin' ? 'text-brand-700 underline' : 'text-slate-600'
                }`}
                onClick={() => {
                  setMode('signin');
                  setErr(null);
                  setMsg(null);
                }}
              >
                Sign in
              </button>
              <span className="text-slate-400" aria-hidden>
                ·
              </span>
              <button
                type="button"
                className={`font-semibold min-h-touch px-1 ${
                  mode === 'signup' ? 'text-brand-700 underline' : 'text-slate-600'
                }`}
                onClick={() => {
                  setMode('signup');
                  setErr(null);
                  setMsg(null);
                }}
              >
                Create account
              </button>
            </div>
            <label className="block">
              <span className="text-xs font-medium text-slate-700">Email</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-btn border border-slate-300 px-3 py-2 text-sm text-slate-900 min-h-touch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-slate-700">Password</span>
              <input
                type="password"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-btn border border-slate-300 px-3 py-2 text-sm text-slate-900 min-h-touch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
                placeholder="At least 6 characters"
              />
            </label>
            <Button type="submit" disabled={busy}>
              {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
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
