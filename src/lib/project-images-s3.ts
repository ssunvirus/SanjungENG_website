import "server-only";
import { randomUUID } from "node:crypto";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { imageExtension, projectImageKeyPattern } from "./project-images";

function storage() {
  const Bucket = process.env.PROJECTS_IMAGES_BUCKET;
  const region = process.env.PROJECTS_AWS_REGION;
  if (!Bucket?.trim() || !region?.trim()) {
    const error = new Error("ImagesUnconfigured");
    error.name = "ImagesUnconfigured";
    throw error;
  }
  return {
    Bucket,
    client: new S3Client({
      region,
      maxAttempts: 2,
      requestHandler: { connectionTimeout: 3000, requestTimeout: 15000 },
    }),
  };
}

export async function deleteProjectImage(key: string) {
  if (!projectImageKeyPattern.test(key)) throw new Error("InvalidImageKey");
  const { Bucket, client } = storage();
  try {
    await client.send(new DeleteObjectCommand({ Bucket, Key: `projects/${key}` }));
  } finally {
    client.destroy();
  }
}

export async function uploadProjectImage(bytes: Uint8Array, contentType: string) {
  const extension = imageExtension(contentType, bytes);
  if (!extension) throw new Error("InvalidImage");
  const key = `${randomUUID()}.${extension}`;
  const { Bucket, client } = storage();
  try {
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
  } finally {
    client.destroy();
  }
}

export async function readProjectImage(key: string) {
  if (!projectImageKeyPattern.test(key)) throw new Error("InvalidImageKey");
  const { Bucket, client } = storage();
  try {
    const result = await client.send(new GetObjectCommand({ Bucket, Key: `projects/${key}` }));
    if (!result.Body) throw new Error("ImageNotFound");
    // Consume the response before closing the client. Uploads are capped at 3MiB.
    const bytes = await result.Body.transformToByteArray();
    const type = key.endsWith(".jpg")
      ? "image/jpeg"
      : key.endsWith(".png")
        ? "image/png"
        : "image/webp";
    if (!imageExtension(type, bytes)) throw new Error("InvalidImage");
    return { bytes, type };
  } finally {
    client.destroy();
  }
}
