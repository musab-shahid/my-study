import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('progress sync hardening migration SQL', () => {
  const sql = readFileSync(
    resolve(process.cwd(), 'supabase/migrations/20261021_progress_sync_rls_harden.sql'),
    'utf8',
  );

  it('drops legacy device-id SECURITY DEFINER RPCs', () => {
    assert.match(sql, /drop function if exists public\.upsert_app_progress/i);
    assert.match(sql, /drop function if exists public\.get_app_progress/i);
  });

  it('removes unowned rows and dedupes owned pairs before primary key', () => {
    assert.match(sql, /delete from public\.app_progress where user_id is null/i);
    assert.match(sql, /distinct on \(user_id, device_id\)/i);
  });

  it('requires primary key on \(user_id, device_id\)', () => {
    assert.match(sql, /primary key \(user_id, device_id\)/i);
  });

  it('revokes anon table access', () => {
    assert.match(sql, /revoke all on table public\.app_progress from anon/i);
  });
});
