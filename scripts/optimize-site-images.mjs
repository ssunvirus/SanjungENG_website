import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const apply = process.argv.includes("--apply");
const backupArg = process.argv.find((value) => value.startsWith("--backup="));
const backup = backupArg ? path.resolve(backupArg.slice(9)) : null;
if (apply && (!backup || !path.relative(root, backup).startsWith(".."))) {
  throw new Error("--apply requires an external --backup=<directory>");
}
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory() ? files(path.join(dir, entry.name)) : [path.join(dir, entry.name)],
      ),
    )
  ).flat();
}
const results = [];
const encoded = new Map();
for (const file of await files(path.join(root, "public/images"))) {
  // Keep logos, diagrams, certificate scans and their transparency untouched.
  if (!/\.jpe?g$/i.test(file) || file.includes(`${path.sep}resources${path.sep}`)) continue;
  const input = await readFile(file);
  if (input.length < 1024 * 1024) continue;
  const hash = createHash("sha256").update(input).digest("hex");
  let output = encoded.get(hash);
  if (!output) {
    output = await sharp(input)
      .rotate()
      .resize({ width: 2560, height: 2560, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 90, chromaSubsampling: "4:4:4", mozjpeg: true })
      .toBuffer();
    encoded.set(hash, output);
  }
  if (output.length >= input.length * 0.9) continue;
  const relative = path.relative(root, file);
  if (apply) {
    const original = path.join(backup, relative);
    await mkdir(path.dirname(original), { recursive: true });
    // Never overwrite a previous backup on a repeated run.
    await writeFile(original, input, { flag: "wx" });
    await writeFile(file, output);
  }
  results.push({
    file: relative.split(path.sep).join("/"),
    before: input.length,
    after: output.length,
  });
}
const report = {
  applied: apply,
  backup,
  files: results,
  savedMiB: results.reduce((n, item) => n + item.before - item.after, 0) / 1048576,
};
if (apply)
  await writeFile(path.join(backup, "images-report.json"), JSON.stringify(report, null, 2));
console.log(
  JSON.stringify({ applied: apply, files: results.length, savedMiB: report.savedMiB, backup }),
);
