import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { isIP } from "node:net";
import {
  DynamoDBClient,
  GetItemCommand,
  TransactWriteItemsCommand,
  type AttributeValue,
} from "@aws-sdk/client-dynamodb";

type Counter = { id: string; count: number; resetAt: number; version: number };
type Rule = { id: string; limit: number; windowMs: number };
export type EstimateSlot = { id: string; rules: { id: string; resetAt: number }[] };
const clients = new Map<string, DynamoDBClient>();
const COUNTER_TYPE = "estimate-rate-limit";
const SLOT_TYPE = "estimate-rate-slot";

function database() {
  const TableName = process.env.PROJECTS_TABLE_NAME;
  const region = process.env.PROJECTS_AWS_REGION;
  if (!TableName || !region) throw new Error("RateLimitUnconfigured");
  let client = clients.get(region);
  if (!client) {
    client = new DynamoDBClient({
      region,
      maxAttempts: 2,
      requestHandler: { connectionTimeout: 3000, requestTimeout: 5000 },
    });
    clients.set(region, client);
  }
  return { TableName, client };
}

function rulesFor(headers: Headers, phone: string): Rule[] {
  // Keep the trusted-edge convention: never use the client-supplied leftmost
  // forwarded address. Do not store raw phone numbers or IP addresses.
  const forwarded = headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  const real = headers.get("x-real-ip")?.trim();
  const ip = forwarded && isIP(forwarded) ? forwarded : real && isIP(real) ? real : null;
  const digest = (value: string) => createHash("sha256").update(value).digest("hex");
  return [
    { id: `estimate-limit-phone-${digest(phone.replace(/\D/g, ""))}`, limit: 3, windowMs: 3600000 },
    ...(ip ? [{ id: `estimate-limit-ip-${digest(ip)}`, limit: 5, windowMs: 600000 }] : []),
  ];
}

function parseCounter(id: string, item?: Record<string, AttributeValue>): Counter | null {
  if (!item) return null;
  const count = Number(item.count?.N);
  const resetAt = Number(item.resetAt?.N);
  const version = Number(item.version?.N);
  if (
    item.entityType?.S !== COUNTER_TYPE ||
    !Number.isSafeInteger(count) ||
    count < 0 ||
    !Number.isSafeInteger(resetAt) ||
    resetAt < 0 ||
    !Number.isSafeInteger(version) ||
    version < 1
  )
    throw new Error("InvalidRateLimitRecord");
  return { id, count, resetAt, version };
}

function counterPut(TableName: string, previous: Counter | null, next: Counter) {
  return {
    Put: {
      TableName,
      Item: {
        id: { S: next.id },
        entityType: { S: COUNTER_TYPE },
        count: { N: String(next.count) },
        resetAt: { N: String(next.resetAt) },
        version: { N: String(next.version) },
        expiresAt: { N: String(Math.ceil(next.resetAt / 1000)) },
      },
      ConditionExpression: previous
        ? "#version = :version AND resetAt = :resetAt AND entityType = :type"
        : "attribute_not_exists(id)",
      ...(previous
        ? {
            ExpressionAttributeNames: { "#version": "version" },
            ExpressionAttributeValues: {
              ":version": { N: String(previous.version) },
              ":resetAt": { N: String(previous.resetAt) },
              ":type": { S: COUNTER_TYPE },
            },
          }
        : {}),
    },
  };
}

function conflict(error: unknown) {
  const failure = error as { name?: string; CancellationReasons?: { Code?: string }[] };
  const reasons = failure?.CancellationReasons;
  return (
    failure?.name === "TransactionCanceledException" &&
    reasons?.some((reason) => reason.Code === "ConditionalCheckFailed") &&
    reasons.every(
      (reason) => !reason.Code || ["None", "ConditionalCheckFailed"].includes(reason.Code),
    )
  );
}

export async function takeEstimateSlot(
  headers: Headers,
  phone: string,
  now = Date.now(),
): Promise<{ retryAfter: number } | { ticket: EstimateSlot }> {
  const { TableName, client } = database();
  const rules = rulesFor(headers, phone);
  for (let attempt = 0; attempt < 4; attempt++) {
    const previous = await Promise.all(
      rules.map(async (rule) => {
        const result = await client.send(
          new GetItemCommand({ TableName, Key: { id: { S: rule.id } }, ConsistentRead: true }),
        );
        return parseCounter(rule.id, result.Item);
      }),
    );
    let retryAfter = 0;
    previous.forEach((counter, index) => {
      if (counter && counter.resetAt > now && counter.count >= rules[index].limit)
        retryAfter = Math.max(retryAfter, Math.ceil((counter.resetAt - now) / 1000));
    });
    if (retryAfter) return { retryAfter };
    const next = rules.map((rule, index) => {
      const counter = previous[index];
      return {
        id: rule.id,
        count: counter && counter.resetAt > now ? counter.count + 1 : 1,
        resetAt: counter && counter.resetAt > now ? counter.resetAt : now + rule.windowMs,
        version: (counter?.version || 0) + 1,
      };
    });
    const ticket: EstimateSlot = {
      id: `estimate-slot-${randomUUID()}`,
      rules: next.map(({ id, resetAt }) => ({ id, resetAt })),
    };
    try {
      await client.send(
        new TransactWriteItemsCommand({
          ClientRequestToken: randomUUID(),
          TransactItems: [
            ...next.map((counter, index) => counterPut(TableName, previous[index], counter)),
            {
              Put: {
                TableName,
                Item: {
                  id: { S: ticket.id },
                  entityType: { S: SLOT_TYPE },
                  expiresAt: {
                    N: String(
                      Math.ceil(Math.max(...next.map((counter) => counter.resetAt)) / 1000),
                    ),
                  },
                },
                ConditionExpression: "attribute_not_exists(id)",
              },
            },
          ],
        }),
      );
      return { ticket };
    } catch (error) {
      if (!conflict(error)) throw error;
    }
  }
  throw new Error("RateLimitBusy");
}

export async function releaseEstimateSlot(ticket: EstimateSlot) {
  const { TableName, client } = database();
  for (let attempt = 0; attempt < 4; attempt++) {
    const slot = await client.send(
      new GetItemCommand({ TableName, Key: { id: { S: ticket.id } }, ConsistentRead: true }),
    );
    if (!slot.Item) return; // Already refunded, or expired and removed by TTL.
    if (slot.Item.entityType?.S !== SLOT_TYPE) throw new Error("InvalidRateLimitSlot");
    const previous = await Promise.all(
      ticket.rules.map(async (rule) => {
        const result = await client.send(
          new GetItemCommand({ TableName, Key: { id: { S: rule.id } }, ConsistentRead: true }),
        );
        return parseCounter(rule.id, result.Item);
      }),
    );
    const updates = previous.flatMap((counter, index) =>
      counter && counter.resetAt === ticket.rules[index].resetAt && counter.count > 0
        ? [
            counterPut(TableName, counter, {
              ...counter,
              count: counter.count - 1,
              version: counter.version + 1,
            }),
          ]
        : [],
    );
    try {
      // Deleting the ticket and refunding its counters is atomic and idempotent.
      await client.send(
        new TransactWriteItemsCommand({
          ClientRequestToken: randomUUID(),
          TransactItems: [
            ...updates,
            {
              Delete: {
                TableName,
                Key: { id: { S: ticket.id } },
                ConditionExpression: "entityType = :type",
                ExpressionAttributeValues: { ":type": { S: SLOT_TYPE } },
              },
            },
          ],
        }),
      );
      return;
    } catch (error) {
      if (!conflict(error)) throw error;
    }
  }
  throw new Error("RateLimitRefundBusy");
}
