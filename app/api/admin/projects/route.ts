import { adminReply as reply, checkAdminRequest, readAdminJson } from "@/src/lib/admin-api";
import { listProjects, saveProject, getProjectOrder } from "@/src/lib/projects-db";
import { parseProject } from "@/src/lib/project-record";
import { revalidateTag } from "next/cache";
import { permanentlyDeleteProject, pendingProjectDeletion } from "@/src/lib/project-deletion";

export async function GET() {
  const denied = await checkAdminRequest(undefined, "로그인이 필요합니다.");
  if (denied) return denied;
  try {
    const [projects, order] = await Promise.all([listProjects(), getProjectOrder()]);
    return reply({ projects, order, pendingDeletions: projects.filter(pendingProjectDeletion) });
  } catch {
    return reply({ error: "DB 목록을 불러오지 못했습니다. 설정과 읽기 권한을 확인해주세요." }, 503);
  }
}

export async function POST(request: Request) {
  return mutate(request, false);
}

export async function DELETE(request: Request) {
  return mutate(request, true);
}

async function mutate(request: Request, deleting: boolean) {
  const denied = await checkAdminRequest(request, "로그인이 만료되었습니다. 다시 로그인해주세요.");
  if (denied) return denied;
  const input = await readAdminJson(
    request,
    (value) => {
      const project = parseProject(value);
      if (project.deleted && !deleting) throw new Error("InvalidProject");
      return project;
    },
    {
      invalid:
        "현장명과 입력 내용을 확인해주세요. 사진은 관리자 사진 선택 기능으로 업로드해주세요.",
      tooLarge: "입력 내용이 너무 큽니다.",
    },
  );
  if (input.response) return input.response;
  const project = input.value;
  try {
    const result = deleting
      ? await permanentlyDeleteProject(project)
      : { project: await saveProject(project) };
    // A cache failure must not report an already committed DB write as failed.
    try {
      revalidateTag("public-projects", { expire: 0 });
    } catch {
      console.error("Public projects cache invalidation failed");
    }
    return reply(result);
  } catch (error) {
    if (error instanceof Error && error.name === "ConditionalCheckFailedException")
      return reply(
        { error: "다른 변경 또는 이전 저장이 있습니다. 새로고침하여 저장된 내용을 확인해주세요." },
        409,
      );
    return reply(
      {
        error: deleting
          ? "삭제하지 못했습니다. 잠시 후 다시 시도해주세요."
          : "저장하지 못했습니다. DB 설정과 PutItem 쓰기 권한을 확인해주세요.",
      },
      503,
    );
  }
}
