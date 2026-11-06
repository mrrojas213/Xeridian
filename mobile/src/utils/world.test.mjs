import test from "node:test";
import assert from "node:assert/strict";
import { extractWorldLandmarks, extractLandmarks } from "./pose.ts";
import { updatePushup } from "../exercises/pushup.ts";

test("reads worldLandmarks, ignores missing/bad data", () => {
  const data = { landmarks: [{ x: 0.5, y: 0.5, z: 0 }], worldLandmarks: [{ x: 1, y: 2, z: 3 }, null, { x: "a" }] };
  assert.equal(extractWorldLandmarks(data).length, 1);
  assert.equal(extractLandmarks(data).length, 1);
  assert.deepEqual(extractWorldLandmarks({}), []);
  assert.deepEqual(extractWorldLandmarks({ worldLandmarks: [] }), []);
});

test("a straight arm in world coordinates reads ~180 degrees and counts as up", () => {
  const lm = Array.from({ length: 33 }, () => ({ x: 0, y: 0, z: 0 }));
  for (const [s, e, w, x] of [[11, 13, 15, 0.2], [12, 14, 16, -0.2]]) {
    lm[s] = { x, y: -0.3, z: 0 }; lm[e] = { x, y: 0, z: 0 }; lm[w] = { x, y: 0.3, z: 0 };
  }
  const r = updatePushup(lm, "up", 0);
  assert.equal(r.state, "up");
  assert.ok(Math.abs(r.primaryAngle - 180) < 1e-6);
});
