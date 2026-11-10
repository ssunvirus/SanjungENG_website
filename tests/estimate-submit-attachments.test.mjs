import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { webcrypto } from "node:crypto";
import test from "node:test";
import ts from "typescript";
import * as rules from "../src/lib/estimate-rules.ts";

const source = ts.transpileModule(
  readFileSync(new URL("../src/lib/submit-estimate.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;
function form(bytes, count = 1) {
  const fields = new FormData();
  for (const [key, value] of Object.entries({
    manager: "담당자",
    phone: "01012345678",
    category: "냉동공조",
    message: "문의",
    privacy: "on",
  }))
    fields.set(key, value);
  for (let i = 0; i < count; i++)
    fields.append(
      "attachments",
      new File([new Uint8Array(bytes)], `photo${i}.jpg`, { type: "image/jpeg" }),
    );
  return fields;
}
function setup(failure) {
  const calls = [];
  const sandbox = {
    exports: {},
    File,
    FormData,
    Error,
    Object,
    Uint8Array,
    crypto: webcrypto,
    btoa,
    require: () => rules,
    fetch: async (url, options) => {
      calls.push({ url, ...options });
      if (url === "/api/estimate/attachments/upload") {
        const input = JSON.parse(options.body);
        if (failure === "prepare")
          return Response.json({ message: "not configured" }, { status: 503 });
        return Response.json({
          token: "sealed-upload",
          uploads: input.files.map((_, i) => ({
            url: `https://storage.example/${i}`,
            fields: { policy: "signed" },
          })),
        });
      }
      if (String(url).startsWith("https://storage.example")) {
        if (failure === "upload") return new Response(null, { status: 403 });
        return new Response(null, { status: 204 });
      }
      return Response.json({ received: true });
    },
  };
  runInNewContext(source, sandbox);
  return { submit: sandbox.exports.submitEstimate, calls };
}

test("exactly 3MiB stays attached, with all five small files allowed", async () => {
  for (const fields of [form(3 * 1024 * 1024), form(1, 5)]) {
    const api = setup();
    assert.equal(await api.submit(fields, true), true);
    assert.equal(api.calls.length, 1);
    assert.equal(api.calls[0].url, "/api/estimate");
    assert(api.calls[0].body instanceof FormData);
  }
});

test("over 3MiB uploads directly and sends only the capability with the inquiry", async () => {
  const api = setup();
  assert.equal(await api.submit(form(2 * 1024 * 1024, 2), true), true);
  assert.deepEqual(
    api.calls.map((call) => call.url),
    [
      "/api/estimate/attachments/upload",
      "https://storage.example/0",
      "https://storage.example/1",
      "/api/estimate",
    ],
  );
  const manifest = JSON.parse(api.calls[0].body);
  assert.match(manifest.files[0].checksum, /^[A-Za-z0-9+/]{43}=$/);
  assert.equal(api.calls[1].body.get("policy"), "signed");
  assert(api.calls[1].body.get("file") instanceof File);
  const inquiry = JSON.parse(api.calls.at(-1).body);
  assert.equal(inquiry.uploadsToken, "sealed-upload");
  assert.equal(inquiry.privacy, true);
  assert.equal(inquiry.attachments, undefined);
});

test("oversize selections and upload failures never submit an inquiry", async () => {
  const large = setup();
  await assert.rejects(large.submit(form(20 * 1024 * 1024 + 1), true));
  assert.equal(large.calls.length, 0);
  for (const failure of ["prepare", "upload"]) {
    const api = setup(failure);
    await assert.rejects(api.submit(form(3 * 1024 * 1024 + 1), true));
    assert(!api.calls.some((call) => call.url === "/api/estimate"));
  }
});
