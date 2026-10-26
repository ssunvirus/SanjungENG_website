import "server-only";
import { projects } from "@/src/components/projects/data";
import {
  getProjectRecord,
  listProjects,
  saveProject,
  finalizeProjectDeletion,
} from "./projects-db";
import { deleteProjectImage } from "./project-images-s3";
import { projectImagePathPattern } from "./project-images";
import type { ProjectRecord } from "./project-record";

export function pendingProjectDeletion(record: ProjectRecord) {
  if (!record.deleted) return false;
  const legacy = projects.some((item) => item.id === record.id);
  return !legacy || record.title !== "Deleted project" || record.photos.length > 0;
}

function conflict(): never {
  const error = new Error("ProjectChanged");
  error.name = "ConditionalCheckFailedException";
  throw error;
}

export async function permanentlyDeleteProject(input: ProjectRecord) {
  const legacy = projects.find((item) => item.id === input.id);
  let record = await getProjectRecord(input.id);
  if (!record) {
    if (input.version > 0 || !legacy) return { cleanupPending: false };
    // Never take the list of objects to delete from a client-supplied payload.
    record = {
      id: legacy.id,
      title: legacy.title,
      category: legacy.tag,
      location: "",
      description: legacy.description,
      status: "공개",
      photos: [{ src: legacy.image, alt: legacy.title }],
      version: 0,
    };
  }
  if (!record.deleted) {
    if (record.version !== input.version) conflict();
    record = await saveProject({ ...record, deleted: true });
  }
  try {
    const records = await listProjects();
    const used = new Set(
      records
        .filter((item) => !item.deleted)
        .flatMap((item) => item.photos.map((photo) => photo.src)),
    );
    const candidates = [...new Set(record.photos.map((photo) => photo.src))].filter(
      (src) => projectImagePathPattern.test(src) && !used.has(src),
    );
    for (const src of candidates) await deleteProjectImage(src.split("/").at(-1)!);
    await finalizeProjectDeletion(record, !!legacy);
    return { cleanupPending: false };
  } catch {
    // Keep the deletion record and photo list for an idempotent retry.
    return { cleanupPending: true };
  }
}
