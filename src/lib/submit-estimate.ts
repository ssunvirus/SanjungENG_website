type EstimateResult = { message?: string };

export async function submitEstimate(fields: FormData, multipart = false): Promise<void> {
  const body = multipart
    ? fields
    : JSON.stringify({
        company: fields.get("company"),
        manager: fields.get("manager"),
        phone: fields.get("phone"),
        email: fields.get("email") ?? "",
        category: fields.get("category"),
        message: fields.get("message"),
        website: fields.get("website"),
        privacy: fields.get("privacy") === "on",
      });

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
