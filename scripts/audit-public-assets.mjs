import { readdir, readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const name = path.join(directory, entry.name);
        return entry.isDirectory() ? files(name) : [name];
      }),
    )
  ).flat();
}

// Read-only inventory. Duplicate files can preserve old URLs stored in the DB;
// neither a duplicate nor an absent source-code reference proves safe deletion.
const inventory = await Promise.all(
  (await files(path.join(root, "public"))).map(async (file) => {
    const size = (await stat(file)).size;
    return {
      file: path.relative(root, file).split(path.sep).join("/"),
      size,
      hash: createHash("sha256")
        .update(await readFile(file))
        .digest("hex"),
    };
  }),
);
const hashes = new Map();
for (const item of inventory) {
  const group = hashes.get(item.hash) || [];
  group.push(item);
  hashes.set(item.hash, group);
}
const duplicates = [...hashes.values()].filter((group) => group.length > 1);
console.log(
  JSON.stringify(
    {
      note: "Read-only local inventory. Check DB references and config/image-aliases.json before deleting assets. Does not inspect S3.",
      totalMiB: inventory.reduce((sum, item) => sum + item.size, 0) / 1048576,
      duplicateExtraMiB:
        duplicates.reduce((sum, group) => sum + group[0].size * (group.length - 1), 0) / 1048576,
      largest: inventory
        .toSorted((a, b) => b.size - a.size)
        .slice(0, 20)
        .map(({ file, size }) => ({ file, size })),
      duplicates: duplicates.map((group) => group.map(({ file }) => file)),
    },
    null,
    2,
  ),
);
