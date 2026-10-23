import "server-only";
import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
  PutItemCommand,
  type ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { parseProject, type ProjectRecord } from "./project-record";

function database() {
  const TableName = process.env.PROJECTS_TABLE_NAME;
  const region = process.env.PROJECTS_AWS_REGION;
  if (!TableName || !region) throw new Error("DatabaseUnconfigured");
  const client = new DynamoDBClient({
    region,
    maxAttempts: 2,
    requestHandler: { connectionTimeout: 3000, requestTimeout: 5000 },
  });
  return { TableName, client };
}

export async function listProjects(): Promise<ProjectRecord[]> {
  const { TableName, client } = database();
  try {
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
  } finally {
    client.destroy();
  }
}

export async function saveProject(input: ProjectRecord): Promise<ProjectRecord> {
  const project = parseProject(input);
  const { TableName, client } = database();
  const saved = { ...project, version: project.version + 1 };
  try {
    await client.send(
      new PutItemCommand({
        TableName,
        Item: {
          id: { S: saved.id },
          entityType: { S: "project" },
          version: { N: String(saved.version) },
          document: { S: JSON.stringify(saved) },
          updatedAt: { S: new Date().toISOString() },
        },
        ConditionExpression:
          project.version === 0
            ? "attribute_not_exists(id)"
            : "#version = :version AND entityType = :type",
        ...(project.version
          ? {
              ExpressionAttributeNames: { "#version": "version" },
              ExpressionAttributeValues: {
                ":version": { N: String(project.version) },
                ":type": { S: "project" },
              },
            }
          : {}),
      }),
    );
    return saved;
  } finally {
    client.destroy();
  }
}

export type ProjectsConnection = "unconfigured" | "connected" | "test-found" | "error";

// Read only one fixed diagnostic item; never expose arbitrary records before admin auth exists.
export async function checkProjectsConnection(): Promise<ProjectsConnection> {
  const tableName = process.env.PROJECTS_TABLE_NAME;
  const region = process.env.PROJECTS_AWS_REGION;
  if (!tableName || !region) return "unconfigured";

  const client = new DynamoDBClient({
    region,
    maxAttempts: 2,
    requestHandler: { connectionTimeout: 3000, requestTimeout: 5000 },
  });
  try {
    const result = await client.send(
      new GetItemCommand({
        TableName: tableName,
        Key: { id: { S: "db-connection-test" } },
        ProjectionExpression: "id",
      }),
    );
    return result.Item ? "test-found" : "connected";
  } catch (error) {
    console.error(
      "Projects DB connection failed:",
      error instanceof Error ? error.name : "UnknownError",
    );
    return "error";
  } finally {
    client.destroy();
  }
}
