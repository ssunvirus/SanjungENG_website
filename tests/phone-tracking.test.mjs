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

function setup(blocked = false, naverState = "ready") {
  const listeners = new Set();
  const events = [];
  const naverEvents = [];
  const window =
    naverState === "missing"
      ? {}
      : {
          wcs: {
            trans: (data) => {
              if (naverState === "blocked") throw new Error("Naver blocked");
              naverEvents.push(data);
            },
          },
        };
  const naverSandbox = { exports: {}, window };
  runInNewContext(
    ts.transpileModule(
      readFileSync(new URL("../src/lib/naver-analytics.ts", import.meta.url), "utf8"),
      { compilerOptions: { module: ts.ModuleKind.CommonJS } },
    ).outputText,
    naverSandbox,
  );
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
      if (name === "@/src/lib/naver-analytics") return naverSandbox.exports;
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
            if (blocked === true || blocked === args[1]) throw new Error("Tracking blocked");
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
    naverEvents,
    window,
    mount,
    cleanup: () => cleanup(),
    click(href, options = {}) {
      const event = { target: new Element(href), defaultPrevented: false, button: 0, ...options };
      for (const listener of listeners) listener(event);
    },
  };
}

test("telephone links send one GA4 event and one advertising conversion without duplicate listeners", () => {
  const tracker = setup();
  tracker.click("tel:01053401728");
  assert.equal(JSON.stringify(tracker.naverEvents), '[{"type":"custom001"}]');
  assert.equal(tracker.window.wcs_add.wa, "s_3311cae277b0");
  assert.equal(
    JSON.stringify(tracker.events),
    '[["event","phone_click",{"send_to":"G-H64WF985Q8"}],["event","conversion",{"send_to":"AW-18414772395/xGhQCKXJvqYdEKvB7MxE"}]]',
  );
  tracker.cleanup();
  tracker.mount();
  tracker.click("tel:028911728");
  assert.equal(tracker.events.length, 4);
  assert.equal(tracker.naverEvents.length, 2);
  tracker.cleanup();
  tracker.click("tel:028911728");
  assert.equal(tracker.events.length, 4);
  assert.equal(tracker.naverEvents.length, 2);
});

test("ordinary links and canceled clicks do not count as phone conversions", () => {
  const tracker = setup();
  tracker.click("/contact");
  tracker.click("mailto:someone@example.com");
  tracker.click("tel:028911728", { defaultPrevented: true });
  tracker.click("tel:028911728", { button: 1 });
  assert.equal(tracker.events.length, 0);
  assert.equal(tracker.naverEvents.length, 0);
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
  assert.equal(tracker.events.length, 2);
  assert.equal(tracker.naverEvents.length, 1);
});

test("missing or blocked Naver tracking preserves Google conversion and telephone navigation", () => {
  for (const state of ["missing", "blocked"]) {
    const tracker = setup(false, state);
    assert.doesNotThrow(() => tracker.click("tel:01053401728"));
    assert.equal(tracker.events.length, 2);
    assert.equal(tracker.naverEvents.length, 0);
  }
});

test("a GA4 event failure still attempts the Google Ads and Naver phone conversions", () => {
  const tracker = setup("phone_click");
  assert.doesNotThrow(() => tracker.click("tel:01053401728"));
  assert.deepEqual(
    tracker.events.map((event) => event[1]),
    ["phone_click", "conversion"],
  );
  assert.equal(tracker.naverEvents.length, 1);
});
