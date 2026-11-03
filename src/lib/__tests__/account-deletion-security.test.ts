import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hasRecentAuthentication } from "../../../../supabase/functions/_shared/recent-auth.ts";

function tokenFor(claims: Record<string, unknown>): string {
  const payload = btoa(JSON.stringify(claims))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return `header.${payload}.signature`;
}

describe("account deletion recent-authentication guard", () => {
  const now = 1_800_000_000;

  it("accepts a matching user with a recent auth_time", () => {
    assert.equal(
      hasRecentAuthentication(tokenFor({ sub: "user-1", auth_time: now - 120 }), "user-1", now),
      true,
    );
  });

  it("rejects a missing or malformed auth_time", () => {
    assert.equal(hasRecentAuthentication(tokenFor({ sub: "user-1" }), "user-1", now), false);
    assert.equal(hasRecentAuthentication(tokenFor({ sub: "user-1", auth_time: "recent" }), "user-1", now), false);
    assert.equal(hasRecentAuthentication("not-a-jwt", "user-1", now), false);
  });

  it("rejects stale authentication and a different subject", () => {
    assert.equal(
      hasRecentAuthentication(tokenFor({ sub: "user-1", auth_time: now - 301 }), "user-1", now),
      false,
    );
    assert.equal(
      hasRecentAuthentication(tokenFor({ sub: "user-2", auth_time: now - 10 }), "user-1", now),
      false,
    );
  });

  it("allows small clock skew but rejects future-dated claims", () => {
    assert.equal(
      hasRecentAuthentication(tokenFor({ sub: "user-1", auth_time: now + 30 }), "user-1", now),
      true,
    );
    assert.equal(
      hasRecentAuthentication(tokenFor({ sub: "user-1", auth_time: now + 61 }), "user-1", now),
      false,
    );
  });
});
