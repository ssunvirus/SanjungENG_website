import assert from "node:assert/strict";
import test from "node:test";
import { createBrowserLocationStore } from "../src/lib/browser-location-store.ts";

function browser() {
  const target = new EventTarget();
  target.location = new URL("https://example.test/projects?page=3");
  target.history = {
    state: null,
    pushState(state, _unused, href) {
      this.state = state;
      target.location = new URL(href, target.location);
    },
    replaceState(state, _unused, href) {
      this.state = state;
      target.location = new URL(href, target.location);
    },
  };
  return target;
}

test("SPA history writes notify after commit and preserve framework history data", async () => {
  const target = browser();
  const store = createBrowserLocationStore(target);
  const seen = [];
  const unsubscribe = store.subscribe(() => seen.push(store.page()));
  const state = { __NA: true, tree: ["projects"] };
  target.history.pushState(state, "", "/projects/example?listPage=3");
  assert.deepEqual(seen, []);
  assert.equal(target.history.state, state);
  await Promise.resolve();
  assert.deepEqual(seen, ["/projects/example?listPage=3"]);
  assert.equal(store.pathname(), "/projects/example");
  target.history.replaceState(state, "", "/projects?page=2");
  await Promise.resolve();
  assert.equal(seen.at(-1), "/projects?page=2");
  unsubscribe();
});

test("browser back and page restoration update all consumers and clean up", async () => {
  const target = browser();
  const original = target.history.pushState;
  const store = createBrowserLocationStore(target);
  let first = 0;
  let second = 0;
  const stopFirst = store.subscribe(() => first++);
  const stopSecond = store.subscribe(() => second++);
  target.location = new URL("https://example.test/fabric-duct");
  target.dispatchEvent(new Event("popstate"));
  await Promise.resolve();
  assert.equal(first, 1);
  assert.equal(second, 1);
  stopFirst();
  target.dispatchEvent(new Event("pageshow"));
  await Promise.resolve();
  assert.equal(first, 1);
  assert.equal(second, 2);
  stopSecond();
  assert.equal(target.history.pushState, original);
});

test("cleanup keeps history wrappers installed later by the router", () => {
  const target = browser();
  const store = createBrowserLocationStore(target);
  const unsubscribe = store.subscribe(() => {});
  const laterWrapper = () => {};
  target.history.pushState = laterWrapper;
  unsubscribe();
  assert.equal(target.history.pushState, laterWrapper);
});
