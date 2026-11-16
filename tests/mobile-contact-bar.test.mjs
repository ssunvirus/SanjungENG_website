import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const code = ts.transpileModule(
  readFileSync(new URL("../src/components/layout/MobileContactBar.tsx", import.meta.url), "utf8"),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;

function setup() {
  const states = [];
  let stateIndex = 0;
  const effects = [];
  let intersection;
  let mutation;
  let disconnected = 0;
  let menu = false;
  const frames = [];
  const document = new EventTarget();
  const viewport = new EventTarget();
  Object.assign(viewport, { height: 800, scale: 1 });
  const form = {
    isConnected: true,
    getBoundingClientRect: () => ({ top: 1000, bottom: 1600 }),
    getClientRects: () => [{}],
  };
  Object.assign(document, {
    body: {},
    activeElement: null,
    querySelectorAll: () => [form],
    getElementById: () => (menu ? {} : null),
  });
  class Input {
    matches() {
      return true;
    }
  }
  const sandbox = {
    exports: {},
    document,
    HTMLElement: Input,
    window: { innerHeight: 800, visualViewport: viewport },
    requestAnimationFrame: (fn) => {
      frames.push(fn);
      return frames.length;
    },
    cancelAnimationFrame: () => {},
    IntersectionObserver: class {
      constructor(fn) {
        intersection = fn;
      }
      observe() {}
      unobserve() {}
      disconnect() {
        disconnected++;
      }
    },
    MutationObserver: class {
      constructor(fn) {
        mutation = fn;
      }
      observe() {}
      disconnect() {
        disconnected++;
      }
    },
    require(name) {
      if (name === "react")
        return {
          useState: (initial) => {
            const index = stateIndex++;
            if (!(index in states)) states[index] = initial;
            return [
              states[index],
              (value) => {
                states[index] = value;
              },
            ];
          },
          useRef: () => ({ current: null }),
          useEffect: (fn) => {
            effects.push(fn);
          },
          useSyncExternalStore: () => "/",
        };
      if (name.includes("browser-location-store")) return {};
      if (name === "next/link") return { default: () => null };
      return require(name);
    },
  };
  runInNewContext(code, sandbox);
  sandbox.exports.default();
  const cleanups = effects.map((effect) => effect());
  const cleanup = () => cleanups.forEach((fn) => fn?.());
  const flush = () => {
    while (frames.length) frames.shift()();
  };
  flush();
  return {
    visible: () => states[0],
    control: () => {
      stateIndex = 0;
      return sandbox.exports.default().props.children.props.children;
    },
    intersect: (value) => intersection([{ target: form, isIntersecting: value }]),
    menu(value) {
      menu = value;
      mutation();
    },
    focus(value) {
      document.activeElement = value ? new Input() : null;
      document.dispatchEvent(new Event(value ? "focusin" : "focusout"));
      flush();
    },
    keyboard(height) {
      viewport.height = height;
      viewport.dispatchEvent(new Event("resize"));
    },
    cleanup,
    disconnected: () => disconnected,
  };
}

test("contact bar hides while the estimate form is visible and returns after leaving it", () => {
  const app = setup();
  assert.equal(app.visible(), true);
  app.intersect(true);
  assert.equal(app.visible(), false);
  app.intersect(false);
  assert.equal(app.visible(), true);
  app.cleanup();
  assert.equal(app.disconnected(), 2);
});

test("first tap expands the phone button and only the expanded control links to a call", () => {
  const app = setup();
  const collapsed = app.control();
  assert.equal(collapsed.type, "button");
  assert.equal(collapsed.props.href, undefined);
  collapsed.props.onClick();
  const expanded = app.control();
  assert.equal(expanded.type, "a");
  assert.equal(expanded.props.href, "tel:01053401728");
  assert.ok(expanded.props.children.includes("전화문의"));
  app.intersect(true);
  app.intersect(false);
  assert.equal(app.control().type, "button");
  app.cleanup();
});

test("editing, open keyboard and open navigation each hide the contact bar", () => {
  const app = setup();
  app.focus(true);
  assert.equal(app.visible(), false);
  app.focus(false);
  assert.equal(app.visible(), true);
  app.keyboard(400);
  assert.equal(app.visible(), false);
  app.keyboard(800);
  assert.equal(app.visible(), true);
  app.menu(true);
  assert.equal(app.visible(), false);
  app.menu(false);
  assert.equal(app.visible(), true);
});
