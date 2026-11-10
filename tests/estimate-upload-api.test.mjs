import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import * as tokens from "../src/lib/estimate-upload-tokens.ts";
import * as rules from "../src/lib/estimate-rules.ts";
import { isEstimateOriginAllowed } from "../src/lib/estimate-origin.ts";

const source = ts.transpileModule(
  readFileSync(new URL("../app/api/estimate/attachments/upload/route.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;
const fields = {
  manager: "담당자",
  phone: "01012345678",
  category: "냉동공조",
  message: "문의",
  privacy: true,
};
const file = {
  name: "현장.jpg",
  size: 4 * 1024 * 1024,
  type: "image/jpeg",
  checksum: Buffer.alloc(32).toString("base64"),
};
function request(data = { ...fields, files: [file] }, origin = "https://example.com") {
  return new Request("https://example.com/api/estimate/attachments/upload", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(data),
  });
}
function setup(mode) {
  const calls = [];
  const sandbox = {
    exports: {},
    Buffer,
    URL,
    Response,
    Date,
    Error,
    process: {
      env:
        mode === "unconfigured"
          ? {}
          : {
              ESTIMATE_ATTACHMENTS_BUCKET: "private",
              NAVER_SMTP_USER: "sender",
              ESTIMATE_TO_EMAIL: "receiver",
            },
    },
    require(name) {
      if (name.endsWith("estimate-origin")) return { isEstimateOriginAllowed };
      if (name === "node:crypto") return { randomUUID };
      if (name.endsWith("estimate-rules")) return rules;
      if (name.endsWith("estimate-upload-tokens")) return tokens;
      if (name.endsWith("estimate-smtp")) return { getSmtpPassword: async () => "secret" };
      if (name.endsWith("estimate-rate-limit"))
        return {
          takeEstimateSlot: async (...args) => {
            calls.push(["take", args[3]]);
            return mode === "limited" ? { retryAfter: 600 } : { ticket: {} };
          },
          releaseEstimateSlot: async () => {
            calls.push(["refund"]);
          },
        };
      if (name.endsWith("estimate-upload-storage"))
        return {
          createEstimateUpload: async () => {
            calls.push(["presign"]);
            if (mode === "storage-failure") throw new Error("Down");
            return { url: "https://s3.example", fields: {} };
          },
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return { POST: sandbox.exports.POST, calls };
}

test("upload grants require valid same-origin consent and bounded file metadata", async () => {
  for (const [req, status] of [
    [request(undefined, "https://foreign.example"), 403],
    [request({ ...fields, privacy: false, files: [file] }), 400],
    [request({ ...fields, website: "bot", files: [file] }), 400],
    [request({ ...fields, files: Array(6).fill(file) }), 400],
    [request({ ...fields, files: [{ ...file, size: 21 * 1024 * 1024 }] }), 400],
    [request({ ...fields, files: [{ ...file, size: 3 * 1024 * 1024 }] }), 400],
    [request({ ...fields, files: [{ ...file, checksum: "bad" }] }), 400],
    [request({ ...fields, message: "x".repeat(25000), files: [file] }), 413],
  ]) {
    const api = setup();
    assert.equal((await api.POST(req)).status, status);
    assert.deepEqual(api.calls, []);
  }
});

test("upload grants use a separate quota and bind the generated keys to a phone", async () => {
  const api = setup();
  const response = await api.POST(request());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const result = await response.json();
  assert.equal(result.uploads.length, 1);
  assert.deepEqual(api.calls, [["take", "attachment-upload"], ["presign"]]);
  const [stored] = await tokens.openUploadToken(result.token, "secret", "upload", fields.phone);
  assert.match(stored.key, /^estimate-attachments\//);
  assert.equal(stored.size, file.size);
  await assert.rejects(tokens.openUploadToken(result.token, "secret", "upload", "01099998888"));
});

test("missing storage, quota exhaustion and signing errors never grant upload access", async () => {
  for (const [mode, status, expected] of [
    ["unconfigured", 503, []],
    ["limited", 429, [["take", "attachment-upload"]]],
    ["storage-failure", 503, [["take", "attachment-upload"], ["presign"], ["refund"]]],
  ]) {
    const api = setup(mode);
    const response = await api.POST(request());
    assert.equal(response.status, status);
    assert.equal((await response.json()).token, undefined);
    assert.deepEqual(api.calls, expected);
  }
});
