/** Small Settings screen helpers. */

export function cloudSyncErrorMessage(error: string | undefined, action: 'upload' | 'download'): string {
  switch (error) {
    case 'auth-required':
      return action === 'upload'
        ? 'Sign in required before cloud backup.'
        : 'Sign in required before cloud restore.';
    case 'token-expired':
      return 'Your session expired. Sign in again, then retry cloud backup.';
    case 'device-id-unavailable':
      return action === 'upload'
        ? 'This browser cannot create a stable device ID, so cloud backup is unavailable.'
        : 'This browser cannot create a stable device ID, so cloud restore is unavailable.';
    case 'invalid-cloud-data':
      return 'Cloud backup is invalid or incompatible. Local data was not changed.';
    case 'invalid-token':
      return 'Sign-in token is invalid. Sign out, sign in again, then retry.';
    case 'cloud-conflict':
      return 'The account backup changed on another device. Review the latest backup and retry.';
    default:
      return action === 'upload'
        ? `Upload failed: ${error ?? 'unknown'}`
        : `Download failed: ${error ?? 'unknown'}`;
  }
}

export function isStandalone(): boolean {

  return window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;
}

export function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
}

