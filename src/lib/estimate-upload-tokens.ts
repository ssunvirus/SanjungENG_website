import { createHash, hkdfSync } from "node:crypto";
import { EncryptJWT, jwtDecrypt } from "jose";
import { estimateLimits, validateAttachments } from "./estimate-rules.ts";

export type EstimateUpload = {
  key: string;
  name: string;
  size: number;
  type: string;
  checksum: string;
};

export function phoneDigest(phone: string) {
  return createHash("sha256").update(phone.replace(/\D/g, "")).digest("hex");
}

export function validateUploadManifest(value: unknown): EstimateUpload[] {
  if (!Array.isArray(value) || !value.length || value.length > estimateLimits.attachmentCount)
    throw new Error("InvalidUploadManifest");
  const files: EstimateUpload[] = value.map((item: unknown) => {
    if (!item || typeof item !== "object") throw new Error("InvalidUploadManifest");
    const file = item as Record<string, unknown>;
    if (
      typeof file.key !== "string" ||
      !/^estimate-attachments\/[0-9a-f-]{36}\/[0-9a-f-]{36}$/.test(file.key) ||
      typeof file.name !== "string" ||
      !file.name ||
      file.name.length > 150 ||
      /[\p{Cc}/\\]/u.test(file.name) ||
      typeof file.size !== "number" ||
      !Number.isSafeInteger(file.size) ||
      file.size < 1 ||
      typeof file.type !== "string" ||
      typeof file.checksum !== "string" ||
      !/^[A-Za-z0-9+/]{43}=$/.test(file.checksum)
    )
      throw new Error("InvalidUploadManifest");
    return {
      key: file.key,
      name: file.name,
      size: file.size,
      type: file.type,
      checksum: file.checksum,
    };
  });
  if (new Set(files.map((file) => file.key)).size !== files.length)
    throw new Error("DuplicateUploadKey");
  const error = validateAttachments(files);
  if (error) throw new Error(error);
  return files;
}

function key(secret: string, purpose: string) {
  // Domain separation: no SMTP credential is exposed in the encrypted capabilities.
  if (!secret) throw new Error("AttachmentSecretUnavailable");
  return new Uint8Array(hkdfSync("sha256", secret, "sanjung-estimate-attachments", purpose, 32));
}

export async function sealUploadToken(
  files: EstimateUpload[],
  secret: string,
  purpose: "upload" | "download",
  phone?: string,
) {
  validateUploadManifest(files);
  return new EncryptJWT({ files, ...(phone ? { phone: phoneDigest(phone) } : {}) })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuer("sanjung-estimate")
    .setAudience(purpose)
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + (purpose === "upload" ? 1800 : 7 * 86400))
    .encrypt(key(secret, purpose));
}

export async function openUploadToken(
  token: string,
  secret: string,
  purpose: "upload" | "download",
  phone?: string,
) {
  const { payload } = await jwtDecrypt(token, key(secret, purpose), {
    issuer: "sanjung-estimate",
    audience: purpose,
    keyManagementAlgorithms: ["dir"],
    contentEncryptionAlgorithms: ["A256GCM"],
    requiredClaims: ["iat", "exp"],
  });
  if (purpose === "upload" && (!phone || payload.phone !== phoneDigest(phone)))
    throw new Error("UploadPhoneMismatch");
  return validateUploadManifest(payload.files);
}
