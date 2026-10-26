import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import * as rules from "../src/lib/estimate-rules.ts";

const source = ts.transpileModule(
  readFileSync(new URL("../app/api/estimate/route.ts", import.meta.url), "utf8"),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  },
).outputText;
const fields = {
  manager: "담당자",
  phone: "01012345678",
  category: "냉동공조",
  message: "냉동기 교체 문의입니다.",
  privacy: true,
};
function setup({ mode = "success", configured = true, secretFailure = false } = {}) {
  const calls = [];
  const sandbox = {
    exports: {},
    Response,
    Buffer,
    File,
    URL,
    Date,
    Error,
    console: { error() {} },
    process: {
      env: configured
        ? { NAVER_SMTP_USER: "sender@example.test", ESTIMATE_TO_EMAIL: "receiver@example.test" }
        : {},
    },
    require(name) {
      if (name === "nodemailer")
        return {
          default: {
            createTransport: () => ({
              sendMail: async () => {
                calls.push("send");
                if (mode === "smtp-failure") throw new Error("Down");
                return mode === "rejected"
                  ? { accepted: [], rejected: ["receiver"] }
                  : { accepted: ["receiver"], rejected: [] };
              },
              close: () => calls.push("close"),
            }),
          },
        };
      if (name.endsWith("estimate-smtp"))
        return {
          getSmtpPassword: async () => {
            if (secretFailure) throw new Error();
            return "mock-only";
          },
        };
      if (name.endsWith("estimate-rate-limit"))
        return {
          takeEstimateSlot: async () => {
            calls.push("take");
            if (mode === "db-failure") throw new Error();
            return mode === "limited"
              ? { retryAfter: 600 }
              : { ticket: { id: "ticket", rules: [] } };
          },
          releaseEstimateSlot: async () => {
            calls.push("refund");
          },
        };
      if (name.endsWith("estimate-attachments")) return { isSupportedAttachment: async () => true };
      if (name.endsWith("estimate-rules")) return rules;
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return { POST: sandbox.exports.POST, calls };
}
function request(data = fields) {
  return new Request("https://example.com/api/estimate", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://example.com" },
    body: JSON.stringify(data),
  });
}

test("accepted mail keeps the reserved quota and marks the response received", async () => {
  const api = setup();
  const response = await api.POST(request());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).received, true);
  assert.deepEqual(api.calls, ["take", "send", "close"]);
});

test("SMTP failure and recipient rejection refund quota without reporting success", async () => {
  for (const mode of ["smtp-failure", "rejected"]) {
    const api = setup({ mode });
    const response = await api.POST(request());
    assert.equal(response.status, 502);
    assert.notEqual((await response.json()).received, true);
    assert.deepEqual(api.calls, ["take", "send", "close", "refund"]);
  }
});

test("quota rejection or unavailable rate-limit DB never sends mail", async () => {
  const limited = setup({ mode: "limited" });
  const response = await limited.POST(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "600");
  assert.deepEqual(limited.calls, ["take"]);
  const down = setup({ mode: "db-failure" });
  assert.equal((await down.POST(request())).status, 503);
  assert.deepEqual(down.calls, ["take"]);
});

test("invalid input, bot decoys and missing mail configuration never reserve quota", async () => {
  const invalid = setup();
  assert.equal((await invalid.POST(request({ ...fields, privacy: false }))).status, 400);
  assert.deepEqual(invalid.calls, []);
  const decoy = setup();
  assert.equal((await decoy.POST(request({ ...fields, website: "bot" }))).status, 200);
  assert.deepEqual(decoy.calls, []);
  for (const options of [{ configured: false }, { secretFailure: true }]) {
    const api = setup(options);
    assert.equal((await api.POST(request())).status, 503);
    assert.deepEqual(api.calls, []);
  }
});
