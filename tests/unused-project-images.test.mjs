import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import { loadAdminApi } from "./helpers/load-admin-api.mjs";
import { projectImageKeyPattern, imageExtension } from "../src/lib/project-images.ts";

const key = "a83d4348-41b8-4a22-a6f0-3bec6e1fea81.png";
const other = "b83d4348-41b8-4a22-a6f0-3bec6e1fea81.jpg";
const old = Date.now() - 48 * 60 * 60 * 1000;
const image = { key, modifiedAt: old, bytes: 1234 };
const record = { photos: [{ src: `/api/admin/project-images/${key}` }] };
function load(path, deps, extras = {}) {
  const sandbox = {
    exports: {},
    Response,
    Buffer,
    Error,
    Date,
    ...extras,
    require(name) {
      if (name.endsWith("admin-api")) return loadAdminApi(deps["@/src/lib/admin-auth"]);
      if (name === "server-only") return {};
      if (name in deps) return deps[name];
      throw new Error(name);
    },
  };
  runInNewContext(
    ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText,
    sandbox,
  );
  return sandbox.exports;
}
function service({
  images = [image],
  records = [],
  failDelete = false,
  failRead = false,
  afterRead,
} = {}) {
  const deleted = [];
  let reads = 0;
  const api = load("../src/lib/unused-project-images.ts", {
    "./projects-db": {
      listProjects: async () => {
        reads++;
        if (failRead) throw new Error("Denied");
        return afterRead ? afterRead(reads) : records;
      },
    },
    "./project-images-s3": {
      listProjectImages: async () => images,
      deleteProjectImage: async (key) => {
        if (failDelete) throw new Error("Denied");
        deleted.push(key);
      },
    },
  });
  return { ...api, deleted };
}

test("inventory excludes recent uploads, shared photos and pending project deletions", async () => {
  const api = service({
    images: [image, { ...image, key: other, modifiedAt: Date.now() }],
    records: [{ ...record, deleted: true }],
  });
  assert.equal((await api.unusedProjectImages()).length, 0);
  assert.equal((await service().unusedProjectImages()).length, 1);
});

test("cleanup deletes only server-verified old orphans and rechecks references after preview", async () => {
  const api = service();
  const result = await api.cleanupUnusedProjectImages([key, key, other, "../forged"]);
  assert.equal(result.deleted, 1);
  assert.equal(result.skipped, 2);
  assert.deepEqual(api.deleted, [key]);
  const attached = service({ afterRead: (read) => (read > 1 ? [record] : []) });
  assert.equal((await attached.cleanupUnusedProjectImages([key])).skipped, 1);
  assert.deepEqual(attached.deleted, []);
});

test("DB failure fails closed; S3 deletion failure leaves the object discoverable for retry", async () => {
  const denied = service({ failRead: true });
  await assert.rejects(denied.cleanupUnusedProjectImages([key]));
  assert.deepEqual(denied.deleted, []);
  const retry = service({ failDelete: true });
  assert.equal((await retry.cleanupUnusedProjectImages([key])).failed, 1);
  assert.equal((await retry.unusedProjectImages()).length, 1);
});

function route(authenticated = true) {
  const calls = [];
  const api = load("../app/api/admin/project-images/cleanup/route.ts", {
    "@/src/lib/admin-auth": {
      adminAuthConfig: () => ({ origin: "https://example.com" }),
      getAdminSession: async () => (authenticated ? {} : null),
    },
    "@/src/lib/project-images": { projectImageKeyPattern },
    "@/src/lib/unused-project-images": {
      CLEANUP_BATCH_SIZE: 20,
      unusedProjectImages: async () => {
        calls.push("read");
        return [image];
      },
      cleanupUnusedProjectImages: async (keys) => {
        calls.push(keys);
        return { deleted: keys.length, failed: 0, skipped: 0 };
      },
    },
  });
  return { ...api, calls };
}
const request = (body, origin = "https://example.com") =>
  new Request("https://example.com/api/admin/project-images/cleanup", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
test("cleanup API requires admin and same origin, limits bodies and rejects forged keys", async () => {
  const anonymous = route(false);
  assert.equal((await anonymous.GET()).status, 401);
  assert.equal((await anonymous.POST(request({ keys: [key] }))).status, 401);
  assert.deepEqual(anonymous.calls, []);
  const api = route();
  assert.equal((await api.POST(request({ keys: [key] }, "https://foreign.com"))).status, 403);
  assert.equal((await api.POST(request({ keys: ["../other-file"] }))).status, 400);
  assert.equal((await api.POST(request({ keys: Array(21).fill(key) }))).status, 400);
  assert.equal((await api.POST(request(" ".repeat(4097)))).status, 413);
  assert.deepEqual(api.calls, []);
  const preview = await api.GET();
  assert.equal(preview.headers.get("cache-control"), "no-store");
  assert.equal((await preview.json()).count, 1);
  assert.equal((await api.POST(request({ keys: [key] }))).status, 200);
});

test("S3 inventory reads every page and retains its shared client after errors", async () => {
  const calls = [];
  let closed = 0;
  let created = 0;
  let fail = false;
  class Command {
    constructor(input) {
      this.input = input;
    }
  }
  class Client {
    constructor() {
      created++;
    }
    async send(command) {
      calls.push(command.input);
      if (fail) throw new Error("Denied");
      return command.input.ContinuationToken
        ? {
            Contents: [
              { Key: `projects/${other}`, LastModified: new Date(old), Size: 5 },
              { Key: "projects/nested/not-a-photo" },
            ],
          }
        : {
            Contents: [{ Key: `projects/${key}`, LastModified: new Date(old), Size: 10 }],
            IsTruncated: true,
            NextContinuationToken: "next",
          };
    }
    destroy() {
      closed++;
    }
  }
  const api = load(
    "../src/lib/project-images-s3.ts",
    {
      "node:crypto": {},
      "@aws-sdk/client-s3": { S3Client: Client, ListObjectsV2Command: Command },
      "./project-images": { projectImageKeyPattern },
    },
    { process: { env: { PROJECTS_IMAGES_BUCKET: "test", PROJECTS_AWS_REGION: "test" } } },
  );
  assert.equal((await api.listProjectImages()).length, 2);
  assert.equal(calls[0].Prefix, "projects/");
  assert.equal(calls[1].ContinuationToken, "next");
  assert.equal(closed, 0);
  fail = true;
  await assert.rejects(api.listProjectImages());
  assert.equal(closed, 0);
  assert.equal(created, 1);
});

test("S3 reads, uploads, deletes and inventory share a client and fully consume response bodies", async () => {
  const instances = [];
  const requests = [];
  let consumed = 0;
  let fail = false;
  const png = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  class Command {
    constructor(input) {
      this.input = input;
    }
  }
  class Get extends Command {}
  class Client {
    constructor(options) {
      instances.push(options);
    }
    async send(command) {
      requests.push(command.input);
      if (fail) throw new Error("Unavailable");
      if (command instanceof Get)
        return {
          Body: {
            transformToByteArray: async () => {
              consumed++;
              return png;
            },
          },
        };
      return {};
    }
    destroy() {
      throw new Error("Must not close a shared client");
    }
  }
  const env = { PROJECTS_IMAGES_BUCKET: "first", PROJECTS_AWS_REGION: "ap-southeast-2" };
  const api = load(
    "../src/lib/project-images-s3.ts",
    {
      "node:crypto": { randomUUID: () => key.slice(0, -4) },
      "@aws-sdk/client-s3": {
        S3Client: Client,
        GetObjectCommand: Get,
        PutObjectCommand: Command,
        DeleteObjectCommand: Command,
        ListObjectsV2Command: Command,
      },
      "./project-images": { projectImageKeyPattern, imageExtension },
    },
    { process: { env } },
  );
  await assert.rejects(api.readProjectImage("../invalid"));
  assert.equal(instances.length, 0);
  const [photo, uploaded] = await Promise.all([
    api.readProjectImage(key),
    api.uploadProjectImage(png, "image/png"),
    api.deleteProjectImage(other),
    api.listProjectImages(),
  ]);
  assert.equal(photo.type, "image/png");
  assert.equal(uploaded, `/api/admin/project-images/${key}`);
  assert.equal(consumed, 1);
  assert.equal(instances.length, 1);
  assert.equal(instances[0].requestHandler.requestTimeout, 15000);
  fail = true;
  await assert.rejects(api.readProjectImage(key), /Unavailable/);
  fail = false;
  env.PROJECTS_IMAGES_BUCKET = "second";
  await api.readProjectImage(key);
  assert.equal(requests.at(-1).Bucket, "second");
  assert.equal(instances.length, 1);
  env.PROJECTS_AWS_REGION = "ap-northeast-2";
  await api.listProjectImages();
  assert.equal(instances.length, 2);
});
