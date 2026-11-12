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
import { normalizeFabricDuctText } from "../src/lib/fabric-duct-label.ts";

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
      if (name.endsWith("/shared/WaveSurface"))
        return { default: ({ children }) => React.createElement(React.Fragment, null, children) };
      if (name.endsWith("/projects/data")) return { projects };
      if (name.endsWith("/legacy-project-photos")) return legacy;
      if (name.endsWith("/public-project-data")) return { publicPhotoPath };
      if (name.endsWith("/fabric-duct-label")) return { normalizeFabricDuctText };
      if (
        ["./ProjectPhotoGallery", "./ProjectOverview", "./AjuGallery", "./ProjectVideo"].includes(
          name,
        )
      )
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

test("admin-saved work description appears once between the title and information cards", () => {
  const description = "관리자에서 입력한 작업 상세 설명";
  const html = renderToStaticMarkup(
    React.createElement(SavedProjectDetail, {
      project: {
        id: "saved-description",
        title: "시공사례 제목",
        category: "냉동기",
        location: "안성시",
        description,
        photos: [],
        version: 1,
        status: "공개",
      },
    }),
  );
  assert.ok(html.indexOf(description) > html.indexOf("</h1>"));
  assert.ok(html.indexOf(description) < html.indexOf("<dl"));
  assert.equal(html.split(description).length - 1, 1);
});

test("old cached project headings and categories use the current public label", () => {
  const Overview = component("src/components/projects/detail/ProjectOverview.tsx").default;
  const old = "\uC12C\uC720\uB355\uD2B8";
  const html = renderToStaticMarkup(
    React.createElement(Overview, {
      title: `공장 ${old} 세탁`,
      category: old,
      description: `${old} 세척`,
      work: `${old} 탈착`,
    }),
  );
  assert.ok(!html.includes(old));
  assert.ok(html.includes("공장 패브릭덕트 세탁"));
});

test("old saved photo captions and alternative text use the current public label", () => {
  const old = "\uC12C\uC720\uB355\uD2B8";
  const html = renderToStaticMarkup(
    React.createElement(Gallery, {
      photos: [
        {
          src: "/images/example.jpg",
          alt: `${old} 전경`,
          caption: `${old} 세척`,
          width: 800,
          height: 600,
        },
      ],
    }),
  );
  assert.ok(!html.includes(old));
  assert.ok(html.includes("패브릭덕트 전경"));
  assert.ok(html.includes("패브릭덕트 세척"));
});
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

test("pharmaceutical case keeps its cover, ordered admin captions and video after an admin save", () => {
  const base = projects.find((item) => item.id === "pharmaceutical-cold-storage-fabric-duct");
  const photos = legacy.initialLegacyPhotos(base.id, base.image, base.title);
  assert.equal(photos.length, 8);
  assert.equal(photos[0].src, base.image);
  photos.forEach((photo, index) => {
    assert.ok(photo.src.endsWith(`photo-${String(index + 1).padStart(2, "0")}.jpg`));
    assert.equal(photo.alt, legacy.legacyProjectPhotos[base.id][index].caption);
    readFileSync(path.join(root, "public", photo.src));
  });
  readFileSync(path.join(root, "public", base.video.src));
  assert.equal(base.blogUrl, "https://blog.naver.com/sanjungeng/224463574892");
  const html = renderToStaticMarkup(
    React.createElement(SavedProjectDetail, {
      project: { ...record, id: base.id, title: base.title, photos },
    }),
  );
  assert.equal((html.match(/<figcaption/g) || []).length, 9);
  assert.ok(html.includes(base.video.src));
  assert.match(html, /preload="metadata"/);
  assert.equal(html.includes("autoPlay"), false);
});

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
