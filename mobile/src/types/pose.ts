export type Landmark = {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
  presence?: number;
};

export type TrackingStatus = "searching" | "tracking" | "paused";
