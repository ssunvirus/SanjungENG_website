import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(
  readFileSync(new URL("../../src/lib/admin-api.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;

// Use the actual shared helper while mocking only the external login boundary.
export function loadAdminApi(auth) {
  const sandbox = {
    exports: {},
    Response,
    Buffer,
    Error,
    require(name) {
      if (name === "server-only") return {};
      if (name === "./admin-auth") return auth;
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return sandbox.exports;
}
