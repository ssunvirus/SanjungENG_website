import "server-only";
import { randomUUID } from "node:crypto";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { imageExtension, projectImageKeyPattern } from "./project-images";

// Keep a region-specific pool; never destroy a client another request may use.
const clients = new Map<string, S3Client>();

function storage() {
  const Bucket = process.env.PROJECTS_IMAGES_BUCKET;
  const region = process.env.PROJECTS_AWS_REGION;
  if (!Bucket?.trim() || !region?.trim()) {
    const error = new Error("ImagesUnconfigured");
    error.name = "ImagesUnconfigured";
    throw error;
  }
  let client = clients.get(region);
  if (!client) {
    client = new S3Client({
      region,
      maxAttempts: 2,
      requestHandler: { connectionTimeout: 3000, requestTimeout: 15000 },
    });
    clients.set(region, client);
  }
  return { Bucket, client };
}

// The S3 inventory survives interrupted uploads and needs no extra DB records.
export async function listProjectImages() {
  const { Bucket, client } = storage();
  const images: { key: string; modifiedAt: number; bytes: number }[] = [];
  let token: string | undefined;
  do {
    const page = await client.send(
      new ListObjectsV2Command({ Bucket, Prefix: "projects/", ContinuationToken: token }),
    );
    for (const item of page.Contents || []) {
      const key = item.Key?.slice("projects/".length);
      if (key && projectImageKeyPattern.test(key) && item.LastModified) {
        images.push({ key, modifiedAt: item.LastModified.getTime(), bytes: item.Size || 0 });
      }
    }
    // Fail closed rather than deleting against an incomplete inventory.
    if (images.length > 10000) throw new Error("ImageInventoryTooLarge");
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
    if (page.IsTruncated && !token) throw new Error("IncompleteImageInventory");
  } while (token);
  return images;
}

export async function deleteProjectImage(key: string) {
  if (!projectImageKeyPattern.test(key)) throw new Error("InvalidImageKey");
  const { Bucket, client } = storage();
  await client.send(new DeleteObjectCommand({ Bucket, Key: `projects/${key}` }));
}

export async function uploadProjectImage(bytes: Uint8Array, contentType: string) {
  const extension = imageExtension(contentType, bytes);
  if (!extension) throw new Error("InvalidImage");
  const key = `${randomUUID()}.${extension}`;
  const { Bucket, client } = storage();
  await client.send(
    new PutObjectCommand({
      Bucket,
      Key: `projects/${key}`,
      Body: bytes,
      ContentType: contentType,
      ServerSideEncryption: "AES256",
      IfNoneMatch: "*",
    }),
  );
  return `/api/admin/project-images/${key}`;
}

export async function readProjectImage(key: string) {
  if (!projectImageKeyPattern.test(key)) throw new Error("InvalidImageKey");
  const { Bucket, client } = storage();
  const result = await client.send(new GetObjectCommand({ Bucket, Key: `projects/${key}` }));
  if (!result.Body) throw new Error("ImageNotFound");
  // Consume the body fully so its connection returns to the shared pool.
  // Uploads are capped at 3MiB.
  const bytes = await result.Body.transformToByteArray();
  const type = key.endsWith(".jpg")
    ? "image/jpeg"
    : key.endsWith(".png")
      ? "image/png"
      : "image/webp";
  if (!imageExtension(type, bytes)) throw new Error("InvalidImage");
  return { bytes, type };
}
