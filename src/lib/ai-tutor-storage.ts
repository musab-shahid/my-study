export const TUTOR_CHAT_STORAGE_KEY_PREFIX = "ai-tutor-chat:";
export const TUTOR_MEMORY_STORAGE_KEY_PREFIX = "ai-tutor-memory:";
export const TUTOR_DATA_CLEARED_EVENT = "my-study:tutor-data-cleared";

export interface ClearedTutorData {
  ok: boolean;
  chatThreads: number;
  memoryTopics: number;
}

/** Remove locally stored tutor transcripts and struggle notes across all topics. */
export function clearTutorData(): ClearedTutorData {
  let chatThreads = 0;
  let memoryTopics = 0;
  try {
    const keys: string[] = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (
        key?.startsWith(TUTOR_CHAT_STORAGE_KEY_PREFIX) ||
        key?.startsWith(TUTOR_MEMORY_STORAGE_KEY_PREFIX)
      ) {
        keys.push(key);
      }
    }

    for (const key of keys) {
      localStorage.removeItem(key);
      if (key.startsWith(TUTOR_CHAT_STORAGE_KEY_PREFIX)) chatThreads += 1;
      if (key.startsWith(TUTOR_MEMORY_STORAGE_KEY_PREFIX)) memoryTopics += 1;
    }

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(TUTOR_DATA_CLEARED_EVENT));
    }
    return { ok: true, chatThreads, memoryTopics };
  } catch {
    return { ok: false, chatThreads, memoryTopics };
  }
}

export interface TutorMemoryRecord {
  topicKey: string;
  notes: string[];
}

/** Read the locally saved tutor-memory notes so learners can inspect them. */
export function getTutorMemoryRecords(): TutorMemoryRecord[] {
  try {
    const records: TutorMemoryRecord[] = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.startsWith(TUTOR_MEMORY_STORAGE_KEY_PREFIX)) continue;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) continue;
      const notes = parsed
        .filter((item) => item && typeof item.note === "string" && typeof item.at === "number")
        .slice(-4)
        .map((item) => (item as { note: string }).note);
      if (notes.length > 0) {
        records.push({ topicKey: key.slice(TUTOR_MEMORY_STORAGE_KEY_PREFIX.length), notes });
      }
    }
    return records.sort((a, b) => a.topicKey.localeCompare(b.topicKey));
  } catch {
    return [];
  }
}
