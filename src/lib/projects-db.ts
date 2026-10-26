import "server-only";
import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
  PutItemCommand,
  DeleteItemCommand,
  type ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { parseProject, type ProjectRecord } from "./project-record";
import { parseProjectOrder, type ProjectOrder } from "./project-order";

// Reuse SDK connection pools within this server process. Credentials remain
// managed by the SDK's default provider and are not captured in application code.
const clients = new Map<string, DynamoDBClient>();

function database() {
  const TableName = process.env.PROJECTS_TABLE_NAME;
  const region = process.env.PROJECTS_AWS_REGION;
  if (!TableName || !region) throw new Error("DatabaseUnconfigured");
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

export async function getProjectOrder(): Promise<ProjectOrder> {
  const { TableName, client } = database();
  const result = await client.send(
    new GetItemCommand({ TableName, Key: { id: { S: "project-order" } }, ConsistentRead: true }),
  );
  if (!result.Item) return { ids: [], version: 0 };
  const order = parseProjectOrder(JSON.parse(result.Item.document.S!));
  if (
    result.Item.entityType.S !== "project-order" ||
    order.version !== Number(result.Item.version.N)
  )
    throw new Error("InvalidStoredOrder");
  return order;
}

export async function saveProjectOrder(input: ProjectOrder): Promise<ProjectOrder> {
  const order = parseProjectOrder(input);
  const { TableName, client } = database();
  const saved = { ids: order.ids, version: order.version + 1 };
  await client.send(
    new PutItemCommand({
      TableName,
      Item: {
        id: { S: "project-order" },
        entityType: { S: "project-order" },
        version: { N: String(saved.version) },
        document: { S: JSON.stringify(saved) },
      },
      ConditionExpression:
        order.version === 0
          ? "attribute_not_exists(id)"
          : "#version = :version AND entityType = :type",
      ...(order.version
        ? {
            ExpressionAttributeNames: { "#version": "version" },
            ExpressionAttributeValues: {
              ":version": { N: String(order.version) },
              ":type": { S: "project-order" },
            },
          }
        : {}),
    }),
  );
  return saved;
}

export async function getProjectRecord(id: string): Promise<ProjectRecord | null> {
  const { TableName, client } = database();
  const result = await client.send(
    new GetItemCommand({ TableName, Key: { id: { S: id } }, ConsistentRead: true }),
  );
  if (!result.Item) return null;
  const record = parseProject(JSON.parse(result.Item.document.S!));
  if (record.id !== id || record.version !== Number(result.Item.version.N))
    throw new Error("InvalidStoredProject");
  return record;
}

export async function finalizeProjectDeletion(project: ProjectRecord, keepMarker: boolean) {
  const { TableName, client } = database();
  const condition = {
    ConditionExpression: "#version = :version AND deleted = :deleted AND entityType = :type",
    ExpressionAttributeNames: { "#version": "version" },
    ExpressionAttributeValues: {
      ":version": { N: String(project.version) },
      ":deleted": { BOOL: true },
      ":type": { S: "project" },
    },
  };
  if (keepMarker) {
    const marker: ProjectRecord = {
      id: project.id,
      version: project.version + 1,
      deleted: true,
      title: "Deleted project",
      category: "기타",
      location: "",
      description: "",
      status: "공개",
      photos: [],
    };
    await client.send(
      new PutItemCommand({
        TableName,
        ...condition,
        Item: {
          id: { S: marker.id },
          version: { N: String(marker.version) },
          deleted: { BOOL: true },
          entityType: { S: "project" },
          document: { S: JSON.stringify(marker) },
        },
      }),
    );
  } else {
    await client.send(
      new DeleteItemCommand({ TableName, Key: { id: { S: project.id } }, ...condition }),
    );
  }
}

export async function listProjects(): Promise<ProjectRecord[]> {
  const { TableName, client } = database();
  const records: ProjectRecord[] = [];
  let cursor;
  do {
    const result: ScanCommandOutput = await client.send(
      new ScanCommand({
        TableName,
        ExclusiveStartKey: cursor,
        ConsistentRead: true,
        FilterExpression: "entityType = :type",
        ExpressionAttributeValues: { ":type": { S: "project" } },
      }),
    );
    for (const item of result.Items || []) {
      const record = parseProject(JSON.parse(item.document.S!));
      if (record.id !== item.id.S || record.version !== Number(item.version.N))
        throw new Error("InvalidStoredProject");
      records.push(record);
    }
    cursor = result.LastEvaluatedKey;
  } while (cursor);
  return records;
}

export async function saveProject(input: ProjectRecord): Promise<ProjectRecord> {
  const project = parseProject(input);
  const { TableName, client } = database();
  const saved = { ...project, version: project.version + 1 };
  await client.send(
    new PutItemCommand({
      TableName,
      Item: {
        id: { S: saved.id },
        entityType: { S: "project" },
        version: { N: String(saved.version) },
        deleted: { BOOL: saved.deleted === true },
        document: { S: JSON.stringify(saved) },
        updatedAt: { S: new Date().toISOString() },
      },
      ConditionExpression:
        project.version === 0
          ? "attribute_not_exists(id)"
          : "#version = :version AND entityType = :type AND (attribute_not_exists(deleted) OR deleted = :false)",
      ...(project.version
        ? {
            ExpressionAttributeNames: { "#version": "version" },
            ExpressionAttributeValues: {
              ":version": { N: String(project.version) },
              ":type": { S: "project" },
              ":false": { BOOL: false },
            },
          }
        : {}),
    }),
  );
  return saved;
}
