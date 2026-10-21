import type { AppData } from '../types.ts';

/** Local recovery snapshot key written before applying a cloud restore. */
export const CLOUD_RESTORE_RECOVERY_SUFFIX = ':pre-restore';

/**
 * Pure plan for cloud → local restore ordering.
 * Callers must: write recovery (if any) → write app data → only then reload.
 * Never reload before both writes succeed.
 */
export function planCloudRestoreWrite(
  appDataStorageKey: string,
  existingAppDataJson: string | null,
  cloudData: AppData,
): {
  recoveryKey: string;
  recoveryValue: string | null;
  appDataKey: string;
  appDataValue: string;
} {
  return {
    recoveryKey: `${appDataStorageKey}${CLOUD_RESTORE_RECOVERY_SUFFIX}`,
    recoveryValue: existingAppDataJson,
    appDataKey: appDataStorageKey,
    appDataValue: JSON.stringify(cloudData),
  };
}
