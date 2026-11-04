import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { AppData } from '../../types.ts';
import {
  ACCOUNT_PROGRESS_DEVICE_ID,
  pullAccountProgressSnapshot,
  pushAccountProgressSnapshot,
} from '../progress-sync-http.ts';

function data(topic: string): AppData {
  return { studiedTopics: [topic], topicProgress: {}, questionResults: {}, quizHistory: [], lastOpenedTopic: '' } as AppData;
}

function revisionServer(initial: { payload: AppData; updated_at: string; revision?: number } | null = null) {
  let row = initial ? { user_id: 'user-1', device_id: ACCOUNT_PROGRESS_DEVICE_ID, ...initial } : null;
  const requests: Array<{ method: string; url: URL; body: Record<string, unknown> | null }> = [];
  const fetcher: typeof fetch = async (input, init) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    const method = init?.method ?? 'GET';
    const body = init?.body ? JSON.parse(String(init.body)) as Record<string, unknown> : null;
    requests.push({ method, url, body });
    if (method === 'POST') {
      if (row) return Response.json([], { status: 201 });
      row = { user_id: 'user-1', device_id: ACCOUNT_PROGRESS_DEVICE_ID, ...(body ?? {}), revision: 1 } as typeof row;
      return Response.json([{ revision: row.revision }], { status: 201 });
    }
    if (method === 'GET') {
      return Response.json(row ? [{ payload: row.payload, updated_at: row.updated_at, ...(row.revision === undefined ? {} : { revision: row.revision }) }] : []);
    }
    if (method === 'PATCH') {
      if (!row) return Response.json([], { status: 200 });
      const revisionFilter = url.searchParams.get('revision');
      const timestampFilter = url.searchParams.get('updated_at');
      const matches = revisionFilter
        ? row.revision === Number(revisionFilter.replace(/^eq\./, ''))
        : timestampFilter === `eq.${row.updated_at}`;
      if (!matches) return Response.json([], { status: 200 });
      row = { ...row, ...(body ?? {}), revision: (row.revision ?? 1) + 1 };
      return Response.json([{ revision: row.revision }], { status: 200 });
    }
    return new Response('Unsupported method', { status: 405 });
  };
  return { fetcher, requests, get row() { return row; } };
}

describe('revision-based account progress sync', () => {
  const config = {
    supabaseUrl: 'https://example.supabase.test',
    anonKey: 'public-anon-key',
    accessToken: 'user-token',
    userId: 'user-1',
    deviceId: 'device-a',
    now: () => Date.parse('2026-11-04T12:00:00.000Z'),
  };

  it('returns the server revision and uses it as the compare-and-swap token', async () => {
    const server = revisionServer();
    assert.deepEqual(await pushAccountProgressSnapshot({ ...config, fetcher: server.fetcher }, data('first'), null), { ok: true });
    const pulled = await pullAccountProgressSnapshot({ ...config, fetcher: server.fetcher });
    assert.equal(pulled.ok, true);
    if (!pulled.ok) return;
    assert.equal(pulled.revision, 1);
    assert.deepEqual(
      await pushAccountProgressSnapshot({ ...config, fetcher: server.fetcher }, data('second'), pulled.updatedAt, pulled.revision),
      { ok: true },
    );
    const patch = server.requests.find((request) => request.method === 'PATCH');
    assert.equal(patch?.url.searchParams.get('revision'), 'eq.1');
    assert.equal(patch?.body?.revision, undefined);
    assert.equal(server.row?.revision, 2);
  });

  it('rejects a stale revision even when the caller has an old timestamp', async () => {
    const server = revisionServer({ payload: data('cloud'), updated_at: '2026-11-04T11:00:00.000Z', revision: 7 });
    const result = await pushAccountProgressSnapshot(
      { ...config, fetcher: server.fetcher },
      data('stale'),
      '2026-11-04T11:00:00.000Z',
      6,
    );
    assert.deepEqual(result, { ok: false, error: 'cloud-conflict' });
    assert.deepEqual(server.row?.payload.studiedTopics, ['cloud']);
  });

  it('falls back to timestamp compare-and-swap when an older server omits revision', async () => {
    const server = revisionServer({ payload: data('legacy-server'), updated_at: '2026-11-04T11:00:00.000Z' });
    const pulled = await pullAccountProgressSnapshot({ ...config, fetcher: server.fetcher });
    assert.equal(pulled.ok, true);
    if (!pulled.ok) return;
    assert.equal(pulled.revision, null);
    const result = await pushAccountProgressSnapshot(
      { ...config, fetcher: server.fetcher },
      data('compatible-client'),
      pulled.updatedAt,
      pulled.revision,
    );
    assert.deepEqual(result, { ok: true });
    const patch = server.requests.find((request) => request.method === 'PATCH');
    assert.equal(patch?.url.searchParams.get('updated_at'), 'eq.2026-11-04T11:00:00.000Z');
    assert.equal(patch?.url.searchParams.has('revision'), false);
  });
  it('retries a legacy projection when the server schema has no revision column yet', async () => {
    const server = revisionServer({ payload: data('pre-migration'), updated_at: '2026-11-04T10:00:00.000Z' });
    const requests: string[] = [];
    const fetcher: typeof fetch = async (input, init) => {
      const url = new URL(input instanceof Request ? input.url : String(input));
      requests.push(url.searchParams.get('select') ?? '');
      if (url.searchParams.get('select') === 'payload,updated_at,revision') {
        return new Response('{"code":"42703","message":"column app_progress.revision does not exist"}', { status: 400 });
      }
      return server.fetcher(input, init);
    };
    const pulled = await pullAccountProgressSnapshot({ ...config, fetcher });
    assert.equal(pulled.ok, true);
    if (!pulled.ok) return;
    assert.equal(pulled.revision, null);
    assert.deepEqual(requests, ['payload,updated_at,revision', 'payload,updated_at']);
  });

});
