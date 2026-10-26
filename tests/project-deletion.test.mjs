import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import { projectImagePathPattern } from "../src/lib/project-images.ts";

const key = "a83d4348-41b8-4a22-a6f0-3bec6e1fea81.png";
const photo = { src: `/api/admin/project-images/${key}`, alt: "" };
const record = {
  id: "new-case",
  title: "Case",
  category: "기타",
  location: "",
  description: "Work",
  status: "공개",
  photos: [photo],
  version: 2,
};
function setup(initial = record, others = []) {
  let stored = initial;
  let fail = false;
  const calls = [];
  const source = ts.transpileModule(
    readFileSync(new URL("../src/lib/project-deletion.ts", import.meta.url), "utf8"),
    {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    },
  ).outputText;
  const sandbox = {
    exports: {},
    Error,
    Set,
    require(name) {
      if (name === "server-only") return {};
      if (name.endsWith("projects/data"))
        return {
          projects: [
            {
              id: "legacy",
              title: "Legacy",
              tag: "기타",
              description: "Original",
              image: "/images/legacy.jpg",
            },
          ],
        };
      if (name === "./project-images") return { projectImagePathPattern };
      if (name === "./project-images-s3")
        return {
          deleteProjectImage: async (key) => {
            calls.push(["s3", key]);
            if (fail) throw new Error("Denied");
          },
        };
      if (name === "./projects-db")
        return {
          getProjectRecord: async () => stored,
          listProjects: async () => [...others, ...(stored ? [stored] : [])],
          saveProject: async (p) => {
            calls.push(["stage"]);
            stored = { ...p, version: p.version + 1 };
            return stored;
          },
          finalizeProjectDeletion: async (p, legacy) => {
            calls.push(["finalize", legacy]);
            stored = legacy
              ? { ...p, title: "Deleted project", photos: [], description: "" }
              : null;
          },
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return {
    ...sandbox.exports,
    calls,
    stored: () => stored,
    fail: (value) => {
      fail = value;
    },
  };
}
test("delete uses the authoritative DB photo list, not forged client paths", async () => {
  const service = setup();
  const result = await service.permanentlyDeleteProject({
    ...record,
    photos: [{ src: "/images/forged.jpg", alt: "" }],
  });
  assert.equal(result.cleanupPending, false);
  assert.deepEqual(service.calls, [["stage"], ["s3", key], ["finalize", false]]);
  assert.equal(service.stored(), null);
});
test("shared images are retained and stale active versions cannot delete anything", async () => {
  const shared = setup(record, [{ ...record, id: "other-case" }]);
  assert.equal((await shared.permanentlyDeleteProject(record)).cleanupPending, false);
  assert.equal(
    shared.calls.some((call) => call[0] === "s3"),
    false,
  );
  const stale = setup();
  await assert.rejects(stale.permanentlyDeleteProject({ ...record, version: 1 }), {
    name: "ConditionalCheckFailedException",
  });
  assert.deepEqual(stale.calls, []);
});
test("failed S3 cleanup preserves retry information and a retry completes physical deletion", async () => {
  const service = setup();
  service.fail(true);
  assert.equal((await service.permanentlyDeleteProject(record)).cleanupPending, true);
  assert.equal(service.stored().deleted, true);
  assert.equal(service.stored().photos[0].src, photo.src);
  service.fail(false);
  assert.equal((await service.permanentlyDeleteProject(record)).cleanupPending, false);
  assert.equal(service.calls.filter((call) => call[0] === "stage").length, 1);
  assert.equal(service.stored(), null);
  assert.equal((await service.permanentlyDeleteProject(record)).cleanupPending, false);
});
test("legacy cases keep only a deletion marker and static public files are never deleted", async () => {
  const service = setup(null);
  assert.equal(
    (await service.permanentlyDeleteProject({ ...record, id: "legacy", version: 0 }))
      .cleanupPending,
    false,
  );
  assert.equal(service.stored().title, "Deleted project");
  assert.equal(service.stored().photos.length, 0);
  assert.equal(service.pendingProjectDeletion(service.stored()), false);
  assert.equal(
    service.calls.some((call) => call[0] === "s3"),
    false,
  );
});
