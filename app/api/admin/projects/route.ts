import { adminAuthConfig, getAdminSession } from "@/src/lib/admin-auth";
import { listProjects, saveProject } from "@/src/lib/projects-db";
import { parseProject } from "@/src/lib/project-record";

const reply = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

export async function GET() {
  if (!(await getAdminSession())) return reply({ error: "로그인이 필요합니다." }, 401);
  try {
    return reply({ projects: await listProjects() });
  } catch {
    return reply({ error: "DB 목록을 불러오지 못했습니다. 설정과 읽기 권한을 확인해주세요." }, 503);
  }
}

export async function POST(request: Request) {
  if (request.headers.get("origin") !== adminAuthConfig().origin)
    return reply({ error: "허용되지 않은 요청입니다." }, 403);
  if (!(await getAdminSession()))
    return reply({ error: "로그인이 만료되었습니다. 다시 로그인해주세요." }, 401);
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json")
    return reply({ error: "JSON 형식이 필요합니다." }, 415);
  let project;
  try {
    // Bound the streamed request, including requests without Content-Length.
    const reader = request.body?.getReader();
    if (!reader) throw new Error("InvalidProject");
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 65536) {
        await reader.cancel();
        return reply({ error: "입력 내용이 너무 큽니다." }, 413);
      }
      chunks.push(value);
    }
    project = parseProject(JSON.parse(Buffer.concat(chunks).toString("utf8")));
  } catch {
    return reply(
      { error: "현장명과 입력 내용을 확인해주세요. 사진 업로드는 아직 지원하지 않습니다." },
      400,
    );
  }
  try {
    return reply({ project: await saveProject(project) });
  } catch (error) {
    if (error instanceof Error && error.name === "ConditionalCheckFailedException")
      return reply(
        { error: "다른 변경 또는 이전 저장이 있습니다. 새로고침하여 저장된 내용을 확인해주세요." },
        409,
      );
    return reply(
      { error: "저장하지 못했습니다. DB 설정과 PutItem 쓰기 권한을 확인해주세요." },
      503,
    );
  }
}
