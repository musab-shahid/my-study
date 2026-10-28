import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatAiRateLimitMessage } from '../ai-rate-limit-message.ts';

describe('formatAiRateLimitMessage', () => {
  it('includes retry seconds when provided', () => {
    const msg = formatAiRateLimitMessage('Rate limit exceeded. Try again shortly.', 60);
    assert.match(msg, /60s/);
    assert.match(msg, /Rate limit exceeded/);
  });

  it('falls back to a minute when no retry hint', () => {
    const msg = formatAiRateLimitMessage(undefined, undefined);
    assert.match(msg, /minute/i);
  });
});
