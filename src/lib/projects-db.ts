import "server-only";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

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
