import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import * as rules from "../src/lib/estimate-rules.ts";

const require = createRequire(import.meta.url);
const source = ts.transpileModule(
  readFileSync(new URL("../src/components/contact/InquiryForm.tsx", import.meta.url), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  },
).outputText;
function setup({ accepted = true } = {}) {
  const slots = [];
  const errors = [];
  const submissions = [];
  let cursor = 0;
  let status = "idle";
  class InquiryData extends FormData {
    constructor() {
      super();
      for (const [key, value] of Object.entries({
        manager: "담당자",
        phone: "01012345678",
        category: "냉동공조",
        message: "견적 문의",
        privacy: "on",
      }))
        this.set(key, value);
    }
  }
  const sandbox = {
    exports: {},
    File,
    FormData: InquiryData,
    require(name) {
      if (name === "react")
        return {
          useState(initial) {
            const index = cursor++;
            if (!(index in slots)) slots[index] = initial;
            return [
              slots[index],
              (next) => {
                slots[index] = typeof next === "function" ? next(slots[index]) : next;
              },
            ];
          },
          useRef(initial) {
            const index = cursor++;
            return (slots[index] ||= { current: initial });
          },
        };
      if (name === "react/jsx-runtime") return require(name);
      if (name === "next/image") return { default: () => null };
      if (name === "lucide-react") return { ArrowRight: () => null, Paperclip: () => null };
      if (name.endsWith("estimate-rules")) return rules;
      if (name.endsWith("use-estimate-form"))
        return {
          useEstimateForm: () => ({
            status,
            notice: "",
            showError: (error) => errors.push(error),
            clearNotice() {},
            send: async (fields, multipart) => {
              submissions.push({ fields, multipart });
              return accepted;
            },
          }),
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  function render() {
    cursor = 0;
    return sandbox.exports.default();
  }
  function all(node) {
    if (Array.isArray(node)) return node.flatMap(all);
    if (!node || typeof node !== "object" || !node.props) return [];
    return [node, ...all(node.props.children)];
  }
  function find(predicate) {
    return all(render()).find(predicate);
  }
  const drop = (files) =>
    find((node) => node.props.onDrop).props.onDrop({
      preventDefault() {},
      dataTransfer: { files },
    });
  const select = (files) =>
    find((node) => node.props.id === "inquiry-files").props.onChange({
      target: { files, value: "selection" },
    });
  const names = () =>
    all(render())
      .filter((node) => node.type === "li")
      .map((node) => node.props.children[0].props.children);
  const submit = () =>
    render().props.onSubmit({ preventDefault() {}, currentTarget: { reset() {} } });
  return {
    errors,
    submissions,
    drop,
    select,
    names,
    submit,
    find,
    setStatus: (value) => {
      status = value;
    },
  };
}
const photo = (name, size = 10) =>
  new File([new Uint8Array(size)], name, { type: "image/jpeg", lastModified: 1 });

test("dragged and picked files accumulate, deduplicate and are submitted together", async () => {
  const api = setup();
  const first = photo("first.jpg");
  api.drop([first]);
  api.select([photo("second.jpg")]);
  api.drop([first]);
  assert.deepEqual(api.names(), ["first.jpg", "second.jpg"]);
  await api.submit();
  assert.equal(api.submissions[0].multipart, true);
  assert.deepEqual(
    api.submissions[0].fields.getAll("attachments").map((file) => file.name),
    ["first.jpg", "second.jpg"],
  );
  assert.deepEqual(api.names(), []);
});

test("count, combined size and unsupported drops preserve previously selected files", () => {
  const api = setup();
  api.select(Array.from({ length: 5 }, (_, index) => photo(`${index}.jpg`)));
  api.drop([photo("sixth.jpg")]);
  assert.equal(api.names().length, 5);
  assert.match(api.errors.at(-1), /5개/);
  const size = setup();
  size.drop([photo("existing.jpg")]);
  size.drop([photo("large.jpg", 20 * 1024 * 1024)]);
  assert.deepEqual(size.names(), ["existing.jpg"]);
  const type = setup();
  type.drop([photo("existing.jpg")]);
  type.drop([new File(["unsafe"], "program.exe", { type: "application/octet-stream" })]);
  assert.deepEqual(type.names(), ["existing.jpg"]);
  assert.equal(type.errors.length, 1);
});

test("files can be removed, remain after failed submission and cannot change while sending", async () => {
  const api = setup({ accepted: false });
  api.drop([photo("first.jpg"), photo("second.jpg")]);
  api.find((node) => node.props["aria-label"] === "first.jpg 첨부 삭제").props.onClick();
  assert.deepEqual(api.names(), ["second.jpg"]);
  await api.submit();
  assert.deepEqual(api.names(), ["second.jpg"]);
  api.setStatus("sending");
  api.drop([photo("third.jpg")]);
  assert.deepEqual(api.names(), ["second.jpg"]);
  assert.equal(api.find((node) => node.props.id === "inquiry-files").props.disabled, true);
});
