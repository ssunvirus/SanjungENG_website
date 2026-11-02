import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { projects } from "../src/components/projects/data.ts";
import * as legacy from "../src/lib/legacy-project-photos.ts";
import { publicPhotoPath } from "../src/lib/public-project-data.ts";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const cache = new Map();
function component(relative) {
  const file = path.resolve(root, relative);
  if (cache.has(file)) return cache.get(file);
  const source = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const sandbox = {
    exports: {},
    require(name) {
      if (name === "next/image")
        return { default: ({ src, alt }) => React.createElement("img", { src, alt }) };
      if (name === "next/link")
        return { default: ({ children, ...props }) => React.createElement("a", props, children) };
      if (name.endsWith("/projects/data")) return { projects };
      if (name.endsWith("/legacy-project-photos")) return legacy;
      if (name.endsWith("/public-project-data")) return { publicPhotoPath };
      if (["./ProjectPhotoGallery", "./AjuGallery"].includes(name))
        return component(path.relative(root, path.resolve(path.dirname(file), `${name}.tsx`)));
      if (name.startsWith("./") || name.startsWith("@/")) return { default: () => null };
      return require(name);
    },
  };
  runInNewContext(source, sandbox);
  cache.set(file, sandbox.exports);
  return sandbox.exports;
}
const SavedProjectDetail = component(
  "src/components/projects/detail/SavedProjectDetail.tsx",
).default;
const AjuGallery = component("src/components/projects/detail/AjuGallery.tsx").default;
const Gallery = component("src/components/projects/detail/ProjectPhotoGallery.tsx").default;
const base = projects.find((item) => item.id === "aju-pharmaceutical");
const record = {
  id: base.id,
  title: base.title,
  category: base.tag,
  location: "",
  description: "",
  status: "공개",
  version: 1,
  photosVersion: 1,
  photos: legacy.initialLegacyPhotos(base.id, base.image, base.title),
};

test("saved default Aju gallery displays a caption for every photo", () => {
  const html = renderToStaticMarkup(
    React.createElement(SavedProjectDetail, {
      project: record,
      legacyGallery: React.createElement(AjuGallery),
    }),
  );
  assert.equal((html.match(/<figcaption/g) || []).length, record.photos.length);
  for (const photo of record.photos) assert.ok(html.includes(photo.alt), photo.alt);
});

test("edited admin descriptions appear below the photos instead of only in alt text", () => {
  const updated = {
    ...record,
    photos: record.photos.map((photo, index) =>
      index === 1 ? { ...photo, alt: "관리자에서 수정한 사진 설명" } : photo,
    ),
  };
  const html = renderToStaticMarkup(
    React.createElement(SavedProjectDetail, {
      project: updated,
      legacyGallery: React.createElement(AjuGallery),
    }),
  );
  assert.match(html, /<figcaption[^>]*>관리자에서 수정한 사진 설명<\/figcaption>/);
});

test("explicit empty captions stay hidden and custom captions take precedence", () => {
  const html = renderToStaticMarkup(
    React.createElement(Gallery, {
      photos: [
        { src: "/images/one.jpg", alt: "대체 텍스트", caption: "" },
        { src: "/images/two.jpg", alt: "사진 대체 설명", caption: "직접 지정한 설명" },
      ],
    }),
  );
  assert.equal((html.match(/<figcaption/g) || []).length, 1);
  assert.match(html, /<figcaption[^>]*>직접 지정한 설명<\/figcaption>/);
});

test("saved description is authoritative even when it matches old alt and differs from a code caption", () => {
  const base = projects.find((item) => item.id === "pyeongtaek-food-factory-duct-cleaning");
  const original = legacy.legacyProjectPhotos[base.id][0];
  assert.notEqual(original.alt, original.caption);
  const project = {
    ...record,
    id: base.id,
    title: base.title,
    photos: [{ src: original.src, alt: original.alt }],
  };
  const html = renderToStaticMarkup(React.createElement(SavedProjectDetail, { project }));
  const caption = html.match(/<figcaption[^>]*>(.*?)<\/figcaption>/s)?.[1];
  assert.equal(caption, original.alt);
  const cleared = renderToStaticMarkup(
    React.createElement(SavedProjectDetail, {
      project: { ...project, photos: [{ src: original.src, alt: "" }] },
    }),
  );
  assert.equal(cleared.includes("<figcaption"), false);
});
