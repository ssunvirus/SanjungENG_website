import { type NextRequest, NextResponse } from "next/server";
import { adminAuthConfig, adminCookieName, adminCookieOptions } from "@/src/lib/admin-auth";

export async function POST(request: NextRequest) {
  const settings = adminAuthConfig();
  if (request.headers.get("origin") !== settings.origin)
    return new Response("Forbidden", { status: 403 });
  const url = new URL("/logout", settings.domain);
  url.searchParams.set("client_id", settings.clientId);
  url.searchParams.set("logout_uri", `${settings.origin}/`);
  const response = NextResponse.redirect(url, 303);
  response.cookies.set(adminCookieName("session"), "", adminCookieOptions(0));
  response.cookies.set(adminCookieName("flow"), "", adminCookieOptions(0));
  response.headers.set("Cache-Control", "no-store");
  return response;
}
