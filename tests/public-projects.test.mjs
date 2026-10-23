import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import { mergeAdminProjects } from "../src/lib/project-record.ts";
import {
  mergePublicProjects,
  publicPhotoPath,
  hasPublishedPhoto,
} from "../src/lib/public-project-data.ts";

const key = "a83d4348-41b8-4a22-a6f0-3bec6e1fea81.png";
const existing = [
  {
    id: "existing",
    href: "/projects/legacy-address",
    title: "Original",
    category: "냉동공조",
    tag: "냉동기",
    description: "Original description",
    image: "/images/original.jpg",
    imageTop: "-10%",
  },
];
const saved = {
  id: "new-case",
  title: "New case",
  category: "섬유덕트",
  location: "Seoul",
  description: "New description",
  photos: [{ src: `/api/admin/project-images/${key}`, alt: "Photo" }],
  version: 1,
  status: "공개",
};

test("public list merges saved records without duplicating or changing legacy addresses", () => {
  const result = mergePublicProjects(existing, [
    saved,
    { ...saved, id: "existing", title: "Updated" },
  ]);
  assert.equal(result.length, 2);
  assert.equal(result[0].href, "/projects/new-case");
  assert.equal(result[0].category, "섬유덕트");
  assert.equal(result[0].image, `/api/project-images/${key}`);
  assert.equal(result[1].title, "Updated");
  assert.equal(result[1].href, "/projects/legacy-address");
  assert.equal(existing[0].title, "Original");
  assert.deepEqual(mergePublicProjects(existing, []), existing);
});
test("public photos expose only paths referenced by saved records", () => {
  assert.equal(hasPublishedPhoto([saved], key), true);
  assert.equal(hasPublishedPhoto([], key), false);
  assert.equal(hasPublishedPhoto([saved], "other.png"), false);
  assert.equal(publicPhotoPath("/images/original.jpg"), "/images/original.jpg");
  assert.equal(mergePublicProjects([], [{ ...saved, photos: [] }])[0].image, "");
});

test("deleted cases stay excluded from both lists and public photo access after reload", () => {
  const removed = { ...saved, deleted: true };
  const legacyRemoved = { ...removed, id: "existing" };
  assert.deepEqual(mergePublicProjects(existing, [removed, legacyRemoved]), []);
  assert.deepEqual(mergeAdminProjects(existing, [removed, legacyRemoved]), []);
  assert.equal(hasPublishedPhoto([removed], key), false);
  assert.equal(hasPublishedPhoto([removed, { ...saved, id: "other" }], key), true);
});

test("DB failures never resurrect legacy cases, and deleted detail routes return not-found", async () => {
  let fail = true;
  const source = ts.transpileModule(
    readFileSync(new URL("../src/lib/public-projects.ts", import.meta.url), "utf8"),
    {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    },
  ).outputText;
  const sandbox = {
    exports: {},
    process: { env: { PROJECTS_TABLE_NAME: "test", PROJECTS_AWS_REGION: "ap-southeast-2" } },
    console: { error() {} },
    Error,
    require(name) {
      if (name === "server-only" || name === "next") return {};
      if (name === "next/cache") return { unstable_cache: (fn) => fn };
      if (name === "next/server") return { connection: async () => {} };
      if (name === "next/navigation")
        return {
          notFound() {
            throw new Error("NEXT_NOT_FOUND");
          },
        };
      if (name.endsWith("projects/data")) return { projects: existing };
      if (name === "./public-project-data") return { mergePublicProjects };
      if (name === "./projects-db")
        return {
          listProjects: async () => {
            if (fail) throw new Error("Unavailable");
            return [{ ...saved, deleted: true }];
          },
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  assert.deepEqual(Array.from(await sandbox.exports.publicProjectCards()), []);
  await assert.rejects(sandbox.exports.publicProject("new-case"));
  await assert.rejects(sandbox.exports.publicProjectRecords());
  fail = false;
  await assert.rejects(sandbox.exports.publicProject("new-case"), /NEXT_NOT_FOUND/);
});

function imageRoute(records, fail = false) {
  const calls = [];
  const source = ts.transpileModule(
    readFileSync(new URL("../app/api/project-images/[key]/route.ts", import.meta.url), "utf8"),
    {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    },
  ).outputText;
  const sandbox = {
    exports: {},
    Response,
    Buffer,
    require(name) {
      if (name.endsWith("public-project-data")) return { hasPublishedPhoto };
      if (name.endsWith("project-images"))
        return { projectImageKeyPattern: /^[0-9a-f-]{36}\.png$/ };
      if (name.endsWith("public-projects"))
        return {
          publicProjectRecords: async () => {
            if (fail) throw new Error();
            return records;
          },
        };
      if (name.endsWith("project-images-s3"))
        return {
          readProjectImage: async () => {
            calls.push("s3");
            return { bytes: new Uint8Array([1]), type: "image/png" };
          },
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return { GET: sandbox.exports.GET, calls };
}
test("anonymous public photo route serves saved photos but rejects orphan and malformed keys before S3", async () => {
  const missing = imageRoute([]);
  assert.equal((await missing.GET(null, { params: Promise.resolve({ key }) })).status, 404);
  assert.equal(
    (await missing.GET(null, { params: Promise.resolve({ key: "../secret" }) })).status,
    404,
  );
  assert.deepEqual(missing.calls, []);
  const published = imageRoute([saved]);
  const response = await published.GET(null, { params: Promise.resolve({ key }) });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/png");
  assert.deepEqual(published.calls, ["s3"]);
  const unavailable = imageRoute([], true);
  assert.equal((await unavailable.GET(null, { params: Promise.resolve({ key }) })).status, 503);
  assert.deepEqual(unavailable.calls, []);
});
