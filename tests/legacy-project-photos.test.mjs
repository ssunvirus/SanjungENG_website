import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { projects } from "../src/components/projects/data.ts";
import { parseProject, mergeAdminProjects } from "../src/lib/project-record.ts";
import {
  legacyProjectPhotos,
  initialLegacyPhotos,
  completeLegacyProject,
  hasDefaultLegacyPhotos,
  legacyPhotoDimensions,
} from "../src/lib/legacy-project-photos.ts";

function seed(base) {
  return {
    id: base.id,
    title: base.title,
    category: base.tag,
    location: "",
    description: base.description,
    status: "공개",
    version: 1,
    photos: [{ src: base.image, alt: base.title }],
  };
}
test("all static galleries retain every photo and point to existing public assets", () => {
  const expectedCounts = [6, 9, 7, 10, 10, 4, 7, 11, 9, 8];
  projects.forEach((base, index) => {
    const gallery = legacyProjectPhotos[base.id];
    assert.equal(gallery.length, expectedCounts[index], base.id);
    for (const photo of gallery)
      assert.ok(existsSync(new URL(`../public${photo.src}`, import.meta.url)), photo.src);
  });
});
test("old card-photo records expand to the complete gallery while retaining uploaded photos and edits", () => {
  for (const base of projects) {
    const original = seed(base);
    const uploaded = {
      src: "/api/admin/project-images/a83d4348-41b8-4a22-a6f0-3bec6e1fea81.png",
      alt: "Added photo",
    };
    const repaired = completeLegacyProject(
      { ...original, photos: [...original.photos, uploaded] },
      base.image,
    );
    assert.equal(repaired.photosVersion, 1);
    assert.ok(repaired.photos.some((photo) => photo.src === uploaded.src));
    for (const photo of initialLegacyPhotos(base.id, base.image, base.title))
      assert.ok(
        repaired.photos.some((item) => item.src === photo.src),
        `${base.id}: ${photo.src}`,
      );
    assert.equal(original.photos.length, 1);
    assert.equal(new Set(repaired.photos.map((photo) => photo.src)).size, repaired.photos.length);
  }
});
test("saving a full photo list makes later intentional removal permanent rather than restoring photos", () => {
  const base = projects.find((project) => project.id === "aju-pharmaceutical");
  const repaired = completeLegacyProject(seed(base), base.image);
  const removedSrc = repaired.photos[1].src;
  const saved = parseProject({
    ...repaired,
    photos: repaired.photos.filter((photo) => photo.src !== removedSrc),
  });
  assert.equal(saved.photosVersion, 1);
  const reloaded = completeLegacyProject(saved, base.image);
  assert.equal(
    reloaded.photos.some((photo) => photo.src === removedSrc),
    false,
  );
  assert.deepEqual(completeLegacyProject({ ...saved, photos: [] }, base.image).photos, []);
  assert.equal(completeLegacyProject({ ...seed(base), photos: [] }, base.image).photos.length, 0);
  assert.equal(
    completeLegacyProject({ ...seed(base), deleted: true }, base.image).photos.length,
    1,
  );
});
test("admin merging repairs legacy seeds; unchanged gallery layout and portrait dimensions are preserved", () => {
  const base = projects.find((project) => project.id === "aju-pharmaceutical");
  const initial = {
    ...seed(base),
    photos: initialLegacyPhotos(base.id, base.image, base.title),
    photosVersion: 1,
  };
  const [record] = mergeAdminProjects([initial], [seed(base)]);
  assert.ok(hasDefaultLegacyPhotos(record, base.image, base.title));
  const added = { ...record, photos: [...record.photos, { src: "/images/extra.jpg", alt: "" }] };
  assert.equal(hasDefaultLegacyPhotos(added, base.image, base.title), false);
  const portrait = legacyPhotoDimensions(
    { src: "/images/projects/aju-pharmaceutical/1.jpg", alt: "Edited alt" },
    base.id,
    base.image,
  );
  assert.equal(portrait.width, 720);
  assert.equal(portrait.height, 960);
  assert.equal(portrait.alt, "Edited alt");
});

test("saved static photos retain captions including intentionally omitted captions", () => {
  const id = "pyeongtaek-food-factory-duct-cleaning";
  const gallery = legacyProjectPhotos[id];
  assert.ok(gallery[0].caption.includes("세탁을 요청"));
  for (const original of gallery) {
    const resolved = legacyPhotoDimensions({ src: original.src, alt: original.alt }, id);
    assert.equal(resolved.caption, original.caption);
  }
  assert.equal(gallery[4].caption, "");
  assert.ok(gallery[5].caption.includes("시운전 완료"));
});
