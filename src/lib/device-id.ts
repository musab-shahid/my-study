const DEVICE_KEY = 'examprep-device-id';

/**
 * Return a stable persisted identifier for this browser, or null when storage
 * or UUID generation is unavailable. A shared fallback can make browsers
 * overwrite each other's cloud snapshots.
 */
export function getDeviceId(): string | null {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      if (typeof crypto.randomUUID !== 'function') return null;
      id = crypto.randomUUID();
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}
