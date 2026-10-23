import { projectImageKeyPattern } from "@/src/lib/project-images";
import { readProjectImage } from "@/src/lib/project-images-s3";
import { publicProjectRecords } from "@/src/lib/public-projects";
import { hasPublishedPhoto } from "@/src/lib/public-project-data";

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
  if (!projectImageKeyPattern.test(key)) return new Response(null, { status: 404, headers });
  try {
    if (!hasPublishedPhoto(await publicProjectRecords(), key))
      return new Response(null, { status: 404, headers });
    const { bytes, type } = await readProjectImage(key);
    return new Response(Buffer.from(bytes), { headers: { ...headers, "Content-Type": type } });
  } catch {
    return new Response(null, { status: 503, headers });
  }
}
