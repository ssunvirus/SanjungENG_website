import assert from "node:assert/strict";
import test from "node:test";
import {
  readEstimateFields,
  validateEstimateFields,
  validateAttachments,
} from "../src/lib/estimate-rules.ts";

const inquiry = {
  manager: "시설 담당자",
  phone: "010-1234-5678",
  category: "냉동공조",
  message: "냉동기 점검 견적을 문의합니다.",
  privacy: true,
};

test("accepts an inquiry without optional company, email, location or attachments", () => {
  const fields = readEstimateFields({ ...inquiry, manager: ` ${inquiry.manager} ` });
  assert.equal(fields.manager, inquiry.manager);
  assert.equal(fields.company, "");
  assert.equal(fields.email, "");
  assert.equal(validateEstimateFields(fields), null);
  assert.equal(validateAttachments([]), null);
});

test("JSON and multipart fields normalize to the same inquiry", () => {
  const form = new FormData();
  for (const [name, value] of Object.entries(inquiry))
    form.set(name, name === "privacy" ? "on" : String(value));
  const fields = readEstimateFields({
    ...Object.fromEntries(form),
    privacy: form.get("privacy") === "on",
  });
  assert.deepEqual(fields, readEstimateFields(inquiry));
});

test("does not accept forged consent, unexpected categories or non-text contact fields", () => {
  for (const changed of [
    { privacy: "true" },
    { category: "unexpected" },
    { manager: { name: "test" } },
    { phone: 1012345678 },
  ]) {
    assert.notEqual(validateEstimateFields(readEstimateFields({ ...inquiry, ...changed })), null);
  }
});

test("preserves inquiry length boundaries", () => {
  const fields = readEstimateFields({
    ...inquiry,
    company: "a".repeat(100),
    message: "a".repeat(3000),
  });
  assert.equal(validateEstimateFields(fields), null);
  assert.notEqual(validateEstimateFields({ ...fields, company: `${fields.company}a` }), null);
  assert.notEqual(validateEstimateFields({ ...fields, message: `${fields.message}a` }), null);
});

test("enforces attachment count, combined size and allowed extensions", () => {
  const small = new File([new Uint8Array([1])], "photo.jpg", { type: "image/jpeg" });
  assert.equal(validateAttachments([small, small, small]), null);
  assert.notEqual(validateAttachments([small, small, small, small]), null);
  const full = new File([new Uint8Array(3 * 1024 * 1024)], "drawing.pdf", {
    type: "application/pdf",
  });
  assert.equal(validateAttachments([full]), null);
  assert.notEqual(validateAttachments([full, small]), null);
  assert.notEqual(validateAttachments([new File(["data"], "file.constructor")]), null);
});
