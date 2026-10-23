import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(
  readFileSync(
    new URL("../src/components/layout/PhoneConversionTracking.tsx", import.meta.url),
    "utf8",
  ),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;

function setup(blocked = false) {
  const listeners = new Set();
  const events = [];
  let cleanup;
  class Element {
    constructor(href) {
      this.href = href;
    }
    closest() {
      return { getAttribute: () => this.href };
    }
  }
  const sandbox = {
    exports: {},
    Element,
    document: {
      addEventListener: (_, listener) => listeners.add(listener),
      removeEventListener: (_, listener) => listeners.delete(listener),
    },
    require(name) {
      if (name === "react")
        return {
          useEffect: (effect) => {
            cleanup = effect();
          },
        };
      if (name === "@next/third-parties/google")
        return {
          sendGAEvent: (...args) => {
            events.push(args);
            if (blocked) throw new Error("Tracking blocked");
          },
        };
      throw new Error(name);
    },
  };
  runInNewContext(source, sandbox);
  const mount = () => sandbox.exports.default();
  mount();
  return {
    events,
    mount,
    cleanup: () => cleanup(),
    click(href, options = {}) {
      const event = { target: new Element(href), defaultPrevented: false, button: 0, ...options };
      for (const listener of listeners) listener(event);
    },
  };
}

test("telephone links send only the phone conversion label and cleanup prevents duplicate listeners", () => {
  const tracker = setup();
  tracker.click("tel:01053401728");
  assert.equal(
    JSON.stringify(tracker.events),
    "[[" + '"event","conversion",{"send_to":"AW-18414772395/xGhQCKXJvqYdEKvB7MxE"}]]',
  );
  tracker.cleanup();
  tracker.mount();
  tracker.click("tel:028911728");
  assert.equal(tracker.events.length, 2);
  tracker.cleanup();
  tracker.click("tel:028911728");
  assert.equal(tracker.events.length, 2);
});

test("ordinary links and canceled clicks do not count as phone conversions", () => {
  const tracker = setup();
  tracker.click("/contact");
  tracker.click("mailto:someone@example.com");
  tracker.click("tel:028911728", { defaultPrevented: true });
  tracker.click("tel:028911728", { button: 1 });
  assert.equal(tracker.events.length, 0);
});

test("tracking errors do not throw or cancel telephone navigation", () => {
  const tracker = setup(true);
  assert.doesNotThrow(() =>
    tracker.click("tel:028911728", {
      preventDefault() {
        throw new Error("Telephone navigation must not be canceled");
      },
    }),
  );
  assert.equal(tracker.events.length, 1);
});
