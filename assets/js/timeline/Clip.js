"use strict";

let _nextId = 0;

export class Clip {
  id;
  sourceId;
  startMs;
  durationMs;
  inPointMs;
  outPointMs;
  effects;

  constructor({ sourceId, startMs = 0, durationMs = 1000, inPointMs = 0, outPointMs = 1000 } = {}) {
    this.id         = ++_nextId;
    this.sourceId   = sourceId;
    this.startMs    = startMs;
    this.durationMs = durationMs;
    this.inPointMs  = inPointMs;
    this.outPointMs = outPointMs;
    this.effects    = [];
  }

  get endMs() { return this.startMs + this.durationMs; }
}
