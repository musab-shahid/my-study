export interface PersistentStorageApi {
  persist?: () => Promise<boolean>;
  persisted?: () => Promise<boolean>;
  estimate?: () => Promise<{ usage?: number; quota?: number }>;
}

export type PersistentStorageResult = {
  status: "already-persisted" | "granted" | "denied" | "unsupported" | "error";
  usage?: number;
  quota?: number;
};

/**
 * Request browser protection against automatic storage eviction.
 * This does not protect against manual site-data clearing, device loss, or hardware failure.
 */
export async function requestPersistentStorage(
  storage: PersistentStorageApi | null | undefined,
): Promise<PersistentStorageResult> {
  if (!storage || typeof storage.persist !== "function") {
    return { status: "unsupported" };
  }

  try {
    const alreadyPersisted = storage.persisted ? await storage.persisted() : false;
    const granted = alreadyPersisted || await storage.persist();
    let estimate: { usage?: number; quota?: number } | undefined;
    try {
      estimate = await storage.estimate?.();
    } catch {
      // Storage estimates are optional diagnostics; persistence status remains valid.
    }

    return {
      status: alreadyPersisted ? "already-persisted" : granted ? "granted" : "denied",
      ...(typeof estimate?.usage === "number" ? { usage: estimate.usage } : {}),
      ...(typeof estimate?.quota === "number" ? { quota: estimate.quota } : {}),
    };
  } catch {
    return { status: "error" };
  }
}
