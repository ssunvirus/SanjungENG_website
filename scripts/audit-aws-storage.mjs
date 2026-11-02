// Read-only AWS inventory. Prints aggregate counts, never inquiry data or credentials.
import { DynamoDBClient, DescribeTimeToLiveCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import {
  S3Client,
  ListObjectsV2Command,
  ListObjectVersionsCommand,
  GetBucketVersioningCommand,
  GetBucketLifecycleConfigurationCommand,
} from "@aws-sdk/client-s3";

const option = (name) =>
  process.argv.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
const region = option("region") || process.env.PROJECTS_AWS_REGION;
const table = option("table") || process.env.PROJECTS_TABLE_NAME;
const bucket = option("bucket") || process.env.PROJECTS_IMAGES_BUCKET;
if (!region || !table || !bucket)
  throw new Error(
    "Provide --region=, --table=, --bucket= or the PROJECTS_* environment variables.",
  );
const options = {
  region,
  maxAttempts: 2,
  requestHandler: { connectionTimeout: 3000, requestTimeout: 10000 },
};
const db = new DynamoDBClient(options);
const s3 = new S3Client(options);
try {
  const ttl = (await db.send(new DescribeTimeToLiveCommand({ TableName: table })))
    .TimeToLiveDescription;
  let cursor;
  const references = new Set();
  let records = 0,
    expiredRateRecords = 0;
  do {
    const page = await db.send(
      new ScanCommand({
        TableName: table,
        ExclusiveStartKey: cursor,
        ProjectionExpression: "entityType, document, expiresAt",
      }),
    );
    for (const item of page.Items || []) {
      records++;
      if (
        ["estimate-rate-limit", "estimate-rate-slot"].includes(item.entityType?.S) &&
        Number(item.expiresAt?.N) <= Date.now() / 1000
      )
        expiredRateRecords++;
      if (item.entityType?.S === "project" && item.document?.S) {
        const record = JSON.parse(item.document.S);
        // Include deletion records; their cleanup retry still owns those objects.
        for (const photo of record.photos || []) {
          const key = photo.src?.match(/^\/api\/(?:admin\/)?project-images\/(.+)$/)?.[1];
          if (key) references.add(`projects/${key}`);
        }
      }
    }
    cursor = page.LastEvaluatedKey;
  } while (cursor);
  let token;
  let objects = 0,
    bytes = 0,
    oldUnreferenced = 0,
    oldUnreferencedBytes = 0;
  do {
    const page = await s3.send(
      new ListObjectsV2Command({ Bucket: bucket, Prefix: "projects/", ContinuationToken: token }),
    );
    for (const item of page.Contents || []) {
      objects++;
      bytes += item.Size || 0;
      if (
        item.LastModified &&
        item.LastModified.getTime() < Date.now() - 86400000 &&
        !references.has(item.Key)
      ) {
        oldUnreferenced++;
        oldUnreferencedBytes += item.Size || 0;
      }
    }
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
    if (page.IsTruncated && !token) throw new Error("IncompleteS3Inventory");
  } while (token);
  const versioning = await s3.send(new GetBucketVersioningCommand({ Bucket: bucket }));
  let previousVersions;
  try {
    let keyMarker;
    let versionIdMarker;
    let count = 0;
    let bytes = 0;
    let deleteMarkers = 0;
    do {
      const page = await s3.send(
        new ListObjectVersionsCommand({
          Bucket: bucket,
          Prefix: "projects/",
          KeyMarker: keyMarker,
          VersionIdMarker: versionIdMarker,
        }),
      );
      for (const item of page.Versions || []) {
        if (!item.IsLatest) {
          count++;
          bytes += item.Size || 0;
        }
      }
      deleteMarkers += page.DeleteMarkers?.length || 0;
      keyMarker = page.IsTruncated ? page.NextKeyMarker : undefined;
      versionIdMarker = page.IsTruncated ? page.NextVersionIdMarker : undefined;
      if (page.IsTruncated && !keyMarker) throw new Error("IncompleteVersionInventory");
    } while (keyMarker);
    previousVersions = { checked: true, count, totalMiB: bytes / 1048576, deleteMarkers };
  } catch (error) {
    previousVersions = { checked: false, error: error.name };
  }
  let lifecycle;
  try {
    const result = await s3.send(new GetBucketLifecycleConfigurationCommand({ Bucket: bucket }));
    lifecycle = result.Rules?.map((rule) => ({
      id: rule.ID,
      status: rule.Status,
      abortIncompleteMultipartUpload: rule.AbortIncompleteMultipartUpload,
      noncurrentVersionExpiration: rule.NoncurrentVersionExpiration,
    }));
  } catch (error) {
    if (error.name !== "NoSuchLifecycleConfiguration") throw error;
    lifecycle = [];
  }
  console.log(
    JSON.stringify(
      {
        region,
        table,
        bucket,
        ttl,
        ttlExpectedAttribute: "expiresAt",
        ttlMatches: ttl?.TimeToLiveStatus === "ENABLED" && ttl?.AttributeName === "expiresAt",
        records,
        expiredRateRecords,
        objects,
        totalMiB: bytes / 1048576,
        oldUnreferenced,
        oldUnreferencedMiB: oldUnreferencedBytes / 1048576,
        versioning: versioning.Status || "Not enabled",
        previousVersions,
        lifecycle,
        note: "No changes made. Current objects and previous versions are counted separately; unreferenced files require rechecking before deletion.",
      },
      null,
      2,
    ),
  );
} finally {
  db.destroy();
  s3.destroy();
}
