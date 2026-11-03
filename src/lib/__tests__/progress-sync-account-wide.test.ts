import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('account-wide progress sync contract', () => {
  const sync = readFileSync(resolve(process.cwd(), 'src/lib/progress-sync.ts'), 'utf8');
  const http = readFileSync(resolve(process.cwd(), 'src/lib/progress-sync-http.ts'), 'utf8');
  const settings = readFileSync(resolve(process.cwd(), 'src/screens/SettingsScreen.tsx'), 'utf8');

  it('uses one stable account row while retaining legacy per-device restore', () => {
    assert.match(sync, /ACCOUNT_PROGRESS_DEVICE_ID\s*=\s*'__my_study_account__'/);
    assert.match(sync, /source: 'account'/);
    assert.match(sync, /source: 'legacy-device'/);
    assert.match(sync, /Backward compatibility:[\s\S]*?older per-device snapshot/);
  });

  it('inserts a missing account snapshot without overwriting a concurrent insert', () => {
    assert.match(http, /resolution=ignore-duplicates,return=representation/);
    assert.match(http, /error: 'cloud-conflict'/);
  });

  it('updates an existing snapshot only when its reviewed timestamp still matches', () => {
    assert.match(sync, /updated_at=eq\.\$\{expected\}/);
    assert.match(sync, /method: 'PATCH'/);
    assert.match(sync, /return=representation/);
  });

  it('requires explicit confirmation before replacing an existing account snapshot', () => {
    assert.match(settings, /Confirm account backup replacement/);
    assert.match(settings, /Replace account backup/);
    assert.match(settings, /pushProgress\(data, pendingCloudUploadAt\)/);
  });
});
