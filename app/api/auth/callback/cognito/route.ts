import * as oidc from "openid-client";
import { type NextRequest, NextResponse } from "next/server";
import {
  adminAuthConfig,
  adminCookieName,
  adminCookieOptions,
  cognitoClient,
  getAdminSecret,
} from "@/src/lib/admin-auth";
import { isAdminClaims, openAdminCookie, sealAdminCookie } from "@/src/lib/admin-session";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const settings = adminAuthConfig();
  let response: NextResponse;
  try {
    const value = request.cookies.get(adminCookieName("flow"))?.value;
    if (!value) throw new Error("MissingFlow");
    const secret = await getAdminSecret();
    const flow = await openAdminCookie(value, secret, "flow");
    if (
      typeof flow.verifier !== "string" ||
      typeof flow.state !== "string" ||
      typeof flow.nonce !== "string"
    )
      throw new Error("InvalidFlow");
    const currentUrl = new URL(settings.callback);
    currentUrl.search = request.nextUrl.search;
    const tokens = await oidc.authorizationCodeGrant(await cognitoClient(secret), currentUrl, {
      pkceCodeVerifier: flow.verifier,
      expectedState: flow.state,
      expectedNonce: flow.nonce,
      idTokenExpected: true,
    });
    const claims = tokens.claims();
    if (!isAdminClaims(claims)) {
      response = NextResponse.redirect(new URL("/admin/login?error=denied", settings.origin));
      response.cookies.set(adminCookieName("session"), "", adminCookieOptions(0));
    } else {
      const lifetime = Math.min(3600, Math.floor((claims?.exp || 0) - Date.now() / 1000));
      if (lifetime <= 0) throw new Error("ExpiredIdentity");
      response = NextResponse.redirect(new URL("/admin", settings.origin));
      response.cookies.set(
        adminCookieName("session"),
        await sealAdminCookie({ sub: claims!.sub, role: "Admins" }, secret, "session", lifetime),
        adminCookieOptions(lifetime),
      );
    }
  } catch {
    console.error("Admin authentication callback rejected");
    response = NextResponse.redirect(new URL("/admin/login?error=authentication", settings.origin));
    response.cookies.set(adminCookieName("session"), "", adminCookieOptions(0));
  }
  response.cookies.set(adminCookieName("flow"), "", adminCookieOptions(0));
  response.headers.set("Cache-Control", "no-store");
  return response;
}
