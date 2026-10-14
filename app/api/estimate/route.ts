import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const maxDuration = 60;

const categories = ["냉동공조", "섬유덕트"];
const fail = (message: string, status: number) => Response.json({ message }, { status });

export async function POST(request: Request) {
    const origin = request.headers.get("origin");
    if (origin) {
        const requestUrl = new URL(request.url);
        const host = request.headers.get("host") || requestUrl.host;
        try {
            const originUrl = new URL(origin);
            if (origin !== originUrl.origin || originUrl.host !== host || originUrl.protocol !== requestUrl.protocol) {
                return fail("올바른 홈페이지에서 다시 요청해주세요.", 403);
            }
        } catch {
            return fail("올바른 홈페이지에서 다시 요청해주세요.", 403);
        }
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
    const company = get("company");
    const manager = get("manager");
    const phone = get("phone");
    const email = get("email");
    const category = get("category");
    const message = get("message");
    const location = get("location");
    if (company.length > 100) return fail("회사명은 100자 이내로 입력해주세요.", 400);
    if (!manager || manager.length > 100) return fail("담당자명을 입력해주세요. (100자 이내)", 400);
    if (!/^[+\d()\s-]{8,30}$/.test(phone) || phone.replace(/\D/g, "").length < 8) return fail("연락처를 확인해주세요.", 400);
    if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return fail("이메일 주소를 확인해주세요.", 400);
    if (!categories.includes(category)) return fail("문의 분야를 선택해주세요.", 400);
    if (!message) return fail("문의 내용을 입력해주세요.", 400);
    if (message.length > 3000) return fail("문의 내용은 3000자 이내로 입력해주세요.", 400);
    if (location.length > 300) return fail("현장 위치는 300자 이내로 입력해주세요.", 400);
    if (data.privacy !== true) return fail("개인정보 수집 및 이용에 동의해주세요.", 400);
    if (files.length > 3 || files.reduce((total, file) => total + file.size, 0) > 3 * 1024 * 1024) {
        return fail("첨부파일은 최대 3개, 전체 3MB 이내로 선택해주세요.", 400);
    }
    if (files.some((file) => !/\.(jpe?g|png|webp|pdf)$/i.test(file.name) || !["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type))) {
        return fail("JPG, PNG, WEBP 또는 PDF 파일을 선택해주세요.", 400);
    }

    const user = process.env.NAVER_SMTP_USER;
    const password = process.env.NAVER_SMTP_PASSWORD;
    const to = process.env.ESTIMATE_TO_EMAIL;
    if (!user || !password || !to) return fail("현재 온라인 문의 접수가 준비 중입니다. 전화로 문의해주세요.", 503);

    const transporter = nodemailer.createTransport({
        host: "smtp.naver.com",
        port: 465,
        secure: true,
        auth: { user, pass: password },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
        disableFileAccess: true,
        disableUrlAccess: true,
    });
    try {
        const attachments = await Promise.all(files.map(async (file) => ({
            filename: file.name.replace(/[\r\n/\\]/g, "_").slice(0, 150),
            content: Buffer.from(await file.arrayBuffer()),
            contentType: file.type,
        })));
        const result = await transporter.sendMail({
            from: { name: "산정엔지니어링 홈페이지", address: user },
            to: [to],
            subject: `[산정엔지니어링] ${category} 견적문의`,
            ...(email ? { replyTo: email } : {}),
            ...(attachments.length ? { attachments } : {}),
            text: [
                "산정엔지니어링 홈페이지 견적문의",
                "",
                `접수 일시: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })} (한국 시간)`,
                `문의 분야: ${category}`,
                `회사명: ${company || "미입력"}`,
                `담당자명: ${manager}`,
                `연락처: ${phone}`,
                `이메일: ${email || "미입력"}`,
                `현장 위치: ${location || "미입력"}`,
                `첨부파일: ${attachments.length ? attachments.map((file) => file.filename).join(", ") : "없음"}`,
                "",
                "문의 내용",
                message,
                "",
                "개인정보 수집 및 이용 동의: 동의",
            ].join("\n"),
        });
        if (!result.accepted.length || result.rejected.length) return fail("메일을 보내지 못했습니다. 잠시 후 다시 시도하거나 전화로 문의해주세요.", 502);
        return Response.json({ message: "문의가 접수되었습니다." });
    } catch {
        return fail("전송 중 연결 문제가 발생했습니다. 잠시 후 다시 시도해주세요.", 502);
    } finally {
        transporter.close();
    }
}

