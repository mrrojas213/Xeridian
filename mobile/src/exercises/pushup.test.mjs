// Run from the mobile folder:  node --test src/exercises/pushup.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { updatePushup } from "./pushup.ts";

// Build 33 fake landmarks whose two elbows are bent to `deg` degrees.
function pose(deg) {
  const lm = Array.from({ length: 33 }, () => ({ x: 0, y: 0, z: 0 }));
  const r = (deg * Math.PI) / 180;
  for (const [s, e, w, x] of [[11, 13, 15, 0.3], [12, 14, 16, 0.7]]) {
    lm[s] = { x, y: 0.3, z: 0 };
    lm[e] = { x, y: 0.5, z: 0 };
    lm[w] = { x: x + 0.2 * Math.sin(r), y: 0.5 - 0.2 * Math.cos(r), z: 0 };
  }
  return lm;
}

// Feed a list of elbow angles through the counter, return the final rep count.
function run(angles) {
  let state = "up", reps = 0;
  for (const a of angles) ({ state, repetitions: reps } = updatePushup(pose(a), state, reps));
  return reps;
}

// One smooth pushup: straight (160) -> bottom -> straight, over `len` frames.
const rep = (bottom, len = 40) =>
  Array.from({ length: len }, (_, i) => 160 - ((160 - bottom) / 2) * (1 - Math.cos((2 * Math.PI * i) / len)));

test("5 full pushups count as 5", () => {
  assert.equal(run([160, 160, ...[1, 2, 3, 4, 5].flatMap(() => rep(60)), 160, 160]), 5);
});
test("half pushups (only down to 120) do not count", () => {
  assert.equal(run([160, ...rep(120), ...rep(120), ...rep(120), 160]), 0);
});
test("standing still with straight arms is 0", () => {
  assert.equal(run(Array(100).fill(165)), 0);
});
test("going down and not coming back up is 0", () => {
  assert.equal(run([160, 140, 120, 90, 70, 65, 65, 65]), 0);
});
test("noisy angles (+/- 5 degrees) still give 5", () => {
  let s = 7; const noise = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296 - 0.5) * 10;
  const sig = [160, 160, ...[1, 2, 3, 4, 5].flatMap(() => rep(65, 50)), 160, 160].map((a) => a + noise());
  assert.equal(run(sig), 5);
});
