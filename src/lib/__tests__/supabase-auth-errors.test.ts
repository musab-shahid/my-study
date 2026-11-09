import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { mapAuthError } from '../auth-errors.ts';

const DUPLICATE = 'An account with this email already exists. Sign in instead.';

describe('mapAuthError', () => {
  it('reports a duplicate account only for Supabase duplicate codes', () => {
    assert.equal(
      mapAuthError(422, { error_code: 'user_already_exists', msg: 'User already registered' }),
      DUPLICATE,
    );
    assert.equal(mapAuthError(422, { error_code: 'email_exists', msg: 'Email exists' }), DUPLICATE);
    assert.equal(mapAuthError(400, { msg: 'User already registered' }), DUPLICATE);
  });

  it('does not report a duplicate for other 422 validation failures', () => {
    assert.equal(
      mapAuthError(422, { error_code: 'weak_password', msg: 'Password should be at least 8 characters.' }),
      'Password should be at least 8 characters.',
    );
    assert.equal(
      mapAuthError(422, { error_code: 'email_address_invalid', msg: 'Email address is invalid' }),
      'Enter a valid email address.',
    );
    assert.notEqual(mapAuthError(422, { msg: 'Signups are not allowed for this instance' }), DUPLICATE);
  });

  it('reports unconfirmed email as a confirmation step, not a wrong password', () => {
    assert.equal(
      mapAuthError(400, { error_code: 'email_not_confirmed', msg: 'Email not confirmed' }),
      'Check your email to confirm the account, then sign in.',
    );
  });

  it('reports wrong credentials as incorrect email or password', () => {
    assert.equal(
      mapAuthError(400, { error_code: 'invalid_credentials', msg: 'Invalid login credentials' }),
      'Incorrect email or password.',
    );
  });

  it('reports rate limiting regardless of body shape', () => {
    assert.equal(
      mapAuthError(429, { error_code: 'over_request_rate_limit', msg: 'Too many requests' }),
      'Too many attempts. Wait a moment and try again.',
    );
    assert.equal(
      mapAuthError(429, {}),
      'Too many attempts. Wait a moment and try again.',
    );
  });

  it('surfaces a generic message for unexpected server errors without leaking details', () => {
    assert.equal(mapAuthError(500, { msg: 'Database error saving new user' }), 'Sign-in failed. Please try again.');
    assert.equal(mapAuthError(503, null), 'Sign-in failed. Please try again.');
  });
});
