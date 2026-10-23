import type { Project } from "@/src/components/projects/data";
import type { ProjectRecord } from "./project-record";

export function publicPhotoPath(src: string) {
  return src.replace(/^\/api\/admin\/project-images\//, "/api/project-images/");
}

export function mergePublicProjects(existing: Project[], saved: ProjectRecord[]): Project[] {
  const toCard = (record: ProjectRecord, base?: Project): Project => ({
    ...base,
    id: record.id,
    title: record.title,
    category: record.category === "섬유덕트" ? "섬유덕트" : "냉동공조",
    tag: record.category,
    description: record.description,
    image: record.photos[0] ? publicPhotoPath(record.photos[0].src) : "",
    imageTop: "0%",
    imageLeft: "0%",
    href: base?.href || `/projects/${record.id}`,
  });
  return [
    ...saved
      .filter((item) => !item.deleted && !existing.some((base) => base.id === item.id))
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((item) => toCard(item)),
    ...existing
      .filter((base) => !saved.some((item) => item.id === base.id && item.deleted))
      .map((base) => {
        const record = saved.find((item) => item.id === base.id);
        return record ? toCard(record, base) : base;
      }),
  ];
}

export function hasPublishedPhoto(records: ProjectRecord[], key: string) {
  return records.some(
    (record) =>
      !record.deleted &&
      record.photos.some((photo) => photo.src === `/api/admin/project-images/${key}`),
  );
}
