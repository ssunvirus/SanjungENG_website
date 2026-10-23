import assert from "node:assert/strict";
import test from "node:test";
import { parseProject } from "../src/lib/project-record.ts";
import { mergePublicProjects } from "../src/lib/public-project-data.ts";

const project = {
  id: "summary-test",
  title: "Project",
  category: "섬유덕트",
  location: "",
  description: "Detailed work description",
  photos: [],
  version: 0,
};

test("legacy records without summary remain readable and retain their card description", () => {
  const parsed = parseProject(project);
  assert.equal(parsed.summary, "");
  assert.equal(mergePublicProjects([], [parsed])[0].description, project.description);
});

test("summary is persisted separately and is used for cards without replacing detailed work", () => {
  const record = parseProject({ ...project, summary: "  Brief introduction  " });
  const restored = parseProject(JSON.parse(JSON.stringify(record)));
  assert.equal(restored.summary, "Brief introduction");
  assert.equal(restored.description, project.description);
  assert.equal(mergePublicProjects([], [restored])[0].description, "Brief introduction");
  assert.equal(
    mergePublicProjects([], [{ ...restored, summary: "   " }])[0].description,
    project.description,
  );
});

test("summary permits 50 characters and rejects oversized or non-text input", () => {
  assert.equal(parseProject({ ...project, summary: "a".repeat(50) }).summary.length, 50);
  for (const summary of ["a".repeat(51), null, 123, {}, []])
    assert.throws(() => parseProject({ ...project, summary }));
});
