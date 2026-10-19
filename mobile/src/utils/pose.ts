import { Landmark } from "../types/pose";

export function distance(a: Landmark, b: Landmark): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = (a.z ?? 0) - (b.z ?? 0);

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function angle(a: Landmark, b: Landmark, c: Landmark): number {
  const abx = a.x - b.x;
  const aby = a.y - b.y;
  const abz = (a.z ?? 0) - (b.z ?? 0);
  const cbx = c.x - b.x;
  const cby = c.y - b.y;
  const cbz = (c.z ?? 0) - (b.z ?? 0);

  const dot = abx * cbx + aby * cby + abz * cbz;
  const abLength = Math.sqrt(abx * abx + aby * aby + abz * abz);
  const cbLength = Math.sqrt(cbx * cbx + cby * cby + cbz * cbz);

  if (abLength === 0 || cbLength === 0) {
    return 0;
  }

  const cosine = Math.max(
    -1,
    Math.min(1, dot / (abLength * cbLength))
  );

  return Math.acos(cosine) * (180 / Math.PI);
}

export function extractLandmarks(data: any): Landmark[] {
  const candidates = [
    data?.landmarks,
    data?.poseLandmarks,
    data?.results?.[0]?.landmarks,
    data?.results?.[0]
  ];

  const landmarks = candidates.find(Array.isArray);

  if (!landmarks) {
    return [];
  }

  return landmarks
    .filter(
      (point: any) =>
        point &&
        typeof point.x === "number" &&
        typeof point.y === "number"
    )
    .map((point: any) => ({
      x: point.x,
      y: point.y,
      z: typeof point.z === "number" ? point.z : undefined,
      visibility:
        typeof point.visibility === "number"
          ? point.visibility
          : undefined,
      presence:
        typeof point.presence === "number"
          ? point.presence
          : undefined
    }));
}