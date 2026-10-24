/**
 * Strict request validation shared by the AI tutor edge function and tests.
 * The server owns the system prompt; clients may submit only user/assistant
 * turns. Never accept client-supplied system-role messages.
 */
export type ProxyMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export const MAX_PROXY_MESSAGES = 24;
export const MAX_PROXY_CONTENT_CHARS = 6000;

export function sanitizeProxyMessages(raw: unknown): ProxyMessage[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_PROXY_MESSAGES) {
    return null;
  }

  const messages: ProxyMessage[] = [];
  for (const item of raw) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return null;

    const candidate = item as Record<string, unknown>;
    if (candidate.role !== 'user' && candidate.role !== 'assistant') return null;
    if (typeof candidate.content !== 'string') return null;
    if (!candidate.content.trim() || candidate.content.length > MAX_PROXY_CONTENT_CHARS) return null;

    // Normalize to the only fields forwarded to a provider.
    messages.push({ role: candidate.role, content: candidate.content });
  }
  return messages;
}
