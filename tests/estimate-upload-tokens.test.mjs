import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import { hkdfSync } from "node:crypto";
import { EncryptJWT } from "jose";
import {
  openUploadToken,
  sealUploadToken,
  validateUploadManifest,
} from "../src/lib/estimate-upload-tokens.ts";

const secret = "test-only-credential";
const file = (overrides = {}) => ({
  key: `estimate-attachments/${randomUUID()}/${randomUUID()}`,
  name: "현장 사진.jpg",
  size: 4 * 1024 * 1024,
  type: "image/jpeg",
  checksum: Buffer.alloc(32).toString("base64"),
  ...overrides,
});

test("upload capabilities are encrypted, phone-bound and separate from downloads", async () => {
  const files = [file()];
  const token = await sealUploadToken(files, secret, "upload", "010-1234-5678");
  assert(!token.includes(files[0].name));
  assert.deepEqual(await openUploadToken(token, secret, "upload", "01012345678"), files);
  await assert.rejects(openUploadToken(token, secret, "upload", "01099998888"));
  await assert.rejects(openUploadToken(token, secret, "download"));
  await assert.rejects(openUploadToken(token, "wrong-secret", "upload", "01012345678"));
  await assert.rejects(
    openUploadToken(`${token.slice(0, -5)}xxxxx`, secret, "upload", "01012345678"),
  );
  const download = await sealUploadToken(files, secret, "download");
  assert.deepEqual(await openUploadToken(download, secret, "download"), files);
  await assert.rejects(openUploadToken(download, secret, "upload", "01012345678"));
});

test("expired links cannot be used even with the correct signing secret", async () => {
  const key = new Uint8Array(
    hkdfSync("sha256", secret, "sanjung-estimate-attachments", "download", 32),
  );
  const token = await new EncryptJWT({ files: [file()] })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuer("sanjung-estimate")
    .setAudience("download")
    .setIssuedAt(1)
    .setExpirationTime(2)
    .encrypt(key);
  await assert.rejects(openUploadToken(token, secret, "download"));
});

test("manifests reject path traversal, duplicates, unsafe names, unsupported formats and oversize batches", () => {
  const valid = file();
  assert.equal(validateUploadManifest([valid]).length, 1);
  assert.equal(validateUploadManifest(Array.from({ length: 5 }, () => file())).length, 5);
  for (const files of [
    [],
    [valid, valid],
    [file({ key: "projects/private" })],
    [file({ name: "../private.jpg" })],
    [file({ name: "payload.exe" })],
    [file({ size: 0 })],
    [file({ checksum: "invalid" })],
    Array.from({ length: 6 }, () => file({ size: 1 })),
    [file({ size: 20 * 1024 * 1024 }), file({ size: 1 })],
  ]) {
    assert.throws(() => validateUploadManifest(files));
  }
});
