import { getAdminSession } from "@/src/lib/admin-auth";
import { projectImageKeyPattern } from "@/src/lib/project-images";
import { readProjectImage } from "@/src/lib/project-images-s3";

export async function GET(_request: Request, context: { params: Promise<{ key: string }> }) {
  const headers = { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" };
  if (!(await getAdminSession())) return new Response(null, { status: 401, headers });
  const { key } = await context.params;
  if (!projectImageKeyPattern.test(key)) return new Response(null, { status: 404, headers });
  try {
    const { bytes, type } = await readProjectImage(key);
    return new Response(Buffer.from(bytes), { headers: { ...headers, "Content-Type": type } });
  } catch {
    return new Response(null, { status: 503, headers });
  }
}
