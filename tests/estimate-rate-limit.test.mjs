import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const source = ts.transpileModule(
  readFileSync(new URL("../src/lib/estimate-rate-limit.ts", import.meta.url), "utf8"),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  },
).outputText;
function backend() {
  return { items: new Map(), calls: [], conflict: 0, fail: false };
}
function worker(db, env = { PROJECTS_TABLE_NAME: "test", PROJECTS_AWS_REGION: "ap-southeast-2" }) {
  class Command {
    constructor(input) {
      this.input = input;
    }
  }
  const sandbox = {
    exports: {},
    process: { env },
    Error,
    require(name) {
      if (name === "server-only") return {};
      if (name.startsWith("node:")) return require(name);
      if (name === "@aws-sdk/client-dynamodb")
        return {
          GetItemCommand: Command,
          TransactWriteItemsCommand: Command,
          DynamoDBClient: class {
            async send({ input }) {
              db.calls.push(input);
              if (db.fail) throw new Error("Unavailable");
              if (!input.TransactItems)
                return { Item: structuredClone(db.items.get(input.Key.id.S)) };
              const reasons = input.TransactItems.map(({ Put, Delete }) => {
                const operation = Put || Delete;
                const current = db.items.get(Put ? Put.Item.id.S : Delete.Key.id.S);
                let valid;
                if (operation.ConditionExpression === "attribute_not_exists(id)") valid = !current;
                else if (Delete)
                  valid = current?.entityType.S === operation.ExpressionAttributeValues[":type"].S;
                else
                  valid =
                    current?.version?.N === operation.ExpressionAttributeValues[":version"].N &&
                    current?.resetAt?.N === operation.ExpressionAttributeValues[":resetAt"].N &&
                    current?.entityType.S === operation.ExpressionAttributeValues[":type"].S;
                return { Code: valid ? "None" : "ConditionalCheckFailed" };
              });
              if (db.conflict > 0) {
                db.conflict--;
                reasons[0].Code = "ConditionalCheckFailed";
              }
              if (reasons.some((reason) => reason.Code !== "None")) {
                const error = new Error("Conflict");
                error.name = "TransactionCanceledException";
                error.CancellationReasons = reasons;
                throw error;
              }
              for (const { Put, Delete } of input.TransactItems) {
                if (Put) db.items.set(Put.Item.id.S, structuredClone(Put.Item));
                else db.items.delete(Delete.Key.id.S);
              }
              return {};
            }
          },
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  return sandbox.exports;
}
const headers = new Headers({ "x-forwarded-for": "203.0.113.1, 198.51.100.20" });

test("phone quota survives worker restarts, preserves normalization and expires without TTL deletion", async () => {
  const db = backend();
  const first = worker(db);
  const next = worker(db);
  const now = 1000000;
  for (let i = 0; i < 3; i++)
    assert.ok((await first.takeEstimateSlot(headers, "010-1111-2222", now)).ticket);
  assert.equal((await next.takeEstimateSlot(headers, "01011112222", now)).retryAfter, 3600);
  assert.ok((await next.takeEstimateSlot(headers, "01011112222", now + 3600000)).ticket);
  const stored = JSON.stringify([...db.items.values()]);
  assert.ok(!stored.includes("01011112222") && !stored.includes("198.51.100.20"));
  assert.ok([...db.items.values()].every((item) => Number.isInteger(Number(item.expiresAt.N))));
});

test("shared IP quota uses the rightmost proxy address and preserves the ten-minute limit", async () => {
  const db = backend();
  const api = worker(db);
  const now = 2000000;
  for (let i = 0; i < 5; i++)
    assert.ok((await api.takeEstimateSlot(headers, `0109999000${i}`, now)).ticket);
  const spoofed = new Headers({ "x-forwarded-for": "192.0.2.123, 198.51.100.20" });
  assert.equal((await worker(db).takeEstimateSlot(spoofed, "01099990005", now)).retryAfter, 600);
  assert.ok((await api.takeEstimateSlot(headers, "01099990005", now + 600000)).ticket);
});

test("simultaneous independent workers cannot exceed quota or partially charge the other rule", async () => {
  const db = backend();
  const api = worker(db);
  const other = worker(db);
  const now = 3000000;
  for (let i = 0; i < 2; i++) await api.takeEstimateSlot(headers, "01011112222", now);
  const results = await Promise.all([
    api.takeEstimateSlot(headers, "01011112222", now),
    other.takeEstimateSlot(headers, "01011112222", now),
  ]);
  assert.equal(results.filter((result) => result.ticket).length, 1);
  assert.equal(results.filter((result) => result.retryAfter === 3600).length, 1);
  for (const item of db.items.values()) if (item.count) assert.equal(item.count.N, "3");
});

test("failed-mail refunds are idempotent and never decrement a new time window", async () => {
  const db = backend();
  const api = worker(db);
  const now = 4000000;
  const { ticket } = await api.takeEstimateSlot(headers, "01011112222", now);
  await Promise.all([api.releaseEstimateSlot(ticket), worker(db).releaseEstimateSlot(ticket)]);
  for (const item of db.items.values()) if (item.count) assert.equal(item.count.N, "0");
  await api.releaseEstimateSlot(ticket);
  const old = await api.takeEstimateSlot(headers, "01011112222", now);
  await api.takeEstimateSlot(headers, "01011112222", now + 3600000);
  await api.releaseEstimateSlot(old.ticket);
  for (const item of db.items.values()) if (item.count) assert.equal(item.count.N, "1");
});

test("missing configuration and unavailable DB fail closed; optimistic conflicts retry without double counting", async () => {
  const db = backend();
  await assert.rejects(worker(db, {}).takeEstimateSlot(headers, "01011112222"), /Unconfigured/);
  assert.equal(db.calls.length, 0);
  db.fail = true;
  await assert.rejects(worker(db).takeEstimateSlot(headers, "01011112222"), /Unavailable/);
  db.fail = false;
  db.conflict = 1;
  assert.ok((await worker(db).takeEstimateSlot(headers, "01011112222")).ticket);
  for (const item of db.items.values()) if (item.count) assert.equal(item.count.N, "1");
  const writes = db.calls.filter((call) => call.TransactItems);
  assert.ok(writes.every((call) => call.ClientRequestToken));
});
