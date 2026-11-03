import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { AppData } from '../../types.ts';
import {
  ACCOUNT_PROGRESS_DEVICE_ID,
  pullAccountProgressSnapshot,
  pushAccountProgressSnapshot,
} from '../progress-sync-http.ts';

type SnapshotRow = { user_id: string; device_id: string; payload: AppData; updated_at: string };

function makeData(topic: string): AppData {
  return { studiedTopics: [topic], topicProgress: {}, questionResults: {}, quizHistory: [], lastOpenedTopic: '' } as AppData;
}

function makeServer() {
  let accountRow: SnapshotRow | null = null;
  const legacyRows = new Map<string, Array<{ payload: AppData; updated_at: string }>>();
  const requests: Array<{ method: string; authorization: string | null }> = [];
  const fetcher: typeof fetch = async (input, init) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    const method = init?.method ?? 'GET';
    requests.push({ method, authorization: new Headers(init?.headers).get('Authorization') });
    if (method === 'POST') {
      const row = JSON.parse(String(init?.body)) as SnapshotRow;
      if (accountRow) return Response.json([], { status: 201 });
      accountRow = row;
      return Response.json([accountRow], { status: 201 });
    }
    if (method === 'PATCH') {
      const expected = (url.searchParams.get('updated_at') ?? '').replace(/^eq\./, '');
      if (!accountRow || accountRow.updated_at !== expected) return Response.json([], { status: 200 });
      accountRow = { ...accountRow, ...(JSON.parse(String(init?.body)) as Partial<SnapshotRow>) };
      return Response.json([accountRow], { status: 200 });
    }
    if (method === 'GET') {
      const deviceId = (url.searchParams.get('device_id') ?? '').replace(/^eq\./, '');
      if (deviceId === ACCOUNT_PROGRESS_DEVICE_ID) {
        return Response.json(accountRow ? [{ payload: accountRow.payload, updated_at: accountRow.updated_at }] : []);
      }
      return Response.json(legacyRows.get(deviceId) ?? []);
    }
    return new Response('Unsupported method', { status: 405 });
  };
  return { fetcher, requests, legacyRows };
}

describe('account-wide progress sync two-device contract', () => {
  it('shares one snapshot, rejects stale writers, and preserves legacy rows', async () => {
    const server = makeServer();
    const common = {
      supabaseUrl: 'https://example.supabase.test',
      anonKey: 'public-anon-key',
      fetcher: server.fetcher,
      now: () => 1_800_000_000_000,
    };
    const deviceA = { ...common, accessToken: 'device-a-token', userId: 'user-1', deviceId: 'device-a' };
    const deviceB = { ...common, accessToken: 'device-b-token', userId: 'user-1', deviceId: 'device-b' };
    server.legacyRows.set('device-a', [{ payload: makeData('legacy-a'), updated_at: '2026-10-01T00:00:00.000Z' }]);
    server.legacyRows.set('device-b', [{ payload: makeData('legacy-b'), updated_at: '2026-10-02T00:00:00.000Z' }]);

    assert.deepEqual(await pushAccountProgressSnapshot(deviceA, makeData('device-a-first'), null), { ok: true });
    const viewA = await pullAccountProgressSnapshot(deviceA);
    const viewB = await pullAccountProgressSnapshot(deviceB);
    assert.equal(viewA.ok, true);
    assert.equal(viewB.ok, true);
    if (!viewA.ok || !viewB.ok) return;
    assert.equal(viewB.source, 'account');
    assert.deepEqual(viewB.data.studiedTopics, ['device-a-first']);

    assert.deepEqual(await pushAccountProgressSnapshot(deviceB, makeData('device-b-first'), null), { ok: false, error: 'cloud-conflict' });
    assert.deepEqual(await pushAccountProgressSnapshot(deviceB, makeData('device-b-confirmed'), viewB.updatedAt), { ok: true });
    assert.deepEqual(await pushAccountProgressSnapshot(deviceA, makeData('stale-device-a'), viewA.updatedAt), { ok: false, error: 'cloud-conflict' });

    const latestA = await pullAccountProgressSnapshot(deviceA);
    assert.equal(latestA.ok, true);
    if (!latestA.ok) return;
    assert.deepEqual(latestA.data.studiedTopics, ['device-b-confirmed']);
    assert.ok(Date.parse(latestA.updatedAt ?? '') > Date.parse(viewA.updatedAt ?? ''));
    assert.equal(server.legacyRows.size, 2);
    assert.ok(server.requests.some((request) => request.authorization === 'Bearer device-a-token'));
    assert.ok(server.requests.some((request) => request.authorization === 'Bearer device-b-token'));
  });

  it('uses a legacy device snapshot only when no account snapshot exists', async () => {
    const server = makeServer();
    server.legacyRows.set('device-a', [{ payload: makeData('legacy-only'), updated_at: '2026-10-01T00:00:00.000Z' }]);
    const result = await pullAccountProgressSnapshot({
      supabaseUrl: 'https://example.supabase.test', anonKey: 'public-anon-key',
      accessToken: 'device-a-token', userId: 'user-1', deviceId: 'device-a', fetcher: server.fetcher,
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.source, 'legacy-device');
    assert.deepEqual(result.data.studiedTopics, ['legacy-only']);
  });
});
