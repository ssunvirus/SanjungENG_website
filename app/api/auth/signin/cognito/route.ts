import * as oidc from "openid-client";
import { NextResponse } from "next/server";
import {
  adminAuthConfig,
  adminCookieName,
  adminCookieOptions,
  cognitoClient,
  getAdminSecret,
} from "@/src/lib/admin-auth";
import { sealAdminCookie } from "@/src/lib/admin-session";

export const runtime = "nodejs";

export async function GET() {
  const settings = adminAuthConfig();
  try {
    const secret = await getAdminSecret();
    const config = await cognitoClient(secret);
    const verifier = oidc.randomPKCECodeVerifier();
    const state = oidc.randomState();
    const nonce = oidc.randomNonce();
    const url = oidc.buildAuthorizationUrl(config, {
      redirect_uri: settings.callback,
      scope: "openid email",
      response_type: "code",
      code_challenge: await oidc.calculatePKCECodeChallenge(verifier),
      code_challenge_method: "S256",
      state,
      nonce,
      prompt: "login",
    });
    const response = NextResponse.redirect(url);
    response.headers.set("Cache-Control", "no-store");
    response.cookies.set(
      adminCookieName("flow"),
      await sealAdminCookie({ verifier, state, nonce }, secret, "flow", 600),
      adminCookieOptions(600),
    );
    return response;
  } catch {
    console.error("Admin sign-in initialization failed");
    return NextResponse.redirect(new URL("/admin/login?error=configuration", settings.origin));
  }
}
