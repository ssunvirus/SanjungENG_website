import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const code = ts.transpileModule(
  readFileSync(new URL("../src/components/home/useCardAutoplay.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;

function setup(enabled = true) {
  let now = 0;
  let pending;
  let cleanup;
  const pauseUntil = { current: 0 };
  const state = { hidden: false, reduced: false, top: 100, bottom: 500 };
  const moves = [];
  const element = {
    scrollLeft: 0,
    children: [{ offsetLeft: 0 }, { offsetLeft: 376 }],
    getClientRects: () => [{}],
    getBoundingClientRect: () => state,
    scrollTo(options) {
      moves.push(options.left);
      this.scrollLeft = options.left;
    },
  };
  const sandbox = {
    exports: {},
    Date: { now: () => now },
    document: state,
    window: { innerHeight: 800, matchMedia: () => ({ matches: state.reduced }) },
    setTimeout: (fn, delay) => {
      pending = { fn, due: now + delay };
      return 1;
    },
    clearTimeout: () => {
      pending = undefined;
    },
    require: () => ({
      useEffect: (fn) => {
        cleanup = fn();
      },
    }),
  };
  runInNewContext(code, sandbox);
  sandbox.exports.default({ current: element }, 3, enabled, pauseUntil);
  return {
    moves,
    state,
    element,
    pause: () => {
      pauseUntil.current = now + 10000;
    },
    advance(ms) {
      const end = now + ms;
      while (pending && pending.due <= end) {
        now = pending.due;
        const fn = pending.fn;
        pending = undefined;
        fn();
      }
      now = end;
    },
    clear: () => cleanup?.(),
  };
}

test("mobile autoplay advances whole cards every six seconds and wraps", () => {
  const app = setup();
  app.advance(5999);
  assert.deepEqual(app.moves, []);
  app.advance(12001);
  assert.deepEqual(app.moves, [376, 752, 0]);
  app.clear();
  app.advance(6000);
  assert.equal(app.moves.length, 3);
});

test("manual interaction postpones the next move for ten seconds from the last interaction", () => {
  const app = setup();
  app.advance(5000);
  app.pause();
  app.advance(9000);
  assert.deepEqual(app.moves, []);
  app.pause();
  app.advance(9999);
  assert.deepEqual(app.moves, []);
  app.advance(1);
  assert.deepEqual(app.moves, [376]);
});

test("manual pause, hidden pages, offscreen sections and reduced motion prevent automatic movement", () => {
  const paused = setup(false);
  paused.advance(30000);
  assert.deepEqual(paused.moves, []);
  const app = setup();
  app.state.hidden = true;
  app.advance(6000);
  app.state.hidden = false;
  app.state.reduced = true;
  app.advance(6000);
  app.state.reduced = false;
  app.state.top = 900;
  app.advance(6000);
  assert.deepEqual(app.moves, []);
});
