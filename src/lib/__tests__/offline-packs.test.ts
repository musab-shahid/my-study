import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  collectOfflineAssetUrls,
  getTrackOfflinePackStatus,
  removeTrackOfflinePack,
  type OfflinePackCacheStorage,
} from '../offline-packs';

function memoryStorage(seed: Record<string, string[]> = {}) {
  const stores = new Map(Object.entries(seed).map(([name, urls]) => [name, [...urls]]));
  const storage: OfflinePackCacheStorage = {
    keys: async () => [...stores.keys()],
    open: async (name) => ({
      keys: async () => (stores.get(name) ?? []).map((url) => ({ url })),
    }),
    delete: async (name) => stores.delete(name),
  };
  return { storage, stores };
}

describe('track offline pack helpers', () => {
  it('collects unique same-origin build assets and excludes APIs and external resources', () => {
    const urls = collectOfflineAssetUrls([
      { name: 'https://app.test/assets/app-123.js' },
      { name: 'https://app.test/assets/subject-456.css' },
      { name: 'https://app.test/assets/app-123.js' },
      { name: 'https://app.test/api/progress' },
      { name: 'https://cdn.test/assets/video.js' },
      { name: 'not a valid URL %%%' },
    ], 'https://app.test');

    assert.deepEqual(urls, [
      'https://app.test/assets/app-123.js',
      'https://app.test/assets/subject-456.css',
    ]);
  });

  it('reports the newest complete pack and its cached resource count', async () => {
    const { storage } = memoryStorage({
      'my-study-offline-pack-examprep-a1b2c3d4-fpsc-100': ['https://app.test/assets/old.js'],
      'my-study-offline-pack-examprep-a1b2c3d4-fpsc-200': [
        'https://app.test/assets/topics.js',
        'https://app.test/assets/questions.js',
      ],
      'my-study-offline-pack-examprep-a1b2c3d4-hat-150': ['https://app.test/assets/hat.js'],
    });

    assert.deepEqual(await getTrackOfflinePackStatus('fpsc', storage), {
      installed: true,
      resourceCount: 2,
    });
    assert.deepEqual(await getTrackOfflinePackStatus('cgei', storage), {
      installed: false,
      resourceCount: 0,
    });
  });

  it('removes only the selected track packs and preserves other tracks', async () => {
    const { storage, stores } = memoryStorage({
      'my-study-offline-pack-examprep-a1b2c3d4-fpsc-100': ['https://app.test/assets/fpsc-old.js'],
      'my-study-offline-pack-examprep-a1b2c3d4-fpsc-200': ['https://app.test/assets/fpsc-current.js'],
      'my-study-offline-pack-examprep-a1b2c3d4-hat-150': ['https://app.test/assets/hat.js'],
      'examprep-v3': ['https://app.test/index.html'],
    });

    await removeTrackOfflinePack('fpsc', storage);

    assert.deepEqual([...stores.keys()].sort(), [
      'examprep-v3',
      'my-study-offline-pack-examprep-a1b2c3d4-hat-150',
    ]);
  });
});
