import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
function renderLayout(group) {
  const calls = [];
  const tracker = (name) => () => {
    calls.push(name);
    return null;
  };
  const sandbox = {
    exports: {},
    require(name) {
      if (name === "react" || name === "react/jsx-runtime") return require(name);
      if (name === "@/app/globals.css") return {};
      if (name.endsWith("site-layout-metadata")) return { metadata: {} };
      if (name.endsWith("SiteFrame")) return { default: ({ children }) => children };
      if (name.endsWith("NaverAnalytics")) return { default: tracker("naver") };
      if (name.endsWith("PhoneConversionTracking")) return { default: tracker("phone") };
      if (name === "@next/third-parties/google") return { GoogleAnalytics: tracker("google") };
      if (name === "next/script") return { default: tracker("ads") };
      throw new Error(name);
    },
  };
  runInNewContext(
    ts.transpileModule(
      readFileSync(new URL(`../app/(${group})/layout.tsx`, import.meta.url), "utf8"),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2022,
          jsx: ts.JsxEmit.ReactJSX,
        },
      },
    ).outputText,
    sandbox,
  );
  const html = renderToStaticMarkup(
    React.createElement(
      sandbox.exports.default,
      null,
      React.createElement("main", null, "Page content"),
    ),
  );
  return { calls, html };
}

test("management root renders its page without loading any analytics or conversion component", () => {
  const result = renderLayout("management");
  assert.match(result.html, /Page content/);
  assert.deepEqual(result.calls, []);
});

test("public root retains Google, Naver, ads and telephone conversion components", () => {
  const result = renderLayout("public");
  assert.match(result.html, /Page content/);
  assert.deepEqual(new Set(result.calls), new Set(["google", "naver", "ads", "phone"]));
});
