import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('account progress revision migration', () => {
  const sql = readFileSync(
    resolve(process.cwd(), 'supabase/migrations/20261104130000_app_progress_revision.sql'),
    'utf8',
  );
  const normalized = sql.replace(/--[^\n]*/g, '').replace(/\s+/g, ' ').toLowerCase();

  it('adds and backfills a non-null revision with a stable initial value', () => {
    assert.match(normalized, /add column if not exists revision bigint/);
    assert.match(normalized, /update public\.app_progress set revision = 1 where revision is null/);
    assert.match(normalized, /alter column revision set default 1/);
    assert.match(normalized, /alter column revision set not null/);
  });

  it('installs a rerunnable trigger that increments the old revision and ignores client input', () => {
    assert.match(normalized, /create or replace function public\.bump_app_progress_revision\(\)/);
    assert.match(normalized, /new\.revision := old\.revision \+ 1/);
    assert.match(normalized, /drop trigger if exists app_progress_revision_before_update on public\.app_progress/);
    assert.match(normalized, /create trigger app_progress_revision_before_update before update on public\.app_progress/);
  });

  it('does not change ownership policies or grants', () => {
    assert.doesNotMatch(normalized, /create policy|drop policy|grant |revoke /);
  });
});
