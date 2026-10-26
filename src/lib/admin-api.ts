import "server-only";
import { adminAuthConfig, getAdminSession } from "./admin-auth";

export function adminReply(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

// Pass a request only for mutations. Reads still require an authenticated session.
export async function checkAdminRequest(request?: Request, message = "다시 로그인해주세요.") {
  if (request && request.headers.get("origin") !== adminAuthConfig().origin)
    return adminReply({ error: "허용되지 않은 요청입니다." }, 403);
  if (!(await getAdminSession())) return adminReply({ error: message }, 401);
  return null;
}

export class RequestBodyError extends Error {
  constructor(public readonly status: 400 | 413) {
    super("InvalidRequestBody");
    this.name = "RequestBodyError";
  }
}

export async function readRequestBytes(request: Request, maxBytes: number): Promise<Buffer> {
  const reader = request.body?.getReader();
  if (!reader) throw new RequestBodyError(400);
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) {
        // Even if cancelling the stream fails, preserve the size-limit response.
        try {
          await reader.cancel();
        } catch {
          /* The request is already rejected. */
        }
        throw new RequestBodyError(413);
      }
      chunks.push(value);
    }
    return Buffer.concat(chunks);
  } finally {
    reader.releaseLock();
  }
}

type JsonResult<T> = { value: T; response?: never } | { response: Response; value?: never };

export async function readAdminJson<T>(
  request: Request,
  parse: (value: unknown) => T,
  options: { invalid: string; maxBytes?: number; tooLarge?: string },
): Promise<JsonResult<T>> {
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json")
    return { response: adminReply({ error: "JSON 형식이 필요합니다." }, 415) };
  try {
    const bytes = await readRequestBytes(request, options.maxBytes ?? 65536);
    return { value: parse(JSON.parse(bytes.toString("utf8"))) };
  } catch (error) {
    const oversized = error instanceof RequestBodyError && error.status === 413;
    return {
      response: adminReply(
        { error: oversized ? (options.tooLarge ?? "요청이 너무 큽니다.") : options.invalid },
        oversized ? 413 : 400,
      ),
    };
  }
}
