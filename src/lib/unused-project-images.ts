import "server-only";
import { listProjects } from "./projects-db";
import { listProjectImages, deleteProjectImage } from "./project-images-s3";

const DAY = 24 * 60 * 60 * 1000;
export const CLEANUP_BATCH_SIZE = 20;

async function referencedImages() {
  // Include pending deletion records: their own retry process owns those files.
  return new Set(
    (await listProjects()).flatMap((record) => record.photos.map((photo) => photo.src)),
  );
}

export async function unusedProjectImages(now = Date.now()) {
  const [images, used] = await Promise.all([listProjectImages(), referencedImages()]);
  return images
    .filter(
      (image) =>
        Number.isFinite(image.modifiedAt) &&
        image.modifiedAt <= now - DAY &&
        !used.has(`/api/admin/project-images/${image.key}`),
    )
    .sort((a, b) => a.modifiedAt - b.modifiedAt || a.key.localeCompare(b.key));
}

export async function cleanupUnusedProjectImages(keys: string[]) {
  // Never delete arbitrary client paths; recheck S3 age and the authoritative DB.
  const eligible = new Set((await unusedProjectImages()).map((image) => image.key));
  let deleted = 0;
  let failed = 0;
  let skipped = 0;
  for (const key of [...new Set(keys)].slice(0, CLEANUP_BATCH_SIZE)) {
    if (!eligible.has(key)) {
      skipped++;
      continue;
    }
    // A photo may have been saved after the preview or the initial inventory read.
    const used = await referencedImages();
    if (used.has(`/api/admin/project-images/${key}`)) {
      skipped++;
      continue;
    }
    try {
      await deleteProjectImage(key);
      deleted++;
    } catch {
      // The object remains in S3 and will be found on the next inventory read.
      failed++;
    }
  }
  return { deleted, failed, skipped };
}
