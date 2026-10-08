export const runtime = "nodejs";

const categories = ["냉동설비", "공조설비", "냉동공조", "섬유덕트", "유지보수"];
const fail = (message: string, status: number) => Response.json({ message }, { status });

export async function POST(request: Request) {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) {
        return fail("올바른 홈페이지에서 다시 요청해주세요.", 403);
    }
    const contentType = request.headers.get("content-type") || "";
    const multipart = contentType.includes("multipart/form-data");
    if (!multipart && !contentType.includes("application/json")) {
        return fail("잘못된 요청 형식입니다.", 415);
    }
    let data: Record<string, unknown>;
    let files: File[] = [];
    try {
        const limit = multipart ? 4 * 1024 * 1024 : 16000;
        const reader = request.body?.getReader();
        if (!reader) return fail("입력 내용을 확인해주세요.", 400);
        const chunks: Uint8Array[] = [];
        let size = 0;
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > limit) {
                await reader.cancel();
                return fail("문의 내용 또는 첨부파일 용량이 너무 큽니다.", 413);
            }
            chunks.push(value);
        }
        const body = Buffer.concat(chunks);
        if (multipart) {
            const fields = await new Response(body, { headers: { "Content-Type": contentType } }).formData();
            data = Object.fromEntries(fields);
            data.privacy = fields.get("privacy") === "on";
            files = fields.getAll("attachments").filter((file): file is File => file instanceof File && file.size > 0);
        } else {
            const parsed: unknown = JSON.parse(body.toString("utf8"));
            if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fail("입력 내용을 확인해주세요.", 400);
            data = parsed as Record<string, unknown>;
        }
    } catch {
        return fail("입력 내용을 확인해주세요.", 400);
    }
    const get = (key: string) => typeof data[key] === "string" ? (data[key] as string).trim() : "";
    const company = get("company"), manager = get("manager"), phone = get("phone");
    const email = get("email"), category = get("category"), message = get("message");
    const location = get("location");
    if (!company || company.length > 100 || !manager || manager.length > 100) return fail("업체명과 담당자명을 확인해주세요. (각 100자 이내)", 400);
    if (!/^[+\d()\s-]{8,30}$/.test(phone) || phone.replace(/\D/g, "").length < 8) return fail("연락처를 확인해주세요.", 400);
    if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return fail("이메일 주소를 확인해주세요.", 400);
    if (!categories.includes(category)) return fail("문의 분야를 선택해주세요.", 400);
    if (message.length > 3000) return fail("문의 내용은 3000자 이내로 입력해주세요.", 400);
    if (location.length > 300) return fail("현장 위치는 300자 이내로 입력해주세요.", 400);
    if (data.privacy !== true) return fail("개인정보 수집 및 이용에 동의해주세요.", 400);
    if (files.length > 3 || files.reduce((total, file) => total + file.size, 0) > 3 * 1024 * 1024) {
        return fail("첨부파일은 최대 3개, 전체 3MB 이내로 선택해주세요.", 400);
    }
    if (files.some((file) => !/\.(jpe?g|png|webp|pdf)$/i.test(file.name) || !["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type))) {
        return fail("JPG, PNG, WEBP 또는 PDF 파일을 선택해주세요.", 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.ESTIMATE_FROM_EMAIL;
    const to = process.env.ESTIMATE_TO_EMAIL;
    if (!apiKey || !from || !to) return fail("현재 온라인 문의 접수가 준비 중입니다. 전화로 문의해주세요.", 503);

    try {
        const attachments = await Promise.all(files.map(async (file) => ({
            filename: file.name.replace(/[\r\n/\\]/g, "_").slice(0, 150),
            content: Buffer.from(await file.arrayBuffer()).toString("base64"),
        })));
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                from, to: [to], subject: "[산정엔지니어링] 홈페이지 견적문의",
                ...(email ? { reply_to: email } : {}),
                ...(attachments.length ? { attachments } : {}),
                text: [`업체명: ${company}`, `담당자명: ${manager}`, `연락처: ${phone}`, `이메일: ${email || "미입력"}`, `문의 분야: ${category}`, `현장 위치: ${location || "미입력"}`, "", "현장 및 문의 내용:", message || "미입력", "", "개인정보 수집 및 이용 동의: 동의"].join("\n"),
            }),
            signal: AbortSignal.timeout(15000),
        });
        const result = await response.json();
        if (!response.ok || typeof result.id !== "string") return fail("메일을 보내지 못했습니다. 잠시 후 다시 시도하거나 전화로 문의해주세요.", 502);
        return Response.json({ message: "문의가 접수되었습니다." });
    } catch {
        return fail("전송 중 연결 문제가 발생했습니다. 잠시 후 다시 시도해주세요.", 502);
    }
}
