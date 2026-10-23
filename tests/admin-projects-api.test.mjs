import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { parseProject } from "../src/lib/project-record.ts";

const source = ts.transpileModule(
  readFileSync(new URL("../app/api/admin/projects/route.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;
function setup(authenticated = true, conflict = false) {
  const calls = [];
  const sandbox = {
    exports: {},
    Response,
    Error,
    Buffer,
    require(name) {
      if (name.endsWith("admin-auth"))
        return {
          adminAuthConfig: () => ({ origin: "https://example.com" }),
          getAdminSession: async () => (authenticated ? { id: "admin" } : null),
        };
      if (name.endsWith("project-record")) return { parseProject };
      if (name.endsWith("projects-db"))
        return {
          listProjects: async () => {
            calls.push("read");
            return [];
          },
          saveProject: async (p) => {
            calls.push("write");
            if (conflict) {
              const e = new Error();
              e.name = "ConditionalCheckFailedException";
              throw e;
            }
            return { ...p, version: p.version + 1 };
          },
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return { ...sandbox.exports, calls };
}
const project = {
  id: "test",
  title: "Test",
  category: "기타",
  location: "",
  description: "",
  photos: [],
  version: 0,
};
const request = (body = project, origin = "https://example.com") =>
  new Request("https://example.com/api/admin/projects", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(body),
  });

test("anonymous API cannot read or save records", async () => {
  const api = setup(false);
  assert.equal((await api.GET()).status, 401);
  assert.equal((await api.POST(request())).status, 401);
  assert.deepEqual(api.calls, []);
});
test("foreign origins, invalid content and oversized bodies never write", async () => {
  const api = setup();
  assert.equal((await api.POST(request(project, "https://other.com"))).status, 403);
  assert.equal((await api.POST(request({ ...project, title: "" }))).status, 400);
  assert.equal(
    (await api.POST(request({ ...project, description: "a".repeat(70000) }))).status,
    413,
  );
  assert.deepEqual(api.calls, []);
});
test("authenticated valid save succeeds with no-store and conflicts return 409", async () => {
  const api = setup();
  const response = await api.POST(request());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal((await response.json()).project.version, 1);
  assert.deepEqual(api.calls, ["write"]);
  assert.equal((await setup(true, true).POST(request())).status, 409);
});
