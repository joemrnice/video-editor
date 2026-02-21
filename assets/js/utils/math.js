"use strict";

export const clamp  = (v, min, max) => Math.max(min, Math.min(max, v));
export const lerp   = (a, b, t) => a + (b - a) * t;
export const remap  = (v, inMin, inMax, outMin, outMax) =>
  outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin);
export const snap   = (v, grid) => Math.round(v / grid) * grid;
export const degToRad = (deg) => deg * (Math.PI / 180);
export const radToDeg = (rad) => rad * (180 / Math.PI);
export const msToFrames = (ms, fps) => Math.round((ms / 1000) * fps);
export const framesToMs = (frames, fps) => (frames / fps) * 1000;
