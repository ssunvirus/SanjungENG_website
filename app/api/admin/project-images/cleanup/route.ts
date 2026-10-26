import { adminReply as reply, checkAdminRequest, readAdminJson } from "@/src/lib/admin-api";
import { projectImageKeyPattern } from "@/src/lib/project-images";
import {
  unusedProjectImages,
  cleanupUnusedProjectImages,
  CLEANUP_BATCH_SIZE,
} from "@/src/lib/unused-project-images";

export async function GET() {
  const denied = await checkAdminRequest();
  if (denied) return denied;
  try {
    const images = await unusedProjectImages();
    return reply({ count: images.length, images: images.slice(0, CLEANUP_BATCH_SIZE) });
  } catch {
    return reply(
      { error: "미사용 사진을 확인하지 못했습니다. S3 ListBucket·DB Scan 권한을 확인해주세요." },
      503,
    );
  }
}

export async function POST(request: Request) {
  const denied = await checkAdminRequest(request);
  if (denied) return denied;
  const input = await readAdminJson(
    request,
    (value) => {
      const body = value as { keys?: unknown } | null;
      if (
        !body ||
        !Array.isArray(body.keys) ||
        !body.keys.length ||
        body.keys.length > CLEANUP_BATCH_SIZE ||
        body.keys.some(
          (key: unknown) => typeof key !== "string" || !projectImageKeyPattern.test(key),
        )
      )
        throw new Error();
      return body.keys as string[];
    },
    { invalid: "정리할 사진을 다시 확인해주세요.", maxBytes: 4096 },
  );
  if (input.response) return input.response;
  const keys = input.value;
  try {
    return reply(await cleanupUnusedProjectImages(keys));
  } catch {
    return reply(
      {
        error:
          "사진 정리가 중단되었습니다. 결과를 다시 조회해주세요. S3·DB 읽기 권한을 확인해주세요.",
      },
      503,
    );
  }
}
