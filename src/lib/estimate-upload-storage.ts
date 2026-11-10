import "server-only";
import { createHash } from "node:crypto";
import { S3Client, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isSupportedAttachment } from "./estimate-attachments";
import { openUploadToken, sealUploadToken, type EstimateUpload } from "./estimate-upload-tokens";

const clients = new Map<string, S3Client>();
function storage() {
  const Bucket = process.env.ESTIMATE_ATTACHMENTS_BUCKET;
  const region = process.env.PROJECTS_AWS_REGION;
  if (!Bucket || !region) throw new Error("EstimateUploadsUnconfigured");
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

export async function createEstimateUpload(file: EstimateUpload) {
  const { Bucket, client } = storage();
  return createPresignedPost(client, {
    Bucket,
    Key: file.key,
    Expires: 600,
    Fields: {
      "Content-Type": file.type,
      "x-amz-checksum-algorithm": "SHA256",
      "x-amz-checksum-sha256": file.checksum,
      "x-amz-server-side-encryption": "AES256",
    },
    Conditions: [["content-length-range", file.size, file.size]],
  });
}

export async function estimateDownloadUrl(token: string, secret: string) {
  const files = await openUploadToken(token, secret, "download");
  if (files.length !== 1) throw new Error("InvalidDownloadToken");
  const file = files[0];
  const { Bucket, client } = storage();
  return getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket,
      Key: file.key,
      ResponseContentType: "application/octet-stream",
      ResponseContentDisposition: `attachment; filename="attachment"; filename*=UTF-8''${encodeURIComponent(file.name).replace(/['()*]/g, (value) => `%${value.charCodeAt(0).toString(16).toUpperCase()}`)}`,
      ResponseCacheControl: "private, no-store",
    }),
    { expiresIn: 60 },
  );
}

export async function verifyEstimateUploads(token: string, phone: string, secret: string) {
  const files = await openUploadToken(token, secret, "upload", phone);
  const { Bucket, client } = storage();
  // Validate actual stored bytes before granting any download capability. The POST
  // checksum policy prevents the same upload URL from replacing them with other bytes.
  for (const file of files) {
    const head = await client.send(new HeadObjectCommand({ Bucket, Key: file.key }));
    if (head.ContentLength !== file.size) throw new Error("UploadSizeMismatch");
    const result = await client.send(
      new GetObjectCommand({ Bucket, Key: file.key, IfMatch: head.ETag }),
    );
    if (!result.Body) throw new Error("UploadMissing");
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
      for await (const chunk of result.Body as AsyncIterable<Uint8Array>) {
        size += chunk.byteLength;
        if (size > file.size) throw new Error("UploadSizeMismatch");
        chunks.push(chunk);
      }
    } catch (error) {
      (result.Body as { destroy?: () => void }).destroy?.();
      throw error;
    }
    const bytes = Buffer.concat(chunks);
    if (
      size !== file.size ||
      createHash("sha256").update(bytes).digest("base64") !== file.checksum ||
      !(await isSupportedAttachment(new File([bytes], file.name, { type: file.type })))
    )
      throw new Error("InvalidUploadedAttachment");
  }
  return files;
}

export async function estimateAttachmentLinks(files: EstimateUpload[], secret: string) {
  const base = process.env.SITE_URL;
  if (!base || new URL(base).protocol !== "https:") throw new Error("InvalidSiteUrl");
  return Promise.all(
    files.map(async (file) => {
      const url = new URL("/api/estimate/attachments/download", base);
      url.searchParams.set("token", await sealUploadToken([file], secret, "download"));
      return `${file.name}: ${url.href}`;
    }),
  );
}
