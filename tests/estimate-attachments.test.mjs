import assert from "node:assert/strict";
import test from "node:test";
import { isSupportedAttachment } from "../src/lib/estimate-attachments.ts";

test("accepts a file whose name, MIME type, and bytes agree", async () => {
  const pdf = new File(["%PDF-1.7\n"], "drawing.pdf", { type: "application/pdf" });
  assert.equal(await isSupportedAttachment(pdf), true);
});

test("rejects a renamed executable even when its declared MIME type is allowed", async () => {
  const disguised = new File(["MZ executable"], "drawing.pdf", {
    type: "application/pdf",
  });
  assert.equal(await isSupportedAttachment(disguised), false);
});

test("rejects a valid image when its extension does not match its MIME type", async () => {
  const png = new File([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])], "image.jpg", {
    type: "image/png",
  });
  assert.equal(await isSupportedAttachment(png), false);
});
