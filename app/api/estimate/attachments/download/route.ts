import { getSmtpPassword } from "@/src/lib/estimate-smtp";
import { estimateDownloadUrl } from "@/src/lib/estimate-upload-storage";

export const runtime = "nodejs";
export async function GET(request: Request) {
  const headers = {
    "Cache-Control": "private, no-store",
    "Referrer-Policy": "no-referrer",
    "X-Robots-Tag": "noindex, nofollow",
  };
  const token = new URL(request.url).searchParams.get("token");
  if (!token || token.length > 6000)
    return new Response("유효하지 않은 다운로드 링크입니다.", { status: 400, headers });
  try {
    const secret = await getSmtpPassword();
    if (!secret) throw new Error("Unavailable");
    const url = await estimateDownloadUrl(token, secret);
    return new Response(null, { status: 302, headers: { ...headers, Location: url } });
  } catch {
    return new Response(
      "다운로드 링크가 만료되었거나 사용할 수 없습니다. 문의 접수 후 7일 이내에 다운로드해주세요.",
      { status: 410, headers },
    );
  }
}
