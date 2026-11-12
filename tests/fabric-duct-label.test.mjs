import assert from "node:assert/strict";
import test from "node:test";
import { parseProject } from "../src/lib/project-record.ts";
import { mergePublicProjects } from "../src/lib/public-project-data.ts";
import { readEstimateFields } from "../src/lib/estimate-rules.ts";

const oldLabel = "\uC12C\uC720\uB355\uD2B8";
const legacy = {
  id: "legacy-fabric-label",
  title: `${oldLabel} 설치`,
  category: oldLabel,
  location: "",
  description: `${oldLabel} 설치 현장`,
  summary: `${oldLabel} 시공`,
  photos: [{ src: "/images/legacy.jpg", alt: `${oldLabel} 전경` }],
  version: 0,
};

test("saved legacy project labels remain readable with the new category and captions", () => {
  const record = parseProject(legacy);
  assert.equal(record.category, "패브릭덕트");
  assert.equal(record.title, "패브릭덕트 설치");
  assert.equal(record.summary, "패브릭덕트 시공");
  assert.equal(record.photos[0].alt, "패브릭덕트 전경");
  assert.equal(legacy.category, oldLabel);
});

test("legacy cached cards stay in the fabric category instead of refrigeration", () => {
  const card = mergePublicProjects([], [legacy])[0];
  assert.equal(card.category, "패브릭덕트");
  assert.equal(card.tag, "패브릭덕트");
  assert.equal(card.title, "패브릭덕트 설치");
});

test("old inquiry category is accepted while customer-authored text is preserved", () => {
  const message = `${oldLabel} 설치 문의`;
  const fields = readEstimateFields({ category: oldLabel, message });
  assert.equal(fields.category, "패브릭덕트");
  assert.equal(fields.message, message);
});
