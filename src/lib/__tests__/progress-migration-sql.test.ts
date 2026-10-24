import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('progress sync hardening migration SQL', () => {
  const sql = readFileSync(
    resolve(process.cwd(), 'supabase/migrations/20261021_progress_sync_rls_harden.sql'),
    'utf8',
  );
  const normalized = sql.replace(/--[^\n]*/g, '').replace(/\s+/g, ' ').toLowerCase();

  function policy(name: string): string {
    const match = sql.match(new RegExp('create policy "' + name + '"[\\s\\S]*?;', 'i'));
    assert.ok(match, `expected policy "${name}" to be created`);
    return match[0].replace(/\s+/g, ' ').toLowerCase();
  }

  it('drops legacy device-id SECURITY DEFINER RPCs', () => {
    assert.match(normalized, /drop function if exists public\.upsert_app_progress\(text, jsonb\)/);
    assert.match(normalized, /drop function if exists public\.get_app_progress\(text\)/);
  });

  it('removes unowned rows and dedupes owned pairs before adding the key', () => {
    const unownedCleanup = normalized.indexOf('delete from public.app_progress where user_id is null');
    const dedupe = normalized.indexOf('select distinct on (user_id, device_id)');
    const primaryKey = normalized.indexOf('add constraint app_progress_user_device_pkey primary key (user_id, device_id)');
    assert.notEqual(unownedCleanup, -1, 'unowned legacy rows must be removed');
    assert.notEqual(dedupe, -1, 'duplicate owned device rows must be resolved');
    assert.notEqual(primaryKey, -1, 'composite user/device key must be added');
    assert.ok(unownedCleanup < primaryKey, 'unowned rows must be removed before the key is added');
    assert.ok(dedupe < primaryKey, 'duplicate rows must be resolved before the key is added');
  });

  it('enables RLS and scopes all four policies to the authenticated owner', () => {
    assert.match(normalized, /alter table public\.app_progress enable row level security/);

    const select = policy('progress_select_own');
    assert.match(select, /for select to authenticated/);
    assert.match(select, /using \(user_id is not null and user_id = auth\.uid\(\)\)/);

    const insert = policy('progress_insert_own');
    assert.match(insert, /for insert to authenticated/);
    assert.match(insert, /with check \(user_id is not null and user_id = auth\.uid\(\)\)/);

    const update = policy('progress_update_own');
    assert.match(update, /for update to authenticated/);
    assert.match(update, /using \(user_id is not null and user_id = auth\.uid\(\)\)/);
    assert.match(update, /with check \(user_id is not null and user_id = auth\.uid\(\)\)/);

    const remove = policy('progress_delete_own');
    assert.match(remove, /for delete to authenticated/);
    assert.match(remove, /using \(user_id is not null and user_id = auth\.uid\(\)\)/);
  });

  it('does not create anon policies and revokes anon table privileges', () => {
    assert.doesNotMatch(normalized, /create policy "[^"]+" on public\.app_progress for \w+ to anon/);
    assert.match(normalized, /revoke all on table public\.app_progress from anon/);
    assert.match(normalized, /grant select, insert, update, delete on table public\.app_progress to authenticated/);
  });

  it('uses rerunnable guards for schema, index, and policy cleanup', () => {
    assert.match(normalized, /add column if not exists user_id uuid/);
    assert.match(normalized, /create index if not exists app_progress_user_id_idx/);
    assert.match(normalized, /drop policy if exists "progress_select_own"/);
    assert.match(normalized, /if not exists \( select 1 from pg_constraint where conname = 'app_progress_user_device_pkey' \)/);
  });
});
