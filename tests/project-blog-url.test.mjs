import assert from "node:assert/strict";
import test from "node:test";
import { parseProject, mergeAdminProjects } from "../src/lib/project-record.ts";

const project = {
  id: "blog-test",
  title: "Test",
  category: "기타",
  location: "",
  description: "",
  photos: [],
  version: 0,
};

test("blog links survive storage and preserve exact Naver post URLs", () => {
  for (const blogUrl of [
    "https://blog.naver.com/sanjungeng/123",
    "https://m.blog.naver.com/sanjungeng/123",
    "https://blog.naver.com/PostView.naver?blogId=sanjungeng&logNo=123",
  ]) {
    const saved = parseProject({ ...project, blogUrl: `  ${blogUrl}  ` });
    assert.equal(parseProject(JSON.parse(JSON.stringify(saved))).blogUrl, blogUrl);
  }
});

test("missing legacy links inherit the code value while explicit clearing stays empty", () => {
  const base = { ...project, blogUrl: "https://blog.naver.com/sanjungeng/123" };
  assert.equal(parseProject(project).blogUrl, undefined);
  assert.equal(mergeAdminProjects([base], [parseProject(project)])[0].blogUrl, base.blogUrl);
  assert.equal(
    mergeAdminProjects([base], [parseProject({ ...project, blogUrl: " " })])[0].blogUrl,
    "",
  );
});

test("invalid or unsafe blog destinations are rejected", () => {
  for (const blogUrl of [
    null,
    12,
    "javascript:alert(1)",
    "http://blog.naver.com/a",
    "https://example.com",
    "https://blog.naver.com.evil.com/a",
    "https://user@blog.naver.com/a",
    "https://blog.naver.com:444/a",
    "a".repeat(2001),
  ]) {
    assert.throws(() => parseProject({ ...project, blogUrl }));
  }
});
