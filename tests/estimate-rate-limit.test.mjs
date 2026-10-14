import assert from "node:assert/strict";
import test from "node:test";
import { takeEstimateSlot } from "../src/lib/estimate-rate-limit.ts";

test("limits repeat inquiries to one phone number for an hour", () => {
  const headers = new Headers({ "x-forwarded-for": "198.51.100.10" });
  const now = 1_000_000;
  for (let i = 0; i < 3; i++) {
    assert.equal(takeEstimateSlot(headers, "010-1111-2222", now), null);
  }
  assert.equal(takeEstimateSlot(headers, "01011112222", now), 3600);
  assert.equal(takeEstimateSlot(headers, "01011112222", now + 3_600_000), null);
});

test("limits repeated inquiries from one client address", () => {
  const headers = new Headers({ "x-forwarded-for": "203.0.113.1, 198.51.100.20" });
  const now = 2_000_000;
  for (let i = 0; i < 5; i++) {
    assert.equal(takeEstimateSlot(headers, `0109999000${i}`, now), null);
  }
  assert.equal(takeEstimateSlot(headers, "01099990005", now), 600);
  assert.equal(takeEstimateSlot(headers, "01099990005", now + 600_000), null);
});
