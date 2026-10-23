import { adminAuthConfig, getAdminSession } from "@/src/lib/admin-auth";
import {
  imageExtension,
  imageUploadError,
  MAX_PROJECT_IMAGE_BYTES,
} from "@/src/lib/project-images";
import { uploadProjectImage } from "@/src/lib/project-images-s3";

const reply = (body: unknown, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (request.headers.get("origin") !== adminAuthConfig().origin)
    return reply({ error: "허용되지 않은 요청입니다." }, 403);
  if (!(await getAdminSession())) return reply({ error: "다시 로그인해주세요." }, 401);
  const type = request.headers.get("content-type") || "";
  if (!["image/jpeg", "image/png", "image/webp"].includes(type))
    return reply({ error: "JPG·PNG·WEBP 사진만 업로드할 수 있습니다." }, 415);
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: "사진을 선택해주세요." }, 400);
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_PROJECT_IMAGE_BYTES) {
        await reader.cancel();
        return reply({ error: "사진 한 장은 3MB 이하여야 합니다." }, 413);
      }
      chunks.push(value);
    }
  } catch {
    return reply({ error: "사진 전송이 중단되었습니다. 다시 시도해주세요." }, 400);
  }
  const bytes = Buffer.concat(chunks);
  if (!imageExtension(type, bytes)) return reply({ error: "사진 형식을 확인해주세요." }, 400);
  try {
    return reply({ src: await uploadProjectImage(bytes, type) }, 201);
  } catch (error) {
    const failure = imageUploadError(error);
    const awsError = error as {
      name?: string;
      $metadata?: { requestId?: string; httpStatusCode?: number };
    } | null;
    // Do not log credentials, request bodies, image bytes or raw AWS error messages.
    console.error("S3 upload failed", {
      code: failure.code,
      name: awsError?.name,
      requestId: awsError?.$metadata?.requestId,
      status: awsError?.$metadata?.httpStatusCode,
    });
    return reply(failure, 503);
  }
}
