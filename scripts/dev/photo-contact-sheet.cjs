/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require("sharp"),
  fs = require("fs"),
  path = require("path");
const dir = process.argv[2];
if (!dir) throw new Error("Usage: node scripts/dev/photo-contact-sheet.cjs <image-directory>");
const files = fs.readdirSync(dir).filter((x) => /jpg$/i.test(x));
(async () => {
  let layers = [];
  for (let i = 0; i < files.length; i++) {
    let b = await sharp(path.join(dir, files[i]))
      .rotate()
      .resize(180, 135, { fit: "contain" })
      .toBuffer();
    layers.push({ input: b, left: (i % 5) * 200, top: Math.floor(i / 5) * 165 });
    layers.push({
      input: Buffer.from(
        `<svg width="200" height="25"><text x="2" y="18" font-size="12">${files[i].replace("KakaoTalk_20261022_", "")}</text></svg>`,
      ),
      left: (i % 5) * 200,
      top: Math.floor(i / 5) * 165 + 135,
    });
  }
  await sharp({
    create: {
      width: 1000,
      height: Math.ceil(files.length / 5) * 165,
      channels: 3,
      background: "white",
    },
  })
    .composite(layers)
    .jpeg()
    .toFile(require("node:os").tmpdir() + "/sanjung-contact-sheet.jpg");
})();
