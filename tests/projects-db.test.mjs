import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(
  readFileSync(new URL("../src/lib/projects-db.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;

function setup(env, result, fail = false) {
  const calls = [];
  let destroyed = false;
  const sandbox = {
    exports: {},
    process: { env },
    console: { error() {} },
    require(name) {
      if (name === "server-only") return {};
      if (name === "@aws-sdk/client-dynamodb")
        return {
          DynamoDBClient: class {
            async send(command) {
              calls.push(command.input);
              if (fail) throw new Error("Denied");
              return result;
            }
            destroy() {
              destroyed = true;
            }
          },
          GetItemCommand: class {
            constructor(input) {
              this.input = input;
            }
          },
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return { check: sandbox.exports.checkProjectsConnection, calls, destroyed: () => destroyed };
}

test("missing configuration makes no database request", async () => {
  const db = setup({}, {});
  assert.equal(await db.check(), "unconfigured");
  assert.equal(db.calls.length, 0);
});

test("empty table is connected; fixed probe reads only id and never lists content", async () => {
  const db = setup(
    { PROJECTS_TABLE_NAME: "test-table", PROJECTS_AWS_REGION: "ap-southeast-2" },
    {},
  );
  assert.equal(await db.check(), "connected");
  assert.equal(db.calls[0].Key.id.S, "db-connection-test");
  assert.equal(db.calls[0].ProjectionExpression, "id");
  assert.equal(db.calls[0].TableName, "test-table");
  assert.equal(db.destroyed(), true);
});

test("probe item is detected without exposing its content", async () => {
  const db = setup(
    { PROJECTS_TABLE_NAME: "test", PROJECTS_AWS_REGION: "ap-southeast-2" },
    { Item: { id: { S: "db-connection-test" } } },
  );
  assert.equal(await db.check(), "test-found");
});

test("AWS failure returns a safe status and releases resources", async () => {
  const db = setup(
    { PROJECTS_TABLE_NAME: "test", PROJECTS_AWS_REGION: "ap-southeast-2" },
    {},
    true,
  );
  assert.equal(await db.check(), "error");
  assert.equal(db.destroyed(), true);
});
