import { randomUUID } from "node:crypto";
import { getSmtpPassword } from "@/src/lib/estimate-smtp";
import { takeEstimateSlot, releaseEstimateSlot } from "@/src/lib/estimate-rate-limit";
import {
  estimateLimits,
  readEstimateFields,
  validateEstimateFields,
} from "@/src/lib/estimate-rules";
import { sealUploadToken, validateUploadManifest } from "@/src/lib/estimate-upload-tokens";
import { createEstimateUpload } from "@/src/lib/estimate-upload-storage";

export const runtime = "nodejs";
const fail = (message: string, status: number) =>
  Response.json({ message }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin)
    return fail("올바른 홈페이지에서 다시 요청해주세요.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return fail("잘못된 요청 형식입니다.", 415);
  let data: Record<string, unknown>;
  let files: ReturnType<typeof validateUploadManifest>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return fail("입력 내용을 확인해주세요.", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > estimateLimits.jsonBytes) {
        await reader.cancel();
        return fail("입력 내용이 너무 큽니다.", 413);
      }
      chunks.push(value);
    }
    data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!data || typeof data !== "object" || Array.isArray(data) || !Array.isArray(data.files))
      return fail("첨부파일 정보를 확인해주세요.", 400);
    const fields = readEstimateFields(data);
    const error = validateEstimateFields(fields);
    if (error || fields.website) return fail(error || "입력 내용을 확인해주세요.", 400);
    const group = randomUUID();
    files = validateUploadManifest(
      data.files.map((file: unknown) => {
        if (!file || typeof file !== "object") throw new Error("InvalidFile");
        return { ...file, key: `estimate-attachments/${group}/${randomUUID()}` };
      }),
    );
    if (files.reduce((total, file) => total + file.size, 0) <= estimateLimits.directAttachmentBytes)
      return fail("작은 첨부파일은 문의 양식에서 바로 전송해주세요.", 400);
  } catch {
    return fail("첨부파일 형식·개수·용량을 확인해주세요. 최대 5개, 합계 20MB입니다.", 400);
  }
  if (
    !process.env.ESTIMATE_ATTACHMENTS_BUCKET ||
    !process.env.NAVER_SMTP_USER ||
    !process.env.ESTIMATE_TO_EMAIL
  )
    return fail(
      "대용량 첨부 접수가 준비 중입니다. 합계 3MB 이하로 줄이거나 전화로 문의해주세요.",
      503,
    );
  let secret: string | undefined;
  try {
    secret = await getSmtpPassword();
  } catch {
    /* Fail closed below. */
  }
  if (!secret) return fail("첨부파일 접수 설정을 확인하지 못했습니다.", 503);
  let slot: Awaited<ReturnType<typeof takeEstimateSlot>>;
  try {
    slot = await takeEstimateSlot(
      request.headers,
      readEstimateFields(data).phone,
      Date.now(),
      "attachment-upload",
    );
  } catch {
    return fail("첨부 접수 상태를 확인하지 못했습니다. 잠시 후 다시 시도해주세요.", 503);
  }
  if ("retryAfter" in slot)
    return Response.json(
      { message: "첨부 요청이 많습니다. 잠시 후 다시 시도해주세요." },
      {
        status: 429,
        headers: { "Retry-After": String(slot.retryAfter), "Cache-Control": "no-store" },
      },
    );
  try {
    const uploads = await Promise.all(files.map(createEstimateUpload));
    const token = await sealUploadToken(files, secret, "upload", readEstimateFields(data).phone);
    return Response.json({ uploads, token }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    try {
      await releaseEstimateSlot(slot.ticket);
    } catch {
      /* Existing TTL bounds a failed refund. */
    }
    return fail("첨부파일 업로드를 준비하지 못했습니다. 잠시 후 다시 시도해주세요.", 503);
  }
}
