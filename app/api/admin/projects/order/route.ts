import { adminAuthConfig, getAdminSession } from "@/src/lib/admin-auth";
import { listProjects, saveProjectOrder } from "@/src/lib/projects-db";
import { parseProjectOrder } from "@/src/lib/project-order";
import { projects as existing } from "@/src/components/projects/data";
import { revalidateTag } from "next/cache";

const reply = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  if (request.headers.get("origin") !== adminAuthConfig().origin)
    return reply({ error: "허용되지 않은 요청입니다." }, 403);
  if (!(await getAdminSession())) return reply({ error: "다시 로그인해주세요." }, 401);
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json")
    return reply({ error: "JSON 형식이 필요합니다." }, 415);
  let order;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 65536) {
        await reader.cancel();
        return reply({ error: "요청이 너무 큽니다." }, 413);
      }
      chunks.push(value);
    }
    order = parseProjectOrder(JSON.parse(Buffer.concat(chunks).toString("utf8")));
  } catch {
    return reply({ error: "순서 정보를 확인해주세요." }, 400);
  }
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
