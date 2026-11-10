import assert from "node:assert/strict";
import test from "node:test";
import { buildEstimateEmail } from "../src/lib/estimate-email-body.ts";

test("HTML mail displays clickable filenames instead of long token URLs, with a plain-text fallback", () => {
  const url = `https://example.com/api/estimate/attachments/download?token=${"x".repeat(600)}`;
  const body = buildEstimateEmail({
    details: [["담당자명", "테스트"]],
    message: "문의\n내용",
    links: [{ name: "도면.pdf", url }],
  });
  assert(body.html.includes(`href="${url}"`));
  assert.match(body.html, />도면.pdf<\/a>/);
  const visible = body.html.replace(/<[^>]*>/g, "");
  assert(!visible.includes(url));
  assert.match(body.html, /문의<br \/>내용/);
  assert(body.text.includes(`도면.pdf: ${url}`));
  assert.match(body.html, /7일/);
});

test("customer fields and filenames cannot inject HTML or link attributes", () => {
  const body = buildEstimateEmail({
    details: [["회사명", '<img src=x onerror="bad">']],
    message: '<script>bad()</script> & "quote"',
    links: [
      {
        name: '<b onclick="bad">도면</b>.pdf',
        url: "https://example.com/download?token=a&other=b",
      },
    ],
  });
  assert(!body.html.includes("<script>"));
  assert(!body.html.includes("<img"));
  assert(!body.html.includes("<b onclick"));
  assert(body.html.includes("&lt;script&gt;"));
  assert(body.html.includes("token=a&amp;other=b"));
  assert(body.text.includes("<script>bad()</script>"));
  assert.throws(() =>
    buildEstimateEmail({
      details: [],
      message: "",
      links: [{ name: "file", url: "javascript:bad()" }],
    }),
  );
});

test("ordinary attached-file inquiries have HTML and text without a download section", () => {
  const body = buildEstimateEmail({
    details: [["첨부파일", "사진.jpg"]],
    message: "수리 문의",
    links: [],
  });
  assert(!body.html.includes("<a "));
  assert(!body.text.includes("7일"));
  assert(body.html.includes("사진.jpg"));
});
