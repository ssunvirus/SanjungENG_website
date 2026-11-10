import { estimateLimits, readEstimateFields, validateAttachments } from "./estimate-rules";

type EstimateResult = { message?: string; received?: boolean };

export async function submitEstimate(fields: FormData, multipart = false): Promise<boolean> {
  let body: FormData | string = multipart
    ? fields
    : JSON.stringify(
        readEstimateFields({
          ...Object.fromEntries(fields),
          privacy: fields.get("privacy") === "on",
        }),
      );

  let sendMultipart = multipart;
  if (multipart) {
    const files = fields
      .getAll("attachments")
      .filter((value): value is File => value instanceof File && value.size > 0);
    const error = validateAttachments(files);
    if (error) throw new Error(error);
    if (
      files.reduce((total, file) => total + file.size, 0) > estimateLimits.directAttachmentBytes
    ) {
      if (!globalThis.crypto?.subtle)
        throw new Error("첨부파일을 안전하게 전송하려면 보안 연결(HTTPS)로 접속해주세요.");
      const input = readEstimateFields({
        ...Object.fromEntries(fields),
        privacy: fields.get("privacy") === "on",
      });
      const manifest = await Promise.all(
        files.map(async (file) => {
          const digest = new Uint8Array(
            await crypto.subtle.digest("SHA-256", await file.arrayBuffer()),
          );
          return {
            name: file.name.replace(/[\p{Cc}/\\]/gu, "_").slice(0, 150),
            size: file.size,
            type: file.type,
            checksum: btoa(String.fromCharCode(...digest)),
          };
        }),
      );
      const prepared = await fetch("/api/estimate/attachments/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, files: manifest }),
      });
      const result = await prepared.json().catch(() => null);
      if (
        !prepared.ok ||
        !result ||
        typeof result.token !== "string" ||
        !Array.isArray(result.uploads) ||
        result.uploads.length !== files.length
      )
        throw new Error(
          typeof result?.message === "string"
            ? result.message
            : "첨부 업로드를 준비하지 못했습니다. 잠시 후 다시 시도해주세요.",
        );
      for (let index = 0; index < files.length; index++) {
        const upload = result.uploads[index] as { url: string; fields: Record<string, string> };
        const form = new FormData();
        for (const [key, value] of Object.entries(upload.fields)) form.set(key, value);
        form.set("file", files[index]);
        let uploaded: Response;
        try {
          uploaded = await fetch(upload.url, { method: "POST", body: form, credentials: "omit" });
        } catch {
          throw new Error("첨부파일 업로드 연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
        if (!uploaded.ok)
          throw new Error("첨부파일을 올리지 못했습니다. 잠시 후 다시 시도해주세요.");
      }
      body = JSON.stringify({ ...input, uploadsToken: result.token });
      sendMultipart = false;
    }
  }
  const response = await fetch("/api/estimate", {
    method: "POST",
    headers: sendMultipart ? undefined : { "Content-Type": "application/json" },
    body,
  });
  const result: EstimateResult | null = await response.json().catch(() => null);

  if (!response.ok || !result) {
    throw new Error(
      typeof result?.message === "string"
        ? result.message
        : "전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
    );
  }
  return result.received === true;
}
