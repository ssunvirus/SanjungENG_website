import { projectImagePathPattern } from "./project-images.ts";

export type ProjectRecord = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  status: "공개";
  photos: { src: string; alt: string }[];
  version: number;
  deleted?: true;
};

export function parseProject(value: unknown): ProjectRecord {
  if (!value || typeof value !== "object") throw new Error("InvalidProject");
  const p = value as Record<string, unknown>;
  function field(key: string, max: number, required = false) {
    const v = p[key];
    if (typeof v !== "string" || v.length > max || (required && !v.trim()))
      throw new Error("InvalidProject");
    return v.trim();
  }
  const id = field("id", 100, true);
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) throw new Error("InvalidProject");
  const category = field("category", 30, true);
  if (!["냉동기", "항온항습기", "냉각탑", "저온저장고", "섬유덕트", "기타"].includes(category))
    throw new Error("InvalidProject");
  if (!Number.isSafeInteger(p.version) || (p.version as number) < 0)
    throw new Error("InvalidProject");
  if (!Array.isArray(p.photos) || p.photos.length > 30) throw new Error("InvalidProject");
  const photos = p.photos.map((photo: unknown) => {
    if (!photo || typeof photo !== "object") throw new Error("InvalidProject");
    const { src, alt } = photo as Record<string, unknown>;
    if (
      typeof src !== "string" ||
      (!/^\/images\/[a-zA-Z0-9_./%-]+$/.test(src) && !projectImagePathPattern.test(src)) ||
      src.includes("..") ||
      /%2e|%2f|%5c/i.test(src) ||
      src.length > 500 ||
      typeof alt !== "string" ||
      alt.length > 300
    )
      throw new Error("InvalidProject");
    return { src, alt: alt.trim() };
  });
  return {
    id,
    title: field("title", 150, true),
    category,
    location: field("location", 100),
    description: field("description", 5000),
    status: "공개",
    photos,
    version: p.version as number,
    ...(p.deleted === true ? { deleted: true as const } : {}),
  };
}

export function mergeAdminProjects(existing: ProjectRecord[], saved: ProjectRecord[]) {
  return [
    ...saved.filter((item) => !item.deleted),
    ...existing.filter((item) => !saved.some((record) => record.id === item.id)),
  ];
}
