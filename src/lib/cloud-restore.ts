import type { AppData } from '../types';

export const CLOUD_RESTORE_RECOVERY_SUFFIX = '-pre-restore';

export interface CloudRestorePlan {
  recoveryKey: string;
  recoveryValue: string | null;
  appDataKey: string;
  appDataValue: string;
}

export function planCloudRestoreWrite(
  appDataKey: string,
  existingRaw: string | null,
  cloudData: AppData,
): CloudRestorePlan {
  const recoveryKey = `${appDataKey}${CLOUD_RESTORE_RECOVERY_SUFFIX}`;
  return {
    recoveryKey,
    recoveryValue: existingRaw,
    appDataKey,
    appDataValue: JSON.stringify(cloudData),
  };
}
