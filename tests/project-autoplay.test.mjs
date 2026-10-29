import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const code = ts.transpileModule(
  readFileSync(new URL("../src/components/home/useProjectAutoplay.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;

function setup(enabled = true) {
  let tick;
  let time = 1;
  const element = {
    scrollLeft: 0,
    children: [{ offsetLeft: 0 }, {}, { offsetLeft: 1000 }],
    getClientRects: () => (state.visible ? [{}] : []),
    getBoundingClientRect: () => state,
  };
  let clears = 0;
  const state = { visible: true, reduced: false, top: 100, bottom: 900 };
  const document = { hidden: false };
  const cleanups = [];
  const sandbox = {
    exports: {},
    document,
    window: {
      innerHeight: 800,
      matchMedia: () => ({ matches: state.reduced }),
      requestAnimationFrame: (fn) => {
        tick = fn;
        return 42;
      },
      cancelAnimationFrame: (id) => {
        assert.equal(id, 42);
        clears++;
      },
    },
    require: () => ({
      useRef: (value) => ({ current: value }),
      useEffect: (effect) => {
        const cleanup = effect();
        if (cleanup) cleanups.push(cleanup);
      },
    }),
  };
  runInNewContext(code, sandbox);
  sandbox.exports.default({ current: element }, 2, enabled);
  return {
    state,
    document,
    tick: () => {
      tick?.(time);
      time += 50;
    },
    count: () => element.scrollLeft,
    element,
    active: () => Boolean(tick),
    clear: () => cleanups.forEach((fn) => fn()),
    clears: () => clears,
  };
}

test("project autoplay moves continuously and cancels its animation frame", () => {
  const app = setup();
  app.tick();
  app.tick();
  assert.ok(Math.abs(app.count() - 1.4) < 0.001);
  app.clear();
  assert.equal(app.clears(), 1);
});

test("paused autoplay never installs a timer", () => {
  const app = setup(false);
  assert.equal(app.active(), false);
});

test("autoplay skips hidden layouts, background tabs, offscreen sections and reduced motion", () => {
  const app = setup();
  app.state.visible = false;
  app.tick();
  app.state.visible = true;
  app.document.hidden = true;
  app.tick();
  app.document.hidden = false;
  app.state.reduced = true;
  app.tick();
  app.state.reduced = false;
  app.state.top = 900;
  app.tick();
  app.state.top = -900;
  app.state.bottom = -1;
  app.tick();
  assert.equal(app.count(), 0);
  app.state.top = 100;
  app.state.bottom = 900;
  app.tick();
  assert.ok(app.count() > 0);
});

test("continuous autoplay wraps into the identical repeated cards without scrolling back", () => {
  const app = setup();
  app.tick();
  app.element.scrollLeft = 999;
  app.tick();
  assert.ok(app.count() < 2);
});
