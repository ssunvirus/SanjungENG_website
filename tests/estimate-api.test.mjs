import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import * as rules from "../src/lib/estimate-rules.ts";
import { isEstimateOriginAllowed } from "../src/lib/estimate-origin.ts";
import { buildEstimateEmail } from "../src/lib/estimate-email-body.ts";

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
  const mail = [];
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
      if (name.endsWith("estimate-email-body")) return { buildEstimateEmail };
      if (name.endsWith("estimate-origin")) return { isEstimateOriginAllowed };
      if (name === "nodemailer")
        return {
          default: {
            createTransport: () => ({
              sendMail: async (message) => {
                mail.push(message);
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
      if (name.endsWith("estimate-upload-tokens"))
        return {
          openUploadToken: async (token) => {
            if (token !== "valid-upload-token") throw new Error("InvalidToken");
          },
        };
      if (name.endsWith("estimate-upload-storage"))
        return {
          verifyEstimateUploads: async () => {
            calls.push("verify-upload");
            if (mode === "invalid-upload") throw new Error("ChecksumMismatch");
            return [
              {
                name: "도면.pdf",
                type: "application/pdf",
                ...(mode === "uploaded-attachment" ? { content: Buffer.from("verified") } : {}),
              },
            ];
          },
          estimateAttachmentLinks: async () => [
            {
              name: "도면.pdf",
              url: "https://example.com/api/estimate/attachments/download?token=encrypted",
            },
          ],
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return { POST: sandbox.exports.POST, calls, mail };
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

test("verified large uploads are mailed as links and invalid capabilities or stored bytes never report success", async () => {
  const forged = setup();
  assert.equal((await forged.POST(request({ ...fields, uploadsToken: "forged" }))).status, 400);
  assert.deepEqual(forged.calls, []);
  const valid = setup();
  const response = await valid.POST(request({ ...fields, uploadsToken: "valid-upload-token" }));
  assert.equal((await response.json()).received, true);
  assert.deepEqual(valid.calls, ["take", "verify-upload", "send", "close"]);
  assert.equal(valid.mail[0].attachments, undefined);
  assert.match(valid.mail[0].text, /download\?token=encrypted/);
  assert.match(valid.mail[0].text, /7일/);
  assert.match(valid.mail[0].html, /<a href="https:\/\/example.com[^>]*>도면.pdf<\/a>/);
  const invalid = setup({ mode: "invalid-upload" });
  assert.equal(
    (await invalid.POST(request({ ...fields, uploadsToken: "valid-upload-token" }))).status,
    502,
  );
  assert.deepEqual(invalid.calls, ["take", "verify-upload", "refund"]);
  assert.equal(invalid.mail.length, 0);
});

test("S3-verified files within the mail threshold are attached without download links", async () => {
  const api = setup({ mode: "uploaded-attachment" });
  const response = await api.POST(request({ ...fields, uploadsToken: "valid-upload-token" }));
  assert.equal((await response.json()).received, true);
  assert.equal(api.mail[0].attachments.length, 1);
  assert.equal(api.mail[0].attachments[0].filename, "도면.pdf");
  assert.equal(api.mail[0].attachments[0].content.toString(), "verified");
  assert.doesNotMatch(api.mail[0].text, /download\?token|7일/);
  assert.equal(api.mail[0].text.split("도면.pdf").length - 1, 1);
});

test("direct attachments keep five small files but reject more than 3MiB without sending mail", async () => {
  for (const total of [5, 6]) {
    const api = setup();
    const form = new FormData();
    for (const [key, value] of Object.entries(fields))
      form.set(key, key === "privacy" ? "on" : String(value));
    for (let index = 0; index < total; index++)
      form.append("attachments", new File(["small"], `photo${index}.jpg`, { type: "image/jpeg" }));
    const response = await api.POST(
      new Request("https://example.com/api/estimate", { method: "POST", body: form }),
    );
    assert.equal(response.status, total === 5 ? 200 : 400);
    assert.equal(api.mail.length, total === 5 ? 1 : 0);
    if (total === 5) assert.equal(api.mail[0].attachments.length, 5);
  }
  const api = setup();
  const form = new FormData();
  for (const [key, value] of Object.entries(fields))
    form.set(key, key === "privacy" ? "on" : String(value));
  form.append(
    "attachments",
    new File([new Uint8Array(3 * 1024 * 1024 + 1)], "drawing.pdf", { type: "application/pdf" }),
  );
  assert.equal(
    (
      await api.POST(
        new Request("https://example.com/api/estimate", { method: "POST", body: form }),
      )
    ).status,
    400,
  );
  assert.deepEqual(api.calls, []);
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
