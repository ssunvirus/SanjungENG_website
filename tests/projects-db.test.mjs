import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { parseProject } from "../src/lib/project-record.ts";

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
      if (name === "./project-record") return { parseProject };
      if (name === "server-only") return {};
      if (name === "@aws-sdk/client-dynamodb")
        return {
          DynamoDBClient: class {
            async send(command) {
              calls.push(command.input);
              if (fail) throw new Error("Denied");
              return Array.isArray(result) ? result[calls.length - 1] : result;
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
          ScanCommand: class {
            constructor(input) {
              this.input = input;
            }
          },
          PutItemCommand: class {
            constructor(input) {
              this.input = input;
            }
          },
          DeleteItemCommand: class {
            constructor(input) {
              this.input = input;
            }
          },
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return {
    ...sandbox.exports,
    check: sandbox.exports.checkProjectsConnection,
    calls,
    destroyed: () => destroyed,
  };
}

test("missing configuration makes no database request", async () => {
  const db = setup({}, {});
  assert.equal(await db.check(), "unconfigured");
  assert.equal(db.calls.length, 0);
});

const project = {
  id: "test-project",
  title: "Test",
  category: "기타",
  location: "",
  description: "",
  status: "공개",
  photos: [],
  version: 0,
};
const config = { PROJECTS_TABLE_NAME: "test", PROJECTS_AWS_REGION: "ap-southeast-2" };

test("create requires absent id and update requires matching version", async () => {
  const db = setup(config, {});
  assert.equal((await db.saveProject(project)).version, 1);
  assert.equal(db.calls[0].ConditionExpression, "attribute_not_exists(id)");
  await db.saveProject({ ...project, version: 2 });
  assert.equal(db.calls[1].ExpressionAttributeValues[":version"].N, "2");
  assert.equal(JSON.parse(db.calls[1].Item.document.S).version, 3);
  assert.equal(db.destroyed(), true);
});

test("invalid input never reaches DynamoDB", async () => {
  const db = setup(config, {});
  await assert.rejects(db.saveProject({ ...project, title: "" }));
  await assert.rejects(
    db.saveProject({ ...project, photos: [{ src: "blob:temporary", alt: "" }] }),
  );
  assert.equal(db.calls.length, 0);
});

test("deletion uses PutItem with concurrency and anti-resurrection conditions", async () => {
  const db = setup(config, {});
  const removed = await db.saveProject({ ...project, version: 3, deleted: true });
  assert.equal(removed.deleted, true);
  assert.equal(removed.version, 4);
  assert.equal(db.calls[0].Item.deleted.BOOL, true);
  assert.equal(JSON.parse(db.calls[0].Item.document.S).deleted, true);
  assert.equal(db.calls[0].ExpressionAttributeValues[":version"].N, "3");
  assert.equal(db.calls[0].ExpressionAttributeValues[":false"].BOOL, false);
  assert.ok(db.calls[0].ConditionExpression.includes("attribute_not_exists(deleted)"));
});

test("final cleanup physically deletes new DB records and retains only a minimal legacy marker", async () => {
  const db = setup(config, {});
  const removed = { ...project, deleted: true, version: 4 };
  await db.finalizeProjectDeletion(removed, false);
  assert.equal(db.calls[0].Key.id.S, project.id);
  assert.equal(db.calls[0].ExpressionAttributeValues[":version"].N, "4");
  await db.finalizeProjectDeletion(removed, true);
  const marker = JSON.parse(db.calls[1].Item.document.S);
  assert.equal(marker.title, "Deleted project");
  assert.equal(marker.description, "");
  assert.deepEqual(marker.photos, []);
  assert.equal(marker.deleted, true);
});

test("list filters diagnostic records and reads all pages", async () => {
  const db = setup(config, [
    { LastEvaluatedKey: { id: { S: "page-1" } }, Items: [] },
    {
      Items: [
        {
          id: { S: project.id },
          version: { N: "1" },
          document: { S: JSON.stringify({ ...project, version: 1 }) },
        },
      ],
    },
  ]);
  assert.equal((await db.listProjects())[0].id, project.id);
  assert.equal(db.calls[0].ExpressionAttributeValues[":type"].S, "project");
  assert.equal(db.calls[0].ConsistentRead, true);
  assert.equal(db.calls.length, 2);
  assert.equal(db.calls[1].ExclusiveStartKey.id.S, "page-1");
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
