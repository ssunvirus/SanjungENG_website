import assert from "node:assert/strict";
import test from "node:test";
import { isEstimateOriginAllowed } from "../src/lib/estimate-origin.ts";

const production = {
  siteUrl: "https://www.sanjungeng.co.kr",
  production: true,
  requireOrigin: true,
};
const request = (origin, extra = {}) =>
  new Request("http://localhost:3000/api/estimate", {
    method: "POST",
    headers: { ...(origin ? { origin } : {}), ...extra },
  });

test("public origin is accepted behind internal SSR host and protocol rewriting", () => {
  assert.equal(isEstimateOriginAllowed(request(production.siteUrl), production), true);
  assert.equal(
    isEstimateOriginAllowed(
      request(production.siteUrl, { host: "internal.compute:3000" }),
      production,
    ),
    true,
  );
});

test("foreign, malformed, missing and forged forwarded origins do not bypass production checks", () => {
  for (const origin of [
    "https://attacker.test",
    "https://www.sanjungeng.co.kr.attacker.test",
    "http://www.sanjungeng.co.kr",
    "https://www.sanjungeng.co.kr/path",
    "null",
    "",
  ]) {
    assert.equal(
      isEstimateOriginAllowed(
        request(origin, { host: "attacker.test", "x-forwarded-host": "www.sanjungeng.co.kr" }),
        production,
      ),
      false,
    );
  }
  assert.equal(isEstimateOriginAllowed(request(production.siteUrl), { production: true }), false);
  assert.equal(
    isEstimateOriginAllowed(request(production.siteUrl), { ...production, siteUrl: "bad-url" }),
    false,
  );
});

test("local development and legacy server submissions retain their existing behavior", () => {
  assert.equal(isEstimateOriginAllowed(request("http://localhost:3000")), true);
  assert.equal(isEstimateOriginAllowed(request("https://foreign.test")), false);
  assert.equal(isEstimateOriginAllowed(request(""), { ...production, requireOrigin: false }), true);
});
