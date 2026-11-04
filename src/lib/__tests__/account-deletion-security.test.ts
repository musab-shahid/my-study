import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { hasRecentAuthentication } from "../../../supabase/functions/_shared/recent-auth.ts";
import { mapDeleteAccountError } from "../delete-account-errors.ts";

function tokenFor(claims: Record<string, unknown>): string {
  const payload = btoa(JSON.stringify(claims))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return `header.${payload}.signature`;
}

describe("account deletion recent-authentication guard", () => {
  const now = 1_800_000_000;

  it("accepts a matching user with a recent password AMR entry", () => {
    assert.equal(
      hasRecentAuthentication(tokenFor({
        sub: "user-1",
        amr: [{ method: "password", timestamp: now - 120 }],
      }), "user-1", now),
      true,
    );
  });

  it("uses the newest matching password AMR timestamp", () => {
    assert.equal(
      hasRecentAuthentication(tokenFor({
        sub: "user-1",
        amr: [
          { method: "password", timestamp: now - 900 },
          { method: "oauth", timestamp: now - 5 },
          { method: "password", timestamp: now - 30 },
        ],
      }), "user-1", now),
      true,
    );
    assert.equal(
      hasRecentAuthentication(tokenFor({
        sub: "user-1",
        amr: [
          { method: "password", timestamp: now - 30 },
          { method: "password", timestamp: now - 900 },
        ],
      }), "user-1", now),
      true,
    );
  });

  it("rejects auth_time-only tokens and non-password authentication", () => {
    assert.equal(
      hasRecentAuthentication(tokenFor({ sub: "user-1", auth_time: now - 10 }), "user-1", now),
      false,
    );
    assert.equal(
      hasRecentAuthentication(tokenFor({
        sub: "user-1",
        amr: [{ method: "oauth", timestamp: now - 10 }],
      }), "user-1", now),
      false,
    );
  });

  it("rejects missing, malformed, or non-array AMR claims", () => {
    assert.equal(hasRecentAuthentication(tokenFor({ sub: "user-1" }), "user-1", now), false);
    assert.equal(hasRecentAuthentication(tokenFor({ sub: "user-1", amr: "password" }), "user-1", now), false);
    assert.equal(hasRecentAuthentication(tokenFor({ sub: "user-1", amr: [{ method: "password", timestamp: "recent" }] }), "user-1", now), false);
    assert.equal(hasRecentAuthentication("not-a-jwt", "user-1", now), false);
  });

  it("rejects stale authentication and a different subject", () => {
    assert.equal(
      hasRecentAuthentication(tokenFor({
        sub: "user-1",
        amr: [{ method: "password", timestamp: now - 301 }],
      }), "user-1", now),
      false,
    );
    assert.equal(
      hasRecentAuthentication(tokenFor({
        sub: "user-2",
        amr: [{ method: "password", timestamp: now - 10 }],
      }), "user-1", now),
      false,
    );
  });

  it("rejects a future-dated newest password event even if an older one is recent", () => {
    assert.equal(
      hasRecentAuthentication(tokenFor({
        sub: "user-1",
        amr: [
          { method: "password", timestamp: now - 10 },
          { method: "password", timestamp: now + 61 },
        ],
      }), "user-1", now),
      false,
    );
  });

  it("allows at most 60 seconds of clock skew", () => {
    assert.equal(
      hasRecentAuthentication(tokenFor({
        sub: "user-1",
        amr: [{ method: "password", timestamp: now + 60 }],
      }), "user-1", now),
      true,
    );
    assert.equal(
      hasRecentAuthentication(tokenFor({
        sub: "user-1",
        amr: [{ method: "password", timestamp: now + 61 }],
      }), "user-1", now),
      false,
    );
  });
});

describe("delete-account request ordering", () => {
  it("validates recent password authentication before consuming the rate limit", () => {
    const source = readFileSync(
      new URL("../../../supabase/functions/delete-account/index.ts", import.meta.url),
      "utf8",
    );
    const userValidation = source.indexOf("userClient.auth.getUser(token)");
    const recentAuth = source.indexOf("hasRecentAuthentication(token, userId");
    const rateLimit = source.indexOf("consumeDeletionAttempt(userId)");
    const deletion = source.indexOf("admin.auth.admin.deleteUser(userId)");
    assert.ok(userValidation >= 0 && userValidation < recentAuth);
    assert.ok(recentAuth < rateLimit);
    assert.ok(rateLimit < deletion);
  });
});

describe("delete-account error mapping", () => {
  it("maps authentication, recent-password, and rate-limit failures distinctly", () => {
    const messages = [401, 403, 429].map(mapDeleteAccountError);
    assert.equal(new Set(messages).size, 3);
    assert.match(messages[0], /session expired/i);
    assert.match(messages[1], /recent password verification/i);
    assert.match(messages[2], /15 minutes/i);
  });
});
