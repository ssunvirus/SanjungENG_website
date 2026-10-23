import "server-only";
import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import * as oidc from "openid-client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { openAdminCookie } from "./admin-session";

export function adminAuthConfig() {
  const region = process.env.COGNITO_REGION || "ap-southeast-2";
  const poolId = process.env.COGNITO_USER_POOL_ID || "ap-southeast-2_oiRW9cvWe";
  const clientId = process.env.COGNITO_CLIENT_ID || "1lit6l9itbtso074l9d9apl704";
  const origin = new URL(
    process.env.ADMIN_AUTH_URL ||
      (process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://www.sanjungeng.co.kr"),
  ).origin;
  const domain = new URL(
    process.env.COGNITO_DOMAIN ||
      "https://ap-southeast-2oirw9cvwe.auth.ap-southeast-2.amazoncognito.com",
  );
  if (
    domain.protocol !== "https:" ||
    (!origin.startsWith("https://") && !origin.startsWith("http://localhost:"))
  )
    throw new Error("InvalidAuthConfiguration");
  return {
    region,
    poolId,
    clientId,
    origin,
    domain,
    issuer: `https://cognito-idp.${region}.amazonaws.com/${poolId}`,
    callback: `${origin}/api/auth/callback/cognito`,
    secure: origin.startsWith("https://"),
  };
}

let cachedSecret: { value: string; expires: number } | undefined;
export async function getAdminSecret(): Promise<string> {
  if (process.env.COGNITO_CLIENT_SECRET) return process.env.COGNITO_CLIENT_SECRET;
  if (cachedSecret && cachedSecret.expires > Date.now()) return cachedSecret.value;
  const client = new SSMClient({ region: adminAuthConfig().region, maxAttempts: 2 });
  try {
    const result = await client.send(
      new GetParameterCommand({
        Name: process.env.COGNITO_CLIENT_SECRET_PARAMETER || "/sanjung/admin/cognito-client-secret",
        WithDecryption: true,
      }),
      { abortSignal: AbortSignal.timeout(10000) },
    );
    const value = result.Parameter?.Value;
    if (!value || value.length < 32) throw new Error("MissingAdminSecret");
    cachedSecret = { value, expires: Date.now() + 300000 };
    return value;
  } finally {
    client.destroy();
  }
}

export async function cognitoClient(secret: string) {
  const settings = adminAuthConfig();
  const config = await oidc.discovery(
    new URL(settings.issuer),
    settings.clientId,
    secret,
    oidc.ClientSecretBasic(secret),
    { timeout: 10 },
  );
  oidc.enableNonRepudiationChecks(config);
  return config;
}

export function adminCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: adminAuthConfig().secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}
export function adminCookieName(purpose: "session" | "flow") {
  return `${adminAuthConfig().secure ? "__Host-" : ""}sanjung-admin-${purpose}`;
}

export async function getAdminSession() {
  const value = (await cookies()).get(adminCookieName("session"))?.value;
  if (!value) return null;
  try {
    const payload = await openAdminCookie(value, await getAdminSecret(), "session");
    if (payload.role === "Admins" && typeof payload.sub === "string") return { id: payload.sub };
  } catch {
    // Invalid, expired or unavailable authentication always fails closed.
  }
  return null;
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
