import assert from "node:assert/strict";
import test from "node:test";
import { isSupportedAttachment } from "../src/lib/estimate-attachments.ts";
import { validateAttachments } from "../src/lib/estimate-rules.ts";

// A ZIP archive containing four photo entries; the archive counts as one attachment.
const photoZip = Buffer.from(
  "UEsDBBQAAAAIADl0UF1nKvAQBgAAAAQAAAALAAAAcGhvdG8tMS5qcGf7f+P/TQBQSwMEFAAAAAgAOXRQXWcq8BAGAAAABAAAAAsAAABwaG90by0yLmpwZ/t/4/9NAFBLAwQUAAAACAA5dFBdZyrwEAYAAAAEAAAACwAAAHBob3RvLTMuanBn+3/j/00AUEsDBBQAAAAIADl0UF1nKvAQBgAAAAQAAAALAAAAcGhvdG8tNC5qcGf7f+P/TQBQSwECFAAUAAAACAA5dFBdZyrwEAYAAAAEAAAACwAAAAAAAAAAAAAAgAEAAAAAcGhvdG8tMS5qcGdQSwECFAAUAAAACAA5dFBdZyrwEAYAAAAEAAAACwAAAAAAAAAAAAAAgAEvAAAAcGhvdG8tMi5qcGdQSwECFAAUAAAACAA5dFBdZyrwEAYAAAAEAAAACwAAAAAAAAAAAAAAgAFeAAAAcGhvdG8tMy5qcGdQSwECFAAUAAAACAA5dFBdZyrwEAYAAAAEAAAACwAAAAAAAAAAAAAAgAGNAAAAcGhvdG8tNC5qcGdQSwUGAAAAAAQABADkAAAAvAAAAAAA",
  "base64",
);

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

test("accepts ZIP photo archives with common browser and Windows MIME types", async () => {
  for (const type of [
    "application/zip",
    "application/x-zip-compressed",
    "application/octet-stream",
    "",
  ]) {
    const zip = new File([photoZip], "site-photos.ZIP", { type });
    assert.equal(validateAttachments([zip]), null);
    assert.equal(await isSupportedAttachment(zip), true);
  }
});

test("accepts an empty ZIP archive", async () => {
  const zip = new File(
    [Buffer.from("504b05060000000000000000000000000000000000000000", "hex")],
    "empty.zip",
    { type: "application/zip" },
  );
  assert.equal(await isSupportedAttachment(zip), true);
});

test("rejects renamed and truncated ZIP uploads", async () => {
  for (const type of [
    "application/zip",
    "application/x-zip-compressed",
    "application/octet-stream",
    "",
  ]) {
    assert.equal(
      await isSupportedAttachment(
        new File(["MZ executable renamed as ZIP"], "photos.zip", { type }),
      ),
      false,
    );
    assert.equal(
      await isSupportedAttachment(new File([photoZip.subarray(0, 4)], "photos.zip", { type })),
      false,
    );
  }
  const wrongType = new File([photoZip], "photos.zip", { type: "application/pdf" });
  assert.notEqual(validateAttachments([wrongType]), null);
  assert.equal(await isSupportedAttachment(wrongType), false);
});
