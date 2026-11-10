export type EstimateDownloadLink = { name: string; url: string };

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );
}

export function buildEstimateEmail({
  details,
  message,
  links,
}: {
  details: readonly (readonly [string, string])[];
  message: string;
  links: readonly EstimateDownloadLink[];
}) {
  for (const link of links) {
    if (new URL(link.url).protocol !== "https:") throw new Error("InvalidDownloadUrl");
  }
  const title = "산정엔지니어링 홈페이지 견적문의";
  const heading = "첨부파일 다운로드 (접수 후 7일간 유효)";
  const note = "링크를 가진 사람은 파일을 다운로드할 수 있으니 외부에 공유하지 마세요.";
  const consent = "개인정보 수집 및 이용 동의: 동의";
  return {
    text: [
      title,
      "",
      ...details.map(([label, value]) => `${label}: ${value}`),
      "",
      "문의 내용",
      message,
      "",
      consent,
      ...(links.length
        ? ["", heading, ...links.map((link) => `${link.name}: ${link.url}`), note]
        : []),
    ].join("\n"),
    html: `<div lang="ko" style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#102d4a;max-width:720px">
      <h2 style="font-size:21px">${title}</h2>
      <table role="presentation" style="border-collapse:collapse;width:100%">${details
        .map(
          ([label, value]) =>
            `<tr><td style="padding:5px 16px 5px 0;vertical-align:top;white-space:nowrap;font-weight:bold">${escapeHtml(label)}</td><td style="padding:5px 0;overflow-wrap:anywhere">${escapeHtml(value).replace(/\r\n|\r|\n/g, "<br />")}</td></tr>`,
        )
        .join("")}</table>
      <h3 style="font-size:16px;margin-top:24px">문의 내용</h3>
      <div style="overflow-wrap:anywhere">${escapeHtml(message).replace(/\r\n|\r|\n/g, "<br />")}</div>
      <p style="font-size:12px;color:#64748b;margin-top:24px">${consent}</p>
      ${
        links.length
          ? `<h3 style="font-size:16px;margin-top:24px">${heading}</h3>
        <p style="color:#64748b">파일명을 클릭하면 다운로드됩니다.</p>
        <ul style="padding-left:22px">${links.map((link) => `<li style="margin-bottom:10px"><a href="${escapeHtml(link.url)}" style="color:#006eb8;text-decoration:underline;overflow-wrap:anywhere">${escapeHtml(link.name)}</a></li>`).join("")}</ul>
        <p style="font-size:12px;color:#64748b">${note}</p>`
          : ""
      }
    </div>`,
  };
}
