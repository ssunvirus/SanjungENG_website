import assert from "node:assert/strict";
import test from "node:test";
import { loadAdminApi } from "./helpers/load-admin-api.mjs";

function setup(authenticated = true) {
  let logins = 0;
  const api = loadAdminApi({
    adminAuthConfig: () => ({ origin: "https://example.com" }),
    getAdminSession: async () => {
      logins++;
      return authenticated ? {} : null;
    },
  });
  return { ...api, logins: () => logins };
}
function request(body, type = "application/json") {
  return new Request("https://example.com/api/admin/test", {
    method: "POST",
    headers: { "content-type": type },
    body,
  });
}

test("shared admin guard rejects foreign/missing origin before session work and protects reads", async () => {
  const api = setup();
  assert.equal((await api.checkAdminRequest(request("{}"))).status, 403);
  assert.equal(api.logins(), 0);
  assert.equal(await api.checkAdminRequest(), null);
  const anonymous = setup(false);
  const result = await anonymous.checkAdminRequest(undefined, "Login required");
  assert.equal(result.status, 401);
  assert.equal((await result.json()).error, "Login required");
  assert.equal(result.headers.get("cache-control"), "no-store");
});

test("shared JSON reader preserves parser validation, malformed input and media type responses", async () => {
  const api = setup();
  const options = { invalid: "Invalid input" };
  const parse = (value) => {
    if (!value?.title) throw new Error();
    return value.title;
  };
  assert.equal(
    (await api.readAdminJson(request('{"title":"현장"}'), parse, options)).value,
    "현장",
  );
  for (const body of ["{", "null", "{}", ""]) {
    const result = await api.readAdminJson(request(body), parse, options);
    assert.equal(result.response.status, 400);
    assert.equal((await result.response.json()).error, options.invalid);
  }
  const unsupported = await api.readAdminJson(request("{}", "text/plain"), parse, options);
  assert.equal(unsupported.response.status, 415);
});

test("streamed byte limits count UTF-8 bytes and reject overflow without Content-Length", async () => {
  const api = setup();
  let parsed = 0;
  let cancelled = false;
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('"가'));
      controller.enqueue(new TextEncoder().encode('나"'));
    },
    cancel() {
      cancelled = true;
      throw new Error("Cancellation failed");
    },
  });
  const input = new Request("https://example.com", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: stream,
    duplex: "half",
  });
  const result = await api.readAdminJson(
    input,
    (value) => {
      parsed++;
      return value;
    },
    {
      maxBytes: 7,
      invalid: "Invalid",
      tooLarge: "Too large",
    },
  );
  assert.equal(result.response.status, 413);
  assert.equal((await result.response.json()).error, "Too large");
  assert.equal(parsed, 0);
  assert.equal(cancelled, true);
  assert.equal(input.body.locked, false);
  const exact = await api.readRequestBytes(request('"가나"'), 8);
  assert.equal(exact.length, 8);
});

test("interrupted streams are rejected with a safe error and no parser work", async () => {
  const api = setup();
  const body = new ReadableStream({
    start(controller) {
      controller.error(new Error("secret"));
    },
  });
  const input = new Request("https://example.com", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    duplex: "half",
  });
  const result = await api.readAdminJson(
    input,
    () => {
      throw new Error("Should not parse");
    },
    { invalid: "Invalid input" },
  );
  assert.equal(result.response.status, 400);
  assert.equal((await result.response.json()).error, "Invalid input");
  assert.equal(input.body.locked, false);
});
