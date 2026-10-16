import { readEstimateFields } from "./estimate-rules";

type EstimateResult = { message?: string };

export async function submitEstimate(fields: FormData, multipart = false): Promise<void> {
  const body = multipart
    ? fields
    : JSON.stringify(
        readEstimateFields({
          ...Object.fromEntries(fields),
          privacy: fields.get("privacy") === "on",
        }),
      );

  const response = await fetch("/api/estimate", {
    method: "POST",
    headers: multipart ? undefined : { "Content-Type": "application/json" },
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
}
