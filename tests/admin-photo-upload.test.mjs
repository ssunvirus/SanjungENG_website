import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";
import { mergeAdminProjects } from "../src/lib/project-record.ts";
import { MAX_PROJECT_IMAGE_BYTES } from "../src/lib/project-images.ts";
import { applyProjectOrder, moveProjectInList } from "../src/lib/project-order.ts";
import { initialLegacyPhotos } from "../src/lib/legacy-project-photos.ts";

const require = createRequire(import.meta.url);
const source = ts.transpileModule(
  readFileSync(new URL("../src/components/admin/AdminWorkspace.tsx", import.meta.url), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  },
).outputText;
const uploadedSrc = "/api/admin/project-images/a83d4348-41b8-4a22-a6f0-3bec6e1fea81.png";
const record = {
  id: "empty-photo-test",
  title: "TEST",
  category: "냉동기",
  location: "",
  description: "",
  photos: [],
  status: "공개",
  version: 1,
};

async function setup(
  uploadResponse = { ok: true, json: async () => ({ src: uploadedSrc }) },
  initialRecord = record,
) {
  const slots = [];
  const calls = [];
  const effects = [];
  let cursor = 0;
  let firstRender = true;
  const hooks = {
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = initial;
      return [
        slots[index],
        (value) => {
          slots[index] = typeof value === "function" ? value(slots[index]) : value;
        },
      ];
    },
    useRef(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { current: initial };
      return slots[index];
    },
    useEffect(effect) {
      if (firstRender) effects.push(effect);
    },
  };
  const sandbox = {
    exports: {},
    Error,
    Array,
    Set,
    fetch: async (url, options) => {
      calls.push({ url, options });
      if (!options?.method) return { ok: true, json: async () => ({ projects: [initialRecord] }) };
      if (url.endsWith("project-images")) return uploadResponse;
      return {
        ok: true,
        json: async () => ({ project: { ...JSON.parse(options.body), version: 2 } }),
      };
    },
    require(name) {
      if (name === "./UnusedPhotoCleanup") return { default: "UnusedPhotoCleanup" };
      if (["./ProjectList", "./ProjectEditor", "./ProjectPhotos"].includes(name)) {
        const component = { ...sandbox, exports: {} };
        const code = ts.transpileModule(
          readFileSync(
            new URL(`../src/components/admin/${name.slice(2)}.tsx`, import.meta.url),
            "utf8",
          ),
          {
            compilerOptions: {
              module: ts.ModuleKind.CommonJS,
              target: ts.ScriptTarget.ES2022,
              jsx: ts.JsxEmit.ReactJSX,
            },
          },
        ).outputText;
        runInNewContext(code, component);
        return component.exports;
      }
      if (name === "react") return hooks;
      if (name === "react/jsx-runtime") return require(name);
      if (name === "next/image") return { default: "img" };
      if (name === "next/link") return { default: "a" };
      if (name === "lucide-react") return new Proxy({}, { get: (_, key) => String(key) });
      if (name.endsWith("projects/data")) return { projects: [] };
      if (name.endsWith("project-record")) return { mergeAdminProjects };
      if (name.endsWith("legacy-project-photos")) return { initialLegacyPhotos };
      if (name.endsWith("project-order")) return { applyProjectOrder, moveProjectInList };
      if (name.endsWith("project-images")) return { MAX_PROJECT_IMAGE_BYTES };
      if (name.endsWith(".css"))
        return { default: new Proxy({}, { get: (_, key) => String(key) }) };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  function render() {
    cursor = 0;
    const tree = expand(sandbox.exports.default());
    firstRender = false;
    return tree;
  }
  render();
  effects.forEach((effect) => effect());
  await flush();
  find(render(), (node) => node.props?.["aria-label"] === "TEST 수정").props.onClick();
  return { render, calls };
}
const flush = () => new Promise((resolve) => setImmediate(resolve));
function expand(tree) {
  if (Array.isArray(tree)) return tree.map(expand);
  if (!tree || typeof tree !== "object") return tree;
  if (typeof tree.type === "function") return expand(tree.type(tree.props));
  return { ...tree, props: { ...tree.props, children: expand(tree.props?.children) } };
}
function find(tree, predicate) {
  if (Array.isArray(tree)) {
    for (const child of tree) {
      const found = find(child, predicate);
      if (found) return found;
    }
  } else if (tree && typeof tree === "object") {
    if (predicate(tree)) return tree;
    return find(tree.props?.children, predicate);
  }
}
function text(node) {
  if (Array.isArray(node)) return node.map(text).join("");
  return node && typeof node === "object" ? text(node.props?.children) : String(node ?? "");
}
const picker = (tree) => find(tree, (node) => node.type === "input" && node.props.type === "file");
const feedback = (tree) => find(tree, (node) => node.props?.id === "photo-upload-feedback");

test("a saved case with zero photos can upload its first photo and persist it on edit", async () => {
  const ui = await setup();
  assert.match(text(feedback(ui.render())), /등록된 사진이 없습니다/);
  const file = new File([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])], "photo.png", {
    type: "image/png",
  });
  picker(ui.render()).props.onChange({ target: { files: [file] } });
  await flush();
  assert.ok(find(ui.render(), (node) => node.type === "img" && node.props.src === uploadedSrc));
  assert.match(text(feedback(ui.render())), /1장 추가/);
  find(
    ui.render(),
    (node) => node.type === "button" && text(node) === "수정사항 저장",
  ).props.onClick();
  await flush();
  const save = ui.calls.find(
    (call) => call.url === "/api/admin/projects" && call.options?.method === "POST",
  );
  const payload = JSON.parse(save.options.body);
  assert.equal(payload.id, record.id);
  assert.equal(payload.version, 1);
  assert.equal(payload.photos[0].src, uploadedSrc);
});
test("invalid photo selection reports an error next to the picker instead of appearing unchanged", async () => {
  const ui = await setup();
  picker(ui.render()).props.onChange({
    target: { files: [{ type: "image/png", size: MAX_PROJECT_IMAGE_BYTES + 1 }] },
  });
  await flush();
  assert.equal(feedback(ui.render()).props.role, "alert");
  assert.match(text(feedback(ui.render())), /3MB/);
  assert.equal(
    ui.calls.some((call) => call.url.endsWith("project-images")),
    false,
  );
});
test("upload failures appear next to the picker and a later selection is allowed", async () => {
  const ui = await setup({ ok: false, json: async () => ({ error: "다시 로그인해주세요." }) });
  const file = new File(["test"], "photo.png", { type: "image/png" });
  picker(ui.render()).props.onChange({ target: { files: [file] } });
  await flush();
  assert.match(text(feedback(ui.render())), /다시 로그인/);
  picker(ui.render()).props.onChange({ target: { files: [file] } });
  await flush();
  assert.equal(ui.calls.filter((call) => call.url.endsWith("project-images")).length, 2);
});

const orderedPhotos = [
  { src: "/images/first.jpg", alt: "첫 번째 사진 설명" },
  { src: "/images/second.jpg", alt: "두 번째 사진 설명" },
  { src: "/images/third.jpg", alt: "세 번째 사진 설명" },
];

test("photo move buttons keep captions attached and persist the new representative photo", async () => {
  const ui = await setup(undefined, { ...record, photos: orderedPhotos });
  find(ui.render(), (node) => node.props?.["aria-label"] === "사진 2 위로 이동").props.onClick();
  const first = find(ui.render(), (node) => node.props?.["aria-label"] === "사진 1 대체 설명");
  assert.equal(first.props.value, orderedPhotos[1].alt);
  assert.equal(
    find(ui.render(), (node) => node.props?.["aria-label"] === "사진 1 위로 이동").props.disabled,
    true,
  );
  assert.equal(
    find(ui.render(), (node) => node.props?.["aria-label"] === "사진 3 아래로 이동").props.disabled,
    true,
  );
  find(
    ui.render(),
    (node) => node.type === "button" && text(node) === "수정사항 저장",
  ).props.onClick();
  await flush();
  const save = ui.calls.find(
    (call) => call.url === "/api/admin/projects" && call.options?.method === "POST",
  );
  assert.deepEqual(JSON.parse(save.options.body).photos, [
    orderedPhotos[1],
    orderedPhotos[0],
    orderedPhotos[2],
  ]);
  assert.deepEqual(
    orderedPhotos.map((photo) => photo.src),
    ["/images/first.jpg", "/images/second.jpg", "/images/third.jpg"],
  );
  assert.equal(
    ui.calls.some((call) => call.url.endsWith("project-images")),
    false,
  );
});

test("dragging a photo moves it to the requested position without losing its description", async () => {
  const ui = await setup(undefined, { ...record, photos: orderedPhotos });
  const dataTransfer = {
    types: [],
    setData(type) {
      this.types.push(type);
    },
  };
  find(ui.render(), (node) => node.props?.["aria-label"] === "사진 1 순서 변경").props.onDragStart({
    dataTransfer,
  });
  let prevented = false;
  find(ui.render(), (node) => node.props?.["data-photo-index"] === 2).props.onDrop({
    dataTransfer,
    preventDefault() {
      prevented = true;
    },
  });
  assert.equal(prevented, true);
  assert.equal(
    find(ui.render(), (node) => node.props?.["aria-label"] === "사진 3 대체 설명").props.value,
    orderedPhotos[0].alt,
  );
  find(
    ui.render(),
    (node) => node.type === "button" && text(node) === "수정사항 저장",
  ).props.onClick();
  await flush();
  const save = ui.calls.find(
    (call) => call.url === "/api/admin/projects" && call.options?.method === "POST",
  );
  assert.deepEqual(JSON.parse(save.options.body).photos, [
    orderedPhotos[1],
    orderedPhotos[2],
    orderedPhotos[0],
  ]);
});
