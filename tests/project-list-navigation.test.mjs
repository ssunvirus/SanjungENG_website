import assert from "node:assert/strict";
import test from "node:test";
import {
  projectDetailHref,
  projectListReturnHref,
  readProjectListState,
  subscribeProjectListLocation,
  projectListLocationEvent,
  resolveProjectListLocation,
} from "../src/lib/project-list-navigation.ts";

test("plain list navigation restores the last viewed pagination rather than page one", () => {
  for (const page of [2, 3]) {
    const location = resolveProjectListLocation(
      { search: "", hash: "" },
      `/projects?page=${page}&category=refrigeration#projects-list-heading`,
    );
    assert.deepEqual(readProjectListState(new URLSearchParams(location.split("#")[0])), {
      page,
      category: "냉동공조",
    });
  }
});

test("explicit pagination and project anchors take precedence over remembered state", () => {
  const remembered = "/projects?page=3&category=fabric";
  assert.equal(
    resolveProjectListLocation({ search: "?page=2&category=all", hash: "" }, remembered),
    "?page=2&category=all",
  );
  assert.equal(
    resolveProjectListLocation({ search: "", hash: "#case-id" }, remembered),
    "#case-id",
  );
  assert.equal(
    resolveProjectListLocation({ search: "", hash: "" }, "https://example.org/projects?page=3"),
    "",
  );
});

test("browser back and cache restoration refresh the page and category from the current URL", () => {
  const browser = new EventTarget();
  let url = new URL("https://example.test/projects?page=1&category=all");
  const states = [];
  const unsubscribe = subscribeProjectListLocation(browser, () => {
    states.push(readProjectListState(url.searchParams));
  });
  url = new URL("https://example.test/projects?page=3&category=refrigeration");
  browser.dispatchEvent(new Event("popstate"));
  assert.deepEqual(states.at(-1), { page: 3, category: "냉동공조" });
  url = new URL("https://example.test/projects?page=2&category=fabric");
  browser.dispatchEvent(new Event("pageshow"));
  assert.deepEqual(states.at(-1), { page: 2, category: "패브릭덕트" });
  browser.dispatchEvent(new Event(projectListLocationEvent));
  assert.equal(states.length, 3);
  unsubscribe();
  browser.dispatchEvent(new Event("popstate"));
  assert.equal(states.length, 3);
});

test("listing page and category survive a detail-page round trip", () => {
  const href = projectDetailHref("/projects/example", 3, "패브릭덕트");
  const params = new URL(href, "https://example.test").searchParams;
  const back = projectListReturnHref(params);
  assert.equal(back, "/projects?page=3&category=fabric#projects-list-heading");
  assert.deepEqual(readProjectListState(new URL(back, "https://example.test").searchParams), {
    page: 3,
    category: "패브릭덕트",
  });
});

test("detail context retains existing query and anchor values", () => {
  const href = projectDetailHref("/projects/example?view=photos#photo-2", 2, "전체");
  const url = new URL(href, "https://example.test");
  assert.equal(url.searchParams.get("view"), "photos");
  assert.equal(url.searchParams.get("listPage"), "2");
  assert.equal(url.hash, "#photo-2");
});

test("direct visits and invalid return inputs stay on the local default list", () => {
  for (const input of ["", "listPage=-1", "listPage=abc", "returnTo=https://example.org"]) {
    assert.equal(projectListReturnHref(new URLSearchParams(input)), "/projects");
  }
  assert.equal(
    projectListReturnHref(new URLSearchParams("listPage=2&listCategory=https://example.org")),
    "/projects?page=2&category=all#projects-list-heading",
  );
});
