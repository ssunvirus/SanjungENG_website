import { adminReply as reply, checkAdminRequest, readAdminJson } from "@/src/lib/admin-api";
import { listProjects, saveProjectOrder } from "@/src/lib/projects-db";
import { parseProjectOrder } from "@/src/lib/project-order";
import { projects as existing } from "@/src/components/projects/data";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const denied = await checkAdminRequest(request);
  if (denied) return denied;
  const input = await readAdminJson(request, parseProjectOrder, {
    invalid: "순서 정보를 확인해주세요.",
  });
  if (input.response) return input.response;
  const order = input.value;
  try {
    const records = await listProjects();
    const deleted = new Set(records.filter((item) => item.deleted).map((item) => item.id));
    const ids = new Set(
      [...existing.map((item) => item.id), ...records.map((item) => item.id)].filter(
        (id) => !deleted.has(id),
      ),
    );
    if (ids.size !== order.ids.length || order.ids.some((id) => !ids.has(id)))
      return reply({ error: "목록이 변경됐습니다. 새로고침한 뒤 다시 이동해주세요." }, 409);
    const saved = await saveProjectOrder(order);
    try {
      revalidateTag("public-projects", { expire: 0 });
    } catch {
      console.error("Project order cache invalidation failed");
    }
    return reply({ order: saved });
  } catch (error) {
    return reply(
      {
        error:
          error instanceof Error && error.name === "ConditionalCheckFailedException"
            ? "다른 창에서 순서를 변경했습니다. 새로고침한 뒤 다시 시도해주세요."
            : "순서를 저장하지 못했습니다. 잠시 후 다시 시도해주세요.",
      },
      error instanceof Error && error.name === "ConditionalCheckFailedException" ? 409 : 503,
    );
  }
}
