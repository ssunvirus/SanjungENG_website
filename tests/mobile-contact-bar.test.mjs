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
  let visible = false;
  let effect;
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
          useState: () => [
            false,
            (value) => {
              visible = value;
            },
          ],
          useEffect: (fn) => {
            effect = fn;
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
  const cleanup = effect();
  const flush = () => {
    while (frames.length) frames.shift()();
  };
  flush();
  return {
    visible: () => visible,
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
