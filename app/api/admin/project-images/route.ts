import {
  adminReply as reply,
  checkAdminRequest,
  readRequestBytes,
  RequestBodyError,
} from "@/src/lib/admin-api";
import {
  imageExtension,
  imageUploadError,
  MAX_PROJECT_IMAGE_BYTES,
} from "@/src/lib/project-images";
import { uploadProjectImage } from "@/src/lib/project-images-s3";

export async function POST(request: Request) {
  const denied = await checkAdminRequest(request);
  if (denied) return denied;
  const type = request.headers.get("content-type") || "";
  if (!["image/jpeg", "image/png", "image/webp"].includes(type))
    return reply({ error: "JPG·PNG·WEBP 사진만 업로드할 수 있습니다." }, 415);
  if (!request.body) return reply({ error: "사진을 선택해주세요." }, 400);
  let bytes: Buffer;
  try {
    bytes = await readRequestBytes(request, MAX_PROJECT_IMAGE_BYTES);
  } catch (error) {
    if (error instanceof RequestBodyError && error.status === 413)
      return reply({ error: "사진 한 장은 3MB 이하여야 합니다." }, 413);
    return reply({ error: "사진 전송이 중단되었습니다. 다시 시도해주세요." }, 400);
  }
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
