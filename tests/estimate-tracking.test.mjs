import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(
  readFileSync(new URL("../src/hooks/use-estimate-form.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;

function setup(submit, trackError) {
  const events = [];
  const states = [];
  const sandbox = {
    exports: {},
    require(name) {
      if (name === "react") {
        return {
          useRef: (current) => ({ current }),
          useState: (initial) => [initial, (value) => states.push(value)],
        };
      }
      if (name === "@/src/lib/submit-estimate") return { submitEstimate: submit };
      if (name === "@next/third-parties/google") {
        return {
          sendGAEvent(...args) {
            events.push(args);
            if (trackError?.(args[1])) throw new Error("Tracking unavailable");
          },
        };
      }
      throw new Error(`Unexpected import: ${name}`);
    },
  };
  runInNewContext(source, sandbox);
  return { form: sandbox.exports.useEstimateForm(), events, states };
}

test("accepted inquiries send exactly one GA4 and Ads event with no personal fields", async () => {
  for (const multipart of [false, true]) {
    const { form, events } = setup(async () => true);
    const fields = new FormData();
    fields.set("manager", "Private name");
    fields.set("email", "private@example.com");
    assert.equal(await form.send(fields, multipart), true);
    assert.equal(events.length, 2);
    assert.equal(events[0][1], "generate_lead");
    assert.equal(events[0].length, 2);
    assert.equal(events[1][1], "conversion");
    assert.equal(events[1][2].send_to, "AW-18414772395/jv5YCNvb76EdEKvB7MxE");
    assert.deepEqual(Object.keys(events[1][2]), ["send_to"]);
  }
});

test("spam decoy success without mail acceptance sends no tracking", async () => {
  const { form, events } = setup(async () => false);
  assert.equal(await form.send(new FormData()), true);
  assert.equal(events.length, 0);
});

test("submission failures send no tracking and permit a later retry", async () => {
  let attempts = 0;
  const { form, events } = setup(async () => {
    if (++attempts === 1) throw new Error("Mail failed");
    return true;
  });
  assert.equal(await form.send(new FormData()), false);
  assert.equal(events.length, 0);
  assert.equal(await form.send(new FormData()), true);
  assert.equal(events.length, 2);
});

test("double submit while pending neither sends another request nor duplicate events", async () => {
  let resolve;
  let requests = 0;
  const { form, events } = setup(() => {
    requests++;
    return new Promise((done) => {
      resolve = done;
    });
  });
  const first = form.send(new FormData());
  assert.equal(await form.send(new FormData()), false);
  assert.equal(requests, 1);
  assert.equal(events.length, 0);
  resolve(true);
  assert.equal(await first, true);
  assert.equal(events.length, 2);
});

test("each tracking destination is attempted even when either or both throw", async () => {
  for (const failure of ["generate_lead", "conversion", "both"]) {
    const { form, events, states } = setup(
      async () => true,
      (event) => failure === "both" || event === failure,
    );
    assert.equal(await form.send(new FormData()), true);
    assert.equal(events.length, 2);
    assert.ok(states.includes("success"));
    assert.ok(!states.includes("error"));
  }
});
