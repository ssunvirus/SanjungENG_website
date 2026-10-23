import assert from "node:assert/strict";
import test from "node:test";
import { isAdminClaims, openAdminCookie, sealAdminCookie } from "../src/lib/admin-session.ts";

const secret = "test-only-secret-with-at-least-32-characters";

test("admin session encrypts claims and verifies the correct purpose and key", async () => {
  const cookie = await sealAdminCookie({ sub: "admin-id", role: "Admins" }, secret, "session", 60);
  assert.ok(!cookie.includes("admin-id"));
  const payload = await openAdminCookie(cookie, secret, "session");
  assert.equal(payload.sub, "admin-id");
  assert.equal(payload.role, "Admins");
  await assert.rejects(openAdminCookie(cookie, "a-different-secret", "session"));
  await assert.rejects(openAdminCookie(cookie, secret, "flow"));
});

test("tampered and expired cookies are rejected", async () => {
  const cookie = await sealAdminCookie({ sub: "admin-id" }, secret, "session", 60);
  const parts = cookie.split(".");
  parts[3] = (parts[3][0] === "A" ? "B" : "A") + parts[3].slice(1);
  await assert.rejects(openAdminCookie(parts.join("."), secret, "session"));
  const expired = await sealAdminCookie({ sub: "admin-id" }, secret, "session", -5);
  await assert.rejects(openAdminCookie(expired, secret, "session"));
});

test("login flow cookie cannot be used as an admin session", async () => {
  const flow = await sealAdminCookie(
    { state: "state", nonce: "nonce", verifier: "verifier" },
    secret,
    "flow",
    60,
  );
  await assert.rejects(openAdminCookie(flow, secret, "session"));
  const payload = await openAdminCookie(flow, secret, "flow");
  assert.equal(payload.state, "state");
});

test("only the exact Admins group and a subject are accepted", () => {
  assert.equal(isAdminClaims({ sub: "id", "cognito:groups": ["Admins"] }), true);
  for (const claims of [
    undefined,
    {},
    { sub: "id" },
    { sub: "id", "cognito:groups": ["Users"] },
    { sub: "id", "cognito:groups": ["admins"] },
    { sub: "id", "cognito:groups": "Admins" },
    { "cognito:groups": ["Admins"] },
  ]) {
    assert.equal(isAdminClaims(claims), false);
  }
});
