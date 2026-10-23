import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import * as images from "../src/lib/project-images.ts";
import { parseProject } from "../src/lib/project-record.ts";

const key = "a83d4348-41b8-4a22-a6f0-3bec6e1fea81.png";
const png = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
function load(path, modules) {
  const source = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const sandbox = {
    exports: {},
    Response,
    Buffer,
    Error,
    require(name) {
      if (name in modules) return modules[name];
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return sandbox.exports;
}
function api(auth = true, fail = false) {
  const calls = [];
  const modules = {
    "@/src/lib/admin-auth": {
      adminAuthConfig: () => ({ origin: "https://example.com" }),
      getAdminSession: async () => (auth ? {} : null),
    },
    "@/src/lib/project-images": images,
    "@/src/lib/project-images-s3": {
      uploadProjectImage: async () => {
        calls.push("upload");
        if (fail) throw new Error();
        return `/api/admin/project-images/${key}`;
      },
      readProjectImage: async () => {
        calls.push("read");
        return { bytes: png, type: "image/png" };
      },
    },
  };
  return {
    ...load("../app/api/admin/project-images/route.ts", modules),
    ...load("../app/api/admin/project-images/[key]/route.ts", modules),
    calls,
  };
}
function request(body = png, origin = "https://example.com", type = "image/png") {
  return new Request("https://example.com/api/admin/project-images", {
    method: "POST",
    headers: { origin, "content-type": type },
    body,
  });
}

test("images require allowed MIME, matching signature and bounded size", () => {
  assert.equal(images.imageExtension("image/png", png), "png");
  assert.equal(images.imageExtension("image/jpeg", png), null);
  assert.equal(images.imageExtension("image/svg+xml", png), null);
  assert.equal(
    images.imageExtension("image/png", new Uint8Array(images.MAX_PROJECT_IMAGE_BYTES + 1)),
    null,
  );
});
test("saved photos accept only static or generated admin image paths", () => {
  const record = {
    id: "test",
    title: "Test",
    category: "기타",
    location: "",
    description: "",
    version: 0,
    photos: [{ src: `/api/admin/project-images/${key}`, alt: "" }],
  };
  assert.equal(parseProject(record).photos[0].src, record.photos[0].src);
  for (const src of [
    "https://other.com/photo.png",
    "blob:test",
    "/api/admin/project-images/../../secret",
    "/images/%2e%2e/key",
  ]) {
    assert.throws(() => parseProject({ ...record, photos: [{ src, alt: "" }] }));
  }
});
test("anonymous and foreign-origin uploads cannot reach storage", async () => {
  const anonymous = api(false);
  assert.equal((await anonymous.POST(request())).status, 401);
  assert.equal((await anonymous.GET(request(), { params: Promise.resolve({ key }) })).status, 401);
  assert.deepEqual(anonymous.calls, []);
  const foreign = api();
  assert.equal((await foreign.POST(request(png, "https://other.com"))).status, 403);
  assert.deepEqual(foreign.calls, []);
});
test("invalid MIME, forged image and oversized streamed body are rejected before S3", async () => {
  const handler = api();
  assert.equal((await handler.POST(request(png, undefined, "image/svg+xml"))).status, 415);
  assert.equal((await handler.POST(request(new Uint8Array([1, 2, 3])))).status, 400);
  assert.equal(
    (await handler.POST(request(new Uint8Array(images.MAX_PROJECT_IMAGE_BYTES + 1)))).status,
    413,
  );
  assert.deepEqual(handler.calls, []);
});
test("upload success returns persistent path, and S3 errors are safe", async () => {
  const handler = api();
  const response = await handler.POST(request());
  assert.equal(response.status, 201);
  assert.equal((await response.json()).src, `/api/admin/project-images/${key}`);
  assert.equal((await api(true, true).POST(request())).status, 503);
});
test("authenticated reads validate keys and return private image response", async () => {
  const handler = api();
  assert.equal(
    (await handler.GET(request(), { params: Promise.resolve({ key: "secret" }) })).status,
    404,
  );
  assert.deepEqual(handler.calls, []);
  const response = await handler.GET(request(), { params: Promise.resolve({ key }) });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/png");
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});
