import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash, randomUUID } from "node:crypto";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import * as tokens from "../src/lib/estimate-upload-tokens.ts";
import * as rules from "../src/lib/estimate-rules.ts";

const source = ts.transpileModule(
  readFileSync(new URL("../src/lib/estimate-upload-storage.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;
const bytes = Buffer.from([0xff, 0xd8, 0xff, 1, 2, 3]);
const file = {
  key: `estimate-attachments/${randomUUID()}/${randomUUID()}`,
  name: "현장.jpg",
  size: bytes.length,
  type: "image/jpeg",
  checksum: createHash("sha256").update(bytes).digest("base64"),
};
function setup(mode, storedFile = file, storedBytes = bytes) {
  const calls = [];
  let destroyed = false;
  class Command {
    constructor(input) {
      this.input = input;
    }
  }
  const sandbox = {
    exports: {},
    Buffer,
    File,
    URL,
    Error,
    Map,
    process: {
      env: {
        ESTIMATE_ATTACHMENTS_BUCKET: "private-bucket",
        PROJECTS_AWS_REGION: "ap-southeast-2",
        SITE_URL: "https://example.com",
      },
    },
    require(name) {
      if (name === "server-only") return {};
      if (name === "node:crypto") return { createHash };
      if (name.endsWith("estimate-upload-tokens")) return tokens;
      if (name.endsWith("estimate-rules")) return rules;
      if (name.endsWith("estimate-attachments"))
        return { isSupportedAttachment: async () => mode !== "signature" };
      if (name === "@aws-sdk/client-s3")
        return {
          GetObjectCommand: class extends Command {},
          HeadObjectCommand: Command,
          S3Client: class {
            async send(command) {
              const input = command.input;
              calls.push(input);
              if (!input.IfMatch)
                return {
                  ContentLength: mode === "size" ? storedFile.size + 1 : storedFile.size,
                  ETag: "immutable",
                };
              return {
                Body: {
                  async *[Symbol.asyncIterator]() {
                    yield mode === "checksum"
                      ? Buffer.alloc(storedFile.size)
                      : mode === "overflow"
                        ? Buffer.alloc(storedFile.size + 1)
                        : storedBytes;
                  },
                  destroy() {
                    destroyed = true;
                  },
                },
              };
            }
          },
        };
      if (name === "@aws-sdk/s3-presigned-post")
        return {
          createPresignedPost: async (_, options) => {
            calls.push(options);
            return { url: "https://s3.example", fields: {} };
          },
        };
      if (name === "@aws-sdk/s3-request-presigner")
        return {
          getSignedUrl: async (_, command, options) => {
            calls.push({ ...command.input, ...options });
            return "https://s3.example/download";
          },
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return { ...sandbox.exports, calls, destroyed: () => destroyed };
}
test("presigned upload policy fixes file size, checksum, content type and private key", async () => {
  const api = setup();
  await api.createEstimateUpload(file);
  const policy = api.calls[0];
  assert.equal(policy.Key, file.key);
  assert.equal(policy.Expires, 600);
  assert.deepEqual(Array.from(policy.Conditions[0]), [
    "content-length-range",
    file.size,
    file.size,
  ]);
  assert.equal(policy.Fields["x-amz-checksum-sha256"], file.checksum);
  assert.equal(policy.Fields["Content-Type"], file.type);
  assert.equal(policy.Fields["x-amz-server-side-encryption"], "AES256");
});
test("stored data is checked for size, checksum and signature before a mail link can be issued", async () => {
  const token = await tokens.sealUploadToken([file], "secret", "upload", "01012345678");
  const api = setup();
  assert.deepEqual(Array.from(await api.verifyEstimateUploads(token, "01012345678", "secret")), [
    file,
  ]);
  assert.equal(api.calls[1].IfMatch, "immutable");
  for (const mode of ["size", "checksum", "signature", "overflow"]) {
    const failed = setup(mode);
    await assert.rejects(failed.verifyEstimateUploads(token, "01012345678", "secret"));
    if (mode === "overflow") assert.equal(failed.destroyed(), true);
  }
});
test("exactly 5MiB remains mail content; over 5MiB and combined batches are links", async () => {
  for (const size of [5 * 1024 * 1024, 5 * 1024 * 1024 + 1]) {
    const data = Buffer.alloc(size);
    bytes.copy(data);
    const descriptor = {
      ...file,
      size,
      checksum: createHash("sha256").update(data).digest("base64"),
    };
    const api = setup(undefined, descriptor, data);
    const token = await tokens.sealUploadToken([descriptor], "secret", "upload", "01012345678");
    const [verified] = await api.verifyEstimateUploads(token, "01012345678", "secret", true);
    assert.equal(Boolean(verified.content), size === 5 * 1024 * 1024);
    if (verified.content) assert.deepEqual(verified.content, data);
  }
  const data = Buffer.alloc(3 * 1024 * 1024);
  bytes.copy(data);
  const descriptor = {
    ...file,
    size: data.length,
    checksum: createHash("sha256").update(data).digest("base64"),
  };
  const api = setup(undefined, descriptor, data);
  const second = { ...descriptor, key: `estimate-attachments/${randomUUID()}/${randomUUID()}` };
  const token = await tokens.sealUploadToken(
    [descriptor, second],
    "secret",
    "upload",
    "01012345678",
  );
  const verified = await api.verifyEstimateUploads(token, "01012345678", "secret", true);
  assert.equal(verified.length, 2);
  assert(verified.every((value) => !value.content));
});

test("mail URLs carry download-only tokens; download redirects force attachment and short expiry", async () => {
  const api = setup();
  const [link] = await api.estimateAttachmentLinks([file], "secret");
  assert.equal(link.name, file.name);
  const url = new URL(link.url);
  assert.equal(url.origin, "https://example.com");
  const token = url.searchParams.get("token");
  assert.deepEqual(await tokens.openUploadToken(token, "secret", "download"), [file]);
  await assert.rejects(tokens.openUploadToken(token, "secret", "upload", "01012345678"));
  await api.estimateDownloadUrl(token, "secret");
  assert.equal(api.calls[0].expiresIn, 60);
  assert.equal(api.calls[0].ResponseContentType, "application/octet-stream");
  assert.match(api.calls[0].ResponseContentDisposition, /^attachment;/);
});
