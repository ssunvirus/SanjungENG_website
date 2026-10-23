import { hkdfSync } from "node:crypto";
import { EncryptJWT, jwtDecrypt, type JWTPayload } from "jose";

function cookieKey(secret: string, purpose: "session" | "flow") {
  return new Uint8Array(hkdfSync("sha256", secret, "sanjung-admin", purpose, 32));
}

export function sealAdminCookie(
  payload: JWTPayload,
  secret: string,
  purpose: "session" | "flow",
  maxAge: number,
) {
  return new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuer("sanjung-admin")
    .setAudience(purpose)
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + maxAge)
    .encrypt(cookieKey(secret, purpose));
}

export async function openAdminCookie(value: string, secret: string, purpose: "session" | "flow") {
  const { payload } = await jwtDecrypt(value, cookieKey(secret, purpose), {
    issuer: "sanjung-admin",
    audience: purpose,
    keyManagementAlgorithms: ["dir"],
    contentEncryptionAlgorithms: ["A256GCM"],
    requiredClaims: ["exp", "iat"],
  });
  return payload;
}

export function isAdminClaims(claims: JWTPayload | undefined): boolean {
  const groups = claims?.["cognito:groups"];
  return typeof claims?.sub === "string" && Array.isArray(groups) && groups.includes("Admins");
}
