import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import { loadAdminApi } from "./helpers/load-admin-api.mjs";
import {
  parseProjectOrder,
  applyProjectOrder,
  moveProjectInList,
} from "../src/lib/project-order.ts";
import { mergeAdminProjects } from "../src/lib/project-record.ts";
import { mergePublicProjects } from "../src/lib/public-project-data.ts";

const existing = ["a", "b", "c"].map((id) => ({
  id,
  title: id,
  category: "냉動공조",
  tag: "냉동기",
  description: "",
  image: "",
  imageTop: "0%",
  href: `/projects/${id}`,
}));
const saved = [
  {
    id: "new-case",
    title: "New",
    category: "냉동기",
    location: "",
    description: "",
    photos: [],
    version: 1,
  },
];

test("admin and public lists share the same persisted order including existing and new cases", () => {
  const ids = ["c", "new-case", "a", "b"];
  const admin = mergeAdminProjects(existing, saved, ids).map((item) => item.id);
  const publicIds = mergePublicProjects(existing, saved, ids).map((item) => item.id);
  assert.deepEqual(admin, ids);
  assert.deepEqual(publicIds, ids);
  assert.deepEqual(
    applyProjectOrder([{ id: "fresh" }, ...existing], ids).map((item) => item.id),
    ["fresh", "c", "a", "b"],
  );
});
test("filtered movement swaps visible neighbors without moving hidden cases", () => {
  const moved = moveProjectInList(existing, [existing[0], existing[2]], "c", -1);
  assert.deepEqual(
    moved.map((item) => item.id),
    ["c", "b", "a"],
  );
  assert.equal(moveProjectInList(existing, existing, "a", -1), existing);
  assert.equal(moveProjectInList(existing, existing, "c", 1), existing);
  assert.deepEqual(
    existing.map((item) => item.id),
    ["a", "b", "c"],
  );
});
test("order rejects duplicate IDs, invalid IDs, wrong versions and oversized lists", () => {
  for (const value of [
    { ids: ["a", "a"], version: 0 },
    { ids: ["../bad"], version: 0 },
    { ids: [], version: -1 },
    { ids: "a", version: 0 },
    { ids: Array(1001).fill("a"), version: 0 },
  ])
    assert.throws(() => parseProjectOrder(value));
});

const source = ts.transpileModule(
  readFileSync(new URL("../app/api/admin/projects/order/route.ts", import.meta.url), "utf8"),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  },
).outputText;
function setup(auth = true, conflict = false) {
  const calls = [];
  const sandbox = {
    exports: {},
    Response,
    Buffer,
    Error,
    Set,
    require(name) {
      if (name.endsWith("admin-api")) return loadAdminApi(sandbox.require("@/src/lib/admin-auth"));
      if (name.endsWith("admin-auth"))
        return {
          adminAuthConfig: () => ({ origin: "https://example.com" }),
          getAdminSession: async () => (auth ? {} : null),
        };
      if (name.endsWith("project-order")) return { parseProjectOrder };
      if (name.endsWith("projects/data")) return { projects: existing };
      if (name === "next/cache")
        return { revalidateTag: (...args) => calls.push(["cache", ...args]) };
      if (name.endsWith("projects-db"))
        return {
          listProjects: async () => {
            calls.push(["read"]);
            return saved;
          },
          saveProjectOrder: async (order) => {
            calls.push(["write", order]);
            if (conflict) {
              const error = new Error();
              error.name = "ConditionalCheckFailedException";
              throw error;
            }
            return { ...order, version: order.version + 1 };
          },
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return { ...sandbox.exports, calls };
}
function request(body, origin = "https://example.com") {
  return new Request("https://example.com/api/admin/projects/order", {
    method: "POST",
    headers: { origin, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}
test("reorder API blocks anonymous, cross-origin, invalid and oversized requests", async () => {
  const order = { ids: ["a", "b", "c", "new-case"], version: 0 };
  const anonymous = setup(false);
  assert.equal((await anonymous.POST(request(order))).status, 401);
  assert.deepEqual(anonymous.calls, []);
  const api = setup();
  assert.equal((await api.POST(request(order, "https://other.com"))).status, 403);
  assert.equal((await api.POST(request({ ...order, ids: ["a", "a"] }))).status, 400);
  assert.equal((await api.POST(request({ ids: ["a".repeat(70000)], version: 0 }))).status, 413);
  assert.deepEqual(api.calls, []);
});
test("reorder validates current list and invalidates cache only after a successful versioned save", async () => {
  const order = { ids: ["c", "b", "a", "new-case"], version: 0 };
  const api = setup();
  const response = await api.POST(request(order));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).order.version, 1);
  assert.deepEqual(
    api.calls.map((item) => item[0]),
    ["read", "write", "cache"],
  );
  const stale = setup(true, true);
  assert.equal((await stale.POST(request(order))).status, 409);
  assert.equal(
    stale.calls.some((item) => item[0] === "cache"),
    false,
  );
  const changed = setup();
  assert.equal((await changed.POST(request({ ...order, ids: ["a"] }))).status, 409);
  assert.equal(
    changed.calls.some((item) => item[0] === "write"),
    false,
  );
});
