import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const aliases = JSON.parse(
  readFileSync(new URL("../config/image-aliases.json", import.meta.url), "utf8"),
);

test("every removed duplicate resolves directly to an existing retained image", () => {
  assert.equal(Object.keys(aliases).length, 23);
  for (const [source, destination] of Object.entries(aliases)) {
    assert.ok(!existsSync(new URL(`../public${source}`, import.meta.url)), source);
    assert.ok(existsSync(new URL(`../public${destination}`, import.meta.url)), destination);
    assert.ok(!aliases[destination], `No rewrite chains: ${source}`);
    assert.ok(!source.includes("..") && !destination.includes(".."));
  }
});

test("Next rewrites retain old DB image URLs without redirects", async () => {
  const sandbox = {
    exports: {},
    require(name) {
      if (name === "./config/image-aliases.json") return { default: aliases };
      throw new Error(name);
    },
  };
  runInNewContext(
    ts.transpileModule(readFileSync(new URL("../next.config.ts", import.meta.url), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText,
    sandbox,
  );
  const rewrites = await sandbox.exports.default.rewrites();
  for (const [source, destination] of Object.entries(aliases))
    assert.ok(rewrites.some((rule) => rule.source === source && rule.destination === destination));
  assert.equal((await sandbox.exports.default.redirects()).length, 12);
});
